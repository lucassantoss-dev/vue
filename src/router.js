/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)
 
function lazyLoad(view) {
    return () =>
        import (`@/views/${view}.vue`)
}

export default new Router({

    mode: 'history',

    routes: [{
        path: '/',
        name: 'main',
        component: lazyLoad('Login')
    },
    {
        path: '/login',
        name: 'Login',
        component: lazyLoad('Login')
    },
        
    ],

    
});