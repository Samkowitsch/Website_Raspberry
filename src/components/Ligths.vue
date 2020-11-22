<template>
  <div class="ContentPage">
        <div class="ColorWheel">
            <color-picker v-model="color" @input="onInput"> </color-picker>
        </div>

        <div>
            <button title="Button" @click="OnOff">
                {{this.LightOnOff}}
            </button>
        </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'

export default {
    name: 'Lights',
    components:{
        ColorPicker
    },
    mounted(){
        this.$mqtt.subscribe('Kummer/Licht/#')
    },
    mqtt:{
        'Kummer/Licht/Ir/Mode'(data){
            //var mode = parseInt(data)
            this.Led_Mode = data
            if(this.Led_Mode > 0)
                this.LightOnOff = 'On'
        },
        'Kummer/Licht/Ir/Prev_Mode'(data){
            //var mode = parseInt(data)
            this.Prev_Led_Mode = data
        }
    },
    methods: {
        onInput(hue){
            console.log("hue : " + hue)
            var h = hue
            var s = 100 / 100
            var l = 50/ 100

            var c = (1 - Math.abs(2 * l - 1)) * s
            var x = c * (1 - Math.abs((h / 60) % 2 - 1))
            var m = l - c/2
            var r = 0
            var g = 0
            var b = 0
    
            //console.log('C :' + h)

            if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
            }
            r = Math.round((r + m) * 255).toString(16).padStart(2,0);
            g = Math.round((g + m) * 255).toString(16).padStart(2,0);
            b = Math.round((b + m) * 255).toString(16).padStart(2,0);

            //console.log('Red :' + r + ' Green :' + g + ' Blue :' + b)
            //console.log('Hex : ' + r+g+b+0+0)


            this.$mqtt.publish('Kummer/Licht/Website/RGBW_HEX', r+g+b+0+0)
        },
        OnOff(){
            if(this.LightOnOff =="On"){
                this.LightOnOff = 'Off'
                this.$mqtt.publish('Kummer/Licht/Ir/Mode',0 , true)
            }else{
                this.LightOnOff = 'On'
                this.$mqtt.publish('Kummer/Licht/Ir/Mode',this.Prev_Led_Mode , true)
            }
        }
    },
    data() {
        return {
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
            },
            LightOnOff: 'Off',
            Led_Mode: 0,
            Prev_Led_Mode: 0

        };
    },

}
</script>

<style scoped>
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

.rcp{
    transform: scale(1.00);
}

.ColorWheel{
    position: relative;
    margin: auto;
    text-align: center;
    width: 282px;

}
</style>