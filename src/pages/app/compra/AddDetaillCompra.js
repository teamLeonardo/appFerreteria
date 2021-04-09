import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputNumber, Modal, SelectPicker } from "rsuite"
import { getDataArticulo } from "../articulo/state"

export default ({ show, close, newdata, docCompra }) => {
    const [data, setdata] = useState({
        precio_compra: 0,
        articulo: {},
        cantidad: 0,
        total: 0
    })
    const [dataArticle, setDataArticle] = useState([])
    useEffect(() => {
        const get = async () => {
            setDataArticle([... await getDataArticulo()].map(value => ({ label: value.nombre, value: value }), []));
        }
        get()
    }, [])

    const limpiar = () => {
        setdata({})
    }

    const handleChange = (value) => {
        const igv = parseFloat(value.precio_compra) * (docCompra.igv / 100)
        const d = (parseFloat(value.precio_compra) + igv) * value.cantidad
        setdata({ ...value, total: d })
    }

    return <Modal overflow show={show} onHide={() => { close(); limpiar() }}>
        <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form
                layout="horizontal"
                onChange={handleChange}
                formValue={data}
            >

                <FormGroup>
                    <ControlLabel>Precio de compra</ControlLabel>
                    <FormControl
                        name="precio_compra"
                        accepter={InputNumber}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Articulo</ControlLabel>
                    <FormControl
                        name="articulo"
                        accepter={SelectPicker}
                        data={dataArticle}
                        style={{ width: 120 }}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Cantidad</ControlLabel>
                    <FormControl
                        name="cantidad"
                        accepter={InputNumber}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Total</ControlLabel>
                    <FormControl
                        name="total"
                        accepter={InputNumber}
                        disabled
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ButtonToolbar>
                        <Button
                            type="submit"
                            onClick={
                                async () => {
                                    try {
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                            appearance="primary"
                        >
                            Agregar
                        </Button>
                        <Button onClick={() => { close(); limpiar() }} appearance="default">Cancelar</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        </Modal.Body>
    </Modal>
}