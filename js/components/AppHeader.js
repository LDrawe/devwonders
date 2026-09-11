import { getTopics, getBasePath } from '../utils/dom.js';

class AppHeader extends HTMLElement {
    async connectedCallback() {
        const topics = await getTopics();
        const basePath = getBasePath();
        const isInPages = window.location.pathname.includes('/pages/');

        const currentId = this.getAttribute('current') || this.detectCurrentPage(topics);
        const currentTopic = topics.find(t => t.id === currentId) || topics[0];
        const otherTopics = topics.filter(t => t.id !== currentTopic.id);

        const linksHtml = otherTopics.map(t => {
            const href = isInPages ? t.file : `${basePath}pages/${t.file}`;
            const iconSrc = `${basePath}public/icons/${t.icon}`;
            return `
                <li>
                    <a style="--color: ${t.color}" href="${href}">
                        <img src="${iconSrc}" alt="${t.alt}">
                        <span>${t.name}</span>
                    </a>
                </li>`;
        }).join('');

        const homeHref = isInPages ? '../index.html' : './index.html';
        const logoSrc = `${basePath}public/icons/favicon.svg`;
        const currentIconSrc = `${basePath}public/icons/${currentTopic.icon}`;
        const githubIconSrc = `${basePath}public/icons/github.svg`;

        this.innerHTML = `
        <header>
            <a href="${homeHref}">
                <h1>DevWonders</h1>
                <img src="${logoSrc}" alt="Logo">
            </a>
            <div id="dropdown_container">
                <button id="dropdown_btn" type="button" aria-label="Toggle navigation">
                    <div class="icon-box">
                        <img src="${currentIconSrc}" alt="${currentTopic.alt}">
                    </div>
                    <div class="arrow-box">
                        <span class="arrow"></span>
                    </div>
                </button>
                <nav>
                    <ul>${linksHtml}</ul>
                </nav>
            </div>
            <a id="github" target="_blank" rel="noopener noreferrer" href="https://github.com/LDrawe/devwonders" aria-label="DevWonders repository on GitHub">
                <img src="${githubIconSrc}" alt="Github Logo">
            </a>
        </header>`;

        this.setupDropdown();
        this.setupReturnToTop();
    }

    detectCurrentPage(topics) {
        const path = window.location.pathname.toLowerCase();
        const found = topics.find(t => path.includes(t.file.toLowerCase()));
        return found ? found.id : 'html';
    }

    setupDropdown() {
        const btnLang = this.querySelector('#dropdown_btn');
        const nav = this.querySelector('header nav');

        if (btnLang && nav) {
            btnLang.onclick = (event) => {
                event.stopPropagation();
                nav.classList.toggle('dropdown_open');
            };

            document.addEventListener('click', (event) => {
                if (!nav.contains(event.target) && !btnLang.contains(event.target)) {
                    nav.classList.remove('dropdown_open');
                }
            });
        }
    }

    setupReturnToTop() {
        const container = document.querySelector('article');
        const returnButton = document.querySelector('#rtn-btn');

        if (container && returnButton) {
            container.onscroll = () => {
                const shouldShow = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
                returnButton.classList.toggle('visible', shouldShow);
            };

            returnButton.onclick = () => {
                container.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }
}

if (!customElements.get('app-header')) {
    customElements.define('app-header', AppHeader);
}

export { AppHeader };
