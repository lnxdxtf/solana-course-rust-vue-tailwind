const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction, PublicKey } = require("@solana/web3.js")

const conn = new Connection(clusterApiUrl("devnet"), "processed")


const balance = async (address_pubkey) => await conn.getBalance(address_pubkey)

const airdrop = async (address_pubkey, amount) => {
    console.log(`Balance before airdrop (of ${amount}) : ${await balance(address_pubkey) / LAMPORTS_PER_SOL}`)
    const airdropSignature = await conn.requestAirdrop(address_pubkey, amount * LAMPORTS_PER_SOL)
    await conn.confirmTransaction(airdropSignature)
    console.log(`Balance after airdrop (of ${amount}) : ${await balance(address_pubkey) / LAMPORTS_PER_SOL}`)
}

const createAccountWithStakeAccount = async (amount) => {
    const account = Keypair.generate()
    const stakeAccount = Keypair.generate()
    await airdrop(account.publicKey, amount)
    setTimeout(async () => {
        await airdrop(account.publicKey, amount)
        await configAccountToStake(account, stakeAccount, amount)
        await delegateStake(account, stakeAccount)
        await deactivateStake(account, stakeAccount)
        await withdrawStake(account, stakeAccount)
    }, 10000);
}

const configAccountToStake = async (account, stakeAccount, amount) => {
    const minimunRentSol = await conn.getMinimumBalanceForRentExemption(StakeProgram.space)
    const amountUserStake = minimunRentSol + (amount * LAMPORTS_PER_SOL)
    const configStakeAccountTX = StakeProgram.createAccount({
        authorized: new Authorized(account.publicKey, account.publicKey),
        fromPubkey: account.publicKey,
        lamports: amountUserStake,
        lockup: new Lockup(0, 0, account.publicKey),
        stakePubkey: stakeAccount.publicKey
    })
    const configStakeAccountTX_ID = await sendAndConfirmTransaction(conn, configStakeAccountTX, [account, stakeAccount])
    console.log(`Stake Account TX ID: ${configStakeAccountTX_ID}`)
    console.log(`Stake Balance: ${await balance(stakeAccount.publicKey) / LAMPORTS_PER_SOL}`)
    console.log(`Stake Status: ${await (await stakeStatus(stakeAccount.publicKey)).state}`)
}

const stakeStatus = async (address_pubkey) => await conn.getStakeActivation(address_pubkey)

const delegateStake = async (account, stakeAccount) => {
    const validators = await conn.getVoteAccounts()
    const selectedValidator = validators.current[0]
    const selectedValidatorPubKey = new PublicKey(selectedValidator.votePubkey)
    const delegateTX = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: account.publicKey,
        votePubkey: selectedValidatorPubKey,
    })
    const delegateTX_ID = await sendAndConfirmTransaction(conn, delegateTX, [account])
    console.log(`Stake account(${stakeAccount.publicKey}) delegatated to ${selectedValidatorPubKey}, TX: ${delegateTX_ID}`)
    console.log(`Stake Status: ${await (await stakeStatus(stakeAccount.publicKey)).state}`)
    await getDelegatorsByValidator()
}

const getDelegatorsByValidator = async () => {
    const STAKE_PROGRAM_ID = new PublicKey("Stake11111111111111111111111111111111111111")
    const VOTE_PUBKEY = "vgcDar2pryHvMgPkKaZfh8pQy4BJxv7SpwUG7zinWjG"
    const accounts = await conn.getParsedProgramAccounts(STAKE_PROGRAM_ID, {
        filters: [
            { dataSize: 200 },
            {
                memcmp: {
                    offset: 124,
                    bytes: VOTE_PUBKEY
                }
            }
        ]
    })
    console.log(`Total of delegators for ${VOTE_PUBKEY}:\n ${accounts.length}`)
    if (accounts) console.log(`Example Delegator: ${JSON.stringify(accounts[0])}`)
}

const deactivateStake = async (account, stakeAccount) => {
    const deactiveTX = StakeProgram.deactivate({ stakePubkey: stakeAccount.publicKey, authorizedPubkey: account.publicKey })
    const deactiveTX_ID = await sendAndConfirmTransaction(conn, deactiveTX, [account])
    console.log(`Deactive StakeAccount ${stakeAccount.publicKey} | TX ${deactiveTX_ID}`)
    console.log(await stakeStatus(stakeAccount.publicKey).state)
}

const withdrawStake = async (account, stakeAccount) => {
    /// after send and confirm transaction, this balance will be older
    const balance_data = await balance(stakeAccount.publicKey)
    const withdrawTX = StakeProgram.withdraw({ stakePubkey: stakeAccount.publicKey, authorizedPubkey: account.publicKey, toPubkey: account.publicKey, lamports: balance_data })
    const withdrawTX_ID = await sendAndConfirmTransaction(conn, withdrawTX, [account])
    console.log(`Withdraw of ${balance_data / LAMPORTS_PER_SOL} StakeAccount ${stakeAccount.publicKey} | TX ${withdrawTX_ID}`)
}

const run = async () => {
    try {
        await createAccountWithStakeAccount(2)

    } catch (error) {
        console.log(error)
    }
}

run()