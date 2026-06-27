function d_alert(title = "", description = "", type = "ok") {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'd-alert-overlay';
        
        let buttonsHtml = '';
        
        if (type === "ok") {
            buttonsHtml = `<button class="d-alert-btn clicked activing body1-medium" data-res="ok">OK</button>`;
        } else if (type === "ok_cancel") {
            buttonsHtml = `
                <button class="d-alert-btn clicked activing body1-medium" data-res="cancel">Отмена</button>
                <button class="d-alert-btn clicked activing body1-medium" data-res="ok">OK</button>`;
        } else if (type === "cancel_delete") {
            buttonsHtml = `
                <button class="d-alert-btn clicked activing body1-medium" data-res="cancel">Отмена</button>
                <button class="d-alert-btn danger clicked deleting body1-medium" data-res="delete">Удалить</button>`;
        }

        overlay.innerHTML = `
            <div class="d-alert-box">
                ${title ? `<div class="d-alert-title headline6">${title}</div>` : ''}
                <div class="d-alert-description body1">${description}</div>
                <div class="d-alert-buttons body1-medium">${buttonsHtml}</div>
            </div>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => overlay.classList.add('active'), 10);

        overlay.addEventListener('click', (e) => {
            const btn = e.target.closest('.d-alert-btn');
            
            if (btn) {
                // Клик по кнопке
                const result = btn.getAttribute('data-res');
                close();
                resolve(result);
            } else if (e.target === overlay) {
                // Клик именно по чёрному фону (вне d-alert-box)
                close();
                resolve('cancel'); // Возвращаем 'cancel' при закрытии фоном
            }
        });

        function close() {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 200);
        }
    });
}
