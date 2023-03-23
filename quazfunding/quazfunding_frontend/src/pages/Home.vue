<template>
    <div>
        <div class="w-full h-full flex flex-col gap-5">
            <div class="w-full flex gap-5 p-4">
                <CreateCampaign v-if="$connected" class="w-[300px]" />
                <div class="w-full text-white flex flex-col gap-5">
                    <span class="text-center font-bold">Donate SOL for anyone project from QuazFunding</span>
                    <span>
                        QuazFunding is a project to funding projects from Quazbet
                    </span>
                </div>
            </div>
            <Campaigns />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CreateCampaign from '../components/CreateCampaign.vue'
import Campaigns from '../components/Campaigns.vue'

export default {
    components: { CreateCampaign, Campaigns },
    computed: {
        ...mapState('walletModule', {
            $connected: 'connected'
        })
    }
}
</script>
