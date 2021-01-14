const notFound = (req,res) => {
    res.render('page-not-found',{
        data:{
            pageName: "error404",
            message: "ขออภัยไม่พบหน้าเพจ",
            class: "alert alert-warning",
            loginStatus: false
        }
    });
};

module.exports.notFound = notFound;