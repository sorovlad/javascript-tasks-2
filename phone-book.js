'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    var entry = new EntryPhoneBook(name, phone, email);

    if (entry.isCorrect()) {
        phoneBook.push(entry);
        return true;
    } else {
        return false;
    }
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var listEntry = getListEntry(query);

    writeEntrys(listEntry);
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var oldLength = phoneBook.length;

    phoneBook = phoneBook.filter(function (i) {
        return !isElementInEntry(i, query);
    });

    console.log('Удален ' + (oldLength - phoneBook.length) + ' контакт.');
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var entry;
    data = data.split('\n');
    for (var lineEntry of data) {
        entry = lineEntry.split(';');
        module.exports.add(entry[0], entry[1], entry[2]);
    }
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(query) {
    var entrys = getListEntry(query);

    var headAsciiTable = '╔════════════╦═══════════════════╦═══════════════════════╗\n' +
               '║   Имя      ║  Телефон          ║    Email              ║\n' +
               '╟════════════╬═══════════════════╬═══════════════════════╣\n';
    var bodyAsciiTable = '';
    var footerAsciiTable = '╚════════════╩═══════════════════╩═══════════════════════╝';
    for (var entry of entrys) {
        bodyAsciiTable += '║' + entry.name + multiplySting(' ', 12 - entry.name.length) + '║' +
            entry.phone + multiplySting(' ', 19 - entry.phone.length) + '║' +
            entry.email + multiplySting(' ', 23 - entry.email.length) + '║\n';
    }

    console.log(headAsciiTable + bodyAsciiTable + footerAsciiTable);
};


function EntryPhoneBook(name, phone, email) {
    this.name = isCorrectName(name) ? name : null;
    this.phone = convectPhone(phone);
    this.email = isCorrectEmail(email) ? email : null;

    this.isCorrect = function () {
        if (this.name === null || this.phone === null || this.email === null) {
            return false;
        }
        return true;
    };
}

function writeEntrys(entrys) {
    for (var i = 0; i < entrys.length; i ++) {
        console.log(entrys[i].name + ', ' + entrys[i].phone + ', ' + entrys[i].email);
    }
}


function getListEntry(found) {
    found = found || '';
    var entrysFound = [];
    for (var entry of phoneBook) {
        if (isElementInEntry(entry, found)) {
            entrysFound.push(entry);
        }
    }
    return entrysFound;
}

function isElementInEntry(entry, found) {
    return entry.name.indexOf(found) != -1 ||
        entry.phone.indexOf(found) != -1 ||
        entry.email.indexOf(found) != -1;
}



function isCorrectName(name) {
    return typeof name === 'string' && name.length > 1;
}
function convectPhone(phone) {
    if (typeof phone === 'undefined') {
        return null;
    }

    var re = /(\+?)(\d{0,3})(.*)(\d{3})(.*)(\d{3})(.*)(\d{1})(.*)(\d{3})$/;

    var result = phone.match(re);
    if (result) {
        if (!(result[9] == '-' ^ result[9] == ' ' ^ result[9] == '')) {
            return null;
        }
        if (!(result[7] == '-' ^ result[7] == ' ' ^ result[7] == '')) {
            return null;
        }
        if (!(result[5] == ' ' ^ (result[5] == ') ' && result[3] == ' (') ^ result[5] == '')) {
            return null;
        }
        if (!(result[3] == ' ' ^ (result[5] == ') ' && result[3] == ' (') ^ result[3] == '')) {
            return null;
        }
        if (!(result[1] == ' ' ^ result[1] == '+' ^ result[1] == '')) {
            return null;
        }
        if (result[2] == '') {
            result[2] = 7;
        }

        return '+' + result[2] + ' (' + result [4] + ') ' +
            result[6] + '-' + result[8] + '-' + result[10];
    }
    return null;
}
function isCorrectEmail(email) {
    var count = 0;

    if (typeof email !== 'string') {
        return false;
    }

    for (var i = 0; i < email.length; i ++) {
        if (email[i] == '@') {
            count ++;
            if (count === 2) {
                return false;
            }
        }
    }

    var reg = /.+@.+\..+/i;
    var result = email.match(reg);

    if (result === null) {
        return false;
    }
    return true;
}

function multiplySting(str, mul) {
    var newStr = '';

    for (var i = 0; i < mul; i += 1) {
        newStr += str;
    }
    return newStr;
}
