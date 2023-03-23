<template>
    <div>
        <div class="w-full flex flex-col gap-5 bg-2 bg-opacity-30 rounded-md p-4">

            <div class="w-full grid grid-cols-1 gap-3">
                <span class="text-xl text-white">Create Your Campaign</span>
                <input type="text" v-model="cpg.name"
                    class="w-full rounded-md bg-black bg-opacity-30 outline-none border-none p-1 h-8 text-white text-opacity-75"
                    placeholder="Campaign Name">
                <textarea cols="30" rows="10" v-model="cpg.dscpt"
                    class="w-full rounded-md bg-black bg-opacity-30 outline-none border-none p-1 h-12 max-h-28 text-white text-opacity-75"
                    placeholder="Campaign Description"></textarea>
            </div>

            <div class="w-full">
                <div v-if="!$loading" @click="$createCampaign(cpg)"
                    class="w-full p-2 flex justify-center items-center cursor-pointer rounded-md bg-3 hover:bg-opacity-30 text-white font-bold">
                    <span>Create Campaign</span>
                </div>
                <div v-else
                    class="w-full p-2 flex justify-center items-center cursor-not-allowed rounded-md bg-3 hover:bg-opacity-30 text-white font-bold">
                    <i class="fa-solid fa-cloud-showers-heavy fa-fade"></i>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            cpg: {
                name: '',
                dscpt: ''
            }
        }
    },
    computed: {
        ...mapState('programModule', {
            $loading: 'loading',
            $campaign: 'campaign'
        })
    },
    methods: {
        ...mapActions('programModule', {
            $createCampaign: 'createCampaign'
        })
    }
}
</script>
