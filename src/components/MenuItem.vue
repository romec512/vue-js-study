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
              layer: null
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
        },
        methods: {
            changeValue() {
                //ToDo: сделать отображение и скрытие объектов на карте
                // let response = null;
                const axios = new AxiosWrapper();
                var self = this;
                axios.getLayerFeatures(this.$props.guid).then(function () {
                    // response = _response;
                    window.console.log(self.$root.find('#map'));
                });
            }
        }
    }
</script>

<style scoped>
    .layer-name {
        font-size: 1.2em;
    }
</style>
