<template>
  <el-aside width="auto" :style="{background:$store.state.baseColor[0].aside}">
    <Asidelist :is-collapse="isCollapse"></Asidelist>
    <div class="mygithub">
      <a href="https://github.com/ZhuTouSan123/vue-admin.git">
        <img src="../../../assets/img/GitHub_Logo_White.png" alt="" :width="width" />
        <img src="../../../assets/img/GitHub-Mark-Light-64px.png" alt="" width="60"/>
      </a>
    </div>
  </el-aside>
</template>

<script>
import Asidelist from "./Asidelist/Asidelist";
export default {
  name: "Aside",
  components: { Asidelist },
  props: ["isCollapse"],
  computed: {
    width() {
      if (this.isCollapse) {
        return "0px";
      } else {
        return "120px";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  .mygithub {
    position: fixed;
    bottom: 0;
    a {
      display: block;
      display: flex;
      img{
        transition: width 0.3s;
      }
    }
  }
}
</style>
