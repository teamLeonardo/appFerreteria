import { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import AddProvedor from "./AddProvedor";
import EditProvedor from "./EditProvedor";
import { deletProvedor, getDataProvedor } from "./state";


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
            setData(await getDataProvedor())
        }
        get()
    }, [])
    return <div style={{ width: "100%" }}>
        <Button onClick={handleAgregar} appearance="primary">
            agregar
        </Button>
        <AddProvedor
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, ...[res]])
            }}
        />
        <EditProvedor
            state={show2}
            hide={() => setShow2(false)}
            datos={editData}
            newdata={(res) => {
                setData([...data.filter((item) => item.id != res.id), ...[res]])
            }}
        />
        <Table
            style={{ width: "100%", height: "100%" }}
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
            <Table.Column width={150} fixed>
                <Table.HeaderCell>razonSocial</Table.HeaderCell>
                <Table.Cell dataKey="razonSocial" />
            </Table.Column>
            <Table.Column width={150}>
                <Table.HeaderCell>sector_comercial</Table.HeaderCell>
                <Table.Cell dataKey="sector_comercial" />
            </Table.Column>
            <Table.Column width={90}>
                <Table.HeaderCell>tipo_documento</Table.HeaderCell>
                <Table.Cell dataKey="tipo_documento" />
            </Table.Column>
            <Table.Column width={150} >
                <Table.HeaderCell>num_doc</Table.HeaderCell>
                <Table.Cell dataKey="num_doc" />
            </Table.Column>
            <Table.Column width={110} >
                <Table.HeaderCell>direccion</Table.HeaderCell>
                <Table.Cell dataKey="direcccion" />
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
                                        await deletProvedor(rowData.id)
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