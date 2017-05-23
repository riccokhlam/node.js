/**
 * Created by Ricco on 2017-05-15.
 */
var express1 = require("express");
var app1 = express1();
var fs = require("fs");

var mysql = require("mysql");
var pg = require("pg");
// var connection = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "Ricco31121994",
//         database: "test1db"
//     });

var config = {
    user:'postgres',
    database: 'test1db',
    password:'Ricco31121994',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);


pool.query("SELECT * from information", function(err,result)
{
    if(err){
        throw err;
    }
    console.log(result.rows.length);
    for(var j=0; j<result.rows.length; j++) {
        console.log(result.rows[j]);
    }
})


/* connection.connect(); */

// connection.query("SELECT 1+1 As solution", function(err,rows,fields)
// {
//     if (err)
//         throw err;
//     console.log(rows[0].solution);
// })

app1.get("/home.htm",function(req,res)
{
    res.sendFile(__dirname + "/" + "home.htm");
});

app1.get("/login.htm",function(req,res)
{
    res.sendFile(__dirname + "/" + "login.htm");
});

app1.get("/new_user.htm",function(req,res)
{
    res.sendFile(__dirname + "/" + "/new_user.htm");
});

app1.get("/new_user",function(req,res)
{
    res.redirect("/new_user.htm");
});

var User_correct = "0";
var Pw_correct = 0;

/*app1.get("/login_page",function(req,res)
{
    connection.query("SELECT * FROM information",function(err,rows)
    {
        if (err)
            throw err;
        for(var i =0; i<rows.length; i++)
        {
            if(req.query.user_name==rows[i].Users && req.query.pw==rows[i].Password)
            {
                User_correct = rows[i].Users;
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
  /!*res.end();*!/
});*/

app1.get("/login_page",function(req,res)
{
    pool.query("SELECT * FROM information",function(err,result)
    {
        if (err)
            throw err;
        for(var i =0; i<result.rows.length; i++)
        {
            if(req.query.user_name==result.rows[i].users && req.query.pw==result.rows[i].password)
            {
                User_correct = result.rows[i].users;
                Pw_correct = result.rows[i].password;
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

/*app1.get("/login_suc",function(req,res)
{
    if (req.query.user == "" || req.query.password == "")
        res.redirect("/login.htm")
    else
    {
        var Information = {Users: req.query.user, Password: req.query.password};
        connection.query("INSERT INTO login SET?", Information, function(err,res)
        {
            if(err)
                throw err;
        })
        console.log(Information);
        console.log("req.query.user");
        console.log("req.query.password");
        res.redirect("/home.htm")
      /!* res.end(JSON.stringify(Information)); *!/
    }
});*/

app1.get("/login_suc",function(req,res)
{
    if (req.query.user == "" || req.query.password == "")
        res.redirect("/login.htm")
    else
    {
        var Information = {user_name: req.query.user, Password: req.query.password};
        pool.query("INSERT INTO login (user_name,password) values ($1,$2)", [req.query.user, req.query.password], function(err,res)
        {
            if(err)
                throw err;
        })
        console.log(Information);
        console.log(req.query.user);
        console.log(req.query.password);
        res.redirect("/home.htm")
        /* res.end(JSON.stringify(Information)); */
    }
});

/*app1.get("/new_user_gen",function(req,res)
{
    if(req.query.user_new == ""||req.query.password_new == "")
        res.redirect("/new_user.htm");
    else
    {
        var information_ins = {First_Name: req.query.first_name, Last_Name: req.query.last_name, Age: req.query.age_new, Sex: (req.query.male||req.query.female), Users: req.query.user_new, Password: req.query.password_new};
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
})*/

app1.get("/new_user_gen",function(req,res)
{
    if(req.query.user_new == ""||req.query.password_new == "")
        res.redirect("/new_user.htm");
    else
    {
        var information_ins = {First_Name: req.query.first_name, Last_Name: req.query.last_name, Age: req.query.age_new, Sex: (req.query.male||req.query.female), Users: req.query.user_new, Password: req.query.password_new};
        pool.query("INSERT INTO information SET?", information_ins, function(err,res)
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



var server = app1.listen(3000,function()
{
    var address = server.address().address;
    var host = server.address().host;
    console.log("Here is the link");
});