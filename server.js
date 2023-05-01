const express = require('express');
const data = require('./Movie Data/data.json');
const server = express();
const PORT = 3000;

//Routes
//localhost:3000/
server.get('/', (req, res) => {
    const returnedData = {
        "title": data.title,
        "poster_path": data.poster_path,
        "overview": data.overview
    }
    res.status(200).send(returnedData);
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

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
});



