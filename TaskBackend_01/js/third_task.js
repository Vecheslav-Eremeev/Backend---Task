'use strict';

// 3. Создать класс данных “Товар”
class Product {
    constructor(name, price, quantity, description) {
        this.name = name; // Название
        this.price = price; // Цена
        this.quantity = quantity; // Количество
        this.description = description; // Описание
    }
}

// Вернуть массив продуктов с названием содержащим подстроку
function getProductNameContains(products, str) {
    return products.filter(item => item.name.includes(str));
}

// Вернуть массив продуктов с названием начинающихся с подстроки
function getProductNameStarts(products, str) {
    return products.filter(item => item.name.startsWith(str));
}

// Вернуть массив продуктов с названием заканчиваюшимся на подстроку
function getProductNameEnds(products, str) {
    return products.filter(item => item.name.endsWith(str));
}

// Вернуть массив продуктов с описанием содержащим подстроку
function getProductDescriptionContains(products, str) {
    return products.filter(item => item.description.includes(str));
}

// Вернуть массив продуктов с описанием начинающихся с подстроки
function getProductDescriptionStarts(products, str) {
    return products.filter(item => item.description.startsWith(str));
}

// Вернуть массив продуктов с описаникм заканчиваюшимся на подстроку
function getProductDescriptionEnds(products, str) {
    return products.filter(item => item.description.endsWith(str));
}

// Вернуть массив продуктов с ценой больше чем значение
function getPriceMoreThan(products, num) {
    return products.filter(item => item.price > num);
}

// Вернуть массив продуктов с ценой больше чем или равной значению
function getPriceMoreThanOrEquals(products, num) {
    return products.filter(item => item.price >= num);
}

// Вернуть массив продуктов с ценой меньше чем значение
function getPriceLessThan(products, num) {
    return products.filter(item => item.price < num);
}

// Вернуть массив продуктов с ценой меньше чем или равной значению
function getPriceLessThanOrEquals(products, num) {
    return products.filter(item => item.price <= num);
}

// Вернуть массив продуктов с ценой равной значению 
function getPriceEquals(products, num) {
    return products.filter(item => item.price == num);
}

// Вернуть массив продуктов с количеством больше чем значение
function getQuantityMoreThan(products, num) {
    return products.filter(item => item.quantity > num);
}

// Вернуть массив продуктов с количеством больше чем или равной значению
function getQuantityMoreThanOrEquals(products, num) {
    return products.filter(item => item.quantity >= num);
}

// Вернуть массив продуктов с количеством меньше чем значение
function getQuantityLessThan(products, num) {
    return products.filter(item => item.quantity < num);
}

// Вернуть массив продуктов с количеством меньше или равной значению
function getQuantityLessThanOrEquals(products, num) {
    return products.filter(item => item.quantity <= num);
}

// Вернуть массив продуктов с количеством равном значению
function getQuantityEquals(products, num) {
    return products.filter(item => item.quantity == num);
}

// Вернуть массив продуктов только с подходящими объектами
function getProductsWithSuitableObjects(str) {
    let result = Array.from(products);
    const instructions = str.split('&');
    for (let instruction of instructions) {
        let i = instruction.split('-');
        // Если строка содержит не верный ключ вернуть пустой список
        if (!['name', 'price', 'quantity', 'description'].includes(i[0])) result = [];
        // Ключ пойска имя
        if (i[0] == 'name') {
            if (i[1] == 'contains') result = getProductNameContains(result, i[2]);
            if (i[1] == 'starts') result = getProductNameStarts(result, i[2]);
            if (i[1] == 'ends') result = getProductNameEnds(result, i[2]);
        }
        // Ключ пойска цена
        if (i[0] == 'price') {
            if (i[1].startsWith('>')) {
                if (i[1].startsWith('>=')) {
                    result = getPriceMoreThanOrEquals(result, +i[1].slice(2));
                } else {
                    result = getPriceMoreThan(result, +i[1].slice(1));
                }
            }
            if (i[1].startsWith('<')) {
                if (i[1].startsWith('<=')) {
                    result = getPriceLessThanOrEquals(result, +i[1].slice(2));
                } else {
                    result = getPriceLessThan(result, +i[1].slice(1));
                }
            }
            if (i[1].startsWith('=')) {
                result = getPriceEquals(result, +i[1].slice(1));
            }
        }
        // Ключ пойска количество
        if (i[0] == 'quantity') {
            if (i[1].startsWith('>')) {
                if (i[1].startsWith('>=')) {
                    result = getQuantityMoreThanOrEquals(result, +i[1].slice(2));
                } else {
                    result = getQuantityMoreThan(result, +i[1].slice(1));
                }
            }
            if (i[1].startsWith('<')) {
                if (i[1].startsWith('<=')) {
                    result = getQuantityLessThanOrEquals(result, +i[1].slice(2));
                } else {
                    result = getQuantityLessThan(result, +i[1].slice(1));
                }
            }
            if (i[1].startsWith('=')) {
                result = getQuantityEquals(result, +i[1].slice(1));
            }
        }
        // Ключ пойска описание
        if (i[0] == 'description') {
            if (i[1] == 'contains') result = getProductDescriptionContains(result, i[2]);
            if (i[1] == 'starts') result = getProductDescriptionStarts(result, i[2]);
            if (i[1] == 'ends') result = getProductDescriptionEnds(result, i[2]);
        }
    }
    return result;
}

// Создание тестового набора продуктов
let products = [];
for (let i = 0; i < 5; i++) {
    let name = 'fdata_' + i;
    let price = i;
    let quantity = i + 4;
    let description = 'descript ' + i + ' cabc';
    products.push(new Product(name, price, quantity, description));
}

// Первая тестовая строка
let str = 'name-contains-fd&price-=2-&quantity->5&description-ends-abc';

// вывод результатов теста функций
console.log(getProductsWithSuitableObjects(str));
/* 
[
    Product {
        name: 'fdata_2',
        price: 2,
        quantity: 6,
        description: 'des 2 cabc'
    }
]
*/
// Вторая тестовая строка
str = 'name-starts-fd&quantity-=5';
// вывод результатов теста функций
console.log(getProductsWithSuitableObjects(str));
/*
[
    Product {
        name: 'fdata_1',
        price: 1,
        quantity: 5,
        description: 'des 1 cabc'
    }
]
*/
