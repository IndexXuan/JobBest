avalon.log("加载avalon完毕，开始构建根VM与加载其他模块");

require(["ready!", "mmState"], function() {

    avalon.templateCache.loading = "loading<span class='loading-with-dot'></span>";

    // ======================== rootVM define  ===============================//
    var root = avalon.define({

        //================= root VM ==================//
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
        currentPageIndex: parseInt(location.href.split("=")[1], 10) || 1,
        //============ common fragments =============//
        
        //============= user and login ==============//
        userInfo: {},
        login: false,
        userData: {},
        loginContainerShow: false,
        login: function() {
            if (avalon.templateCache.login === void 0) {
                require(['../../modules/login/login'], function(login) {
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
            root.loginContainerShow = true;
            avalon.log('show login');
        },
        hideLoginContainer: function() {
            avalon.log('hide login');
            root.loginContainerShow = false;
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
                }
            });
            if (pageIndex == 2) {
                $.get('data/index2.json', function(data, res) {
                    if (res) {
                        root.userData = data.data.list;
                        root.totalPages = data.data.totalPages;
                    }
                })
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
/*            avalon.router.go("/aaa");*/
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
                templateUrl: "./modules/index/index.html"
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
    require(['../../modules/async/advs/advs'], function() {
        avalon.log("加载异步广告模块完毕");
    });   
  
    //启动路由
    avalon.history.start({
        basepath: "/"
    });

    //go!!!!!!!!!
    avalon.scan(); // scan后才会include配置的页面等绑定效果
});
