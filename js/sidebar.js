const elements = document.querySelectorAll('h2')
const list = document.querySelector('main nav ul')

for (const element of elements) {
    element.id = element.textContent.replace(/ /g, '').toLowerCase().trim()
    const item = document.createElement('li')
    const link = document.createElement('a')
    link.href = '#' + element.id
    link.textContent = element.textContent
    item.appendChild(link)
    list.appendChild(item)
}
const sidebar = document.querySelector('main nav')
const sidebarButton = document.querySelector('#sidebar-Control')
const ul = document.querySelector('main nav ul')

sidebar.classList.add('slide')
sidebarButton.classList.add('slide')

let value = localStorage.getItem('sidebar-open') || 1

document.documentElement.style.setProperty('--sidebar-open', value)

sidebar.addEventListener('transitionend', () => {
    ul.style.display = value === 1 ? 'grid' : 'none'
})

sidebarButton.addEventListener('click', () => {
    value *= -1
    document.documentElement.style.setProperty('--sidebar-open', value)
    localStorage.setItem('sidebar-open', value)
    if (value == 1) {
        ul.style.display = 'grid'
    }
})