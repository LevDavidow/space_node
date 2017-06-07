import authControllerInit from '../auth/authController';
import homeController from '../controllers/homeController';
import helperInit from './routesHelper';

export default {
    init: initRoutes
};

let helper = helperInit(null, null);

function initRoutes(app, passport) {
    helper = helperInit(app, passport);

    initAuthRoutes(passport);

    helper.get('/', homeController.home, {view: true});

    //all other routes are rendered as home (for client side routing)
    helper.get('*', homeController.home, {view: true});
}

function initAuthRoutes(passport) {
    let authController = authControllerInit(passport);

    helper.get('/activate/:token', authController.activate, {auth: false});
    helper.get('/login', authController.logIn, {auth: false, view: true});
    helper.post('/login', authController.logInPost, {auth: false, view: true});
    helper.get('/signup', authController.signUp, {auth: false, view: true});
    helper.post('/signup', authController.signUpPost, {auth: false, view: true});
    helper.get('/logout', authController.logOut, {auth: false, view: true});
    helper.get('/passwordForgot', authController.forgotPassword, {auth: false, view: true});
    helper.post('/passwordForgot', authController.forgotPasswordPost, {auth: false, view: true});
    helper.get('/passwordReset/:token', authController.resetPassword, {auth: false, view: true});
    helper.post('/passwordReset/:token', authController.resetPasswordPost, {auth: false, view: true});

    helper.get('/auth/google', authController.google, {auth: false, view: true});
    helper.get('/auth/google/callback', authController.googleCallback, {auth: false, view: true});

    helper.get('/auth/facebook', authController.facebook, {auth: false, view: true});
    helper.get('/auth/facebook/callback', authController.facebookCallback, {auth: false, view: true});
}