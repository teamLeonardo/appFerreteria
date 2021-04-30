import React from 'react';
import { IonSpinner } from '@ionic/react';

import { AuthContext } from '../state/session';

class Root extends React.Component {

    render() {

        const {
            children,
        } = this.props;

        const {
            user
        } = this.context;


        // if (user === null) {

        //     return <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
        //         <IonSpinner name="crescent" />
        //     </div>

        // }

        return children;

    };

}

Root.contextType = AuthContext;

export default Root;