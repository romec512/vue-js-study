<template>
    <div class="card">
        <div @click="close" class="close-button">Закрыть <q-icon name="close"></q-icon></div>
        <div class="attributes">
            <div class="name" v-if="name">
                {{name}}
            </div>
            <div v-if="address">
                {{address}}
            </div>
            <!-- ToDo: обусловились на том, что сначала смотрим на внешнее имя атрибута, если их нет,
                то отрисовываем по порядку. Изображения ищем проходом по массиву.
             -->

        </div>
    </div>
</template>

<script>
    import config from '../config/config';
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
        },
        data() {
            return {
                name: null,
                address: null,
                photos: []
            };
        },
        mounted: function () {
            let self = this;
            this.$props.obj.fields.forEach(function (item) {
                if (item.options.extname) {
                    switch(item.options.extname)
                    {
                        case 'name': self.name = item.rawValue; break;
                        case 'address': self.address = item.rawValue; break;
                    }
                }
                if (item.datatype === 'file') {
                    item.rawValue.forEach(function (rawValue) {
                        if (rawValue.mime.match(/^image.+/)) {
                            self.photos.push(config.baseUrl + '/uploads/storage/' + rawValue.mainpath);
                        }
                    })
                }
            });
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
