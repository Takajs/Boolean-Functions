import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'

export default function KarnaughMap({ booleanFunction }: { booleanFunction: BooleanFunction }) {
    function karnaughMap() {
        function renderKarnaughIndexesMap() {
            const karnaughIndexesMap = booleanFunction.getKarnaughIndexesMap();
            const result = [];
            for (let i = 0; i < karnaughIndexesMap.length; i += 4) {
                const table = [];
                for (let j = i; j < i + 4; j++) {
                    if (karnaughIndexesMap[j]) {
                        table.push(
                            <tr key={j}>
                                {karnaughIndexesMap[j].map((value: number, index: number) => <td
                                    className={booleanFunction.getActivatedminTerms().includes(value) ? 'activated' : ''}
                                    key={index}>{value
                                    }</td>)}
                            </tr>
                        )
                    }
                }
                result.push(
                    <table key={i}>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                )
            }
            return result;
        }
        return (<div
            className="karnaugh-map">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                {
                    renderKarnaughIndexesMap().slice(0, Math.ceil(renderKarnaughIndexesMap().length / 2))
                }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                {
                    renderKarnaughIndexesMap().slice(Math.ceil(renderKarnaughIndexesMap().length / 2))
                }
            </div>
        </div>)
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
            <p>Karnaugh Map</p>
            {karnaughMap()}
        </div>
    )
}
