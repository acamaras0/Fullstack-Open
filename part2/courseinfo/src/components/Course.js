import React from "react";

const Part = ({ courseName, exercises }) => (
  <p>
    {courseName} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => {
        return (
          <div key={element.id}>
            <Part courseName={element.name} exercises={element.exercises} />
          </div>
        );
      })}
      <All total={parts} />
    </div>
  );
};

const All = ({ total }) => {
  const sum = total.reduce((sum, index) => {
    return sum + index.exercises;
  }, 0);
  return (
    <div>
      <h2>total of {sum} exercises</h2>
    </div>
  );
};

const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
