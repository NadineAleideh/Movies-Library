'use strict';

const express = require('express');
const cors = require('cors');
// const data = require('./Movie_Data/data.json');
const server = express();
require('dotenv').config();
const apiKey = process.env.api_key;
const PORT = 3000;

server.use(cors())   // Middleware function 
const axios = require('axios');


server.get('/trending', trendingMoviesHandler)
server.get('/search', searchMoviesHandler)
server.get('/topRated', topRatedhMoviesHandler)
server.get('/upcoming', upcominghMoviesHandler)
server.get('/tvShowsPopular', tvShowsPopularHandler)
server.get('/popularPeople', popularPeopleHandler)

server.get('*', defaultHandler)


//Get the all (Include all movies, TV shows and people in the results as a global trending list) weekly(View the trending list for the week) trending items
function trendingMoviesHandler(req, res) {

    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//Search for a movie with query "the" on TMDB
function searchMoviesHandler(req, res) {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=The&page=2`
    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//Get the top rated movies on TMDB
function topRatedhMoviesHandler(req, res) {

    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`

    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleMovie = new TopRatedMovie(item.id, item.title, item.vote_average, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range
function upcominghMoviesHandler(req, res) {

    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=2`

    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//Get a list of the current popular TV shows on TMDB
function tvShowsPopularHandler(req, res) {

    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`

    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//Get the list of popular people on TMDB 
function popularPeopleHandler(req, res) {

    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=1`

    try {
        axios.get(url)
            .then(result => {
                let mapResult = result.data.results.map(item => {
                    let singleperson = new Person(item.name, item.gender, item.known_for_department, item.known_for)
                    return singleperson;
                })
                res.send(mapResult);

            })
            .catch((error) => {
                console.log('sorry you have something error', error);
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}



//Create a function to handle "server error" status(500)
function errorHandler(error, req, res) {
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}

//Create a function to handle "page not found error" (status 404)
function defaultHandler(req, res) {
    res.status(404).send('page not found !')
}

function Item(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

function TopRatedMovie(id, title, vote_average, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.vote_average = vote_average;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

function Person(name, gender, known_for_department, known_for) {
    this.name = name;
    this.gender = gender;
    this.known_for_department = known_for_department;
    this.known_for = known_for.map(item => {
        let title = item.title;
        return title;
    })
}

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
});



