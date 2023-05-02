const express = require('express');
const data = require('./Movie_Data/data.json');
const server = express();
const PORT = 3000;

//Routes
//localhost:3000/
server.get('/', (req, res) => {
   let movie=new Movie(data.title,data.poster_path,data.overview);
    res.status(200).send(movie);
})

//localhost:3000/favorite
server.get('/favorite', (req, res) => {
    res.status(200).send("Welcome to Favorite Page");
})

//Create a function to handle "page not found error" (status 404)
server.get('*', (req, res) => {
    res.status(404).send("Page not found !");
})

//Create a function to handle the server error (status 500)
server.use((err, req, res, next) => {
    res.status(500).send("Server error !");
})

function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
});



