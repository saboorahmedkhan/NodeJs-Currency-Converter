import inquirer from "inquirer";
import chalk from "chalk";
let apiLink = "https://v6.exchangerate-api.com/v6/dff26b4570f1c984d2cd7ac7/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries,
});
let userMoney = await inquirer.prompt({
    type: "number",
    name: "Rs",
    message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
let cnv = `https://v6.exchangerate-api.com/v6/dff26b4570f1c984d2cd7ac7/pair/${firstCountry.name}/${secondCountry.name}`;
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rates;
};
let a = await cnvData(cnv);
let b = userMoney.Rs * a;
console.log(b);
