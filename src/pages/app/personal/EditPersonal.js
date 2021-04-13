import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, DatePicker, Drawer, Form, FormControl, FormGroup, HelpBlock, InputNumber, SelectPicker } from "rsuite"
import {  editPersonal } from "./state"

export default ({ state, hide, datos, newdata }) => {
    const [formva, setFormVa] = useState()
    useEffect(() => {
        setFormVa(datos)
    }, [datos])


    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form layout="horizontal" onChange={(value) => setFormVa(value)} formValue={formva}  >
            <Drawer.Header>
                <Drawer.Title>Editar Personal</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <FormGroup>
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl name="nombre" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Apellido</ControlLabel>
                    <FormControl name="apellido" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Sexo</ControlLabel>
                    <FormControl
                        name="sexo"
                        accepter={SelectPicker}
                        data={
                            [
                                {
                                    "label": "Hombre",
                                    "value": "hombre",

                                },
                                {
                                    "label": "Mujer",
                                    "value": "mujer",
                                },
                            ]}
                        searchable={false}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Fecha de nacimiento</ControlLabel>
                    <FormControl name="fecha_nacimiento" accepter={DatePicker} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>numero documento</ControlLabel>
                    <FormControl name="num_doc" accepter={InputNumber} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Direccion</ControlLabel>
                    <FormControl name="direccion" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Telefono</ControlLabel>
                    <FormControl name="telefono" accepter={InputNumber} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="email" type="email" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Acceso</ControlLabel>
                    <FormControl
                        name="aceso"
                        accepter={SelectPicker}
                        data={
                            [
                                {
                                    "label": "chofer",
                                    "value": "chofer",

                                },
                                {
                                    "label": "almacen",
                                    "value": "almacen",
                                },
                                {
                                    "label": "venta",
                                    "value": "venta",
                                },
                                {
                                    "label": "todo",
                                    "value": "todo",
                                },
                            ]}
                        searchable={false}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Usuario</ControlLabel>
                    <FormControl name="usuario" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl name="password" type="password" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

            </Drawer.Body>
            <Drawer.Footer>
                <FormGroup>
                    <ButtonToolbar>
                        <Button
                            onClick={async () => {
                                newdata(await editPersonal(datos._id, formva))
                                hide()
                            }}
                            appearance="primary"
                        >Submit</Button>
                        <Button onClick={() => { hide() }} appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Drawer.Footer>
        </Form>
    </Drawer>
}