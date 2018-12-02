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

    app.get(PREFIX + '/albumsByArtist', app.controllers.catalogoController.albumsByArtist);
    app.get(PREFIX + '/albumsByCollection', app.controllers.catalogoController.albumsByCollection);

    app.get(PREFIX + '/collections', app.controllers.catalogoController.getCollections);
    app.post(PREFIX + '/collection', app.controllers.catalogoController.addCollection);
    app.put(PREFIX + '/collection', app.controllers.catalogoController.editCollection);
    app.delete(PREFIX + '/collection', app.controllers.catalogoController.deteleCollection);

    app.post(PREFIX + '/associateAlbumCollection', app.controllers.catalogoController.associateAlbumCollection);
    app.post(PREFIX + '/disassociateAlbumCollection', app.controllers.catalogoController.disassociateAlbumCollection);

}
