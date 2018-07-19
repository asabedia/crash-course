const express = require('express');
//const mysql = require('mysql');
const app = express();

const port = 5000;
/*const db_con = mysql.createConnection({
	host: "mansci-db.uwaterloo.ca",
	user: "akandada",
	password: "Anant2018!"
});*/

app.get("/api/users", (req, res)=>{
    const users = [
        {id: 1, firstName: 'John', lastName: 'Smith'},
        {id: 2, firstName: 'Jimmy', lastName: 'Smith'}
    ]
    res.json(users);
});

app.listen(port, () => console.log('server started'));


