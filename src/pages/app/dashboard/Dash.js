import { Col, Panel, Row } from "rsuite";
import { Placeholder } from 'rsuite';
import PrimerGhart from "./PrimerGhart";
import SegundoCharts from "./SegundoCharts";
import TercerChar from "./TercerChar";
const { Paragraph } = Placeholder;

const Card = props => (
    <Panel shaded {...props} style={{ height: "500px", marginBottom: "1rem" }} bordered header="Card title">
        <Paragraph />
    </Panel>
);

export default () => (
    <Row style={{ gap: "1rem", overflowY: "scroll" }} >
        <Col md={12} sm={12}>
            <PrimerGhart />
        </Col>
        <Col md={8} sm={12}>
            <SegundoCharts />
        </Col>
        <Col md={6} sm={12}>
            <SegundoCharts />
        </Col>
        <Col md={14} sm={12}>
            <TercerChar />
        </Col>
    </Row>
);