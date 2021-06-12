import { useEffect, useState } from "react"
import { Button, ButtonToolbar, Col, ControlLabel, DatePicker, Drawer, Form, FormControl, FormGroup, Grid, HelpBlock, Row, SelectPicker } from "rsuite"
import { getDataCliente } from "../cliente/state"
import { getDataPersonal } from "../personal/state"
import ListDetalle from "./ListDetalle"
import { addVenta } from "./state"

export default ({ state, hide, newdata }) => {
    const [formva, setFormVa] = useState({
        cliente: {},
        trabajador: {},
        fecha: new Date(),
        total: 0
    })
    const [datosCliente, setDatosCliente] = useState([])
    const [datosTrabajador, setDatosTrabajador] = useState([])

    const [datosVentas, setDatosVentas] = useState({})

    useEffect(() => {
        const get = async () => {
            setDatosCliente([... await getDataCliente()].map((valu) => ({ label: valu.nombre, value: valu }), []));
            setDatosTrabajador([... await getDataPersonal()].map((valu) => ({ label: valu.nombre, value: valu }), []));
        }
        get()
    }, [])

    const closeDr = () => {
        setDatosVentas({})
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
                                        disabled={Object.keys(datosVentas).length <= 0 ? false : true}
                                        onClick={
                                            async () => {
                                                try {
                                                    const d = await addVenta(formva)
                                                    newdata(d);
                                                    setDatosVentas(d)
                                                } catch (error) {
                                                    console.log(error);
                                                    closeDr()
                                                }
                                            }
                                        }
                                        appearance="primary"
                                    >
                                        Crear Venta
                        </Button>
                                    <Button onClick={() => closeDr()} appearance="default">Cancelar</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <ListDetalle data={datosVentas} edit={false} newDA={(re) => { console.log(re); }} />
                    </Col>
                </Row>
            </Grid>

        </Drawer.Body>
        <Drawer.Footer>

        </Drawer.Footer>
    </Drawer>
}