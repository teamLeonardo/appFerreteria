import { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import AddCliente from "./AddCliente";
import EditCliente from "./EditCliente";
import { getDataCliente, deletClient } from "./state";


export default () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [editData, setEditData] = useState({})
    const handleAgregar = () => {
        setShow(true)
    }
    useEffect(() => {
        const get = async () => {
            setData(await getDataCliente())
        }
        get()
    }, [])
    return <div style={{ width: "100%" }}>
        <Button onClick={handleAgregar} appearance="primary">
            agregar
        </Button>
        <AddCliente
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, ...[res]])
            }}
        />
        <EditCliente
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
            onRowClick={data => {
                console.log(data);
            }}
        >
            {/* <Table.Column width={70} align="center" fixed>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.Cell dataKey="id" />
            </Table.Column> */}
            <Table.Column width={200} fixed>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.Cell dataKey="nombre" />
            </Table.Column>
            <Table.Column width={200}>
                <Table.HeaderCell>Apellido</Table.HeaderCell>
                <Table.Cell dataKey="apellido" />
            </Table.Column>
            <Table.Column width={90}>
                <Table.HeaderCell>Sexo</Table.HeaderCell>
                <Table.Cell dataKey="sexo" />
            </Table.Column>
            <Table.Column width={150} >
                <Table.HeaderCell>fecha de nacimiento</Table.HeaderCell>
                <Table.Cell dataKey="fecha_nacimiento" />
            </Table.Column>
            <Table.Column width={110} >
                <Table.HeaderCell>tipo de documento</Table.HeaderCell>
                <Table.Cell dataKey="tipo_docu" />
            </Table.Column>
            <Table.Column width={110} >
                <Table.HeaderCell>Numero de documento</Table.HeaderCell>
                <Table.Cell dataKey="num_docu" />
            </Table.Column>
            <Table.Column width={200} >
                <Table.HeaderCell>Direccion</Table.HeaderCell>
                <Table.Cell dataKey="direccion" />
            </Table.Column>
            <Table.Column width={110} >
                <Table.HeaderCell>Telefono</Table.HeaderCell>
                <Table.Cell dataKey="telefono" />
            </Table.Column>
            <Table.Column width={200} >
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.Cell dataKey="email" />
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
                                        await deletClient(rowData.id)
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