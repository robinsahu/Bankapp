'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const errorUser = document.querySelector('.error_user');
const errorPassword = document.querySelector('.error_password');
const errorUserTransfer = document.querySelector('.error_userTransfer');
const errorAmount = document.querySelector('.error_amount');


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];





// Computing username

const createUsernames = function (accs) {

  for (const acc of accs) {
    acc.username = acc.owner.toLowerCase().split(' ').map(function (word) {
      return word[0];
    }).join('');
  }
};

createUsernames(accounts);

// Update UI

const updateUI = function (acc) {
  //  Display movements
  displayMovement(acc);



  // Display Summary
  calcDisplaySummary(acc);

  //  Display balance
  calcDisplayBalance(acc);
}

// Date Function

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  // if (daysPassed === 0) return 'Today';
  // if (daysPassed === 1) return 'Yesterday';
  // if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
  // return new Intl.DateTimeFormat(locale).format(date);
};

//  Display movements on DIV block

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = '';


  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  for (const [i, movement] of movs.entries()) {

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);


    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">&#8377;${Math.abs(movement)}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // containerMovements.insertAdjacentHTML('beforeend', html);  // beforeend is used when you need element first on top
  }
}


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `₹${acc.balance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₹${incomes}`;

  const outcome = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₹${Math.abs(outcome)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `₹${interest}`;

}




let currentAccount, timer;
let movementDislplay = 0;

//timer to logout


const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 600;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.classList.add('hidden');
    }

    // Decrease 1s
    time--;
  };



  // Call the timer every second
  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

// To validate Login

const loginValidation = function () {
  if (inputLoginPin.value === '' || inputLoginUsername.value === '') {
    if (inputLoginPin.value === '') {
      document.getElementById('pin_error').textContent = `Pin is required`;
      errorPassword.classList.remove('hidden');
      errorUser.classList.add('hidden')
    }
    else {
      document.getElementById('user_error').textContent = `User is required`;
      errorUser.classList.remove('hidden');
      errorPassword.classList.add('hidden');
    }
  }
  else if (!currentAccount) {
    document.getElementById('user_error').textContent = `User does not exist`;
    errorPassword.classList.add('hidden');
    errorUser.classList.remove('hidden');
  }
  else {
    document.getElementById('pin_error').textContent = `Pin is incorrect`;
    errorUser.classList.add('hidden');
    errorPassword.classList.remove('hidden');
  }
}

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();



  // errorPassword.classList.remove('hidden');
  // errorUser.classList.remove('hidden');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  loginValidation();
  inputLoginPin.blur();
  //When clicking on login when already in user

  if (movementDislplay === 0 && inputLoginPin.value === '' && inputLoginUsername.value === '') {
    errorUser.classList.add('hidden');
    errorPassword.classList.add('hidden');
  }
  else {
    movementDislplay === 1;
  }
  ///
  if (currentAccount && currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    errorUser.classList.add('hidden');
    errorPassword.classList.add('hidden');
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.classList.remove('hidden');

    //Clear the input fields

    inputLoginUsername.value = '';
    inputLoginPin.value = '';




    //update UI

    updateUI(currentAccount);
    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

  }


});

//to validate transfer fields

const transferValidation = function (receiverAcc, amount) {
  if (inputTransferAmount.value === '' || inputTransferTo.value === '') {
    if (inputTransferAmount.value === '') {
      document.getElementById('amount_error').textContent = `Amount is required`;
      errorUserTransfer.classList.add('hidden');
      errorAmount.classList.remove('hidden')
      errorAmount.style.backgroundColor = '#fff';
      errorAmount.style.color = 'Black';
    }
    else {
      document.getElementById('transferUser_error').textContent = `User is required`;
      errorUserTransfer.classList.remove('hidden');
      errorAmount.classList.add('hidden')
      errorUserTransfer.style.backgroundColor = '#fff';
      errorUserTransfer.style.color = 'Black';
    }
  }
  else if (!receiverAcc) {
    document.getElementById('transferUser_error').textContent = `User does not exist`;
    errorUserTransfer.classList.remove('hidden');
    errorAmount.classList.add('hidden')
    errorUserTransfer.style.backgroundColor = '#fff';
    errorUserTransfer.style.color = 'Black';
  }
  else if (amount <= 0) {
    document.getElementById('amount_error').textContent = `Invalid Amount `;
    errorUserTransfer.classList.add('hidden');
    errorAmount.classList.remove('hidden')
    errorAmount.style.backgroundColor = '#fff';
    errorAmount.style.color = 'Black';
  }

  else if (currentAccount.balance <= amount) {
    errorUserTransfer.classList.add('hidden');
    errorAmount.classList.add('hidden')
    alert(`You don't have enough balance in your account`);

  }
  else if (currentAccount.username === receiverAcc.username) {
    alert(`You can't transfer money to your own account`)
  }
}

//Transfer to account

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(currentAccount);

  transferValidation(receiverAccount, amount);


  if (amount > 0 && currentAccount.balance >= amount && currentAccount.username !== receiverAccount?.username && receiverAccount?.username) {

    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);

    receiverAccount.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
    alert(`${amount} has been succesfully transferred to ${receiverAccount.username}`);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }



})

//Loan amount 

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && currentAccount?.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);
    containerApp.classList.add('hidden');
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
  else if (currentAccount.username !== inputCloseUsername.value) {
    alert(`Username is incorrect`);
  }
  else {
    alert(`Pin is incorrect`);
  }
})

//sorting

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});






