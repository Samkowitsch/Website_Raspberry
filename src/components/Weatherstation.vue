<template>
    <div>
        Weather App
        <div>
            {{this.Temp}} °C
        </div>
        <div>
            {{this.Pres}} Bar
        </div>
        <div>
            {{this.Hum}} %
        </div>
    </div>
</template>

<script>
export default {
    name: 'Weatherstation',
    mounted() {
        this.$mqtt.subscribe('WetterStat_2/#')
    },
    mqtt:{
        'WetterStat_2/Values'(data){
            var obj = JSON.parse(data)
            this.Temp = obj.Temp
            this.Hum  = obj.Hum
            this.Pres = obj.Pres

        }
    },
    data() {
        return {
            Temp: 0,
            Hum: 0,
            Pres: 0,
        }
    },
}
</script>

<style>

</style>