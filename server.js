import Express from "express";

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'))
})

app.listen(port, () => console.log("Listening on port " + port));