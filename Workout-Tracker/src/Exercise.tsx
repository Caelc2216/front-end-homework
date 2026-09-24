function Exercise(props: ExerciseProps){


    return (
        <>
            <h4 style={{marginBottom: '0rem'}}>{props.name}</h4>
            <p>Duration: {props.duration}</p>
            <p>{props.description}</p>
        </>


    )
}


type ExerciseProps = {
    id: string
    name: string
    description: string
    duration: number
}


export default Exercise
export {type ExerciseProps}