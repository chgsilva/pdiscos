const PREFIX = '/api'

module.exports = function(app) {
    app.get(PREFIX + '/artists', app.controllers.catalogoController.getArtists);
    app.post(PREFIX + '/artist', app.controllers.catalogoController.addArtist);
    app.put(PREFIX + '/artist', app.controllers.catalogoController.editArtist);
    app.delete(PREFIX + '/artist', app.controllers.catalogoController.deteleArtist);

    app.get(PREFIX + '/albums', app.controllers.catalogoController.getAlbums);
    app.post(PREFIX + '/album', app.controllers.catalogoController.addAlbum);
    app.put(PREFIX + '/album', app.controllers.catalogoController.editAlbum);
    app.delete(PREFIX + '/album', app.controllers.catalogoController.deteleAlbum);


}
