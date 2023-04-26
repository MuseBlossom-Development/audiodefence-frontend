exports.handler = async (event, callback) => {

    const nodemailer = require("nodemailer");
    const smtpTransport = require('nodemailer-smtp-transport');

    const smtpEndpoint = "email-smtp.ap-northeast-2.amazonaws.com";
    const port = 587;
    const senderAddress = "museblossom.office@gmail.com";
    var toAddresses = "museblossom.office@gmail.com";
    const smtpUsername = "AKIAZBRIIDPDMFY3LRPS";
    const smtpPassword = "BGdAomop8f5wErrjWGaPhk6sWAwPNRday3nND7gfJxYR";

    const base64body = JSON.stringify(event.body)
    const body = JSON.parse(Buffer.from(base64body, 'base64').toString('utf8'))
    const data = {
        email: body.email,
        title: body.title,
        content: body.content
    }
    var subject = `${data.title}`;
    var body_text = `${data.content}`;
    // The body of the email for recipients whose email clients support HTML
    // content.
    var body_html = `<html>
  <head></head>
  <body>
  <h2> ${data.email} 님으로부터 NewsHi 피드백이 도착했습니다.</h2>
  <p> ${data.content}</p>
  </body>
  </html>`;

    // The message tags that you want to apply to the email.
    var tag0 = "key0=value0";
    var tag1 = "key1=value1";

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport(smtpTransport({
        host: smtpEndpoint, port: port, secure: false, // true for 465, false for other ports
        auth: {
            user: smtpUsername,
            pass: smtpPassword
        }
    }));

    let mailOptions = {
        from: senderAddress,
        to: toAddresses,
        subject: subject,
        text: body_text,
        html: body_html,
        service: "Gmail",
        // Custom headers for configuration set and message tags.
        headers: {
            'X-SES-MESSAGE-TAGS': tag0,
            'X-SES-MESSAGE-TAGS': tag1
        }
    };
    let info = transporter.sendMail(mailOptions);
    return info;
}