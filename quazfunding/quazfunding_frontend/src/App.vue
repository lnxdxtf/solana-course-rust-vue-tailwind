<template>
  <div>
    <div class="w-screen h-screen flex justify-center p-4">
      <div class="w-3/4 h-full flex flex-col items-center gap-10">
        <TopBar />
        <div class="w-full h-full flex justify-center gap-5">
          <router-view class="w-3/4 h-full rounded-md bg-black bg-opacity-30 p-4" />
        </div>
      </div>
    </div>
    <ConnectWalletModal />
  </div>
</template>
<script>
import TopBar from './components/TopBar.vue';
import ConnectWalletModal from './components/ConnectWalletModal.vue';
export default {
  components: { TopBar, ConnectWalletModal }
}
</script>
