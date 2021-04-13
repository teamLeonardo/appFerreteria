import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputNumber, Loader, Modal, Placeholder, SelectPicker } from "rsuite"
import { getDataArticulo } from "../articulo/state"
import { editDetaillVenta } from "./state"

export default ({ show, close, newdata, initData }) => {
    const [data, setdata] = useState({})
    const [dataArticle, setDataArticle] = useState([])

    useEffect(() => {
        const get = async () => {
            setDataArticle([... await getDataArticulo()].map(value => ({ label: value.nombre, value: value }), []));
            const d = {
                ...initData,
                articulo: initData.articulo ?
                    { label: initData.articulo.nombre, value: initData.articulo } :
                    {},
                precio: initData.articulo ?
                    initData.articulo.precio :
                    0
            }
            setdata(d)
        }
        get()
    }, [initData])


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

    const { Paragraph } = Placeholder;
    return <Modal overflow show={show} onHide={() => { close() }}>
        <Modal.Header>
            <Modal.Title>Actualizar detalle de compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                (Object.keys(data).length <= 0 && dataArticle.length <= 0)
                    ?
                    <Paragraph rows={8}>
                        <Loader center content="loading" />
                    </Paragraph>
                    :
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
                                                const d = await editDetaillVenta(data._id, data)
                                                newdata(d)
                                                close()
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                    }
                                    appearance="primary"
                                >
                                    Actualizar
                        </Button>
                                <Button onClick={() => { close() }} appearance="default">Cancelar</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
            }

        </Modal.Body>
    </Modal>
}