<template>
    <div id="map-menu">
        <card v-if="object" :obj="object"></card>
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
        <div class="line">
            &nbsp;
        </div>
        <CollapsibleList>
            <LayersList></LayersList>
        </CollapsibleList>
    </div>

</template>

<script>
    import CollapsibleList from "./CollapsibleList";
    import LayersList from "./LayersList";
    import Card from "./Card";

    export default {
        name: "MapMenu",
        components: {Card, LayersList, CollapsibleList},
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
        background: #ffffff;
        z-index: 1;
        width: 30%;
        margin-top: 5px;
        margin-left: 5px;
        border-radius: 3px;
        border: 1px solid #efefef;
        box-shadow: 4px 3px 10px 0 rgba(0, 0, 0, 0.5);
    }

    #header {
        margin-left: 20px;
        margin-right: 15px;
    }

    .line {
        background-color: rgba(0, 0, 0, 0.12);
        height: 1px;
    }
</style>
