export class About{
  constructor(){
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
    var context=canvas.getContext('2d');
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    var radius = Math.floor(canvas.width / 2)-5;
    context.shadowColor   = 'rgba(0,0,0,0.12)';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 2;
        context.shadowBlur    = 3;

    var startingAngle = 0
    var endingAngle = 360;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius,
                startingAngle, endingAngle, false);
    context.closePath();

    context.fillStyle = '#f0f0f0';
    context.fill();
    for (var i = 0; i < this.skills.length; i++) {
      this.drawSegment(canvas, context, i);
    }
  }
    drawSegment(canvas, context, i) {
      context.save();
      var centerX = Math.floor(canvas.width / 2);
      var centerY = Math.floor(canvas.height / 2);
      var radius = Math.floor(canvas.width / 2)-5;

      var startingAngle = this.degreesToRadians(this.sumTo(i)-15);
      var arcSize = this.degreesToRadians(40);
      var endingAngle = startingAngle + arcSize;

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius*this.skills[i].value/100,
                  startingAngle, endingAngle, false);
      context.closePath();

      context.fillStyle = this.colors[i];
      context.fill();

      context.restore();

      this.drawSegmentLabel(canvas, context, i);
      $('ul.tabs').tabs();
  }
  drawSegmentLabel(canvas, context, i) {
     context.save();
     var x = Math.floor(canvas.width / 2);
     var y = Math.floor(canvas.height / 2);
     var angle = this.degreesToRadians(this.sumTo(i)+5);

     context.translate(x, y);
     context.rotate(angle);
     var dx = Math.floor(canvas.width * 0.45) - 15;
     var dy = Math.floor(canvas.height * 0.05)-5;
     context.fillStyle="rgba(0, 0, 0, 0.87)";
     context.textAlign = "right";
     var fontSize = Math.floor(canvas.height / 20);
     context.font = fontSize + "pt Helvetica";

     context.fillText(this.skills[i].name, dx, dy);


     context.restore();
  }
  degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
  }
  sumTo(i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += 40;
    }
    return sum;
  }
  changeSkill(i,ii){
    this.activeSkill=i;
    this.skillIndex=ii;
    var context=document.getElementById('skills-container');
    var deg=ii*-40;
    context.style.webkitTransform = 'rotate('+deg+'deg)';
    context.style.mozTransform    = 'rotate('+deg+'deg)';
    context.style.msTransform     = 'rotate('+deg+'deg)';
    context.style.oTransform      = 'rotate('+deg+'deg)';
    context.style.transform       = 'rotate('+deg+'deg)';
  }
}
