var express = require("express");
var app = express();
var fs = require("fs");

var mysql = require("mysql")
var connection = mysql.createConnection(
{
	host: "localhost",
	user: "root",
	password: "Ricco31121994",
	database: "test1db"
});

/* connection.connect(); */

connection.query("SELECT 1+1 As solution", function(err,rows,fields)
{
	if (err)
		throw err;
	console.log(rows[0].solution);
})

app.get("/home.htm",function(req,res)
{
	res.sendFile(__dirname + "/" + "home.htm");
});

app.get("/login.htm",function(req,res)
{
	res.sendFile(__dirname + "/" + "login.htm");
});

app.get("/new_user.htm",function(req,res)
{
	res.sendFile(__dirname + "/" + "/new_user.htm");
});

app.get("/new_user",function(req,res)
{
	res.redirect("/new_user.htm");
});

var User_correct = "0";
var Pw_correct = 0;

app.get("/login_page",function(req,res)
{
	connection.query("SELECT * FROM information",function(err,rows)
	{
 		if (err)
			throw err; 
		for(var i =0; i<rows.length; i++)
		{
				if(req.query.user_name==rows[i].User && req.query.pw==rows[i].Password)
				{
					User_correct = rows[i].User;
					Pw_correct = rows[i].Password;
					break;
				}
		}
	});
	setTimeout(function(){
	if(req.query.user_name == User_correct && req.query.pw == Pw_correct)
	{	
		res.redirect("/login.htm");
	}
	else
	{
		res.redirect("/home.htm");
		console.log(User_correct);
		console.log(Pw_correct);
	}},100);
 	/*res.end();*/  
});

app.get("/login_suc",function(req,res)
{
	if (req.query.user == "" || req.query.password == "")
		res.redirect("/login.htm")
	else 
	{
		var Information = {User: req.query.user, Password: req.query.password};
		connection.query("INSERT INTO login SET?", Information, function(err,res)
		{
			if(err) 
				throw err;
		})
		console.log(Information);
		console.log("req.query.user"); 
		console.log("req.query.password");
		res.redirect("/home.htm")
		/* res.end(JSON.stringify(Information)); */
	}
});

app.get("/new_user_gen",function(req,res)
{
	if(req.query.user_new == ""||req.query.password_new == "")
		res.redirect("/new_user.htm");
	else
	{
		var information_ins = {First_Name: req.query.first_name, Last_Name: req.query.last_name, Age: req.query.age_new, Sex: (req.query.male||req.query.female), User: req.query.user_new, Password: req.query.password_new};
		connection.query("INSERT INTO information SET?", information_ins, function(err,res)
		{
			if(err)
				throw err;
		})
		New_information = {FirstName:req.query.first_name,LastName:req.query.last_name,Age:req.query.age_new}
		console.log(New_information);
		res.redirect("/home.htm")
		res.end(JSON.stringify(New_information));
	}
})



var server = app.listen(3000,function()
{
	var address = server.address().address;
	var host = server.address().host;
	console.log("Here is the link");
});