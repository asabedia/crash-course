const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = 5000;
const db_con = mysql.createConnection({
	host: "localhost",
	user: "akandada",
	password: "Spring@*%2018"
});

//Users GETs
app.get("/users", (req, res)=>{
	var QUERY =
		`SELECT U.username, U.password, U.first_name, U.last_name, U.campus_name, M.group_ID
		FROM Users U NATURAL JOIN Member_Of M`;

	if (req.query){
		QUERY = QUERY +
			` WHERE U.campus_name = ?`
		};

	db_con.query(
		QUERY,
		req.query.campus_name,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});

    
});

app.get("/users/:id", (req, res)=>{
	
	db_con.query(
		`SELECT U.username, U.password, U.first_name, U.last_name, U.campus_name, M.group_ID
		FROM Users U NATURAL JOIN Member_Of M
		WHERE U.username = ?`,
		req.params.id,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});
});	

app.get("/users/:id/skills", (req, res)=>{


	db_con.query(
		`SELECT W.skill_name, "Wants" AS "Wants_OR_Knows"
		FROM Wants_To_Learn W
		WHERE W.username = ?
		UNION
		SELECT T.skill_name, "Knows" AS "Wants_OR_Knows"
		FROM Teaches T
		WHERE T.username = ?`,
		req.params.id,
		req.params.id,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});

    
});

//Users PUT/POST/DELETE

app.put("/users", (req, res)=>{
	var values = req.body;
	var QUERY = 
	`INSERT INTO Users
	VALUES (?, ?, ?, ?, ?)`;

	db_con.query(
		QUERY,
		values.username,
		values.first_name,
		values.last_name,
		values.campus_name,
		values.password,
		function(err, results){
			if(err) throw err;
			res.json(results); //change?
		});

});

app.post("/users/:id", (req, res)=>{
	var values = req.body;
	var QUERY = 
	`UPDATE Users
	SET
		first_name = ?
		last_name = ?
	WHERE Users.username = ?`;
	
	db_con.query(
		QUERY,
		values.first_name,
		values.last_name,
		values.username,
		function(err, results){
			if(err) throw err;
			res.json(results); //change?
		});



});

//Campuses
app.get("/campuses", (req, res)=>{
	var ress = "default value";
	db_con.query(
		`SELECT * 
		FROM Campuses`,
		function(err, results){
			if(err) throw err;
			   res.json(ress);
		});

});

//Groups
app.get("/groups/skills", (req, res)=>{

	var params = req.params;
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
			res.json(results);
		});

    
});


app.get("/groups/:id/users", (req, res)=>{
	
	params = req.params;
	db_con.query(
		`SELECT U.username
		FROM Users U NATURAL JOIN Member_Of M
		WHERE M.group_ID = ?`,
		params.id,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});
});

app.put("/groups", (req, res)=>{
	var QUERY =
		`INSERT INTO Groups (title, campus_name)
		VALUES (?, ?);

		INSERT INTO Member_Of(username, group_ID)
		SELECT ?, MAX(G.group_ID)
		FROM Groups G;

		SELECT MAX(group_ID)
		FROM Groups;`;

	var values = req.body;

	db_con.query(
		QUERY,
		values.group_title,
		values.campus_name,
		values.username,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});	



});

app.post("/groups", (req, res)=>{
	var QUERY =
		`SELECT M.username
		FROM Member_Of M
		WHERE M.username = ? AND M.group_ID = ?;

		INSERT INTO Member_Of(username, group_ID)
		VALUES (?, ?);`;
	var values = req.body;

	db_con.query(
		QUERY,
		values.username,
		values.group_ID,
		values.member_username,
		values.group_ID,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});



});


//skills

app.get("/skillcounts", (req, res)=>{
	var QUERY =
		`SELECT COUNT(W.username), W.name, "Wants" AS "Wants_OR_Knows"
		FROM Wants_To_Learn
		GROUP BY W.name
		HAVING COUNT(W.name) > ?

		UNION
		#skillCount Teaches
		SELECT COUNT(W.username), W.name, "Knows" AS "Wants_OR_Knows"
		FROM Teaches
		GROUP BY W.name
		HAVING COUNT(W.name) > ?`;

	db_con.query(
		QUERY,
		req.params.count,
		req.params.count,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});



});


