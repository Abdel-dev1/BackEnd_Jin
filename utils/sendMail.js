const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// Testing transporter
transporter.verify((error, seccess) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for Emails");
    console.log(seccess);
  }
});

exports.sendEmailVerifyLink = async (link, receiver) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: receiver,
    subject: "JinCold: Email Verify",
    html: `<p>Verifier ton email address email via le link suivant:</p>
        <p>Ce link va <b>expirer dans 6 min</b>.</p>
        <p>Press <a href=${link}>Here </a> to proceed</p>`,
  };
  transporter
    .sendMail(mailOptions)
    .then((res) => console.log("Sucess"))
    .catch((err) => console.log(err));
};

/* const emailjs = require('emailjs-com') ;
const axios = require('axios') ;

emailjs.init(process.env.ADMIN_EMAIL);

exports.sendEmailVerifyLink = async (link, receiver) => {
    try {

        let message = `
            <html>
                <body>
                    <h1>Email Verify Link</h1><br/>
        ` ;

        message += ( "Link : <a href='" + link + "'>" + link + "</a><br/>") ;
        message += ( "Please, Click this link") ;

        message += `
            </body>
                </html>
        ` ;

        let templateParams = {
            from_email : process.env.ADMIN_EMAIL ,
            to_email : receiver,
            message : message
        }


        let data = {
            service_id: process.env.EMAIL_SERVICE_ID,
            template_id: process.env.EMAIL_TEMPLATE_ID,
            user_id: process.env.EMAIL_USER_ID,
            template_params: {
                ...templateParams
            }
        };

        let res = await axios.post('https://api.emailjs.com/api/v1.0/email/send' , data) ;

        console.log(res) ;

        return true ;

    } catch(err) {
        console.log(err) ;
        return false ;
    }
} */
