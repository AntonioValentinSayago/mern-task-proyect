import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

const checkAuth = async ( req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            const decodes = jwt.verify(token, process.env.JWT_SECRET)
            req.usuario = await Usuario.findById(decodes.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            return next();

        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un Error '})
        }
    }

    if (!token) {
        const error = new Error('El Token no es Valido')
        res.status(401).json({ msg: error.message })
    }

    next();
}

export default checkAuth;