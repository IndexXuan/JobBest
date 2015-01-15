define(["avalon", "text!./index_main.html"], function(avalon, index_main) {

    avalon.templateCache.index = aaa
    avalon.define({
        $id: "aaa",
        username: "司徒正美"
    })
    avalon.vmodels.root.page = "aaa"
      
})
