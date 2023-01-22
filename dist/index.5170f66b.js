!function(){function e(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var t=[{owner:"Jonas Schmedtmann",movements:[200,450,-400,3e3,-650,-130,70,1300],interestRate:1.2,pin:1111,movementsDates:["2019-11-18T21:31:17.178Z","2019-12-23T07:42:02.383Z","2020-01-28T09:15:04.904Z","2020-04-01T10:17:24.185Z","2020-05-08T14:11:59.604Z","2020-07-26T17:01:17.194Z","2020-07-28T23:36:17.929Z","2020-08-01T10:51:36.790Z"]},{owner:"Jessica Davis",movements:[5e3,3400,-150,-790,-3210,-1e3,8500,-30],interestRate:1.5,pin:2222,movementsDates:["2019-11-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-25T06:04:23.907Z","2020-01-25T14:18:46.235Z","2020-02-05T16:33:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T18:49:59.371Z","2020-07-26T12:01:20.894Z"]},{owner:"Steven Thomas Williams",movements:[200,-200,340,-300,-20,50,400,-460],interestRate:.7,pin:3333,movementsDates:["2019-11-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-25T06:04:23.907Z","2020-01-25T14:18:46.235Z","2020-02-05T16:33:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T18:49:59.371Z","2020-07-26T12:01:20.894Z"]},{owner:"Sarah Smith",movements:[430,1e3,700,50,90],interestRate:1,pin:4444,movementsDates:["2019-11-18T21:31:17.178Z","2019-12-23T07:42:02.383Z","2020-01-28T09:15:04.904Z","2020-04-01T10:17:24.185Z","2020-05-08T14:11:59.604Z","2020-07-26T17:01:17.194Z","2020-07-28T23:36:17.929Z","2020-08-01T10:51:36.790Z"]}],n=document.querySelector(".welcome"),r=document.querySelector(".date"),o=document.querySelector(".balance__value"),a=document.querySelector(".summary__value--in"),c=document.querySelector(".summary__value--out"),u=document.querySelector(".summary__value--interest"),s=document.querySelector(".timer"),i=document.querySelector(".app"),l=document.querySelector(".movements"),d=document.querySelector(".login__btn"),m=document.querySelector(".form__btn--transfer"),v=document.querySelector(".form__btn--loan"),f=document.querySelector(".form__btn--close"),y=document.querySelector(".btn--sort"),p=document.querySelector(".login__input--user"),_=document.querySelector(".login__input--pin"),h=document.querySelector(".form__input--to"),S=document.querySelector(".form__input--amount"),g=document.querySelector(".form__input--loan-amount"),T=document.querySelector(".form__input--user"),b=document.querySelector(".form__input--pin"),L=document.querySelector(".error_user"),Z=document.querySelector(".error_password"),q=document.querySelector(".error_userTransfer"),w=document.querySelector(".error_amount");new Map([["USD","United States dollar"],["EUR","Euro"],["GBP","Pound sterling"]]);!function(e){var t=!0,n=!1,r=void 0;try{for(var o,a=e[Symbol.iterator]();!(t=(o=a.next()).done);t=!0){var c=o.value;c.username=c.owner.toLowerCase().split(" ").map((function(e){return e[0]})).join("")}}catch(e){n=!0,r=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw r}}}(t);var D,x,C=function(e){I(e),B(e),k(e)},E=function(e){var t,n,r=(t=new Date,n=e,Math.round(Math.abs(n-t)/864e5));console.log(r);var o="".concat(e.getDate()).padStart(2,0),a="".concat(e.getMonth()+1).padStart(2,0),c=e.getFullYear();return"".concat(o,"/").concat(a,"/").concat(c)},I=function(t,n){var r=void 0!==n&&n;l.innerHTML="";var o=r?t.movements.slice().sort((function(e,t){return e-t})):t.movements,a=!0,c=!1,u=void 0;try{for(var s,i=o.entries()[Symbol.iterator]();!(a=(s=i.next()).done);a=!0){var d=e(s.value),m=d[0],v=d[1],f=new Date(t.movementsDates[m]),y=E(f),p=v>0?"deposit":"withdrawal",_=' <div class="movements__row">\n          <div class="movements__type movements__type--'.concat(p,'">').concat(m+1," ").concat(p,'</div>\n          <div class="movements__date">').concat(y,'</div>\n          <div class="movements__value">&#8377;').concat(Math.abs(v),"</div>\n        </div>");l.insertAdjacentHTML("afterbegin",_)}}catch(e){c=!0,u=e}finally{try{a||null==i.return||i.return()}finally{if(c)throw u}}},k=function(e){e.balance=e.movements.reduce((function(e,t){return e+t}),0),o.textContent="₹".concat(e.balance)},B=function(e){var t=e.movements.filter((function(e){return e>0})).reduce((function(e,t){return e+t}),0);a.textContent="₹".concat(t);var n=e.movements.filter((function(e){return e<0})).reduce((function(e,t){return e+t}),0);c.textContent="₹".concat(Math.abs(n));var r=e.movements.filter((function(e){return e>0})).map((function(t){return t*e.interestRate/100})).filter((function(e,t,n){return e>=1})).reduce((function(e,t){return e+t}),0);u.textContent="₹".concat(r)};d.addEventListener("click",(function(e){if(e.preventDefault(),D=t.find((function(e){return e.username===p.value})),""===_.value||""===p.value?""===_.value?(document.getElementById("pin_error").textContent="Pin is required",Z.classList.remove("hidden"),L.classList.add("hidden")):(document.getElementById("user_error").textContent="User is required",L.classList.remove("hidden"),Z.classList.add("hidden")):D?(document.getElementById("pin_error").textContent="Pin is incorrect",L.classList.add("hidden"),Z.classList.remove("hidden")):(document.getElementById("user_error").textContent="User does not exist",Z.classList.add("hidden"),L.classList.remove("hidden")),_.blur(),""===_.value&&""===p.value&&(L.classList.add("hidden"),Z.classList.add("hidden")),D&&(null==D?void 0:D.pin)===Number(_.value)){L.classList.add("hidden"),Z.classList.add("hidden"),n.textContent="Welcome back, ".concat(D.owner.split(" ")[0]),i.classList.remove("hidden"),p.value="",_.value="",C(D),x&&clearInterval(x),m=600,v=function(){var e=String(Math.trunc(m/60)).padStart(2,0),t=String(m%60).padStart(2,0);s.textContent="".concat(e,":").concat(t),0===m&&(clearInterval(x),n.textContent="Log in to get started",i.classList.add("hidden")),m--},v(),x=x=setInterval(v,1e3);var o=new Date,a="".concat(o.getDate()).padStart(2,0),c="".concat(o.getMonth()+1).padStart(2,0),u=o.getFullYear(),l="".concat(o.getHours()).padStart(2,0),d="".concat(o.getMinutes()).padStart(2,0);r.textContent="".concat(a,"/").concat(c,"/").concat(u,", ").concat(l,":").concat(d)}var m,v}));m.addEventListener("click",(function(e){e.preventDefault();var n=Number(S.value),r=t.find((function(e){return e.username===h.value}));console.log(D),function(e,t){""===S.value||""===h.value?""===S.value?(document.getElementById("amount_error").textContent="Amount is required",q.classList.add("hidden"),w.classList.remove("hidden"),w.style.backgroundColor="#fff",w.style.color="Black"):(document.getElementById("transferUser_error").textContent="User is required",q.classList.remove("hidden"),w.classList.add("hidden"),q.style.backgroundColor="#fff",q.style.color="Black"):e?t<=0?(document.getElementById("amount_error").textContent="Invalid Amount ",q.classList.add("hidden"),w.classList.remove("hidden"),w.style.backgroundColor="#fff",w.style.color="Black"):D.balance<=t?(q.classList.add("hidden"),w.classList.add("hidden"),alert("You don't have enough balance in your account")):D.username===e.username&&alert("You can't transfer money to your own account"):(document.getElementById("transferUser_error").textContent="User does not exist",q.classList.remove("hidden"),w.classList.add("hidden"),q.style.backgroundColor="#fff",q.style.color="Black")}(r,n),n>0&&D.balance>=n&&D.username!==(null==r?void 0:r.username)&&(null==r?void 0:r.username)&&(r.movements.push(n),D.movements.push(-n),r.movementsDates.push((new Date).toISOString()),D.movementsDates.push((new Date).toISOString()),C(D),h.value="",S.value="",S.blur(),alert("".concat(n," has been succesfully transferred to ").concat(r.username)),h.value="",S.value="",S.blur())})),v.addEventListener("click",(function(e){e.preventDefault();var t=Number(g.value);t>0&&D.movements.some((function(e){return e>=.1*t}))&&(D.movements.push(t),D.movementsDates.push(new Date),C(D)),g.value=""})),f.addEventListener("click",(function(e){if(e.preventDefault(),T.value===D.username&&(null==D?void 0:D.pin)===Number(b.value)){var n=t.findIndex((function(e){return e.username===D.username}));console.log(n),t.splice(n,1),i.classList.add("hidden"),T.value="",b.value=""}else D.username!==T.value?alert("Username is incorrect"):alert("Pin is incorrect")}));var M=!1;y.addEventListener("click",(function(e){e.preventDefault(),I(D,!M),M=!M}))}();
//# sourceMappingURL=index.5170f66b.js.map