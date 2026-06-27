document.addEventListener('DOMContentLoaded', () => {
    const swipeThreshold = 50; // Расстояние свайпа в пикселях для закрытия

    // Функция для открытия оверлея
    function openOverlay(overlayId) {
        const overlayContainer = document.querySelector(`[data-overlay="${overlayId}"]`);
        if (!overlayContainer) return;

        const profileModal = overlayContainer.querySelector('.profile-modal'); // Или любой другой класс модалки внутри

        overlayContainer.classList.add('active');
        
        if (profileModal) {
            profileModal.style.transition = 'transform 0.5s ease';
            profileModal.style.transform = 'translateY(0)';
        }
        
        // Запрещаем прокрутку body, когда оверлей открыт
        document.body.style.overflow = 'hidden';

        // Инициализируем свайпы для конкретного оверлея, если еще не инициализированы
        if (profileModal) {
            initOverlaySwipeListeners(overlayContainer, profileModal, overlayId);
        }
    }

    // Функция для закрытия оверлея
    function closeOverlay(overlayId) {
        const overlayContainer = document.querySelector(`[data-overlay="${overlayId}"]`);
        if (!overlayContainer) return;

        const profileModal = overlayContainer.querySelector('.profile-modal');

        overlayContainer.classList.remove('active');
        
        if (profileModal) {
            profileModal.style.transition = 'transform 0.3s ease';
            profileModal.style.transform = 'translateY(100%)';
        }

        // Разрешаем прокрутку body после закрытия оверлея
        setTimeout(() => {
            // Проверяем, нет ли других открытых оверлеев перед тем, как включить скролл обратно
            const anyActive = document.querySelector('[data-overlay].active');
            if (!anyActive) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    // Экспортируем в глобальную область, если нужно вызывать из других скриптов
    window.openOverlay = openOverlay;
    window.closeOverlay = closeOverlay; 

    // Глобальный делегат кликов (работает для всех data-open-overlay и data-close-overlay)
    document.addEventListener('click', (event) => {
        // Клик на кнопку открытия
        const openTarget = event.target.closest('[data-open-overlay]');
        if (openTarget) {
            const overlayId = openTarget.getAttribute('data-open-overlay');
            openOverlay(overlayId);
            return;
        }

        // Клик на кнопку закрытия
        const closeTarget = event.target.closest('[data-close-overlay]');
        if (closeTarget) {
            const overlayId = closeTarget.getAttribute('data-close-overlay');
            closeOverlay(overlayId);
            return;
        }

        // Клик по фону оверлея (закрытие при клике на затененную область)
        if (event.target.hasAttribute('data-overlay')) {
            const overlayId = event.target.getAttribute('data-overlay');
            closeOverlay(overlayId);
        }
    });

    // Функция инициализации свайпов (вызывается один раз для каждого оверлея при открытии)
    function initOverlaySwipeListeners(overlayContainer, profileModal, overlayId) {
        if (profileModal.dataset.swipeInitialized) return;
        profileModal.dataset.swipeInitialized = "true";

        let startY = 0;
        let currentY = 0;
        let dist = 0;
        let isDragging = false;

        // --- Логика тач-событий (Мобильные) ---
        profileModal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            profileModal.style.transition = 'none';
        }, { passive: true });

        profileModal.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            dist = currentY - startY;

            if (dist > 0) { // Только свайп вниз
                if (e.cancelable) e.preventDefault();
                profileModal.style.transform = `translateY(${dist}px)`;
            }
        }, { passive: false });

        profileModal.addEventListener('touchend', () => {
            if (dist > swipeThreshold) {
                closeOverlay(overlayId);
            } else {
                profileModal.style.transition = 'transform 0.3s ease';
                profileModal.style.transform = 'translateY(0)';
            }
            dist = 0;
        });

        // --- Логика мыши (ПК) ---
        profileModal.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                isDragging = true;
                startY = e.clientY;
                profileModal.style.transition = 'none';
            }
        });

        profileModal.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentY = e.clientY;
            dist = currentY - startY;

            if (dist > 0) {
                profileModal.style.transform = `translateY(${dist}px)`;
            }
        });

        const handleMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;
            if (dist > swipeThreshold) {
                closeOverlay(overlayId);
            } else {
                profileModal.style.transition = 'transform 0.3s ease';
                profileModal.style.transform = 'translateY(0)';
            }
            dist = 0;
        };

        profileModal.addEventListener('mouseup', handleMouseUp);
        profileModal.addEventListener('mouseleave', handleMouseUp);
    }
});