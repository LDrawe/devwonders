const container = document.querySelector("article")

container.onscroll = () => {
    const returnButton = document.getElementById("return")
    const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
    returnButton.classList.toggle("visible", shouldShow)
    returnButton.classList.toggle("hidden", !shouldShow)
}

function resetScroll() {
    container.scrollTop = 0 // Set the scroll position to the top
}