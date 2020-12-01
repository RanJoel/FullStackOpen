import React from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => {
        return (
          <Part
            key={index}
            part={parts[index].name}
            exercise={parts[index].exercises}
          />
        );
      })}
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>total of {total} exercises</p>;
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course, index) => {
        return (
          <div key={index}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
