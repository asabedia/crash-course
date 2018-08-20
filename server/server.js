const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
const port = 8000;
const db_con = mysql.createConnection({
	host: "db",
	user: "root",
	password: "root",
	database: "crash_course"
});

//Users GETs
app.get("/users", (req, res,next)=>{

	var QUERY =
		`SELECT U.username, U.password, U.first_name, U.last_name, U.campus_name, M.group_ID
		FROM Users U NATURAL JOIN Member_Of M
		UNION
		SELECT U.username, U.password, U.first_name, U.last_name, U.campus_name, NULL
		FROM Users U
		WHERE U.username NOT IN(
			SELECT M.username
			FROM Member_Of M)`;


	if (req.query.campus_name){
		QUERY = `SELECT U.username, U.password, U.first_name, U.last_name
			FROM Users U
			WHERE U.campus_name = ? AND U.username NOT IN(
				SELECT M.username
				FROM Member_Of M)`;
		};

	db_con.query(
		QUERY,
		req.query.campus_name,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});

    
});

app.get("/users/:id", (req, res)=>{
//not needed for now
	db_con.query(
		`SELECT U.username, U.password, U.first_name, U.last_name, U.campus_name, M.group_ID
		FROM Users U NATURAL JOIN Member_Of M
		WHERE U.username = ?`,
		req.params.id,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});
});	

app.get("/users/skills", (req, res)=>{

	var args = [req.query.campus_name, req.query.campus_name];
	db_con.query(
		`SELECT W.username, W.skill_name, "Wants" AS "Knows_OR_Wants"
		FROM Wants_To_Learn W NATURAL JOIN Users U
		WHERE U.campus_name = ?
		UNION
		SELECT T.username, T.skill_name, "Knows" AS "Knows_OR_Wants"
		FROM Teaches T NATURAL JOIN Users U
		WHERE U.campus_name = ?`,
		args,
		function(err, results){
			if(err) res.send("no query specified, query requried");
			res.json(results);
		});

    
});

app.get("/users/:id/skills/knows", (req, res)=>{

	
	db_con.query(
		`SELECT W.skill_name
		FROM Wants_To_Learn W
		WHERE W.username = ?`,
		req.params.id,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});

    
});

app.get("/users/:id/skills/wants", (req, res)=>{

	
	db_con.query(
		`SELECT T.skill_name
		FROM Teaches T
		WHERE T.username = ?`,
		req.params.id,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});

    
});

//Users PUT/POST/DELETE

app.put("/users", (req, res)=>{
//USELESSSSSSSS
	var values = req.body;
	var QUERY = 
	`INSERT INTO Users
	VALUES (?, ?, ?, ?, ?)`;

	var args = [values.username,
		values.first_name,
		values.last_name,
		values.campus_name,
		values.password,];

	db_con.query(
		QUERY,
		args,
		function(err, results){
			if(err) console.log(err);
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

	var args =[
		values.first_name,
		values.last_name,
		req.params.username];
	
	db_con.query(
		QUERY,
		args,
		function(err, results){
			if(err) console.log(err);
			res.json(results); //change?
		});



});

//Campuses
app.get("/campuses", (req, res)=>{

	db_con.query(
		`SELECT * 
		FROM Campuses`,
		function(err, results){
			if(err) console.log(err);
			   res.json(results);
		});

});


//Groups
app.get("/campuses/:id/groups/skills", (req, res)=>{

	var params = req.params;
	var args = [
		params.id,
		params.id];

	db_con.query(
		`SELECT DISTINCT A.group_ID, G.title, B.skill_name, "Wants" AS "Knows_OR_Wants"
		FROM Member_Of AS A NATURAL JOIN Wants_To_Learn AS B NATURAL JOIN Groups G
		WHERE G.campus_name = ?
		UNION
		SELECT DISTINCT A.group_ID, G.title, C.skill_name, "Knows" AS "Knows_OR_Wants"
		FROM Member_Of AS A NATURAL JOIN Teaches AS C NATURAL JOIN Groups G
		WHERE G.campus_name = ?`,
		args,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});

    
});




app.get("/groups/:id/skills", (req, res)=>{
	
	args = [req.params.id,
		req.params.id];

	db_con.query(
		`SELECT DISTINCT W.skill_name
		FROM Wants_To_Learn W NATURAL JOIN Member_Of M
		WHERE M.group_ID = ?
		UNION
		SELECT DISTINCT T.skill_name
		FROM Teaches T NATURAL JOIN Member_Of M
		WHERE M.group_ID = ?`,
		args,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});
});

app.put("/groups", (req, res)=>{
	var QUERY =
		`INSERT INTO Groups (title, campus_name)
		VALUES (?, ?);`;

	var QUERY2 =
		`INSERT INTO Member_Of(username, group_ID)
		SELECT ?, MAX(G.group_ID)
		FROM Groups G;`;
	var QUERY3 =
		`SELECT MAX(group_ID)
		FROM Groups;`;

	var values = req.body;
	var args = [
		values.group_title,
		values.campus_name];
	db_con.query(
		QUERY1,
		args,
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
		});	

	db_con.query(
		QUERY2,
		values.username,
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
		});	

	db_con.query(
		QUERY3,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});	



});

app.post("/groups/:id", (req, res)=>{
	var QUERY =
		`INSERT INTO Member_Of(username, group_ID)
		VALUES (?, ?);`;
	var values = req.body;
	var args = [
		values.username,
		req.params.id]
	db_con.query(
		QUERY,
		args,
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
		});



});


