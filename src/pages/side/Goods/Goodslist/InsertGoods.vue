<template>
  <el-dialog
    title="添加商品"
    :visible="dialogFormVisible"
    top="0"
    @close="closeDialog"
  >
    <el-form :model="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="商品类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option v-for="t in insertTypes" :key="t" :value="t">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌" :label-width="formLabelWidth">
        <el-select v-model="form.brand" placeholder="请选择">
          <el-option v-for="b in brands" :key="b.brand" :value="b.brand">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进价" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.dprice" autocomplete="off" style='width:100px'></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        零售价<el-input v-model="form.price" autocomplete="off" style='width:100px'></el-input>
      </el-form-item>
      <el-form-item label='商品图片' :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          drag
          :on-success='handleSuccess'
          action="http://121.40.159.226:6001/api/upload.php"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">图片命名型号，例如:igame3060.jpg</div></div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleInsert" :disabled="isDisabled">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "InsertGoods",
  props: ["dialogFormVisible"],
  data() {
    return {
      form: {},
      formLabelWidth: "120px",
      brands: [],
      isDisabled:false,
      isUpload:false,
      insertTypes:['RTX2060','RTX2060SUPER','RTX2070','RTX2070SUPER','RTX2080','RTX2080SUPER','RTX3060','RTX3060Ti','RTX3070','RTX3070Ti','RTX3080','RTX3080Ti','RTX3090','TiTan RTX']
    };
  },
  methods: {
    closeDialog(){
      this.$emit("update:dialogFormVisible", false);
    },
    async getBrands() {
      await this.axios
        .get("/productAPI/selectGoodsBrand.php?req=brand")
        .then((res) => {
          this.brands = res.data;
        });
    },
    handleSuccess(response,file){
      this.form.img = file.name
    },
    handleCancel(){
      this.axios({
        method:'post',
        url:'/deleteImg.php',
        params:{
          fileName:this.form.img
        },
      }).then(res=>{
        this.form = {};
      })
      this.$emit("update:dialogFormVisible", false);
    },
    async handleInsert(){
      await this.axios({
        method:'post',
        url:'/productAPI/insertGood.php',
        params:this.form
      }).then(res=>{
        if(res.data == '添加成功'){
          this.$message({
            showClose: true,
            message: res.data,
            type: "success",  
          });
          this.$emit("update:dialogFormVisible", false);
          this.axios({
            method:'get',
            url:'/productAPI/goods.php',
          }).then(res=>{
            this.$emit('update:goodslist',res.data);
          })
        }else{
          this.$message({
            showClose: true,
            message: res.data,
            type: "error",
          })
        }
      })
    }
  },
  mounted() {
    this.getBrands();
  },
};
</script>

<style></style>
