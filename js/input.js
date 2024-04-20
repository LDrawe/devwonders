const rangeInput = document.querySelector('input[type="range"]')
const meter = document.querySelector('section .flex-column meter')
const label = document.querySelector('section .flex-column label')

rangeInput.addEventListener('input', () => {
    meter.value = rangeInput.value
    label.textContent = `Fuel level: ${rangeInput.value}%`
})