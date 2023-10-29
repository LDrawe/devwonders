const btnMobile = document.querySelector('button')
const nav = document.querySelector('nav')

btnMobile.onclick = () => {
    nav.classList.toggle('open')
}