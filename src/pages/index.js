// import 
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import LayoutDashboard from "../components/LayoutDashboard";
import "./style.css"
import { ROUTER } from "./router";
import Cliente from "./app/cliente";
import Categoria from "./app/categoria";
import Presentacion from "./app/presentacion";
import Articulo from "./app/articulo";
// import Dashboard from "./app/dashboard";
// import Cliente from "./app/cliente";

const RouterValidate = ({ component: Component, estado, ...rest }) => {

    const user_state = true
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);


    if (estado === 'private' && !user_state) {

        return <Redirect to="/" />;

    } else if (estado === 'public' && user_state) {

        return <Redirect to={ROUTER.app.page.dashboard} />;

    }


    return <Route {...rest} render={props => (
        <LayoutDashboard>
            <Component {...props} />
        </LayoutDashboard>

    )}
    />

}

export default () => {
    return <Router>
        <Switch>

            <RouterValidate estado="public" path={ROUTER.login.page} component={() => <div>login <Link to={ROUTER.app.page.dashboard} > go to  dash</Link></div>} />
            <RouterValidate estado="public" path={ROUTER.register.page} component={() => <div>register <Link to={ROUTER.app.page.dashboard} > go to  dash</Link></div>} />
            <RouterValidate estado="private" path={ROUTER.app.page.dashboard} component={() => <div>app</div>} />
            <RouterValidate estado="private" path={ROUTER.app.page.articulo} component={() => <Articulo />} />
            <RouterValidate estado="private" path={ROUTER.app.page.venta} component={() => <div>app</div>} />
            <RouterValidate estado="private" path={ROUTER.app.page.cliente} component={() => <Cliente />} />
            <RouterValidate estado="private" path={ROUTER.app.page.categoria} component={() => <Categoria />} />
            <RouterValidate estado="private" path={ROUTER.app.page.presentacion} component={() => <Presentacion />} />
            <RouterValidate estado="private" path={ROUTER.app.page.personal} component={() => <div>app</div>} />
            <RouterValidate estado="private" path={ROUTER.app.page.provedor} component={() => <div>app</div>} />
            <RouterValidate estado="private" path={ROUTER.app.page.compra} component={() => <div>app</div>} />
            <Redirect to={ROUTER.login.page} />
        </Switch>
    </Router>

}