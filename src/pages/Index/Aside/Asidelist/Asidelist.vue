<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="#fff"
    :background-color="$store.state.baseColor[0].aside"
    active-text-color="#ffd04b"
    :router="true"
  >
    <template v-for="(n, index) in navlist">
      <el-menu-item
        v-if="!n.type"
        :index="n.path"
        :disabled="isDisabled(n.title)"
      >
        <i :class="n.icon"></i>
        <span slot="title">{{ n.title }}</span>
      </el-menu-item>
      <el-submenu v-if="n.type" :index="n.path">
        <template slot="title">
          <i :class="n.icon"></i>
          <span slot="title">{{ n.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="c.path"
            v-for="(c, index) in n.children"
            :key="c.id"
            >{{ c.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Asidelist",
  props: ["isCollapse"],
  data() {
    return {
      navlist: [],
    };
  },
  methods: {
    getNavlist() {
      this.axios({
        method: "get",
        url:
          "http://121.40.159.226:7300/mock/617157de5e1e7941050f5e32/admin/navlist",
      }).then((res) => {
        this.navlist = res.data.data.navlist;
      });
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
    },
    isDisabled(title) {
      if (
        JSON.parse(sessionStorage.getItem("vuex")).user.type == 2 &&
        title === "员工管理"
      ) {
        return true;
      }
    },
  },
  created() {
    this.getNavlist();
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-menu-item-group__title {
  display: none;
}
.el-menu-item {
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  border: none;
}
</style>
