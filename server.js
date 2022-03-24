const express = require("express");
const random = require("random");
const Contenedor = require("./Contenedor");
const app = express();

const PORT = process.env.PORT|| 8080;

const server = app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${server.address().port}`);
});
//escuchar el evento
server.on(`error`, (error) => console.log(`Este es el error ${error}`));

const FILE_PATH = "productos.txt";
const contenedor = new Contenedor(FILE_PATH);

app.get(`/productos`, async (req, res) => {
  const productos = await contenedor.getAll();
  res.send(productos);
});

app.get(`/productoRandom`, async (req, res) => {
  const productos = await contenedor.getAll();
  const randomIndex = random.int(0, productos.length - 1);
  res.send(productos[randomIndex]);
});
