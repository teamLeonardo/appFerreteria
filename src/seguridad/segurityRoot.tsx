import React from "react"
import {
    Route,
    Redirect
} from "react-router-dom";
import { ROUTER } from "../pages/router";

import { AuthContext } from '../state/session';



class SegurityRouter extends React.Component<any> {

    render() {

        let { type, ...rest } = this.props

        let { user } = this.context

        if (type === 'private' && (!user || Object.keys(user).length <= 0)) {

            return <Redirect to="/" />;

        } else if (type === 'public' && (user ? Object.keys(user).length > 0 : false)) {

            return <Redirect to={ROUTER.app.page.dashboard} />;

        }
        return <Route {...rest} />
    }
}

SegurityRouter.contextType = AuthContext

export default SegurityRouter
