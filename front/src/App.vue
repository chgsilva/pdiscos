<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">ALBUM COLLECTIONS</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                flat
                :to="{path:'/'}"
            >
                <span class="mr-2">COLLECTIONS</span>
            </v-btn>
            <v-btn
                flat
                :to="{path:'/albums'}"
            >
                <span class="mr-2">ALBUMS</span>
            </v-btn>
            <v-btn
                flat
                :to="{path:'/about'}"
            >
                <span class="mr-2">ABOUT</span>
            </v-btn>
        </v-toolbar>

        <v-container fluid>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-container>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    components: {

    },
    data () {
        return {
        //
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>