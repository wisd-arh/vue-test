import config from "../../../../js/lib/config"

export default {
    getData(state) {
        return state.data
    },
    getGoods(state) {
        return state.data ? state.data.Value.Goods : []
    },
    getGoodsByGroup(state) {
        if (state.data)
            return state.data.Value.Goods
                .reduce((acc, val, i) => {
                        if (!acc[val.G]) acc[val.G] = []
                        acc[val.G].push(val)
                        return acc
                    }, {});
        return {}    
    },

    itemLimit(state) {
        return (itemId) => {
            if (state.data)
                if (state.data.Value)
                    if (state.data.Value.Goods) {
                        let item = state.data.Value.Goods.find(el => el.T === itemId)
                        if (item) 
                            return (parseFloat(item.P) < config.limitCount)
                    }
            return false
        }
    },

    itemPrice(state) {
        return (itemId) => {
            if (state.data)
                if (state.data.Value)
                    if (state.data.Value.Goods) {
                        let item = state.data.Value.Goods.find(el => el.T === itemId)
                        if (item) 
                            return parseFloat(item.C)
                    }
            return 0
        }
    },
}