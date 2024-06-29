
import { GameOfLifeClass } from '../../../modules/boolean-function/class/GameOfLife'
import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { useEffect, useState, useRef } from 'react';
export default function GameOfLife({ booleanFunction, setBooleanFunction }: { booleanFunction: BooleanFunction, setBooleanFunction: (booleanFunction: BooleanFunction) => void }) {


  function getRandomSpaceEmoji() {
    const emojis = ['🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟']
    let randomIndex = Math.floor(Math.random() * (emojis.length + 1))
    //if the index is one of last 3 indexes, throw a 1000 dice to get a super rare emoji
    if (randomIndex === 0) randomIndex++
    if (randomIndex === emojis.length && Math.random() > 0.99975) {
      const SUPER_RARE_EMOJIS = ['🌌', '🌠', '🛸']
      return SUPER_RARE_EMOJIS[Math.floor(Math.random() * SUPER_RARE_EMOJIS.length)]
    }
    return emojis[randomIndex - 1]
  }

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
            >
            </td>
            :
            <td
              key={j}
              className={'activated cell'}
            >{getRandomSpaceEmoji()}
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
