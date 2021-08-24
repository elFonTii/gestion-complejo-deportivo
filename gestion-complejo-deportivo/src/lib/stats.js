const pool = require('../database');

const estadistica = new class {
    constructor(name, value, mark){
        this.name = name;
        this.value = value;
        this.mark = mark;
    }
}

const stats = {}

stats.constructor = async function(name, value, mark){
    return new estadistica.constructor(name, value, mark);
}

module.exports = stats;