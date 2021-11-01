<template>
  <el-table :data="stocklist" style="width: 100%">
    <el-table-column type="index" label="序号"> </el-table-column>
    <el-table-column label="商品 ID" prop="id" width="100"> </el-table-column>
    <el-table-column label="商品图片" width="150">
      <template slot-scope="prop">
        <img :src="baseImgUrl + prop.row.img" alt="" width="90" height="90" />
      </template>
    </el-table-column>
    <el-table-column label="商品名称" width="400" prop="title">
    </el-table-column>
    <el-table-column label="商品类型" prop="type" width="200"></el-table-column>
    <el-table-column label="品牌" prop="brand"></el-table-column>
    <el-table-column label="库存" prop="stock" sortable>
      <template slot-scope="prop">
        <el-input
          v-model.number="prop.row.stock"
          v-if="isShow(prop.$index)"
          autocomplete="off"
        ></el-input>
        <p v-if="!isShow(prop.$index)">{{ prop.row.stock }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="$store.state.user.type < 2">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="setStock(scope.$index, scope.row)"
          v-if="!isShow(scope.$index)"
          >修改库存</el-button
        >
        <el-button
          class="btnTop"
          type="primary"
          v-if="isShow(scope.$index)"
          size="mini"
          @click="confirmThis(scope.$index, scope.row)"
          >确认修改</el-button
        >
        <el-button
          type="danger"
          v-if="isShow(scope.$index)"
          size="mini"
          @click="cancelThis(scope.$index, scope.row)"
          >取消修改</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Stocklist",
  data() {
    return {
      index: -1,
      oldStock: null,
      stocklist: [],
    };
  },
  computed: {
    ...mapState(["baseImgUrl"]),
  },
  methods: {
    getStocklist() {
      this.axios.get("/productAPI/goods.php").then((res) => {
        this.stocklist = res.data;
      });
    },
    setStock(index, row) {
      if (this.index == -1) this.index = index;
      this.oldStock = row.stock;
    },
    isShow(index) {
      return index === this.index ? 1 : 0;
    },
    confirmThis(index, row) {
      this.index = -1;
      this.axios({
        method: "post",
        url: "/productAPI/updateStock.php",
        params: {
          id: row.id,
          stock: row.stock,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: res.data,
          type: res.data == "操作成功" ? "success" : "error",
        });
      });
    },
    cancelThis(index, row) {
      this.index = -1;
      row.stock = this.oldStock;
    },
  },
  mounted() {
    this.getStocklist();
  },
};
</script>

<style lang='less' scoped>
.el-button {
  margin: 0;
}
.btnTop {
  margin-bottom: 5px;
}
</style>
