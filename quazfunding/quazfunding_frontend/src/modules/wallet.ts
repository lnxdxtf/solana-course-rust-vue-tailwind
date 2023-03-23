
export const connectWallet = async () => {
    let response = null
    try {
        const { solana } = window
        if (solana && solana.isPhantom) response = (await solana.connect({ onlyIfTrusted: import.meta.env.DEV ? false : true })).publicKey.toString()
    } catch (err: any) {
        console.log(err)
        response = err
    }
    return response
}

