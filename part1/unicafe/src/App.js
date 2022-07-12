import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.word}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, sum}) => {
  if (sum > 0){
    return(
      <table>
        <tbody>
        <StatisticLine word="good" value={good} />
        <StatisticLine word="neutral" value={neutral} />
        <StatisticLine word="bad" value={bad} />
        <StatisticLine word="all" value={sum} />
        <StatisticLine word="average" value={(good - bad / sum)} />
        <StatisticLine word="positive" value={((good / sum) * 100) + " %"} />
        </tbody>
      </table>
      )
    }
  return (
    <div><p>No feedback given</p></div>
    )
  }

const ClickButton = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.word}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <ClickButton handleClick={() => setGood(good + 1)} word="good" />
      <ClickButton handleClick={() => setNeutral(neutral + 1)} word="neutral" />
      <ClickButton handleClick={() => setBad(bad + 1)} word="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum}/>
    </div>
  )
}

export default App
