import nodemailer from 'nodemailer'

export const emailRegistro =async(datos)=>{

    const  transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fc101864c858d7",
          pass: "80ff5ab4335a68"
        }
      });
        const {nombre , email, token} = datos
      const send = await transport.sendMail({
        from:'"task - admin proyects" <cuentas@task.com>',
        to: email,
        subject: "upTask - conprueba tu cuenta",
        text: "comprueba tu cuenta",
        html: ` <p>Hola ${nombre} bienvenido a upTask</p>
        <p>tu cuenta ya casi esta lista solo deves comprobarla cen el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">conprobar cuenta</a>        
         <p>IGNORA ESTE MENSAJE SI NO RECONOCES ESTA INTERACCION</p>
        `

      })
}


export const emailT =async(datos)=>{

  const  transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fc101864c858d7",
        pass: "80ff5ab4335a68"
      }
    });
      const {nombre , email, token} = datos
    const send = await transport.sendMail({
      from:'"task - admin proyects" <cuentas@task.com>',
      to: email,
      subject: "upTask - conprueba tu cuenta",
      text: "comprueba tu cuenta",
      html: ` <p>Hola ${nombre} bienvenido a upTask</p>
      <p>tu cuenta ya casi esta lista solo deves comprobarla cen el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/olvide-pass/${token}">conprobar cuenta</a>        
       <p>IGNORA ESTE MENSAJE SI NO RECONOCES ESTA INTERACCION</p>
      `

    })
}