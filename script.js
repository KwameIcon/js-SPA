window.onload = () =>{

    const URLParams = new URLSearchParams(window.location.search);
    const path = URLParams.get(`path`);


    switch(path){
        case null:
        case ``:
            {
                loadPage(`home`);
                break;
            }
        case `home`:
            {
                loadPage(`home`);
                break;
            }
        case `about`:
            {
                loadPage(`about`);
                break;
            }
        case `pricing`:
            {
                loadPage(`pricing`);
                break;
            }
        default:
            {
                loadPage(`404`);
                break;
            }
    }

    
    // const path = window.location.pathname.replace(`/`, ``);

    if(path === ``){
        loadHomePageContent()
        .then((response) =>{
            document.getElementById('container').innerHTML = response;
        })
        .catch((err) =>{
            document.getElementById('container').innerHTML = err;
        })
    }else{
        loadPage(path);
    }

    document.querySelectorAll(".menu_item").forEach((item) => {
      item.onclick = () => {
        const path = item.getAttribute(`value`);
        loadPage(path);
        window.history.pushState({ path }, `My pages`, `/?path=${path}`);
      };
    });

    function loadPage(path){
        const request = new XMLHttpRequest();
        request.open(`GET`, `pages/${path}` + `.html`);
        request.send();
        request.onload = () =>{
            if(request.status === 200){
                document.getElementById('container').innerHTML = request.responseText;
            }
        }
    }

    function loadHomePageContent(){
        return new Promise((resolve, reject) =>{
            const request = new XMLHttpRequest();
            request.open(`GET`, `pages/home.html`, true);
            request.send();
            request.onload = () =>{
                if(request.status === 200){
                    resolve(request.response);
                }else{
                    reject(`Error occur while try to load the home page`);
                }
            }
        })
    }
}