
import { useHistory, useLocation } from 'react-router';
import { ROUTER, PATH_APP } from '../pages/router';
// import * from "r"
import { Container, Header, Content, Sidebar, Nav, Dropdown, Sidenav, Icon, Navbar } from 'rsuite';
import { useState } from 'react';

const NavToggle = ({ expand, onChange }) => {
    let { push } = useHistory()
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement="topStart"
                        trigger="click"
                        renderTitle={children => {
                            return <Icon style={{
                                width: 56,
                                height: 56,
                                lineHeight: '56px',
                                textAlign: 'center'
                            }} icon="cog" />;
                        }}
                    >
                        <Dropdown.Item
                            onSelect={() => {
                                if (localStorage.getItem("user")) {

                                    localStorage.removeItem("user");
                                    push("/");
                                    window.location = "/"
                                }
                            }}
                        >Cerrar session</Dropdown.Item>
                    </Dropdown>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};
export default ({ children }) => {

    let { pathname } = useLocation()
    let [exp, setExp] = useState(false)
    let { push } = useHistory()
    let ar = Object.values(ROUTER.app.page).map(value => value.split(PATH_APP)[1] !== "dashboard" ? value.split(PATH_APP)[1] : null)
    let validacion = ar.indexOf(pathname.split(PATH_APP)[1]) > -1 ? "manteniminento" : "3"


    return (
        <div className="show-fake-browser sidebar-page" style={{ height: "100% !important" }}  >
            <Container style={{ height: "100% !important" }}>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={exp ? 260 : 56}
                    collapsible

                    style={{ height: "100%" }}
                >
                    <Sidenav defaultOpenKeys={[validacion]} expanded={exp} style={{ height: exp ? "calc(100% - 56px)" : "calc(100% - 113px)" }} appearance="inverse">

                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item
                                    eventKey={ROUTER.app.page.dashboard}
                                    active={pathname === ROUTER.app.page.dashboard ? true : false}
                                    icon={<Icon icon="dashboard" />}
                                    onSelect={() => push(ROUTER.app.page.dashboard)}
                                >
                                    {ROUTER.app.page.dashboard.split(PATH_APP)[1]}
                                </Nav.Item>

                                <Dropdown
                                    eventKey="manteniminento"
                                    trigger="click"
                                    title="manteniminento"
                                    icon={<Icon icon="magic" />}
                                    placement="rightStart"
                                >
                                    {
                                        Object.values(ROUTER.app.page).map((value, indx) => {
                                            return value.split(PATH_APP)[1] !== "dashboard" && (
                                                <Dropdown.Item
                                                    key={indx}
                                                    eventKey={value}
                                                    active={pathname === value ? true : false}
                                                    onSelect={() => push(value)}
                                                    icon={<Icon icon="group" />}
                                                >
                                                    {value.split(PATH_APP)[1]}
                                                </Dropdown.Item>
                                            )
                                        })
                                    }

                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={exp} onChange={() => setExp(!exp)} />
                </Sidebar>

                <Container >
                    <Header>
                        <h2>{pathname.split("/app/")[1]}</h2>
                    </Header>
                    <Content>{children}</Content>
                </Container>
            </Container>
        </div>
    );

}
