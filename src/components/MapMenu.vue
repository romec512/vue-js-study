<template>
    <div id="map-menu">
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
        <CollapsibleList
        :list=test
        >

        </CollapsibleList>
    </div>
</template>

<script>
    import CollapsibleList from "./CollapsibleList";
    export default {
        name: "MapMenu",
        components: {CollapsibleList},
        created() {
            //ToDo: добавить запрос на получение всех слоев
        },
        data() {
            return {
                test: [
                    {id: 1, name: 'test1'},
                    {id: 2, name: 'test2'}
                ],
                search: ''
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
    }
    #header {
        margin-left: 20px;
        margin-right: 15px;
    }
</style>
