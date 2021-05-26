import axios from "axios";
import Cookie from "js-cookie";

export default function (context) {

    if (context.req) {
        //If user has requested and cookie exists
        //Checks Cookies, If it does exists, it will store in state.

        context.store.dispatch('initAuth', context.req)
    }

    //Validates token, which is stored in state
    if (context.store.state.token != null) {
        //Prepare headers for authentication
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': context.store.state.token
        }

        //send a request for authentication with headers and body
        return axios.post(process.env.BASE_URL + '/api/auth', {
            role: 'Hospital-Data Manager'
        }, {
            headers: headers
        })
            .then()
            .catch((e) => {
                Cookie.set('access_token', { expires: new Date(0) });
                context.redirect('/')
            });
    }
    //If cookie or token doesn't exists it will redirect

    context.redirect('/')

}