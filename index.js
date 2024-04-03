import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Base de datos conectada");
} catch (error) {
  console.log(error);
}

// Definir puerto
const port = process.env.PORT || 4100;

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el ano actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar Router
app.use("/", router);

app.listen(port, () => {
  console.log(`El puerto esta funcionando en el puerto ${port}`);
});
