var mqtt = require('./node_modules/mqtt')

let url = "ws://127.0.0.1";
let port = 8083;
let client = mqtt.connect( url + ":" + port + "/");

let pub = "URA/robo1/linhaE";



let timer = setInterval(()=>{
    let date = new Date();
    let obj = {
        time: "" + date.getDate() + "/" + (date.getMonth()+1)  + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),  // dd/mm/yyyy - hh:mm:ss
        sensor1:{
            value: (Math.random() * 10)
        },
        sensor2:{
            value:  (Math.random() * 20) + 10
        }
    }
    
    console.log(JSON.stringify(obj));

    client.publish(pub, JSON.stringify(obj));

},3000)


