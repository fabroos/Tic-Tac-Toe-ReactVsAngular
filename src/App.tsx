import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import angularLogo from './assets/angular.svg'

enum State {
  Playing = 'Playing',
  Won = 'Won',
  Draw = 'Draw',
  Lose = 'Lose'
}

enum Player {
  X = 'React',
  O = 'Angular'
}

type Table = string[]

function App () {
  const [table, setTable] = useState<Table>(Array(9).fill(''))
  const [turn, setTurn] = useState<Player>(Player.O)
  const [state, setState] = useState<State>(State.Playing)

  function checkWin (table: Table): State {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (const condition of winConditions) {
      const [a, b, c] = condition
      if (table[a] && table[a] === table[b] && table[a] === table[c]) {
        return table[a] === Player.X ? State.Won : State.Lose
      }
    }
    if (table.filter(item => item === '').length === 0) {
      return State.Draw
    }
    return State.Playing
  }

  useEffect(() => {
    if (state === State.Playing) {
      setState(checkWin(table))
      setTurn(turn === Player.X ? Player.O : Player.X)
    }
  }, [table])
  console.log(state)
  return (
    <div className='App'>
      <h1 className='App-title'>Tic Tac Toe</h1>
      <h2 className='App-subtitle'>
        {state === State.Playing
          ? `${turn}'s turn`
          : state === State.Won
          ? `${Player.X} won`
          : state === State.Lose
          ? `${Player.O} Won`
          : state}
      </h2>
      <div className='table'>
        {table.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={`cell ${cell}`}
            onClick={() => {
              if (state === State.Playing && table[cellIndex] === '') {
                const newTable = [...table]
                newTable[cellIndex] = turn
                setTable(newTable)
              }
            }}
          >
            {cell === Player.X ? (
              <img src={reactLogo} alt='react' />
            ) : cell === Player.O ? (
              <img src={angularLogo} alt='angular' />
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      {
        <button
          className={`btn btn--play-again ${
            [State.Won, State.Draw, State.Lose].includes(state) ? 'show' : ''
          }`}
          onClick={() => {
            setState(State.Playing)
            setTurn(Player.X)
            setTable(Array(9).fill(''))
          }}
        >
          Play again
        </button>
      }
    </div>
  )
}

export default App
