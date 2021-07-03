
const get_username = async () => {
    let ans;
    await fetch(`/username`)
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error in GET /username"));
    return ans;
}

const render = async () => {
    const { username } = await get_username();
    document.querySelector("#welcome-user").innerText = `Escuchando a ${username}`;

    let body = document.getElementsByTagName("body");
    body = body[0]
    //Evento de presionar tecla
    function leer(evt){
        fetch("/ksend", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: username,
                tecla: evt.key
            })
        })
        .then(r => r.json())
        .then(d => console.log(d));
        
        console.log("enviado correctamente ", evt.key);
    }
    body.addEventListener("keypress",leer);
}

render();
