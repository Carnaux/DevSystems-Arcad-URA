# Guidelines for the Database and MQTT data structures

This document describes how Arcad handles the incoming and outgoing data, also it determines the data structures of the interactions.

## The MQTT data

<strong>Must be a stringified obj</strong>

<strong>Type: STRING</strong>

```text
{
    time: <-- STRING formated as "dd/mm/yyyy - hh:mm:ss" 
                              e.g 26/09/2020 - 14:54:02
                                            or
                                  26/9/2020 - 14:54:2

    sensor1:{
        value: ##
    },
    sensor2:{
        value: ##
    }
}
```

## The database data

### Sent from Arcad (Arcad -> Database)

Arcad stores all values received from MQTT and then send it at an interval determined by the user, so it stringify an array.

<strong>Type: STRING</strong>

```text
[
  '{"time":"26/9/2020 - 15:2:26","sensor1":{"value":5.692249284730348},"sensor2":{"value":20.325045993447432}}'
]
```

Arcad sends a <strong>POST</strong> request to the database server that has the following structure:

```text
{
    data: stringified array from Arcad
}
```

### Sent from Database Server (Database -> Arcad)

Arcad sends a <strong>GET</strong> request and expects an response with the following structure:

```text
{   
    type: type <-- STRING
    data: data <-- STRING
}
```

The data sent from the database server has to specify what type it is sending.

The available types are:

    CSV
    JSON

#### JSON

```text
{   
    type: "json" 
    data: "{
        time: [] <-- Array of strings
        sensor1:{
            values: []
        },
        sensor2:{
            values: []
        }
    }"
}
```

#### CSV

The csv data <strong>MUST</strong> be a vertical table.
In future implementations horizontal will be supported.

CSV will be parsed to JSON as UTF-8 and Arcad will read line by line of the CSV string.

```text
{   
    type: "CSV" 
    data: "header,header,header\nval,val,val\n" <-- The "\n" 
    isn't really necessary, is just to indicate that the data string 
    has a new line there.
}
```


