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
    import {fromLonLat} from 'ol/proj';
    import Select from "ol/interaction/Select";
    import {click} from "ol/events/condition";
    import Style from "ol/style/Style";
    import Icon from "ol/style/Icon";
    import {createEmpty, extend, getCenter} from "ol/extent";

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
                    center: fromLonLat([49.133444, 55.780213]),
                    zoom: 10,
                }),
                controls: [],
            });
            let select = new Select({
                condition: click,
                style: function (feature) {
                    let values = feature.get('features')[0].values_;
                    let selectedIcon = self.$store.getters.layer(values.layerGuid).icon;
                    selectedIcon = selectedIcon.split(',');
                    //меняем цвет рамки
                    selectedIcon[1] = 'ff6d00';
                    if (selectedIcon.length > 3) {
                        //Если есть иконка, тогда меняем цвет иконки
                        selectedIcon[3] = 'ff6d00';
                    }
                    selectedIcon = selectedIcon.join(',');
                    return new Style({
                        image: new Icon({
                            crossOrigin: 'anonymous',
                            src: selectedIcon,
                            scale: 0.6
                        })
                    });
                }

            });
            let self = this;
            select.on('select', function (e) {
                if (e.deselected.length) {
                    self.$store.dispatch('UNSET_OBJECT');
                }
                if (e.selected.length && e.selected[0].values_.features.length > 1) {
                    let extent = createEmpty();
                    e.selected[0].values_.features.forEach(function (feature) {
                        extend(extent, feature.getGeometry().getExtent());
                    });
                    let resolution = self.$store.getters.map.getView().getResolutionForExtent(extent);
                    let zoom = self.$store.getters.map.getView().getZoomForResolution(resolution);
                    self.$store.getters.map.getView().animate({
                        center: getCenter(extent),
                        duration: 500
                    }, {
                        zoom: zoom - 2,
                        duration: 500
                    });
                } else if(e.selected.length) {
                    let guid = e.selected[0].values_.features[0].values_.guid;
                    let layerGuid = e.selected[0].values_.features[0].values_.layerGuid;
                    self.$store.dispatch('SET_OBJECT', {
                        layerGuid: layerGuid,
                        objectGuid: guid
                    });
                }
            });

            this.map.addInteraction(select);
            this.$store.dispatch('SET_MAP', this.map);
            this.$store.dispatch('SET_SELECT', select);
        }
    }
</script>
<style scoped>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
