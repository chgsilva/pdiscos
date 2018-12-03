<template>
    <div>
        <v-layout row xs10 offset-xs1>
            <listArtist v-bind:item_selected="artist_selected" @updateArtist="selectArtist"> </listArtist>
            <tableAlbums
                v-bind:item_selected="artist_selected"
                v-bind:artist_name="artist_selected_name"> </tableAlbums>
        </v-layout>
    </div>
</template>

<script>
    import listArtist from './../components/listArtist.vue'
    import tableAlbums from './../components/tableAlbums.vue'

    export default {
        components: {
            listArtist,
            tableAlbums
        },
        data: function() {
            return {
                artist_selected: 0,
                artist_selected_name: ""
            }
        },
        methods: {
            selectArtist: function(id_selected, name_selected) {
                this.artist_selected = id_selected
                this.artist_selected_name = name_selected
                console.log(this.artist_selected, this.artist_selected_name)
            },
        }
    }
</script>