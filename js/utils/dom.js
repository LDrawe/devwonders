/**
 * Shared DOM and data utilities for DevWonders
 */

let topicsCache = null;

/**
 * Resolves relative base path depending on whether the current document is in /pages/ or at root
 * @returns {string} Path prefix ('./' or '../')
 */
export function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
}

/**
 * Fetches and caches the topic list from data/topics.json (Single Source of Truth)
 * @returns {Promise<Array>} Array of topic objects
 */
export async function getTopics() {
    if (topicsCache) return topicsCache;
    const basePath = getBasePath();
    try {
        const response = await fetch(`${basePath}data/topics.json`);
        if (!response.ok) {
            throw new Error(`Failed to load data/topics.json: HTTP ${response.status}`);
        }
        topicsCache = await response.json();
        return topicsCache;
    } catch (error) {
        console.warn('[DevWonders] Using fallback topics list:', error);
        return [
            { id: 'html', name: 'HTML', file: 'html.html', icon: 'html.svg', color: 'var(--html)', alt: 'HTML logo', ariaLabel: 'HTML tips and best practices' },
            { id: 'css', name: 'CSS', file: 'css.html', icon: 'css.svg', color: 'var(--css)', alt: 'CSS logo', ariaLabel: 'CSS tips and best practices' },
            { id: 'js', name: 'JavaScript', file: 'js.html', icon: 'js.svg', color: 'var(--js)', alt: 'JavaScript logo', ariaLabel: 'JavaScript tips and best practices' },
            { id: 'git', name: 'Git', file: 'git.html', icon: 'git.svg', color: 'var(--git)', alt: 'Git logo', ariaLabel: 'Git tips and best practices' },
            { id: 'vscode', name: 'VS Code', file: 'vscode.html', icon: 'vscode.svg', color: 'var(--vscode)', alt: 'Visual Studio Code logo', ariaLabel: 'Visual Studio Code tips and best practices' },
            { id: 'ts', name: 'TypeScript', file: 'typescript.html', icon: 'ts.svg', color: 'var(--ts)', alt: 'TypeScript logo', ariaLabel: 'TypeScript tips and best practices' },
            { id: 'node', name: 'Node.js', file: 'node.html', icon: 'node.svg', color: 'var(--node)', alt: 'Node.js logo', ariaLabel: 'Node.js tips and best practices' }
        ];
    }
}

/**
 * Renders home navigation cards dynamically from topics.json
 * @param {string} containerSelector
 */
export async function renderHomeCards(containerSelector = '#cards') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const topics = await getTopics();
    const basePath = getBasePath();

    container.innerHTML = topics.map((topic, index) => `
        <a class="card" style="--border-color: ${topic.color}; --index: ${index}" href="${basePath}pages/${topic.file}" aria-label="${topic.ariaLabel || topic.name}">
            <img src="${basePath}public/icons/${topic.icon}" alt="${topic.alt || topic.name + ' Logo'}" width="70" height="70">
        </a>
    `).join('');
}

// Attach to window for global access if needed
if (typeof window !== 'undefined') {
    window.DevWonders = window.DevWonders || {};
    window.DevWonders.getBasePath = getBasePath;
    window.DevWonders.getTopics = getTopics;
    window.DevWonders.renderHomeCards = renderHomeCards;
}
