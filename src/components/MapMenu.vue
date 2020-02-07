<template>
    <div id="map-menu">
        <div id="header">
            <q-input
                    v-model="search"
                    borderless
                    placeholder="Поиск ..."
                    :input-style="{fontSize: '1.3em'}"
            >
                <template v-slot:append>
                    <q-icon name="search" />
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
        data() {
            return {
                test: [
                    {id: 1, name: 'test1'},
                    {id: 2, name: 'test2'}
                ],
                search: ''
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
