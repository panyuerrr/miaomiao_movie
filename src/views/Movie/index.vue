<template>
	<div id="main">
		<Header title="潘潘电影"/>
			<div id="content">
			<div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{this.$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to='/movie/nowPlaying' class="hot_item" tag="div">正在热映</router-link>
					<router-link to='/movie/comingSoon' class="hot_item" tag="div">即将上映</router-link>
				</div>
				<router-link to='/movie/search' class="search_entry" tag="div">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			
			</div>
			<transition 
			 appear 
			enter-active-class="animated fadeInLeft"
			leave-active-class="animated fadeOutRight"
			>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
			</transition>
		<TabBar />
		<transition
		appear 
		enter-active-class="animated fadeInLeft"
		leave-active-class="animated fadeOutRight"
		>
		<router-view name='detail' />
		</transition>	
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBar from '@/components/TabBar'
	import {messageBox} from '@/components/JS'
	export default{
		name:'movie',
		components:{
			Header,
			TabBar,
		
		},
		mounted(){
	    setTimeout(()=>{	    this.axios.get('/api/getLocation').then(res=>{
			var msg=res.data.msg;
			if(msg=='ok'){
				var nm=res.data.data.nm;
				var id=res.data.data.id;
				if(this.$store.state.city.id==id){return ;}
						messageBox({
							title:'定位',
							content:nm,
							cancel:'取消',
							ok:'切换定位',
							handleCancle(){
								console.log(1);
							},
							handleOk(){
								window.localStorage.setItem('now_nm',nm);
								window.localStorage.setItem('now_id',id);
								window.location.reload();
								
							}
				
						})
			}
			
		}).catch(err=>{
			console.log(err);
		})},3000);

		},
	}
	
</script>

<style scoped="scoped">
	#content{ flex:1; overflow:auto;  position: relative; display: flex; flex-direction:column;}
	.movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;position: fixed;top:50px;left: 0;}
	.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
	.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
	.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
	.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
	.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
