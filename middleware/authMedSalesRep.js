import axios from "axios";
import Cookie from "js-cookie";

export default function (context) {


    //router.push doesn't contain any context.request headers
    //So, first if() condition fails, hence we cannot access headers

    //But, we will have token stored in Cookie.....check ('/registerBox.vue' and 'loginBox.vue' components)
    //So 2nd if() will run

    //You might wonder, why we need the first if()
    //Users might directly request a page, in that case context.request will exists and our token in state will be empty.

    if (context.req) {
        //If user has requested and cookie exists, then
        //Checks Cookies, If access_token does exists, it will store in state.        
        context.store.dispatch('initAuth', context.req)
    }

    //If token doesn't in Cookie, it may be stored in state
    if (context.store.state.token != null) {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': context.store.state.token
        }

        return axios.post(process.env.BASE_URL + '/api/auth', {
            role: 'Medical Sale Representative'
        }, {
            headers: headers
        })
            .then()
            .catch((e) => {
                //console.log(e)
                Cookie.set('access_token', { expires: new Date(0) });
                context.redirect('/')
            });
    }
    //If token is unavailable in both Cookie and state, user will have to login again
    context.redirect('/')


}