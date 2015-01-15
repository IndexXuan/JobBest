define(["avalon", "text!./aside.html"], function(avalon, aside) {

    avalon.templateCache.aside = aside
    avalon.define({
        $id: "aside",
        username: "司徒正美"
    })
    avalon.vmodels.root.aside = "aside"
      
})
