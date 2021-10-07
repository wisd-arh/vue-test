export default {
    getDb(state) {
        return state.db
    },

    groupTitle(state) {
        return id => {
            if (state.db)
                if (state.db[id])
                    if (state.db[id].G)
                        return state.db[id].G
            return "Group undefined"
        }
    },
    itemTitle(state) {
        return (groupId, itemId) => {
            if (state.db)
                if (state.db[groupId])
                    if (state.db[groupId].B)
                        return state.db[groupId].B[itemId].N || "undefined item"  
            return "undefined item"
        }
    },

}