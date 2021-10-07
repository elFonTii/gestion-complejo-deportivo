module.exports = {

    /*
    MODULO AUTH:
        Las funciones middleware devuelven estados de autenticación.

        isLoggedIn: Si el usuario ha iniciado sesión entonces permite el paso.
        isNotLoggedIn: Si el usuario no ha iniciado sesión entonces no permite el paso.
        isAdmin: Verifica el usuario ha iniciado sesión como administrador.
    */
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.rol =='1') {
            return next();
        }
        return res.redirect('/dashboard');
    }
}