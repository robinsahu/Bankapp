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




/////////////////////////////////////////////////

// Array Practice

/*

//SlICE

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice(-2));
console.log(arr.slice()); // Shallow copy using slice method
console.log([...arr]); // Shallow copy using spread operator

// SPLICE

// console.log(arr.splice(2)); // Changes the original array
console.log(arr.splice(1, 2));  // splice basically use to remove element at particular index
console.log(arr);

// REVERSE

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // Reverse mutate the original array
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);  // concat does not mutate original
console.log(letters);
console.log([...arr, ...arr2]);  // we can do this as well

// JOIN
console.log(letters.join(' - '));

*/



///////////////////////////////////////
// Looping Arrays: forEach

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

*/

// Coding Challange 

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*

const checkDogs = function (julia_data, kate_data) {
  const dogsJuliaCorrected = julia_data.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  const dogArray = dogsJuliaCorrected.concat(kate_data);
  console.log(dogArray);

  for (const [i, dog_age] of dogArray.entries()) {
    const str = dog_age < 3 ? `Dog number ${i + 1} is still a puppy 🐶` : `"Dog number ${i + 1} is an adult and is ${dog_age} years old"`;
    console.log(str);
  }

}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

*/


///////////////////////////////////////

/*

// The map Method
const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// const movementsUSD = movements.map(mov => mov * eurToUsd);  // Using arraow function

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(function (mov, i) {
  return

  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
    mov)}`;
}
);
console.log(movementsDescriptions);

*/


///////////////////////////////////////

// The filter Method
/*

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

*/

///////////////////////////////////////

// The reduce Method
/*
console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

*/


/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    return age <= 2 ? 2 * age : 16 + (age * 4);
  })
  const oldAge = humanAge.filter(function (age) {
    return age >= 18;
  })

  const avgAdultDogs = (oldAge.reduce(function (acc, value) {
    return acc + value;
  }, 0)) / oldAge.length;

  console.log(humanAge, oldAge, avgAdultDogs);

}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

*/


///////////////////////////////////////

/*

// The Magic of Chaining Methods
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

///////////////////////////////////////


///////////////////////////////////////

/*

// The find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/


//////////////////////

// findIndex - see account transfer code


///////////////////////////////////////

/*

// some and every
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));  // some also takes

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

///////////////////////////////////////


// flat and flatMap

/*

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // one level deep default is 1

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));  // two level deep

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)  // compines both flat and map to enhance performance
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

*/

///////////////////////////////////////
// Sorting Arrays

/*

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1; // keep order
//   if (a < b) return -1; //switch order
// });
movements.sort((a, b) => a - b); // compare function
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);


///////////////////////////////////////

/*

// More Ways of Creating and Filling Arrays


const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

*/
///////////////////////////////////////

///////////////////////////////////////
// Array Methods Practice
/*
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/


///////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
/*

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
//1
const recommendedFood = dogs.map(function (obj) {
  obj.recommendeFood = Math.trunc(obj.weight ** 0.75 * 28);
  return obj;
});
console.log(recommendedFood);


// 2.
// const findSarah = dogs.find(obj => obj.owners.find(owner => owner == 'Sarah'));
//or
const findSarah = dogs.find(obj => obj.owners.includes('Sarah'));
console.log(findSarah);
console.log(findSarah.recommendeFood > dogs.curFood ? `he is eating too less` : `he is eatin too much`);

//3.

const ownersEatTooMuch = recommendedFood.filter((mov) => mov.curFood > mov.recommendeFood).flatMap((mov) => mov.owners);
console.log(ownersEatTooMuch);


const ownersEatTooLittle = recommendedFood.filter((mov) => mov.curFood < mov.recommendeFood).flatMap((mov) => mov.owners);
console.log(ownersEatTooLittle);

//4.

console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much !`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little !`);

//8

const copyOfDogs = dogs.slice().
  sort((a, b) => a.recommendeFood - b.recommendeFood)
  ;
console.log(copyOfDogs);

*/



