

export default function (context) {
    console.log("MIDDLEWARE");
    try {
        if (context.req) {
            const orgIdToken = context.req.headers.cookie.split(";").find(c => c.trim().startsWith('organisationId='))
            console.log(orgIdToken)
            if (!orgIdToken)
                context.redirect('/')
            else {
                const token = orgIdToken.split('=')[1];
                console.log(token);
                context.store.state.organisationId = token
                //console.log(context.store.state.organisationId)
                // context.redirect('/dashboard')

            }
        }
        else if (context.store.state.organisationId != null)
            context.redirect('/dashboard')


    } catch (error) {
        //console.log('caught error')
        console.log(error);
        context.redirect('/')
    }
}