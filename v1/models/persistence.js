const parser = require("./podcastParser");

// [TODO]
// Hier Ihren Code zu den Objekten "Podcast", "Episode" und "EpisodeAudio" 
// aus Praktikum 9 hinein (ohne Beispieldaten!) hineinkopieren

//Podcast Objekt
function Podcast( titel, beschreibung, autor, besitzerName, besitzerEmail, bildUrl, feedUrl, kategorien, datum ){
  this.titel = titel,
  this.beschreibung = beschreibung,
  this.autor = autor,
  this.besitzerName = besitzerName,
  this.besitzerEmail = besitzerEmail,
  this.bildUrl = bildUrl,
  this.feedUrl = feedUrl,
  this.kategorien = kategorien,       
  this.letztesUpdate = datum,   //Datumsobjekt soll übergeben werden. Nicht zur Laufzeit erstellt.
  this.episoden = [];
}

//Funktion zum hinzufügen einer Episode
Podcast.prototype.addEpisode = function(episode) {
  this.episoden.push(episode);
  this.episoden.sort( (a, b) => b.datum - a.datum );
}

//Episoden Objekt
function Episode(titel, beschreibung, dauer, datum, audioFile){
  this.titel = titel,
  this.beschreibung = beschreibung,
  this.dauer = dauer,
  this.datum = datum,
  this.audioFile = audioFile; //Komposition zu EpisodeAudio
}

//Funktion zum ausgeben der Episoden dauer
Episode.prototype.getDauerInStundenUndMinuten = function() {
  let min = Math.floor((this.dauer/1000)/60);
  let h = Math.floor(((this.dauer/1000)/60)/60);
  min = min - (h*60);
  return `${h}h ${min}min`;
}

//Episoden Audio Datei Objekt
function EpisodeAudio(url, groesse, typ){
  this.url = url,
  this.groesse = groesse,
  this.typ = typ;
}

//##################################################################################

const podcasts = [];

/**
 * Abonniert einen Podcast, indem die Daten von der gegebenen Feed-URL
 * importiert werden. Der Import selbst erfolgt asynchron, daher wird
 * fuer Folgetaetigkeiten eine Callback-Funktion benötigt.
 *
 * @param {String} url Die Feed-URL des Podcasts, welcher abonniert werden soll.
 * @param {Function} callback Callback-Funktion, die festlegt, was nach erfolgtem
 *                            Import passieren soll.
 */
function abonnieren(url, callback) {
  parser.parseFeed(url, (feed) => {
    podcasts.push(konvertieren(url, feed));
    if (callback) callback();
  });
}

/**
 * Konvertiert die von einer URL importierten Feed-Daten in fuer diese Web-
 * Anwendung passende Datenobjekte (Podcast, Episode, EpisodeAudio)
 *
 * @param {String} url Die Feed-URL des Podcasts, von welcher importiert wurde.
 * @param {Object} feed Feed-Objekt gemaess https://www.npmjs.com/package/podcast-feed-parser#default
 */
function konvertieren(url, feed) {
  // [TODO]
  // Funktion implementieren
  let p = new Podcast(feed.meta.title, 
    feed.meta.description,
    feed.meta.author,
    feed.meta.owner.name,
    feed.meta.owner.email,
    feed.meta.imageURL,
    url,
    feed.meta.categories,
    feed.meta.lastUpdated,
    );

  feed.episodes.forEach( ep => {
    p.addEpisode(new Episode (ep.title,
      ep.description,
      ep.duration,
      ep.pubDate,
      new EpisodeAudio( ep.enclosure.url, ep.enclosure.length, ep.enclosure.type)));
  });

  return p;
}

// [TODO]
// Schnittstelle des Moduls definieren: Podcast-Array und abonnieren-Funktion
// von außen zugreifbar machen

module.exports = {
  Podcast: Podcast,
  Episode: Episode,
  EpisodeAudio: EpisodeAudio,
	podcasts: podcasts,
	abonnieren: abonnieren
};