<template>
	<div id="detail_container">
		<Header title='影片详情'>
			<i class="iconfont icon-right" @touchstart="handleToBack"></i>
		</Header>
		<div id="detail_content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="movieDetail.img | setWH('600.400')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{movieDetail.nm}}</h2>
						<p>{{movieDetail.enm}}</p>
						<p>{{movieDetail.sc}}</p>
						<p>{{movieDetail.cat}}</p>
						<p>{{movieDetail.fra}}</p>
						<p>{{movieDetail.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<div class="movie_title">电影简介</div>
				<p>{{movieDetail.dra}}</p>
			</div>
			<div class="detail_player">
				<div class="movie_title">电影剧照</div>
				<el-carousel :interval="4000" type="card" height="100px">
					<el-carousel-item v-for="item in moviePhotos" :key="item">
						<img :src="item | setWH('600.400')" alt="">
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
	</div>





</template>

<script>
	import Header from '@/components/Header'
	export default {
		name: 'detail',
		data() {
			return {
				movieDetail: {},
				moviePhotos: []
			}
		},
		components: {
			Header
		},
		props: ['movieId'],
		methods: {
			handleToBack() {

				this.$router.back();
			}
		},
		mounted() {
			// console.log(this.movieId);
			this.axios.get('/api/detailmovie?movieId=' + this.movieId).then(res => {

				var data = res.data.data.detailMovie;
				// console.log(data);
				this.movieDetail = data;
				this.moviePhotos = data.photos;
				this.$nextTick(() => {

				})


			}).catch(err => {
				console.log(err);
			})
		}

	}
</script>

<style scoped="scoped">
	#detail_container {
		width: 100%;
		min-height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: #FFFFFF;
		z-index: 201;
		overflow: auto;
	}

	#detail_container .detail_list {
		height: 200px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	#detail_content {
		margin-top: 50px;
	}

	.detail_list .detail_list_bg {
		width: 100%;
		height: 100%;
		background: url(../../../static/images/movie_1.jpg) 0 40%;
		filter: blur(20px);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
	}
	/* .detail_intro{
		margin-top: 20px;
	} */

	.detail_list .detail_list_filter {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #40454d;
		opacity: .55;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.detail_list .detail_list_content {
		display: flex;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.detail_list .detail_list_img {
		width: 108px;
		height: 150px;
		border: solid 1px #f0f2f3;
		margin: 20px;
	}

	.detail_list .detail_list_img img {
		width: 100%;
		height: 100%;
	}

	.detail_list .detail_list_info {
		margin-top: 20px;
	}

	.detail_list .detail_list_info h2 {
		font-size: 20px;
		color: white;
		font-weight: normal;
		line-height: 40px;
	}

	.detail_list .detail_list_info p {
		color: white;
		line-height: 20px;
		font-size: 14px;
		color: #ccc;
	}
	  .el-carousel__item img {
    /* color: #475669; */
    /* font-size: 14px; */
       opacity: 0.75;
    /* line-height: 200px; */
    margin: 0;
  }
  .detail_player{
	  margin-top: 20px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__indicator--horizontal{
	  display: none;
  }
  .el-carousel__item{
	  height: 100px;
  }
  .el-carousel__item img{
	  width: 200px !important;
  }
  .el-carousel__indicators--outside{
	  display: none !important;
  }
 #detail_container >>> .el-carousel__indicator--horizontal{
	  display: none !important;
  }

  
</style>
