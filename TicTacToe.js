const prompt = require('prompt');


let turn = 0;
let Board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
let Schema = {
  description: 'Please enter position from 1-9',
  type: 'Number',
}

let Checker = () => {
  let full = true;
  for (let i = 0; i < 3; i++) {
    if (Board[i] === Board [i + 3] && Board[i] === Board[i + 6] && Board[i] !== ' ') {
      return Board[i];
    }
    if(Board[i*3] === Board[i*3 + 1] && Board[i*3] === Board[i*3 + 2] && Board[i*3] !== ' ') {
      return Board[i*3];
    }
  }
  if(Board[0] === Board[4] && Board[0] === Board[8] && Board[0] !== ' ') {
    return Board[0];
  }
  if(Board[2] === Board[4] && Board[2] === Board[6] && Board[2] !== ' ') {
    return Board[2];
  }
  for (let j = 0; j < Board.length; j++) {
    if(Board[j] === ' ') {
      full = false;
    }
  }
  if (full === true) {
    return true;
  }
  return false;
}

let Helper = (turn) => {
  prompt.start();
  prompt.get(['position'], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (Board[result.position - 1] !== ' ') {
        console.log('invoked');
        Helper(turn);
      } else {
        if (turn % 2) {
          Board[result.position - 1] = 'X';
        } else {
          Board[result.position - 1] = 'O';
        }
        console.log(`-------\n|${Board[0]}|${Board[1]}|${Board[2]}|\n-------\n|${Board[3]}|${Board[4]}|${Board[5]}|\n-------\n|${Board[6]}|${Board[7]}|${Board[8]}|\n-------`);
        let test = Checker();
        if (test) {
          if (test === true) {
            console.log('Stalemate has been reached');
            return;
          } else {
            console.log(`player ${test} has won!`);
            return;
          }
        }
        if (turn < 9) {
          Helper(turn + 1);
        }
      }
    }
  })
}

Helper(0);