/*! 
  Project  Name: JobBest 
  Last Modified: 2015-01-30
*/
var _v="0.0.8";require.config({baseUrl:"/",paths:{jquery:"assets/vendor/js/jquery/2.1.3/jquery.min",mmState:"assets/vendor/js/avalon/1.391/mmState",mmPromise:"assets/vendor/js/avalon/1.391/mmPromise",mmRouter:"assets/vendor/js/avalon/1.391/mmRouter",mmRequest:"assets/vendor/js/avalon/1.391/mmRequest",mmHistory:"assets/vendor/js/avalon/1.391/mmHistory"}}),require(["jquery","ready!","mmState"],function($){var __v="?_v="+_v;avalon.templateCache.loading="loading<span class='loading-with-dot'></span>";{var root=avalon.define({$id:"root",header:"modules/header/header.html",nav:"modules/nav/nav.html",aside:"modules/aside/aside.html",footer:"modules/footer/footer.html",async_banner_advs:"loading",loading_show:!0,hideLoading:function(){root.loading_show=!1},error_show:!1,show_error:function(){root.error_show=!0},search_show:!1,toggleSearch:function(e){e.preventDefault(),root.search_show=!root.search_show},mask_show:!1,showMask:function(){root.mask_show=!0},hideMask:function(){root.mask_show=!1},currentPageIndex:parseInt(location.href.split("=")[1],10)||1,userInfo:{},isLogin:!1,loginContainer_show:!1,login:function(){root.isLogin||(root.showMask(),void 0===avalon.templateCache.login?require(["modules/login/login"],function(){root.showLoginContainer(),$(".login-container").html(avalon.templateCache.login),avalon.log("加载登陆框完毕!"),avalon.scan(document.querySelector(".login-container"))}):root.showLoginContainer())},showLoginContainer:function(){root.loginContainer_show=!0},hideLoginContainer:function(){root.loginContainer_show=!1,root.hideMask()},logout:function(){root.isLogin=!1},setPageData:function(pageIndex){avalon.log("getPageDataFn"+pageIndex),$.get("data/index.json",function(data,res){res?(root.userData=data.data.list,root.totalPages=data.data.totalPages):console.error("data fetch error!")}),2==pageIndex&&$.get("data/index2.json",function(data,res){res&&(root.userData=data.data.list,root.totalPages=data.data.totalPages)})},totalPages:1,userData:{},prev_btn_show:!1,next_btn_show:!1,renderIndexFn:function(pageIndex){avalon.log("renderIndexFn triggered");var pageIdx=pageIndex||root.currentPageIndex;root.setPageData(pageIdx),setTimeout(function(){pageIdx>0&&pageIdx<root.totalPages?(root.prev_btn_show=root.next_btn_show=!0,1==pageIdx&&(root.prev_btn_show=!1),pageIdx==root.totalPages&&(root.next_btn_show=!1)):0>=pageIdx?root.prev_btn_show=!1:pageIdx>=root.totalPages&&(root.next_btn_show=!1)},16),avalon.scan()},next_page:function(){var curPageIndex=root.currentPageIndex;pageIdx=curPageIndex+1,root.currentPageIndex=pageIdx,avalon.log("next_page"+pageIdx),root.renderIndexFn(pageIdx),avalon.router.navigate("?p="+pageIdx)},prev_page:function(){var curPageIndex=root.currentPageIndex;pageIdx=curPageIndex-1,root.currentPageIndex=pageIdx,avalon.log("prev_page"+pageIdx),root.renderIndexFn(pageIdx),avalon.router.navigate("?p="+pageIdx)},error:function(){console.log("error!")}});!function(){avalon.log("first in to get some data")}(),avalon.define({$id:"resume",seeker:{}})}avalon.state("index",{controller:"root",url:"/",views:{"":{templateUrl:"./modules/index/index.html"+__v},"title@":{template:"&nbsp"}},onChange:function(){avalon.log("initIndex when index state in"),root.renderIndexFn()}}),avalon.state("user",{controller:"root",url:"/user",views:{"":{templateUrl:"./modules/user/user.html"},"title@":{template:"个人空间"}}}),avalon.state("resume",{controller:"root","abstract":!0,url:"/resume",templateUrl:"./modules/resume/resume.html",onChange:function(){}}),avalon.state("resume.detail",{controller:"resume",url:"/{resumeuid}",onChange:function(){avalon.log("init resume detail when resume detail state in");{var vmodel=avalon.vmodels.resume;$.get("data/resume.json",function(data,res){res?(vmodel.seeker=data.data,avalon.vmodels.root.loading_show=!1,avalon.log("init resume detail done")):avalon.log("no this resumeuid data")})}},views:{"":{templateUrl:"./modules/resume/resume.detail.html"},"title@":{template:"个人简历"}}}),require(["/modules/async/advs/advs"],function(){avalon.log("加载异步广告模块完毕")}),avalon.history.start({basepath:"/"}),avalon.scan()});
//
//# sourceMappingURL=app-build.js.map