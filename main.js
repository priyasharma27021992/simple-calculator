const displayScreen1 = document.getElementById("display-screen-1");
const displayScreen2 = document.getElementById("display-screen-2");
const btnArray = document.getElementsByClassName("btn");
const clearBtn = document.getElementById('clearBtn');
const equalBtn = document.getElementById('equalBtn');

let inputExp = "";

for (let item of btnArray) {
    item.addEventListener("click", e => saveInput(e));
}

clearBtn.addEventListener("click", () => {
    inputExp = '';
    displayScreen1.value = 0;
});

equalBtn.addEventListener("click", () => {
    displayScreen2.value = `Ans = ${evaluate(inputExp)}`;
});

function saveInput(e) {
    inputExp += e.target.innerHTML;
    displayScreen1.value = inputExp;
}


function evaluate(expression) {
    expression = expression.replace(/\s+/g, '');
    return helper(Array.from(expression), 0);
}

function helper(s, idx) {
    let stack = [];
    let sign = '+';
    let num = 0;
    let floatingPrecision = 0;
    for (let i = idx; i < s.length; i++) {
        let c = s[i];
        if ((c >= '0' && c <= '9') || c === '.') {
            num += c;
            console.log(num);
        }
        if (!(c >= '0' && c <= '9') && c !== '.' || i === s.length - 1) {

            if (c === '(') {
                num = helper(s, i + 1);
                let l = 1,
                    r = 0;
                for (let j = i + 1; j < s.length; j++) {
                    if (s[j] === ')') {
                        r++;
                        if (l === r) {
                            i = j;
                            break;
                        }

                    } else if (s[j] === '(') {
                        l++;
                    }
                }
                if (l !== r) {
                    return 'Error';
                }
            }

            let pre = -1;
            switch (sign) {
                case '+':
                    stack.push(+num);
                    break;
                case '-':
                    stack.push(num * -1);
                    break;
                case '*':
                    pre = stack.pop();
                    stack.push(pre * num);
                    break;
                case '/':
                    pre = stack.pop();
                    stack.push(pre / num);
                    break;
                case '%':
                    pre = stack.pop();
                    stack.push(pre % num);
                    break;
            }
            if (num.indexOf('.') >= 0) {
                if (floatingPrecision < num.length - num.indexOf('.')) floatingPrecision = num.length - num.indexOf('.');
            }
            sign = c;
            num = 0;
            if (c === ')')
                break;
        }
    }
    let ans = 0;
    while (stack.length) {
        ans += stack.pop();
    }
    debugger;
    if (floatingPrecision > 0) {
        ans.toFixed(floatingPrecision)
    }
    return ans;
}


// let stack = [];
// const operators = ['*', '+', '=', '/', '-', '%'];
// const brackets = ['(', ')'];



// const showOnDisplay = (e) => {
//     const input = e.target.innerHTML;
//     const isOperator = operators.indexOf(input);
//     if (isOperator >= 0 || brackets.indexOf(input) >= 0) {
//         stack.push(input);
//     } else {
//         if (stack.length > 0) {
//             if (operators.indexOf(stack[stack.length - 1]) >= 0 || brackets.indexOf(stack[stack.length - 1]) >= 0) {
//                 stack.push(input);
//             } else {
//                 stack[stack.length - 1] += input;
//             }
//         } else {
//             stack.push(input)
//         }
//     }
//     displayScreen1.innerHTML = stack.toString().replaceAll(",", "");
// }




// const calculate = (stack) => {
//     const operForCalc = [];
//     const numbers = [];
//     let result = 0;
//     if (stack.length == 0 || operators.indexOf(stack[stack.length - 1]) >= 0) {
//         return 0;
//     }
//     for (const element of stack) {
//         debugger;
//         if (operators.indexOf(element) >= 0) {
//             operForCalc.push(element);
//         } else if (+element >= 0 && +element <= 9) {
//             numbers.push(element);
//         }
//         if (numbers.length === 2) {
//             result = calculateArithemetic(+numbers.shift(), +numbers.shift(), operForCalc.shift());
//             numbers.unshift(result);
//         }

//         if (element === '(') {
//             let res = calculate(stack.slice(stack.indexOf(element) + 1));
//             numbers.push(res);
//         }
//         if (element === ')') {
//             continue;
//         }
//     }
//     return numbers[0];
// }

// const calculateArithemetic = (num1, num2, oper) => {
//     switch (oper) {
//         case '+':
//             return num1 + num2;
//         case '-':
//             return num1 - num2;
//         case '*':
//             return num1 * num2;
//         case '/':
//             return num1 / num2;
//         case '%':
//             return num1 % num2;
//         default:
//             return num1 + num2;
//     }
// }