<div align="center">
  <img src="./public/icons/favicon.svg" alt="DevWonders Logo" height="120" />
  <h1 style="font-size: 3rem; color: #ffba5c;">DevWonders</h1>
  <p><strong>An Open-Source Wiki of coding tips, native features, and best practices</strong></p>

  <p>
    <a href="https://github.com/LDrawe/devwonders/search?l=html"><img src="https://img.shields.io/github/languages/top/LDrawe/devwonders?color=ffba5c&style=flat-square" alt="Github top language" /></a>
    <a href="https://github.com/LDrawe/devwonders"><img src="https://img.shields.io/github/languages/count/LDrawe/devwonders?color=ffba5c&style=flat-square" alt="Github language count" /></a>
    <a href="https://github.com/LDrawe/devwonders/stargazers"><img src="https://img.shields.io/github/stars/LDrawe/devwonders?color=ffba5c&style=flat-square" alt="Repository stars" /></a>
    <a href="https://github.com/LDrawe/devwonders/blob/main/LICENSE"><img src="https://img.shields.io/github/license/LDrawe/devwonders?color=ffba5c&style=flat-square" alt="License" /></a>
  </p>

  <h3>
    <a href="https://ldrawe.github.io/devwonders/">Explore the Live Wiki</a>
    <span> · </span>
    <a href="https://github.com/LDrawe/devwonders/issues">Report a Bug</a>
    <span> · </span>
    <a href="https://github.com/LDrawe/devwonders/pulls">Contribute</a>
  </h3>
</div>

---

## 📖 Table of Contents

* [About the Project](#-about-the-project)
* [Features & Content](#-features--content)
* [Built With](#-built-with)
* [How to Contribute](#-how-to-contribute)
* [License](#-license)
* [Author](#-author)

---

## 🚀 About the Project

**DevWonders** is a pragmatic, open-source knowledge base designed to streamline development. Instead of relying on heavy third-party libraries (NPM packages) or complex workarounds, this wiki focuses on modern native APIs, lesser-known browser features, and advanced concepts built directly into the web platform.

DevWonders serves as a practical reference guide for developers looking to position UI elements natively, handle complex application states without external dependencies, and utilize advanced terminal workflows efficiently.

> **Goal:** To provide a straightforward repository of clean code principles, native solutions, and practical techniques for modern developers.

---

## ✨ Features & Content

The wiki is organized into focused categories, each packed with interactive examples and copy-pasteable code blocks:

* **⚡ HTML:** Native `<dialog>` modals, the `inert` attribute for focus trapping, Popover API, and `<template>` rendering.
* **🎨 CSS:** Anchor Positioning, `@starting-style` for discrete animations, `light-dark()` functions, and modern logical properties.
* **🧠 JavaScript:** `Object.groupBy()`, `AbortController` for massive event cleanup, native UUID generation, and optional chaining.
* **🔧 Git:** Advanced terminal workflows including `git worktree`, `bisect` for tracking regressions, and `rerere` for conflict resolution.
* **⚙️ VS Code & Environments:** Productivity shortcuts, multi-cursor editing, and efficiency settings.
* **📐 Best Practices:** Clean Code principles, Guard Clauses (Early Return), semantic naming conventions, and pure functions.

---

## 🛠️ Built With

This project is a static site built with an absolute focus on performance and simplicity. It requires no installation or build tools to run locally.

* **HTML5** (Semantic structure and native interactive elements)
* **CSS3** (Custom properties, Flexbox, Grid, and modern CSS features)
* **Vanilla JavaScript** (ES6+ features, native DOM manipulation)
* **Prism.js** (For sleek, robust syntax highlighting)

---

## 🤝 How to Contribute

Contributions are highly encouraged. If you know a solid architectural pattern, a native API trick, or a clean code practice, we want it in the wiki.

Here is the step-by-step manual to add a new tip:

1. **Fork the Repository:** Create your own fork of the project.
2. **Locate the Category:** Find the relevant HTML file (e.g., `html.html`, `css.html`, `js.html`). If your topic requires a new category, create a new file following the existing layout.
3. **Add Your Section:** Copy the structure of an existing `<section>` tag. Every tip must include:
   * An `<h2>` title.
   * A `<p>` tag with a clear, direct explanation of the problem and the solution.
   * A code block properly formatted.
4. **Format the Code Block:** We use Prism.js. Ensure your code is wrapped like this:
   ```html
   <pre>
     <code class="language-javascript code-block">
       // Your code here
     </code>
   </pre>
   ```
5. **Add a Live Example (Optional but Recommended):** If your tip is visual (HTML/CSS), include an interactive, rendered example directly below the code block using inline styles or utility classes.
6. **Commit and Push:** 
```bash
git commit -m "Add [Topic] to [Category]"
git push origin main
```
7. **Open a Pull Request:** Submit your PR with a brief description of the native feature or practice you added.

---
## 📝 License

This project uses a Dual-License approach to ensure the freedom of the code snippets while protecting the original content and structure of the wiki:

Code Snippets: All code blocks (```<pre><code>```) and technical examples are released under the MIT License. You are free to copy, modify, and use them in your personal or commercial projects without any restrictions.

Content & Design: The written explanations, documentation, website design, and overall architecture of DevWonders are released under the Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license. If you remix, transform, or build upon the material, you must distribute your contributions under the same license and give appropriate credit.

See the LICENSE file for more details.
<div align="center">
<br>
<p>
 Built by <a href="https://github.com/LDrawe"><strong>Eduardo (LDrawe)</strong></a>
</p>
<p>
 <a href="https://github.com/LDrawe/devwonders/issues">Report Issue</a> • 
 <a href="https://github.com/LDrawe/devwonders/pulls">Request Feature</a> • 
 <a href="https://ldrawe.github.io/devwonders/">Live Wiki</a>
</p>
<p>Copyright © 2026 DevWonders.</p>
</div>
