const btnLang = document.querySelector('#dropdown_container img')
const nav = document.querySelector('header nav')
const container = document.querySelector('article')
const returnButton = document.querySelector('#rtn-btn')

btnLang.onclick = (event) => {
    event.stopPropagation() // Prevents the click on the image from closing the menu immediately
    nav.classList.toggle('dropdown_open')
};

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
        nav.classList.remove('dropdown_open')
    }
});

container.onscroll = () => {
    const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
    returnButton.classList.toggle('visible', shouldShow)
}

returnButton.onclick = () => {
    container.scrollTop = 0
}