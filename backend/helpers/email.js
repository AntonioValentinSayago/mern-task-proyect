// ? Email para confirmar cuenta

import nodemailer from 'nodemailer'

export const emailResgitro = async (datos) => {

    // ? Enviar Email al servidor de MailTrap
    const { email, nombre, token } = datos;

    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // ? Cuerpo del emial
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to: email,
        subject: 'UpTaks - Confirma tu cuenta',
        text: 'Comprueba tu cuenta en UpTask',
        html: `<p> Hola ${nombre}, comprueba tu cuenta en UpTask </p>
            <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

            <p> Si no creaste esta cuenta, ignora este mensaje </p>
        `
    })
}

// ? Cuerpo del Email para cuando se olvida el Password

export const emailOlvidePassword = async (datos) => {

    // ? Enviar Email al servidor de MailTrap
    const { email, nombre, token } = datos;


    // TODO: Mover hacia las variables de entorno
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // ? Cuerpo del emial
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to: email,
        subject: 'UpTaks - Reestablecer tu password',
        text: 'Reestablecer tu password',
        html: `<p> Hola ${nombre}, has solicitado restablecer tu password </p>
            <p> Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer tu password</a>

            <p> Si no confirmaste este email, ignora este mensaje </p>
        `
    })
}
