
import { GameOfLifeClass } from '../../../modules/boolean-function/class/GameOfLife'
import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { useEffect, useState, useRef } from 'react';
export default function GameOfLife({ booleanFunction, setBooleanFunction }: { booleanFunction: BooleanFunction, setBooleanFunction: (booleanFunction: BooleanFunction) => void }) {


 
  function renderBoard() {
    const board = booleanFunction.getGameOfLife().getBoard();
    const result = []
    for (let i = 0; i < board.length; i++) {
      const row = []
      for (let j = 0; j < board[i].length; j++) {


        row.push(
          !board[i][j]
            ?
            <td
              key={j}
              className={'cell off'}
            >⬛
            </td>
            :
            <td
              key={j}
              className={'activated cell'}
            >⬜
            </td>
        )
      }
      result.push(
        <tr key={i}>
          {row}
        </tr>
      )
    }
    return result
  }



  return (
    <div
      className="background-component">
      <table>
        <tbody>
          {renderBoard()}
        </tbody>
      </table>
    </div>
  )
}
