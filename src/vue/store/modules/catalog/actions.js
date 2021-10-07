import config from "../../../../js/lib/config"

export default {
    async loadGoods(context) {
        try {
            let response = await fetch(config.goodsFileName)
            if (response.ok) {
                let result = await response.json()
                context.commit("setData", result)
            } else throw "Network error"
        } catch (e) {
            alert("Файл данных поврежден или недоступен.")
            console.log(e.message)
        }
    }
}