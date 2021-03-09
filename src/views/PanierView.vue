<template>
  <div class="beer">
    <Panier></Panier>
  </div>
</template>

<script>
import BeerList from '@/components/BeerList.vue'
import Panier from '@/components/Panier.vue'

export default {
  name: 'Home',
  components: {
    BeerList,
    Panier
  }
}
</script>