<template>
  <div id="system">
    <h2>主题切换</h2>
    <el-button type="danger" @click="changeTheme">红配绿</el-button>
  </div>
</template>

<script>
export default {
name:'System',
methods: {
  changeTheme(){
    this.$store.commit('changeColor')
  }
},
}
</script>

<style>

</style>