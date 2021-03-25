
import { useHistory, useLocation } from 'react-router';
import { ROUTER , PATH_APP} from '../pages/router';
// import * from "r"
import { Container, Header, Content, Sidebar, Nav, Dropdown, Sidenav, Icon } from 'rsuite';


export default ({ children }) => {

    let { pathname } = useLocation()
    let { push } = useHistory()
    let ar = Object.values(ROUTER.app.page).map(value => value.split(PATH_APP)[1] !== "dashboard" ? value.split(PATH_APP)[1] : null)
    let validacion = ar.indexOf(pathname.split(PATH_APP)[1]) > -1 ? "manteniminento" : "3"
    return (
        <div className="show-fake-browser sidebar-page" style={{ height: "100% !important" }}  >
            <Container style={{ height: "100% !important" }}>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={true ? 260 : 56}
                    collapsible
                    style={{ height: "100%" }}
                >
                    <Sidenav defaultOpenKeys={[validacion]} expanded={true} appearance="subtle">

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
                                    trigger="hover"
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
