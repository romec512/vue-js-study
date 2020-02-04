<!--suppress ES6CheckImport -->
<template>
<div id="map">

</div>
</template>

<script>
    import 'ol/ol.css';
    import {Map, View} from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';

    export default {
        name: 'map',
        beforeCreate: function() {
            this.map = undefined;
        },
        mounted: function () {
            this.map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    center: [51, 51],
                    zoom: 4
                }),
                controls: []
            });
        }
    }
</script>
<style scoped>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
