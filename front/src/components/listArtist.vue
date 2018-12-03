<template>
    <v-flex xs3 md3 offset-md1
        class="flex"
        style="float:left">
        <v-card color="purple">
            <v-list class="card_flex" two-line subheader color="purple">
                <addArtist @addedArtist="updateList"></addArtist>

                <v-divider inset></v-divider>

                <v-subheader inset>{{list_items_subheader}}</v-subheader>

                <v-list-tile
                    v-for="item in items"
                    :key="item.id_artist"
                    avatar
                    @click="selectArtist(item)"
                >
                    <v-list-tile-avatar>
                        <v-icon class="purple white--text" >person</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title class="black--text" v-bind:class="{'purple--text':item_selected==item.id_artist}">{{ item.name_artist }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-flex>
</template>

<script>
import axios from 'axios'
import addArtist from './addArtist.vue'
import consts from './../consts.js'

/* eslint-disable */
export default {
    props: ['item_selected'],
    components: {
        addArtist
    },
    data() {
        return {
            items: {},
            list_items_subheader: 'Artists'
        }
    },
    created() {
        this.updateList()

        this.$root.$on('updateArtists', data => {
            this.updateList()
        })
    },
    methods: {
        selectArtist: function(item) {
            this.$emit('updateArtist', item.id_artist, item.name_artist)
        },
        updateList: function() {
            axios.get(consts.BASE_URL + 'api/artists/', {})
            .then( response => (
                this.items = response.data,
                this.selectArtist(this.items[0])
            ))
            .catch(function (error) {
                console.log(error);
            })
        }
    },
}
</script>