<template>
  <v-app>

    <SideBar @changeSite="changeSite" v-if="0"/>

    <v-main>
      <Weather v-if="this.activeSite === 0"/>
      <Power v-if="this.activeSite === 1" />
      <Lights v-if="this.activeSite === 2" />    
    </v-main>
  
    <NavBarMobile @changeSite="changeSite" />
  </v-app>
</template>

<script>
import SideBar  from './components/SideBar'
import NavBarMobile from './components/NavBarMobile'
import Weather  from './components/Weatherstation'
import Power    from './components/Power'
import Lights   from './components/Ligths'


export default {
  name: 'App',
  components: {
    SideBar,
    NavBarMobile,
    Weather,
    Power,
    Lights
  },
  methods: {
    changeSite(site){
      console.log("Emitted data : " + site)
      this.activeSite = site
    }
  },
  mounted(){
    //this.$mqtt.subscribe('#')
  },
  mqtt:{
    //'#'(data){
      //console.log(data);
    //}
  },
  data(){
    return{
      activeSite: 0
    }
  }

}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html{
    overflow: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: none;
  }

  html::-webkit-scrollbar{
    width: 0;
    height: 0;

  }

@media only screen and (min-width: 600px){
  .ContentPage{
    left: 7rem;
    height: 100vh;
    width: 100%;
  }

}

@media only screen and (max-width: 600px){
  .ContentPage{
    width: 100vw;

  }
}


.ContentPage{
  position: fixed;
  z-index: -1;
  top: 0px;
  text-align: center;
  background: white;
}

</style>
