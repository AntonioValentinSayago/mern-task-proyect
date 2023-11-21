// ? Email para confirmar cuenta

import nodemailer from 'nodemailer'

export const emailResgitro = async (datos) => {

    // ? Enviar Email al servidor de MailTrap
    const { email, nombre, token } = datos;

    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "79c705687c5ff6",
            pass: "eedef36f07c870"
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
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "79c705687c5ff6",
            pass: "eedef36f07c870"
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
