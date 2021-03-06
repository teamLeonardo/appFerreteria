import { useEffect, useState } from "react";
import { Button, Modal, Table } from "rsuite";
import AddCompra from "./AddCompra";
import DetailCompra from "./DetailCompra";
import EditCompra from "./EditCompra";
import { getDataCompra, deletCompra } from "./state";


export default () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [editData, setEditData] = useState({})
    const [detaillData, setDetailData] = useState({})
    const handleAgregar = () => {
        setShow(true)
    }
    useEffect(() => {
        const get = async () => {
            try {
                const d = await getDataCompra()
                setData(d)
            } catch (error) {
            }
        }
        get()
    }, [])

    const DetailModal = (row) => {
        setDetailData(row)
        setShow3(true)
    }


    return <div style={{ width: "100%" }}>
        <Button onClick={handleAgregar} appearance="primary">
            agregar
        </Button>
        <AddCompra
            state={show}
            hide={() => setShow(false)}
            newdata={(res) => {
                setData([...data, res])
            }}
        />
        <EditCompra
            state={show2}
            hide={() => setShow2(false)}
            datos={editData}
            newdata={(res) => {
                setData([...data.filter((item) => item.id != res.id), ...[res]])
            }}
        />
        <Modal overflow show={show3} onHide={() => { setShow3(false) }}>
            <Modal.Header>
                <Modal.Title>Detalle de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DetailCompra newDataCompra={(res) => { setData([...data.filter((item) => item.id != res.id), ...[res]]) }} data={detaillData} edit={true} />
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
                <Table.HeaderCell>Provedor</Table.HeaderCell>
                <Table.Cell dataKey="provedor"  >
                    {
                        r => r.provedor.razonSocial && r.provedor.razonSocial
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
            <Table.Column width={100} >
                <Table.HeaderCell>Tipo Compra</Table.HeaderCell>
                <Table.Cell dataKey="tipo_compra" />
            </Table.Column>
            <Table.Column width={100} >
                <Table.HeaderCell>Fecha</Table.HeaderCell>
                <Table.Cell dataKey="fecha" />
            </Table.Column>
            <Table.Column width={100} >
                <Table.HeaderCell>Igv</Table.HeaderCell>
                <Table.Cell dataKey="igv" />
            </Table.Column>
            <Table.Column width={100} >
                <Table.HeaderCell>Serie</Table.HeaderCell>
                <Table.Cell dataKey="serie" />
            </Table.Column>

            <Table.Column width={200} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell>
                    {rowData => {
                        return (
                            <span>
                                <a onClick={() => { DetailModal(rowData); setShow3(true) }}> detalle </a> |{' '}
                                <a onClick={() => { setEditData(rowData); setShow2(true) }}> Edit </a> |{' '}
                                <a onClick={async () => {
                                    try {
                                        await deletCompra(rowData.id)
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