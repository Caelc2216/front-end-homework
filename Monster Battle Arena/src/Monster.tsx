import { useState } from "react";
import AttackButton from "./AttackButton";

function Monster(props: MonsterProps){

    return (
        <>
            <h2>{props.name}</h2>
            <p>Type: {props.type}</p>
            <p>Health: {props.startingHealth}</p>
            <p>Attack Damage: {props.attackDMG}</p>
        </>
    )
}



type MonsterProps = {
    name: string;
    type:MonsterType;
    startingHealth: number;
    attackDMG: number;
}

type MonsterType = 'Beast' | 'Zombie' | 'Dragon' | 'Goblin'

export default Monster
export type {MonsterType}