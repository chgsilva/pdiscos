var mysql = require('mysql');
var Promise = require('promise');
var db_config = require('./../config/db_config.json')

console.log(db_config.development.host)
var connection = mysql.createConnection({
    host     : db_config.development.host,
    user     : db_config.development.user,
    password : db_config.development.password,
    database : db_config.development.database,
    port: 3306
});

connection.connect();

module.exports = {
    getAlbums: function(){
        return new Promise(function(resolve, reject){
            connection.query(
                "SELECT D.*, A.Nome as artista " +
                "FROM Disco AS D " +
                "JOIN Artista AS A ON A.id_artista=D.id_artista", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    },

    deleteAlbum: function(id_album) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "DELETE FROM Album " +
                "WHERE id_album=" + id_album
                , function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    addAlbum: function(new_album_name, new_album_year, id_artist) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "INSERT INTO Album(album_name, album_year, id_artista) " +
                "Values ('" + new_album_name + "', " + new_album_year + ", " + id_artist + ")",
                function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.insertId);
            });
        });
    },

    editAlbum: function(new_album_name, new_album_year, id_artist, id_album) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "UPDATE Album " +
                "SET album_name='" + new_album_name + "', album_year=" + new_album_year + ", id_artist=" + id_artist + " " +
                "WHERE id_album=" + id_album,
                function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    getArtists: function(){
        return new Promise(function(resolve, reject){
            connection.query(
                "select A.Nome as artista, A.ID as id_artista from Artista AS A", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    },

    addArtist: function(name_artista) {
        return new Promise(function(resolve, reject) {
            connection.query("insert into Artista(Nome) Values ('" + name_artista + "')", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.insertId);
            });
        });
    },

    editArtist: function(artist_id, name_artist) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "UPDATE Artista " +
                "SET nome=\"" + name_artist + "\" " +
                "WHERE id_artista=" + artist_id ,
                function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    deleteArtist: function(id_artist) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "DELETE FROM Artista "+
                "WHERE id_artista='" + id_artist + "'"
                , function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },
};