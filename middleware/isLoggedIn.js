module.exports = (req, res, next) => {
    if (!req.user){
        req.flash('error', 'must be signed in to access page');
        res.redirect('/auth/login');
    }else{
        next();
    }
}