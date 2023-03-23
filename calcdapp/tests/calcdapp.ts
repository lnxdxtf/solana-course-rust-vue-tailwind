import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { assert } from "chai"
import { Calcdapp } from "../target/types/calcdapp"

describe("calcdapp", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider)

    const program = anchor.workspace.Calcdapp as Program<Calcdapp>
    const calculator = anchor.web3.Keypair.generate()

    // Each IT is a test

    it("Is initialized! 🚀🤌", async () => {
        // Add your test here.
        const tx = await program.methods.create("welcome solana").accounts({
            calculator: calculator.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        }).signers([calculator]).rpc()
        console.log("Your transaction signature", tx)
    })
    // Nums used in test operations
    const num1 = 10; const num2 = 312

    it("Add Test", async () => {
        const result = num1 + num2
        await program.methods.add(new anchor.BN(num1), new anchor.BN(num2)).accounts({
            calculator: calculator.publicKey
        }).rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(result)))
    })

    it("Sub Test", async () => {
        const result = num1 - num2
        await program.methods.sub(new anchor.BN(num1), new anchor.BN(num2)).accounts({
            calculator: calculator.publicKey
        }).rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(result)))
    })

    it("Mult Test", async () => {
        const result = num1 * num2
        await program.methods.mult(new anchor.BN(num1), new anchor.BN(num2)).accounts({
            calculator: calculator.publicKey
        }).rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(result)))
    })

    it("Divide Test", async () => {
        const result = num1 / num2
        await program.methods.divide(new anchor.BN(num1), new anchor.BN(num2)).accounts({
            calculator: calculator.publicKey
        }).rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(Math.floor(result))))
    })

})

