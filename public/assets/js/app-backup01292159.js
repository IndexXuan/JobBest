var _v = '0.0.8';
require.config({//第一块，配置
    baseUrl: '',
    paths: {
        jquery: '/assets/vendor/js/jquery/2.1.3/jquery.min',
        //avalon: "/assets/vendor/js/avalon/1.391/avalon",//必须修改源码，禁用自带加载器，或直接删提AMD加载器模块
        //avalon: "/assets/vendor/js/avalon/1.391/avalon.shim",//必须修改源码，禁用自带加载器，或直接删提AMD加载器模块
        //avalon: "/assets/vendor/js/avalon/1.391/avalon.mobile",
        avalon: "/assets/vendor/js/avalon/1.391/avalon.modern.shim",

        mmState: '/assets/vendor/js/avalon/1.391/mmState',
        mmPromise: '/assets/vendor/js/avalon/1.391/mmPromise',
        mmRouter: '/assets/vendor/js/avalon/1.391/mmRouter',
        mmRequest: '/assets/vendor/js/avalon/1.391/mmRequest',
        mmHistory: '/assets/vendor/js/avalon/1.391/mmHistory',
        text: '/assets/vendor/js/require/2.1.11/text',
        domReady: '/assets/vendor/js/require/2.1.11/domReady',
        //css: '/assets/vendor/js/require/2.1.11/css.js',
        css: '/assets/vendor/js/require/2.1.11/css',
        // 微信 JS
        //wxsdk: "http://res.wx.qq.com/open/js/jweixin-1.0.0",


        // APP
        //app: './modules/app',
        // request 请求
        //request: './modules/request',
        // 微信 SDK 组件
        //wx: './modules/wx',

        // UI 组件[现只有 dialog]
        //ui: './modules/ui/dialog/js'
        // dialog:

    },
    priority: ['text', 'css'],
    // 配置不兼容的模块
    // shim: {
    //     jquery: {
    //         // 输出的变量名
    //         exports: "jquery"
    //     },
    //     avalon: {
    //         // deps数组，表明该模块的依赖性
    //         deps: [],
    //         // 输出的变量名
    //         exports: "avalon",
    //         init: function () {
    //             // 禁止使用avalon自带的加载器
    //             //avalon.config({
    //             //    loader: false
    //             //});
    //             console.log("require avalon done!");
    //         }
    //     }
    // },
    //urlArgs: Math.random()
    //urlArgs: "bust=" + (new Date()).getTime()
    urlArgs: '_v=' + _v//"bust=v0.0.1"  + debug
});


