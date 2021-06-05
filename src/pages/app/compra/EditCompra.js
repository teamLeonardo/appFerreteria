import { useEffect, useState } from "react"
import { Button, ButtonToolbar, Col, ControlLabel, DatePicker, Drawer, Form, FormControl, FormGroup, Grid, HelpBlock, Input, InputNumber, Row, SelectPicker, Uploader } from "rsuite"
import { getDataProvedor } from "../provedor/state"
import { getDataPersonal } from "../personal/state"
import { addCompra } from "./state";
import DetailCompra from "./DetailCompra";
const styles = {
    lineHeight: '200px'
};

export default ({ state, hide, newdata, datos }) => {
    const [formva, setFormVa] = useState({})
    const [datosProvedor, setDatosProvedor] = useState([])
    const [datosTrabajador, setDatosTrabajador] = useState([])

    const [datosCompra, setDatosCompras] = useState({})

    const selecDa = [
        {
            "label": "especiales",
            "value": "especiales",
        },
        {
            "label": "anticipadas",
            "value": "anticipadas",
        },
        {
            "label": "temporales",
            "value": "temporales",
        },
        {
            "label": "ciclicas",
            "value": "ciclicas",
        },
        {
            "label": "urgencia",
            "value": "urgencia",
        },
        {
            "label": "oportunas",
            "value": "oportunas",
        },
        {
            "label": "rutinarias",
            "value": "rutinarias",
        }
    ]
    useEffect(() => {
        const get = async () => {
            setDatosProvedor([... await getDataProvedor()].map((valu) => ({ label: valu.razonSocial, value: valu }), []));
            setDatosTrabajador([... await getDataPersonal()].map((valu) => ({ label: valu.nombre, value: valu }), []));
            setFormVa(datos)
            setDatosCompras(datos)
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
            <Drawer.Title>Realizar un Compra</Drawer.Title>
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
                                <ControlLabel>Provedor</ControlLabel>
                                <FormControl
                                    name="provedor"
                                    accepter={SelectPicker}
                                    data={datosProvedor}
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
                                <ControlLabel>tipo compra</ControlLabel>
                                <FormControl
                                    name="tipo_compra"
                                    accepter={SelectPicker}
                                    data={selecDa}
                                    style={{ width: 120 }}
                                    searchable={false}
                                />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Fecha</ControlLabel>
                                <FormControl name="fecha" accepter={DatePicker} />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>IGV porcentaje</ControlLabel>
                                <FormControl name="igv" accepter={InputNumber} />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Serie</ControlLabel>
                                <FormControl name="serie" accepter={InputNumber} />
                                <HelpBlock tooltip>Requerido</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button
                                        type="submit"
                                        //disabled={Object.keys(datosCompra).length <= 0 ? false : true}
                                        onClick={
                                            async () => {
                                                try {
                                                    const d = await addCompra(formva)
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
                                        Actualizar compra
                        </Button>
                                    <Button onClick={() => closeDr()} appearance="default">Cancelar</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <DetailCompra data={datosCompra} edit={true} />
                    </Col>
                </Row>
            </Grid>

        </Drawer.Body>
        <Drawer.Footer>

        </Drawer.Footer>
    </Drawer>
}