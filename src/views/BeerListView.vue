<template>
  <div class="beer">
    <img alt="Vue logo" src="../assets/logo.png">
    <BeerList></BeerList>
  </div>
</template>

<script>
import BeerList from '@/components/BeerList.vue'

export default {
  name: 'Home',
  components: {
    BeerList
  }
}
</script>