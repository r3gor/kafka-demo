import Express from "express";
import * as path from 'path';
import morgan from "morgan";
import { k_admin , k_admin_run} from "./kafka.js"

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());
app.use(morgan('tiny'));
app.use(Express.urlencoded({ extended: false }));

let username = "NO NAME"
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
    }


    res.sendFile(path.resolve('public/html/listening.html'))
})

app.get("/username", async (req, res) => {
    res.json({ username });
})

app.put("/ksend", async (req,res) =>{
    const { nombre, tecla} = req.body;

    //Obtiene la llave como posicion del array "usuarios"
    let k_key = retornar_k_key(nombre)
})

app.listen(port, () => console.log("Listening on:\thttp://127.0.0.1:" + port));


function retornar_k_key(us_nombre){
    let located = usuarios.indexOf(us_nombre)
    if(located == -1){
        usuarios.append(us_nombre)
        located = usuarios.length - 1
    }
    return located
}

