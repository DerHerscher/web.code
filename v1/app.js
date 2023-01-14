const express = require("express");
const app = express();
const router = require("./routes/routes.js");
const data = require("./models/persistence.js");


async function abo(){
    await data.abonnieren("https://feeds.lagedernation.org/feeds/ldn-mp3.xml");
    await data.abonnieren("https://feeds.metaebene.me/lnp/m4a");
    await data.abonnieren("https://wowirsindistvorne.show/feed/mp3/");
    console.log("Podcast abonniert");
}
abo();

//Read html body contents
app.use(express.urlencoded({extended:false}));
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