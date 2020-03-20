<template>
    <div id="map-menu">
        <div v-show="object" class="card">
            <h1>карточка объекта</h1>
        </div>
        <div id="header">
            <q-input
                    v-model="search"
                    borderless
                    placeholder="Поиск ..."
                    :input-style="{fontSize: '1.3em'}"
                    @change="onChange"
            >
                <template v-slot:append>
                    <q-icon name="search" @click="onChange"/>
                </template>
            </q-input>
        </div>
        <CollapsibleList>
            <LayersList></LayersList>
        </CollapsibleList>
    </div>

</template>

<script>
    import CollapsibleList from "./CollapsibleList";
    import LayersList from "./LayersList";
    export default {
        name: "MapMenu",
        components: {LayersList, CollapsibleList},
        data() {
            return {
                search: '',
            }
        },
        computed: {
          object: function () {
            return this.$store.getters.object;
          }
        },
        methods: {
            onChange() {
                //ToDo: Сделать запрос на фильтрацию слоев
            }
        }
    }
</script>

<style scoped>
    #map-menu {
        position: absolute;
        background: #e4ecfa;
        z-index: 1;
        width: 30%;
        margin-top: 5px;
        margin-left: 5px;
        border-radius: 3px;
        border: 1px solid #efefef
    }
    #header {
        margin-left: 20px;
        margin-right: 15px;
    }
    .card {
        position: absolute;
        z-index: 2;
        width: 100%;
        margin-left: 15px;
        border-radius: 3px;
        background-color: white;
        border: 1px solid #efefef
    }
</style>
