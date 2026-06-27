const openedScreens = [];

// Включение/выключение внутреннего скролла у контейнеров
function toggleInnerScroll(root, isDisable) {
  if (!root) return;
  
  const scrollContainers = root === document 
    ? document.querySelectorAll('.page, .messages, .chats') 
    : root.querySelectorAll('.page, .messages, .chats');
  
  scrollContainers.forEach(container => {
    container.style.overflowY = isDisable ? 'hidden' : 'auto';
  });
}

// Инициализация свайпов для ЗАКРЫТИЯ ЭКРАНА
function initSwipeListeners(screenId) {
  const topScreen = document.querySelector(`[data-screen="${screenId}"]`);
  if (!topScreen || !topScreen.hasAttribute('data-swipe')) return;

  if (topScreen.dataset.swipeInitialized) return;
  topScreen.dataset.swipeInitialized = "true";

  let startX = 0;
  let startY = 0;
  let dist = 0;
  let isMoving = false;
  let hasMovedFar = false; 
  const swipeThreshold = 80;

  function resetTouchCoordinates() {
    startX = 0;
    startY = 0;
    dist = 0;
    isMoving = false;
    setTimeout(() => {
      hasMovedFar = false;
    }, 50);
  }

  // Перехватываем и глушим любые клики, если экран двигали
  topScreen.addEventListener('click', (e) => {
    if (hasMovedFar) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });

  // --- ТАЧ-СОБЫТИЯ ДЛЯ МОБИЛОК (ЗАКРЫТИЕ ЭКРАНА) ---
  topScreen.addEventListener('touchstart', (e) => {
    if (e.target.closest('.tab-container-slider') || e.target.closest('.tab-header') || e.target.closest('input[type="range"]')) {
      return; 
    }

    e.stopPropagation();
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isMoving = false;
    hasMovedFar = false;
    topScreen.style.transition = 'none';
  }, { passive: true });

  topScreen.addEventListener('touchmove', (e) => {
    if (startX === 0) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    dist = currentX - startX;
    const distY = currentY - startY;

    if (dist < 0) dist = 0;

    if (!isMoving && Math.abs(dist) > Math.abs(distY) && Math.abs(dist) > 10) {
      isMoving = true;
      hasMovedFar = true; 
      topScreen.style.overflowY = 'hidden'; 
    }

    if (isMoving) {
      e.stopPropagation(); 
      if (e.cancelable) e.preventDefault(); 
      topScreen.style.transform = `translateX(${dist}px)`;
    }
  }, { passive: false });

  topScreen.addEventListener('touchend', (e) => {
    if (startX === 0) return;
    e.stopPropagation();
    topScreen.style.transition = 'transform 0.18s ease';

    if (isMoving && dist > swipeThreshold) {
      topScreen.style.transform = 'translateX(100%)';
      setTimeout(() => {
        closeActiveScreen(screenId, true);
        resetTouchCoordinates();
      }, 180);
    } else {
      topScreen.style.transform = 'translateX(0)';
      setTimeout(() => {
        topScreen.style.transition = '';
        topScreen.style.overflowY = 'auto'; 
        resetTouchCoordinates();
      }, 180);
    }
  });

  topScreen.addEventListener('touchcancel', (e) => {
    e.stopPropagation();
    topScreen.style.transition = 'transform 0.18s ease';
    topScreen.style.transform = 'translateX(0)';
    setTimeout(() => {
      topScreen.style.transition = '';
      topScreen.style.overflowY = 'auto';
      resetTouchCoordinates();
    }, 180);
  });

  // --- МЫШИНЫЕ СОБЫТИЯ ДЛЯ ПК (ЗАКРЫТИЕ ЭКРАНА) ---
  let isDragging = false;

  topScreen.addEventListener('mousedown', (e) => {
    if (e.target.closest('.tab-container-slider') || e.target.closest('.tab-header') || e.target.closest('input[type="range"]')) {
      return; 
    }

    if (e.button === 0) {
      isDragging = true;
      startX = e.clientX;
      hasMovedFar = false;
      topScreen.style.transition = 'none';
    }
  });

  topScreen.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dist = e.clientX - startX;
    if (dist < 0) dist = 0;

    if (dist > 10) {
      hasMovedFar = true;
    }
    topScreen.style.transform = `translateX(${dist}px)`;
  });

  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    topScreen.style.transition = 'transform 0.18s ease';

    if (dist > swipeThreshold) {
      topScreen.style.transform = 'translateX(100%)';
      setTimeout(() => {
        closeActiveScreen(screenId, true);
        resetTouchCoordinates();
      }, 180);
    } else {
      topScreen.style.transform = 'translateX(0)';
      setTimeout(() => {
        topScreen.style.transition = '';
        resetTouchCoordinates();
      }, 180);
    }
  };

  topScreen.addEventListener('mouseup', handleMouseUp);
  topScreen.addEventListener('mouseleave', handleMouseUp);
}

