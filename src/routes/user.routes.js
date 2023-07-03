// Importar los módulos necesarios
import { Router } from "express";
import Usuario from "../models/user.js";

// Crear una instancia de Router
const router = Router();

// Ruta para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
    const { usuario, clave } = req.body;
    const nuevousuario = new Usuario({ usuario, clave });
    try {
        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevousuario.save();
        res.status(201).json({
            id: usuarioGuardado._id,
            usuario: usuarioGuardado.usuario,
            clave: usuarioGuardado.clave
        });
    } catch (error) {
        res.status(500).json({ mensaje: error });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error });
    }
});

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { usuario, clave } = req.body;
    try {
        // Buscar el usuario en la base de datos por nombre de usuario
        const usuarioEncontrado = await Usuario.findOne({ usuario });

        if (!usuarioEncontrado) {
            // Si el usuario no existe, enviar un mensaje de error
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        const claveCorrecta = usuarioEncontrado.clave === clave;

        if (!claveCorrecta) {
            // Si la clave es incorrecta, enviar un mensaje de error
            return res.status(401).json({ mensaje: 'Clave incorrecta' });
        }

        // Autenticación exitosa
        res.status(200).json({ mensaje: 'Autenticación exitosa' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// Exportar el router con las rutas
export default router;