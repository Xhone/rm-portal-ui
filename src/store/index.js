import { createStore } from 'vuex'
import app from './modules/app'
import iframe from './modules/iframe'
import menu from './modules/menu'
import tab from './modules/tab'
import user from './modules/user'
const keys = { USER: 'user' }
function getUserInfo(state) {
    if (state.userInfo) return state.userInfo;
    let userInfo = localStorage.getItem(keys.USER);
    if (userInfo) {
        state.userInfo = JSON.parse(userInfo);
    }
}
export default createStore({
    state: {
        data: {},
        permission: [],
        isLoading: false,
        userInfo: null
    },
    mutations: {
        setPermission(state, data) {//调用方式 this.$store.commit('setPermission', data)
            if (!data || typeof data != 'object') return;
            if(data instanceof Array){
                state.permission.push(...data);
            }else{
                state.permission=data;
            }
        },
        setUserInfo(state,data){
            state.userInfo=data;
            localStorage.setItem(keys.USER,JSON.stringify(data));
        },
        clearUserInfo(state){
            state.permission=[];
            state.userInfo=null;
            localStorage.removeItem(keys.USER);
        },
        updateLoadingState(state,flag){
            state.isLoading=flag
        }
    },
    modules: {
        app: app,
        iframe: iframe,
        menu: menu,
        tab: tab,
        user: user
    }
})