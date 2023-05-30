import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get("/teste", (req, res) => {
  res.status(200).send({ mensagem: "Hello World" });
});

app.listen(port, () =>
  console.log(`servidor está rodando na porta http://localhost:${port}`)
);

export default app;