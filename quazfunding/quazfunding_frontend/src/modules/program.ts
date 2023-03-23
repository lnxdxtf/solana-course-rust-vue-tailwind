import idl from "../idl.json"
import { Connection, PublicKey, clusterApiUrl, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, web3, utils, BN } from "@project-serum/anchor";
import { Buffer } from 'buffer'
import Swal from "sweetalert2";

window.Buffer = Buffer
// When Wallet is connected

const programID_SOLANA = new PublicKey(idl.metadata.address)

const { System } = web3

const network = clusterApiUrl("devnet")

const opts = { preflightCommitment: "processed" } // type Commitment = "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max

const getProvider_SOLANA = () => {
    const connection = new Connection(network, opts.preflightCommitment)
    const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment)
    return provider
}

// Functions to interact with the program

export const createCampaign = async (cpg_name: string, cpg_dscpt: string) => {
    let response = null
    try {
        const provider = getProvider_SOLANA()
        const program = new Program(idl, programID_SOLANA, provider)
        const [campaign] = await PublicKey.findProgramAddressSync([utils.bytes.utf8.encode("CAMPAIGN_DEMO"), provider.wallet.publicKey.toBuffer()], program.programId)
        await program.rpc.create(cpg_name, cpg_dscpt, {
            accounts: {
                campaign,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            }
        })
        response = campaign
    } catch (err: any) {
        console.log(err)
        response = err
    }
    return response
}

export const getCampaigns = async () => {
    const connection = new Connection(network, opts.preflightCommitment)
    const provider = getProvider_SOLANA()
    const program = new Program(idl, programID_SOLANA, provider)
    const campaigns = Promise.all((await connection.getProgramAccounts(programID_SOLANA)).map(
        async cpg => ({
            ...(await program.account.campaign.fetch(cpg.pubkey)),
            pubkey: cpg.pubkey,
        })
    )
    )
    return campaigns
}

export const donate = async (pubkey: string, amount: number) => {
    try {
        const provider = getProvider_SOLANA()
        const program = new Program(idl, programID_SOLANA, provider)

        await program.rpc.donate(new BN(amount * web3.LAMPORTS_PER_SOL), {
            accounts: {
                campaign: pubkey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            }
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export const withdraw = async (pubkey: string, amount: number) => {
    try {
        const provider = getProvider_SOLANA()
        const program = new Program(idl, programID_SOLANA, provider)

        await program.rpc.withdraw(new BN(amount * web3.LAMPORTS_PER_SOL), {
            accounts: {
                campaign: pubkey,
                user: provider.wallet.publicKey,
            }
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}