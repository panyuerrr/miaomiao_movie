<template>

	<div class="movie_body" ref="movie_body">
		<Loading v-if="isLoading" />
		<Scroller v-else :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
			<ul>
				<li class="pulldown">{{pullDownMsg}}</li>
				<li v-for='item in comingList' :key="item.id">
					<div class="pic_show"><img :src="item.img | setWH('128.120')"></div>
					<div class="info_list">
						<h2>{{item.nm}} <img v-if="item.version" src="../../assets/maxs.png" /></h2>
						<p><span class="person">{{item.wish}}</span> 人想看</p>
						<p>主演:{{item.star}}</p>
						<p>{{item.rt}}上映</p>
					</div>
					<div class="btn_pre">
						预售
					</div>
				</li>
			</ul>
		</Scroller>

	</div>

</template>

<script>
	// import BScroll from 'better-scroll'
	export default {
		name: 'ComingSoon',
		data() {
			return {
				comingList: [],
				pullDownMsg: '',
				isLoading: true,
				precityId: -1
			}
		},
		activated() {
			var cityId = this.$store.state.city.id;
			if (cityId == this.precityId) {
				return;
			} else {
				this.isLoading = true;
				this.axios('/api/movieComingList?cityId='+this.$store.state.city.id).then(res => {
					var data = res.data.data.comingList;
					this.comingList = data;
					this.isLoading = false;

				}).catch(err => {
					console.log(err);
				})

			}


		},
		methods: {
			handleToDetail() {
				console.log('handletodetail')
			},
			handleToScroll(pos) {
				if (pos.y > 30) {
					this.pullDownMsg = '正在更新中...';
				}
			},
			handleToTouchEnd(pos) {
				if (pos.y > 30) {
					this.axios('/api/movieComingList?cityId='+this.$store.state.city.id).then(res => {
						var msg = res.data.msg;
						if (msg == 'ok') {
							this.pullDownMsg = '更新成功...';
							setTimeout(() => {
								var data = res.data.data.comingList;
								this.comingList = data;
								this.pullDownMsg = ''
							}, 1000);
						}
					})



				}


			}
		},


	}
</script>

<style scoped="scoped">
	.movie_body {
		flex: 1;
		overflow: auto;
		position: fixed;
		top: 96px;
		left: 0;
		height: calc(100% - 146px);
		width: 100%;
		-webkit-overflow-scrolling: touch;
	}

	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}

	.movie_body ul li.pulldown {
		margin-top: 0px;
		padding-bottom: 0px;
	}

	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}

	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}

	.movie_body .pic_show img {
		width: 100%;
	}

	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}

	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}

	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}

	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}

	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
</style>
