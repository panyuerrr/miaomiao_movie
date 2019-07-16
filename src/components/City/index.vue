<template>

	<div class="city_body" behavior="smooth">
		<Loading  v-if='isLoading'/>
		<div class="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
					<li v-for="item in hotlist" :key="item.id" @click="handleToCity(item.nm,item.id)">{{item.nm}}</li>
				</ul>
			</div>
			<div class="city_sort" ref="city_sort">
				<div v-for="item in citylist" :key="item.index">
					<h2 :id="item.index">{{item.index}}</h2>
					<ul v-for="value in item.list" :key="item.id" @click="handleToCity(value.nm,value.id)">
						<li>{{value.nm}}</li>	
					</ul>
				</div>
			</div>
		</div>
		<div class="city_index">
			<ul>
				<li  v-for="(item,index) in citylist" :key="item.index" ><a :href="'#'+item.index" >{{item.index}}</a></li>
			</ul>
		</div>
	</div>

</template>

<script>
	// import {mapMutations}  from Vuex
	export default {
		name: 'City',
		data(){
			return{
				citylist:[],
				hotlist:[],
				isLoading:true
			}
		},
		mounted() {
		   if(citylist && hotlist){
			 var citylist=window.localStorage.getItem('citylist');
			 var  hotlist=window.localStorage.getItem('hotlist');
			   this.citylist=JSON.parse(citylist);
			   this.hotlist=JSON.parse(hotlist);
			   this.isLoading=false;
		   }else{
			   	this.axios.get('/api/cityList').then(res => {
			   	console.log(res);
			   	var cities = res.data.data.cities;
			   	var {citylist,hotlist}=this.formatCityList(cities);
			       this.citylist=citylist;
			   	this.hotlist=hotlist;
			   	window.localStorage.setItem('citylist',JSON.stringify(this.citylist));
			   	window.localStorage.setItem('hotlist',JSON.stringify(this.hotlist));
				  this.isLoading=false;
			   	// console.log(this.citylist)
			   }).catch(err => {
			   	console.log(err)
			   })
		   }
		},
		methods: {
			formatCityList(cities) {
				var citylist = [];
				var hotlist = [];
				//热门城市
				for(var i=0;i<cities.length;i++){
					if(cities[i].isHot == 1){
						hotlist.push(cities[i]);
					}
				}
				// console.log(hotlist);
				for (var i = 0; i < cities.length; i++) {
					var firstLetter = cities[i].py.slice(0, 1).toUpperCase();
					if (toCome(firstLetter)) { //新添加到index
						var obj = {
							index: firstLetter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]

						}
						citylist.push(obj);
					} else { //累加到已有index
						for (var j = 0; j < citylist.length; j++) {
							if (citylist[j].index === firstLetter) {
								citylist[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								})
							}
						}
					}
				}
                citylist.sort((a,b)=>{
					if(a.index>b.index){
						return -1;
					}else if(a.index<b.index){
						return 1;
					}else{
						return 0
					}
				})
				citylist.reverse();
				function toCome(firstLetter) {
					for (var i = 0; i < citylist.length; i++) {
						if (firstLetter === citylist[i].index) { //如果当前循环到的总数据中的某个首字母已经在自定义的citylist中出现的话，则返回false
							return false;
						}
					}
					return true;
				}
				return {
					citylist,
					hotlist
				}
			},
			handleToCity(nm,id){
				this.$store.commit('CITY_INFO',{nm,id});
				window.localStorage.setItem('now_nm',nm);
				window.localStorage.setItem('now_id',id);
				this.$router.push('/movie/nowPlaying');
	
			}


		},
	}
</script>

<style scoped="scoped">
	 .city_body {
		display: flex;
		width: 100%;
		position: fixed;
		top:96px;
		height: calc(100% - 146px);
		overflow: auto;
	   -webkit-overflow-scrolling : touch;
		
	}

	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}

	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}

	.city_body .city_hot {
		margin-top: 20px;
	}

	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}

	.city_body .city_sort div {
		margin-top: 20px;
	}

	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	
	}
		.city_body .city_sort h2:target {
		font-size: 15px;
		color: #EF4238;
		
		
	}

	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}

	.city_body .city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}

	.city_body .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: calc(100% - 146px);
		text-align: center;
		border-left: 1px #e6e6e6 solid;
		position: fixed;
		right: 0%;
		top:96px;
		font-size: 12px;
	
	}
	.city_body .city_index ul{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.city_body .city_index ul a{
		text-decoration: none;
		color: #000;
	
	}
	.city_body .city_index ul a.big{
		font-size:16px;
	
	}
	
	
</style>
