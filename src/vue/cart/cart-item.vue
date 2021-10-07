<template lang="pug">
    .cart-item
        .cart-item__title {{ groupTitle(item.groupId) + '. ' + itemTitle(item.groupId, item.itemId) }}
        .cart-item__count
            .cart-item__count-input
                input(
                    type="number" 
                    min="1"
                    v-model="localCount"
                )
                span шт.
            .cart-item__count-attention Количество ограничено
        .cart-item__price
            .cart-item__price-price 943.87 руб.
            span / шт.
        .cart-item__remove
            a.cart-item__remove-button Удалить
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CartItem',
    props: ["item"],
    computed: {
        ...mapGetters("db", ["groupTitle", "itemTitle"]),
        localCount: {
            get() {
                return this.item.count
            },
            set(value) {
                if (value > 0)
                    this.updateItemCount({ ...this.item, newCount: value })
            }
        }

    },
    methods: {
        ...mapActions("cart", ["updateItemCount"]),
    }
}
</script>