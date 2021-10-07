import Vue from 'vue'
import layout from './layout.vue'
import store from './store'

export default class App{
    constructor(selector){
        new Vue({
            el: selector,
            store,
			render: h => h(layout),
        })
    }
}