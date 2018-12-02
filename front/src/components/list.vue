<template>
    <v-flex xs3 md3 offset-md1
        class="flex"
        style="float:left">
        <v-card color="purple">
            <v-list class="card_flex" two-line subheader color="purple">
                <addCollection></addCollection>

                <v-divider inset></v-divider>

                <v-subheader inset>{{list_items_subheader}}</v-subheader>

                <v-list-tile
                    v-for="item in items"
                    :key="item.id_collection"
                    avatar
                    @click="selectCollection(item)"
                >
                    <v-list-tile-avatar>
                        <v-icon class="purple white--text" >list</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title class="black--text" v-bind:class="{'purple--text':item_selected==item.id_collection}">{{ item.name_collection }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.summary_collection }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-flex>
</template>

<script>
import axios from 'axios'
import addCollection from './addCollection.vue'
import consts from './../consts.js'

/* eslint-disable */
export default {
    props: ['item_selected'],
    components: {
        addCollection
    },
    data() {
        return {
            items: {},
            list_items_subheader: 'Collections'
        }
    },
    created() {
        axios.get(consts.BASE_URL + 'api/collections/', {})
        .then( response => (
            this.items = response.data,
            console.log(this.items)
        ))
        .catch(function (error) {
            console.log(error);
        })
    },
    methods: {
        selectCollection: function(item) {
            this.$emit('updateCollection', item.id_collection, item.name_collection)
        },
    },
}
</script>