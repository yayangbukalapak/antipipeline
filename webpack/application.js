'use strict';

const Vue = require('../node_modules/vue/dist/vue');
const VueRouter = require('../node_modules/vue-router/dist/vue-router');
const VueResource = require('../node_modules/vue-resource/dist/vue-resource');

const BaseTemplate = require('./components/base.vue');

Vue.use(VueRouter);
Vue.use(VueResource);

const Home      = resolve => require.ensure([], () => resolve(require('components/home.vue')),    '/');
const About     = resolve => require.ensure([], () => resolve(require('./components/about.vue')),   '/about');
const FAQ       = resolve => require.ensure([], () => resolve(require('./components/faqs.vue')),     '/faq');
const Items     = resolve => require.ensure([], () => resolve(require('./components/items.vue')),   '/items');

const router = new VueRouter({
    base: __dirname,
    routes: [
        {path: "/",             component: Home},
        {path: "/about",        component: About},
        {path: "/faq",          component: FAQ},
        {path: "/items",        component: Items}
    ]
});

new Vue({
    router,
    render: h => h(BaseTemplate)
}).$mount("#app");