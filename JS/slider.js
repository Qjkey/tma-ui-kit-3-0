document.addEventListener('DOMContentLoaded', () => {
  // Весь твой код теперь внутри этой функции
  const slider = document.getElementById('mySlider');
  const valueLabel = document.getElementById('sliderValue');

  function updateSlider() {
    const min = parseInt(slider.min) || 0;
    const max = parseInt(slider.max) || 100;
    const value = parseInt(slider.value);
    
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.setProperty('--slider-progress', percentage);
    valueLabel.textContent = value;
  }

  if (slider && valueLabel) { // Безопасная проверка на существование элементов
    slider.addEventListener('input', updateSlider);
    updateSlider();
  }
});
