var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();



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


var transport_2 = {
  host: process.env.MAIL_SERVER_2, // Don’t forget to replace with the SMTP host of your provider
  port: process.env.MAIL_PORT_2,
  auth: {
  user: process.env.USER_2,
  pass: process.env.PASS_2
}
}
var transporter_2 = nodemailer.createTransport(transport_2)
transporter_2.verify((error, success) => {
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
    to: 'info@securecapitaltrades.com',  // Change to email address that you want to receive messages on
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



router.post('/sap', (req, res, next) => {
  const name = req.body.first_name + " " + req.body.last_name;
  const email = req.body.email;
  const company = req.body.company;
  const website = req.body.website;
  const details = req.body.details;

  const content = `<h1>Name: ${name}</h1> \n Email: ${email} \n Company: ${company} \n Website: ${website} \n Details: ${details}`;

  const mail = {
    from: email,
    to: 'info@frankieglobalsolutions.com', 
    subject: `New Message from ${name} - Web Form`,
    text: content,
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>Nice Looking Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #FF8C00; /* Orange color for the heading */
            margin-bottom: 20px;
        }

        p {
            margin-bottom: 10px;
        }

        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #ffffff;
        }

        .details-table th,
        .details-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        .details-table th {
            color: #FF8C00; /* Orange color for the table header */
        }

        .details-table td {
            color: #333333;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #999999;
        }

        .footer a {
            color: #5D3FD3; /* Orange color for the footer link */
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Message from website</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Company: ${company}</p>
        <p>Website: ${website}</p>

        <table class="details-table">
            <tr>
                <th>Details</th>
            </tr>
            <tr>
                <td>${details}</td>
            </tr>
        </table>

        <div class="footer">
            <p>Powered by: <a href="https://arceus.tech">Arceus Tech</a></p>
        </div>
    </div>
</body>
</html>

`
  };

  transporter_2.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
        error: err // Include the error message for debugging purposes
      });
    } else {
      res.json({
        status: 'success'
      });
    }
  });
});


const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)