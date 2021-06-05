import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputNumber, Modal, SelectPicker } from "rsuite"
import { getDataArticulo } from "../articulo/state"
import { addDetaillCompra, editCompra } from "./state"

export default ({ show, close, newdata, docCompra, newDataCompra }) => {
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
    }, [docCompra])

    const limpiar = () => {
        setdata({
            precio_compra: 0,
            articulo: {},
            cantidad: 0,
            total: 0
        })
    }

    const handleChange = (value) => {
        const d = (parseFloat(value.precio_compra)) * value.cantidad
        setdata({ ...value, total: d })
    }

    return <Modal overflow show={show} onHide={() => { close(); limpiar() }}>
        <Modal.Header>
            <Modal.Title>Agregar detalle de compra</Modal.Title>
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
                                        const d = await addDetaillCompra({ ...data, ingreso: docCompra })

                                        const newDatosCompra = await editCompra(docCompra._id, { ...docCompra, total: (docCompra.total + d.total) })
                                        newDataCompra(newDatosCompra)
                                        console.log(d);
                                        newdata(d)
                                        limpiar()
                                        close()
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