import {type Adventurer } from './Adventurer'
let adventurer1: Adventurer = {
    name: "Cael",
    className: "Rogue",
    level: 5,
    health: 100,
    isActive: true,
}
let adventurer2: Adventurer = {
    name: "Sayore",
    className: "Paladin",
    level: 3,
    health: 120,
    isActive: true,
}
let adventurer3: Adventurer = {
    name: "Tyrone",
    className: "Ranger",
    level: 5,
    health: 110,
    isActive: false,
    nickname: "Tyronie the homie"
}
let adventurer4: Adventurer = {
    name: "Jack",
    className: "Barbarian",
    level: 5,
    health: 130,
    isActive: false,
}
let party: Adventurer[] = [adventurer1, adventurer2, adventurer3, adventurer4]

function displayAdventurer(adventurer: Adventurer): void {
    const { name, nickname, className, level, health, isActive } = adventurer;
    console.log(
        `Name: ${name}\n` +
        (nickname ? `Nickname: ${nickname}\n` : "") +
        `Class: ${className}\n` +
        `Level: ${level}\n` +
        `Health: ${health}\n` +
        `Status: ${isActive ? "Active" : "Inactive"}\n`
    );
}

let partySummary: string[] = party.map((adventurer) => {
    return `${adventurer.name} - Level ${adventurer.level} ${adventurer.className}`;
});

function findAdventurer(name: string): Adventurer | undefined {
    return party.find((adventurer) => adventurer.name === name);
}

let activeAdventurers: Adventurer[] = party.filter((adventurer) => adventurer.isActive);


function takeDamage(adventurer: Adventurer, damage: number): void {
    adventurer.health -= damage;
    if (adventurer.health <= 0) {
        adventurer.health = 0;
        adventurer.isActive = false;
        console.log(`\n${adventurer.name} took ${damage} damage.`);
        console.log(`${adventurer.name} has been defeated and is now inactive.`);
    }
    else
    {
        console.log(`\n${adventurer.name} took ${damage} damage`);
        console.log(`${adventurer.name} has ${adventurer.health} health remaining.`);
    }
}

function getAverageLevel(party: Adventurer[]): number {
    let totalLevel = party.reduce((sum, adventurer) => sum + adventurer.level, 0);
    return totalLevel / party.length;
}

function getActiveCount(party: Adventurer[]): number {
    return party.filter((adventurer) => adventurer.isActive).length;
}

console.log("=== Party ===\n")
partySummary.forEach((summary) => console.log(summary));



console.log("\n=== Active Adventurers ===\n");
activeAdventurers.forEach((adventurer) => console.log(adventurer.name));

console.log("\n=== Level 5+ Adventurers ===\n");
let level5Adventurers: Adventurer[] = party.filter((adventurer) => adventurer.level >= 5);
level5Adventurers.forEach((adventurer) => console.log(adventurer.name));


console.log("\n=== Battle Simulation ===");
takeDamage(adventurer1, 30);
takeDamage(adventurer2, 50);
takeDamage(adventurer3, 120);
takeDamage(adventurer4, 10);

console.log("\n=== Party Status ===\n");
console.log(`Average Level: ${getAverageLevel(party)}`);
console.log(`Active Adventurers: ${getActiveCount(party)}`);

console.log("\n=== Find Adventurer ===\n");
let searchName = "Tyrone";
let foundAdventurer = findAdventurer(searchName);
if (foundAdventurer) {
    console.log(`Found adventurer: ${foundAdventurer.name}`);
    displayAdventurer(foundAdventurer);
}
else {
    console.log(`Adventurer not found: ${searchName}`);
}

let searchname2 = "Jacks";
let foundAdventurer2 = findAdventurer(searchname2);
if (foundAdventurer2) {
    console.log(`Found adventurer: ${foundAdventurer2.name}`);
    displayAdventurer(foundAdventurer2);
}
else {
    console.log(`Adventurer not found: ${searchname2}`);
}

