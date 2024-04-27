const btnMobile = document.querySelector('#btn-mobile')
const nav = document.querySelector('nav')
const container = document.querySelector('article')
const returnButton = document.querySelector('#rtn-btn')

btnMobile.onclick = () => {
    nav.classList.toggle('open')
}

container.onscroll = () => {
    const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
    returnButton.classList.toggle('visible', shouldShow)
}

returnButton.onclick = () => {
    container.scrollTop = 0 // Set the scroll position to the top
}