import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputNumber, Modal, SelectPicker } from "rsuite"
import { getDataArticulo } from "../articulo/state"
import { addDetaillVenta, editVenta } from "./state"

export default ({ show, close, newdata, doc , newDataVenta }) => {
    const [data, setdata] = useState({
        articulo: {},
        precio: 0,
        cantidad: 1,
        descuento: 0,
        total: 0,
    })
    const [dataArticle, setDataArticle] = useState([])

    useEffect(() => {
        const get = async () => {
            setDataArticle([... await getDataArticulo()].map(value => ({ label: value.nombre, value: value }), []));
        }
        get()
    }, [doc])

    const limpiar = () => {
        setdata({
            articulo: {},
            precio: 0,
            cantidad: 0,
            descuento: 0,
            total: 0,
        })
    }

    const handleChange = (value) => {
        let desIgv = 0
        if (value.articulo != null) {

            const d = ((parseFloat(value.articulo.precio) + (parseFloat(value.articulo.precio) * 0.18)) * value.cantidad)
            desIgv = d - value.descuento
        }
        setdata({
            ...value,
            total: parseFloat(desIgv).toFixed(2),
            precio: (value.articulo != null && value.articulo.precio) ?
                parseFloat(value.articulo.precio) + (parseFloat(value.articulo.precio) * 0.18)
                :
                value.precio
        })

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
                    <ControlLabel>Precio</ControlLabel>
                    <FormControl
                        name="precio"
                        accepter={InputNumber}
                        disabled={true}
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
                    <ControlLabel>Descuento</ControlLabel>
                    <FormControl
                        name="descuento"
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
                                        const d = await addDetaillVenta({ ...data, venta: doc })
                                        const newDatosVenta = await editVenta(doc._id, { ...doc, total: (doc.total + d.total) })
                                        newDataVenta(newDatosVenta)
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