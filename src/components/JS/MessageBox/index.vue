<template>
	<div class="wrapper">
	  <h3>{{title}}</h3>
	  <p>{{content}}</p>
	  <div>	  
	   <span @touchstart='handleCancel'>{{cancel}}</span>
	   <span @touchend='handleOk'>{{ok}}</span>
	  </div>  
	</div>
</template>

<script>
export default{
	name:'MessageBox'
	
	
	
}
</script>

<style scoped="scoped">
	.wrapper{
		width: 200px;
		height: 120px;
		border: 1px solid #ccc;
		box-shadow:3px 3px 3px #ccc;
		position:fixed;
		left:50%;
		margin-left: -100px;
		top:50%;
		margin-top: -60px;
		line-height: 40px;
        background: #ffffff;
	    border-radius: 2px;
	}
	.wrapper h3{
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}
	.wrapper p{
		font-size: 15px;
		text-align: center;
	}
	.wrapper>div{
		display: flex;
		border-top:1px solid #ccc;
	}
	.wrapper>div span{
	     	flex:1;
		text-align: center;
		border-left: 1px solid #ccc;
		cursor: pointer;
		
	}
	.wrapper>div span:nth-of-type(1){
		border:none;
	}
	
	
	
</style>
