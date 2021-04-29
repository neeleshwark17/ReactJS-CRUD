const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sql = require('mysql')
const cors = require('cors')

const conn = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'newDb'
})

conn.connect((err) => {
  if (err) throw err;
  console.log(err)
})

app.use(bodyParser.urlencoded({ urlencoded: true }))
app.use(bodyParser.json())
app.use(cors())

app.post('/saveEmployee', (req, res) => {
  console.log('Axios call listened')
  var pid = req.body.pid;
  var pname = req.body.pname;

  let query = `insert into employee(pid,pname) values('${pid}','${pname}')`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})


app.post('/showData', (req, res) => {
  let query = 'select *from employee'
  conn.query(query, (err, result) => {
    if (err) throw err;
    console.log('Table Data inflating')
    res.json(result)
  })
});


app.get('/delete/:id', (req, res) => {
  console.log('helo');
  var _id = req.params.id;
  console.log(_id);
  let query = `delete from employee where pid='${_id}'`
  conn.query(query, (err, result) => {
    if (err) throw err;
    let query = 'select *from employee'
    conn.query(query, (err, result) => {
      if (err) throw err;
      console.log('Table Data inflating')
      res.json(result)
    })
  })
});

app.get('/editPage/:id', (req, res) => {
  console.log('editPAGE')
  var _id = req.params.id;
  console.log(_id)
  let query = `select *from employee where pid=${_id}`
  conn.query(query, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})

app.post('/editQuery', (req, res) => {
  console.log('editQuery')
  var _id=req.body.pid;
  var pname = req.body.pname;

  let query = `update employee set pname='${pname}' where pid=${_id}`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})


const port = 8081;

app.listen(port, () => {
  console.log('Server running at port--' + port);
});