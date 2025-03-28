import emptyJson from "../data/empty.json"

export const useJsonValidation = () => {
    const validate = (jsonData) => {
        const result = {}
        const keys = Object.keys(emptyJson)
        keys.map(item => {
            result[item] = jsonData[item] || emptyJson[item]
        })
        return result
    }

    return validate
}