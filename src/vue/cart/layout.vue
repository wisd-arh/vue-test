<template lang="pug">
    .cart-wrapper
        .cart-title Корзина

        .cart
            .cart-header
                .column Наименование товара и описание
                .column Количество
                .column Цена
                .column
            .cart-item
                .cart-item__title Алгоритмы. Построение и анализ. Т. Кормен, Ч. Лейзерсон, Р. Ривест, К. Штайн.
                .cart-item__count
                    .cart-item__count-input
                        input
                        span шт.
                    .cart-item__count-attention Количество ограничено
                .cart-item__price
                    .cart-item__price-price 943.87 руб.
                    span / шт.
                .cart-item__remove
                    a.cart-item__remove-button Удалить

            .cart-item
                .cart-item__title Алгоритмы. Построение и анализ. Т. Кормен, Ч. Лейзерсон, Р. Ривест, К. Штайн.
                .cart-item__count
                    .cart-item__count-input
                        input
                        span шт.
                    .cart-item__count-attention Количество ограничено
                .cart-item__price
                    .cart-item__price-price 943.87 руб.
                    span / шт.
                .cart-item__remove
                    a.cart-item__remove-button Удалить

            .cart-item
                .cart-item__title Алгоритмы. Построение и анализ. Т. Кормен, Ч. Лейзерсон, Р. Ривест, К. Штайн.
                .cart-item__count
                    .cart-item__count-input
                        input
                        span шт.
                    .cart-item__count-attention Количество ограничено
                .cart-item__price
                    .cart-item__price-price 943.87 руб.
                    span / шт.
                .cart-item__remove
                    a.cart-item__remove-button Удалить
        .cart-total
            span Общая стоимость
            .cart-total__total 98998 руб.
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

.cart {
    display: flex;
    flex-direction: column;

    &-title {
        margin-bottom: 20px;
        margin-top: 40px;
        font-size: 14px;
        font-weight: bold;
    }

    &-header {
        display: grid;
        grid-template-columns: 4fr 1fr 3fr 1fr;
        border-bottom: 1px solid #eeeeee;
        
        .column {
            color: #999c9f;
            font-size: 12px;
            padding: 10px;
        }
    }

    &-item {
        display: grid;
        grid-template-columns: 4fr 1fr 3fr 1fr;
        font-size: 12px;

        &__title {
            padding-top: 15px;
        }

        &__count {
            display: flex;
            flex-direction: column;

            &-input {
                margin-top: 15px;
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                > input {
                    width: 40px;
                    height: 25px;
                    border: 1 px solid #cccccc;
                }
                > span {
                    margin-left: 5px;
                    font-size: 10px;
                    color: #9f9f9f;
                }
            }

            &-attention {
                background-color: #fffaf2;
                color: #ff6680;
                border: 1px dotted #ff6680;
                font-size: 10px;
                padding: 7px 5px;
            }
        }

        &__price {
            display: flex;
            padding: 15px 0;
            &-price {
                font-weight: bold;
                font-size: 14px;
                min-width: 100px;
                line-height: 25px;
                padding-left: 15px;
            }
            > span {
                font-size: 10px;
                line-height: 25px;
            }
        }

        &__remove {
            padding-top: 15px;
            > a {
                text-decoration: none;
            }

            > a:hover {
                text-decoration: underline;
            }
        }
    }    

    &-total {
        display: flex;
        justify-content: flex-end;
        padding: 15px;
        align-items: center;
        > span {
            font-size: 10px;
            color: #9f9f9f;
            margin-right: 15px;
        }

        &__total {
            font-weight: bold;
            font-size: 14px;
            min-width: 100px;
            line-height: 25px;
            color: #ff6680;
        }
    }
}
</style>