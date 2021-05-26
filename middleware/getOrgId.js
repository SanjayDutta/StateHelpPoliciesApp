export default function (context) {

    try {
        if (context.req) {
            const orgIdToken = context.req.headers.cookie.split(";").find(c => c.trim().startsWith('organisationId='))

            if (!orgIdToken)
                context.redirect('/')
            else {
                const token = orgIdToken.split('=')[1];
                //console.log(token);
                context.store.state.organisationId = token


            }
        }
        else if (context.store.state.organisationId != null)
            context.redirect('/dashboard')


    } catch (error) {
        //console.log('caught error')
        //console.log(error);
        context.redirect('/')
    }
}