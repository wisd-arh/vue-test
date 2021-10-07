<template lang="pug">
    .catalog-wrapper
        .table(v-if="goods")
            .group-container(v-for="group, index in catalogGroups" :key="index")
                .group-title
                    .group-title__icon(@click="toggleGroup(group[0])")
                        svg(:class="{ hidden: isHidden(group[0])}")
                            use(href="icons/icons.svg#arrow-down")
                    .group-title__title {{ groupTitle(group[0]) }}
                .items(v-show="!isHidden(group[0])")
                    .item-container(
                        v-for="item in group[1]" 
                        :key="index+'/'+item.T" 
                        :class="{ 'price-down': priceDown(item.T), 'price-up': priceUp(item.T) }"
                    ) 
                        .item-title(
                            @click="appendItem({ groupId: group[0], itemId: item.T })"                            
                        ) {{ itemTitle(group[0], item.T)+'('+item.P+')' }}
                        .item-price {{ price(item.C) }}
        .course
            .course-title Курс USD
            input(
                type="number"
                min="20"
                max="80"
                v-model="course"
            )
        .last-update {{ 'Обновлено: ' + lastUpdate }}
        cart
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import cart from "./cart/layout.vue"

export default {
    name: 'App',
    components: { cart },
    data() {
        return {
            hiddenGroups: [],
            course: 20,
            lastUpdate: '',
            prices: {},
        }
    },
    methods: {
        ...mapActions("db", ["loadDb"]),
        ...mapActions("catalog", ["loadGoods"]),
        ...mapActions("cart", ["appendItem"]),
        async startTimer() {
            setInterval(async () => {
                await this.loadGoods()
                this.checkPrices()
                this.lastUpdate = new Date();
            }, 15000)
        },
        toggleGroup(id) {
            if (this.hiddenGroups.includes(id)) {
                this.hiddenGroups = this.hiddenGroups.filter(el => {
                    return el !== id
                })
            } else {
                this.hiddenGroups.push(id)
            }
        },
        checkPrices() {
            this.goods.forEach(item => {
                if (!this.prices[item.T]) this.prices[item.T] = {newPrice: 0, oldPrice: 0}
                this.prices[item.T].oldPrice = this.prices[item.T].newPrice
                this.prices[item.T].newPrice = item.C * this.course
            });
        },
    },
    computed: {
        ...mapGetters("catalog", { goods: "getGoods", goodsByGroup: "getGoodsByGroup" }),
        ...mapGetters("db", ["groupTitle", "itemTitle"]),
        catalogGroups() {
            return Object.entries(this.goodsByGroup)
        },
        isHidden() {
            return id => {
                return this.hiddenGroups.includes(id)
            }
        },
        price() {
            return usd =>  {
                return (usd*this.course).toFixed(2)
            }
        },
        priceDown() {
            return id => {
                return this.prices[id] ? this.prices[id].newPrice < this.prices[id].oldPrice : false
            }
        },
        priceUp() {
            return id => {
                return this.prices[id] ? this.prices[id].newPrice > this.prices[id].oldPrice : false
            }
        },
    },
    async created() {
        await this.loadDb()
        await this.loadGoods()
        this.checkPrices() // init
        this.checkPrices() // remember inital state
        this.lastUpdate = new Date();
        this.startTimer()
    },
}
</script>

<style lang="scss" scoped>

</style>