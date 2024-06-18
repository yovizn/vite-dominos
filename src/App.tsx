import { ChangeEvent, ElementRef, FormEvent, useRef, useState } from 'react'
import { dominoes as source } from './utils'
import Button from './components/Button'

import './App.css'

function App() {
  const [dominoes, setDominoes] = useState(source)
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<ElementRef<'input'>>(null)
  const findDuplicate = dominoes.filter((find) => find[0] === find[1])

  const handleSortAsc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1]
      const sumB = b[0] + b[1]

      if (sumA === sumB) {
        return a[0] - b[0]
      } else {
        return sumA - sumB
      }
    })

    setDominoes([...sorted])
  }

  const handleSortDesc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1]
      const sumB = b[0] + b[1]

      if (sumA === sumB) {
        return b[0] - a[0]
      } else {
        return sumB - sumA
      }
    })

    setDominoes([...sorted])
  }

  const handleFlip = () => {
    const flip = dominoes.map((item) => [item[1], item[0]])
    setDominoes([...flip])
  }

  const handleReset = () => {
    const reset = source
    setDominoes([...reset])
  }

  const handleRemoveDuplicate = () => {
    const removeDuplicate = dominoes.filter((domino) => domino[0] !== domino[1])
    setDominoes([...removeDuplicate])
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputNumber = parseInt(inputValue, 10)

    if (isNaN(inputNumber) || inputNumber < 0) {
      return
    }

    const filterDominoes = dominoes.filter((domino) => {
      const dominoTotal = domino[0] + domino[1]
      return dominoTotal !== inputNumber
    })

    setDominoes([...filterDominoes])
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex h-screen w-full max-w-screen-xl flex-col gap-6 p-6">
        <h1 className="text-7xl font-bold uppercase">Dominoes</h1>

        <div className="grid size-full place-items-center rounded-md bg-zinc-800 p-4">
          <div className="flex size-full max-w-screen-sm flex-col items-center justify-center gap-6">
            <form
              onSubmit={handleSubmit}
              className="flex gap-4 self-end"
            >
              <input
                ref={inputRef}
                type="number"
                id="input"
                min={0}
                max={12}
                maxLength={2}
                onChange={handleChangeInput}
                className='"flex disabled:opacity-50", h-10 w-24 rounded-md border border-black bg-white px-3 py-2 text-sm text-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed'
              />
              <Button>Remove</Button>
            </form>

            <div className="flex w-full items-center justify-between">
              {dominoes.map((item, i) => {
                return (
                  <div
                    className="flex flex-col rounded-md border border-zinc-500 text-2xl"
                    key={i + 'dominoes'}
                  >
                    <div
                      className={`p-2 transition-all duration-200 ease-in-out ${item[0] > item[1] || item[0] === item[1] ? 'bg-zinc-500 text-black' : ''}`}
                    >
                      {item[0]}
                    </div>
                    <div
                      className={`p-2 transition-all duration-200 ease-in-out ${item[1] > item[0] || item[0] === item[1] ? 'bg-zinc-500 text-black' : ''}`}
                    >
                      {item[1]}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex w-full flex-col gap-6">
              <div className="w-full space-y-2 rounded-md bg-zinc-100/50 p-6 text-zinc-700">
                <div className="text-xl font-bold uppercase">Double Numbers</div>
                <div>{findDuplicate.length}</div>
              </div>

              <div className="flex w-full items-center gap-4">
                <Button onClick={handleSortAsc}>Sort (ACS)</Button>
                <Button onClick={handleSortDesc}>Sort (DESC)</Button>
                <Button onClick={handleFlip}>Flip</Button>
                <Button onClick={handleRemoveDuplicate}>Remove Duplicates</Button>
                <Button
                  onClick={handleReset}
                  className="bg-red-800 text-white"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
