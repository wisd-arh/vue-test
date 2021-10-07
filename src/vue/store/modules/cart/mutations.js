export default {
    setItems(state, value) {
        state.items = value
    },
    addItem(state, value) {
        state.items.push(value)
    }
}