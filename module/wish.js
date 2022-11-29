const mysql = require('mysql')
class connectDB{
    constructor(){
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'smarthomedb'
        })
        connection.connect(function(err){
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }else{
                console.log('Success')
                return connection;
            }
        })
    }
}

module.exports = connectDB;

