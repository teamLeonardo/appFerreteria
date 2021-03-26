import { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import AddPresentacion from "./AddPresentacion";
import EditPresentacion from "./EditPresentacion";
import { deletPresentacion, getDataPresentacion } from "./state";

export default () => {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        const get = async () => {
            setData(await getDataPresentacion())
        }
        get()
    }, [])

    return <div style={{ width: "100%" }}>
        <Button onClick={() => setShow(true)} appearance="primary">
            agregar
        </Button>
        <AddPresentacion
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, ...[res]])
            }}
        />
        <EditPresentacion
            state={show2}
            hide={() => setShow2(false)}
            datos={editData}
            newdata={(res) => {
                setData([...data.filter((item) => item.id != res.id), ...[res]])
            }}
        /> 
        <Table
            style={{ width: "100%" }}
            virtualized
            data={data}
        >
            <Table.Column width={200} fixed>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.Cell dataKey="nombre" />
            </Table.Column>
            <Table.Column width={200} >
                <Table.HeaderCell>Descripcion</Table.HeaderCell>
                <Table.Cell dataKey="descripcion" />
            </Table.Column>

            <Table.Column width={120} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell>
                    {rowData => {
                        return (
                            <span>
                                <a onClick={() => { setEditData(rowData); setShow2(true) }}> Edit </a> |{' '}
                                <a onClick={async () => {
                                    try {
                                        await deletPresentacion(rowData.id)
                                        setData(data.filter((item) => item.id != rowData.id))
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