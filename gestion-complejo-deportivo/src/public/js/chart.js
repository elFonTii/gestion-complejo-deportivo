const charts = require("../../lib/chart");
const data = {
    data1: 10,
    data2: 11,
    data3: 5,
}

var ctx = document.getElementById('mainChart').getContext('2d');
charts.main(ctx, data);