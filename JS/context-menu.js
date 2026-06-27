
const tagDropdown = document.getElementById('tagDropdown');
let currentOpenButton = null; // Хранит ссылку на кнопку, которая открыла текущее меню

// Глобальный Map для хранения выбранных значений для каждой кнопки
// Ключ: ID кнопки, Значение: выбранный label (строка)
const buttonSelections = new Map();

/**
 * Функция для получения целевого div внутри кнопки, текст которого нужно менять.
 * @param {HTMLElement} buttonElement - Кнопка.
 * @returns {HTMLElement|null} Целевой div или null, если не найден.
 */
function getTargetTextDiv(buttonElement) {
    // Внутри div который является кнопкой, есть div с классом element,
    // внутри которого есть другой div, внутри которого есть надпись.
    return buttonElement.querySelector('.element > div');
}

/**
 * Функция для отображения и заполнения выпадающего меню.
 * @param {HTMLElement} buttonElement - Кнопка, вызвавшая меню.
 * @param {Array<Object>} items - Список элементов для меню.
 * @param {'mark'|'icon'} type - Тип элементов ('mark' для radio-кнопок, 'icon' для ссылок с иконками).
 */
function showDropdown(buttonElement, items, type) {

    tagDropdown.innerHTML = ''; // Очищаем предыдущие элементы

    // Получаем текущий текст из div внутри кнопки, чтобы отметить выбранный пункт в меню
    const targetDiv = getTargetTextDiv(buttonElement);
    const currentButtonText = targetDiv ? targetDiv.textContent : null;
    let width_size = 200;
    // Генерируем HTML для каждого элемента меню
    items.forEach((item, index) => {
        let itemHtml;

        if (item.separator === true) {
            tagDropdown.insertAdjacentHTML('beforeend', '<div class="dropdown-separator"></div>');
            return; // Переходим к следующей итерации
        }
        if (type === 'mark') {
            let label = item.label;
            let value = item.value || index; // Используем item.value если есть, иначе index
            let checked = "";

            // Специальная обработка для первого элемента как "Никакой"
            if (index === 0) {
                label = "Никакой";
                value = "none"; // Используем 'none' как значение для "Никакой"
                checked = "checked";
            }

            // Проверяем, соответствует ли этот пункт текущему тексту кнопки
            if (currentButtonText === label) {
                checked = "checked";
            } else if (!currentButtonText && index === 0) {
                // Если у кнопки нет текста, и это первый элемент ("Никакой"),
                // считаем его выбранным по умолчанию
                checked = "checked";
            }

            itemHtml = `
                <label class="dropdown-item clicked">
                    <input type="radio" name="tagSelection_${buttonElement.id}" value="${value}" id="tag_item_${buttonElement.id}_${value}" ${checked}>
                    <span class="checkmark-wrapper">
                        <svg class="checkmark-icon" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7L6.5 12.5L17 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>
                    <span class="item-text">${label}</span>
                </label>
            `;
        } else if (type === 'icon') {
            const dangerClass = item.danger ? 'is-danger' : '';
            if (item.link) {
                if (!item.icon) {
                    width_size = 250;
                    itemHtml = `
                        <a href="${item.link}" class="dropdown-item clicked">
                            <span class="item-text ${dangerClass}">${item.label}</span>
                        </a>
                    `;
                } else {
                    width_size = 200;
                    itemHtml = `
                        <a href="${item.link}" class="dropdown-item clicked">
                            <span class="icon-wrapper">
                                <svg class="${item.icon}"><use href="#${item.icon}"></use></svg>
                            </span>
                            <span class="item-text ${dangerClass}">${item.label}</span>
                        </a>
                    `;
                }
            } else if (item.onclick) {
                if (!item.icon) {
                    width_size = 250;
                    itemHtml = `
                        <a onclick="${item.onclick}" class="dropdown-item-label clicked">
                            <span class="item-text ${dangerClass}">${item.label}</span>
                        </a>
                    `;
                } else {
                    width_size = 200;
                    itemHtml = `
                            <a onclick="${item.onclick}" class="dropdown-item clicked">
                                <span class="icon-wrapper">
                                    <svg class="${item.icon}"><use href="#${item.icon}"></use></svg>
                                </span>
                                <span class="item-text ${dangerClass}">${item.label}</span>
                            </a>
                        `;
                }
            }
        }
        tagDropdown.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Добавляем обработчики событий для radio-кнопок ТОЛЬКО если тип 'mark'
    if (type === 'mark') {
        tagDropdown.querySelectorAll(`input[name="tagSelection_${buttonElement.id}"]`).forEach(radioInput => {
            radioInput.addEventListener('change', function() {
                if (this.checked) {
                    const selectedLabel = this.closest('.dropdown-item').querySelector('.item-text').textContent;
                    const targetDivToUpdate = getTargetTextDiv(currentOpenButton); // Используем currentOpenButton
                    if (targetDivToUpdate) {
                        targetDivToUpdate.textContent = selectedLabel; // Меняем надпись внутри кнопки
                        buttonSelections.set(currentOpenButton.id, selectedLabel); // Сохраняем выбранный label
                    }
                    hideDropdown(); // Закрываем меню после выбора
                }
            });
        });
    }


    // Позиционируем выпадающее меню согласно вашим требованиям
    const buttonRect = buttonElement.getBoundingClientRect();
    tagDropdown.style.top = `${buttonRect.top + window.scrollY}px`;
    tagDropdown.style.left = `${buttonRect.right - width_size}px`;
    tagDropdown.style.right = `auto`;
    tagDropdown.style.maxHeight = '264px'; // 6 элементов

    tagDropdown.style.display = 'block'; // Показываем меню
    currentOpenButton = buttonElement; // Запоминаем кнопку, которая его открыла

    // Если нет текущего текста в кнопке и не установлен выбор,
    // устанавливаем его на первый элемент ("Никакой")
    if (!currentButtonText) {
        // Убедимся, что первый элемент (Никакой) выбран по умолчанию
        const firstRadio = tagDropdown.querySelector(`input[name="tagSelection_${buttonElement.id}"][value="none"]`);
        if (firstRadio && !firstRadio.checked) {
             firstRadio.checked = true;
             // Обновляем текст кнопки сразу же
             if (targetDiv) {
                 targetDiv.textContent = "Никакой";
                 buttonSelections.set(buttonElement.id, "Никакой");
             }
        }
    }
}

/**
 * Функция для скрытия выпадающего меню.
 */
function hideDropdown() {
    // 1. Добавляем класс, который запускает анимацию bounceHide из CSS
    tagDropdown.classList.add('closing');

    // 2. Ждем окончания анимации (событие 'animationend')
    tagDropdown.addEventListener('animationend', () => {
        // 3. Только теперь скрываем элемент полностью
        tagDropdown.style.display = 'none';
        
        // 4. Убираем класс закрытия, чтобы при следующем открытии он не мешал
        tagDropdown.classList.remove('closing');
        
        currentOpenButton = null;
    }, { once: true }); // { once: true } автоматически удалит обработчик после выполнения
}


// Прикрепляем обработчики событий ко всем кнопкам с id, начинающимся на "cntxt_menu_btn_"
document.querySelectorAll('[id^="cntxt_menu_btn_"]').forEach(button => {
    // Инициализация текста кнопки при загрузке страницы, если еще не задано
    const targetDiv = getTargetTextDiv(button);
    if (targetDiv && !targetDiv.textContent) {
        // Здесь вы можете задать текст по умолчанию, например "Никакой"
        // или взять его из buttonSelections, если оно было сохранено ранее (например, при перезагрузке)
        const initialLabel = buttonSelections.get(button.id) || "Никакой";
        targetDiv.textContent = initialLabel;
        buttonSelections.set(button.id, initialLabel);
    }

    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Предотвращаем закрытие меню сразу же по клику на документ

        const buttonIdSuffix = this.id.split('_').pop(); // Извлекаем суффикс ID (например, '01')

        // Если меню уже открыто этой же кнопкой, скрываем его
        if (currentOpenButton === this && tagDropdown.style.display === 'block') {
            hideDropdown();
            return;
        }

        // Скрываем любое открытое меню, прежде чем открывать новое
        if (tagDropdown.style.display === 'block') {
            hideDropdown();
        }

        let itemsList = null;
        let listType = '';

        // Пытаемся найти список с приставкой 'mark'
        if (typeof window[`list_items_mark_${buttonIdSuffix}`] !== 'undefined') {
            itemsList = window[`list_items_mark_${buttonIdSuffix}`];
            listType = 'mark';
        }
        // Если не нашли, пытаемся найти список с приставкой 'icon'
        else if (typeof window[`list_items_icon_${buttonIdSuffix}`] !== 'undefined') {
            itemsList = window[`list_items_icon_${buttonIdSuffix}`];
            listType = 'icon';
        }
        // Если список найден и не пуст, отображаем меню
        if (itemsList && itemsList.length > 0) {
            showDropdown(this, itemsList, listType);
        } else {
            console.warn(`Список данных для кнопки ${this.id} не найден или пуст.`);
            hideDropdown(); // Убедимся, что меню скрыто, если нет данных
        }
    });
});


// Закрываем меню, если клик произошел вне его или вне кнопки, которая его открыла
document.addEventListener('click', function(event) {
    if (tagDropdown.style.display === 'block' &&
        !tagDropdown.contains(event.target) && // Клик не внутри меню
        currentOpenButton && !currentOpenButton.contains(event.target)) { // Клик не по открывшей кнопке
        hideDropdown();
    }
});

// Дополнительно: закрываем меню по нажатию клавиши Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && tagDropdown.style.display === 'block') {
        hideDropdown();
    }
});