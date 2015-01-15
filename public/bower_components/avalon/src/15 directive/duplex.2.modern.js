function onTree(value) { //disabled状态下改动不触发inout事件
    var newValue = arguments.length ? value : this.value
    if (!this.disabled && this.oldValue !== newValue + "") {
        var type = this.getAttribute("data-duplex-event") || "input"
        if (/change|blur/.test(type) ? this !== DOC.activeElement : 1) {
            W3CFire(this, type)
        }
    }
}
//处理radio, checkbox, text, textarea, password
duplexBinding.INPUT = function(element, evaluator, data) {
    var type = element.type,
            bound = data.bound,
            $elem = avalon(element),
            composing = false
    function callback(value) {
        data.changed.call(this, value, data)
    }
    function compositionStart() {
        composing = true
    }
    function compositionEnd() {
        composing = false
    }
    //当value变化时改变model的值
    function updateVModel() {
        if (composing)//处理中文输入法在minlengh下引发的BUG
            return
        var val = element.oldValue = element.value //防止递归调用形成死循环
        var lastValue = data.pipe(val, data, "get")
        if ($elem.data("duplex-observe") !== false) {
            evaluator(lastValue)
            callback.call(element, lastValue)
            if ($elem.data("duplex-focus")) {
                avalon.nextTick(function() {
                    element.focus()
                })
            }
        }
    }

    //当model变化时,它就会改变value的值
    data.handler = function() {
        var val = data.pipe(evaluator(), data, "set")
        if (val !== element.value) {
            element.value = val
        }
    }
    if (data.isChecked || element.type === "radio") {
        updateVModel = function() {
            if ($elem.data("duplex-observe") !== false) {
                var lastValue = data.pipe(element.value, data, "get")
                evaluator(lastValue)
                callback.call(element, lastValue)
            }
        }
        data.handler = function() {
            var val = evaluator()
            var checked = data.isChecked ? !!val : val + "" === element.value
            element.checked = element.oldValue = checked
        }
        bound("click", updateVModel)
    } else if (type === "checkbox") {
        updateVModel = function() {
            if ($elem.data("duplex-observe") !== false) {
                var method = element.checked ? "ensure" : "remove"
                var array = evaluator()
                if (!Array.isArray(array)) {
                    log("ms-duplex应用于checkbox上要对应一个数组")
                    array = [array]
                }
                avalon.Array[method](array, data.pipe(element.value, data, "get"))
                callback.call(element, array)
            }
        }
        data.handler = function() {
            var array = [].concat(evaluator()) //强制转换为数组
            element.checked = array.indexOf(data.pipe(element.value, data, "get")) >= 0
        }
        bound("change", updateVModel)
    } else {
        var events = element.getAttribute("data-duplex-event") || element.getAttribute("data-event") || "input"
        if (element.attributes["data-event"]) {
            log("data-event指令已经废弃，请改用data-duplex-event")
        }
        events.replace(rword, function(name) {
            switch (name) {
                case "input":
                    bound("input", updateVModel)
                    if (!window.VBArray) {
                        bound("compositionstart", compositionStart)
                        bound("compositionend", compositionEnd)
                    }
                    break
                default:
                    bound(name, updateVModel)
                    break
            }
        })
    }
    element.oldValue = element.value
    launch(function() {
        if (avalon.contains(root, element)) {
            onTree.call(element)
        } else if (!element.msRetain) {
            return false
        }
    })
    registerSubscriber(data)
    callback.call(element, element.value)
}