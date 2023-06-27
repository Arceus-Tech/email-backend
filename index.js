var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');


var transport = {
    host: process.env.MAIL_SERVER, // Don’t forget to replace with the SMTP host of your provider
    port: process.env.MAIL_PORT,
    auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
}
var transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});
router.post('/send', (req, res, next) => {
  var name = req.body.first_name + " " + req.body.last_name
  var email = req.body.email
  var phone = req.body.phone
  var message = req.body.message
  var content = `<h1>name: ${name}</h1> \n email: ${email} \n phone: ${phone} \n message: ${message} `
  var mail = {
    from: name,
    to: 'info@arceus.tech',  // Change to email address that you want to receive messages on
    subject: `New Message from ${email}`,
    text: content,
    html : `
    <html>
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

<p style="font-size: 36px; font-weight: 500; line-height: 100%;  color: black;">Secure capital trades</p>
<p style="width: 100%; font-size: 27px; font-weight: 500; line-height: 34px; color: rgba(28, 30, 35, 1);">Received new message from <span style="color: #2563eb;"> ${name}</span></p>
<p style="width: 100%; font-size: 19px; line-height: 24px;  color: black;">Email address: ${email} <br/> Phone Number : ${phone}</p>
<p style="max-width: 80%; font-size: 20px; line-height: 153.50%; color: black;">
" ${message} "
</p>

</body>
</html> `
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})
const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)