const xlsx = require('xlsx');
const stream = require('stream');
const express = require('express')
const app = express()
const multer  = require('multer')
const fs = require('fs');
storage = multer.memoryStorage();
const upload = multer({ storage : storage })
const query=require('./querys');

app.use(express.static(__dirname + '/public/'))
 

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/uploadfile', upload.single('filePhoto'), (req, res, next) => {
    console.log('entro fileupload');   
    
    let file = req.file
    console.log(1);
    //console.log(file);
    //var code = fs.readFileSync(file, 'utf-8') 
    //var data = fs.readFileSync(req.file.buffer.toString('base64'), 'base64');
    let bufferStream = new stream.PassThrough();
    console.log(2);
    let encoded =  req.file.buffer.toString('base64')
    console.log(3);
    bufferStream.end(Buffer.from(encoded, 'base64'));
    console.log(4);
    let workbook = xlsx.read(req.file.buffer.toString('base64'),{type:'base64'});
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    let rows = xlsx.utils.sheet_to_json(worksheet,{defval:""});
    console.log(5);
    //console.log(rows);
    var json;
    (async () => {
        
         json=await query.eliminarDocumentos();
         json= await query.insertarDocumentos(rows);
         res.end(json);
    })()

     })

app.listen(process.env.port || 8080, () => console.log('Server started on port 3000'));
