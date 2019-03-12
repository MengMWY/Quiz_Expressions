var readline = require('readline-sync');
var expressions = [];       //String containing the mathematical expressions
const N_EQ = 10;        //Number of mathematical expressions
var correctAnswer = [];     //Array containing 
var j = 0;
var ca = 0;     //Counter for the correct answers

main();     //Call the function main

//Function that generate random number within a range
function generateRandomValue(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

//Function that generate and compute an expression
function generateExpression(factors, operations) {
    var result = factors[0];
    var expression = '' + factors[0];       //Insert the random factor into the string

    for (var i = 0; i < operations.length; i++) {
        switch (operations[i]) {
            case 0:     //Addition
                result += factors[i + 1];       //Compute the operation and update the result
                expression += (' + ' + factors[i + 1]);     //Insert the random factor into the string
                break;

            case 1:     //Subtraction
                result -= factors[i + 1];       //Compute the operation and update the result
                expression += (' - ' + factors[i + 1]);     //Insert the random factor into the string
                break;
            case 2:     //Multiplication
                result *= factors[i + 1];       //Compute the operation and update the result
                expression += (' * ' + factors[i + 1]);     //Insert the random factor into the string
                break;
            case 3:     //Division
                result *= 1 / factors[i + 1];       //Compute the operation and update the result
                expression += (' / ' + factors[i + 1]);     //Insert the random factor into the string
                break;
        }
    }

    var attempt = readline.question(expression + ' = ');    //Acquire the result from the console and print the expression
    if (attempt == Math.round(result)) {
        correctAnswer[j] = 1;    //Correct answers
        ca++;       //Increase the counter for the correct answers
    }
    else correctAnswer[j] = 0;      //Wrong answers
    j++;
    expression += ' = ' + Math.round(result);       //Insert the result into the string
    return expression;      //Return the string containing the expression


}

//Main function
function main() {
    var decision = 1;

    while (decision == 1) {
        console.time("Total time: ");       //Start the stopwatch
        for (var i = 0; i < N_EQ; i++) {
            var numberFactors = generateRandomValue(3, 5);      //Generate che number of factors into the expression

            var factors = [];
            var operations = [];

            for (var j = 0; j < numberFactors; j++) {
                factors[j] = generateRandomValue(0, 100);       //Generate the factors into the expression
                if (j < numberFactors - 1) operations[j] = generateRandomValue(0, 3);       //Generate the operations into the expression  
            }

            console.log('The number', (i + 1), 'question: ');       //Print the message  
            expressions[i] = generateExpression(factors, operations);       //Save all the expressions into an array
        }

        console.timeEnd("Total time: ");        //Stop the stopwatch
        console.log("\nThe number of correct answers: " + ca);      //Print the message
        console.log("\nThe followings are the right answers to the questions you've gotten wrong");     //Print the message
        for (var k = 0; k < N_EQ; k++) {
            if (correctAnswer[k] == 0) console.log(expressions[k]);     //Print th correct answers  
        };

        decision = 0;

        while (decision != 1 && decision != 2) {
            //Acquire the decision and print the message
            decision = readline.question("\nDo you want to proceed to the next round?\n1) proceed\n2) exit\n");
        }
    }
}