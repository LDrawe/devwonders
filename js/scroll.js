const container = document.querySelector("article")

container.onscroll = () => {
    const returnButton = document.querySelector(".rtn-btn")
    const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
    returnButton.classList.toggle("visible", shouldShow)
}

function resetScroll() {
    container.scrollTop = 0 // Set the scroll position to the top
}