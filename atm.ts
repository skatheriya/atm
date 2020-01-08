import { ITransaction, TransactionType } from "./models";

class Atm {
  private balance: number;
  private transactionHistory: ITransaction[];
  private notes;

  constructor(denominations) {
    this.balance = 0;
    this.transactionHistory = [];
    this.notes = {};
    denominations.forEach(noteType => {
      this.notes[noteType] = 0;
    });
  }

  private logTransaction(type: TransactionType, amount: number) {
    this.transactionHistory.push({
      type,
      amount,
      balance: this.balance
    });
  }

  public deposit(notes) {
    let amount = 0;
    for (let note in notes) {
      this.notes[note] += notes[note];
      amount = amount + +note * notes[note];
    }
    this.balance += amount;
    this.logTransaction("deposit", amount);
    console.log("New balance", this.balance);
  }

  public checkBalance() {
    console.log(this.balance);
  }

  public withdraw(amount) {
    if (amount == 0) {
      console.log("Please type valid amount");
      return false;
    } else if (amount > this.balance) {
      console.log("No Cash");
      return false;
    } else if (amount % 100) {
      const notes = Object.keys(this.notes);
      console.log(`Enter in multiples of ${notes}`);
      return false;
    } else {
      let notes = {};
      let currentCount = 0;
      let amountToWithdraw = amount;

      for (let note of Object.keys(this.notes)
        .map(Number)
        .reverse()) {
        let count = Math.floor(amountToWithdraw / +note);
        if (count != 0) {
          notes[note] = count > this.notes[note] ? this.notes[note] : count;
          currentCount += +note * notes[note];
          amountToWithdraw = amount - currentCount;
        }
        if (amount == currentCount) {
          break;
        }
      }
      console.log("Collect Your Cash");
      Object.keys(notes).forEach(note => {
        if (notes[note]) {
          console.log(
            "%c " + note + " X " + notes[note],
            "background: #222; color: #bada55"
          );
        }
      });
      if (Object.keys(notes).length && amount == currentCount) {
        for (let type in notes) {
          this.notes[type] = this.notes[type] - notes[type];
        }

        this.balance = 0;
        for (let type in this.notes) {
          this.balance += +type * this.notes[type];
        }

        console.log("Withdrawl successfull");
        return true;
      }
      console.log("Insuffecient balance");
      return false;
    }
  }
}

export default Atm;
