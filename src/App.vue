<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  mounted () {
    this.$store.state.code = localStorage.getItem('token')
    this.$store.state.name =  localStorage.getItem('name')
    this.$store.state.typeId = localStorage.getItem('typeId')
    this.$store.state.type = localStorage.getItem('type')
    this.$store.state.userId = localStorage.getItem('userId')
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    },
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
