import { useEffect, useState } from "react";
import { Avatar, Button, Table } from "rsuite";
import { BASEURL } from "../../../config.axios";
import AddArticulo from "./AddArticulo";
import EditArticulo from "./EditArticulo";
// import AddCategoria from "../categoria/AddCategoria";
import { deletArticulo, getDataArticulo } from "./state";

export default () => {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        const get = async () => {
            setData(await getDataArticulo())
        }
        get()
    }, [])

    return <div style={{ width: "100%" }}>
        <Button onClick={() => setShow(true)} appearance="primary">
            agregar
        </Button>

        <AddArticulo
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, ...[res]])
            }}
        />

        <EditArticulo
            state={show2}
            hide={() => setShow2(false)}
            datos={editData}
            newdata={(res) => {
                console.log("respuesta modificada", [...data.filter((item) => item._id !== res._id), res]);
                setData([res, ...data.filter((item) => item.id !== res.id)])
            }}
        />

        <Table
            style={{ width: "100%" }}
            virtualized
            data={data}
        >
            <Table.Column width={100} fixed >
                <Table.HeaderCell>Imagen</Table.HeaderCell>
                <Table.Cell dataKey="imagen"  >
                    {
                        im => im.imagen && <Avatar src={BASEURL + im.imagen.formats.thumbnail.url} size="sm" />
                    }
                </Table.Cell>
            </Table.Column>

            <Table.Column width={100}>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.Cell dataKey="nombre" />
            </Table.Column>

            <Table.Column width={150} >
                <Table.HeaderCell>Descripcion</Table.HeaderCell>
                <Table.Cell dataKey="descripcion" />
            </Table.Column>

            <Table.Column width={150} >
                <Table.HeaderCell>Presentacion</Table.HeaderCell>
                <Table.Cell dataKey="presentacion" >
                    {
                        im => im.presentacion.nombre && im.presentacion.nombre
                    }
                </Table.Cell>
            </Table.Column>

            <Table.Column width={100} >
                <Table.HeaderCell>Categoria</Table.HeaderCell>
                <Table.Cell dataKey="categoria" >
                    {
                        im => im.categoria.nombre && im.categoria.nombre
                    }
                </Table.Cell>
            </Table.Column>

            <Table.Column width={150} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.Cell>
                    {rowData => {
                        return (
                            <span>
                                <a onClick={() => { setEditData(rowData); setShow2(true) }}> Editar </a> |{' '}
                                <a onClick={async () => {
                                    try {
                                        await deletArticulo(rowData.id)
                                        setData(data.filter((item) => item.id != rowData.id))
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}> Remover </a>
                            </span>
                        );
                    }}
                </Table.Cell>
            </Table.Column>
        </Table>
    </div>
}