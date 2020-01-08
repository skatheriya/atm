import { Denomination } from "./models";
import Atm from "./atm";

const denomination = [
  Denomination.TWO_THOUSAND,
  Denomination.FIVE_HUNDRED,
  Denomination.TWO_HUNDRED,
  Denomination.HUNDRED
];
const atm = new Atm(denomination);

askForDeposit(); // first time deposit in atm

const question = +prompt(
  "Please enter your choice, Pree \n 1 for withdraw \n 2 for Deposit"
);
if (question === 1) {
  askForWithdrawl();
} else if (question === 2) {
  askForDeposit();
}

function askForDeposit() {
  const notes = {};
  denomination.forEach(noteType => {
    const value = prompt(
      `Please Enter No. of note counts for ${noteType} denomination`
    );
    console.log("TCL: value", +value);
    notes[noteType] = +value;
  });

  atm.deposit(notes);
}

function askForWithdrawl() {
  const amount = prompt("Please Enter Amount want to withdrawl");
  atm.withdraw(amount);
}
