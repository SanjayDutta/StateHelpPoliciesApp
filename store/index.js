import Vuex from 'vuex';
import axios from 'axios';




const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedData: null,
            loadedDocs: null,
            isLogin: true,
            token: null,
            organisationId: null,
            secretId: null,
        },
        mutations: {
            setLoadedData(state, posts) {
                //console.log("Data set")
                state.loadedData = posts;
                //console.log(posts)
                // console.log("hi")
            },
            setLoadedDocs(state, array) {
                state.loadedDocs = array;
            },
            setToken(state, token) {
                state.token = 'Bearer ' + token
            },
            setOrgId(state, orgId) {
                state.organisationId = orgId
                //console.log(state.organisationId)
            },
            setSecretId(state, secretId) {
                state.secretId = secretId;
            }
        },
        actions: {
            // nuxtServerInit(vuexContext) {
            //     console.log('GetData was called');
            //     console.log(process.env.dbUrl + 'getAll')
            //     return axios.get(process.env.dbUrl + 'getAll/')
            //         .then((result) => {
            //             const postArray = result.data
            //             vuexContext.commit('setLoadedData', postArray);
            //             // console.log('this is exec after commit')
            //         })
            //         .catch((e) =>
            //             console.log()
            //         )
            // },

            upload(vuexContext, payload) {
                // console.log(vuexContext)
                //console.log(payload.requirements)
                const postUrl = process.env.dbUrl + '/upload/';
                axios.request({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': payload.token,
                    },
                    url: postUrl,
                    data: {
                        uploadDate: payload.uploadDate,
                        description: payload.description,
                        contentType: payload.contentType,
                        mobileNo: payload.mobileNo,
                        medicalInstitution: payload.medicalInstitution,
                        state: payload.state,
                        email: payload.email,
                        organisationId: payload.organisationId,
                        requirements: payload.requirements,
                        role: 'Hospital-Data Manager'
                    }
                }).then((result) => {
                    //console.log(result)
                    //vuexContext.error(e)
                    this.$router.push('/dashboard');
                }).catch((e) =>
                    console.log(e))
            },


            async uploadData(vuexContext, payload) {
                //console.log("in upload-data");
                // console.log(payload.requirements);
                // console.log(payload.token)
                const postUrl = '/api/dataUpload/upload';
                await axios.request({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': payload.token,

                    },
                    url: postUrl,
                    data: {
                        uploadDate: payload.uploadDate,
                        description: payload.description,
                        contentType: payload.contentType,
                        mobileNo: payload.mobileNo,
                        medicalInstitution: payload.medicalInstitution,
                        state: payload.state,
                        email: payload.email,
                        organisationId: payload.organisationId,
                        requirements: payload.requirements,
                        role: 'Hospital-Data Manager'
                    }
                }).then((result) => {
                    //is response is 2**
                    this.$router.push('/dashboard');
                }).catch((e) => {
                    console.log('Encountered Error');
                })
            },
            initAuth(vuexContext, req) {
                //console.log("Running")
                //console.log(req)
                if (req) {
                    //console.log('Here in cookies')
                    if (!req.headers.cookie) {
                        //console.log('TOken not found')
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith('access_token='))
                    if (!jwtCookie)
                        return;
                    const token = jwtCookie.split('=')[1];
                    //console.log('Token Found');
                    //console.log(token)
                    vuexContext.commit('setToken', token);
                }
            }

        },
        getters: {
            getLoadedData(state) {
                return state.loadedData;
            },
            getOrgId(state) {
                //console.log('here');
                return state.organisationId;
            }
        }
    })
}

export default createStore;