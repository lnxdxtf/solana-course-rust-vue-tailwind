<template>
    <div class="w-full flex justify-around p-2 gap-5 font-bold text-white">
        <span class="text-2xl font-bold">QuazFunding</span>

        <div v-if="!$loading && !$connected" type="button" data-modal-target="connect-crypto-wallet-modal"
            data-modal-toggle="connect-crypto-wallet-modal"
            class="cursor-pointer w-[200px] flex justify-center items-center h-10 rounded-md bg-1 hover:brightness-125">
            Connect Wallet
        </div>
        <div v-if="$loading"
            class="cursor-not-allowed w-[200px] flex justify-center items-center h-10 rounded-md bg-1 hover:brightness-125">
            <i class="fa-solid fa-cloud-showers-heavy fa-fade"></i>
        </div>
        <div v-if="!$loading && $connected" @click="copyPubKey"
            class="w-[200px] cursor-pointer flex flex-col justify-center items-center h-10 text-sm rounded-md bg-1 hover:brightness-125">
            <span>Connected</span>
            <span class="w-3/4 truncate">{{ $wallet }}</span>
        </div>


    </div>
</template>
<script>
import Swal from 'sweetalert2';
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('walletModule', {
            $loading: 'loading',
            $connected: 'connected',
            $wallet: 'wallet'
        }),
    },
    methods: {
        async copyPubKey() {
            await navigator.clipboard.writeText(this.$wallet)
            Swal.fire({
                title: `<div class="w-full flex flex-col gap-1 items-center text-sm text-white"><span>COPIED</span><span>${this.$wallet}</span></div`,
                position: 'bottom',
                showConfirmButton: false,
                padding: 0,
                timer: 1500,
                customClass: {
                    title: 'bg-2',
                }
            })
        }
    }
}
</script>
