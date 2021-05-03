<template>
  <div>
      page2
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
        cart:""
    }
  },
  computed: {
    ...mapGetters ([
      "cartProducts"
      ])
  },
  mounted() {
    console.log(111)
      console.log(this.$store.state.cart);
      console.log(this.$store.state.isNav);
  }, 
}
</script>
<style>
</style>