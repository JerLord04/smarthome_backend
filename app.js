const express = require('express')
const app = express()
const port = 3000
const connect_db = require('./module/wish');
db = connect_db.getConnection()


app.use('/api/v1', require('./module/api_v1'));
app.use('/api/v2', require('./module/api_v2'));

app.get('/', function(req, res) {
    db.connect(function(err) {
        db.query("SELECT * FROM random_wish_db", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result[0].wishtext)
        });
      });
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

