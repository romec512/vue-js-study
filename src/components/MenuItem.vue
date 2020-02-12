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
              selected: false
          };
        },
        async created() {
            const axios = new AxiosWrapper();
            let response = null;
            await axios.request('http://geo.tatar.ru/api/layers/' + this.$props.guid, 'get', {headers: {'X-App': '51d5e291a5f80482', 'Content-Type': 'application/json'}}).then(function (_response) {
                response = _response;
            });
            this.icon = response.data.styleHash.default[0].iconUrl;
            this.layerName = response.data.name;
            window.console.log(response);
        },
        methods: {
            changeValue() {
                //ToDo: сделать отображение и скрытие объектов на карте
            }
        }
    }
</script>

<style scoped>
    .layer-name {
        font-size: 1.2em;
    }
</style>
