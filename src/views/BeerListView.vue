<template>
  <div class="beer">
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