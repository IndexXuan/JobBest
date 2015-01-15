define(["avalon", "text!./pic_advs.html"], function(avalon, pic_advs) {

    avalon.templateCache.pic_advs = pic_advs
    avalon.define({
        $id: "pic_advs",
        banner: "挨踢学堂aside广告位"
    })
    avalon.vmodels.aside.async_pic_advs = "pic_advs";
      
})