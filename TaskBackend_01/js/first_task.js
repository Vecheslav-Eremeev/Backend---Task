'use strict';

// 1.1. Преобразование строки к нижнему регистру, но первая буква большая.
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 1.2. Преобразование строки с целью правильно расстановки пробелов.
function fixSpaceInString(str) {
    let res = '';
    str = str.trim();
    const arr = ['!', '.', ','];
    let lengthStr = str.length;
    for(let i=0; i<lengthStr; i++){
        if(arr.includes(str[i])){
            if (res[res.length - 1] === ' '){
                res = res.slice(0, res.length - 1);
            }
            res += str[i] + ' ';        
        }else if(str[i] === ' ' && res[res.length - 1] === ' '){
            continue;
        }else{
            res += str[i];
        }
    }
    return res.trimEnd();
}

// 1.3. Посдчитывающие кол-во слов в строке.
function countWordsInString(str) {
    return str.trim().split(/\s+/).length;
}

// 1.4. Подсчитывающий, уникальные слова.
function countUniqueWordsInString(str) {
    str = str.replace(/[\,, ., !, ?, :, ;]/g, ' ');
    str = str.trim().toLowerCase().split(/\s+/);
    let setUniqueWords = new Set(str);   
    return setUniqueWords.size;
}