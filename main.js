import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.sendRequest= function(param,backpage, backtype){
    var _self = this, 
        url = param.url,
        data = param.data || {}, 
        header = param.header
        // token = "";
        
    //拼接完整请求地址
    var requestUrl = url;
    //固定参数
    // if(!data.token){//如果参数中无token(除了小程序第一次通过code获取token的接口默认参数token = login,其他接口token参数都是在本地缓存中获取)
    //     token = uni.getStorageSync(this.sessionKey);
    //     if(!token){//本地无token需重新登录
    //         _self.login(backpage, backtype);
    //         return;
    //     }else{
    //         data.token = token;
    //     }
    // }
    
    //GET或POST
    if(param.method){
        param.method = param.method.toUpperCase();//小写改为大写
    }
    
    //网络请求
    uni.request({
        url: requestUrl,
        method: param.method || "POST",
        header: header || {'content-type' : "application/json"},
        data: data,
        success: res => {
            
            typeof param.success == "function" && param.success(res.data);
        },
        fail: (e) => {
            console.log("网络请求fail:" + JSON.stringify(e));
            
            typeof param.fail == "function" && param.fail(res.data);
        },
        complete: () => {
            console.log("网络请求complete");
            uni.hideLoading();
            
            typeof param.complete == "function" && param.complete(res.data);
            return;
        }
    });
}

const app = new Vue({
	...App
})
app.$mount()
