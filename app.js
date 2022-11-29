const express = require('express')
const app = express()
const port = 3000
const connect_db = require('./module/wish')

conn = new connect_db()

app.use('/api/v1', require('./module/api_v1'));
app.use('/api/v2', require('./module/api_v2'));

app.get('/', function(req, res) {
  res.send('Hello from root route.')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

