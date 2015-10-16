'use strict';

require('should');
var phoneBook = require('D:/Vova/Yandex/js 02/phone-book.js');

var correctPhoneNumber = ['7 999 6667778', '999 4433444', '+7 (999) 777-7-777',
   '+7 111 722-2-552', '+7 111 722 2 552', '71117772222'];
var inCorrectPhoneNumber = ['777-2-222', 'АБС-6666', '+7 (123) 777%2%222', '+7 (234 777-2-222',
    '7+ (245) 777-2-222', '-7 (256) 777-2-222', ''];
var inCorrectEmail = ['honest-hrundel', '', 'info@yandex', 'info@yandex@ya.ru',
   'info.yandex.ru', 'yandex', '@.', '@yandex.ru', 'as@@yandex.ru'];
var correctEmail = ['info@yandex.ru', 'y@ya.ru'];

describe('Проверка функции add', function () {

    it('Проверка корректных номеров', function () {
        for (var number of correctPhoneNumber) {
            phoneBook.add('name', number, correctEmail[0]).should.be.eql(true);
        }
    });
    it('Проверка не корректных номеров', function () {
        for (var number of inCorrectPhoneNumber) {
            phoneBook.add('name', number, correctEmail[0]).should.be.eql(false);
        }
    });
    it('Проверка корректных email', function () {
        for (var email of correctEmail) {
            phoneBook.add('name', correctPhoneNumber[0], email).should.be.eql(true);
        }
    });
    it('Проверка не корректных email', function () {
        for (var email of inCorrectEmail) {
            phoneBook.add('name', correctPhoneNumber[0], email).should.be.eql(false);
        }
    });
    it('Проверка не корректного телефона и email', function () {
        phoneBook.add('name', inCorrectPhoneNumber[0], inCorrectEmail[0]).should.be.eql(false);
    });
});
