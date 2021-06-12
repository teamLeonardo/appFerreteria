import { useEffect, useState } from "react"
import { Button, ButtonToolbar, Col, ControlLabel, DatePicker, Drawer, Form, FormControl, FormGroup, Grid, HelpBlock, Input, InputNumber, Row, SelectPicker, Uploader } from "rsuite"
import { getDataCliente } from "../cliente/state";
import { getDataPersonal } from "../personal/state"
import { addVenta } from "./state";
import ListDetalle from "./ListDetalle";

export default ({ state, hide, newdata, datos, newDA }) => {

    const [formva, setFormVa] = useState({})

    const [datosCliente, setDatosCliente] = useState([])
    const [datosTrabajador, setDatosTrabajador] = useState([])

    const [datosCompra, setDatosCompras] = useState({})

    useEffect(() => {
        const get = async () => {
            setDatosCliente([... await getDataCliente()].map((valu) => ({ label: valu.nombre, value: valu }), []));
            setDatosTrabajador([... await getDataPersonal()].map((valu) => ({ label: valu.nombre, value: valu }), []));
            setDatosCompras(datos)
            setFormVa(datos)
        }
        get()
    }, [datos])

    const closeDr = () => {
        setDatosCompras({})
        setFormVa({})
        hide()
    }

    return <Drawer full size="lg" placement="right" show={state} onHide={() => { closeDr() }}>

        <Drawer.Header>
            <Drawer.Title>Realizar un Venta</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>

            <Grid fluid>
                <Row >
                    <Col xs={12}>
                        <Form
                            layout="horizontal"
                            onChange={(value) => setFormVa(value)}
                            formValue={formva}
                        >

                            <FormGroup>
                                <ControlLabel>Clientes</ControlLabel>
                                <FormControl
                                    name="cliente"
                                    accepter={SelectPicker}
                                    data={datosCliente}
                                    style={{ width: 120 }}
                                    searchable={false}
                                />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>trabajador</ControlLabel>
                                <FormControl
                                    name="trabajador"
                                    accepter={SelectPicker}
                                    data={datosTrabajador}
                                    style={{ width: 120 }}
                                    searchable={false}
                                />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Fecha</ControlLabel>
                                <FormControl name="fecha" format="YYYY-MM-DD HH:mm:ss" accepter={DatePicker} />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ButtonToolbar>
                                    <Button
                                        type="submit"
                                        onClick={
                                            async () => {
                                                try {
                                                    const d = await addVenta(formva)
                                                    newdata(d);
                                                    setDatosCompras(d)
                                                } catch (error) {
                                                    console.log(error);
                                                    closeDr()
                                                }
                                            }
                                        }
                                        appearance="primary"
                                    >
                                        Actualizar Venta
                        </Button>
                                    <Button onClick={() => closeDr()} appearance="default">Cancelar</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <ListDetalle data={datosCompra} edit={true} newDA={newDA} />
                    </Col>
                </Row>
            </Grid>

        </Drawer.Body>
        <Drawer.Footer>

        </Drawer.Footer>
    </Drawer>
}