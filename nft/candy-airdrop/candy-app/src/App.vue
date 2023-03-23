<template>
  <div>
    <div class="w-screen h-screen flex flex-col gap-10 overflow-hidden bg-neutral-900">
      <div class="w-full h-full flex justify-center">
        <div class="w-2/4 h-[95%] flex flex-col items-center gap-5">
          <TopBar class="w-full" />
          <Connect class="w-full" />
          <router-view class="w-full h-full bg-black bg-opacity-50 p-4 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './components/TopBar.vue';
import Connect from './components/Connect.vue'
export default {
  components: { TopBar, Connect }
}
</script>
