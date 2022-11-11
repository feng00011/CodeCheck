import Vue from 'vue'
import Vuex from 'vuex'
import {reqPost} from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        profileMsg:[],
        // 存储app-performance依赖关系的数组，格式[{value:'',app:'',performance:['{}','{}']}],注意：提交服务器的数据还是在里打包，代码的规范
        codeMsg:{}
    },
    actions:{
        async getAdds(state, msgObj){
            msgObj = JSON.parse(msgObj)
            let obj = {}
            obj.value = obj.app = msgObj.appName;
            obj.performance = []
            msgObj.domains.forEach(val=>{
                // val是输入的对象，格式是字符串
                obj.performance.push(val)
            })
            state.commit("GETADDS",JSON.stringify(obj))
            let sessionObj = await sessionStorage.getItem('profileMsg')
            if(sessionObj){
                sessionObj = JSON.parse(sessionObj)
                sessionObj.push(obj)
            }else{
                sessionObj = []
                sessionObj.push(obj)
            }
            let res = await sessionStorage.setItem('profileMsg',JSON.stringify(sessionObj))
            return true
        },
        async getMsg(state){
            let res = await sessionStorage.getItem('profileMsg')
            if(res){
                state.commit('GETMSG',res)
            }  
            return true
        },
        updateCode(state,msg){
            let res = JSON.parse(msg)
            console.log(res);
            state.commit('UPDATECODE',res)
        },
        postProfileCode(context,msg){
            // 验证code是否存在
            // 将两者整合成新的JSON，在这里提交后台
            let regMsg = JSON.parse(msg)
            let res = Object.assign({},context.state.codeMsg,regMsg)
            // res = JSON.stringify(res)
            // 解开上面的注释，使得传递的数据为JSON字符串
            console.log(res);
            reqPost(res);

        }
        
    },
    mutations:{
        GETADDS(state,msgObj){
            msgObj = JSON.parse(msgObj)
            console.log(state.profileMsg);
            state.profileMsg.push(msgObj)
        },
        GETMSG(state,res){
            // mutations不允许返回结果（即使写了return也不生效
            // 这里相当于，初次运行该网站的时候去找对应的数据，或者，在刷新页面之后去session找存储的数据
            res = JSON.parse(res)
            state.profileMsg = res    
        },
        UPDATECODE(state,res){
            state.codeMsg = res;
        }
    },
    getters:{

    }
})

export default store