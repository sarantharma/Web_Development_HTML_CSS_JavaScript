"use strict";

// Print off the account balance
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-button");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnDeposit = document.querySelector(".form-btn-deposit");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");

const inputLoginUsername = document.querySelector(".login-user");
const inputLoginPin = document.querySelector(".login-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputDepositAmount = document.querySelector(".input-deposit-amount");
const inputCloseUsername = document.querySelector(".form-user");
const inputClosePin = document.querySelector(".form-pin");

const backendDetails = document.querySelector(".account-details");

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements-row">
        <div class="movements-type movements-type-${type}">${
      i + 1
    } ${type}</div>
        <div class="movements-value">$${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsername = (accounts) => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((x) => x[0])
      .join("");
  });
};

createUsername(accounts);

const displayBackendDetails = function (accounts) {
  accounts.forEach((acc) => {
    const html = `
        <div class="individual-accout">
          <h3 class="_owner">Name: ${acc.owner}</h3>
          <p class="_movements">Movements: ${acc.movements}</p>
          <p class="_interest">Interest: ${acc.interestRate}</p>
          <p class="_username">Username: ${acc.username}</p>
          <p class="_pin">Pin: ${acc.pin}</p>
        </div>
        `;
    backendDetails.insertAdjacentHTML("afterbegin", html);
  });
};

displayBackendDetails(accounts);

const updateUI = (account) => {
  //Display movements
  displayMovements(account.movements);

  //Display balance
  calculateDisplayBalance(account);

  //Display summary
  calculateDisplaySummaey(account);
};

const calculateDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `$${account.balance}`;
};

const calculateDisplaySummaey = (account) => {
  const incomes = account.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `$${incomes}`;

  const outs = account.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `$${Math.abs(outs)}`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `$${interest}`;
};

let currentAccount;

// updateUI(account1);

btnLogin.addEventListener("click", function (e) {
  console.log(e);
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
  updateUI(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username == inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnDeposit.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputDepositAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= 0.1 * amount)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});
