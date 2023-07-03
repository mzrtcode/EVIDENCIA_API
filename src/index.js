// Importar los modulos necesarios
import express from 'express';
import userRoutes from './routes/user.routes.js';
import {PUERTO} from  './config.js'
import { connectDB } from './db.js';
import morgan from 'morgan';

// Crear una instancia de la aplicación Express
const app = express();


// Configurar el uso de JSON y las rutas de usuario
app.use(express.json());
app.use(morgan('dev'));

// Montar las rutas de usuario en la ruta '/api'
app.use('/api', userRoutes);

// Ruta principal para mostrar un mensaje de bienvenida
app.get("/", (req, res) => {
    res.send("🌎Bieveniedo a mi API SENA🌎");
});

// Conectar a MongoDB Atlas
connectDB();

// Iniciar el servidor en el puerto 3000
app.listen(PUERTO, () => console.log(`Aplicacion Corriendo en http://localhost:${PUERTO}`));