import { Button, Cascader, DatePicker, Drawer, Input, InputNumber, Radio, Select, Space, Switch, Table, TreeSelect } from "antd"
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
// import Form from "antd/lib/form/Form";
export default () => {

    const [visible, setVisible] = useState(false)

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    return <>
        <Space direction="vertical">

            <Button onClick={showDrawer}><PlusOutlined /> Agregar</Button>

            <Table dataSource={dataSource} columns={columns} />

        </Space>
        <Drawer
            title="Create a new account"
            onClose={onClose}
            visible={visible}
            width={"90%"}
        // bodyStyle={{ paddingBottom: 80 }}

        >
            <form>
                <Input placeholder="nombre" name="nombre"/>
            </form>
        </Drawer>
    </>
}