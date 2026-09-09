const TOPICS = [
    { id: 'html', name: 'HTML', file: 'html.html', icon: '../public/icons/html.svg', color: 'var(--html)', alt: 'HTML logo' },
    { id: 'css', name: 'CSS', file: 'css.html', icon: '../public/icons/css.svg', color: 'var(--css)', alt: 'CSS logo' },
    { id: 'js', name: 'JavaScript', file: 'js.html', icon: '../public/icons/js.svg', color: 'var(--js)', alt: 'JavaScript logo' },
    { id: 'git', name: 'Git', file: 'git.html', icon: '../public/icons/git.svg', color: 'var(--git)', alt: 'Git logo' },
    { id: 'vscode', name: 'VS Code', file: 'vscode.html', icon: '../public/icons/vscode.svg', color: 'var(--vscode)', alt: 'Visual Studio Code logo' },
    { id: 'ts', name: 'TypeScript', file: 'typescript.html', icon: '../public/icons/ts.svg', color: 'var(--ts)', alt: 'TypeScript logo' },
    { id: 'node', name: 'Node.js', file: 'node.html', icon: '../public/icons/node.svg', color: 'var(--node)', alt: 'Node.js logo' }
]

class AppHeader extends HTMLElement {
    connectedCallback() {
        const currentId = this.getAttribute('current') || this.detectCurrentPage()
        const currentTopic = TOPICS.find(t => t.id === currentId) || TOPICS[0]
        const otherTopics = TOPICS.filter(t => t.id !== currentTopic.id)

        const linksHtml = otherTopics.map(t => `
                    <li>
                        <a style="--color: ${t.color}" href="${t.file}">
                            <img src="${t.icon}" alt="${t.alt}">
                            <span>${t.name}</span>
                        </a>
                    </li>`).join('')

        this.innerHTML = `
    <header>
        <a href="../index.html">
            <h1>DevWonders</h1>
            <img src="../public/icons/favicon.svg" alt="Logo">
        </a>
        <div id="dropdown_container">
            <button id="dropdown_btn" type="button" aria-label="Toggle navigation">
                <div class="icon-box">
                    <img src="${currentTopic.icon}" alt="${currentTopic.alt}">
                </div>
                <div class="arrow-box">
                    <span class="arrow"></span>
                </div>
            </button>
            <nav>
                <ul>${linksHtml}
                </ul>
            </nav>
        </div>
        <a id="github" target="_blank" href="https://github.com/LDrawe/devwonders">
            <img src="../public/icons/github.svg" alt="Github Logo">
        </a>
    </header>`

        this.setupDropdown()
    }

    detectCurrentPage() {
        const path = window.location.pathname.toLowerCase()
        const found = TOPICS.find(t => path.includes(t.file.toLowerCase()))
        return found ? found.id : 'html'
    }

    setupDropdown() {
        const btnLang = this.querySelector('#dropdown_btn')
        const nav = this.querySelector('header nav')

        if (btnLang && nav) {
            btnLang.onclick = (event) => {
                event.stopPropagation()
                nav.classList.toggle('dropdown_open')
            }

            // Close the dropdown when clicking outside
            document.addEventListener('click', (event) => {
                if (!nav.contains(event.target) && !btnLang.contains(event.target)) {
                    nav.classList.remove('dropdown_open')
                }
            })
        }
    }
}

customElements.define('app-header', AppHeader)

const container = document.querySelector('article')
const returnButton = document.querySelector('#rtn-btn')

if (container && returnButton) {
    container.onscroll = () => {
        const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200
        returnButton.classList.toggle('visible', shouldShow)
    }

    returnButton.onclick = () => {
        container.scrollTop = 0
    }
}