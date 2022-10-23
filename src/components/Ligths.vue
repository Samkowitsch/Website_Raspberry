<template>
  <!-- <div class="ContentPage">
        <div class="ColorWheel">
            <color-picker v-model="color" @input="onInput"> </color-picker>
        </div>

        <div>
            <button title="Button" @click="OnOff">
                {{this.LightOnOff}}
            </button>
        </div>
  </div> -->

    <v-card
    light
    tile
    flat
    height="100%"
    class="d-flex justify-center pa-2">
        <v-card
        width="95%">
            <v-card-title>
                Lights
                <v-spacer>

                </v-spacer>
                <v-btn @click="OnOff">{{this.LightOnOff}}</v-btn>
            </v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Brightness
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-slider
                            min="40"
                            max="255"
                            v-model="Brightness"
                            >
                            </v-slider> 
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Preset
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row dense>
                                    <v-col><v-btn block color="#F44336" @click="hexColor('F4433600')"></v-btn></v-col>
                                    <v-col><v-btn block color="#E91E63" @click="hexColor('E91E6300')"></v-btn></v-col>
                                    <v-col><v-btn block color="#9C27B0" @click="hexColor('9C27B000')"></v-btn></v-col>
                                    <v-col><v-btn block color="#673AB7" @click="hexColor('673AB700')"></v-btn></v-col>
                                    <v-col><v-btn block color="#3F51B5" @click="hexColor('3F51B500')"></v-btn></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col><v-btn block color="#2196F3" @click="hexColor('2196F300')"></v-btn></v-col>
                                    <v-col><v-btn block color="#03A9F4" @click="hexColor('03A9F400')"></v-btn></v-col>
                                    <v-col><v-btn block color="#00BCD4" @click="hexColor('00BCD400')"></v-btn></v-col>
                                    <v-col><v-btn block color="#009688" @click="hexColor('00968800')"></v-btn></v-col>
                                    <v-col><v-btn block color="#4CAF50" @click="hexColor('4CAF5000')"></v-btn></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col><v-btn block color="#8BC34A" @click="hexColor('8BC34A00')"></v-btn></v-col>
                                    <v-col><v-btn block color="#CDDC39" @click="hexColor('CDDC3900')"></v-btn></v-col>
                                    <v-col><v-btn block color="#FFEB3B" @click="hexColor('FFEB3B00')"></v-btn></v-col>
                                    <v-col><v-btn block color="#FFC107" @click="hexColor('FFC10700')"></v-btn></v-col>
                                    <v-col><v-btn block color="#FF9800" @click="hexColor('FF980000')"></v-btn></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col><v-btn block color="#FF5722" @click="hexColor('FF572200')"></v-btn></v-col>
                                    <v-col><v-btn block color="#795548" @click="hexColor('79554800')"></v-btn></v-col>
                                    <v-col><v-btn block color="#607D8B" @click="hexColor('607D8B00')"></v-btn></v-col>
                                    <v-col><v-btn block color="#FDF4DC" @click="hexColor('FDF4DC01')"></v-btn></v-col>
                                    <v-col><v-btn block color="#A3E1D4" @click="hexColor('A3E1D400')"></v-btn></v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Color Picker
                        </v-expansion-panel-header>
                        <v-expansion-panel-content
                        class="pa-0">
                            <div class="ColorWheel">
                                <color-picker v-model="color" @input="onInput"> </color-picker>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Mode
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-btn width="100%" @click="setMode('4')">RGB</v-btn> 
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>

    </v-card>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'

export default {
    name: 'Lights',
    components:{
        ColorPicker
    },
    mounted(){
        this.$mqtt.subscribe('Kummer/Lights/#')
    },
    mqtt:{
        'Kummer/Lights/Brightness'(data){
            if(this.recievedBrightness == 0){            
                this.Brightness = data
                this.recievedBrightness = 1
            }
        },
        'Kummer/Lights/Mode'(data){
            //var mode = parseInt(data)
            this.Led_Mode = data
            if(this.Led_Mode > 0)
                this.LightOnOff = 'On'
        },
        'Kummer/Lights/Prev_Mode'(data){
            //var mode = parseInt(data)
            this.Prev_Led_Mode = data
        }
    },
    watch:{
        Brightness: function(){
            this.$mqtt.publish('Kummer/Lights/Brightness', this.Brightness.toString() , {retain:true})
        }
    },
    methods: {
        setBrightness(){

            this.$mqtt.publish('Kummer/Lights/Brightness', this.Brightness.toString() , {retain:true})
        },
        setMode(mode){
            this.Prev_Led_Mode = this.Led_Mode;
            this.Led_Mode = mode;
            console.log("Set Mode : " + mode)
            this.$mqtt.publish('Kummer/Lights/Mode', mode.toString() , {retain:true})

            if(this.Prev_Led_Mode != this.Led_Mode){
                this.$mqtt.publish('Kummer/Lights/Prev_Mode', this.Prev_Led_Mode.toString() , {retain:true})
            }
        },
        hexColor(hex){
            console.log("Set Hex Color")
            this.setMode(1)
            this.$mqtt.publish('Kummer/Lights/RGBW_HEX', hex.toString() , {retain:true})
        },
        onInput(hue){
            //console.log("hue : " + hue)
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

            this.setMode(1)
            this.$mqtt.publish('Kummer/Lights/RGBW_HEX', r+g+b+0+0 ,{retain:true})
        },
        OnOff(){
            if(this.LightOnOff =="On"){
                this.LightOnOff = 'Off'
                this.setMode(0)
            }else{
                this.LightOnOff = 'On'
                this.setMode(this.Prev_Led_Mode)
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
            Prev_Led_Mode: 0,
            Brightness: 0,
            recievedBrightness: 0

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