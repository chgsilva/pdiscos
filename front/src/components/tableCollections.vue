<template>
    <v-flex xs8 md6 class="flex">
        <v-card class="card_flex">
            <div class="header_table">
                <p class="current_collection_name">{{collection_name}}</p>
                <div class="items">
                    <v-icon v-if="!edit_mode"
                        @click="editCollectionInfo"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        @click="removeCollection"
                    >
                        delete
                    </v-icon>
                </div>
            </div>

            <v-card-title>

                <v-icon v-if="!edit_mode"
                        @click="editCollection"
                    >
                        add
                </v-icon>
                <v-icon v-else
                        @click="editCollection"
                    >
                        save
                    </v-icon>
                Albums in this collection:

                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
                :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.album_name }}</td>
                    <td class="text-xs-center">{{ props.item.name_artist }}</td>
                    <td class="text-xs-center">{{ props.item.album_year }}</td>

                    <td v-if="edit_mode" class="justify-center layout px-0" v-bind:class="{'red_icon': getAddedIds.includes(props.item.id_album)}">
                        <v-icon
                            @click="disassociateAlbum(props.item)"
                        >
                            remove
                        </v-icon>
                    </td>
                    <td v-if="edit_mode" class="justify-center layout px-0" v-bind:class="{'green_icon': !getAddedIds.includes(props.item.id_album)}">
                        <v-icon
                            @click="associateAlbum(props.item)"
                        >
                            add
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

export default {
    data() {
        return {
            items_added: [],
            items: [],
            headers: [
                {
                    text: 'Name',
                    align: 'center',
                    value: 'album_name'
                },
                {
                    text: 'Artist',
                    align: 'center',
                    value: 'name_artist'
                },
                {
                    text: 'Year',
                    align: 'center',
                    value: 'album_year'
                }
            ],
            edit_mode: false,
            search: ''
        }
    },
    created() {
        axios.get(consts.BASE_URL + 'api/albumsByCollection/'+this.item_selected)
        .then( response => (
            this.items = response.data,
            console.log(this.items)
        ))
        .catch(function (error) {
            console.log(error);
        })

    },
    methods: {
        removeCollection: function() {
            confirm('Are you sure you want to delete this collection?') &&
            axios.delete(consts.BASE_URL + 'api/collection/' + this.item_selected)
            .then(response => (
                this.$root.$emit('updateCollections'),
                console.log(response)
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
        editCollection: function() {
            this.edit_mode = !this.edit_mode
        },
        editCollectionInfo: function() {
            this.$root.$emit('editCollectionInfo', {id:this.item_selected, collection_name:this.collection_name, collection_summary:this.collection_summary})
        },
        associateAlbum: function(album) {
            this.items_added.push(album)
            axios.post(consts.BASE_URL + 'api/associateAlbumCollection/', {id_album:album.id_album, id_collection:this.item_selected, summary: ''})
                .then( response => (
                    console.log(this.items)
                ))
                .catch(function (error) {
                    console.log(error);
                })
        },
        disassociateAlbum: function(album) {
            for (var item in this.items_added) {
                if(album.id_album == this.items_added[item].id_album) {
                    this.items_added.splice(item, 1);
                    break
                }
            }

            axios.post(consts.BASE_URL + 'api/disassociateAlbumCollection/', {id_album:album.id_album, id_collection:this.item_selected})
                .then( response => (
                    console.log(this.items)
                ))
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    computed: {
        getAddedIds: function() {
            var added = []
            for (var item in this.items_added) {
                added.push(this.items_added[item].id_album)
            }
            return added
        }
    },
    watch: {
        item_selected: function() {
            axios.get(consts.BASE_URL + 'api/albumsByCollection/' + this.item_selected)
            .then( response => (
                this.items = response.data,
                console.log(this.items)
            ))
            .catch(function (error) {
                console.log(error);
            })
        },
        edit_mode: function() {
            if (this.edit_mode) {
                axios.get(consts.BASE_URL + 'api/albums/')
                .then( response => (
                    this.items_added = this.items,
                    this.items = response.data,
                    console.log('edit',this.items)
                ))
                .catch(function (error) {
                    console.log(error);
                })

            } else {
                axios.get(consts.BASE_URL + 'api/albumsByCollection/' + this.item_selected)
                .then( response => (
                    this.items = response.data,
                    console.log(this.items)
                ))
                .catch(function (error) {
                    console.log(error);
                })
            }
        }
    },
    props:['item_selected', 'collection_name', 'collection_summary']
}
</script>

<style>
.current_collection_name {
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
.green_icon {
    background-color: green;
}
.red_icon {
    background-color: red;
}
</style>
