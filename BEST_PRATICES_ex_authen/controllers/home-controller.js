const verifyToken = require('../utilities/verify');
const home = (req,res) => {
    const status = verifyToken(req);
    res.render('home',{
        data: {
            pageName: "Home",
            message: "Home Page",
            class: "alert alert-primary",
            loginStatus: status
        }
    });
};

module.exports.home = home;