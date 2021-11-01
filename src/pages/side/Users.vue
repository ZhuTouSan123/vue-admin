<template>
  <div id="users">
    <el-input
      placeholder="请输入用户姓名"
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
    <el-button type="primary" @click="exportExcel">点击导出excel</el-button>
    <el-table
      :data="users.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      border
      id="userTable"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="id" label="身份证"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="ip" label="IP"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="users.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "User",
  data() {
    return {
      users: [],
      currentPage: 1,
      pageSize: 10,
      searchInp: "",
      arr: [],
    };
  },
  methods: {
    getUsers() {
      this.axios({
        method: "post",
        url:
          "http://121.40.159.226:7300/mock/617157de5e1e7941050f5e32/admin/users",
      }).then((res) => {
        this.users = res.data.users;
        this.arr = [...this.users];
      });
    },
    handleSizeChange(i) {
      this.pageSize = i;
    },
    handleCurrentChange(i) {
      this.currentPage = i;
    },
    searchGoods() {
      this.users = [...this.arr];
      this.users = this.users.filter((el) => el.name == this.searchInp);
      this.searchInp = "";
    },
    showAllGoods() {
      this.users = [...this.arr];
    },
    exportExcel(){
      var wb = XLSX.utils.table_to_book(document.querySelector("#userTable"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
        });
        try {
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "users.xlsx"
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
    }
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang='less' scoped>
.input-with-select{
  width: 60%;
  margin-right: 100px;
}
</style>
