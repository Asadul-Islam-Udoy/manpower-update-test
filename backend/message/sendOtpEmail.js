const nodemailer = require('nodemailer');
exports.sendMailMethod=async(option)=>{
  try{
    console.log('isf',option)
    ///test perpas
    // var transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "9c04227de9c95c",
    //       pass: "c4058952f9608c"
    //     }
    //   });
    // //real email validation
    var transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'mdasadulislam20302030@gmail.com',//YOUR-GMAIL-ADDRESS
          pass: 'vjvqhqzdbccquqgd'//THE-GOOGLE-APP-PASSWORD
        },
      });

      const mailOption = {
        from:'"Manpower Station" <mdasadulislam20302030@gmail.com>',//reql time use //YOUR-GMAIL-ADDRESS
        to : option.email,
        subject:option.subject,
        text:`Your One-Time Password (OTP) is: ${option.message} This OTP is valid for the next 10 minutes. 
        Please do not share it with anyone.If you did not request this, please ignore this email.
        Thank you,
        [I SOFT COMMUNICATION ]`,
      }
      transport.sendMail(mailOption,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log('email verification successfully!')
        }
      })
  }
  catch(err){
    return option.res.status(400).json({
        success:false,
        message:err
    });
  }
}