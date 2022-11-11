<template>
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple"><Code :showMask="showMask"></Code></div></el-col>
    <el-col :span="12"
      ><div class="grid-content bg-purple-light"><Profile :changeMask="changeMask"></Profile></div
    ></el-col>
  </el-row>
</template>

<script>
import Code from "./CodePart.vue";
import Profile from "./ProfilePart.vue";
export default {
  data() {
    return {
      showMask:false
    }
  },
  components: {
    Code,
    Profile,
  },
  methods:{
    changeMask(val){
      this.showMask = val === '1'?true:false;
    }
  }
};
</script>

<style lang='less' scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>