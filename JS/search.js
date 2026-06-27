document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const input = searchContainer.querySelector('.search-input');
    const clearBtn = searchContainer.querySelector('.clear-btn');

    clearBtn.addEventListener('click', () => {
        input.value = ''; // Очищаем поле
        input.focus();    // Возвращаем фокус на ввод
    });
});
