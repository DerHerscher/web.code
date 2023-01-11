const http = require("http");
const data = require("../models/persistence.js");


data.abonnieren("https://feeds.lagedernation.org/feeds/ldn-mp3.xml", () => {
    data.abonnieren("https://feeds.metaebene.me/lnp/m4a", () => {console.log("Podcast abonniert");} )
});

// data.abonnieren("https://wowirsindistvorne.show/feed/mp3/", () => {
//     data.abonnieren("https://feeds.metaebene.me/lnp/m4a", server)
// });


//Server Funktion die eine Webserver und den HTML Content erstellt.
    let server = http.createServer(function(request, response){
        response.writeHead(200, {"content-type" : "text/html; charset=utf-8"})
        response.end(createContent());
    });
    server.listen(8844, function() {
        console.log("Der Server läuft auf http://localhost:8844");
    });

let createContent = function(){
    let content = "";
    data.podcasts.forEach( pod =>{
        content += `<hr>
                    <h2>${pod.titel}</h2>
                    <p>${pod.beschreibung}</p>
                    <img src="${pod.bildUrl}" width="150" heigth="100">
                    <ul>`;
        for (let i = 0; i < 5; i++) {
            content += `<li>${pod.episoden[i].titel}</li>`;
        }
        content += `</ul>`;
    });

    let html = `<!DOCTYPE html>
    <html lang="de">
        <head>
            <title>Podcast-App Test</title>
            <meta charset="utf-8" />
        </head>
        <body>
            <h1>Podcast-App Test</h1>
            <section id=content>
                ${content}
            </section>
        <body>
    </html>`;

    return html;
}
