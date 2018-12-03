<template>
    <v-flex xs8 md6 class="flex">
        <v-card class="card_flex">
            <div class="header_table">
                <p class="current_artist_name">{{artist_name}}</p>
                <div class="items">
                    <addAlbum
                        v-bind:item_selected="item_selected"
                        ref="addAlbumComponent"
                        @requestAlbumsUpdate="updateAlbumList"
                    ></addAlbum>
                </div>
            </div>
            <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.album_name }}</td>
                    <td class="text-xs-center">{{ props.item.album_year }}</td>

                    <td class="justify-center layout px-0">
                        <v-icon
                            @click="editAlbum(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            @click="removeAlbum(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-card>
    </v-flex>
</template>

<script>
import axios from 'axios'
import consts from './../consts.js'
import addAlbum from './addAlbum.vue'

export default {
    data() {
        return {
            items: [],
            headers: [
                {
                    text: 'Name',
                    align: 'center',
                    value: 'album_name'
                },
                {
                    text: 'Year',
                    align: 'center',
                    value: 'album_year'
                }
            ]
        }
    },
    components: {
        addAlbum
    },
    created() {
        this.updateAlbumList()
    },
    methods: {
        updateAlbumList: function() {
            axios.get(consts.BASE_URL + 'api/albumsByArtist/'+this.item_selected)
            .then( response => (
                this.items = response.data,
                console.log(this.items)
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
        removeAlbum: function(album) {
            confirm('Are you sure you want to delete this album?') &&
            axios.delete(consts.BASE_URL + 'api/album/' + album.id_album)
            .then( response => (
                this.updateAlbumList()
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
        editAlbum: function(album) {
            this.$refs.addAlbumComponent.openAlbumDialog(album.album_name, album.album_year, album.id_album)
        }
    },
    computed: {
        current_playlist_name: function() {
            try {

            } catch(e) {
                return ""
            }
        }
    },
    watch: {
        item_selected: function() {
            axios.get(consts.BASE_URL + 'api/albumsByArtist/' + this.item_selected)
            .then( response => (
                this.items = response.data,
                console.log(this.items)
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
    },
    props:['item_selected', 'artist_name']
}
</script>

<style>
.current_artist_name {
    flex: 0 1 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.header_table {
    background-color: purple;
    height: 72px;
    font-size: 25px;
    color:white;
    line-height: 65px;

    display: flex;
    justify-content: flex-start;
    position: relative;
}
.items {
    flex: 0 1 auto;
    margin-left: auto;
    margin-right: 5%;
}
</style>
