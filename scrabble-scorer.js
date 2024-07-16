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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   return input.question("Enter a word to score: ");
}

function simpleScorer(word) {

   return word.length;
}

function vowelBonusScorer(word) {
   const vowels = 'aeiou';
   let score = 0;
   
   for (let letter of word.toLowerCase()) {
       if (vowels.includes(letter)) {
           score += 3;
       } else {
           score += 1;
       }
   }
   
   return score;
}

const scoringAlgorithms = [
   {
     name: 'Simple Score',
     description: 'Each letter is worth 1 point.',
     scorerFunction: simpleScorer
   },
   {
     name: 'Bonus Vowels',
     description: 'Vowels are worth 3 points, consonants are worth 1 point.',
     scorerFunction: vowelBonusScorer
   },
   {
     name: 'Scrabble',
     description: 'The traditional scoring algorithm.',
     scorerFunction: oldScrabbleScorer
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

function transform(oldPointStructure) {
  let newStructure = {};
  for (let point in oldPointStructure) {
    let letters = oldPointStructure[point];
    for (let letter of letters) {
      newStructure[letter.toLowerCase()] = Number(point);
    }
  }
  return newStructure;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  for (let letter of word) {
    score += newPointStructure[letter] || 0;
  }
  return score;
}

function runProgram() {

   let word = initialPrompt();
   let selectedScoringAlgorithm = scorerPrompt();
   let score = selectedScoringAlgorithm.scorerFunction(word);
   console.log(`Score for '${word}': ${score}`);
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
