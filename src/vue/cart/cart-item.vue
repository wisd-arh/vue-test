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
            .cart-item__count-attention(
                v-show="itemLimit(item.itemId)"
            ) Количество ограничено
        .cart-item__price
            .cart-item__price-price {{ price }} руб.
            span / шт.
        .cart-item__remove
            a.cart-item__remove-button(@click.prevent="removeItem(item)") Удалить
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CartItem',
    props: ["item", "course"],
    computed: {
        ...mapGetters("db", ["groupTitle", "itemTitle"]),
        ...mapGetters("catalog", ["itemLimit", "itemPrice"]),
        localCount: {
            get() {
                return this.item.count
            },
            set(value) {
                if (value > 0)
                    this.updateItemCount({ ...this.item, newCount: value })
            }
        },
        price() {
            return (this.itemPrice(this.item.itemId)*this.course*this.localCount).toFixed(2)
        }
    },
    methods: {
        ...mapActions("cart", ["updateItemCount", "removeItem"]),
    }
}
</script>