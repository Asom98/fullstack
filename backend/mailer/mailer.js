const nodemailer = require("nodemailer");
function mailerTest(){

    let config = {
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EPASS
        }
    }
    
    let transporter = nodemailer.createTransport(config)
    
    let message  = {
        from: process.env.EMAIL,
        to: "kaseemsh985@gmail.com",
        subject: "mailer test jo",
        text: "you got the message I know"
    }

    try{
        transporter.sendMail(message)
        console.log("Mail sent!!")
    }catch(e){
        console.log(e)
    }

}

module.exports = mailerTest
