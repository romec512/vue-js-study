<template>
    <div id="collapsible-list">
        <transition name="slide">
            <div v-if="isVisible">
                <div :key="value.id" v-for="value in $props.list">
                    {{value.name}}
                </div>
            </div>
        </transition>
        <div id="collapsible-control" @click="this.toggle">
            <q-icon :name="isVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'">
            </q-icon>
            <div id="collapsible-control-label">
                {{isVisible ? 'Свернуть' : 'Развернуть'}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CollapsibleList",
        data() {
            return {
                isVisible: true,
            }
        },
        props: {
            list: {
                required: true,
                type: Array
            },
            component: {
                required: true
            }
        },
        methods: {
            toggle () {
                this.isVisible = !this.isVisible;
            }
        }

    }
</script>

<style scoped>
    #collapsible-control {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        padding: 5px 5px 10px 15px;
        align-items: center;
        font-size: 1.2em;
    }
    #collapsible-control-label {
        margin-left: 15px;
    }
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100vh;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>
