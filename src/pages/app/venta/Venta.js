import { useEffect, useState } from "react";
import { Button, Modal, Table } from "rsuite";
import { deletVenta, getDataVenta } from "./state";
import Moment from "moment"
import AddVenta from "./AddVenta";
import EditVenta from "./EditVenta";
import ListDetalle from "./ListDetalle";

export default () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [editData, setEditData] = useState({})
    const [detaillData, setDetailData] = useState({})

    useEffect(() => {
        const get = async () => {
            try {
                const d = await getDataVenta()
                setData(d)
            } catch (error) {
            }
        }
        get()
    }, [])

    const openDetalle = (row) => {
        setDetailData(row)
        setShow3(true)
    }

    const openAgregar = () => {
        setShow(true)
    }

    const openEditar = (row) => {
        setEditData(row)
        setShow2(true)
    }


    return <div style={{ width: "100%" }}>
        <Button onClick={openAgregar} appearance="primary">
            agregar
        </Button>

        <AddVenta
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, res])
            }}
        />

        <EditVenta
            state={show2}
            hide={() => setShow2(false)}
            datos={editData}
            newDA={(res) => {
                setData([...data.filter((item) => item.id != res.id), ...[res]])
            }}
            newdata={(res) => {
                setData([...data.filter((item) => item.id != res.id), ...[res]])
            }}
        />

        <Modal overflow show={show3} onHide={() => { setShow3(false) }}>
            <Modal.Header>
                <Modal.Title>Detalle de Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListDetalle data={detaillData} edit={true} newDA={(res) => { setData([...data.filter((item) => item.id != res.id), ...[res]]) }} />
            </Modal.Body>
        </Modal>

        <Table
            style={{ width: "100%" }}
            virtualized
            data={data}
            onRowClick={data => {
                setDetailData(data)
            }}
        >

            <Table.Column width={100} fixed>
                <Table.HeaderCell>Cliente</Table.HeaderCell>
                <Table.Cell dataKey="cliente"  >
                    {
                        r => r.cliente.nombre && r.cliente.nombre
                    }
                </Table.Cell>
            </Table.Column>
            <Table.Column width={100} >
                <Table.HeaderCell>Trabajador</Table.HeaderCell>
                <Table.Cell dataKey="trabajador"  >
                    {
                        r => r.trabajador.nombre && r.trabajador.nombre
                    }
                </Table.Cell>
            </Table.Column>
            <Table.Column width={200} >
                <Table.HeaderCell>Fecha</Table.HeaderCell>
                <Table.Cell dataKey="fecha" >
                    {
                        r => r.fecha && Moment(r.fecha).format("YYYY/MM/DD HH:mm:ss")
                    }
                </Table.Cell>
            </Table.Column>
            <Table.Column width={100} >
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.Cell dataKey="total" />
            </Table.Column>

            <Table.Column width={200} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell>
                    {rowData => {
                        console.log(rowData);
                        return (
                            <span>
                                <a onClick={() => openDetalle(rowData)}> detalle </a> |{' '}
                                <a onClick={() => openEditar(rowData)}> Edit </a> |{' '}
                                <a onClick={async () => {
                                    try {
                                        await deletVenta(rowData.id)
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