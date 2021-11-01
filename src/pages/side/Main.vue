<template>
  <div id="main">
    <el-row>
      <el-col :span="6" v-for="c in card" :key="c.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="c.imgurl" class="image">
          <div style="padding: 14px; text-align: center; font-size: 20px;">
            <span>{{c.title}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <img src="https://dlcdnwebimgs.asus.com.cn/gain/07B097A3-E9C2-4AFF-9196-3ADE8F5BCEA1" alt="" class="image" height="200">
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      card:[
        {id:'001',imgurl:'http://121.40.159.226:6001/cardImg/ROG3090.png',title:'华硕'},
        {id:'002',imgurl:'http://121.40.159.226:6001/cardImg/DUYAOAIRCOOLED6900XT.jpg',title:'蓝宝石'},
        {id:'003',imgurl:'http://121.40.159.226:6001/cardImg/SUPRIMX3090.jpg',title:'微星'}
      ],
    };
  }
};
</script>

<style lang='less' scoped>
#main{
  .el-row{
    display: flex;
    justify-content: space-around;
    .el-card{
      cursor: pointer;
    }
  }
.time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";  
  }
  .clearfix:after {
      clear: both
  }
}
</style>
