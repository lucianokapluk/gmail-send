const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
//settings
app.set('port',process.env.PORT || 3000); //si existe puerto en el host por defecto lo usa, si no usa3000

//midle
app.use(bodyParser.urlencoded({extended:false})) //permite datps de formularios
app.use(bodyParser.json());// permite json

app.post('/api/v1/send-email', (req, res) => {

    const sendemail = require('gmail-send')({
            user: 'l.kapluk@itecriocuarto.org.ar',
            pass: 'lyde.12.red.red.hot',
            to:   'kaplukluciano@gmail.com',
            subject: req.body.subject,
    });

    sendemail({
            text:  'Name: '+ req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,  
            }, (error, result, fullResult) => {
                    if(error){
                            console.log(error)
                            return res.sendStatus(500)
                    }else{
                            console.log(result)
                            return res.sendStatus(200)
                            
                    }
                    
   
    })  

   
  
})
// starting the server
app.listen(app.get('port'),() => console.log(`Server on port ${app.get('port')}`)); 