const btnLang = document.querySelector('#dropdown_btn') || document.querySelector('#dropdown_container img')
const nav = document.querySelector('header nav')
const container = document.querySelector('article')
const returnButton = document.querySelector('#rtn-btn')

if (btnLang) {
    btnLang.onclick = (event) => {
        event.stopPropagation()
        nav.classList.toggle('dropdown_open')
    }
}

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (nav && !nav.contains(event.target) && btnLang && !btnLang.contains(event.target)) {
        nav.classList.remove('dropdown_open')
    }
})

container.onscroll = () => {
    const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
    returnButton.classList.toggle('visible', shouldShow)
}

returnButton.onclick = () => {
    container.scrollTop = 0
}