const LOCAL_STORAGE_KEY = 'my-site-data';

let data = [
]

window.onload = () => {
    const form = document.getElementById('link-form')
    form.addEventListener('submit', onFormSubmit);

    data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ??[];

    render();
   
};

function render() {
    const newLinkTemplet = document.querySelector('#link-template');

    const linkContainer = document.getElementById('link-container');
    while(linkContainer.firstChild)
        linkContainer.removeChild(linkContainer.firstChild)

    data.forEach((item,index) => {

        const newLink = newLinkTemplet.cloneNode(true)
        newLink.querySelector("button").dataset['id'] = index;
        newLink.querySelector("a").href = item.url;
        newLink.querySelector("a").textContent = item.text;

    newLink.style = "";
    linkContainer.appendChild(newLink);
    })
}

function addNode(){
    const dialog = document.getElementById('link-dialog');
    dialog.showModal()
}

function removeNode(btn){
    const id = btn.getAttribute('data-id');
    data.splice(id,1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

    render()
}

function onFormSubmit (event) {
    event.preventDefault();
    const form = document.getElementById('link-form');
    const formData = new FormData(form);

    const url = formData.get('url');
    const title = formData.get('title');

    data.push({
        url,
        text: title
    })

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    render();

    const dialog = document.getElementById('link-dialog');
    dialog.close();
}



