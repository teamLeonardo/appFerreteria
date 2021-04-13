import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputNumber, Loader, Modal, Placeholder, SelectPicker } from "rsuite"
import { getDataArticulo } from "../articulo/state"
import { addDetaillCompra, editDetaillCompra } from "./state"

export default ({ show, close, newdata, initData }) => {
    const [data, setdata] = useState({})
    const [dataArticle, setDataArticle] = useState([])

    useEffect(() => {
        const get = async () => {
            setDataArticle([... await getDataArticulo()].map(value => ({ label: value.nombre, value: value }), []));
            setdata(initData)
        }
        get()
    }, [initData])



    const handleChange = (value) => {
        const d = (parseFloat(value.precio_compra)) * value.cantidad
        setdata({ ...value, total: d })
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
                                                const d = await editDetaillCompra(data._id,data)
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