define(["avalon", "text!./login.html"], function(avalon, login) {

    avalon.templateCache.login = login;
    var loginVM = avalon.define({
        $id: "login",
        username: "", // will be set to real data when chick login button, with duplex binding
        password: "", // as below
        rememberme: true, // default value
        checkUser: function(e) {
            e.preventDefault();
            avalon.log(loginVM.$model);
            $.post("checkUser", loginVM.$model, function(data, res) {
                if (res) {
                    if (data.isMe === true) {
                        avalon.vmodels.root.login = true; // trigger root 
                    }
                }
            });
        }
    })
      
})
