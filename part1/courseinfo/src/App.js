const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
  </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.title} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
    const parts = props.parts.parts
    return (
    <div>
      {parts.map(elem => {
        return (
          <div>
            <Part title={elem.name} exercises={elem.exercises}/>
          </div>
        )
      })}
    </div>
  )
}

const Total = (props) => {
  let total = 0
  const array = props.total.parts
  array.map(elem => (total = total + elem.exercises))
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course}/>
      <Total total={course} />
    </div>
  )
}

export default App