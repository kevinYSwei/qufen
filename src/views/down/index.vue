<template>
	<div class="cx-register">
		<Header></Header>
		<div class="registerLon">
			<div class="downBgc">
				<div class="down"><img src="../../assets/down/phone.png" /></div>
				<div class="downCode">
					<h1><span class="codeTitle">区分</span>-币圈大众点评</h1>
					<div class="downCodewrapper">
						<div class="downCodewrap">
							<img src="../../assets/down/new.png" />
							<div @click="ios" class="codeDown">IOS 下载</div>
							<div @click="android" class="codeDown">Android 下载</div>
						</div>
					</div>
				</div>
			</div>
			<div class="info">
				<ul>
					<li class="brand_item">
						<p class="brand_name">
							<img src="../../assets/down/mobile1.png" />

						</p>
						<p class="brand_detail">
							<img src="../../assets/down/mobile1-b.png" />
						</p>
						<p>评测 </p>
						<p>数百名专业评测师给你有价值的内容</p>
					</li>
					<li class="brand_item">
						<p class="brand_name">
							<img src="../../assets/down/mobile2.png" />
						</p>
						<p class="brand_detail">
							<img src="../../assets/down/mobile2-b.png" />
						</p>
						<p>爆料</p>
						<p>揭露不为人知的项目内情</p>
					</li>
					<li class="brand_item">
						<p class="brand_name">
							<img src="../../assets/down/mobile3.png" />
						</p>
						<p class="brand_detail">
							<img src="../../assets/down/mobile3-b.png" />
						</p>
						<p>尽调</p>
						<p>展现项目一个立体,客观，全面的面貌</p>
					</li>
					<li class="brand_item">
						<p class="brand_name">
							<img src="../../assets/down/mobile4.png" />
						</p>
						<p class="brand_detail">
							<img src="../../assets/down/mobile4-b.png" />
						</p>
						<p>资讯 </p>
						<p>全网最新资讯一网打尽</p>
					</li>
					<li class="brand_item">
						<p class="brand_name">
							<img src="../../assets/down/mobile5.png" />
						</p>
						<p class="brand_detail">
							<img src="../../assets/down/mobile5-b.png" />
						</p>
						<p>行情 </p>
						<p>网络全球币种交易信息，实时更新</p>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	//	import { login, register, getCode } from '@/service/user'
	import Header from '@/components/layout/header'
	export default {
		data() {
			return {

			}
		},
		components: {
			Header
		},
		mounted() {
			$(".brand_detail").css("display", "none")
			$(".brand_item").hover(
				function() {
					var index = $(this).index()
					$(".brand_item:eq(" + index + ") .brand_name").css("display", "none")
					$(".brand_item:eq(" + index + ") .brand_detail").css("display", "block")

				},
				function() {
					var index = $(this).index()
//					console.log($(this).index())
					
					$(".brand_item:eq(" + index + ") .brand_name").css("display", "block")
					$(".brand_item:eq(" + index + ") .brand_detail").css("display", "none")

				}
			);

		},
		methods:{
			ios(){
				window.location.href = "itms-services://?action=download-manifest&url=https://pic.qufen.top/ipa.plist"
			},
			android(){
				window.location.href = "https://pic.qufen.top/qufen_update.apk"
			}
		}

	}
</script>

<style lang="less">
	@import '../user/common.less';
	@import './common.less';
</style>