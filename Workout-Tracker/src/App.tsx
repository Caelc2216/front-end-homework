import { use, useEffect, useState } from 'react'
import Exercise from './Exercise'
import { type ExerciseProps } from './Exercise'
import './App.css'

function App() {
  const [exercises, setExercises] = useState<ExerciseProps[]>([])
  const [exerciseName, setExerciseName] = useState(``)
  const [exerciseDuration, setExerciseDuration] = useState(0)
  const [exerciseDescription, setExerciseDescription] = useState('')
  const [exerciseNumber, setExerciseNumber] = useState(0)
  const [numberCompleted, setNumberCompleted] = useState(0)
  const [estimatedTotalMin, setEstimatedTotalMin] = useState(0)
  const [completedMin, setCompletedMin] = useState(0)

  function addExercise() {
    let id = crypto.randomUUID()
    setExercises(() => [
      ...exercises,
      {
        id: id,
        name: exerciseName != '' ? exerciseName : `Exercise ${exerciseNumber}`,
        description: exerciseDescription,
        duration: exerciseDuration
      }
    ])
    setExerciseNumber(exerciseNumber => exerciseNumber += 1);
  }

  function completeExercise(exercise: ExerciseProps) {
    setExercises(() => exercises.filter((e) => e.id != exercise.id))
    setNumberCompleted((current) => current += 1)
    setCompletedMin((current) => current += exercise.duration)
  }

  function add5toExerciseTime(exercise: ExerciseProps) {
    setExercises((prev) =>
      prev.map((e) =>
        e.id === exercise.id
          ? { ...e, duration: e.duration + 5 }
          : e
      )
    );
    setEstimatedTotalMin((current) => current += 5);
  }

  function resetTracker(){
    setExercises([])
    setExerciseNumber(0)
    setNumberCompleted(0)
    setEstimatedTotalMin(0)
    setCompletedMin(0)
  }

  function calculateExerciseTime(){
    let totalTime:number = 0
    exercises.forEach(element => {
      totalTime += element.duration
    });
    setEstimatedTotalMin(totalTime)
  }

    useEffect(() => {
    document.title = `Exercises Completed: ${numberCompleted}`;
  }, [numberCompleted]);

  useEffect(() => {
    console.log(`Workout time: ${estimatedTotalMin} minutes`);
  }, [estimatedTotalMin]);

  return (
    <>
      <h1>Exercise Tracker</h1>
      <div>
      <h3 style={{margin: '0rem'}}>Exercises Completed: {numberCompleted}</h3>
      <h3 style={{margin: '0rem'}}>Estimated Minutes: {estimatedTotalMin}</h3>
      <h3 style={{margin: '0rem'}}>Completed Minutes: {completedMin}</h3>
      </div>
      <div>
        <label>Exercise Name:</label>
        <input
          className='e_input'
          placeholder='Exercise Name'
          onChange={(event) => setExerciseName(event.target.value)}></input>
      </div>
      <div>
        <label>Duration:</label>
        <input
          className='e_input'
          placeholder='Duration (min)'
          inputMode='numeric'
          onChange={(event) => setExerciseDuration(Number(event.target.value))}></input>
      </div>
      <div>
        <label>Description:</label>
        <input
          className='e_input'
          placeholder='this workout...'
          onChange={(event) => setExerciseDescription(event.target.value)}></input>
      </div>
      <div>
      <button onClick={addExercise}>Add Exercise (+)</button>
      <button onClick={resetTracker}>Reset Tracker</button>
      <button onClick={calculateExerciseTime}>Calculate Estimated Exercise Time</button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h3 style={{ marginBottom: '0rem' }}>Exercise List:</h3>
      {numberCompleted > 0 ? <p>Workout in progress!</p> : <p>Ready to start your workout!</p>}
      <p> Workout Status: {numberCompleted > 0 ? 
                                    numberCompleted < 3 ? "Getting Started" : 
                                    numberCompleted < 5 ? "Good Workout!" : "Great Workout!"
                                    : "Not Started" }
      </p>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <Exercise
            id={exercise.id}
            name={exercise.name}
            description={exercise.description}
            duration={exercise.duration}
          />
          <button onClick={() => completeExercise(exercise)} style={{margin: '1rem'}}>Complete</button>
          <button onClick={() => add5toExerciseTime(exercise)}>Add 5min</button>
        </div>
      ))}

    </>
  )
}

export default App
