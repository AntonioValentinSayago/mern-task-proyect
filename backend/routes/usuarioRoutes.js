import  express  from "express";
import { registrar } from "../controllers/usuarioController.js";
const router = express.Router();

// * Creacion, Registro y Confirmación de Usuarios

router.post('/', registrar) // ? Registrar nuevo Usuario


export default router;