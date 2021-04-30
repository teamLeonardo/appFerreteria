import { IonReactRouter } from '@ionic/react-router';
import LayoutDashboard from "../components/LayoutDashboard";
import "./style.css"
import { ROUTER } from "./router";
import Cliente from "./app/cliente";
import Categoria from "./app/categoria";
import Presentacion from "./app/presentacion";
import Articulo from "./app/articulo";
import Personal from "./app/personal";
import Provedor from "./app/provedor";
import Compra from "./app/compra";
import Venta from "./app/venta";
import Login from "./login";
import Root from "../seguridad/root";
import AuthContextProvider from "../state/session";
import SegurityRouter from "../seguridad/segurityRoot";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from 'react-router';
import Dashboard from './app/dashboard';

export default () => {
    return <AuthContextProvider>
        <IonReactRouter>
            <IonRouterOutlet>
                <SegurityRouter type="public" exact={false} path={ROUTER.login.page} component={() => <Login />} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.dashboard} component={() => <LayoutDashboard><Dashboard /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.articulo} component={() => <LayoutDashboard><Articulo /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.venta} component={() => <LayoutDashboard><Venta /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.cliente} component={() => <LayoutDashboard><Cliente /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.categoria} component={() => <LayoutDashboard><Categoria /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.presentacion} component={() => <LayoutDashboard><Presentacion /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.personal} component={() => <LayoutDashboard><Personal /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.provedor} component={() => <LayoutDashboard><Provedor /></LayoutDashboard>} />
                <SegurityRouter type="private" exact={true} path={ROUTER.app.page.compra} component={() => <LayoutDashboard><Compra /></LayoutDashboard>} />
                <Route exact path="/" render={() => <Redirect to={ROUTER.login.page} />} />
            </IonRouterOutlet>
        </IonReactRouter>
    </AuthContextProvider>


}