import Aplify, {Auth as AmplifyAuth, Hub} from "aws-amplify"
import store from "../../store";
import {setUser} from "../../actions/user";

class Auth {
    constructor() {
        Aplify.configure({
            Auth: {
                mandatorySignIn: true,
                region: process.env.REACT_APP_AWS_REGION,
                userPoolId: process.env.REACT_APP_AWS_CONGNITO_USER_POOL,
                userPoolWebClientId: process.env.REACT_APP_AWS_CONGNITO_APP_CLIENT_ID
            }
        })

        const {dispatch} = store

        this.get().then((user) => {
            dispatch(setUser(user))
        })
        this.listener(store.dispatch)
    }

    listener = (dispatch) => {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case "signIn":
                    dispatch(setUser(data.payload.data))
                    break;
                case "signOut":
                    dispatch(setUser(null))
                    break
            }
        })
    }

    get = async () => {
        let user = null
        try {
            user = await AmplifyAuth.currentAuthenticatedUser()
        } catch (e) {
            console.warn(e)
        }
        return user
    }

    login = async (email, password) => {
        try {
            await AmplifyAuth.signIn(email, password)
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    logout = async () => {
        await AmplifyAuth.signOut()
    }

    register = async (name, email, password) => {
        try {
            await AmplifyAuth.signUp({
                username: name,
                password: password,
                attributes: {
                    email: email
                }
            })
            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    forgotPassword = async username => {
        try {
            await AmplifyAuth.forgotPassword(username)

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    confirmForgot = async (username, code, password) => {
        try {
            await AmplifyAuth.forgotPasswordSubmit(username, code, password)

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }
}

export default Auth