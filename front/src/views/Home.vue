<template>
    <div>
        <v-layout row xs10 offset-xs1>
            <list v-bind:item_selected="collection_selected" @updateCollection="selectCollection"> </list>
            <tableCollections
                v-bind:item_selected="collection_selected"
                v-bind:collection_name="collection_selected_name"> </tableCollections>
        </v-layout>
    </div>
</template>

<script>
    import list from './../components/list.vue'
    import tableCollections from './../components/tableCollections.vue'

    export default {
        components: {
            list,
            tableCollections
        },
        data: function() {
            return {
                collection_selected: 0,
                collection_selected_name: ""
            }
        },
        methods: {
            selectCollection: function(id_selected, name_selected) {
                this.collection_selected = id_selected
                this.collection_selected_name = name_selected
            },
        }
    }
</script>