//skills

app.get("/skills/counts", (req, res)=>{
	var QUERY =
		`SELECT COUNT(W.username) AS "count", W.skill_name, "Wants" AS "Wants_OR_Knows"
		FROM Wants_To_Learn W
		GROUP BY W.skill_name
		HAVING COUNT(W.skill_name) >= ?

		UNION
		#skillCount Teaches
		SELECT COUNT(T.username), T.skill_name, "Knows" AS "Wants_OR_Knows"
		FROM Teaches T
		GROUP BY T.skill_name
		HAVING COUNT(T.skill_name) >= ?`;
	var args = [
		req.query.count,
		req.query.count];
	
	db_con.query(
		QUERY,
		args,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});



});


app.put("/skills/wants", (req, res)=>{
	var QUERY1 =
		`INSERT INTO Skills
		VALUES (?);`

	var QUERY2 = 
		`INSERT INTO Wants_To_Learn
		VALUES (?, ?);`;

	var values = req.body;
	var args = [
		values.skill_name,
		values.username];
	db_con.query(
		QUERY1,
		args[0],
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);
			}
	});

	db_con.query(
		QUERY2,
		args,
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
		});



});

app.put("/skills/knows", (req, res)=>{
	var QUERY1 =
		`INSERT INTO Skills
		VALUES (?)`;

	var QUERY2=
		`INSERT INTO Teaches
		VALUES (?, ?);`;

	var values = req.body;
	var args = [
		values.skill_name,
		values.username];


	db_con.query(
		QUERY1,
		args[0],
		function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}

		});	
  
        db_con.query(
                QUERY2,
                args,
                function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
                });


});


app.post("/skills/delete", (req, res)=>{
	//check that the call passes table properly
	//table must be: Teaches XOR Wants_To_Learn
	var QUERY_T =
		`DELETE FROM Teaches
		WHERE Teaches.username = ? AND Teaches.skill_name = ?`;

	var QUERY_W = 
		`DELETE FROM Wants_To_Learn
		WHERE Wants_To_Learn.username = ? AND Wants_To_Learn.skill_name = ?`;

	var values = req.body;
	var args =[
		values.username,
		values.skill_name];

	var QUERY = "";
	if(values.table == "Teaches"){
		QUERY = QUERY_T;
	}else if(values.table == "Wants_To_Learn"){
		QUERY = QUERY_W;
	};

	db_con.query(
		QUERY,
		args,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});	



});


//meetings

app.get("/users/:id/meetings", (req, res)=>{

	var QUERY =
		`SELECT M.start_date_time, M.end_date_time, M.location, M.title, T.name
		FROM Meetings M NATURAL JOIN Topics T
		WHERE M.start_date_time > CURRENT_TIMESTAMP AND M.group_ID IN(
			SELECT M2.group_ID
			FROM Member_Of M2
			WHERE M2.username = ?)`;


	db_con.query(
		QUERY,
		req.params.id,
		function(err, results){
			if(err) console.log(err);
			res.json(results);
		});	



});


app.put("/groups/:id/meetings", (req, res)=>{

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

	var check_args = [
		values.start_date_time,
		values.end_date_time,
		values.location,
		req.params.id];
	
	db_con.query(
		data_check_query,
		check_args,
		function(err, results){
			if(err) console.log(err);
			if(results.start_date_time){
				res.send("Meeting conflict or bad group_ID"); //make proper error?
			};
		});

	//if both checks clear continue and make actual put

	var QUERY =
		`INSERT INTO Topics(topic_ID, name)
		VALUES (NULL, ?);`

//		INSERT INTO Meetings(start_date_time, end_date_time, location, group_ID, title, topic_ID)
//		SELECT ?,?,"?",?,"?", MAX(topic_ID)
//		FROM Topics;`
	
	var args1 = [
		values.topic_name
		];

	db_con.query(
		QUERY,
		args1,
		function(err, results){
			if(err) console.log(err);
			console.log(results);
			res.send('success');
		});

	var args2 = [                values.start_date_time,
                values.end_date_time,
                values.Location,
                req.params.id,
                values.meeting_title]
	var QUERY2 = `INSERT INTO Meetings(start_date_time, end_date_time, location, group_ID, title, topic_ID)
              SELECT ?,?,"?",?,"?", MAX(topic_ID)
              FROM Topics;`

	db_con.query(
                QUERY2,
                args2,
                function(err, results){
                        if(err) console.log(err);
                        console.log(results);
                        res.send('success');
                });



	var i;
	for (i=0; i < values.skill_names.length; i++){
		var args = [values.skill_names[i],values.topic_ID];
		console.log(args);
		db_con.query(
			`INSERT INTO Comprises(skill_name, topic_ID)
			SELECT ?, MAX(T.topic_ID)
			FROM Topics T;`,
			args,
			function(err, results){
			try{
			if(err) console.log(err);}
			catch (err){
			res.json(results);}
			});
	}



});

console.log('attempting to connect to DB');

db_con.connect(
	function(err){
		//Helper function to catch errors (following wrschools mysql to nodejs guide)
		if(err) console.log(err);
		console.log("CONNECTED TO DATABASE");
	}
);

console.log('attempting to start server');

app.listen(port, () => console.log('server started'));
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
				if(err) console.log(err);
			});
	}


});

*/


