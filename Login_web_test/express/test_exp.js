var express = require('express');
var app = express();

//app.use(express.static('pic'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/"+"index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.First_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get("/age_sex_get",function(req,res)
{
	console.log(req.query.Age);
	console.log(req.query.male || req.query.female)
	ans = {age:req.query.Age,sex:(req.query.male||req.query.female)};
	res.end(JSON.stringify(ans));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})