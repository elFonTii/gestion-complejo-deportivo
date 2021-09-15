const excel = require('xlsx');
const path = require('path');
const sheets = {};

sheets.read = function (file) {
    const dir = path.join(__dirname, '../uploads/', file);

    const workbook = excel.readFile(dir);
    const workbookSheets = workbook.SheetNames;

    const data = excel.utils.sheet_to_json(workbook.Sheets[workbookSheets[0]]);

    return data;
}

sheets.data = function (data, param) {
    const result = [];
    for (const item of data) {
        if (item[param]) {
            result.push(item[param]);
        } else {
            result.push('');
        }
    }
    return result;
}

module.exports = sheets;