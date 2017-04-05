import Chart from 'chartjs'
//let myChart = new Chart({...})
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
    ],
    this.values=[
      95,90,90,100,80,60,85,80,70
    ]
    this.skills=[
      {
        name:'Javascript',
        value:95,
        description:'An expert on vanilla JavaScript, ES6, AJAX, jQuery, gulp, and grunt. Currently having fun playing around with the Web Audio API and Web GL. I love to explore using JavaScript in other places besides the web, such as React Native and Raspberry Pis. Ever flown a drone running on NodeJS?'
      },
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
    ];
    this.activeSkill=this.skills[0];
    this.skillIndex=0;
    this.colors=[
      '#2196f3',
      '#00e676',
      '#ffeb3b',
      '#ffc107',
      '#ff5722',
      '#18ffff',
      '#f44336',
      '#e91e63',
      '#b388ff'
    ]
  }
  attached(){
    this.width=400;
    this.height=400;
    var canvas=document.querySelector('#skills-container');
    this.chart=new Chart(canvas, {
      type:'polarArea',
      data:{
        datasets:[{
            data:this.values,
            label:'Skills',
            backgroundColor:this.colors
        }],
        labels:this.labels
      },
      options:{
        layout:{
          padding:5
        },
        legend:{
          position:'bottom',
          display:false,
          labels:{
            boxWidth:20
          }
        }
      }
  })
  $('ul.tabs').tabs();
}
  changeSkill(i,ii){
    this.activeSkill=i;
    this.skillIndex=ii;
    
  }
}
