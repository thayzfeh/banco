const express= require('express');
const fs = require('fs')
const cors = require('cors')

const app = express();
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static("public"));

app.get('/', (req, res) =>{
    res.status(200).json({msg: 'Bem-Vindo à nossa api!'});
})

app.get('/country',(req,res)=>{

    const filePath = __dirname + '/output.json';

    fs.readFile(filePath, 'utf-8', (err, data) =>{
        if(err){
            console.log('Error reading file:', err);
            return res.status(500).json({msg: 'Erro ao ler o arquivo.'});
        }
        try{
            res.send(data);
        }catch(err){
            console.log('error sending json',err);
            return res.status(501).json({msg: `Erro enviando json: ${err}`});
        }
    })
})

app.listen(process.env.PORT || 80);
console.log('banco conectado!')