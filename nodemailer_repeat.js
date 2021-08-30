const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'fedorov_danilka@bk.ru',
        pass: '****',
    } 
},
{
    from: 'Доставка Пиццы! <fedorov_danilka@bk.ru>',
});

function mailer_3(message_1){
    let bol = new Boolean;
    bol= true;
    transporter.sendMail(message_1, (err, info)=>{
        if(err !== null){
            console.log('Ошибка');
            bol=false;
        }else{
            console.log('Всё верно');
            bol= true;
        }
    });
        return bol;
}

    module.exports = mailer_3;
