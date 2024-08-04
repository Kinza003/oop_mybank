#! /usr/bin/env node
import inquirer from "inquirer";
// BankAccount class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} has been successful.\n Your remaining balance is $${this.balance}.`);
        }
        else {
            console.log("Insufficient balance!");
        }
    }
    // Credit monet
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 dollar fee charged if more than $100 dollar deposited
        }
        this.balance += amount;
        console.log(`Deposition of $${amount} has been successful. \n Your total balance is $${this.balance}.`);
    }
    // Check balance
    checkBalance() {
        console.log(`Your current balance is ${this.balance}`);
    }
}
// Create customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNo;
    account;
    constructor(firstName, lastName, gender, age, mobileNo, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNo = mobileNo;
        this.account = account;
    }
}
// Create Instance of BankAccount
const accounts = [
    new BankAccount(1001, 300000),
    new BankAccount(1002, 200000),
    new BankAccount(1003, 100000),
];
// Create Instance of Customer
const customers = [
    new Customer("Kinza", "Naseer", "female", 16, 342 - 2401452, accounts[0]),
    new Customer("Laiba", "Naseer", "female", 16, 342 - 2401453, accounts[1]),
    new Customer("Huzaifa", "Naseer", "male", 16, 342 - 2401454, accounts[2]),
];
// Function to interact with BankAccount
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: ",
        });
        const customer = customers.find((customer) => customer.account.accountNumber == accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const answer = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation: ",
                choices: ["Deposit", "Withdraw", "CheckBalance", "Exit"],
            });
            switch (answer.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit: "
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw: "
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "CheckBalance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...\n");
                    console.log("Thankyou for using our bank services. \n Have a great day.");
                    return;
            }
        }
        else {
            console.log("Invalid account number! \n Please try again!");
        }
    } while (true);
}
service();
