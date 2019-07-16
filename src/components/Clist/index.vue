<template>
	
	<div class="cinema_body">
		<Loading v-if="isLoading" />
		<Scroller  v-else :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
		<ul> 
		    <li class="pulldown">{{pullDownMsg}}</li>
			<li v-for='item in cinemaList' :key='item.id'>
				<div>
					<span>{{item.nm}}</span>
					<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
				</div>
				<div class="address">
					<span>{{item.addr}}</span>
					<span>{{item.distance}}</span>
				</div>
				<div class="card">
	    		  <div v-for="(value,key) in item.tag" :key="key" v-if="value===1" :class="key| classformat">{{ key | formatCard}}</div>
				</div>
			</li>
		</ul>
		</Scroller>

	
</div>
	
	
</template>

<script>
	export default{
		name:"Clist",
		data(){
			return {
				cinemaList:[],
				isLoading:true,
				pullDownMsg:'',
				precityId:-1
			}
		},
		activated(){
			var cityId=this.$store.state.city.id;
			if(cityId == this.precityId){
				return ;
			}
			else{
				    this.isLoading='true';
					this.axios.get('/api/cinemaList?cityId='+cityId).then(res=>{
					this.cinemaList=res.data.data.cinemas;
					this.isLoading=false;
					this.precityId=cityId;
				}).catch(err=>{
					console.log(err)
				})
			}
			
		
			
		},
		filters:{
			formatCard(key){
				var card=[
					{key:'allowRefund',value:'退'},
					{key:'endorse',value:'改签'},
					{key:'snack',value:'小吃'},
					{key:'sell',value:'折扣卡'}]
			
				
				   for(var i=0;i<card.length;i++){
					  if(card[i].key==key){
						 return card[i].value
					  }   
				   }		
					return '';
			},
			classformat(key){
				var card=[
					{key:'allowRefund',value:'bl'},
					{key:'endorse',value:'bl'},
					{key:'snack',value:'or'},
					{key:'sell',value:'or'}]
				   for(var i=0;i<card.length;i++){
					  if(card[i].key==key){
						 return card[i].value
					  }   
				   }		
					return '';
				
			}
		},
		methods:{
			handleToScroll(pos){
			if(pos.y>30){
				this.pullDownMsg='正在更新中...';
			}
		},
		handleToTouchEnd(pos){
			if(pos.y>30){
		     this.axios('/api/cinemaList?cityId='+this.$store.state.city.id).then(res=>{
					var msg=res.data.msg;
					if(msg =='ok'){
					this.pullDownMsg='更新成功...';
					setTimeout(()=>{
						var data=res.data.data.comingList;
							this.comingList=data;
						    this.pullDownMsg=''
					},1000);
					}
				})
				
				
				
			}
				
				
				
			}
			
			
			
			
		}
		
		
	}
</script>

<style scoped="scoped">
	.cinema_body{ flex:1; overflow:auto;position: fixed;height: calc(100% - 146px);width: 100%;top: 96px; -webkit-overflow-scrolling : touch;}
	.cinema_body ul{ padding:0px 20px 20px 20px;}
	 .movie_body ul li.pulldown{margin-top: 0px;padding-bottom: 0px; border: none;}
	.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
	.cinema_body div{ margin-bottom: 10px;}
	.cinema_body .q{ font-size: 11px; color:#f03d37;}
	.cinema_body .price{ font-size: 18px;}
	.cinema_body .address{ font-size: 13px; color:#666;}
	.cinema_body .address span:nth-of-type(1){ display: inline-block;width:75%; overflow: hidden; word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;} 
	.cinema_body .address span:nth-of-type(2){ float:right; }
	.cinema_body .card{ display: flex;}
	.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
	.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
	.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
