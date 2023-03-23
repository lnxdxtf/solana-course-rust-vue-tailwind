<template>
    <div>
        <div class="w-full h-full flex justify-end gap-2 px-2">
            <div v-if="$connected && $address" class="w-full flex p-2 rounded-md items-center text-neutral-300">
                {{ $address }}
            </div>
            <div v-if="!$connected & !$loading" @click="$connectWalletACTION"
                class="w-1/4 flex gap-2 p-2 rounded-md bg-teal-400 items-center justify-center font-bold text-neutral-900 hover:hue-rotate-30 cursor-pointer">
                <img src="/imgs/phantom-ghost-white.png" class="h-5"> CONNNECT
            </div>
            <div v-if="$loading" 
                class="w-1/4 flex p-2 rounded-md bg-neutral-600 items-center justify-center font-bold text-white hover:hue-rotate-30 cursor-pointer">
                <i class="fa-brands fa-connectdevelop fa-spin"></i>
            </div>
            <div v-if="$connected & !$loading" @click="$disconnectWalletACTION"
                class="w-1/4 flex p-2 rounded-md bg-red-400 items-center justify-center font-bold text-white hover:hue-rotate-30 cursor-pointer">
                DISCONNECT
            </div>


        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('wallet', {
            $connected: 'connected',
            $address: 'address',
            $loading: 'loading'
        })
    },
    methods: {
        ...mapActions('wallet', {
            $connectWalletACTION: 'connectWalletACTION',
            $disconnectWalletACTION: 'disconnectWalletACTION'
        })
    }
}
</script>