// Открытие экрана
function openScreen(screenId) {
  const screen = document.querySelector(`[data-screen="${screenId}"]`);
  if (!screen) return;

  const parentContainer = screen.closest('.page, .messages, .chats');

  if (openedScreens.length === 0) {
    toggleInnerScroll(document, true);
    document.body.style.overflow = 'hidden'; 
  } else {
    const prevScreenId = openedScreens[openedScreens.length - 1];
    const prevScreen = document.querySelector(`[data-screen="${prevScreenId}"]`);
    if (prevScreen) {
      toggleInnerScroll(prevScreen, true);
    }
  }

  if (parentContainer && window.innerWidth > 600) {
    const currentScroll = parentContainer.scrollTop;
    screen.style.top = `${currentScroll}px`;
  } else {
    screen.style.top = '0px';
  }

  openedScreens.push(screenId);
  
  screen.classList.remove('hidden');
  screen.style.transition = 'none';
  screen.style.transform = 'translateX(100%)';
  screen.style.zIndex = 100 + openedScreens.length;
  screen.style.overflowY = 'auto'; 

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      screen.style.transition = 'transform 0.18s ease';
      screen.classList.add('active');
      screen.style.transform = ''; 
    });
  });

  initSwipeListeners(screenId);
}

// Закрытие экрана
function closeActiveScreen(screenId, isSwiped = false) {
  if (openedScreens.length === 0) return;

  const screen = document.querySelector(`[data-screen="${screenId}"]`);
  
  if (screen) {
    const index = openedScreens.indexOf(screenId);
    if (index !== -1) {
      openedScreens.splice(index, 1);
    }

    const finalizeClose = () => {
      screen.classList.add('hidden');
      screen.classList.remove('active');
      screen.style.transform = ''; 
      screen.style.transition = '';
      screen.style.zIndex = ''; 
      screen.style.overflowY = ''; 
      screen.style.top = '';
      toggleInnerScroll(screen, false);
    };

    if (!isSwiped) {
      screen.style.transition = 'transform 0.18s ease';
      screen.style.transform = 'translateX(100%)';
      setTimeout(finalizeClose, 180); 
    } else {
      finalizeClose();
    }
  }

  if (openedScreens.length === 0) {
    toggleInnerScroll(document, false);
    document.body.style.overflow = '';
  } else {
    const currentTopScreenId = openedScreens[openedScreens.length - 1];
    const currentTopScreen = document.querySelector(`[data-screen="${currentTopScreenId}"]`);
    if (currentTopScreen) {
      toggleInnerScroll(currentTopScreen, false);
    }
  }
}

// --- НОВАЯ ФУНКЦИЯ: ЗАЩИТА ОТ СДВИГА ЭКРАНОВ ПРИ РЕСАЙЗЕ ---
window.addEventListener('resize', () => {
  openedScreens.forEach(screenId => {
    const screen = document.querySelector(`[data-screen="${screenId}"]`);
    if (!screen) return;

    if (window.innerWidth <= 600) {
      // На мобилках позиционирование fixed, top всегда должен быть строго 0
      screen.style.top = '0px';
    } else {
      // На ПК пересчитываем top на основе актуального скролла родителя
      const parentContainer = screen.closest('.page, .messages, .chats');
      if (parentContainer) {
        screen.style.top = `${parentContainer.scrollTop}px`;
      } else {
        screen.style.top = '0px';
      }
    }
  });
});

window.openScreen = openScreen;
window.closeActiveScreen = closeActiveScreen;

// Глобальный делегат кликов
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const openTarget = event.target.closest('[data-open-screen]');
    if (openTarget) {
      const screenId = openTarget.getAttribute('data-open-screen');
      openScreen(screenId);
      return; 
    }

    const closeTarget = event.target.closest('[data-close-screen]');
    if (closeTarget) {
      const screenId = closeTarget.getAttribute('data-close-screen');
      closeActiveScreen(screenId);
    }
  });
});