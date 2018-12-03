<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-list-tile
            slot="activator"
            v-for="item in add_item"
            :key="item.id"
            avatar
            @click="openCreateArtistDialog"
        >

            <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

        </v-list-tile>

        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.new_artist_name" label="Artit Name"></v-text-field>
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
</template>

<script>
import axios from 'axios'
import consts from './../consts.js'

export default {
    data: function() {
        return {
            add_item: [
                { icon: 'add', iconClass: 'grey lighten-1 white--text', title: 'Add Artist', subtitle: 'Create artists to add their albums', id_collection:-1 },
            ],
            formTitle: "Add new Artist",
            dialog: false,
            editedIndex: -1,
            editedItem: {
                new_artist_name: '',
                id:-1
            },
            defaultItem: {
                new_artist_name: '',
                id:-1
            }
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        }
    },
    methods: {
        openCreateArtistDialog: function() {
            this.editedItem = Object.assign({}, this.defaultItem)
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
            if (this.editedItem.new_artist_name != "") {
                axios.post(consts.BASE_URL + 'api/artist/', {
                    new_artist_name: this.editedItem.new_artist_name,
                })
                .then(response => (
                    this.$emit('addedArtist'),
                    console.log(response)
                ))
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                alert("all items are required")
            }
            this.close()
        }
  }
}
</script>