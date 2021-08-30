const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'fedorov_danilka@bk.ru',
        pass: 'Cegthvty200',
    } 
},
{
    from: 'Пицца-Репорт <fedorov_danilka@bk.ru>',
});

const mailer = message =>{
    transporter.sendMail(message, (err, info)=>{
        if(err) return err;
    });
}

module.exports = mailer;