/*
    --color-1: #24329b;
    --color-2: #3f50d3;
    --color-3: #5f84f4;
*/

const ctx = document.getElementById("chart");

var health = document.getElementById('chart').getAttribute('health');
var nightscout = document.getElementById('chart').getAttribute('nightscout');
var treatments = document.getElementById('chart').getAttribute('treatments');

var data = {
  date:{
    cgm: 0,
    bpm: 0,
    bolus: 0,
  }
};

let nsParsed = JSON.parse(nightscout)
let healthParsed = JSON.parse(health)
let treatParsed = JSON.parse(treatments)


data = nsParsed.map(o => { return {["item"]: {cgm: Math.round(o.sgv/18 * 10) / 10, carbs: 0, bpm: -1,date: o.dateString.replace("T", " ").slice(0,19)}}})
let data2 = healthParsed.map(o => { return {["item"]: {cgm: -1,bpm: o.value, carbs: 0, date: new Date(o.date * 1000).toLocaleString('sv-SE')}}})
let data3 = treatParsed.map(o => { return {["item"]: {cgm: -1, bpm: -1, carbs: o.carbs, date: o.created_at.replace("T", " ").slice(0,19)}}})
data = data.concat(data2);
data = data.concat(data3);

data.sort(function(a, b) {
  //console.log(a.item.date)
  return new Date(a.item.date) - new Date(b.item.date);
});
//console.log(data)

var timeline =[]
var cgm = []
var bpm = []
var carbs = []

var i = 1;

var lastbpm = 0;
var lastcgm = 0;
//var lastcarbs

data.forEach(function(item){
  //console.log(item.item.cgm)
  timeline.push(item.item.date)
  carbs.push(item.item.carbs)
  if(item.item.bpm > -1){
    bpm.push(item.item.bpm)
    lastbpm = item.item.bpm
    cgm.push(lastcgm)
    
    
  }
  if(item.item.cgm > -1){
    cgm.push(item.item.cgm)
    lastcgm = item.item.cgm
    bpm.push(lastbpm)
    
  }
i++;
})

console.log(timeline)
console.log(cgm)
console.log(bpm)


let options = {
  legend: {
    display: false
},
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:false
        }   
    }]
}
};


data = {
  labels: timeline,
  datasets: [
    {
      //label: 'BPM',
      data: bpm,
      borderColor: '#24329b',
      type: 'line',
      
    },
    {
      //label: 'CGM',
      data: cgm,
      borderColor: '#3f50d3',
      type: 'line',
      
    },
    {
      //label: 'CGM',
      data: carbs,
      borderColor: '#3f50d3',
      //type: 'bar',
      backgroundColor:'#000000'
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