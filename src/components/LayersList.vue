<!--suppress HtmlDeprecatedTag -->
<template>
    <div id="layers-list">
        <div :key="guid" v-for="guid in layers">
            <MenuItem :guid="guid" />
        </div>
    </div>
</template>

<script>
    import layers from '../config/layers';
    import MenuItem from "./MenuItem";
    export default {
        name: "LayersList",
        components: {MenuItem},
        created() {
            //ToDo: добавить запрос на получение всех слоев
            this.layers = layers;
        },
        data() {
            return {
                icon: '',
                layers: []
            }
        },
    }
</script>

<style scoped>

</style>
