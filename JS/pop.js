/**
 * Вызов кастомного Toast-уведомления (Железобетонный фикс кнопки закрытия)
 */
function d_pop(label = 'Label', description = 'Description', actionLabel = 'Label', icon = 'pop', actionCallback = null) {
  if (document.querySelector('.custom-toast')) return;

  const toast = document.createElement('div');
  toast.className = 'custom-toast';

  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '0';
  toast.style.right = '0';
  toast.style.margin = '0 auto';
  toast.style.width = '90%';
  toast.style.maxWidth = '470px';
  toast.style.zIndex = '9999';

  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon">
        <svg class="${icon}"><use href="#${icon}"></use></svg>
      </div>
      <div class="toast-text">
        <span class="toast-label subtitle2-medium"></span>
        <span class="toast-description subtitle2"></span>
      </div>
    </div>
    <button class="toast-action-btn subtitle2-medium clicked activing"></button>
  `;

  toast.querySelector('.toast-label').textContent = label;
  toast.querySelector('.toast-description').textContent = description;
  
  const actionBtn = toast.querySelector('.toast-action-btn');
  actionBtn.textContent = actionLabel;

  document.body.appendChild(toast);

  toast.addEventListener('animationend', function initHandler(e) {
    if (e.animationName === 'slideIn') {
      toast.removeEventListener('animationend', initHandler);
      toast.style.animation = 'none'; 
    }
  });

  let autoCloseTimeout = setTimeout(() => {
    closeToast(toast);
  }, 3300);

  function closeToast(targetToast) {
    if (!targetToast || !targetToast.parentNode) return; // Защита от повторного удаления
    targetToast.style.transition = 'transform 0.22s ease-in, opacity 0.22s ease-in';
    targetToast.style.animation = 'slideOut 0.22s ease-in forwards';
    targetToast.classList.add('hide-down');
    
    targetToast.addEventListener('animationend', function handler(e) {
      if (e.animationName === 'slideOut') {
        targetToast.removeEventListener('animationend', handler);
        targetToast.remove();
      }
    });
  }

  // ЖЕЛЕЗОБЕТОННЫЙ КЛИК: Чистим всё нахер и удаляем без лишних посредников
  actionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    clearTimeout(autoCloseTimeout);
    
    if (typeof actionCallback === 'function') {
      actionCallback();
    }
    
    closeToast(toast);
  });

  // --- ЛОГИКА СВАЙПА ---
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let hasMovedFar = false;
  const swipeThreshold = 120;

  toast.addEventListener('dragstart', (e) => e.preventDefault());

  toast.addEventListener('click', (e) => {
    if (hasMovedFar) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });

  function startDrag(e) {
    // ЕЩЁ БОЛЕЕ ЖЕСТКАЯ ПРОВЕРКА КНОПКИ: Если тронули кнопку — свайп полностью изолируется
    if (e.target === actionBtn || e.target.closest('.toast-action-btn')) {
      isDragging = false;
      return; 
    }
    if (e.type === 'mousedown' && e.button !== 0) return;

    isDragging = true;
    hasMovedFar = false;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    
    toast.style.animation = 'none'; 
    toast.style.transition = 'none'; 
    clearTimeout(autoCloseTimeout); 
  }

  function moveDrag(e) {
    if (!isDragging) return;
    currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX;
    
    if (Math.abs(diffX) > 10) {
      hasMovedFar = true;
    }

    toast.style.transform = `translateX(${diffX}px)`;
    toast.style.opacity = Math.max(0, 1 - Math.abs(diffX) / 200);
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    const diffX = currentX - startX;

    if (hasMovedFar && Math.abs(diffX) > swipeThreshold) {
      toast.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      toast.style.transform = `translateX(${diffX > 0 ? 100 : -100}%)`;
      toast.style.opacity = '0';
      
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 200);
    } else {
      toast.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';

      setTimeout(() => {
        if (!isDragging && toast.parentNode) {
          toast.style.animation = 'none';
        }
      }, 200);

      autoCloseTimeout = setTimeout(() => closeToast(toast), 3300);
    }
  }

  // Touch
  toast.addEventListener('touchstart', startDrag, { passive: true });
  toast.addEventListener('touchmove', moveDrag, { passive: false });
  toast.addEventListener('touchend', endDrag);
  toast.addEventListener('touchcancel', endDrag);

  // Mouse
  toast.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', endDrag);
}