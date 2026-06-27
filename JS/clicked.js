document.addEventListener('DOMContentLoaded', () => {
    const MIN_ANIMATION_TIME = 200;

    document.addEventListener('pointerdown', (e) => {
        // Если родительский слайдер сейчас перелистывается — полностью игнорируем нажатие
        if (e.target.closest('.is-swiping')) return;

        const item = e.target.closest('.clicked');
        if (!item) return;

        if (e.pointerType === 'mouse' && e.button !== 0) return;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = item.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2.5;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        
        item.appendChild(ripple);

        const startTime = Date.now();
        const startX = e.clientX;
        const startY = e.clientY;
        const dragThreshold = 7; 

        requestAnimationFrame(() => {
            ripple.classList.add('is-active');
        });

        const fadeAndRemove = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_ANIMATION_TIME - elapsed);

            setTimeout(() => {
                ripple.classList.add('is-fading');
                setTimeout(() => ripple.remove(), 200);
            }, remaining);

            cleanup();
        };

        const handleMove = (moveEvent) => {
            const diffX = Math.abs(moveEvent.clientX - startX);
            const diffY = Math.abs(moveEvent.clientY - startY);

            // Если во время удержания начался свайп табов
            if (diffX > dragThreshold || diffY > dragThreshold || moveEvent.target.closest('.is-swiping')) {
                fadeAndRemove();
            }
        };

        const cleanup = () => {
            window.removeEventListener('pointerup', fadeAndRemove);
            window.removeEventListener('pointercancel', fadeAndRemove);
            window.removeEventListener('pointermove', handleMove);
            item.removeEventListener('pointerleave', fadeAndRemove);
        };

        window.addEventListener('pointerup', fadeAndRemove);
        window.addEventListener('pointercancel', fadeAndRemove);
        window.addEventListener('pointermove', handleMove);
        item.addEventListener('pointerleave', fadeAndRemove);
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; 
        
        // Запрещаем клики по чекбоксам/радио, если карточку тащат вбок
        if (e.target.closest('.is-swiping')) return;

        const item = e.target.closest('.clicked');
        if (!item) return;

        const input_radio = item.querySelector('input[type="radio"]');
        const input_checkbox = item.querySelector('input[type="checkbox"]');

        if (input_radio) {
            if (!input_radio.checked) {
                input_radio.checked = true;
                input_radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        } else if (input_checkbox) {
            const span = item.querySelector('.slider');
            if (e.target === span) return;

            input_checkbox.checked = !input_checkbox.checked;
            input_checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
});