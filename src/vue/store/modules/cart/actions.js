export default {
    appendItem(context, newItem) {
        let items = context.state.items
        let item = items.find(item => {
            return ((item.groupId === newItem.groupId) && (item.itemId === newItem.itemId))
        })
        if (item) {
            alert("Товар уже в корзине")
        } else {
            context.commit("addItem", { ...newItem, count: 1})
            alert("Добавлен в корзину")
        }
    },

    updateItemCount(context, item) {
        let arr = context.state.items.map(el => {
            if ((el.groupId === item.groupId) && (el.itemId === item.itemId)) {
                el.count = item.newCount
            }
            return el
        })
        context.commit("setItems", arr)
    },

    removeItem(context, item) {
        let arr = context.state.items.filter(el => {
            return !((el.groupId === item.groupId) && (el.itemId === item.itemId))
        })
        context.commit("setItems", arr)
    }

}