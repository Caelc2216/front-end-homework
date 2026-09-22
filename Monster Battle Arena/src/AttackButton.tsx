

function AttackButton({ onClick, label = "Attack Monster"} : {onClick: () => void; label?: string}) {

    return (
        <>
            <button onClick={onClick}>{label}</button>
        </>
    )
}

export default AttackButton