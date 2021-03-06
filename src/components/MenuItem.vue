<template>

    <div>
    <q-item>
        <q-item-section avatar>
            <q-icon size="md" :name="'img:' + icon" />
        </q-item-section>
        <q-item-section class="layer-name">{{layerName}}</q-item-section>
        <q-item-section side>
            <q-toggle v-model="selected" @input="changeValue"></q-toggle>
        </q-item-section>
    </q-item>
    <q-separator inset="" />
    </div>
</template>

<script>
    import AxiosWrapper from "../data/AxiosWrapper";
    import {Vector as VectorSource} from "ol/source";
    import {Vector as VectorLayer} from "ol/layer";
    import Point from "ol/geom/Point";
    import Feature from "ol/Feature";
    import {transform} from 'ol/proj';
    import Style from "ol/style/Style";
    import Icon from "ol/style/Icon";
    import Cluster from "ol/source/Cluster";
    import CircleStyle from "ol/style/Circle";
    import Stroke from "ol/style/Stroke";
    import Fill from "ol/style/Fill";
    import Text from "ol/style/Text";
    export default {
        name: "MenuItem",
        props: {
            guid: {
                type: String,
                required: true
            }
        },
        data() {
          return {
              icon: '',
              layerName: '',
              selected: false,
              layer: null,
              mapLayer: null,
              loaded: false
          };
        },
        async created() {
            const axios = new AxiosWrapper();
            let response = null;
            await axios.getLayer(this.$props.guid).then(function (_response) {
                response = _response;
            });
            this.layer = response;
            this.icon = response.data.styleHash.default[0].iconUrl;
            this.layerName = response.data.name;
            this.layer.data.icon = this.icon;
            this.$store.dispatch('ADD_LAYER', this.layer.data);
        },
        methods: {
            changeValue() {

                if (this.selected) {
                    this.show();
                } else {
                    this.hide();
                }
            },
            show() {
                let self = this;
                if (!this.loaded) {
                    const axios = new AxiosWrapper();
                    let response = null;
                    axios.getLayerFeatures(this.$props.guid).then(function (_response) {
                        response = _response;
                        let features = [];
                        response.data.forEach(function (feature) {
                            let newFeature = new Feature({
                                geometry: new Point(transform(feature.geometry.coordinates, 'EPSG:4326', 'EPSG:3857')),
                                name: feature.id,
                                guid: feature.id,
                                layerGuid: self.$props.guid
                            });
                            features.push(
                                newFeature
                            );
                        });

                        let source = new VectorSource({
                            features: features
                        });
                        let cluster = new Cluster({
                            source: source,
                            distance: 50
                        });
                        let layer = new VectorLayer({
                            source: cluster,
                            style: function (feature) {
                                let size = feature.get('features').length;
                                if (size > 1) {
                                    return new Style({
                                        image: new CircleStyle({
                                            radius: 15,
                                            stroke: new Stroke({
                                                color: '#4d19cc',
                                                width: 3
                                            }),
                                            fill: new Fill({
                                                color: '#fff'
                                            })
                                        }),
                                        text: new Text({
                                            text: size.toString(),
                                            fill: new Fill({
                                                color: '#4d19cc'
                                            }),
                                            font: 'bold 18px  Times New Roman serif',
                                            offsetY: 2
                                        })
                                    });
                                } else {
                                    return new Style({
                                        image: new Icon({
                                            crossOrigin: 'anonymous',
                                            src: self.icon,
                                            scale: 0.5
                                        })
                                    });
                                }
                            }
                        });

                        self.$store.getters.map.addLayer(layer);
                        self.mapLayer = layer;
                    });
                    this.loaded = true;
                } else {
                    this.mapLayer.setVisible(true);
                }
            },
            hide() {
                this.mapLayer.setVisible(false);
            }
        }
    }
</script>

<style scoped>
    .layer-name {
        font-size: 1.2em;
    }
</style>
