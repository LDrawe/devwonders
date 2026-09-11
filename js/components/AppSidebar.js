class AppSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
            <ul></ul>
        </nav>
        <button id="sidebar-Control" title="Toggle sidebar" type="button" aria-label="Toggle sidebar"></button>`;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initSidebar());
        } else {
            this.initSidebar();
        }
    }

    initSidebar() {
        const main = document.querySelector('main');
        const sidebar = this.querySelector('nav');
        const list = this.querySelector('ul');
        const sidebarButton = this.querySelector('#sidebar-Control');
        const elements = document.querySelectorAll('article h2');

        for (const element of elements) {
            element.id = element.textContent.replace(/ /g, '').toLowerCase().trim();
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#' + element.id;
            link.textContent = element.textContent;
            item.appendChild(link);
            list.appendChild(item);
        }

        let rawValue = localStorage.getItem('sidebar-open');
        let value = rawValue !== null ? Number(rawValue) : 1;

        if (main) {
            main.style.setProperty('--sidebar-open', value);
        }

        if (value === -1) {
            list.style.display = 'none';
        }

        sidebar.addEventListener('transitionend', () => {
            list.style.display = value === 1 ? 'grid' : 'none';
        });

        sidebarButton.addEventListener('click', () => {
            value *= -1;
            localStorage.setItem('sidebar-open', value);
            if (main) {
                main.style.setProperty('--sidebar-open', value);
            }
            if (value === 1) {
                list.style.display = 'grid';
            }
        });
    }
}

if (!customElements.get('app-sidebar')) {
    customElements.define('app-sidebar', AppSidebar);
}

export { AppSidebar };
