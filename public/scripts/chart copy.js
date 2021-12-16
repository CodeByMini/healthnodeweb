/*
    --color-1: #24329b;
    --color-2: #3f50d3;
    --color-3: #5f84f4;
*/

const ctx = document.getElementById("chart");

//var data = $('chartdata').attr('data');
var health = document.getElementById('chart').getAttribute('health');
var nightscout = document.getElementById('chart').getAttribute('nightscout');
//var nightscout = document.getElementById('chart').getAttribute('data3');

date = date.replace("'", '"')
date = date.split(',')
const datestring = date.map(x => new Date(parseInt(x)*1000).toLocaleString("sv-SE"));

value = value.split(',')

let struct = {}
/*
for (var i = 0; i< datestring.length; i++){
    struct[datestring[i]]=value[i];
}
*/

let ns = JSON.parse(nightscout)

let newNS = ns.map(o => { return {time: o.dateString, cgm: Math.round(o.sgv/18 * 10) / 10}})

let cgm = [];
let cgmtime = [];
let newtime = [];

newNS.forEach(item => cgm.push(item.cgm));
newNS.forEach(item => cgmtime.push(item.time));
cgmtime.forEach(time => newtime.push(time.replace("T", " ").slice(0,19)));


let newList =[]
for (var i = 0; i< 100; i++){
    struct = {
        date: datestring[i],
        value: value[i],
        //cgm: 1,
    }
    newList.push(struct)
};

for (var i = 0; i< 100; i++){
    struct = {
        date: newtime[i],
        cgm: cgm[i],
        //value: 1,
    }
    newList.push(struct)
};
console.log(newList[0].date);

/*
for (var i = 0; i< cgmtime.length; i++){
    
*/
let options = {
        scales: {
            x:{
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y: {
                display: true,
                position: 'left',
                stacked: true,
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    }
};


data = {
  labels: datestring,
  datasets: [
    {
      //labels: datestring,
      label: 'BPM',
      data: value,
      borderColor: '#24329b',
      //backgroundColor: '',
      //yAxisID: 'y',
      type: 'line',
    },
    {
      label: 'CGM',
      //labels: newtime,
      data: cgm,
      borderColor: '#3f50d3',
      //backgroundColor: '#3f50d3',
      //yAxisID: 'y1',
      type: 'line',
    }
  ]
};

const myChart = new Chart(ctx, {
    type: 'bar',
    options: options,
    data: data,
    }
);









/*
var sortedArray = obj.sort(function(a, b) {
    return b[1] - a[1];
  });

var names = [];
var values = [];

for (let i = 0; i < 4; i++){
    names.push(sortedArray[i][0])
    values.push(sortedArray[i][1]*100)
}
const config = {
    
    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis'
          }
        },
        scales: {
            x:{
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                stacked: true,
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        }
      },
    };

*/
/*
   
const chart = new Chart(CHART, {
    type: 'line',
    options: config.options,
    data: {
        labels: ["200","201","202","203","204","205","206","300","301","302"],

    datasets: [
        {
            label: 'MMOL',
            data: ["5.5","5.7","5.4","4.9","4.3","4.2","4.4","4.9","6.5","6.7"],
            borderColor: '#24329b',
            backgroundColor: '#3f50d33f',
            yAxisID: 'y',
            stack: 'combined',
            type: 'bar'
          },
          {
            label: 'MMOL',
            data: ["5.5","5.7","5.4","4.9","4.3","4.2","4.4","4.9","6.5","6.7"],
            borderColor: '#24329b',
            backgroundColor: '#3f50d3',
            yAxisID: 'y',
            stack: 'combined',
          },
    {
      label: 'BPM',
      data: ["80","82","81","85","88","89","93","100","103","93"],
      borderColor: '#5f84f4',
      backgroundColor: '#3f50d3',
      yAxisID: 'y1',
    }
  ]
    }
});

*/