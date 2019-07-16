<template>
	<div class="wrapper" ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default{
		name:'Scroller',
		props :{
			handleToScroll:{
				type: Function,
				default: function(){}
			},
			handleToTouchEnd:{
				type:Function,
				default:function(){}
			},
		},
		mounted(){
			var scroller=new  BScroll(this.$refs.wrapper,{
				type:true,
				probeType:1,
				click:true,
				tap:true
			});
				this.$nextTick(()=>{
			
			scroller.on('scroll',(pos)=>{
		
				this.handleToScroll(pos);
				
			});
			scroller.on('touchEnd',(pos)=>{
				this.handleToTouchEnd(pos);
			})
				});
		}
	}
</script>

<style scoped="scoped">
	.wrapper{
		height: 100%;
	}
</style>
