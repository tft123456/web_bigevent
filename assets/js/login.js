$(function() {
    // 切换登录&注册界面
    $('#link_login').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_reg').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pass: [/^[\S]{6,12}$/],
        repass: function(value) {
            var psw = $('#reg-form [name=password]').val();
            if (psw !== value) {
                return '两次密码不一致!';
            }
        }
    });
    // 提交注册信息并跳转到登录界面
    $('#reg-form').submit(function(e) {
        e.preventDefault();
        var data = {
            username: $('#reg-form [name=username]').val(),
            password: $('#reg-form [name=password]').val()
        }
        $.post("/api/reguser", data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_reg').click();
        })
    })

    // 提交登录信息并跳转到后台界面
    $('#login-form').submit(function(e) {
        e.preventDefault();
        var data = {
            username: $('#login-form [name=username]').val(),
            password: $('#login-form [name=password]').val()
        }
        $.post("/api/login", data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            localStorage.setItem('token', res.token);
            location.href = '/index.html';
        })
    })
})