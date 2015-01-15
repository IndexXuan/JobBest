avalon.log("加载avalon完毕，开始构建根VM与加载其他模块");

require(["ready!", "mmState"], function() {

    avalon.templateCache.loading = "loading<span class='loading-with-dot'></span>";

    //顶层VM define 
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
        hideLoading: function() {
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
        //============ common fragments =============//
        
        //============= user and login ==============//
        userInfo: {},
        login: false,
        userData: {},
        // datas above inited from loginVM in async page
        //============ user and login ===============//
        
        //=============== init pages ================//
        //           pages need to be init //
        initIndexFn: function() {
            $.get('data/index.json', function(data, res) {  
                root.userData = data.data;
                avalon.log('init index done');
            })
            avalon.log('initIndexFn triggered');
        },
        //=============== init pages ================//
        
        //=============== error handler ================//
        error: function() {
            console.log("error!");
        }
        //=============== error handler ================//

    }); // rootVM define end

    var resume = avalon.define({
        $id: "resume",
        seeker: {}
    }); // resumeVM define end

    //接着下来通过mmState这个基于状态机的高级路由器，定义各种状态
    //（每个状态包含各个要处理的模板容器，获取模板的手段，中途会发生的各种回调） 
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
            root.initIndexFn();
        }

    })

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
    })

    avalon.state("resume", {
        controller: "root",
        abstract: true,
        url: "/resume",
        templateUrl: "./modules/resume/resume.html",
        onChange: function() {
            avalon.log('change to resume state');
/*            if (!avalon.vmodels.resume1) {
                var resume1 = avalon.define({
                    $id: "resume1",
                    seeker: {},
                    // seeker: $.get('data/resume.json', function(data, res) {
                    //     if (res) {
                    //         resume.seeker = data.data;
                    //         avalon.log('resume init done');
                    //         avalon.vmodels.root.loading_show = false;
                    //         avalon.log(data);
                    //     } else {
                    //         //resume.seeker = '';
                    //         avalon.log('no user data');
                    //     }
                    // })
                
               });
            }
*/
       }
    })

    ///////////////////
    // resume.detail //
    //////////////////
    avalon.state("resume.detail", {
        controller: "resume",
        url: "/{resumeuid}", // only a format, any string can do.
        onChange: function() { // 切换至本detail时加载相应数据
            avalon.log('init resume detail when resume detail state in');
            var vmodel = avalon.vmodels.resume;
            //avalon.log(this.params);
            var initResumeDetailFn = $.get('data/resume.json', function(data, res) {
                if (res) {
                    vmodel.seeker = data.data;
                    avalon.vmodels.root.loading_show = false;
                    avalon.log('init resume detail done');
                    //avalon.log(data);
                } else {
                    avalon.log('no resume uid data');
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

    })
    
    // 异步加载的页面模块
    require(['../../modules/async/advs/advs'], function() {
        avalon.log("加载异步广告模块完毕");
    });   
  
    //启动路由
    avalon.history.start({
        basepath: "/"
    })

    //go!!!!!!!!!
    avalon.scan()
});
