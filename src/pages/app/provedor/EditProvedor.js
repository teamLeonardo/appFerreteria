import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Drawer, Form, FormControl, FormGroup, HelpBlock, InputNumber, SelectPicker } from "rsuite"
import { editProvedor } from "./state"

export default ({ state, hide, datos, newdata }) => {
    const [formva, setFormVa] = useState()
    useEffect(() => {
        setFormVa(datos)
    }, [datos])


    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form layout="horizontal" onChange={(value) => setFormVa(value)} formValue={formva}  >
            <Drawer.Header>
                <Drawer.Title>Editar Provedor</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <FormGroup>
                    <ControlLabel>razon Social</ControlLabel>
                    <FormControl name="razonSocial" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>sector comercial</ControlLabel>
                    <FormControl name="sector_comercial" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>tipo documento</ControlLabel>
                    <FormControl
                        name="tipo_documento"
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
                    <FormControl name="num_doc" accepter={InputNumber} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Direccion</ControlLabel>
                    <FormControl name="direcccion" />
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
                                newdata(await editProvedor(datos._id, formva))
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