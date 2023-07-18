class DiceGame {
  constructor() {
    this.$rollButton = $("#rollButton");
    this.$resetButton = $("#resetButton");
    this.$dice1ForPlayer = $("#dice1ForPlayer");
    this.$dice2ForPlayer = $("#dice2ForPlayer");
    this.$dice1ForComputer = $("#dice1ForComputer");
    this.$dice2ForComputer = $("#dice2ForComputer");
    this.$playerScore1 = $("#playerScore1");
    this.$playerScore2 = $("#playerScore2");
    this.$playerScore3 = $("#playerScore3");
    this.$computerScore1 = $("#computerScore1");
    this.$computerScore2 = $("#computerScore2");
    this.$computerScore3 = $("#computerScore3");
    this.$currentScore = $("#currentScore");
    this.$resultMessage = $("#resultMessage");

    this.animationFrameHandler;
    this.limit = 6;
    this.isAnimating = false;
    this.dice1 = 0;
    this.dice2 = 0;
    this.dice3 = 0;
    this.dice4 = 0;

    this.playerTotalScore = 0;
    this.computerTotalScore = 0;
    this.round = 1;

    this.init();
  }

  init() {
    this.setupImages();
    this.setupRollButton();
    this.setupResetButton();
  }

  setupImages() {
    this.$dice1ForPlayer.html(`<img src="images/rotation2.png" alt="">`);
    this.$dice2ForPlayer.html(`<img src="images/rotation3.png" alt="">`);
    this.$dice1ForComputer.html(`<img src="images/rotation1.png" alt="">`);
    this.$dice2ForComputer.html(`<img src="images/rotation6.png" alt="">`);
  }

  animateImages() {
    this.dice1 = Math.floor(Math.random() * this.limit) + 1;
    this.dice2 = Math.floor(Math.random() * this.limit) + 1;
    this.dice3 = Math.floor(Math.random() * this.limit) + 1;
    this.dice4 = Math.floor(Math.random() * this.limit) + 1;

    this.$dice1ForPlayer.html(
      `<img src="images/rotation${this.dice1}.png" alt="">`
    );
    this.$dice2ForPlayer.html(
      `<img src="images/rotation${this.dice2}.png" alt="">`
    );
    this.$dice1ForComputer.html(
      `<img src="images/rotation${this.dice3}.png" alt="">`
    );
    this.$dice2ForComputer.html(
      `<img src="images/rotation${this.dice4}.png" alt="">`
    );

    this.animationFrameHandler = requestAnimationFrame(() =>
      this.animateImages()
    );
  }

  setupRollButton() {
    this.$rollButton.click(() => {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.animationFrameHandler = requestAnimationFrame(() =>
          this.animateImages()
        );
      }

      setTimeout(() => {
        cancelAnimationFrame(this.animationFrameHandler);
        this.isAnimating = false;

        this.calculateScore();

        if (this.round === 1) {
          this.$playerScore1.html(
            `Round 1 Score: ${this.dice1} + ${this.dice2} = ${
              this.dice1 + this.dice2
            }`
          );
          this.$computerScore1.html(
            `Round 1 Score: ${this.dice3} + ${this.dice4} = ${
              this.dice3 + this.dice4
            }`
          );
        } else if (this.round === 2) {
          this.$playerScore2.html(
            `Round 2 Score: ${this.dice1} + ${this.dice2} = ${
              this.dice1 + this.dice2
            }`
          );
          this.$computerScore2.html(
            `Round 2 Score: ${this.dice3} + ${this.dice4} = ${
              this.dice3 + this.dice4
            }`
          );
        } else if (this.round === 3) {
          this.$playerScore3.html(
            `Round 3 Score: ${this.dice1} + ${this.dice2} = ${
              this.dice1 + this.dice2
            }`
          );
          this.$computerScore3.html(
            `Round 3 Score: ${this.dice3} + ${this.dice4} = ${
              this.dice3 + this.dice4
            }`
          );

          this.getWinner();

          this.$rollButton.prop("disabled", true);
        }

        if (this.round < 3) {
          setTimeout(() => {
            const $popup = $(`
          <div id="popUpBox">
            <p>You: ${this.dice1} and ${this.dice2}</p>
            <p>Computer: ${this.dice3} and ${this.dice4}</p>
            <button class="backToTheGame">OK</button>
          </div>
        `);

            $popup.find(".backToTheGame").click(() => {
              $popup.remove();
            });

            $("body").append($popup);
          }, 500);
        }

        if (this.round === 3) {
          setTimeout(() => {
            let winner = "";
            if (this.playerTotalScore > this.computerTotalScore) {
              winner = "Player";
            } else if (this.playerTotalScore < this.computerTotalScore) {
              winner = "Computer";
            } else {
              winner = "No player";
            }
            const $popup = $(`
              <div id="popUpBox">
              ${this.$currentScore.html()}<br />
              <strong>${winner}</strong> won the game
              <button class="backToTheGame">Over</button>
              </div>
              `);

            $popup.find(".backToTheGame").click(() => {
              $popup.remove();
            });

            $("body").append($popup);
          }, 500);
        }

        this.round++;
      }, 2000);
    });
  }

  setupResetButton() {
    this.$resetButton.click(() => {
      this.round = 1;
      this.playerTotalScore = 0;
      this.computerTotalScore = 0;
      this.$rollButton.prop("disabled", false);

      this.$playerScore1.empty();
      this.$playerScore2.empty();
      this.$playerScore3.empty();

      this.$computerScore1.empty();
      this.$computerScore2.empty();
      this.$computerScore3.empty();

      this.$currentScore.empty();
      this.$resultMessage.empty();
    });
  }

  calculateScore() {
    let playerScore = 0;

    if (this.dice1 === 1 || this.dice2 === 1) {
      playerScore = 0;
    } else if (this.dice1 === this.dice2) {
      playerScore = (this.dice1 + this.dice2) * 2;
    } else {
      playerScore = this.dice1 + this.dice2;
    }

    const computerScore =
      this.dice3 === 1 || this.dice4 === 1
        ? 0
        : this.dice3 === this.dice4
        ? (this.dice3 + this.dice4) * 2
        : this.dice3 + this.dice4;

    this.playerTotalScore += playerScore;
    this.computerTotalScore += computerScore;

    this.$currentScore.html(
      `Player: ${this.playerTotalScore} vs Computer: ${this.computerTotalScore}`
    );
  }

  getWinner() {
    let winner = "None";
    if (this.playerTotalScore > this.computerTotalScore) {
      winner = "Player";
      console.log(winner);
    } else if (this.playerTotalScore < this.computerTotalScore) {
      winner = "Computer";
      console.log(winner);
    }

    this.$resultMessage.html(`The winner is: ${winner}`);
  }
}

const diceGame = new DiceGame();
