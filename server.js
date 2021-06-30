import Express from "express";
import * as path from 'path';
import morgan from "morgan";

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());
app.use(morgan('tiny'))

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'))
})

app.post("/", async (req, res) => {
    //console.log("contenido del POST: ", req);
    res.sendFile(path.resolve('public/html/listening.html'))
})

app.listen(port, () => console.log("Listening on port " + port));