import Aplify, {Auth as AmplifyAuth, Hub} from "aws-amplify"
import store from "../../store";
import {setUser} from "../../actions/user";
import awsConfig from "../../aws-exports"

class Auth {
    constructor() {
        Aplify.configure(
            awsConfig
        )

        const {dispatch} = store

        this.listener(store.dispatch)

        this.get().then((user) => {
            dispatch(setUser(user))
        })
    }

    listener = (dispatch) => {
        Hub.listen('auth', async (data) => {
            switch (data.payload.event) {
                case "signIn":
                    const user = await this.get()
                    dispatch(setUser(user))
                    break;
                case "signOut":
                    dispatch(setUser(null))
                    break
                default:
                    console.log("Auth HUB event", data)
            }
        })
    }

    fb = () => {
        AmplifyAuth.federatedSignIn({provider: 'Facebook'})
    }

    google = () => {
        AmplifyAuth.federatedSignIn({provider: 'Google'})
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