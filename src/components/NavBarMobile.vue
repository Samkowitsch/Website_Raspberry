<template>
    <!-- <v-navigation-drawer
    app
    dark
    expand-on-hover
    bottom
    clipped
    v-model="drawer"
    mini-variant-width="100"
    >
        <v-list
        nav>
            <template >

                <v-list-item link
                @click="changeSite(0)">
                    <v-list-item-icon>
                        <v-icon x-large>mdi-weather-partly-cloudy</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Weather</v-list-item-title>
                </v-list-item>

                <v-list-item link
                @click="changeSite(1)">
                    <v-list-item-icon>
                        <v-icon x-large>mdi-power-plug-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Energy</v-list-item-title>
                </v-list-item>

                <v-list-item link
                @click="changeSite(2)">
                    <v-list-item-icon>
                        <v-icon x-large>mdi-lightbulb-on-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Lights</v-list-item-title>
                </v-list-item>

            </template>
        </v-list>
    </v-navigation-drawer> -->

    <v-bottom-navigation
    
    app
    dark
    grow
    >
        <v-btn
        height="100%"
        
        @click="changeSite(0)">
            <v-icon>mdi-weather-partly-cloudy</v-icon>
        </v-btn>
        <v-btn
        height="100%"
        @click="changeSite(1)">
            <v-icon >mdi-power-plug-outline</v-icon>
        </v-btn>
        <v-btn
        height="100%"
        @click="changeSite(2)">
            <v-icon>mdi-lightbulb-on-outline</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name:  'NavBarMobile',
    methods: {
        changeSite(s){
            console.log("Button pressed : " + s)
            this.site = s
            this.$emit('changeSite', s)
        }
    },
    data() {
        return {
            site: 0
        }
    },
}
</script>

<style>

</style>