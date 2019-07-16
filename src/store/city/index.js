const state={
	nm:window.localStorage.getItem('now_nm')||'北京',
	id:window.localStorage.getItem('now_id')|| 1,
	
	
};
const mutations={
	CITY_INFO(state,payload){
		state.nm=payload.nm;
		state.id=payload.id;		
	}	
};
const actions={
	
};
export default{
	namespace:true,
	state,
	actions,
	mutations
}
