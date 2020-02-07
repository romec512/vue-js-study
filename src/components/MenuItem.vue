<template>
    <div id="menu-item">
        <q-icon size="md"  :name="'img:' + icon"></q-icon>
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
          };
        },
        async created() {
            const axios = new AxiosWrapper();
            let icon = null;
            await axios.request('http://geo.tatar.ru/api/layers/' + this.props.guid, 'get', {headers: {'X-App': '51d5e291a5f80482', 'Content-Type': 'application/json'}}).then(function (response) {
                icon = response.data.styleHash.default[0].iconUrl;
            });
            this.icon = icon;
            window.console.log(this.icon);
        }
    }
</script>

<style scoped>

</style>
