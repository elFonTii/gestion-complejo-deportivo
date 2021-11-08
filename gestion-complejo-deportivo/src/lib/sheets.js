const excel = require('exceljs');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
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

// Generate reports
/*
const data = [
    { header: 'Reservas de hoy', key: 'reservas', width: 10 },
    { header: 'Suscripciones activas', key: 'suscripciones', width: 10 },
    { header: 'Usuarios activos', key: 'users', width: 10 },
]

sheets.report = {};

sheets.report.generate = function (data) {
    const workbook = new excel.Workbook();
    let worksheet = sheets.generateWorksheet('Reporte', data, workbook);
    sheets.insertData(data, worksheet);
    workbook.xlsx.writeFile(path.join(__dirname, '../public/report.xlsx'));
}

sheets.generateWorksheet = function (title, data, workbook) {
    let worksheet = workbook.addWorksheet(title);
    worksheet.columns = data

    //Force the columns to be the same width as the headers
    worksheet.columns.forEach(function (column) {
        column.width = column.headers.length < 12 ? 12 : column.header.length;
    });

    //Set the font type to bold
    worksheet.getRow(1).font = {
        bold: true
    };

    return worksheet;
}

sheets.report.generate.promisified = promisify(sheets.report.generate);

sheets.insertData = function (data, worksheet) {
    // Dump all the data into Excel
    data.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
            ...e,
            row: rowIndex
        });

        let totalNumberOfRows = worksheet.rowCount;

        worksheet.addRow([
            {
                value: 'Total',
                formula: `=SUM(B${rowIndex}:B${totalNumberOfRows})`,
                style: {
                    font: {
                        bold: true
                    }
                }
            }
        ])
        const figureColumns = [3, 4, 5, 6]
        figureColumns.forEach((i) => {
            worksheet.getColumn(i).numFmt = '$0.00'
            worksheet.getColumn(i).alignment = { horizontal: 'center' }
        })
    });
    return worksheet;
}
*/


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