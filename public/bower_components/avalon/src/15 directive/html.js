// bindingHandlers.html 定义在if.js
bindingExecutors.html = function(val, elem, data) {
    val = val == null ? "" : val
    var isHtmlFilter = "group" in data
    var parent = isHtmlFilter ? elem.parentNode : elem
    if (val.nodeType === 11) { //将val转换为文档碎片
        var fragment = val
    } else if (val.nodeType === 1 || val.item) {
        var nodes = val.nodeType === 1 ? val.childNodes : val.item ? val : []
        fragment = hyperspace.cloneNode(true)
        while (nodes[0]) {
            fragment.appendChild(nodes[0])
        }
    } else {
        fragment = avalon.parseHTML(val)
    }
    //插入占位符, 如果是过滤器,需要有节制地移除指定的数量,如果是html指令,直接清空
    var comment = DOC.createComment("ms-html")
    if (isHtmlFilter) {
        parent.insertBefore(comment, elem)
        avalon.clearHTML(removeFragment(elem, data.group))
        data.element = comment //防止被CG
    } else {
        avalon.clearHTML(parent).appendChild(comment)
    }
    data.vmodels.cb(1)
    avalon.nextTick(function() {
        if (isHtmlFilter) {
            data.group = fragment.childNodes.length || 1
        }
        var nodes = avalon.slice(fragment.childNodes)
        if (nodes[0]) {
            if (comment.parentNode)
                comment.parentNode.replaceChild(fragment, comment)
            if (isHtmlFilter) {
                data.element = nodes[0]
            }
        }
        scanNodeArray(nodes, data.vmodels)
        data.vmodels && data.vmodels.cb(-1)
    })
}
