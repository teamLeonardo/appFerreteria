import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Drawer, Form, FormControl, FormGroup, HelpBlock, Input } from "rsuite"
import { editCategoria } from "./state"

export default ({ state, hide, datos, newdata }) => {

    const [formva, setFormVa] = useState()

    useEffect(() => {
        setFormVa(datos)
    }, [datos])


    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form layout="horizontal" onChange={(value) => setFormVa(value)} formValue={formva}  >
            <Drawer.Header>
                <Drawer.Title>Editar Categoria</Drawer.Title>
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
                                newdata(await editCategoria(datos._id, formva))
                                hide()
                            }}
                            appearance="primary"
                        >Corregir</Button>
                        <Button onClick={() => { hide() }} appearance="default">Cancelar</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Drawer.Footer>
        </Form>
    </Drawer>
}