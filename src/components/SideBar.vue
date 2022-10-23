<template>
    <!-- <nav class="Sidebar">
        <ul class="Sidebar_Nav">
            <li class="Item">
                <a href="#" class="Link" @click="changeSite(0)"> <img src="../assets/weather.svg" alt="" height="100%" > <span class="Text">Weather</span> </a>
            </li>
            
            <li class="Item"  >
                <a href="#" class="Link" @click="changeSite(1)"> <img src="../assets/lightning-bolt.svg" alt="" height="100%"><span class="Text">Energy</span></a>
            </li>

            <li class="Item">
                <a href="#" class="Link" @click="changeSite(2)"> <img src="../assets/light-bulb.svg" alt="" height="100%" ><span class="Text">Lights</span></a>
            </li>

            <li class="Item">
                <a href="#" class="Link"><span>Last item</span></a>
            </li>
        </ul>
    </nav> -->
    <v-navigation-drawer
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
    </v-navigation-drawer>
</template>

<script>
export default {
    name:  'SideBar',
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

:root{

    --Background-Color  : #434A42;
    --Element-Hover     :   #626C66 
}

@media only screen and (min-width: 600px){
    .Sidebar{
        top: 0;
        height: 100vh;
        width: 7rem;
        opacity: 0.99;
    }

    .Sidebar:hover{
        width: 16rem;
    }


    .Sidebar_Nav{
        flex-direction: column;
    }

    .Sidebar_Nav .Item .Link{
        height: 5rem;
    }
    .Sidebar:hover .Sidebar_Nav .Item .Text{
        display: block;
    }

}

@media only screen and (max-width: 600px){ 
    .Sidebar{
        bottom: 0;
        width: 100vw;
        height: 5rem;
    }

    .Sidebar_Nav{
        flex-direction: row;
    }

    .Sidebar_Nav .Item .Link{
        height: 3rem;
        justify-content: center;
    }
}


.Sidebar{
    background-color: var(--Background-Color);

    position: fixed;
    left: 0;

    transition: width 200ms ease;
}

.Sidebar_Nav{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;
}

.Sidebar_Nav .Item{
    width: 100%;
    padding: 1rem;
    transition: 200ms;
}

.Sidebar_Nav .Item:hover{
    background-color: var(--Element-Hover);
}

.Sidebar_Nav .Item:last-child{
    margin-top:  auto;
}

.Sidebar_Nav .Item .Link{
    display: flex;
    align-items: center;
    text-decoration: none;
    filter: grayscale(100%);
    transition: 200ms;
}

.Sidebar_Nav .Item .Link:hover{
    filter: grayscale(0%);
}


.Sidebar_Nav .Item .Text{
    display: none;
    font-size: 2rem;
    color: #FFF;
    padding-left: 1rem;
}






</style>