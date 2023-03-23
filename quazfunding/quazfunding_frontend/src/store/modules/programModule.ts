import { alertNormalizer } from "../../modules/alert";
import { createCampaign, donate, getCampaigns, withdraw } from "../../modules/program";

const programModule = {

    namespaced: true,

    state: () => ({
        loading: false,
        campaign: null,
        campaigns: null,
    }),

    mutations: {
        SET_LOADING(state: any, payload: boolean) {
            state.loading = payload;
        },
        SET_CAMPAIGN(state: any, payload: any) {
            state.campaign = payload;
        },
        SET_CAMPAIGNS(state: any, payload: any) {
            state.campaigns = payload;
        }
    },

    actions: {
        async createCampaign({ commit }: { commit: any }, dataCampaign: CampaignDataCreation) {
            commit('SET_LOADING', true)
            const campaign = await createCampaign(dataCampaign.name, dataCampaign.dscpt)
            if (typeof (campaign) != 'string') alertNormalizer({ type: 3, title: 'Error', message: campaign.message })
            else commit('SET_CAMPAIGN', campaign)
            commit('SET_LOADING', false)
        },

        async setCampaigns({ commit }: { commit: any }) {
            commit('SET_LOADING', true)
            const campaigns = await getCampaigns()
            if (campaigns.length == 0 || !campaigns) alertNormalizer({ type: 3, title: 'Error', message: 'Cannot load campaigns 🥲' })
            else commit('SET_CAMPAIGNS', campaigns)
            commit('SET_LOADING', false)
        },

        async donateCampaign({ commit, dispatch }: { commit: any, dispatch: any }, pubkey_cpg: any) {
            commit('SET_LOADING', true)
            await donate(pubkey_cpg, 6)
            dispatch('setCampaigns')
            commit('SET_LOADING', false)
        },
        
        async withdrawCampaign({ commit, dispatch }: { commit: any, dispatch: any }, pubkey_cpg: any) {
            commit('SET_LOADING', true)
            await withdraw(pubkey_cpg, 6)
            dispatch('setCampaigns')
            commit('SET_LOADING', false)
        }
    }

}

export default programModule

interface CampaignDataCreation {
    name: string;
    dscpt: string
}