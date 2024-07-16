// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
 };
 
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
 
 function initialPrompt() {
    console.log("Let's play some scrabble!");
    return input.question("Enter a word: ");
 }
 
 function transform(oldPointStructure) {
    let newStructure = {};
    for (let point in oldPointStructure) {
      let letters = oldPointStructure[point];
      for (let i = 0; i < letters.length; i++) {
        newStructure[letters[i].toLowerCase()] = Number(point);
      }
    }
    return newStructure;
 }
 
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
 
 function runProgram() {
    let word = initialPrompt();
    let scoringAlgorithm = scorerPrompt();
    console.log(`Score for '${word}': ${scoringAlgorithm.scoringFunction(word)}`);
 }
function transform(oldPointStructure) {
   let newStructure = {};
   for (let point in oldPointStructure) {
     let letters = oldPointStructure[point];
     for (let i = 0; i < letters.length; i++) {
       newStructure[letters[i].toLowerCase()] = Number(point);
     }
   }
   return newStructure;
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