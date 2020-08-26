const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let storage = {
  time: [],
  sensor1:{
    values: []
  },
  sensor2:{
    values: []
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send("token");
});

app.post('/save', (req, res) => {
  
  let arr = JSON.parse(req.body.data);
  console.log(arr)
  if(arr.length > 1){
    for(let i = 0; i < arr.length; i++){
      let tempData = JSON.parse(arr[i]);
      storage.time.push(tempData.time);
      storage.sensor1.values.push(tempData.sensor1.value);
      storage.sensor2.values.push(tempData.sensor2.value);
    }
  }else{
    let tempData = JSON.parse(arr);
    storage.time.push(tempData.time);
    storage.sensor1.values.push(tempData.sensor1.value);
    storage.sensor2.values.push(tempData.sensor2.value);
  }
  
  res.end();
});

app.get('/get', (req, res) => {
  
  res.send({type: "json", data: JSON.stringify(storage)});

  // let data = fs.readFileSync("./Arcad_Database.csv", 'utf8');
  // res.send({type: "csv", data: data});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});