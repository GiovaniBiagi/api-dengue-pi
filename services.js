import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "giovani.alves121@gmail.com",
    pass: "mzdt prhq ohtt wcwt",
  },
});

export const sendEmail = async (config) => await transporter.sendMail(config);
