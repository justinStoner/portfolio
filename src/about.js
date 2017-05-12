import Chart from 'chartjs';
export class About{
  constructor(){
    this.labels=[
      'Javascript',
      'HTML',
      'CSS',
      'Aurelia',
      'Angular',
      'React',
      'Node',
      'Express',
      'PHP'
    ]

    this.values=[
      95,90,90,100,80,60,85,80,70
    ]
    this.skills=[
      {
        name:'Javascript',
        skills:[
          {
            name:'Javascript',
            value:95,
            description:'An expert on vanilla JavaScript, ES6, AJAX, jQuery, gulp, and grunt. Currently having fun playing around with the Web Audio API and Web GL. I love to explore using JavaScript in other places besides the web, such as React Native and Raspberry Pis. Ever flown a drone running on NodeJS?'
          },
          {
            name:'Aurelia',
            value:100,
            description:'Aurelia is the front end framework I\'m most experienced in, and my personal favorite after three years of use. This site is built using it. For those who haven\'t heard of it, Aurelia is a MVC framework very similar to Angular.',
          },
          {
            name:'Angular',
            value:80,
            description:'I have around 2.5 years of experience with angular 1.5 and am familar with angular 2.'
          },
          {
            name:'React',
            value:60,
            description:'I only started using react about 6 months ago, but I think its a great framework and am very excited about react native.'
          },
        ]
      },
      {
        name:'Html/CSS',
        skills:[
          {
            name:'HTML',
            value:90,
            description:'Its HTML, what else can you say?'
          },
          {
            name:'CSS',
            value:90,
            description:'5 years of designing responsive web apps using bootstrap as well as CSS preprocessors such as Sass. I found out about Materialize Css about a year ago and now I use that for all new projects. This site is using Materialize.'
          },
          {
            name:'Bootstrap',
            value:90,
            description:''
          },
          {
            name:'Materialize-css',
            value:80,
            description:''
          },
          {
            name:'Material-design-lite',
            value:70,
            description:'Im new to this library, but so far its my favorite over bootstrap and the others'
          }
        ]
      },
      {
        name:'Backend',
        skills:[
          {
            name:'Node',
            value:85,
            description:'My favorite way to write REST APIs, and do any kind of backend work in general. Also exploring Node Js powered drones and and electron apps'
          },
          {
            name:'Express',
            value:80,
            description:'Express is the Node server framework I have the most experience with. Also included here are Mongoose and socket.io'
          },
          {
            name:'PHP',
            value:70,
            description:'I have five years of experience using php, from porting an old php website over to a REST api then later porting it to Node and Express. I have to say though, people should really stop using PHP...'
          }
        ]
      }
    ]
    this.activeSkill=this.skills[0];

    this.skillIndex=0;
    this.colors=[
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 159, 64, 1)'
    ]
  }
  attached(){


    var ctx = document.getElementById("skills-container");
    ctx.width=200;
    ctx.height=200;
    var datasets=[];
    for(var i=0; i<this.activeSkill.skills.length;i++){
      datasets.push({
        label:this.activeSkill.skills[i].name,
        data:[this.activeSkill.skills[i].value],
        backgroundColor:this.colors[i]
      });
    }
    Chart.defaults.global.defaultFontColor='#fff';
    Chart.defaults.global.defaultFontFamily='roboto';
    Chart.defaults.global.defaultFontSize=18;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Skills'],
        datasets: datasets
      },
      options: {
        borderColor:'#fff',
        scaleFontColor:'#fff',
        legend: {
          strokeStyle:'#fff',
            display: true,
            labels: {
                fontColor: 'rgb(255,255,255)'
            }
        },
        responsive:true,
        maintainAspectRatio:false,
        scales: {
          xAxes:[{
            gridlines:{
              color:'#fff',
              display:false
            }
          }],
            yAxes: [{
              gridlines:{
                color:'#fff',
                display:false
              },
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: 100,
                    fontColor:'#fff',
                    color:'#fff'
                }
              }]
           }
        }
    });
    console.log(this.chart);


}
  changeSkill(i,ii){
    this.activeSkill=i;
    this.skillIndex=ii;
    var ctx = document.getElementById("skills-container").getContext('2d');
    var datasets=[];
    for(var i=0; i<this.activeSkill.skills.length;i++){
      datasets.push({
        label:this.activeSkill.skills[i].name,
        data:[this.activeSkill.skills[i].value],
        backgroundColor:this.colors[i]
      });
    }
    this.chart.data.datasets=datasets;
    this.chart.update();
  }
}
