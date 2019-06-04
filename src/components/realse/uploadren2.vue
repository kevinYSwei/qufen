<template>
    <div id="id2">
     <div class="max-nine">
       <div class="demo-upload-list" v-for="item in uploadList">
         <template v-if="item.status === 'finished'">
           <img :src="item.url">
           <div class="demo-upload-list-cover">
             <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
             <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
           </div>
         </template>

       </div>
       <Upload
         ref="upload" name="file"
         :show-upload-list="false"
         :default-file-list="defaultList"
         :on-success="handleSuccess"
         :format="['jpg','jpeg','png']"
         :max-size="5120"
         :on-format-error="handleFormatError"
         :on-exceeded-size="handleMaxSize"
         :before-upload="handleBeforeUpload"

         multiple
         type="drag"
         action="https://upload-z2.qiniup.com"
         :data="uptoken"
         style="display: inline-block;width:58px;">
         <div style="width: 100px;height:100px;line-height: 100px;">
           	 <Icon type="plus-round" size="20"></Icon>
         </div>
       </Upload>
     </div>
      <!--本地-->
      <!--action="http://192.168.10.151:803/kff/upload/authentication"-->
      <!--线上-->
      <!--action="http://app.qufen.top/wap/kff/upload/authentication"-->
      <Modal title="View Image" v-model="visible">
        <!--本地-->
        <!--<img :src="'http://192.168.10.151:8080' + imgName" v-if="visible" style="width: 100%">-->
        <!--线上-->
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </div>
</template>
<script>
import { upload } from '@/service/publish'
import { getCookie} from '../../assets/js/cookie.js'
  export default {
    data () {
      return {
        defaultList: [],
        imgofurl: '',
        imgName: '',
        visible: false,
        publishLoading: false,
        tags:false,
        uploadList: [],
        token: getCookie('token'),
        uptoken: {},
		date1: "",
		userId: ""
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
      //获取七牛云token和用户id
			this.getToken();

    },
    methods: {
    	//时间
			getDate() {
				var myDate = new Date();
				//获取当前年
				var year = myDate.getFullYear();
				//获取当前月
				var month = myDate.getMonth() + 1;
				if(month < 10) {
					month = "0" + month;
				}
				//获取当前日
				var date = myDate.getDate();
				//时
				var h = myDate.getHours(); //获取当前小时数(0-23)
				//分
				var m = myDate.getMinutes(); //获取当前分钟数(0-59)
				//秒
				var s = myDate.getSeconds();
				//毫秒
				var ms = myDate.getMilliseconds()
				var now = year + month + date + h + m + s + ms;
				this.date1 = now

			},
			getToken() {
				let data1 = {
					token: this.token
				}
				upload(data1).then(res => {
					if(res.code == 0) {
//						console.log(res.data)
						this.uptoken.token = res.data.upToken
						this.userId = res.data.uid

					}
				})
			},
      //点击查看图片
      handleView (name) {
//    	console.log(name)
		this.imgofurl = name.imgofurl,
		this.imgName = "https://pic.qufen.top/" + name;
		this.visible = true;
      },
      //点击删除图片
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      //上传成功
      handleSuccess (res, file) {

		//成功后返回的路径
		var b = "https://pic.qufen.top/" + res.key;
		this.$emit("bb",b)
		//线上
		file.url = "https://pic.qufen.top/" + res.key;
        var c = file.url.toString();
        file.name = c;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式 ' + file.name + ' 不正确，请选择JPG或PNG. '
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + file.name + ' 太大了，不超过5M.'
        });
      },
      handleBeforeUpload (file) {
      	//获取当前时间
		this.getDate()
		var imgurl = file.name.split(".")[1]
		this.uptoken.key = "posts" + this.date1 + this.userId + "." + imgurl
//		console.log(this.uptoken.key)
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: '只能上传一张照片'
          });
        }
        return check;
      }
    }
  }
</script>
<style lang="less" scoped>
  /*@import '../styles/common.less';*/
   .ivu-upload{
      width: 100px!important;
      height: 100px;
  }
  .ivu-upload-drag{
  border: 1px solid #CCCCCC!important;
}
  .upload-img{
    text-align: left;
    margin: 10px 0;
  }
  .background{
    background: lightblue;
  }
  .max-nine{
      text-align: left;
      margin: 20px 0;
	  margin-left: 190px;
  }

  .label{
    list-style: none;
    overflow: hidden;
  }
  .label li{
    width: 90px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
    background: #b7b7b7;
    border-radius: 20px;
    text-align: center;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

	.ivu-btn-primary {
		width: 150px;
	}
	.select{
  	margin-left: 100px;
  }

  .demo-upload-list{
  	/*position: absolute;
  	top: 4px;*/
  	width: 100px;
  	height: 100px;
  	line-height: 100px;
  }
</style>
