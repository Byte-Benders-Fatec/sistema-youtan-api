import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});

const sendEmail = (email: string, user_password: string): void => {
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Cadastro realizado com sucesso!",
        text: `Senha de acesso: ${user_password}`,
    });
};


export const emailUtils = {
    sendEmail
};