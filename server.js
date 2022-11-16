import smtp from "smtp-protocol";
import mailparser from 'mailparser';
const { simpleParser } = mailparser
const server = smtp.createServer(function (req) {
  req.on("greeting", function (to, ack) {
    ack.accept();
  });
  req.on("from", function (to, ack) {
    ack.accept();
  });
  req.on("to", function (to, ack) {
    ack.accept();
  });
  req.on("message", function (stream, ack) {
    // stream.pipe(simpleParser);
    // simpleParser.on("end", function (mail_object) {
    //   console.log(mail_object); //这里就是解析好的mail格式
    // });
    simpleParser(stream, (err, mailObject) => {
      console.log(err, mailObject);
    })
    ack.accept();
  });
});
server.listen(25);
console.log("starting mail server listen port 25.");
