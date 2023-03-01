'use strict';

/*
2.Написать модуль, который способен выполнять операции с числами любой длины.
 */
// Сложение больших чисел
function addingLargeNumbers(a, b) {
    // return String(BigInt(a) + BigInt(b));
    let listNumbers = appendNullForSmallNumber(a, b);
    a = listNumbers[0];
    b = listNumbers[1];

    let transfer = false;
    let result = '';
    let temp = '';

    let digit;
    let plusOne = '';
    for (let i = 0; i < b.length; i++) {
        if (transfer) {
            plusOne = plus(a[a.length - 1 - i], '1');
            temp = plus(plusOne, b[b.length - 1 - i]);
        } else {
            temp = plus(a[a.length - 1 - i], b[b.length - 1 - i]);
        }
        if (temp.length == 1) {
            result = temp + result;
            transfer = false;
        } else {
            transfer = true;
            digit = temp[1];
            result = digit + result;
        }
    }
    if (transfer) {
        result = '1' + result;
    }
    return result;
}

// Вычитание больших чисел 
function subtractLargeNumbers(a, b) {
    // return String(BigInt(a) - BigInt(b));
    let listNumbers = appendNullForSmallNumber(a, b);
    a = listNumbers[0];
    b = listNumbers[1];
    let result;
    if (a > b) {
        result = subtractSmallForGreat(a, b);
        if (result.startsWith('0') && result.length > 1) result = result.slice(1);
    } else if (b > a) {
        result = subtractSmallForGreat(b, a);
        if (result.startsWith('0')) result = result.slice(1);
        result = '-' + result;
    } else {
        result = '0';
    }
    return result;
}

// Умножение больших чисел
function multiplicationOfLargeNumbers(a, b) {
    // return String(BigInt(a) * BigInt(b));
    if (a.length < b.length) {
        let temp = a;
        a = b;
        b = temp;
    }
    let lengthB = b.length - 1;
    let result = '0';
    let temp = '';
    for (let i = lengthB; i >= 0; i--) {
        temp = multiplicationOnNumber(a, b[i]);
        for (let j = 0; j < lengthB - i; j++) {
            temp = temp + '0';
        }
        result = addingLargeNumbers(result, temp);
    }

    return result;
}

// Деление больших чисел
function divisionOfLargeNumbers(a, b) {
    // return String(BigInt(a) / BigInt(b));
    if (b == '0') return 'на ноль делить нельзя';
    let result = '0';
    let temp = '';
    for (let i=0; i<a.length; i++){       
        temp += a[i];
        let r = '0';
        if (temp.length >= b.length){
            r = div(temp, b);
            temp = subtractLargeNumbers(temp, multiplicationOnNumber(b, r));
        }
        result += r;       
    }
    while (result.startsWith('0') && result.length > 1) result = result.slice(1);
    return result;
}

/*
Вспомогательные функций
*/
// Отношение длины чисел
function lengthRatioNumbers(a, b) {
    if (a.length > b.length) return 1;
    if (b.length > a.length) return -1;
    return 0;
}

// Сложение простх чисел
function plus(a, b) {
    var result = parseInt(a) + parseInt(b);
    return String(result);
}

// Вычитание простых чисел
function minus(a, b) {
    var result = parseInt(a) - parseInt(b);
    return String(result);
}

// Реверсе отрицательных чисел
function reverseMinus(a) {
    var result = 10 + +a;
    return String(result);
}

// Добавление нулей перед меньшим числом
function appendNullForSmallNumber(a, b) {
    let lengthRatio = lengthRatioNumbers(a, b);
    if (lengthRatio == 1) {
        let ratio = a.length - b.length;
        for (let i = 0; i < ratio; i++) {
            b = '0' + b;
        }
    } else if (lengthRatio == -1) {
        let ratio = b.length - a.length;
        for (let i = 0; i < ratio; i++) {
            a = '0' + a;
        }
    }
    return [a, b];
}

// Вчитание меньшего числа из большего
function subtractSmallForGreat(a, b) {
    let transfer = false;
    let result = '';
    let temp = '';
    let plusOne = '';
    let lengthA = a.length - 1;
    for (let i = lengthA; i >= 0; i--) {
        if (transfer) {
            plusOne = plus(b[i], '1');
            transfer = false;
            if (plusOne == '10') {
                temp = a[i];
                transfer = true;
            } else {
                temp = minus(a[i], plusOne);
            }
        } else {
            temp = minus(a[i], b[i]);
        }
        if (temp.startsWith('-')) {
            transfer = true;
            result = reverseMinus(temp) + result;
        } else {
            result = temp + result;
        }
    }
    return result;
}

// Умножение на число
function multiplicationOnNumber(a, b) {
    if (b == '0') return '0';
    let result = a;
    for (let i = 1; i < parseInt(b); i++) {
        result = addingLargeNumbers(result, a);
    }
    return result;
}

// Простое деление
function div(a, b) {
    let counter = 0;
    let list = appendNullForSmallNumber(a, b);
    a = list[0];
    b = list[1];
    while (a >= b) {
        a = subtractLargeNumbers(a, b);
        counter++;
    }
    return String(counter);
}

/*
Тесты
*/
let a = '1000000000000000000000000000000000000000000000000000000000000000000000';
let b = '25000000000000000000000000000'
// Сложение
//1000000000000000000000000000000000000000025000000000000000000000000000
console.log(addingLargeNumbers(a, b)); 
// Вычитание
// 999999999999999999999999999999999999999975000000000000000000000000000
console.log(subtractLargeNumbers(a, b)); 
// Умножение
// 25000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
console.log(multiplicationOfLargeNumbers(a, b)); 
// Деление
// 40000000000000000000000000000000000000000
console.log(divisionOfLargeNumbers(a, b));


