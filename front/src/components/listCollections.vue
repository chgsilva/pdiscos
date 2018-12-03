<template>
    <v-flex xs3 md3 offset-md1
        class="flex"
        style="float:left">
        <v-card color="purple">
            <v-list class="card_flex" two-line subheader color="purple">
                <addCollection @requestListUpdate="updateList" @updateCollectionsListOnly="updateCollectionsListOnly" ></addCollection>

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
        this.updateList()
        this.$root.$on('updateCollections', data => {
            this.updateList()
        })
        this.$root.$on('updateCollectionsListOnly', data => {
            this.updateCollectionsListOnly()
        })

    },
    methods: {
        selectCollection: function(item) {
            this.$emit('updateCollection', item.id_collection, item.name_collection, item.summary_collection)
        },
        updateCurrentCollectionName: function() {
            for (var item in this.items){
                if(this.items[item].id_collection == this.item_selected){
                    this.$emit('updateCollection', this.items[item].id_collection, this.items[item].name_collection, this.items[item].summary_collection)
                    break
                }
            }
        },
        updateList: function(){
            axios.get(consts.BASE_URL + 'api/collections/', {})
            .then( response => (
                this.items = response.data,
                this.selectCollection(this.items[0])
            ))
            .catch(function (error) {
                console.log(error);
            })
        },

        updateCollectionsListOnly: function(){
            axios.get(consts.BASE_URL + 'api/collections/', {})
            .then( response => (
                this.items = response.data,
                this.updateCurrentCollectionName()
            ))
            .catch(function (error) {
                console.log(error);
            })
        }
    },

}
</script>