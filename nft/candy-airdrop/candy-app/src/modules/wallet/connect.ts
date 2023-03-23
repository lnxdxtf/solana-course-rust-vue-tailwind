export const connect = async () => {
    let response = null
    try {
        const { solana } = window
        if (solana && solana.isPhantom) {
            response = (await solana.connect({ onlyIfTrusted: import.meta.env.DEV ? false : true })).publicKey.toString()
            localStorage.setItem("connected", "true")
        }
    } catch (err: any) {
        console.log(err)
        response = err
    }
    return response
}

export const check = () => {
    try {
        const connected = localStorage.getItem("connected") == "true"
        if (connected) return true
        else return false
    } catch (err) {
        console.log(err)
        return false
    }
}

export const disconnect = () => {
    const { solana } = window
    localStorage.setItem("connected", "false")
    solana.disconnect()
}