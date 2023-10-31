const elements = document.querySelectorAll('h2');
const sidebar = document.querySelector('main nav ul'); // querySelector accepts css selectors

for (const element of elements) {
    element.id = element.textContent.replace(/ /g, '').toLowerCase();
    let item = document.createElement('li');
    let link = document.createElement('a');
    link.href = element.id;
    link.textContent = element.textContent;
    item.appendChild(link);
    sidebar.appendChild(item);
}