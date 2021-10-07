import config from "../../../../js/lib/config"

export default {
    async loadDb(context) {
        try {
            let response = await fetch(config.dbFileName)
            if (response.ok) {
                let result = await response.json()
                context.commit("setDb", result)
            } else throw "Network error"
        } catch (e) {
            alert("Файл базы данных поврежден или недоступен.")
            console.log(e.message)
        }
    }
}