require(["jquery", "avalon", "domReady!", "mmState"], function ($, avalon) {//第二块，添加根VM（处理共用部分）

    var __v = '?_v=' + _v;

    avalon.templateCache.loading = "loading<span class='loading-with-dot'></span>"; // 全局小菊花

    // ======================== rootVM define  ===============================//
    var root = avalon.define({

        //=============== root VM ==================//
        $id: "root",
        //================= root VM ==================//
        
        //============ common fragments ==============//
        header: "modules/header/header.html",
        nav: "modules/nav/nav.html",
        aside: "modules/aside/aside.html",
        footer: "modules/footer/footer.html",
            //=== 异步加载的模块 ===//
            async_banner_advs: "loading",
            //=== 异步加载的模块 ===//
        loading_show: true,
        hideLoading: function() { // include的页面loaded后会callback这个函数，完成页面渲染
            root.loading_show = false;
        },
        error_show: false,
        show_error: function() {
            root.error_show = true;
        },
        search_show: false,
        toggleSearch: function(e) {
            e.preventDefault();
            root.search_show = !root.search_show;
        },
        mask_show: false,
        showMask: function() {
            root.mask_show = true;
        },
        hideMask: function() {
            root.mask_show = false;
        },
        currentPageIndex: parseInt(location.href.split("=")[1], 10) || 1, // bad method
        //============ common fragments =============//
        
        //============= user and login ==============//
        userInfo: {},
        isLogin: false,
        userData: {},
        loginContainer_show: false,
        login: function() {
            if (root.isLogin) {
                return;
            }
            root.showMask();
            if (avalon.templateCache.login === void 0) {
                require(['modules/login/login'], function(login) {
                    root.showLoginContainer();
                    $(".login-container").html(avalon.templateCache.login);
                    avalon.log("加载登陆框完毕!");
                    avalon.scan(); // 收集依赖**********************
                });               
            } else {
                root.showLoginContainer();
            }
        },
        showLoginContainer: function() {
            root.loginContainer_show = true;
            //avalon.log('show login');
        },
        hideLoginContainer: function() {
            root.loginContainer_show = false;
            root.hideMask();
            //avalon.log('hide login');
        },
        logout: function() {
            root.isLogin = false;
            // do sth... to clear login infos
        },
        // datas above inited from loginVM in async page
        //============ user and login ===============//

        //============ set data for index ===========//
        setPageData: function(pageIndex) {
            avalon.log('getPageDataFn' + pageIndex);
            $.get('data/index.json', function(data, res) {
                if (res) {
                    root.userData = data.data.list;
                    root.totalPages = data.data.totalPages;
                    //console.log(root.userData);
                } else {
                    console.error("data fetch error!");
                }
            });
            if (pageIndex == 2) {
                $.get('data/index2.json', function(data, res) {
                    if (res) {
                        root.userData = data.data.list;
                        root.totalPages = data.data.totalPages;
                    }
                });
            }
        },
        //============ set data for index ===========//
        
        //=============== init pages ================//
        totalPages: 1,
        prev_btn_show: false,
        next_btn_show: false,
        renderIndexFn: function(pageIndex) {
            avalon.log('renderIndexFn triggered');
            var pageIdx = pageIndex || root.currentPageIndex;
            root.setPageData(pageIdx);
            setTimeout(function() { // async, wait for set totalPages
                if (pageIdx > 0 && pageIdx < root.totalPages) {
                    root.prev_btn_show = root.next_btn_show = true;
                    if (pageIdx == 1) {
                        root.prev_btn_show = false;
                    }
                    if (pageIdx == root.totalPages) {
                        root.next_btn_show = false;
                    }
                } else if (pageIdx <= 0) {
                    root.prev_btn_show = false;
                } else if (pageIdx >= root.totalPages) {
                    root.next_btn_show = false;
                }
            }, 16);
            avalon.scan();
        },
        next_page: function() {
            var curPageIndex = root.currentPageIndex;
            pageIdx = curPageIndex + 1;
            root.currentPageIndex = pageIdx;
            avalon.log('next_page' + pageIdx);
            root.renderIndexFn(pageIdx); // Rerender index

            avalon.router.navigate("?p=" + pageIdx);
        },
        prev_page: function() {
            var curPageIndex = root.currentPageIndex;
            pageIdx = curPageIndex - 1;
            root.currentPageIndex = pageIdx;
            avalon.log('prev_page' + pageIdx);
            root.renderIndexFn(pageIdx); // Rerender index
            avalon.router.navigate("p=" + pageIdx);
        },
        //=============== init pages ================//
        
        //=============== error handler =============//
        error: function() {
            console.log("error!");
        }
        //=============== error handler =============//

    }); 
    // ======================== rootVM define end ============================//

    // 首页打开获取数据接口
    var getInitData = (function () {
        avalon.log("first in to get some data");
    })();

    // ======================== resumeVM define  =============================//
    var resume = avalon.define({
        $id: "resume",
        seeker: {}
    });
    // ======================== resumeVM define end =========================//
    
    ///////////////////
    ///// index //////
    /////////////////
    avalon.state("index", {
        controller: "root",
        url: "/",
        views: {
            "": {
                templateUrl: "./modules/index/index.html" + __v
            },
            "title@": {
                template: "&nbsp"
            }
        },
        onChange: function() {
            avalon.log('initIndex when index state in');
            root.renderIndexFn();
        }

    }); // state index

    ///////////////////
    // user //////////
    /////////////////
    avalon.state("user", {
        controller: "root",
        url: "/user",
        views: {
            "": {
                templateUrl: "./modules/user/user.html"
            },
            "title@": {
                template: "个人空间"
            }
        }
    }); // state user

    ///////////////////
    // resume  ///////
    /////////////////
    avalon.state("resume", {
        controller: "root",
        abstract: true,
        url: "/resume",
        templateUrl: "./modules/resume/resume.html",
        onChange: function() {
            //avalon.log('change to resume state');
       }
    }); // state resume

    ///////////////////
    // resume.detail /
    /////////////////
    avalon.state("resume.detail", {
        controller: "resume",
        url: "/{resumeuid}", // only a format, any string can do.
        onChange: function() { // 切换至本detail时加载相应数据
            avalon.log('init resume detail when resume detail state in');
            var vmodel = avalon.vmodels.resume;
            //avalon.log(this.params);
            var renderResumeDetailFn = $.get('data/resume.json', function(data, res) {
                if (res) {
                    vmodel.seeker = data.data;
                    avalon.vmodels.root.loading_show = false; // 放在页面渲染完毕回调里更科学
                    avalon.log('init resume detail done');
                } else {
                    avalon.log('no this resumeuid data');
                }
            });
        },
        views: {
            "": {
                templateUrl: "./modules/resume/resume.detail.html"
            },
            "title@": {
                template: "个人简历"
            }
        }

    }); // state resume.detail
    
    // 异步加载的页面模块
    require(['modules/async/advs/advs'], function() {
        avalon.log("加载异步广告模块完毕");
    });   
  
    //启动路由
    avalon.history.start({
        basepath: "/"
    });

    //go!!!!!!!!!
    avalon.scan(); // scan后才会include配置的页面等绑定效果

});
