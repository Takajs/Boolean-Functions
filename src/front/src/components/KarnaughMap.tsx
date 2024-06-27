import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'

export default function KarnaughMap({ booleanFunction }: { booleanFunction: BooleanFunction }) {
    function renderKarnaughIndexesMap() {
        const karnaughIndexesMap = booleanFunction.getKarnaughIndexesMap();
        const karnaughActivationsMap = booleanFunction.getKarnaughActivationsMap();
        const result = [];
        for (let i = 0; i < karnaughIndexesMap.length; i += 4) {
            const table = [];
            for (let j = i; j < i + 4; j++) {
                if (karnaughIndexesMap[j]) {
                    table.push(
                        <tr key={j}>
                            {karnaughIndexesMap[j].map((value: number, index: number) => <td key={index}>{
                                //If the minterm is activated, render it in bold
                                karnaughActivationsMap[j][index] ? <b>{value}</b> : value
                            }</td>)}


                        </tr>
                    )
                }
            }
            result.push(
                <table key={i}
                    style={{
                        border: '1px solid black',
                        margin: '5px'

                    }}>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            )

        }
        return result;
    }
    return (
        <div>
            <h2>Karnaugh Map</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'row'

            }}>
                {
                    renderKarnaughIndexesMap().slice(0, Math.ceil(renderKarnaughIndexesMap().length / 2))
                }

            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'

            }}>
                {
                    renderKarnaughIndexesMap().slice(Math.ceil(renderKarnaughIndexesMap().length / 2))
                }
            </div>
        </div>
    )
}
