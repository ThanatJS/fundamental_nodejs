const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = (req,res) => {
    res.render('login',{
        data:{
            pageName: "Login",
            message: "กรุณาล๊อกอินเข้าสู่ระบบ",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};
module.exports.login = login;
const getUserData = async dataObj => {
    const user = await User.findOne({
        username: dataObj.username
    });
    if (!user){
        return { id:null, username:null, loginStatus: false};
    }else{
        const result = await bcrypt.compare(dataObj.password,user.password);
        return { id: user._id, username: user.username, loginStatus: result};
    }
}
const postLogin = (req,res) => {
    if (!req.body.username || !req.body.password){
        res.render('loign',{
            data: {
                pageName: "Login",
                message: "กรุณากรอก username และ password",
                class: "alert alert-warning",
                loginStatus: false
            }
        });
        return;
    }
    const dataObj = {
        username: req.body.username,
        password: req.body.password
    };
    getUserData(dataObj)
    .then(result => {
        if (result.loginStatus === true){
            const token = jwt.sign(
                { id: result.id, username: result.username, loginStatus: true},'SECRETKEY',{expiresIn: 60*1}
            );
            res.setHeader('Set-Cookie','token='+token);
            res.render('profile',{
                data: {
                    pageName: "Profile",
                    message: "",
                    class: "alert alert-primary",
                    username: result.username,
                    loginStatus: true
                }
            });
        }else{
            res.render('login',{
                data: {
                    pageName: "Login",
                    message: "ชื่อ username หรือ password ไม่ถูกต้อง",
                    class: "alert alert-danger",
                    loginStatus: false
                }
            });
        }
    })
    .catch(error => {
        console.log(error);
    })
}
const logout = (req,res) => {
    res.clearCookie('token');
    res.render('login',{
        data: {
            pageName: "Login",
            message: "กรุณาล็อกอินเข้าสู่ระบบ",
            class: "alert alert-warning",
            loginStatus: false
        }
    });
};
module.exports.logout = logout;
module.exports.postLogin = postLogin;