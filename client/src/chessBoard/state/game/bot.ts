export class Bot {
  pickRandomMove(moves) {
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
