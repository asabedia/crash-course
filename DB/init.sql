CREATE USER 'main'@'%' IDENTIFIED BY '1510';

CREATE DATABASE crash_course;
USE crash_course;

--Grants
GRANT ALL ON *.* to 'main'@'172.18.0.3' IDENTIFIED BY '1510';

--Create Table Statements


--Campus

CREATE TABLE Campuses(
  name VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  PRIMARY KEY(name));

--Skills

CREATE TABLE Skills(
name VARCHAR(20),
PRIMARY KEY(name));


--User

CREATE TABLE Users(
  username VARCHAR(15),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  campus_name VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  FOREIGN KEY (campus_name) REFERENCES Campuses(name) --New! Removes Attends
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
  PRIMARY KEY(username));



--Group

CREATE TABLE Groups(
  group_ID INTEGER AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  campus_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (campus_name) REFERENCES Campuses(name) --New! Removes PartOf
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
  PRIMARY KEY(group_ID)
);

--Topic

CREATE TABLE Topics(
  topic_ID INTEGER AUTO_INCREMENT,
  name VARCHAR(255),
  PRIMARY KEY(topic_ID)
);

--Meeting


CREATE TABLE Meetings(
--Add additional contraint that meeting end time is not before meeting start time
  start_date_time DATETIME,
  end_date_time DATETIME,
  location VARCHAR(255), --New!
  group_ID INTEGER NOT NULL, --New! (not null enforces exactly one constraint)
  topic_ID INTEGER NOT NULL, --New!
  --REMOVE meeting_ID INTEGER,
  title VARCHAR(255) NOT NULL,
  --OLD PRIMARY KEY(meeting_ID)
  FOREIGN KEY (group_ID) REFERENCES Groups(group_ID)
  ON DELETE CASCADE
  ON UPDATE CASCADE, --On Delete?? --New! Removes hosts relation
  FOREIGN KEY (topic_ID) REFERENCES Topics(topic_ID) --New! Removes discusses relation
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  PRIMARY KEY(start_date_time, end_date_time, location) --NEW
)


--Relationships

--Member Of 

CREATE TABLE Member_Of(
  username VARCHAR(15),
  group_ID INTEGER,
  PRIMARY KEY(username), --New! removed group_ID from PK enforces user has at most one group
  FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(group_ID) REFERENCES Groups(group_ID) ON DELETE NO ACTION ON UPDATE CASCADE
);

--Comprises

CREATE TABLE Comprises(
  skill_name VARCHAR(20),
  topic_ID INTEGER,
  PRIMARY KEY(skill_name, topic_ID),
  FOREIGN KEY(skill_name) REFERENCES Skills(name) ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY(topic_ID) REFERENCES Topics(topic_ID) ON DELETE NO ACTION ON UPDATE CASCADE
);

--Teaches

CREATE TABLE Teaches(
  skill_name VARCHAR(20),
  username VARCHAR(15),
  PRIMARY KEY(skill_name, username),
  FOREIGN KEY(skill_name) REFERENCES Skills(name) ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY(username) REFERENCES Users(username) ON DELETE NO ACTION ON UPDATE CASCADE
);

--Wants to learn

CREATE TABLE Wants_To_Learn(
  skill_name VARCHAR(20),
  username VARCHAR(15),
  PRIMARY KEY(skill_name, username),
  FOREIGN KEY(skill_name) REFERENCES Skills(name) ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY(username) REFERENCES Users(username) ON DELETE NO ACTION ON UPDATE CASCADE
);

--INSERT INTOs

INSERT INTO Campuses(name, location)
VALUES('University of Waterloo','Waterloo');
INSERT INTO Campuses(name, location)
VALUES('Wilfrid Laurier University','Waterloo');
INSERT INTO Campuses(name, location)
VALUES('University of Toronto','Toronto');
INSERT INTO Campuses(name, location)
VALUES('Carleton University','Ottawa');

INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('abdu123','abdu','abdu','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('SheikhAshkan','Ashkan','Sheikhian','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('BestDozd','Shiekh','Irani','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('grampa_larry','Larry','David','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('your_aunty','Awhntee','Gita','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('SickDude','Bob','Ross','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('VerySmartGuy','Fahad','Salman','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('RVS','Ranganathan','Varajamoorthynatyashastrisivalingaswamyanantkirshnaperumalbhkatian','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('0BrainCell','Richard','Feynman','University of Waterloo','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('LiteralGoddess','Shakira','Isabel-Mebarak-Ripoll','Carleton University','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('BozorgKoon','Baby','Jornie','Carleton University','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('HotFire','bubba','gump','Carleton University','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('Mr bean','Bean','Bean','Carleton University','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('Bipo','BolaBipo','BolaBo','Carleton University','password');
INSERT INTO Users(username, first_name, last_name, campus_name, password)
VALUES('SidTheKid','SidArnt','Batiman','Carleton University','password');
