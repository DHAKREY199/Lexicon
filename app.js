var express = require("express");
var app =express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require("request");
var tts = require('node-google-text-to-speech');
var googleTTS = require('google-tts-api');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));




app.get("/", function(req, res){
    
   var url = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
   request(url, function(error, response, body){
        var data = JSON.parse(body);
        var word = data.word;
        var text = data.definitions[0].text;
        res.render("landing",{word : word,text : text});
        
   });

            
});


app.get("/info", function(req, res) {
    var unirest = require('unirest');
    //var id = req.query.search;
    var id = JSON.parse(JSON.stringify(req.query.search));
    var word = "https://wordsapiv1.p.mashape.com/words/"+id;
    unirest.get(word)
    .header("X-Mashape-Key", "Fn8Qp7keZemsheBq4YPTvYoDhtKfp1YdhxKjsnkUu4XESTV6nj")
    .header("Accept", "application/json")
    .end(function (result, err) {
                
                        var data = result.body.results;
                        if(data != undefined){
                                var first = data[0];
                            res.render("home",{data : data , id : id, first : first});
                        } else {
                            res.redirect("/");
                        }
                        
                
        
});
});



server.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});