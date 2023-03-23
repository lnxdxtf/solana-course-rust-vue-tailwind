<template>
    <div>
        <div class="w-full grid grid-cols-1 gap-3 p-3 bg-3 bg-opacity-30 rounded-md">
            <div v-for="cpg in $campaigns" :key="cpg.name"
                class="w-full flex justify-around text-white bg-black bg-opacity-40 p-3 rounded-md gap-3">
                <span class="truncate w-2/6 flex items-center justify-center">{{ cpg.name }}</span>
                <span class="truncate w-2/6 flex items-center justify-center">{{ cpg.description }}</span>
                <span class="truncate w-2/6 flex items-center justify-center">{{ cpg.pubkey }}</span>
                <span class="truncate w-2/6 flex items-center justify-center">{{ cpg.admin }}</span>
                <span class="truncate w-2/6 flex items-center justify-center">{{ cpg.amountDonated / $lamports }}SOL</span>
                <span class="w-2/6 items-center text-center font-bold bg-4 cursor-pointer hover:bg-opacity-50 rounded-md"
                    @click="$donateCampaign(cpg.pubkey)">DONATE</span>
                <span class="w-2/6 items-center text-center font-bold bg-4 cursor-pointer hover:bg-opacity-50 rounded-md"
                    @click="$withdrawCampaign(cpg.pubkey)">WITHDRAW</span>
            </div>
        </div>
    </div>
</template>
<script>
import { web3 } from '@project-serum/anchor';
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('programModule', {
            $campaigns: 'campaigns'
        }),
        $lamports() {
            return web3.LAMPORTS_PER_SOL
        }
    },

    methods: {
        ...mapActions('programModule', {
            $donateCampaign: 'donateCampaign',
            $withdrawCampaign: 'withdrawCampaign'
        })
    }
}
</script>
