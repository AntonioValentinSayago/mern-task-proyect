import  express  from "express";
import { registrar, login, confirmar } from "../controllers/usuarioController.js";
const router = express.Router();

// * Creacion, Registro y Confirmación de Usuarios

router.post('/', registrar) // ? Registrar nuevo Usuario
router.post('/login', login) // ? Autenticar los Usuarios
router.get('/confirmar/:token', confirmar) // ? Confirmar cuenta de los usuarios


export default router;