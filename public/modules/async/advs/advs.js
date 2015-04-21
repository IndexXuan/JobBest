define(["avalon", "text!./advs.html"], function(avalon, advs) {

    avalon.templateCache.advs = advs
    avalon.define({
        $id: "advs",
        banner: "编程大课堂广告位"
    })
    avalon.vmodels.root.async_banner_advs = "advs";
      
})