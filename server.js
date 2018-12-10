 var express = require ('express');
 var bodyParser = require ('body-parser');
 var fileupload = require ('express-fileupload');

 var path= require ('path');

 var server = express();

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());
server.use(fileupload());

server.get("/upload",function(req,res){
 res.sendFile(__dirname + "/upolad.html");
})

server.post("/upolad", function(req,res){
if(!req.files){
	res.send("No file uploaded");
}else{
	var file = req.files.file;
	var extension = path.extname(file.name);
	if(extension !==".png" && extension!==".gif" && extension !==".jpg"){
		res.send("Only Images are allowed")
	}else{
		file.mv(__dirname+"/uploads/"+file.name,function(err){
              if(err){
              	res.status(500).send(err);
              }else{
              	res.send("File Uploaded !")
              }
          }


			)};
	}



});
server.listen(3000,function (){
console.log("Upload server listening on port 3000");

});