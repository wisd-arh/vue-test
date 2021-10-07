<template lang="pug">
    .wrapper
        table.table(v-if="goods")
            tr(v-for="item, index in goods" :key="index")
                td {{ item.C }}
                td {{ groupTitle(item.G) }}
                td {{ item.T }}
                td {{ itemTitle(item.G, item.T) }}
                td ({{ item.P }})
        br
        table.table(v-if="goods")
            tr(v-for="group, index in catalogGroups" :key="index")
                td {{ groupTitle(group[0]) }}
                div(v-for="item in group[1]" :key="index+'/'+item.T" ) {{ itemTitle(group[0], item.T) }}


</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'App',
    data() {
        return {
        }
    },
    methods: {
        ...mapActions("db", ["loadDb"]),
        ...mapActions("catalog", ["loadGoods"]),
        async load() {
        }
    },
    computed: {
        ...mapGetters("catalog", { goods: "getGoods", goodsByGroup: "getGoodsByGroup" }),
        ...mapGetters("db", { db: "getDb" }),
        groupTitle() {
            return id => {
                if (this.db)
                    if (this.db[id])
                        if (this.db[id].G)
                            return this.db[id].G
                return "Group undefined"
            }
        },
        itemTitle() {
            return (groupId, itemId) => {
                if (this.db)
                    if (this.db[groupId])
                        if (this.db[groupId].B)
                            return this.db[groupId].B[itemId].N || "undefined item"  
                return "undefined item"
            }
        },
        catalogGroups() {
            return Object.entries(this.goodsByGroup)
        }
    },
    async created() {
        await this.loadDb()
        await this.loadGoods()
    },
}
</script>

<style lang="scss" scoped>
    .table {
        td {
            padding: 5px 10px;
        }
    }
</style>