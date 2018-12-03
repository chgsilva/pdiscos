<template>
    <div>
        <div>
            <v-icon @click="openAlbumDialog('','',-1)">
                add
            </v-icon>
            <v-icon @click="removeArtist">
                delete
            </v-icon>
        </div>
        <v-dialog v-model="dialog" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.new_album_name" label="Album Name"></v-text-field>
                            <v-text-field v-model="editedItem.new_album_year" label="Year"></v-text-field>
                        </v-flex>

                    </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
                </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import consts from './../consts.js'

export default {
    data: function() {
        return {
            formTitle: "Add new Artist",
            dialog: false,
            editedIndex: -1,
            editedItem: {
                new_album_name: '',
                new_album_year: null,
                id: -1
            },
            defaultItem: {
                new_artist_name: '',
                new_album_year: null,
                id: -1
            }
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    methods: {
        openAlbumDialog: function(name, year, id) {
            this.editedItem.new_album_name = name
            this.editedItem.new_album_year = year
            this.editedItem.id = id
            this.editedIndex = id

            this.formTitle = id == -1 ? "Add Album" : "Edit Album"

            this.dialog=true
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save () {
            if(this.editedIndex == -1){
                if (this.editedItem.new_album_name != "" && this.editedItem.new_album_year != "" && this.item_selected) {
                    axios.post(consts.BASE_URL + 'api/album/',{
                        new_album_name: this.editedItem.new_album_name,
                        new_album_year: this.editedItem.new_album_year,
                        id_artist: this.item_selected
                    })
                    .then(response=>(
                        this.$emit('requestAlbumsUpdate')
                    ))
                    .catch(function (error) {
                        console.log(error);
                    });
                } else {
                    alert("all items are required and new_album_year must be a number")
                }
            } else {
                if (this.editedItem.new_album_name != "" && this.editedItem.new_album_year != "" && this.item_selected && Number.isInteger(this.editedItem.new_album_year)) {
                    axios.put(consts.BASE_URL + 'api/album/', {
                        new_album_name: this.editedItem.new_album_name,
                        new_album_year: this.editedItem.new_album_year,
                        id_artist: this.item_selected,
                        id_album:this.editedItem.id
                    })
                    .then(response=>(
                        this.$emit('requestAlbumsUpdate')
                    ))
                    .catch(function (error) {
                        console.log(error);
                    });
                } else {
                    alert("all items are required and new_album_year must be a number")
                }
            }
            this.close()
        },
        removeArtist: function(artist) {
            console.log(this.item_selected)
            confirm('Are you sure you want to delete this Artist?') &&
            axios.delete(consts.BASE_URL + 'api/artist/' + this.item_selected)
            .then(response=>(
                console.log(response)
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
        editArtist: function(){


        },

    },
    props: ['item_selected']
}
</script>