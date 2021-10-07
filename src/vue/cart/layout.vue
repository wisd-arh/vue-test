<template lang="pug">
    .cart-wrapper
        .cart-title Корзина

        .cart
            .cart-header
                .column Наименование товара и описание
                .column Количество
                .column Цена
                .column
            cart-item(v-for="item, index in items" :key="index", :item="item" :course="course")
        .cart-total
            span Общая стоимость:
            .cart-total__total {{ totalPrice }} руб.
</template>
<script>
import cartItem from "./cart-item.vue"
import { mapGetters } from 'vuex'

export default {
    name: 'Cart',
    components: { cartItem },
    props: ["course"], 
    computed: {
        ...mapGetters("cart", { items: "getItems" }),
        ...mapGetters("catalog", ["itemPrice"]),

        totalPrice() {
            return this.items.reduce((acc, item) => {
                acc = acc + item.count*this.itemPrice(item.itemId)*this.course
                return acc
            }, 0).toFixed(2)
        }
    }
}
</script>