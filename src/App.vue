<template>
  <div id="app">
    <!-- <el-row :gutter="20">
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20"
        ><div class="grid-content bg-purple">
          <el-container>
            <el-header>
              <TopBar></TopBar>
            </el-header>
            <el-main>
              <el-row>
                <el-col :span="12"
                  ><div class="grid-content bg-purple">
                    <Code></Code></div
                ></el-col>
                <el-col :span="12"
                  ><div class="grid-content bg-purple-light">
                    <Profile></Profile></div
                ></el-col>
              </el-row>
            </el-main>
          </el-container></div
      ></el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row> -->

    <TopBar></TopBar>
    <router-view></router-view>
    
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import Container from "./components/MainContainer.vue";


export default {
  name: "app",
  components: {
    TopBar,
    // Container

  },
};
</script>

<style scoped lang = 'less'>

</style>
