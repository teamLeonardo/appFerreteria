import { useState } from "react"
import { Button, ButtonToolbar, ControlLabel, DatePicker, Drawer, Form, FormControl, FormGroup, HelpBlock, InputNumber, SelectPicker } from "rsuite"
import { addCliente } from "./state"

export default ({ state, hide, newdata }) => {
    const [formva, setFormVa] = useState({
        nombre: "",
        apellido: "",
        sexo: "",
        fecha_nacimiento: Date(),
        tipo_docu: "",
        num_docu: "",
        direccion: "",
        telefono: null,
        email: ""
    })
    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form layout="horizontal" onChange={(value) => setFormVa(value)} formValue={formva}  >
            <Drawer.Header>
                <Drawer.Title>Agregar cliente</Drawer.Title>
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
                    <ControlLabel>Tipo documento</ControlLabel>
                    <FormControl
                        name="tipo_docu"
                        accepter={SelectPicker}
                        data={
                            [
                                {
                                    "label": "DNI",
                                    "value": "DNI",

                                },
                                {
                                    "label": "RUC",
                                    "value": "RUC",
                                },
                            ]}
                        searchable={false}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>numero documento</ControlLabel>
                    <FormControl name="num_docu" accepter={InputNumber} />
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


            </Drawer.Body>
            <Drawer.Footer>
                <FormGroup>
                    <ButtonToolbar>
                        <Button
                            onClick={async () => {
                                try {
                                    const d = await addCliente(formva)
                                    console.log(d);
                                    newdata(d);
                                    hide()
                                    setFormVa({})
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                            appearance="primary"
                        >Submit</Button>
                        <Button onClick={() => hide()} appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Drawer.Footer>
        </Form>
    </Drawer>
}