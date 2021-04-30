import React from "react"


// import { USER } from "../services/api";

export const AuthContext = React.createContext({});

export const AuthContextConsumer = AuthContext.Consumer;

export default class AuthContextProvider extends React.Component {

    state = {
        user: null
    }

    componentDidMount() {
        const localS = localStorage.getItem("user")
        if (localS) {
            const local = JSON.parse(localS)
            this.setState({ user: local })
        }
    }


    componentWillUnmount() {
        if (this.state.user !== null) {
            this.setState({ user: null })
        }
    }

    LoginInt = (payload: any) => {
        this.setState({ user: payload })
        localStorage.setItem("user", JSON.stringify(payload))
    }
    render() {

        return (

            <AuthContext.Provider
                value={{
                    ...this.state,
                    LoginInt: this.LoginInt
                }}
            >
                {this.props.children}
            </AuthContext.Provider>

        )

    }

};