app.put("/skills/learn", (req, res)=>{
	var QUERY =
		`INSERT INTO Skills
		VALUES (?);
		INSERT INTO Teaches
		VALUES (?, ?);`;

	var values = req.body;

	db_con.query(
		QUERY,
		values.skill_name,
		values.skill_name,
		values.username,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});	



});

app.put("/skills/know", (req, res)=>{
	var QUERY =
		`INSERT INTO Skills
		VALUES (?);

		INSERT INTO Teaches
		VALUES (?, ?);`;

	var values = req.body;

	db_con.query(
		QUERY,
		values.skill_name,
		values.skill_name,
		values.username,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});	



});


app.delete("/skills/:id", (req, res)=>{
	//check that the call passes table properly
	//table must be: Teaches XOR Wants_To_Learn
	var QUERY =
		`DELETE FROM ?
		WHERE ?.username = ? AND ?.name = ?`;

	var values = req.body;

	db_con.query(
		QUERY,
		values.table,
		values.table,
		values.username,
		values.table,
		values.skill_name,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});	



});


//meetings

app.get("/groups/:id/meetings", (req, res)=>{
//!!!!!!!! This does not work atm
//will only work if query is changed (inner query removed) or URI is /users/:id/meetings

	var QUERY =
		`SELECT M.start_date_time, M.end_date_time, M.location, M.title, T.name
		FROM Meetings M NATURAL JOIN Topics T
		WHERE M.start_date_time > CURRENT_TIMESTAMP AND M.group_ID IN(
			SELECT M2.group_ID
			FROM Member_Of M2
			WHERE M2.username = ?)`;

	var values = req.body;

	db_con.query(
		QUERY,
		values.table,
		values.table,
		values.username,
		values.table,
		values.skill_name,
		function(err, results){
			if(err) throw err;
			res.json(results);
		});	



});


app.put("/meetings", (req, res)=>{

	var data_check_query =
		`SELECT *
		FROM Meetings M
		WHERE M.end_date_time >= ? AND M.start_date_time <= ? AND M.location = ? OR ? NOT IN(
			SELECT G.group_ID
			FROM Groups G)`;

	var values = req.body;

	if(values.start_date_time >= values.end_date_time){
		res.send("Bad meeting time: meeting cannot start time cannot be after meeting end time");
	}

	db_con.query(
		data_check_query,
		values.start_date_time,
		values.end_date_time,
		values.location,
		values.group_ID,
		function(err, results){
			if(err) throw err;
			if(results){
				res.send("Meeting conflict or bad group_ID"); //make proper error?
			};
		});

	//if both checks clear continue and make actual put

	var QUERY =
		`INSERT INTO Topics(topic_ID, name)
		VALUES (NULL, ?);

		INSERT INTO Meetings(start_date_time, end_date_time, location, group_ID, title, topic_ID)
		SELECT ?,?,?,?,?, MAX(topic_ID)
		FROM Topics;`
	
	db_con.query(
		data_check_query,
		values.topic_name,
		values.start_date_time,
		values.end_date_time,
		values.location,
		values.group_ID,
		values.meeting_title,
		function(err, results){
			if(err) throw err;
			res.send('success');
		});


	var i;
	for (i=0; i < values.skill_names.length; i++){
		db_con.query(
			`INSERT INTO Comprises(skill_name, topic_ID)
			VALUES (?, ?);`,
			values.skill_names[i],
			values.topic_ID,
			function(err, results){
				if(err) throw err;
			});
	}



});




//topics
/*
app.post("/topics/:id/skills", (req,res)=>{

	var values = req.body;
	var i;
	for (i=0; i < values.skill_names.length; i++){
		db_con.query(
			`INSERT INTO Comprises(skill_name, topic_ID)
			VALUES (?, ?);`,
			values.skill_names[i],
			values.topic_ID,
			function(err, results){
				if(err) throw err;
			});
	}


}); */


db_con.connect(
	function(err){
		//Helper function to catch errors (following wrschools mysql to nodejs guide)
		if(err) throw err;
		console.log("CONNECTED TO DATABASE");
	}
)

app.listen(port, () => console.log('server started'));


