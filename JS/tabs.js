function initTabsLogic() {
    const tabHeaders = document.querySelectorAll('.tab-header');

    tabHeaders.forEach(header => {
        // Жестко выбираем табы ТОЛЬКО текущего хедера, полностью игнорируя нижний .navbar-capsule
        const tabs = Array.from(header.querySelectorAll('.tab')).filter(tab => !tab.closest('.navbar-capsule'));
        if (tabs.length === 0) return;
        
        const currentScreen = header.closest('.screen');
        const fallbackContainer = header.parentElement;
        const mainContainer = currentScreen || fallbackContainer; 
        if (!mainContainer) return;

        let sliderContainer = mainContainer.querySelector('.tab-container-slider');
        if (!sliderContainer && header.parentElement) {
            sliderContainer = header.parentElement.parentElement ? header.parentElement.parentElement.querySelector('.tab-container-slider') : null;
        }
        if (!sliderContainer) {
            sliderContainer = document.querySelector('.tab-container-slider');
        }

        // Ищем слайды строго внутри этого контейнера
        const allSlides = sliderContainer ? sliderContainer.querySelectorAll('.tab-slide') : [];
        
        const initialClass = header.classList.contains('adaptive') ? 'adaptive' :
                             header.classList.contains('usual') ? 'usual' : 'central';

        let underline = header.querySelector('.tab-underline');
        if (!underline) {
            underline = document.createElement('div');
            underline.classList.add('tab-underline');
            header.appendChild(underline);
        }

        const forceRenderCapsule = () => {
            const activeTab = header.querySelector('.tab.actives') || tabs[0];
            if (!activeTab) return;

            const isScreenHidden = currentScreen && currentScreen.classList.contains('hidden');
            if (isScreenHidden) {
                currentScreen.style.visibility = 'hidden';
                currentScreen.classList.remove('hidden');
            }

            const width = activeTab.offsetWidth;
            const left = activeTab.offsetLeft;

            if (isScreenHidden) {
                currentScreen.classList.add('hidden');
                currentScreen.style.visibility = '';
            }

            if (width > 0) {
                underline.style.width = width + 'px';
                underline.style.left = left + 'px';
            }
        };

        const setSliderTransform = (offsetStyle, useTransition = true) => {
            allSlides.forEach(slide => {
                slide.style.transition = useTransition ? 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
                slide.style.transform = offsetStyle;
            });
        };

        const updateTabsState = (targetTabId) => {
            const activeTab = header.querySelector(`[data-tab="${targetTabId}"]`);
            if (!activeTab) return;

            tabs.forEach(t => t.classList.remove('actives'));
            activeTab.classList.add('actives');

            if (header.classList.contains('adaptive')) {
                activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }

            forceRenderCapsule();

            if (allSlides.length > 0) {
                const activeIndex = tabs.indexOf(activeTab);
                if (activeIndex !== -1) {
                    setSliderTransform(`translateX(-${activeIndex * 100}%)`, true);
                }
            }
        };

        const adjustLayout = () => {
            if (sliderContainer && sliderContainer.classList.contains('is-swiping')) return;

            if (currentScreen && currentScreen.classList.contains('hidden') && !currentScreen.classList.contains('active')) {
                forceRenderCapsule();
                return;
            }

            const tabsCount = tabs.length;
            const parentWidth = header.parentElement ? header.parentElement.offsetWidth : window.innerWidth;

            header.classList.remove('adaptive', 'usual', 'central');
            header.classList.add('central');
            
            const totalTabsWidth = tabs.reduce((sum, tab) => sum + tab.offsetWidth, 0);
            
            header.classList.remove('central');
            header.classList.add(initialClass);

            if (tabsCount > 5 || totalTabsWidth > parentWidth) {
                header.classList.remove('central', 'usual');
                header.classList.add('adaptive');
            }
            else if (initialClass === 'central' && totalTabsWidth > (parentWidth * 0.8)) {
                header.classList.remove('central');
                header.classList.add('usual');
            }

            forceRenderCapsule();
        };

        let preventClickOnDrag = false;
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                if (preventClickOnDrag) return;
                updateTabsState(this.getAttribute('data-tab'));
            });
        });

        // --- ДВИЖОК СКРОЛЛА ДЛЯ ЛЕНТЫ ТАБОВ ---
        let isHeaderDragging = false;
        let headerStartX = 0;
        let headerScrollLeft = 0;

        header.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            
            isHeaderDragging = true;
            preventClickOnDrag = false;
            headerStartX = e.clientX;
            headerScrollLeft = header.scrollLeft;
            header.style.scrollBehavior = 'auto';
        }, { passive: true });

        window.addEventListener('pointermove', (e) => {
            if (!isHeaderDragging) return;
            e.stopPropagation();

            const x = e.clientX;
            const walkX = (x - headerStartX) * 1.3;
            
            if (Math.abs(walkX) > 5) {
                preventClickOnDrag = true;
            }
            header.scrollLeft = headerScrollLeft - walkX;
        }, { passive: true });

        window.addEventListener('pointerup', (e) => {
            if (isHeaderDragging) {
                e.stopPropagation();
                isHeaderDragging = false;
                header.style.scrollBehavior = 'smooth';
                setTimeout(() => { preventClickOnDrag = false; }, 50);
            }
        }, { passive: true });

        header.addEventListener('pointerleave', () => {
            if (isHeaderDragging) {
                isHeaderDragging = false;
                header.style.scrollBehavior = 'smooth';
            }
        }, { passive: true });

        forceRenderCapsule();
        setTimeout(forceRenderCapsule, 0);

        const observer = new MutationObserver(() => {
            if (!mainContainer.classList.contains('hidden') || mainContainer.classList.contains('active')) {
                adjustLayout();
                setTimeout(forceRenderCapsule, 50);
            }
        });
        observer.observe(mainContainer, { attributes: true, attributeFilter: ['class'] });

        // --- УНИВЕРСАЛЬНЫЕ ЖИВЫЕ СВАЙПЫ КОНТЕНТА ---
        if (sliderContainer && allSlides.length > 0) {
            let startX = 0;
            let startY = 0;
            let isDragging = false;
            let isClickIntent = true;
            let containerWidth = 0;
            let currentTransformOffset = 0;

            const clickThreshold = 7;
            const minSwipeDistance = 50;

            const preventNativeClick = (e) => {
                if (!isClickIntent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            };

            sliderContainer.addEventListener('pointerdown', function(e) {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                
                const activeTab = header.querySelector('.tab.actives') || tabs[0];
                if (!activeTab) return;
                
                const activeIndex = tabs.indexOf(activeTab);
                if (activeIndex === -1) return;
                
                containerWidth = mainContainer.offsetWidth || window.innerWidth;
                currentTransformOffset = -activeIndex * containerWidth;

                startX = e.clientX;
                startY = e.clientY;
                isDragging = true;
                isClickIntent = true;

                sliderContainer.addEventListener('click', preventNativeClick, { capture: true });
            }, { capture: true, passive: true });

            sliderContainer.addEventListener('pointermove', function(e) {
                if (!isDragging) return;

                const currentX = e.clientX;
                const currentY = e.clientY;
                
                const diffX = currentX - startX;
                const diffY = Math.abs(currentY - startY);

                if (Math.abs(diffX) > clickThreshold && isClickIntent) {
                    isClickIntent = false;
                    sliderContainer.classList.add('is-swiping');
                }

                if (diffY > Math.abs(diffX) && isClickIntent) {
                    isDragging = false;
                    return;
                }

                if (!isClickIntent) {
                    let dragOffset = currentTransformOffset + diffX;
                    const maxOffset = 0;
                    
                    // ФИКС: Ограничиваем свайп только количеством реальных слайдов текущего экрана
                    const minOffset = -(allSlides.length - 1) * containerWidth;
                    
                    if (dragOffset > maxOffset) {
                        dragOffset = diffX * 0.25;
                    } else if (dragOffset < minOffset) {
                        const overdrag = dragOffset - minOffset;
                        dragOffset = minOffset + overdrag * 0.25;
                    }

                    setSliderTransform(`translateX(${dragOffset}px)`, false);
                }
            }, { passive: true });

            sliderContainer.addEventListener('pointerup', function(e) {
                if (!isDragging) return;
                isDragging = false;

                sliderContainer.classList.remove('is-swiping');

                if (isClickIntent) {
                    sliderContainer.removeEventListener('click', preventNativeClick, { capture: true });
                    return;
                }

                const endX = e.clientX;
                const totalDragDistance = endX - startX;

                const activeTab = header.querySelector('.tab.actives') || tabs[0];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex === -1) return;
                
                let targetIndex = currentIndex;

                // ФИКС: Сверяем переключение со слайдами
                if (totalDragDistance < -minSwipeDistance && currentIndex < allSlides.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (totalDragDistance > minSwipeDistance && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }

                updateTabsState(tabs[targetIndex].getAttribute('data-tab'));

                setTimeout(() => {
                    sliderContainer.removeEventListener('click', preventNativeClick, { capture: true });
                }, 10);
            }, { passive: true });

            sliderContainer.addEventListener('pointerleave', () => {
                if (isDragging) {
                    isDragging = false;
                    sliderContainer.classList.remove('is-swiping');
                    sliderContainer.removeEventListener('click', preventNativeClick, { capture: true });
                    const activeTab = header.querySelector('.tab.actives') || tabs[0];
                    if (activeTab) updateTabsState(activeTab.getAttribute('data-tab'));
                }
            }, { passive: true });
        }

        new ResizeObserver(adjustLayout).observe(header.parentElement);
        window.addEventListener('load', adjustLayout);
    });
}

document.addEventListener('DOMContentLoaded', initTabsLogic);