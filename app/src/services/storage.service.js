
const TOKEN_KEY = "token"


const TokenService = {
    getToken() {
        return window.$cookies.get(TOKEN_KEY)
    },

    saveToken(accessToken) {
        window.$cookies.set(TOKEN_KEY, accessToken)
    },

    removeToken() {
        window.$cookies.remove(TOKEN_KEY)
    }
}

export { TokenService }
