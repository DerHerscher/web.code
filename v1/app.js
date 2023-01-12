const express = require("express");
const app = express();
const router = require("./routes/routes.js");


const data = require("./models/persistence.js");


data.abonnieren("https://feeds.lagedernation.org/feeds/ldn-mp3.xml", () => {
    data.abonnieren("https://feeds.metaebene.me/lnp/m4a", () => {console.log("Podcast abonniert");} )
});

//Activate Template engine
app.set("view engine", "ejs");
app.set("views","views")
//Enable body data access
app.set(express.urlencoded({extended:false}));
//Send static Content
app.use(express.static("public"));
//Use Router
app.use(router);

app.listen(8020, function(){
    console.log("Ich lausche auf http://localhost:8020");
})