<style lang="less" scoped>
	/*div{
         -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }*/
	.attention {
	position: relative;
	}
	.attention img {
		width: 100%;
	}

	.m {
		width: 90%;
		margin: 0 auto;
		margin-top: 5%;
	}

	.attentionInfo {
		height: 350px;
		overflow: hidden;
		/*width: 90%;*/
		/*margin: 0 auto;*/
		/*padding-bottom: 10%;*/
		display: flex;
	}

	.common {
		width: 400px;
		height: 190px;
		background: #FFFFFF;
		border-radius: 6px;
		box-shadow: 0 2px 5px 0;
		/*display: inline-block;*/
		position: relative;
		text-align: center;
	}

	.typePos {
		width: 100px;
		height: 100px;
		position: absolute;
		left: 0;
		top: -50px;
		right: 0;
		bottom: 0;
		margin: 0 auto;
	}

	.typePos img {
		width: 100%;
	}

	.typeS {
		width: 36px;
		height: 36px;
		background-image: url(../../assets/img/select.png);
		position: absolute;
		right: 0;
		top: 0;
	}

	.qu {
		width: 280px;
		height: 56px;
		line-height: 56px;
		margin: 0 auto;
		line-height: 56px;
		background: #408BF3;
		text-align: center;
		font-size: 25.2px;
		color: #FFFFFF;
	}

	.person {
		font-size: 28px;
		color: #408BF3;
		height: 124px;
		line-height: 180px;
	}

	.represent {
		font-size: 18px;
		color: #333333;
	}

	.attenprogess {
		font-size: 14px;
		color: #B3B3B3;
	}
	.attentionh{
		width: 900px;
		font-size: 56px;
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		top: 165px;
		bottom: 0;
		margin: 0 auto;
	}
	@media only screen and (max-width: 1500px) {
		.attentionh{
			font-size: 48px;
			top: 100px;
			text-align: center;
		}
	}
	@media only screen and (max-width: 1300px) {
		.common {
			width: 300px;
		}
		.typePos {
			width: 80px;
			top: -40px;
		}
		.person {
			font-size: 20px;
			height: 120px;
			line-height: 170px;
		}
		.represent {
			font-size: 16px;
		}
		.attenprogess {
			font-size: 13px;
		}
		.attentionh{
			top: 100px;
		}
	}
</style>

<template>
	<div>
		<div class="attention">
			<img src="../../assets/img/background.png" />
			<div class="attentionh">区分认证，让你的发言更有信服力！</div>
		</div>
		<div class="attentionInfo">

			<div class="m common">
				<div class="typePos ">
					<img src="../../assets/img/typeSelect.png" />
				</div>
				<div class="type"></div>
				<div class="person">项目方</div>
				<p class="represent">代表项目方发声，每个项目仅1个。</p>
				<p class="attenprogess">已有区块链项目，并且在运营中</p>
			</div>
			<div class="m common">
				<div class="typePos typeM">
					<img src="../../assets/img/typeMedia.png" />
				</div>
				<div class="type "></div>
				<div class="person">评测媒体</div>
				<p class="represent">项目评测重要节点,Finder联盟预备成员。</p>
				<p class="attenprogess">区块链项目评测媒体，已发表多篇区块链评测文章</p>
			</div>
			<div class="m common">
				<div class="typePos typeJ">
					<img src="../../assets/img/selectJ.png" />
				</div>
				<div class="type"></div>
				<div class="person">机构号</div>
				<p class="represent">官方发生渠道，提升品牌影响力。</p>
				<p class="attenprogess">适合企业及组织认证</p>
			</div>
		</div>
		<div class="qu" @click="identification(index)">
			去认证
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: ["项目方", "评测媒体", "机构号"],
				index: "",
				flag: "false",
				index: ""
			}
		},
		created() {

		},
		mounted() {
			$(".m").on("click", function() {
				var index = $(this).index();
				console.log($(this).index())
				$(".m .type").removeClass("typeS");
				$(".m .type").eq(index).addClass("typeS");

			})
		},
		methods: {

			identification() {
				if($(".type").eq(0).hasClass("typeS")) {
					this.$router.push("/official");
				}
				if($(".type").eq(1).hasClass("typeS")) {
					this.$router.push("/media");
				}
				if($(".type").eq(2).hasClass("typeS")) {
					this.$router.push("/organization");
				}
			}
		}

	}
</script>
