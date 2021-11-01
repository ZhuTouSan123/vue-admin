<template>
  <div id="goodslist">
    <el-input
      placeholder="请输入搜索关键字,若多个用空格隔开"
      v-model.lazy="searchInp"
      class="input-with-select"
      @keyup.enter.native="searchGoods"
    >
      <el-button slot="prepend" @click="showAllGoods" type="primary"
        >显示全部</el-button
      >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchGoods"
      ></el-button>
    </el-input>
    <el-button type="primary" class="addgoodsBtn" @click="addGoods"
      >添加商品</el-button
    >
    <el-table
      :data="
        goodslist.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      ref="goodsTable"
      @filter-change="filterGoods"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column label="商品 ID" prop="id" width="100"> </el-table-column>
      <el-table-column label="商品图片" width="150">
        <template slot-scope="prop">
          <img :src="baseImgUrl + prop.row.img" alt="" width="90" height="90" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="400">
        <template slot-scope="prop">
          <el-input
            v-model="prop.row.title"
            v-if="isShow(prop.$index)"
            autocomplete="off"
          ></el-input>
          <p v-if="!isShow(prop.$index)">{{ prop.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="商品类型"
        prop="type"
        width="200"
        :filters="filters"
        column-key="type"
      ></el-table-column>
      <el-table-column label="品牌" prop="brand"></el-table-column>
      <el-table-column label="进价" prop="dprice"></el-table-column>
      <el-table-column label="零售价" prop="price" sortable>
        <template slot-scope="prop">
          <el-input
            v-model.number="prop.row.price"
            v-if="isShow(prop.$index)"
            autocomplete="off"
          ></el-input>
          <p v-if="!isShow(prop.$index)">{{ prop.row.price }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="$store.state.user.type < 2">
        <template slot-scope="scope">
          <el-button
            class="btnTop"
            type="primary"
            size="small"
            @click="setGood(scope.$index, scope.row)"
            v-if="!isShow(scope.$index)"
            >修改</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="deleteGood(scope.$index, scope.row)"
          >
            <el-button
              type="danger"
              size="small"
              v-if="!isShow(scope.$index)"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
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
    <div class="block" @click.once="checkIndex">
      <el-pagination
        :disabled="index !== -1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[1, 2, 3, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodslist.length"
      >
      </el-pagination>
    </div>
    <InsertGoods
      :goodslist.sync="goodslist"
      :dialogFormVisible.sync="dialogFormVisible"
    ></InsertGoods>
  </div>
</template>

<script>
import InsertGoods from "./InsertGoods";
import { mapState } from "vuex";
export default {
  name: "Goodslist",
  components: { InsertGoods },
  data() {
    return {
      goodslist: [],
      index: -1,
      oldGood: null,
      pageSize: 4,
      currentPage: 1,
      searchInp: "",
      arr: [],
      dialogFormVisible: false,
      types: [],
      filters:[]
    };
  },
  computed: {
    ...mapState(["baseImgUrl"]),
  },
  methods: {
    getTypes() {
      this.axios
        .get("/productAPI/selectGoodsBrand.php?req=type")
        .then((res) => {
          this.types = res.data;
          this.types.forEach((el) => {
            let o = { text: el.type, value: el.type };
            this.filters.push(o);
          });
        });
    },
    getGoods() {
      this.axios.get("/productAPI/goods.php").then((res) => {
        this.goodslist = res.data;
        this.arr = [...this.goodslist];
      });
    },
    deleteGood(index, row) {
      this.axios({
        method: "post",
        url: "/productAPI/deleteGood.php",
        params: { id: row.id },
      }).then((res) => {
        if (res.data) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.axios.get("/productAPI/goods.php").then((res) => {
            this.goodslist = res.data;
            this.arr = [...this.goodslist];
          });
        } else {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        }
      });
    },
    setGood(index, row) {
      if (this.index == -1) this.index = index;
      this.oldGood = [row.title, row.price];
    },
    isShow(index) {
      return index === this.index ? 1 : 0;
    },
    confirmThis(index, row) {
      this.index = -1;
      this.axios({
        method: "post",
        url: "/productAPI/updateGood.php",
        params: {
          id: row.id,
          title: row.title,
          price: row.price,
        },
      }).then((res) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
    },
    cancelThis(index, row) {
      row.title = this.oldGood[0];
      row.price = this.oldGood[1];
      this.index = -1;
    },
    handleSizeChange(i) {
      this.pageSize = i;
    },
    handleCurrentChange(i) {
      this.currentPage = i;
    },
    checkIndex() {
      if (this.index !== -1) {
        this.$message({
          message: "当前页面还有操作未完成",
          type: "warning",
        });
      }
    },
    filterGoods(filters) {
      if (filters.type.length > 0) {
        let list = [];
        filters.type.forEach((t) => {
          list = [...list.concat(this.arr.filter((good) => good.type == t))];
        });
        this.goodslist = [...list];
      } else {
        this.goodslist = [...this.arr];
      }
    },
    searchGoods() {
      let req = this.searchInp.split(" ");
      req = req.map((el) => (el = `%${el}%`)).join("");
      this.axios({
        method: "post",
        url: "/productAPI/selectGoods.php",
        params: {
          req: req,
        },
      }).then((res) => {
        this.goodslist = res.data;
        this.arr = [...this.goodslist];
        this.searchInp = "";
      });
    },
    showAllGoods() {
      this.axios.get("/productAPI/goods.php").then((res) => {
        this.goodslist = res.data;
      });
    },
    addGoods() {
      this.dialogFormVisible = true;
    },
  },
  async mounted() {
    await this.getGoods();
    await this.getTypes();
  },
};
</script>

<style lang="less" scoped>
.el-button {
  margin: 0;
}
.btnTop {
  margin-bottom: 5px;
}
::v-deep .el-input-group__prepend {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.input-with-select {
  width: 50%;
}
.addgoodsBtn {
  margin-left: 300px;
}
</style>
