import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 25,
  secure: false, // true for 465, false for other ports
//   auth: {
//     user: "viki_vivi_wd@163.com", // generated ethereal user
//     pass: "OSSDNUHOEHRPPSCX", // generated ethereal password
//   },
});

let mailOptions = {
  from: '"wd2010" <viki_vivi_wd@163.com>', // sender address
  to: "niuniu <kzx_niuniu@163.com>", // list of receivers
  subject: "Hello 你好", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
