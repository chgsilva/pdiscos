var dbService = require('../services/dbService')
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const controller = {
        getArtists: function(req, res) {
            dbService.getArtists().then(function(artistas){
                res.send(artistas);
            }).catch((err) => setImmediate(() => { throw err; }));
        },

        addArtist: function(req, res) {
            if (req.body.new_artist_name != undefined) {
                dbService.addArtist(req.body.new_artist_name).then(function(artistaId){
                    res.send({"id_artist":artistaId})
                }).catch((err) => setImmediate(() => { throw err; }));
            } else {
                res.send(
                    {
                        "missing_params":"new_artist_name"
                    }
                )
            }
        },

        deteleArtist: function(req, res) {
            //TODO remove all albums from this artist
            if (req.body.id_artist != undefined) {
                dbService.deleteArtist(req.body.id_artist).then(function(affectedRows){
                    if (affectedRows == 1) {
                        res.send("success")
                    } else {
                        res.send("error")
                    }
                }).catch((err) => setImmediate(() => { throw err; }));
            } else {
                res.send(
                    {
                        "missing_params":"id_artist"
                    }
                )
            }
        },

        editArtist: function(req, res) {
            if (req.body.id_artist != undefined && req.body.new_artist_name != undefined) {
                dbService.editArtist(req.body.id_artist, req.body.new_artist_name).then(function(affectedRows){
                    if (affectedRows == 1) {
                        res.send("edited")
                    } else {
                        res.send("error")
                    }
                }).catch((err) => setImmediate(() => { throw err; }));
            } else {
                missing_params = []
                req.body.id_artist == undefined && missing_params.push("id_artist")
                req.body.new_artist_name == undefined && missing_params.push("new_artist_name")

                res.send(
                    {
                        "missing_params":missing_params.toString()
                    }
                )
            }
        },

        getAlbums: function(req, res) {
            dbService.getAlbums().then(function(albums){
                res.send(albums);
            }).catch((err) => setImmediate(() => { throw err; }));
        },

        addAlbum: function(req, res) {
            if (req.body.new_album_name != undefined && req.body.new_album_year != undefined && req.body.id_artist != undefined) {
                dbService.addAlbum(req.body.new_album_name, req.body.new_album_year, req.body.id_artist).then(function(artistaId){
                    res.send({"id_album":artistaId})
                }).catch((err) => setImmediate(() => {
                    if (err.code == 'ER_NO_REFERENCED_ROW_2') {
                        res.send("invalid artist_id")
                    } else{
                        throw err;
                    }
                }));
            } else {
                missing_params = []
                req.body.id_artist == undefined && missing_params.push("id_artist")
                req.body.new_album_name == undefined && missing_params.push("new_album_name")
                req.body.new_album_year == undefined && missing_params.push("new_album_year")

                res.send(
                    {
                        "missing_params":missing_params.toString()
                    }
                )
            }
        },

        editAlbum: function(req, res) {
            if (req.body.new_album_name != undefined && req.body.new_album_year != undefined && req.body.id_artist != undefined && req.body.id_album) {
                dbService.editAlbum(req.body.new_album_name, req.body.new_album_year, req.body.id_artist, req.body.id_album).then(function(affectedRows){
                    if (affectedRows == 1) {
                        res.send("album successfully edited")
                    } else {
                        res.send("error")
                    }
                }).catch((err) => setImmediate(() => {
                    console.log(err)
                    if (err.code == 'ER_NO_REFERENCED_ROW_2') {
                        res.send("invalid id")
                    } else{
                        throw err;
                    }                }));
            } else {
                missing_params = []
                req.body.id_artist == undefined && missing_params.push("id_artist")
                req.body.new_album_name == undefined && missing_params.push("new_album_name")
                req.body.new_album_year == undefined && missing_params.push("new_album_year")
                req.body.id_album == undefined && missing_params.push("id_album")

                res.send(
                    {
                        "missing_params":missing_params.toString()
                    }
                )
            }
        },

        deteleAlbum: function(req, res) {
            if (req.body.id_album != undefined) {
                dbService.deleteAlbum(req.body.id_album).then(function(affectedRows){
                    if (affectedRows == 1) {
                        res.send("success")
                    } else {
                        res.send("error")
                    }
                }).catch((err) => setImmediate(() => { throw err; }));
            } else {
                res.send(
                    {
                        "missing_params":"id_album"
                    }
                )
            }
        },
    }
    return controller;
}