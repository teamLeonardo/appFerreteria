import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { Button, ButtonToolbar, Container, Content, ControlLabel, FlexboxGrid, Footer, Form, FormControl, FormGroup, Header, Navbar, Panel } from "rsuite"
import instance from "../../config.axios"
import { AuthContext } from "../../state/session"

export default () => {

    const { LoginInt } = useContext(AuthContext)
    const { push } = useHistory()
    const [formva, setFormVa] = useState({
        usuario: null,
        password: null
    })
    const validar = async () => {
        try {
            const data = (await instance.post("/trabajadors/auth", formva)).data
            console.log(data);
            LoginInt(data)
            push("/app/dashboard")
        } catch (error) {

        }
    }
    return (
        <div className="show-fake-browser login-page">

            <Container>
                <br />
                <br />
                <br />
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={12}>
                            <Panel header={<h3>Login</h3>} bordered>
                                <Form fluid formValue={formva} onChange={(n) => setFormVa(n)}>
                                    <FormGroup>
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl name="usuario" />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl name="password" type="password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <ButtonToolbar>
                                            <Button onClick={validar} appearance="primary">Iniciar</Button>
                                            {/* <Button appearance="link">Forgot password?</Button> */}
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                            </Panel>    
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <Footer>Footer</Footer>
            </Container>
        </div>
    )
}