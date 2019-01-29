import { NUM_ROWS, NUM_COLS, NUM_ACTIVATE_CELLS } from '../constants.js';
import { getRandomInt, getOrdinalNum } from '../utils/math-utils.js';
import ReactionTimerGridView from './ReactionTimerGridView.js';

class ReactionTimerGame {
  constructor() {
    this.view = null;
    this.activeCellRows = Array(NUM_ACTIVATE_CELLS).fill(null);
    this.activeCellCols = Array(NUM_ACTIVATE_CELLS).fill(null);
    this.currentStartTime = null;
    this.currentEndTime = null;
    this.readctionTimes = null;
  }

  handleRoundStart() {
    const delay = getRandomInt(500, 3000);
    setTimeout(this.startCycle.bind(this), delay);
  }

  startCycle() {
    this.currentStartTime = new Date().getTime(); // milliseconds
    for (let i = 0; i < NUM_ACTIVATE_CELLS; i += 1) {
      this.view.deactivateCell(this.activeCellRows[i], this.activeCellCols[i]);
    }
    this.triggerRandomCell();
    this.reactionTimes = 0;
  }

  triggerRandomCell() {
    for (let i = 0; i < NUM_ACTIVATE_CELLS; i += 1) {
      let randomRowIndex;
      let randomColIndex;

      do {
        randomRowIndex = getRandomInt(0, NUM_ROWS);
        randomColIndex = getRandomInt(0, NUM_COLS);
      } while (this.activeCellRows.includes(randomRowIndex)
        && this.activeCellCols.includes(randomColIndex));

      this.activeCellRows[i] = randomRowIndex;
      this.activeCellCols[i] = randomColIndex;
      this.view.activateCell(randomRowIndex, randomColIndex);
    }
  }

  handleActiveCellSelected(activeCellRow, activeCellCol) {
    this.view.deactivateCell(activeCellRow, activeCellCol);
    this.calculateTime();
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    this.reactionTimes += 1;

    console.log(`${getOrdinalNum(this.reactionTimes)} reaction: ${this.currentEndTime - this.currentStartTime}`);
    if (this.reactionTimes === NUM_ACTIVATE_CELLS) {
      console.log('----');
    }
  }

  init() {
    this.view = new ReactionTimerGridView();

    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));

    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
