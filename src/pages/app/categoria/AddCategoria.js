import { useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Drawer, Form, FormControl, FormGroup, HelpBlock, Input } from "rsuite"
import { addCategoria } from "./state"

export default ({ state, hide, newdata }) => {
    const [formva, setFormVa] = useState({
        nombre: "",
        descripcion: "",
    })
    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form layout="horizontal" onChange={(value) => setFormVa(value)} formValue={formva}  >
            <Drawer.Header>
                <Drawer.Title>Agregar Categoria</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <FormGroup>
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl name="nombre" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Descripcion</ControlLabel>
                    <FormControl name="descripcion" accepter={Input} componentClass="textarea" rows={3} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
            </Drawer.Body>
            <Drawer.Footer>
                <FormGroup>
                    <ButtonToolbar>
                        <Button
                            onClick={async () => {
                                try {
                                    const d = await addCategoria(formva)
                                    hide()
                                    setFormVa({})
                                    newdata(d);
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                            appearance="primary"
                        >
                            Agregar
                        </Button>
                        <Button onClick={() => hide()} appearance="default">Cancelar</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Drawer.Footer>
        </Form>
    </Drawer>
}