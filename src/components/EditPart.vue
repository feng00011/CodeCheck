<template>
<div>
  <div style="margin: 100px"></div>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic"> 
  <el-form-item
    prop="appName"
    label="app"
    label-width="150px"
    :rules="[
      { required: true, message: 'Input app please', trigger: 'blur' }
    ]"
  >
    <el-input v-model="dynamicValidateForm.appName"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'performance' +' ' + (index*1 +1)"
    label-width="150px"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: 'Content cannot be empty', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value" type="textarea"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">Submit</el-button>
    <el-button @click="addDomain">Add</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
  </el-form-item>
</el-form>
</div>
  
</template>

<script>
export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          appName: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this[formName]);
            // 获取列表信息
            if(this[formName].appName.trim() != '' && this[formName].domains.length > 0){
              alert('Success')
              let msg = JSON.stringify(this.dynamicValidateForm)
              this.$store.dispatch('getAdds',msg).then((res)=>{
                // 将数据提交给vuex，进行保存
                // 1、同名app怎么办
                // 2、我想对已有的数据进行增删改查怎么办
                if(res){
                  this.dynamicValidateForm={domains: [{value: '' }],appName: ''}
                }  
              });
            }
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
}
</script>

<style>

</style>