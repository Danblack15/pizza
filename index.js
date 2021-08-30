const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
express = require('express'),
    app = express(),
    fs = require('fs'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    mysql = require('mysql2/promise');
    /*...configSQL...*/
    const config = require('./config');
const { read } = require('fs');
const mailer = require('./nodemailer');
const mailer_2 =  require('./nodemailer_2');
const mailer_3 = require('./nodemailer_repeat');

    app.use(cookieParser());

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/bucket', function(req, res){
    res.render('bucket')
});

app.get('/contacts', function(req, res){
    res.render('contacts');
});

app.get('/succsess_zakaz', function(req, res){
    if (req.cookies.Dop==='dopc'){
        res.render('succsess_zakaz')
    }else{
        res.render('index')
    }
});

app.get('/err_email', function(req, res){
    res.render('err_email')
});


/*POSTS*/

app.post('/zakaz', urlencodedParser, function(req, res){
    if (!req.body) return res.sendStatus(400);

    //console.log(req.body);

    async function main(){
        const conn = await mysql.createConnection(config);
        const [rows, fields] = await conn.execute("INSERT INTO `general_data`( `Name`, `Surname`, `Tel`, `Email`) VALUES ('" + req.body.Name + "', '" + req.body.Surname + "', '"+ req.body.Tel + "', '" + req.body.Email + "')");

        conn.end();
            
    }
    
    async function email(){
        let date = new Date;
        


        const message={
            to: '"mihaylonekrasow@yandex.ru"',
            subject: 'Заказ № ('+date.getDate()+' | '+date.getMonth()+' | '+date.getHours()+':'+date.getMinutes()+')',
            html: `
                <h2>Имя: <b>`+req.body.Name+`</b></h2>
                <h3>Телефон: <b>`+req.body.Tel+`</b></h3>
                <div style="border: 1px solid orangered; padding: 7px;">
                    <p>Улица: <b>`+req.body.Street+`</b></p>
                    <p>Дом: <b>`+req.body.House+`</b></p>
                    <p>Подъезд: <b>`+req.body.Podezd+`</b></p>
                    <p>Квартира: <b>`+req.body.Door+`</b></p>
                    <p>Пожелание к заказу: <b>`+req.body.Dop_text+`</b></p>
                </div>
                <h1>Заказ</h1>
                <div style="width:100vw; height:100%; border:1px solid orangered">
                    `+req.cookies.S1+`
                    `+req.cookies.S2+`
                </div>
                <h1>Итог: `+req.cookies.Price+`</h1>
            `,
        }
        mailer(message);

        if (req.body.Email){
            const message_1={
                to: '"'+req.body.Email+'"',
                subject: 'Заказ № ('+date.getDate()+' | '+date.getMonth()+' | '+date.getHours()+':'+date.getMinutes()+')',
                html: `
                    <h2>Имя: <b>`+req.body.Name+`</b></h2>
                    <div style="border: 1px solid orangered; padding: 7px;">
                        <p>Улица: <b>`+req.body.Street+`</b></p>
                        <p>Дом: <b>`+req.body.House+`</b></p>
                        <p>Подъезд: <b>`+req.body.Podezd+`</b></p>
                        <p>Квартира: <b>`+req.body.Door+`</b></p>
                        <p>Пожелание к заказу: <b>`+req.body.Dop_text+`</b></p>
                    </div>
                    <h1>Ваш Заказ:</h1>
                    <div style="width:100vw; height:100%; border:1px solid orangered">
                        `+req.cookies.S1+`
                        `+req.cookies.S2+`
                    </div>
                    <h1>Итог: `+req.cookies.Price+`</h1>
                    <h3>Телефон тех. поддержки: +79194427254</h3>
                    <h3>Почта: mihaylonekrasow@yandex.ru</h3>
     ~~       `,
            }
            console.log(mailer_3(message_1));
        }
    }
            function tm(){
                Name=req.body.Name
                res.clearCookie("S1");
                res.clearCookie("S2");
                res.clearCookie("Price");
                res.redirect('/succsess_zakaz');
            }
            setTimeout(tm, 1000);

    async function bc(){
        await main();
        await email();
    }
    bc();

});


app.post('/submit_email', urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    async function email(){
        let date = new Date;


        const message={
            to: '"mihaylonekrasow@yandex.ru"',
            subject: 'Репорт ('+date.getDate()+'.'+date.getMonth()+' | '+date.getHours()+':'+date.getMinutes()+')',
            html: `
                <h2>Имя: <b>`+req.body.name+`</b></h2>
                <h3>Почта: <b>`+req.body.email+`</b></h3>
                <div>
                    <h2>Сообщение:</h2>
                    <p style="border-top:1px solid orangered; border-bottom:1px solid orangered">`+req.body.text+`</p>
                </div>
                <p>`+date.getDate()+`.`+date.getMonth()+` (`+date.getHours()+`:`+date.getMinutes()+`)</p>
            `,
        }
        mailer_2(message);
    }

    async function bc(){
        await email();
        //res.redirect('/contacts');
    }
    bc();    
});


app.listen(3000, function () {
    console.log('Сервер запущен..');
});