"use strict";
class App {
  #accountList = [
    {
      firstName: "Juan",
      lastName: "Dela Cruz",
      userName: "jdc",
      birthDate: "10/14/1998",
      password: "000000",
      balance: 10246,
      transaction: [10000, 123, 123],
      date: [1660312625301, 1660312625301, 1660312625301],
      currency: "PHP",
      from: ["Account", "Initial Deposit", "Deposit"],
    },
    {
      firstName: "John",
      lastName: "Doe",
      userName: "jd",
      birthDate: "10/14/1998",
      password: "111111",
      balance: 10246,
      transaction: [10000, 123, 123],
      date: [1660312625301, 1660312625301, 1660312625301],
      currency: "USD",
      from: ["Account", "Initial Deposit", "Deposit"],
    },
  ];
  #createAccountData = [];
  #currentAccount;
  #receiverAccount;

  constructor() {
    this.linkContainer = document.querySelectorAll(".nav__links");
    this.allSections = document.querySelectorAll(".section");
    this.allNav = document.querySelectorAll(".nav");
    this.currencyOption = document.querySelector(
      ".section__register__currency"
    );

    // prettier-ignore

    this.createAccountFormItems = document.querySelectorAll(".section__register_input");
    // prettier-ignore
    this.loginAccountFormItems = document.querySelectorAll(".section__login__input");

    // prettier-ignore
    this.createAccountSubmit = document.querySelector('.section__register__submit')
    // prettier-ignore
    this.loginAccountSubmit = document.querySelector('.section__login__submit')
    this.withdrawSubmit = document.querySelector(".section__withdraw__submit");
    this.depositSubmit = document.querySelector(".section__deposit__submit");
    this.transferSubmit = document.querySelector(".section__transfer__submit");

    // Event Listeners
    this.linkContainer.forEach((nav) => {
      nav.addEventListener("click", this.goto.bind(this));
    });

    this.createAccountSubmit.addEventListener(
      "click",
      this.createAccount.bind(this)
    );

    this.loginAccountSubmit.addEventListener(
      "click",
      this.loginAccount.bind(this)
    );

    this.withdrawSubmit.addEventListener("click", this.withdraw.bind(this));
    this.depositSubmit.addEventListener("click", this.deposit.bind(this));
    this.transferSubmit.addEventListener("click", this.transfer.bind(this));
  }

  goto(e) {
    e.preventDefault();
    const className = e.target.dataset.src;

    this.allSections.forEach((sec) => {
      sec.classList.add("--hidden");
    });

    className === ".logout"
      ? this.logout()
      : this.removeClass(className, "--hidden");
  }

  createAccount(e) {
    e.preventDefault();
    // hide section

    this.hideSection();

    this.createAccountFormItems.forEach((input) => {
      this.#createAccountData.push(input.value);
    });

    // converting to object

    const account = {
      firstName: this.#createAccountData[0],
      lastName: this.#createAccountData[1],
      userName: this.#createAccountData[2],
      birthDate: this.#createAccountData[3],
      password: this.#createAccountData[4],
      balance: +this.#createAccountData[5] + 200,
      transaction: [200, +this.#createAccountData[5]],
      date: [Date.now(), Date.now()],
      currency:
        this.currencyOption.options[this.currencyOption.selectedIndex].value,
      from: ["Account", "Initial Deposit"],
    };

    this.#accountList.push(account);
    this.#createAccountData = [];

    this.removeClass(".section__Login", "--hidden");
    this.removeClass(".nav--loggedOut", "--hidden");
    this.clearfield();
    console.log(this.#accountList);
  }

  loginAccount(e) {
    e.preventDefault();
    let account = [];

    this.loginAccountFormItems.forEach((input) => {
      account.push(input.value);
    });

    [this.#currentAccount] = this.#accountList.filter((acc) => {
      if (acc.userName === account[0] && acc.password === account[1])
        return acc;
    });

    if (this.#currentAccount) {
      this.hideSection();
      this.removeClass(".section__withrdaw", "--hidden");
      this.renderInfo();
      this.removeClass(".nav--loggedIn", "--hidden");
    } else {
      this.clearfield();
    }
  }

  hideSection() {
    this.allSections.forEach((section) => {
      section.classList.add("--hidden");
    });

    this.allNav.forEach((nav) => {
      nav.classList.add("--hidden");
    });
  }

  renderInfo() {
    // prettier-ignore
    document.querySelector(".section__information").innerHTML = ` <div class="transaction"></div>`;

    const dateType = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const html = `<h1 class="section__information_greetings">Hello, ${
      this.#currentAccount.firstName
    }</h1>
    <span class="section__information__time">Date: ${this.formatDate(
      dateType,
      new Date()
    )}</span>
    <span class="section__information__balance">Balance: ${this.currencyFormat(
      this.#currentAccount.currency,
      this.#currentAccount.balance
    )}</span>
    </div>`;

    this.#currentAccount.transaction.forEach((tr, i) => {
      const transHtml = `
      <div class="transaction__item ${
        this.#currentAccount.transaction[i] > 0 ? "--withdraw" : "--deposit"
      }">
        <span class="transaction__item__type">${
          this.#currentAccount.from[i]
        }</span>
        <span class="transaction__item__date">${this.formatDate(
          dateType,
          this.#currentAccount.date[i]
        )}</span>
        <span class="transaction__item__amount">${this.currencyFormat(
          this.#currentAccount.currency,
          this.#currentAccount.transaction[i]
        )}</span>
      </div>
   `;

      document
        .querySelector(".transaction")
        .insertAdjacentHTML("afterbegin", transHtml);
      this.removeClass(".section__information", "--hidden");
    });

    document
      .querySelector(".section__information")
      .insertAdjacentHTML("afterbegin", html);
    this.removeClass(".section__information", "--hidden");
  }

  logout() {
    this.#currentAccount = [];
    this.addClass(".section__information", "--hidden");
    this.addClass(".nav--loggedIn", "--hidden");
    this.removeClass(".nav--loggedOut", "--hidden");
    this.removeClass(".section__Login", "--hidden");
    this.clearfield();
  }

  addClass(id, className) {
    return document.querySelector(id).classList.add(className);
  }
  removeClass(id, className) {
    return document.querySelector(id).classList.remove(className);
  }
  currencyFormat(type, str) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: type,
    }).format(str);
  }

  formatDate(type, str) {
    return new Intl.DateTimeFormat(navigator.language, type).format(str);
  }
  clearfield() {
    document.querySelectorAll("input").forEach((el) => {
      if (el.type === "submit") return;
      el.value = "";
    });
  }

  withdraw(e) {
    e.preventDefault();

    const withdrawAmount = +document.querySelector(".section__withdraw_input")
      .value;

    if (withdrawAmount <= this.#currentAccount.balance && withdrawAmount != 0) {
      this.#currentAccount.balance -= withdrawAmount;
      this.#currentAccount.transaction.push(-withdrawAmount);
      this.#currentAccount.date.push(Date.now());
      this.#currentAccount.from.push("Withdraw");
    }
    this.renderInfo();
    this.clearfield();
  }
  deposit(e) {
    e.preventDefault();

    const depositAmount = +document.querySelector(".section__deposit_input")
      .value;

    if (depositAmount != 0) {
      this.#currentAccount.balance += depositAmount;
      this.#currentAccount.transaction.push(depositAmount);
      this.#currentAccount.date.push(Date.now());
      this.#currentAccount.from.push("Deposit");
    }
    console.log(this.#accountList);
    this.renderInfo();
    this.clearfield();
  }

  transfer(e) {
    e.preventDefault();
    let transferAmount = +document.querySelector(".section__transfer__value")
      .value;

    let originalAmount = transferAmount;

    const transferReciever = document.querySelector(
      ".section__transfer__receiver"
    ).value;

    [this.#receiverAccount] = this.#accountList.filter((acc) => {
      return acc.userName === transferReciever;
    });

    if (transferAmount != 0 && transferAmount <= this.#currentAccount.balance) {
      if (
        this.#currentAccount.currency === "USD" &&
        this.#receiverAccount.currency === "PHP"
      ) {
        transferAmount *= 55.72;
      } else if (
        this.#currentAccount.currency === "PHP" &&
        this.#receiverAccount.currency === "USD"
      ) {
        transferAmount *= 0.018;
      } else if (
        (this.#currentAccount.currency &&
          this.#receiverAccount.currency === "USD") ||
        (this.#currentAccount.currency &&
          this.#receiverAccount.currency === "PHP")
      )
        transferAmount = originalAmount;

      this.#receiverAccount.balance += transferAmount;
      this.#receiverAccount.transaction.push(transferAmount);
      this.#receiverAccount.date.push(Date.now());
      this.#receiverAccount.from.push(
        `Bank Transfer: From ${this.#currentAccount.firstName} ${
          this.#currentAccount.lastName
        }`
      );

      transferAmount = originalAmount;

      this.#currentAccount.balance -= transferAmount;
      this.#currentAccount.transaction.push(-transferAmount);
      this.#currentAccount.date.push(Date.now());
      this.#currentAccount.from.push(
        `Bank Transfer: To ${this.#receiverAccount.firstName} ${
          this.#receiverAccount.lastName
        }`
      );
    }

    this.renderInfo();
    this.clearfield();
  }
}

const app = new App();

// Designed and Developed by Essencesei
