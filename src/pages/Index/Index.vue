<template>
  <el-container id="index">
    <el-header height="50px">
      <Header></Header>
    </el-header>
    <el-container class="index-bottom">
      <Aside :isCollapse="isCollapse"></Aside>
      <el-main>
        <div class="navbar">
          <div class="navbar-left">
            <div class="foldbox" @click="fold">
              <i class="el-icon-s-unfold" v-show="isIShow"></i>
              <i class="el-icon-s-fold" v-show="!isIShow"></i>
            </div>
            <el-breadcrumb
              separator="/"
              :separator-class="breadClass"
              ref="breadcrumb"
            >
              <el-breadcrumb-item :to="{ path: '/index' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item v-for="(b, index) in bread" :key="index">{{
                b
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Aside from "./Aside/Aside";
import Header from "./Header/Header";
export default {
  name: "Index",
  components: { Aside, Header },
  data() {
    return {
      isIShow: false,
      isCollapse: false,
      breadClass: "",
      bread: [],
    };
  },
  watch: {
    $route() {
      this.getBread();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    fold() {
      this.isCollapse = !this.isCollapse;
      this.isIShow = !this.isIShow;
    },
    getBreadClass() {
      return this.$refs.breadcrumb.$children.length > 1
        ? ""
        : "separator-class";
    },
    getBread() {
      if (this.$route.name !== "zhuneirong") {
        this.bread = this.$route.name.split("/");
      } else {
        this.bread = [];
      }
    },
  },
  created() {
    this.getBread();
  },
  mounted() {
    this.getBreadClass();
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("vuex")) {
      next();
    } else {
      next("/home");
    }
  },
};
</script>

<style lang="less">
#index {
  height: 100%;
  .el-header {
    padding: 0;
  }
  .index-bottom {
    height: 100%;
    .el-main {
      padding: 0;
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navbar-left {
          display: flex;
          align-items: center;
          .foldbox {
            padding: 10px;
            font-size: 24px;
            cursor: pointer;
            &:hover {
              background: rgba(0, 0, 0, 0.05);
            }
          }
          .el-breadcrumb {
            padding-left: 15px;
          }
        }
        .navbar-right {
          padding: 10px;
        }
      }
    }
  }
}
.separator-class {
  display: none;
}
</style>
