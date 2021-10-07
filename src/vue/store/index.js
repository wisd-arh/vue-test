import Vue from "vue"
import Vuex from "vuex"
import catalog from "./modules/catalog/index"
import cart from "./modules/cart/index"
import db from "./modules/db/index"

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        catalog,
        cart,
        db,
    },
})

export default store