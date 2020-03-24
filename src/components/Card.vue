<template>
    <div class="card">
        <div @click="close" class="close-button">Закрыть <q-icon name="close"></q-icon></div>
        <div class="attributes">
            <div class="name">
                {{obj.fields[0].value}}
            </div>
            <div>
                {{obj.fields[1].value}}
            </div>
            <!-- ToDo: обусловились на том, что сначала смотрим на внешнее имя атрибута, если их нет,
                то отрисовываем по порядку. Изображения ищем проходом по массиву.
             -->

        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            obj: {
                type: Object,
                required: true
            }
        },
        methods: {
            close() {
                this.$store.getters.select.getFeatures().clear();
                this.$store.dispatch('UNSET_OBJECT');
            }
        }
    }
</script>

<style scoped>
    .card {
        position: absolute;
        z-index: 2;
        width: 100%;
        margin-left: 15px;
        border-radius: 3px;
        background-color: white;
        border: 1px solid #efefef
    }
    .close-button {
        cursor: pointer;
        font-size: 1.3em;
        margin-right: 10px;
        text-align: right;
        margin-top: 10px;
    }
    .attributes {
        text-align: left;
        margin: 5px 0 0 15px;
        font-size: 1.2em;
    }
    .name {
        font-size: 2.0em;
        color: #4b9aef;
    }
</style>
