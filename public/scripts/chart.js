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

let cgmobject = JSON.parse(nightscout)
let bpmobject = JSON.parse(health)
let carbsobject = JSON.parse(treatments)

var cgmlist = []
var bpmlist = []
var carbslist = []
var boluslist = []

cgmobject.forEach(o => {
  cgmlist.push({
    y: Math.round(o.sgv/18 * 10) / 10, 
    x: o.dateString.replace("T", " ").slice(0,19)
  })
});

bpmobject.forEach(o => {
  bpmlist.push({
    y: o.value, 
    x: new Date(o.date * 1000).toLocaleString('sv-SE')
  })
});

carbsobject.forEach(o => {
  if(o.insulin > 0){
    console.log(o)
    boluslist.push({
      y: o.insulin,
      r: o.insulin*5,
      x: o.created_at.replace("T", " ").slice(0,19)
    })
  }
  if(o.carbs > 0){
    carbslist.push({
      y: o.carbs, 
      r: o.carbs/2,
      x: o.created_at.replace("T", " ").slice(0,19)
    })
  }
});
console.log(boluslist)

var BPM = {
  label: 'BPM',
  borderColor: '#73001f',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  type: 'line',
  data: bpmlist,
  pointRadius: 0
};

var CGM = {
  label: 'CGM',
  borderColor: '#3cb0ea',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  type: 'line',
  data: cgmlist,
  pointRadius: 0
};

var CARBS = {
  label: 'Carbs',
  borderColor: '#004f00',
  backgroundColor: '#008000',
  type: 'bubble',
  data: carbslist
};
var INSULIN = {
  label: 'Insulin',
  borderColor: 'red',
  backgroundColor: 'darkred',
  type: 'bubble',
  data: boluslist
};

var chart = new Chart(ctx, {
  type: 'bar',
  data: { datasets: [CARBS, INSULIN, CGM, BPM ] },
  options: {
    scales: {
      xAxes: [{
        type: 'time',
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
  }
}); 

