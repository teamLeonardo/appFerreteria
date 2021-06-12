import { useEffect, useState } from "react"
import { Button, Table } from "rsuite"
import AddDetalle from "./AddDetalle"
import EditDetalle from "./EditDetalle"
import { deletDetaillVenta, editDetaillVenta, getDataDetaillVenta } from "./state"

export default ({ data, edit ,newDA }) => {

    const [modalAdd, setModalAdd] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [dataEdit, setDataEdit] = useState({})

    const [datos, setDatos] = useState([])

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            if (edit) {
                const get = async () => {
                    const dd = await getDataDetaillVenta(data.id)
                    setDatos(dd);
                }
                get()
            }
        }
    }, [data])
    if (Object.keys(data).length <= 0) {
        return <div
            style={{
                width: "80%",
                minHeight: "250px",
                position: "absolute",
                cursor: "no-drop",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            no se a creado el documento de venta
        </div>
    }


    return <div style={{ width: "100%" }} >
        <Button appearance="primary" onClick={() => { setModalAdd(true); }} > agregar</Button>

        <AddDetalle
            doc={data}
            newDataVenta={newDA}
            show={modalAdd}
            close={() => setModalAdd(false)}
            newdata={(r) => setDatos([...datos, r])}
        />
    
        <EditDetalle
            show={modalEdit}
            close={() => setModalEdit(false)}
            newdata={(res) => {
                setDatos([...datos.filter((item) => item.id != res.id), res])
            }}
            initData={dataEdit}
        /> 
        <Table
            style={{ width: "100%" }}
            data={datos}
        >
            <Table.Column width={100} fixed>
                <Table.HeaderCell>Articulo</Table.HeaderCell>
                <Table.Cell dataKey="articulo" >
                    {
                        r => r.articulo.nombre && r.articulo.nombre
                    }
                </Table.Cell>
            </Table.Column>

            <Table.Column width={100} >
                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                <Table.Cell dataKey="cantidad" />
            </Table.Column>

            <Table.Column width={100} >
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.Cell dataKey="total" />
            </Table.Column>

            <Table.Column width={120} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.Cell>
                    {rowData => {
                        return (
                            <span>
                                <a onClick={() => { setDataEdit(rowData); setModalEdit(true) }}> Edit </a> |{' '}
                                <a onClick={async () => {
                                    try {
                                        await deletDetaillVenta(rowData.id)
                                        setDatos(datos.filter((item) => item.id != rowData.id))
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}> Remove </a>
                            </span>
                        );
                    }}
                </Table.Cell>
            </Table.Column>
        </Table>
    </div>
}