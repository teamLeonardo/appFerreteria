import { useEffect, useState } from "react"
import { Button, ButtonToolbar, ControlLabel, Drawer, Form, FormControl, FormGroup, HelpBlock, Input, InputNumber, SelectPicker, Uploader } from "rsuite"
import { BASEURL } from "../../../config.axios";
import { editArticulo, getDataExtra } from "./state"

const styles = {
    lineHeight: '200px'
};

export default ({ state, hide, datos, newdata }) => {

    const [formva, setFormVa] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        categoria: {},
        presentacion: {}
    })

    const [datosCategori, setDatosCategori] = useState([])

    const [datosPresentacion, setDatosPresentacion] = useState([])

    useEffect(() => {
        const get = async () => {
            const { categoria, presentacion } = await getDataExtra()
            setDatosCategori([...categoria].map((valu) => ({ label: valu.nombre, value: valu }), []));
            setDatosPresentacion([...presentacion].map((valu) => ({ label: valu.nombre, value: valu }), []));
            if (datos.imagen) {
                const { imagen: olimg, ...resto } = datos
                const imagen = {
                    name: olimg.formats.thumbnail.name,
                    fileKey: 1,
                    url: BASEURL + olimg.formats.thumbnail.url,
                }
                setFormVa({ imagen, ...resto })
            }
        }
        get()
    }, [datos])
    return Object.values(formva).length > 0 && datosCategori.length > 0 && datosPresentacion.length > 0 &&
        (
            <Drawer full size="lg" placement="right" show={state} onHide={() => { hide(); setFormVa({}) }}>
                <Form
                    layout="horizontal"
                    onChange={(value) => setFormVa(value)}
                    formValue={formva}
                >
                    <Drawer.Header>
                        <Drawer.Title>Editar Articulo</Drawer.Title>
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
                                defaultFileList={[formva.imagen]}
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

                        <FormGroup>
                            <ButtonToolbar>
                                <Button
                                    type="submit"
                                    onClick={async () => {
                                        try {
                                            const d = await editArticulo(formva.id, { ...formva, oldData: datos.imagen })

                                            hide()
                                            setFormVa({})
                                            newdata(d);
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}
                                    appearance="primary"
                                >
                                    Actualizar
                        </Button>
                                <Button onClick={() => hide()} appearance="default">Cancelar</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Drawer.Body>
                </Form>
            </Drawer >

        )
}