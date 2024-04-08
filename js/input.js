const rangeInput = document.querySelector('input[type="range"]')
const meter = document.querySelector('meter')
const label = document.querySelector('section label')
const text = 'Fuel level: '

rangeInput.addEventListener('input', () => {
    meter.value = rangeInput.value
    label.textContent = text + rangeInput.value + '%'
})