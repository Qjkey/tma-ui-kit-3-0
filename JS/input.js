document.addEventListener('DOMContentLoaded', () => {
    const inputContainers = document.querySelectorAll('.input-container');

    inputContainers.forEach(container => {
        const input = container.querySelector('.input-field');
        const clearBtn = container.querySelector('.clear-button');
        const prefix = input.dataset.prefilled || "";
        const limit = parseInt(input.dataset.limit) || Infinity; 

        if (prefix && !input.value.startsWith(prefix)) {
            input.value = prefix;
        }
        const fixCursorPosition = () => {
            if (prefix && input.selectionStart < prefix.length) {
                input.setSelectionRange(prefix.length, prefix.length);
            }
        };

        input.addEventListener('input', (e) => {

            if (prefix && !input.value.startsWith(prefix)) {
                input.value = prefix;
            }

            if (input.value.length > limit) {
                input.value = input.value.substring(0, limit);
            }
        });

        input.addEventListener('click', fixCursorPosition);
        input.addEventListener('focus', fixCursorPosition);
        
        input.addEventListener('keydown', (e) => {
            setTimeout(fixCursorPosition, 0);

            if (prefix && 
                e.key === 'Backspace' && 
                input.selectionStart === prefix.length && 
                input.selectionEnd === prefix.length) {
                e.preventDefault();
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = prefix;
                input.focus();
                if (prefix) {
                    input.setSelectionRange(prefix.length, prefix.length);
                }
            });
        }
    });
});