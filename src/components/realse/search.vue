<template>
  <div class="cx-search">
  	<el-select v-model="value8" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script>
	import {publishCode} from '@/service/publish'
  export default {
    data() {
      return {
        options: [],
        value8: ''
      }
    },
    updated(){
    	this.$emit("aa", this.value8)
    },
      mounted() {
        publishCode().then(res=>{
          if(res.code==0){
            var a = res.data.projectCodeAndCName;
            for(let i = 0; i < a.length; i++) {
              this.options.push({value:a[i],label:a[i]});
            }

          }
        }).catch(function (error) {
          console.log(error);
        });

    },
  }
</script>
<style>
  .cx-search{
    display: inline-block;
    width: 190px;
    margin-left: 70px;
  }
  .cx-search .el-select{
	width: 190px!important;
	/*margin-left: 70px;*/
}
</style>
