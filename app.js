const express = require('express')
const request = require('request');
const app = express()
// const http = require('http').createServer(app);
const dotenv = require('dotenv');
dotenv.config();

const connect_db = require('./module/connectDB');
db = connect_db.getConnection()
const bodyParser = require('body-parser');
const url_line_notification = "https://notify-api.line.me/api/notify";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/v1', require('./module/api_v1'));
// app.use('/api/v2', require('./module/api_v2'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socketClient.html');
});

app.post('/insert_data', function (req, res) {
  const data = req.body;
  console.log(data);
  const sql = `INSERT INTO devices( id_room, id_sensor) VALUES (${data.room_id},${data.sensor_id})`;
  db.connect(function (err) {
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      data_res = {
        'status': true,
        'msg': 'Device added successfully'
      }
      res.send(data_res)
      console.log("insert completed")
    });
  });
});

app.post('/update_room_name', (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = `UPDATE room_tb SET name = ? WHERE id = ?`;
  const params = [data.newname, data.room_id];
  db.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    console.log("Update successful");
  })
})

app.get('/search', (req, res) => {
  console.log(req.query.ID);
})

app.post('/delete_device', function (req, res) {
  const data = req.body;
  console.log(data.room_id)
  const sql = `DELETE FROM devices WHERE id = ${data.room_id}`;
  db.connect(function (err) {
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      const data_result = {
        'status': true,
        'msg': 'Successful device removal'
      }
      res.send(data_result)
    });
  });
})

app.get('/roll_data_room1', (req, res) => {
  // execute a SELECT query to retrieve all users
  db.query('SELECT * FROM sensor LEFT JOIN devices ON sensor.id = devices.id_sensor WHERE devices.id_room = 1;', (error, results) => {
    if (error) console.log(error);
    res.send(results);
    console.log(results)
  });
});

app.get('/roll_data_room2', (req, res) => {
  // execute a SELECT query to retrieve all users
  db.query('SELECT * FROM sensor LEFT JOIN devices ON sensor.id = devices.id_sensor WHERE devices.id_room = 2;', (error, results) => {
    if (error) console.log(error);
    res.send(results);
    console.log(results)
  });
});

app.get('/roll_data_room3', (req, res) => {
  // execute a SELECT query to retrieve all users
  db.query('SELECT * FROM sensor LEFT JOIN devices ON sensor.id = devices.id_sensor WHERE devices.id_room = 3;', (error, results) => {
    if (error) console.log(error);
    res.send(results);
    console.log(results)
  });
});

app.get('/roll_data_room4', (req, res) => {
  // execute a SELECT query to retrieve all users
  db.query('SELECT * FROM sensor LEFT JOIN devices ON sensor.id = devices.id_sensor WHERE devices.id_room = 4;', (error, results) => {
    if (error) console.log(error);
    res.send(results);
    console.log(results)
  });
});

app.post('/test_line_notify_room1', (req, res) => {
  request({
    method: 'POST',
    uri: url_line_notification,
    header: {
      'Content-Type': 'multipart/form-data',
    },
    auth: {
      bearer: process.env.TOKEN_LIVING_ROOM,
    },
    form: {
      message: `Light bulb : ${req.body.status_for_line}`
    },
  }, (err, httpResponse, body) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Send to line complete")
      console.log(body)
    }
  });
});

app.post('/test_line_notify_room2', (req, res) => {
  request({
    method: 'POST',
    uri: url_line_notification,
    header: {
      'Content-Type': 'multipart/form-data',
    },
    auth: {
      bearer: process.env.TOKEN_KITCHEN,
    },
    form: {
      message: `Light bulb : ${req.body.status_for_line}`
    },
  }, (err, httpResponse, body) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Send to line complete")
      console.log(body)
    }
  });
});

app.post('/test_insert_dateTime', (req, res) => {
  const datetime = new Date().toISOString().slice(0, 19).replace('T', '');
  const sql = 'INSERT INTO humidity_tb (date,value) VALUES ((NOW()),?)';
  const params = [35.5];
  db.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    console.log("Insert successfully");
  })
})

app.post('/get_room_name', (req, res) => {
  data = req.body;
  console.log(data.room_id);
  db.query(`SELECT * FROM room_tb WHERE id = ${data.room_id}`, (error, results) => {
    if (error) console.log(error);
    res.send(results);
    console.log(results)
  });

});


app.listen(3000, () => {
  console.log('listening on *:3000');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

