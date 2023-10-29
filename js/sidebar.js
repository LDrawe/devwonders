const elements = document.getElementsByTagName('h2')
const sidebar = document.getElementsByTagName('ul')[1]

for (let i = 0; i < elements.length; i++) {
    elements[i].id = i;
    let item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = `#${elements[i].id}`;
    anchor.innerText = elements[i].innerText;
    item.appendChild(anchor);
    sidebar.appendChild(item);
}