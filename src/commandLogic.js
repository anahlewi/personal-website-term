import { listOfCommands } from "./commands";

export function isValidCommand(input){
    return Object.keys(listOfCommands).includes(input);
}

export function commandLogic(input){
    if(isValidCommand(input)) return listOfCommands[input];
    return `<p class="command-not-found"> Command ${input} not found use 'help' see a list of commands </p>`;
}