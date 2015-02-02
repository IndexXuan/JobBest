define(["avalon", "text!./login.html"], function(avalon, login) {

    avalon.templateCache.login = login;
    var login = avalon.define({
        $id: "login",
        username: "pengruihaha", // will be set to real data when chick login button, with duplex binding
        password: "123456", // as below
        rememberme: true, // default value
        checkUser: function() {
            var model = JSON.stringify(login.$model);
            avalon.log(model);
            $.ajax({
                url: 'data/checkUser.json',
                type: 'GET',
                data: model,
            })
            .done(function(data) {
                //avalon.log(data);
                var root = avalon.vmodels.root;
                var data = data.data;
                if (data.isMe === true) {
                    root.isLogin = true;
                    root.userInfo = data.message;
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                avalon.vmodels.root.hideLoginContainer();                
            });           
        },
        cancel: function(e) {
            //e.preventDefault();
            avalon.vmodels['root'].hideLoginContainer();
        }
    })
      
})
