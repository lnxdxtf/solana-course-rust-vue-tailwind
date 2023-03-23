# Instructions:

## Setting solana local: 
``` 
    solana config set --url localhost
    solana config get 
``` 

## Setting program ID:
``` solana program deploy <PATH-TO-TARGET-DEPLOY-FILE-EXTENSION-.SO> ```
get this hash id, and replace in programs/<-your-program-name->/src/lib.rs
and replace the id inside in declare_id("xxxx") with your new hash id

## Testing:
- Other window:
``` solana-test-validator ```
- Test:
``` anchor test --skip-local-validator ```  