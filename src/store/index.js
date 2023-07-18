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
        userInfo: '',
        //GEN MPO 的数据
        selectedData: {},
        //edit mpo 的数据
        mpoData: {},
        isEdited:false
    },
    mutations: {
        setPermission(state, data) {//调用方式 this.$store.commit('setPermission', data)
            if (!data || typeof data != 'object') return;
            if (data instanceof Array) {
                state.permission.push(...data);
            } else {
                state.permission = data;
            }
        },
        setUserInfo(state, data) {
            state.userInfo = data;
            localStorage.setItem(keys.USER, JSON.stringify(data));
        },
        clearUserInfo(state) {
            state.permission = [];
            state.userInfo = null;
            localStorage.removeItem(keys.USER);
        },
        updateLoadingState(state, flag) {
            state.isLoading = flag
        },
        setSelectedData(state, data) {
            state.selectedData = data;
        },
        clearSelectedData(state) {
            state.selectedData = null;
        },
        setMpoData(state, data) {
            state.mpoData = data;
        },
        clearMpoData(state){
            state.mpoData=null;
        },
        updateEditState(state,flag){
            state.isEdited=flag;
        }
    },
    getters: {
        getPermission: (state) => (path) => {    //调用方式 store.getters.getPermission('User')
            if (!path) return state.permission;
        },
        getUserInfo: (state) => () => {
            getUserInfo(state);
            return state.userInfo;
        }, getUserName: (state) => {
            getUserInfo(state);
            if (state.userInfo) {
                return state.userInfo.userName;
            }
            return 'No login information was obtained'
        },
        getToken: (state) => () => {
            getUserInfo(state);
            if (state.userInfo) {
                return state.userInfo.token;
            }
            return '';
        },
        isLogin: (state) => () => {
            return state.isLoading;
        },
        getData: (state) => () => {
            return state.data;
        },

        getSelectedData: (state) => () => {
            return state.selectedData;
        },
        getMpoData:(state)=>()=>{
            return state.mpoData;
        },
        getEditer(state){
            return state.isEdited;
        }
    },
    actions: {
        setPermission(context, data) {
            context.commit('setPermission', data);//调用方式 store.dispatch('push')
        },
        toDo(context) {
            return context.Store.m;
        },
        onLoading(context, flag) {
            context.commit("updateLoadingState", flag);
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