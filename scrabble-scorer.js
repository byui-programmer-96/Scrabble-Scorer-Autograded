// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

//oldPointStructure is an object that defines the traditional Scrabble scoring system.
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
 };
//oldScrabbleScorer function calculates the score of a word using the traditional Scrabble scoring system
function oldScrabbleScorer(word) {
    word = word.toUpperCase();
    let letterPoints = "";
  
    for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
        if (oldPointStructure[pointValue].includes(word[i])) {
          letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        }
      }
    }
    return letterPoints;
 }
//initialPrompt function prompts the user to enter a word 
function initialPrompt() {
    console.log("Let's play some scrabble!");
    return input.question("Enter a word: ");
 }
 
//transform function converts the oldPointStructure into a new structure where each letter is a key with its corresponding point value 
let newPointStructure = transform(oldPointStructure);
 
let simpleScorer = function(word) {
    return word.length;
 };
 
let vowelBonusScorer = function(word) {
    word = word.toUpperCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      if ('AEIOU'.includes(word[i])) {
        score += 3;
      } else {
        score += 1;
      }
    }
    return score;
 };
 
let scrabbleScorer = function(word) {
    word = word.toLowerCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      if (newPointStructure[word[i]]) {
        score += newPointStructure[word[i]];
      }
    }
    return score;
 };
//scoringAlgorithms is an array of objects, each representing a scoring algorithm with its name, description, and scoring function. 
const scoringAlgorithms = [
    {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: simpleScorer
    },
    {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
    },
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scoringFunction: scrabbleScorer
    }
 ];
//scorerPrompt function asks the user to choose a scoring algorithm and returns the selected algorithm 
function scorerPrompt() {
    console.log("Which scoring algorithm would you like to use?");
    for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
    }
    
    let selection = parseInt(input.question("Enter 0, 1, or 2: "));
 
    while (selection < 0 || selection > 2 || isNaN(selection)) {
      console.log("Invalid input. Please try again.");
      selection = parseInt(input.question("Enter 0, 1, or 2: "));
    }
    
    return scoringAlgorithms[selection];
 }
// runProgram Calls initialPrompt to get a word from the user. Calls scorerPrompt to let the user choose a scoring algorithm.
// Calculates and displays the score for the word using the chosen algorithm.

function runProgram() {
    let word = initialPrompt();
    let scoringAlgorithm = scorerPrompt();
    console.log(`Score for '${word}': ${scoringAlgorithm.scoringFunction(word)}`);
 }
//transform function creates a new point structure where each letter is a key with its corresponding point value
function transform(oldPointStructure) {
   let newPointStructure = {};
   
   for (let pointValue in oldPointStructure) {
     let letters = oldPointStructure[pointValue];
     
     for (let i = 0; i < letters.length; i++) {
       let letter = letters[i].toLowerCase();
       newPointStructure[letter] = Number(pointValue);
     }
   }
   
   return newPointStructure;
 }



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};