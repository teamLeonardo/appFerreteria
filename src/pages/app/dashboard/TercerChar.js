import { Chart } from "chart.js"
import { useEffect } from "react"
import { PolarArea } from "react-chartjs-2"
import { Panel } from "rsuite"

const generar = (catidad, label) => {

    const data = {
        colores1: [],
        colores2: [],
        labels: [],
        datasets: []
    }
    for (let index = 1; index < catidad + 1; index++) {
        const numRand = (Math.round(Math.random() * 100))
        const color1 = (Math.round(Math.random() * 235) + 50)
        const color2 = (Math.round(Math.random() * 235) + 50)
        const color3 = (Math.round(Math.random() * 235) + 50)

        data.labels.push(label + " " + index)
        data.colores1.push(`rgba(${color1}, ${color2}, ${color3}, 1)`)
        data.colores2.push(`rgba(${color1}, ${color2}, ${color3}, 0.2)`)
        data.datasets.push(numRand)
    }

    return data

}
export default (props) => {

    const genData = generar(10, "producto ")

    return <Panel shaded {...props} style={{ height: "400px", marginBottom: "1rem" }} bordered header="productos mas vendidos">
        < PolarArea
            height="100"
            data={{
                labels: genData.labels,
                datasets: [{
                    label: '# of productos',
                    data: genData.datasets,
                    backgroundColor: genData.colores2,
                    borderColor: genData.colores1,
                    borderWidth: 1
                }]
            }}
            options={
                {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                }
            }

        />

    </Panel>




}