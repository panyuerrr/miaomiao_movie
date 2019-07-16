<template>
	<div id="main">
		<Header title="潘潘影院" />
		<div id="content">
			<div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
			<Clist></Clist>
		</div>
		<TabBar />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBar from '@/components/TabBar'
	import Clist  from '@/components/Clist'
	export default {
		name: 'cinema',
		components: {
			Header,
			TabBar,
			Clist
		}
	}
</script>

<style scoped="scoped">
	 .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;position: fixed;
    top: 50px;
    z-index: 200;}
	.cinema_body{ flex:1; overflow:auto;position: fixed;height: calc(100% - 146px);width: 100%;}

	
</style>
