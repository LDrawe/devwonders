const main = document.querySelector('main')
const sidebar = document.querySelector('main nav')
const list = document.querySelector('main nav ul')
const sidebarButton = document.querySelector('#sidebar-Control')
const elements = document.querySelectorAll('article h2')

for (const element of elements) {
    element.id = element.textContent.replace(/ /g, '').toLowerCase().trim()
    const item = document.createElement('li')
    const link = document.createElement('a')
    link.href = '#' + element.id
    link.textContent = element.textContent
    item.appendChild(link)
    list.appendChild(item)
}

let value = localStorage.getItem('sidebar-open') || 1

main.style.setProperty('--sidebar-open', value)

sidebar.addEventListener('transitionend', () => { // Being the perfectionist I am, I did this to deallocate the space of the list in the DOM
    list.style.display = value == 1 ? 'grid' : 'none' // It even helps with screen readers
})

sidebarButton.addEventListener('click', () => {
    value *= -1
    localStorage.setItem('sidebar-open', value)
    main.style.setProperty('--sidebar-open', value)
    if (value == 1) {
        list.style.display = 'grid'
    }
})