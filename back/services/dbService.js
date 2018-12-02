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
                "SELECT * " +
                "FROM Album AS AB " +
                "JOIN Artist AS A " +
                "ON A.id_artist=AB.id_artist", function (err, rows, fields) {
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
                "INSERT INTO Album(album_name, album_year, id_artist) " +
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
                "select * from Artist AS A", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    },

    addArtist: function(name_artist) {
        return new Promise(function(resolve, reject) {
            connection.query("insert into Artist(name_artist) Values ('" + name_artist + "')", function (err, rows, fields) {
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
                "UPDATE Artist " +
                "SET name_artist=\"" + name_artist + "\" " +
                "WHERE id_artist=" + artist_id ,
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
                "DELETE FROM Artist "+
                "WHERE id_artist='" + id_artist + "'"
                , function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    getCollections: function(){
        return new Promise(function(resolve, reject){
            connection.query(
                "select * from Collection", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    },

    addCollection: function(new_collection_name, new_collection_descricao) {
        return new Promise(function(resolve, reject) {
            connection.query("INSERT INTO Collection(name_collection, summary_collection) VALUES ('" + new_collection_name + "', '" + new_collection_descricao + "')", function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.insertId);
            });
        });
    },

    editCollection: function(new_collection_name, new_collection_descricao, id_collection) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "UPDATE Collection " +
                "SET name_collection='" + new_collection_name + "' , " +
                "summary_collection='" + new_collection_descricao + "' " +
                "WHERE id_collection=" + id_collection ,
                function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    deteleCollection: function(id_collection) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "DELETE FROM Collection "+
                "WHERE id_collection='" + id_collection + "'"
                , function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    associateAlbumCollection: function(id_collection, id_album) {
        return new Promise(function(resolve, reject) {
            connection.query("INSERT INTO Album_Collection(id_collection, id_album) VALUES (" + id_collection + ", " + id_album + ")",
            function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.insertId);
            });
        });
    },

    disassociateAlbumCollection: function(id_collection, id_album) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "DELETE FROM Album_Collection "+
                "WHERE id_collection=" + id_collection + " AND id_album=" + id_album
                , function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows.affectedRows);
            });
        });
    },

    albumsByCollection: function(id_collection) {
        return new Promise(function(resolve, reject){
            connection.query(
                "SELECT * " +
                "FROM Album_Collection AS AC " +
                "JOIN Album as AB on AB.id_album=AC.id_album " +
                "JOIN Collection AS C "+
                "ON C.id_collection=AC.id_collection " +
                "JOIN Artist AS AT "+
                "ON AT.id_artist=AB.id_artist " +
                "WHERE ac.id_collection=" + id_collection
                ,
                 function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    },

    albumsByArtist: function(id_artist) {
        return new Promise(function(resolve, reject){
            connection.query(
                "SELECT * " +
                "FROM Album as A " +
                "WHERE A.id_artist=" + id_artist
                ,
                 function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(rows)
            });
        });
    }
};