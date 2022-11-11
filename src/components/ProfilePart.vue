<template>
  <div>
    <el-collapse v-model="activeName" accordion @change="handleChange">
      <el-collapse-item title="修改 app/performance" name="1">
        <el-row class="demo-autocomplete">
          <el-col :span="12" :offset="3">
            <div
              class="sub-title"
              style="margin: 10px; width: 100px; fontsize: 20px"
            >
              app
            </div>
            <el-autocomplete
              style="width: 500px"
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
        <el-row class="demo-autocomplete">
          <el-col :span="12" :offset="3">
            <div
              class="sub-title"
              style="margin: 10px; width: 100px; fontsize: 20px"
            >
              performance
            </div>
            <el-autocomplete
              style="width: 500px"
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch2"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-col>
        </el-row>
        <div style="margin: 20px"></div>
        <!-- 添加部分start -->
        <!-- 提交表单的按钮 -->
        <el-row>
          <el-col :span="4" :offset="3"
            ><el-button @click="drawer = true" type="info"
              >新增</el-button
            ></el-col
          >
          <!-- 新增的按钮 -->
        </el-row>

        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
          <Edit></Edit>
        </el-drawer>
        <!-- 添加部分end-->
      </el-collapse-item>

      <el-collapse-item
        title="修改 traffic distribution/packet_format"
        name="2"
      >
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <div style="margin: 20px"></div>
          <el-form-item label="traffic distribution">
            <el-input v-model="formLabelAlign.input_traffic"></el-input>
          </el-form-item>
          <el-form-item label="packet_format">
            <el-input v-model="formLabelAlign.input_packet"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="概览——提交" name="3">
        <!-- 思路：上面负责选择，最后数据合并到这张form里，统合提交。 -->
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <div style="margin: 20px"></div>
          <el-form-item label="app">
            <el-input v-model="state1" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="performance">
            <el-input v-model="state2" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="traffic distribution">
            <el-input
              v-model="formLabelAlign.input_traffic"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="packet_format">
            <el-input
              v-model="formLabelAlign.input_packet"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              style="margin-left: 16px"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Edit from "@/components/EditPart.vue";

export default {
  data() {
    return {
      labelPosition: "top",
      activeName: "",
      formLabelAlign: {
        input_app: "",
        input_performance: "",
        input_traffic: "",
        input_packet: "",
      },
      drawer: false,
      // 控制抽屉的变量
      profileMsg: [],
      performanceMsg: [],
      state1: "",
      // app的值
      state2: "",
      // perform的值
    };
  },
  components: {
    Edit,
  },
  props: ["changeMask"],
  mounted() {
    // 先去session里找数据?那样就是异步了,然后.then?
    try {
      this.$store.dispatch("getMsg").then((res) => {
        if (res) {
          this.profileMsg = this.loadAll();
        }
      });
    } catch (error) {
      console.log("err");
    }
  },
  methods: {
    handleChange(val) {
      this.changeMask(val);
    },
    querySearch(queryString, cb) {
      // cb是elementui封装的api，将数据返回到el-autocomplete中，是querySearch函数的第二的参数
      var profileMsg = this.profileMsg;
      var results = queryString
        ? profileMsg.filter(this.createFilter(queryString))
        : profileMsg;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      var profileMsg = this.performanceMsg;
      var results = queryString
        ? profileMsg.filter(this.createFilter2(queryString))
        : profileMsg;
      // console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        if (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        ) {
          return item;
        }
      };
    },
    createFilter2(queryString) {
      return (item) => {
        if (
          item.performance.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        ) {
          return item;
        }
      };
    },
    loadAll() {
      // 以上来先请求数据
      return this.$store.state.profileMsg;
    },
    handleSelect(item) {
      // console.log(item);
      this.performanceMsg = item.performance;
      this.state2 = "";
    },
    onSubmit() {
      let obj = {};
      obj.app = this.state1;
      obj.performance = this.state2;
      obj.traffic = this.formLabelAlign.input_traffic;
      obj.packet = this.formLabelAlign.input_packet;
      let res = JSON.stringify(obj);
      if (
        !this.state1 ||
        !this.state2 ||
        !this.formLabelAlign.input_traffic ||
        !this.formLabelAlign.input_packet
      ) {
        alert("Incomplete data");
      }else{
        alert("Submitted");
        this.$store.dispatch('postProfileCode',res)
        // 然后这里是提交数据的操作
      }
      
    },
  },
};
</script>

<style lang= 'less' scoped>
/deep/.el-collapse-item__header {
  font-size: 18px;
  background-color: #ccc;
}
/deep/.el-form-item__label {
  font-size: 15px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>