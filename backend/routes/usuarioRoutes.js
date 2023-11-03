import  express  from "express";
import { registrar, login } from "../controllers/usuarioController.js";
const router = express.Router();

// * Creacion, Registro y Confirmación de Usuarios

router.post('/', registrar) // ? Registrar nuevo Usuario
router.post('/login', login) // ? Autenticar los Usuarios


export default router;