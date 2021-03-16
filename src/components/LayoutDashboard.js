import { Layout, Menu } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router';
import { ROUTER } from '../pages/router';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Content, Footer, Sider } = Layout;


export default ({ children }) => {

    let { pathname } = useLocation()
    let { push } = useHistory()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
                    <Menu.Item key={ROUTER.app.page.dashboard} icon={<UserOutlined />} onClick={() => push(ROUTER.app.page.dashboard)}>
                        {ROUTER.app.page.dashboard.split("/app/")[1]}
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Mantenimiento">
                        <Menu.Item key={ROUTER.app.page.venta} onClick={() => push(ROUTER.app.page.venta)}>
                            {ROUTER.app.page.venta.split("/app/")[1]}
                        </Menu.Item>
                        <Menu.Item key={ROUTER.app.page.cliente} onClick={() => push(ROUTER.app.page.cliente)}>
                            {ROUTER.app.page.cliente.split("/app/")[1]}
                        </Menu.Item>
                        <Menu.Item key={ROUTER.app.page.compra} onClick={() => push(ROUTER.app.page.compra)}>
                            {ROUTER.app.page.compra.split("/app/")[1]}
                        </Menu.Item>

                        <Menu.Item key={ROUTER.app.page.personal} onClick={() => push(ROUTER.app.page.personal)}>
                            {ROUTER.app.page.personal.split("/app/")[1]}
                        </Menu.Item>
                        <Menu.Item key={ROUTER.app.page.provedor} onClick={() => push(ROUTER.app.page.provedor)}>
                            {ROUTER.app.page.provedor.split("/app/")[1]}
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout >
                <Content >
                    <div className="" style={{ margin: 24, padding: 24, minHeight: "calc(100% - 48px)", overflowy: "auto" }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </ Layout>
    );

}
