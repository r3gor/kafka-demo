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

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'));
})

app.post("/", async (req, res) => {
    const { nombre } = req.body;
    username = nombre;
    console.log("Nombre del Estudiante: ", nombre);
    res.sendFile(path.resolve('public/html/listening.html'))
})

app.get("/username", async (req, res) => {
    res.json({ username });
})

app.put("/ksend", async (req,res) =>{
    console.log(req.body);
})

app.listen(port, () => console.log("Listening on:\thttp://127.0.0.1:" + port));

