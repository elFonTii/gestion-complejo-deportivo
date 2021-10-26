const excel = require('xlsx');
const path = require('path');
const fs = require('fs');
const sheets = {};

// THIS MODULE WAS DEPRECATED
// The idea is to have a module that can read and write excel files but the excel grid system is not working fine.
// The module should be able to read and write to a file
// I decided to deprecate this module because it takes so much time to make and i don't want to spend time on it.

/* DEPRECATED */
/* DEPRECATED */
/* DEPRECATED */
/* DEPRECATED */
/* DEPRECATED */


/*
sheets.read = function (file) {
    const dir = path.join(__dirname, '../uploads/', file);

    const workbook = excel.readFile(dir);
    const workbookSheets = workbook.SheetNames;

    const data = excel.utils.sheet_to_json(workbook.Sheets[workbookSheets[0]]);

    return data;
}

sheets.data = function (data) {
    //Get the data from the sheet and save it into a object
    const obj = {};
    const keys = Object.keys(data[0]);
    for (const key of keys) {
        obj[key] = [];
    }
    for (const row of data) {
        for (const key of keys) {
            obj[key].push(row[key]);
        }
    }
    return obj;
}


sheets.scan = function () {
    const dir = path.join(__dirname, '../uploads/');
    const files = fs.readdirSync(dir);
    const result = [];
    const size = [];
    for (const file of files) {
        const obj = {};
        obj.name = file;
        obj.size = sheets.getSize(file);
        result.push(obj);
    }
    return result;
}

sheets.getSize = function (file) {
    const dir = path.join(__dirname, '../uploads/', file);
    const stats = fs.statSync(dir);
    const size = stats.size;
    return size;
}

sheets.getObjectKey = function (file) {
    const dir = path.join(__dirname, '../uploads/', file);
    const workbook = excel.readFile(dir);
    const workbookSheets = workbook.SheetNames;
    const data = excel.utils.sheet_to_json(workbook.Sheets[workbookSheets[0]]);
    const keys = Object.keys(data[0]);
    return keys;
}
*/

module.exports = sheets;