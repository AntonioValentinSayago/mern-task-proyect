import  express  from "express";
import { registrar, login, confirmar, olvidePassowrd, comprobarToken,nuevoPassword, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// * Creacion, Registro y Confirmación de Usuarios

router.post('/', registrar) // ? Registrar nuevo Usuario
router.post('/login', login) // ? Autenticar los Usuarios
router.get('/confirmar/:token', confirmar) // ? Confirmar cuenta de los usuarios
router.post('/olvide-password', olvidePassowrd) // ? Olvide el password
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) // ? Comprobar Token para el nuevoPassword

router.get('/perfil', checkAuth, perfil)


export default router;