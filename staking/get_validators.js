const { Connection, clusterApiUrl } = require("@solana/web3.js")

const main = async () => {
    const conn = new Connection(clusterApiUrl("devnet"), "processed")
    const { current, delinquent } = await conn.getVoteAccounts()
    console.log(current)
    console.log(delinquent)
}

const run = async () => {
    try {
        await main()
    } catch (error) {
        console.log(error)
    }
}

run()