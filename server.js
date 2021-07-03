import Express from "express";
import * as path from 'path';
import morgan from "morgan";
import {k_producer_run, k_consumer_run} from "./kafka.js"

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());
app.use(morgan('tiny'));
app.use(Express.urlencoded({ extended: false }));

let username = "NO NAME"
let user_key = 0;
let usuarios = []

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'));
})

app.post("/", async (req, res) => {
    const { nombre } = req.body;
    username = nombre;
    console.log("Nombre del Estudiante: ", nombre);

    //Agrega "nombre" al array usuarios si no lo encuentra
    let located = usuarios.indexOf(nombre)
    if(located == -1){
        usuarios.push(nombre)
        user_key = usuarios.length - 1;
    }

    res.sendFile(path.resolve('public/html/listening.html'))
})

app.get("/username", async (req, res) => {
    res.json({ username , user_key });
})

app.put("/ksend", async (req,res) =>{
    const { nombre, tecla} = req.body;

    //Obtiene la llave como posicion del array "usuarios"
    let k_key = retornar_k_key(nombre)
    //console.log("tecla: ",tecla, "\tnombre: ",nombre, "\tk_key: ",k_key);

    await k_producer_run(k_key,tecla);
    //await k_consumer_run();
    res.json({ k_key, tecla, nombre })
})

app.listen(port, () => console.log("Listening on:\thttp://127.0.0.1:" + port));

//await k_admin_run()

function retornar_k_key(us_nombre){
    let located = usuarios.indexOf(us_nombre)
    if(located == -1){
        usuarios.append(us_nombre)
        located = usuarios.length - 1
    }
    return located
}
