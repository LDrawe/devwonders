const rangeInput = document.querySelector('input[type="range"]')
const meterValue = document.querySelector('meter')
const label = document.querySelector('section label')
const text = 'Fuel level: '

function updateMeterValue() {
    meterValue.value = rangeInput.value
    label.textContent = text + rangeInput.value + '%'
}