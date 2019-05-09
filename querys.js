const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const password = encodeURIComponent('oKiDlizqi5aEUcenOp2IKgLbHRTGX1iLc1aIAnaYtu9meMFDzSTmHdSkoqJPVg7joXIBmvJ9JY3BUmLsNlt3eg==');
const url = `mongodb://falabellarrhh:${password}@falabellarrhh.documents.azure.com:10255/?ssl=true&replicaSet=globaldb`;
const dbName = 'rrhhfalabella';

function insertarDocumentos(varArreglo)
{
  console.log('insertar');
    return new Promise(function(resolve, reject) {


        MongoClient.connect(url, function(err, client) {
            //var dbo = client.db(dbName);
           // var dbo = db.db("mydb");
           var db = client.db(dbName);
           db.collection("almuerzo").insertMany(varArreglo, function(err, res) {
            if (err) {
                console.log(err);
            }
            //console.log("Number of documents inserted: " + res.insertedCount);
            var json = JSON.stringify({ 
              success: "Numero de registros insertados: " + res.insertedCount, 
              status: 200
            });
            return resolve(json)
            client.close();
          });


            });


    })

}

function eliminarDocumentos()
{
  //var arreglo;
  console.log('eliminar');
  return new Promise(function(resolve, reject) {


   /*MongoClient.connect(url,  function(err, client) {
   
    const db = client.db(dbName);
    const collection = db.collection('almuerzo');

     collection.find({fecha: varFecha }).toArray( function(err, docs) {
          assert.equal(err, null);
         arreglo= docs;
         return resolve(arreglo)
        });
   
    client.close();
  }); */
 
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('almuerzo', {}, function(err, filas) {
        filas.remove({}, function(err, result) {
            if (err) {
                console.log(err);
            }
            return resolve('eliminar');
           // console.log(result);
            client.close();
        });
    });
    });



  })

}

module.exports.eliminarDocumentos=eliminarDocumentos;
module.exports.insertarDocumentos=insertarDocumentos;