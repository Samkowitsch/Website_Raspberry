import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueMqtt from 'vue-mqtt'



Vue.config.productionTip = false

// var broker = 'ws://192.168.178.59:3001'
// var mqttOptions={
//    username: 'Mosquitto',
//    password: '-Sam!993+',
//    clientId: 'Mqtt_Website'
// }
//Vue.use(VueMqtt , broker, mqttOptions)

var broker = 'ws://192.168.178.45:3001'

Vue.use(VueMqtt , broker)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
