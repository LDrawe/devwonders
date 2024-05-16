const cards = document.querySelectorAll('.card')

function handleHover(e) {
    const { currentTarget: target } = e
    const rect = target.getBoundingClientRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
}

for (const card of cards) {
    card.onmousemove = handleHover
}