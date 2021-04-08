import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Drawer, Form, FormControl, FormGroup, HelpBlock, Input, InputNumber, SelectPicker, Uploader } from "rsuite"
import { addArticulo, getDataExtra } from "./state"

const styles = {
    lineHeight: '200px'
};

export default ({ state, hide, newdata }) => {
    const [formva, setFormVa] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        categoria: {},
        presentacion: {},
        stock: 0,
        precio: 0
    })

    const [datosCategori, setDatosCategori] = useState([])
    const [datosPresentacion, setDatosPresentacion] = useState([])

    useEffect(() => {
        const get = async () => {
            const { categoria, presentacion } = await getDataExtra()
            setDatosCategori([...categoria].map((valu) => ({ label: valu.nombre, value: valu }), []))
            setDatosPresentacion([...presentacion].map((valu) => ({ label: valu.nombre, value: valu }), []))
        }
        get()
    }, [])

    return <Drawer full size="lg" placement="right" show={state} onHide={() => { hide() }}>
        <Form
            layout="horizontal"
            onChange={(value) => setFormVa(value)}
            formValue={formva}
        >
            <Drawer.Header>
                <Drawer.Title>Agregar Articulo</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>

                <FormGroup>
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl name="nombre" />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Descripcion</ControlLabel>
                    <FormControl name="descripcion" accepter={Input} componentClass="textarea" rows={3} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Imagenes</ControlLabel>
                    <FormControl
                        name="imagen"
                        accepter={Uploader}
                        // action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-text"
                        multiple={false}
                        maxPreviewFileSize={5242880}
                    >
                        <div style={styles}>Arrastre la imagena aqui. o click</div>
                    </FormControl>
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Categoria</ControlLabel>
                    <FormControl
                        name="categoria"
                        accepter={SelectPicker}
                        data={datosCategori}
                        style={{ width: 120 }}
                        searchable={false}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Presentacion</ControlLabel>
                    <FormControl
                        name="presentacion"
                        accepter={SelectPicker}
                        data={datosPresentacion}
                        style={{ width: 120 }}
                        searchable={false}
                    />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Stock</ControlLabel>
                    <FormControl name="stock" accepter={InputNumber} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Precio</ControlLabel>
                    <FormControl name="precio" accepter={InputNumber} />
                    <HelpBlock tooltip>Requerido</HelpBlock>
                </FormGroup>

            </Drawer.Body>
            <Drawer.Footer>
                <FormGroup>
                    <ButtonToolbar>
                        <Button
                            type="submit"
                            onClick={async () => {
                                try {
                                    const d = await addArticulo(formva)
                                    hide()
                                    setFormVa({})
                                    newdata(d);
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                            appearance="primary"
                        >
                            Agregar
                        </Button>
                        <Button onClick={() => hide()} appearance="default">Cancelar</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Drawer.Footer>
        </Form>
    </Drawer>
}