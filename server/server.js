const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 5000;
const db_con = mysql.createConnection({
	host: "localhost",
	user: "akandada",
	password: "Spring@*%2018"
});

app.get("/api/users", (req, res)=>{
    const users = [
        {id: 1, firstName: 'John', lastName: 'Smith'},
        {id: 2, firstName: 'Jimmy', lastName: 'Smith'}
    ]
    res.json(users);
});

db_con.connect(
	function(err){
		//Helper function to catch errors (following wrschools mysql to nodejs guide)
		if(err) throw err;
		console.log("CONNECTED TO DATABASE");
	}
)

app.listen(port, () => console.log('server started'));


