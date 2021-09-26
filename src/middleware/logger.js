export default function logger(store) {
    return function (next) {
        return function (action) {
            const result = next(action)
            return result
        }
    }
}