/**
 * DevWonders JavaScript Code Runner
 * Minimalist, professional icon-based runner for verified runnable snippets.
 */
(() => {
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function formatConsoleValue(val) {
        if (val === undefined) return '<span class="tok-undefined">undefined</span>';
        if (val === null) return '<span class="tok-null">null</span>';
        if (typeof val === 'boolean') return `<span class="tok-boolean">${val}</span>`;
        if (typeof val === 'number') return `<span class="tok-number">${val}</span>`;
        if (typeof val === 'string') return `<span class="tok-string">"${escapeHtml(val)}"</span>`;
        if (typeof val === 'function') return `<span class="tok-func">ƒ ${escapeHtml(val.name || 'anonymous')}()</span>`;
        if (val instanceof Error) return `<span class="tok-error">${escapeHtml(val.name)}: ${escapeHtml(val.message)}</span>`;

        if (Array.isArray(val)) {
            const isSimpleArray = val.every(item => typeof item !== 'object' || item === null);
            if (isSimpleArray && val.length <= 15) {
                const items = val.map(formatConsoleValue).join(', ');
                return `[ ${items} ]`;
            }
            const items = val.map(item => {
                if (typeof item === 'object' && item !== null) {
                    const props = Object.entries(item)
                        .map(([k, v]) => `<span class="tok-key">${k}</span>: ${formatConsoleValue(v)}`)
                        .join(', ');
                    return `{ ${props} }`;
                }
                return formatConsoleValue(item);
            }).join(', ');
            return `[ ${items} ]`;
        }

        if (typeof val === 'object') {
            const entries = Object.entries(val);
            const isNested = entries.some(([_, v]) => typeof v === 'object' && v !== null);

            // Simple flat object
            if (!isNested) {
                const props = entries
                    .map(([k, v]) => `<span class="tok-key">${k}</span>: ${formatConsoleValue(v)}`)
                    .join(', ');
                return `{ ${props} }`;
            }

            // Structured nested object (e.g. Object.groupBy output)
            const lines = entries.map(([k, v]) => {
                if (Array.isArray(v)) {
                    const arrItems = v.map(item => {
                        if (typeof item === 'object' && item !== null) {
                            const subProps = Object.entries(item)
                                .map(([sk, sv]) => `<span class="tok-key">${sk}</span>: ${formatConsoleValue(sv)}`)
                                .join(', ');
                            return `{ ${subProps} }`;
                        }
                        return formatConsoleValue(item);
                    }).join(',\n      ');
                    return `  <span class="tok-key">${k}</span>: [\n      ${arrItems}\n  ]`;
                }
                return `  <span class="tok-key">${k}</span>: ${formatConsoleValue(v)}`;
            });
            return `{\n${lines.join(',\n')}\n}`;
        }

        return escapeHtml(String(val));
    }

    function initRunner() {
        const containers = document.querySelectorAll('div[data-runnable="true"]:has(> div.language-control)');

        containers.forEach(container => {
            const header = container.querySelector('.language-control');
            const codeEl = container.querySelector('pre > code[class*="language-javascript"], pre > code[class*="language-js"]');

            if (!header || !codeEl) return;
            if (header.querySelector('.code-actions')) return; // Avoid duplicate init

            // 1. Create Compact Actions Group (Clear on LEFT, Run on RIGHT)
            const actions = document.createElement('div');
            actions.className = 'code-actions';

            const clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'code-action-btn code-clear-btn';
            clearBtn.title = 'Clear output';
            clearBtn.setAttribute('aria-label', 'Clear output');
            clearBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `;

            const runBtn = document.createElement('button');
            runBtn.type = 'button';
            runBtn.className = 'code-action-btn code-run-btn';
            runBtn.title = 'Run code (logs to DevTools Console)';
            runBtn.setAttribute('aria-label', 'Run code snippet');
            runBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="13" height="13">
                    <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"/>
                </svg>
            `;

            // Clear button appended first so it sits to the LEFT of Run button!
            actions.appendChild(clearBtn);
            actions.appendChild(runBtn);
            header.appendChild(actions);

            // 2. Create Minimalist Console Drawer under <pre>
            const drawer = document.createElement('div');
            drawer.className = 'code-console-drawer';
            drawer.innerHTML = `<div class="code-console-body"></div>`;
            container.appendChild(drawer);

            const consoleBody = drawer.querySelector('.code-console-body');

            // Clear handler
            clearBtn.addEventListener('click', () => {
                consoleBody.innerHTML = '';
                drawer.classList.remove('is-open');
                clearBtn.classList.remove('is-active');
            });

            // 3. Run handler
            runBtn.addEventListener('click', async () => {
                runBtn.style.opacity = '0.5';
                runBtn.disabled = true;

                consoleBody.innerHTML = '';
                drawer.classList.add('is-open');
                clearBtn.classList.add('is-active');

                let outputLogged = false;

                const appendRow = (type, args) => {
                    outputLogged = true;
                    const row = document.createElement('div');
                    row.className = `console-row ${type}`;

                    let prefix = '›';
                    if (type === 'warn') prefix = '⚠';
                    if (type === 'error') prefix = '✕';

                    const htmlContent = args.map(formatConsoleValue).join(' ');
                    row.innerHTML = `
                        <span class="console-row-prefix">${prefix}</span>
                        <span class="console-row-content">${htmlContent}</span>
                    `;
                    consoleBody.appendChild(row);
                    consoleBody.scrollTop = consoleBody.scrollHeight;
                };

                const customConsole = {
                    log: (...args) => {
                        window.console.log(...args);
                        appendRow('log', args);
                    },
                    info: (...args) => {
                        window.console.info(...args);
                        appendRow('log', args);
                    },
                    warn: (...args) => {
                        window.console.warn(...args);
                        appendRow('warn', args);
                    },
                    error: (...args) => {
                        window.console.error(...args);
                        appendRow('error', args);
                    }
                };

                const resetBtn = () => {
                    runBtn.style.opacity = '1';
                    runBtn.disabled = false;
                };

                try {
                    const rawSnippet = codeEl.textContent.trim();
                    const runner = new Function('console', `
                        return (async () => {
                            ${rawSnippet}
                        })();
                    `);

                    const execution = runner(customConsole);
                    if (execution && typeof execution.then === 'function') {
                        await execution;
                    }
                } catch (err) {
                    customConsole.error(err);
                } finally {
                    if (!outputLogged) {
                        appendRow('log', ['(Code executed with no output)']);
                    }
                    resetBtn();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRunner);
    } else {
        initRunner();
    }
})();
