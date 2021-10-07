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
    }
}