// Use at least Nodemailer v4.1.0
import * as nodemailer from "nodemailer";

export const sendEmail = async (email: string, url: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<a href=${url}>${url}</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("Something went wrong while sending email");
  }
};
