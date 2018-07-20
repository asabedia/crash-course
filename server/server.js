const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 5000;
const db_con = mysql.createConnection({
	host: "localhost",
	user: "akandada",
	password: "Spring@*%2018"
});

//Users
app.get("/api/users", (req, res)=>{
	var ress = null;
	db_con.query(
		"SELECT * FROM Users",
		function(err, results){
			if(err) throw err;
			ress = results;
		});

    res.json(ress);
});

//Campuses
app.get("/api/campuses", (req, res)=>{
	var ress = null;
	db_con.query(
		`SELECT * 
		FROM Campuses`,
		function(err, results){
			if(err) throw err;
			ress = results;
		});

    res.json(ress);
});


app.get("/api/groups", (req, res)=>{
	var ress = null;
	var params = req.params
	db_con.query(
		`SELECT DISTINCT A.group_ID, B.skill_name, "Wants" AS "Knows_OR_Wants"
		FROM Member_Of AS A NATURAL JOIN Wants_To_Learn AS B NATURAL JOIN Users U
		WHERE U.campus_name = ?
		UNION
		SELECT DISTINCT A.group_ID, C.skill_name, "Knows" AS "Knows_OR_Wants"
		FROM Member_Of AS A NATURAL JOIN Teaches AS C NATURAL JOIN Users U
		WHERE U.campus_name = ?`,
		params.campus_name,
		params.campus_name,
		function(err, results){
			if(err) throw err;
			ress = results;
		});

    res.json(ress);
});


app.get("/api/groups", (req, res)=>{
	var ress = null;
	db_con.query(
		`SELECT * 
		FROM Campuses`,
		function(err, results){
			if(err) throw err;
			ress = results;
		});

    res.json(ress);
});


db_con.connect(
	function(err){
		//Helper function to catch errors (following wrschools mysql to nodejs guide)
		if(err) throw err;
		console.log("CONNECTED TO DATABASE");
	}
)

app.listen(port, () => console.log('server started'));


