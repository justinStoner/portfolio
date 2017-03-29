define('about',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function () {
    function About() {
      _classCallCheck(this, About);

      this.skills = [{
        name: 'Javascript',
        value: 95,
        description: 'An expert on vanilla JavaScript, ES6, AJAX, jQuery, gulp, and grunt. Currently having fun playing around with the Web Audio API and Web GL. I love to explore using JavaScript in other places besides the web, such as React Native and Raspberry Pis. Ever flown a drone running on NodeJS?'
      }, {
        name: 'HTML',
        value: 90,
        description: 'Its HTML, what else can you say?'
      }, {
        name: 'CSS',
        value: 90,
        description: '5 years of designing responsive web apps using bootstrap as well as CSS preprocessors such as Sass. I found out about Materialize Css about a year ago and now I use that for all new projects. This site is using Materialize.'
      }, {
        name: 'Aurelia',
        value: 100,
        description: 'Aurelia is the front end framework I\'m most experienced in, and my personal favorite after three years of use. This site is built using it. For those who haven\'t heard of it, Aurelia is a MVC framework very similar to Angular.'
      }, {
        name: 'Angular',
        value: 80,
        description: 'I have around 2.5 years of experience with angular 1.5 and am familar with angular 2.'
      }, {
        name: 'React',
        value: 60,
        description: 'I only started using react about 6 months ago, but I think its a great framework and am very excited about react native.'
      }, {
        name: 'Node',
        value: 85,
        description: 'My favorite way to write REST APIs, and do any kind of backend work in general. Also exploring Node Js powered drones and and electron apps'
      }, {
        name: 'Express',
        value: 80,
        description: 'Express is the Node server framework I have the most experience with. Also included here are Mongoose and socket.io'
      }, {
        name: 'PHP',
        value: 70,
        description: 'I have five years of experience using php, from porting an old php website over to a REST api then later porting it to Node and Express. I have to say though, people should really stop using PHP...'
      }];
      this.activeSkill = this.skills[0];
      this.skillIndex = 0;
      this.colors = ['#2196f3', '#00e676', '#ffeb3b', '#ffc107', '#ff5722', '#18ffff', '#f44336', '#e91e63', '#b388ff'];
    }

    About.prototype.attached = function attached() {
      this.width = 400;
      this.height = 400;

      var canvas = document.querySelector('#skills-container');
      var context = canvas.getContext('2d');
      var centerX = Math.floor(canvas.width / 2);
      var centerY = Math.floor(canvas.height / 2);
      var radius = Math.floor(canvas.width / 2) - 5;
      context.shadowColor = 'rgba(0,0,0,0.12)';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 2;
      context.shadowBlur = 3;

      var startingAngle = 0;
      var endingAngle = 360;
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
      context.closePath();

      context.fillStyle = '#f0f0f0';
      context.fill();
      for (var i = 0; i < this.skills.length; i++) {
        this.drawSegment(canvas, context, i);
      }
    };

    About.prototype.drawSegment = function drawSegment(canvas, context, i) {
      context.save();
      var centerX = Math.floor(canvas.width / 2);
      var centerY = Math.floor(canvas.height / 2);
      var radius = Math.floor(canvas.width / 2) - 5;

      var startingAngle = this.degreesToRadians(this.sumTo(i) - 15);
      var arcSize = this.degreesToRadians(40);
      var endingAngle = startingAngle + arcSize;

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius * this.skills[i].value / 100, startingAngle, endingAngle, false);
      context.closePath();

      context.fillStyle = this.colors[i];
      context.fill();

      context.restore();

      this.drawSegmentLabel(canvas, context, i);
      $('ul.tabs').tabs();
    };

    About.prototype.drawSegmentLabel = function drawSegmentLabel(canvas, context, i) {
      context.save();
      var x = Math.floor(canvas.width / 2);
      var y = Math.floor(canvas.height / 2);
      var angle = this.degreesToRadians(this.sumTo(i) + 5);

      context.translate(x, y);
      context.rotate(angle);
      var dx = Math.floor(canvas.width * 0.45) - 15;
      var dy = Math.floor(canvas.height * 0.05) - 5;
      context.fillStyle = "rgba(0, 0, 0, 0.87)";
      context.textAlign = "right";
      var fontSize = Math.floor(canvas.height / 20);
      context.font = fontSize + "pt Helvetica";

      context.fillText(this.skills[i].name, dx, dy);

      context.restore();
    };

    About.prototype.degreesToRadians = function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    };

    About.prototype.sumTo = function sumTo(i) {
      var sum = 0;
      for (var j = 0; j < i; j++) {
        sum += 40;
      }
      return sum;
    };

    About.prototype.changeSkill = function changeSkill(i, ii) {
      this.activeSkill = i;
      this.skillIndex = ii;
      var context = document.getElementById('skills-container');
      var deg = ii * -40;
      context.style.webkitTransform = 'rotate(' + deg + 'deg)';
      context.style.mozTransform = 'rotate(' + deg + 'deg)';
      context.style.msTransform = 'rotate(' + deg + 'deg)';
      context.style.oTransform = 'rotate(' + deg + 'deg)';
      context.style.transform = 'rotate(' + deg + 'deg)';
    };

    return About;
  }();
});
define('app',['exports', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ea) {
      _classCallCheck(this, App);

      this.ea = ea;
    }

    App.prototype.activate = function activate() {};

    App.prototype.attached = function attached() {
      var _this = this;

      window.addEventListener('resize', function () {
        _this.ea.publish('resize');
      });
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      console.log('1');
      config.title = "Justin Stoner";
      config.map([{ route: ['', 'about'], name: 'about', moduleId: 'about', href: '#/about', nav: true, title: 'About' }, { route: 'showcase', name: 'showcase', moduleId: 'showcase', nav: true, title: 'Showcase', auth: false }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-dialog', function (config) {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 1031;
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('showcase',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Showcase = exports.Showcase = function () {
    function Showcase() {
      _classCallCheck(this, Showcase);
    }

    Showcase.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'beatmaker'], name: 'beatmaker', moduleId: './showcases/beatmaker/beat-maker', href: '#/showcase/beatmaker', nav: true, title: 'BeatMaker' }]);
      this.router = router;
    };

    return Showcase;
  }();
});
define('work',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Work = exports.Work = function Work() {
    _classCallCheck(this, Work);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('showcases/beatmaker/beat-maker',['exports', './components/audio-bus', 'aurelia-framework'], function (exports, _audioBus, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BeatMaker = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var BeatMaker = exports.BeatMaker = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus), _dec(_class = function () {
    function BeatMaker(ab) {
      _classCallCheck(this, BeatMaker);

      this.ab = ab;
    }

    BeatMaker.prototype.attached = function attached() {
      $('ul.showcase-tabs').tabs();
    };

    return BeatMaker;
  }()) || _class);
});
define('showcases/beatmaker/components/audio-bus',['exports', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AudioBus = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AudioBus = exports.AudioBus = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AudioBus(ea) {
      var _this = this;

      _classCallCheck(this, AudioBus);

      this.ea = ea;
      this.audio = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audio.createAnalyser();
      this.analyser.connect(this.audio.destination);
      this.analyser.fftSize = 2048;
      this.bufferLength = this.analyser.fftSize;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.synthOut = this.audio.createGain();
      this.synthOut.gain.value = 0.6;
      this.input = this.audio.createGain();
      this.output = this.audio.createGain();
      this.synthIn = this.audio.createGain();
      this.drumsIn = this.audio.createGain();
      this.createEq();
      this.createDelay();
      this.createCompressor();
      this.connect();
      this.compressionOn = true;
      this.delayOn = true;
      this.eqOn = true;
      this.drumsIn.connect(this.input);
      this.input.connect(this.output);
      this.synthOut.connect(this.output);
      this.output.connect(this.analyser);

      this.ea.subscribe('sidechain', function (time) {});
      this.ea.subscribe('eq1', function (msg) {
        _this.eq80.gain.value = msg - 40;
      });
      this.ea.subscribe('eq2', function (msg) {
        _this.eq350.gain.value = msg - 40;
      });
      this.ea.subscribe('eq3', function (msg) {
        _this.eq720.gain.value = msg - 40;
      });
      this.ea.subscribe('eq4', function (msg) {
        _this.eq16k.gain.value = msg - 40;
      });
      this.ea.subscribe('eq5', function (msg) {
        _this.eq5k.gain.value = msg - 40;
      });
      this.ea.subscribe('eq6', function (msg) {
        _this.eq10k.gain.value = msg - 40;
      });

      this.ea.subscribe('delayTime', function (msg) {
        _this.delay.delayTime.value = msg / 100;
      });
      this.ea.subscribe('delayFeedback', function (msg) {
        _this.feedback.gain.value = msg / 100;
      });
      this.ea.subscribe('delayWet', function (msg) {
        _this.wetLevel.gain.value = msg / 100;
      });

      this.ea.subscribe('compAttack', function (msg) {
        _this.compressor.attack.value = msg / 100;
      });
      this.ea.subscribe('compRelease', function (msg) {
        _this.compressor.release.value = msg / 100;
      });
      this.ea.subscribe('compThresh', function (msg) {
        _this.compressor.threshold.value = msg - 100;
      });
      this.ea.subscribe('compKnee', function (msg) {
        _this.compressor.knee.value = msg;
      });
      this.ea.subscribe('compRatio', function (msg) {
        _this.compressor.ratio.value = msg;
      });

      this.ea.subscribe('toggleCompressor', function (msg) {
        console.log(_this.compressionOn);
        if (_this.compressionOn) {
          _this.compressionOn = false;
        } else {
          _this.compressionOn = true;
        }
      });
      this.ea.subscribe('toggleDelay', function (msg) {
        console.log(_this.delayOn);
        if (_this.delayOn) {
          _this.dOutput.disconnect();
          if (_this.eqOn) {
            _this.eq10k.disconnect();
            _this.eq10k.connect(_this.synthOut);
          } else {
            _this.synthIn.disconnect();
            _this.synthIn.connect(_this.synthOut);
          }

          _this.delayOn = false;
        } else {
          if (_this.eqOn) {
            _this.eq10k.disconnect();
            _this.eq10k.connect(_this.dInput);
          } else {
            _this.synthIn.disconnect();
            _this.synthIn.connect(_this.dInput);
          }
          _this.dOutput.connect(_this.synthOut);
          _this.delayOn = true;
        }
      });
      this.ea.subscribe('toggleEQ', function (msg) {
        console.log(_this.eqOn);
        if (_this.eqOn) {
          _this.eq10k.disconnect();
          _this.synthIn.disconnect();
          if (_this.delayOn) {
            _this.synthIn.connect(_this.dInput);
          } else {
            _this.synthIn.connect(_this.synthOut);
          }
          _this.eqOn = false;
        } else {
          _this.synthIn.disconnect();
          if (_this.delayOn) {
            _this.synthIn.connect(_this.eq80);
            _this.eq10k.connect(_this.dInput);
          } else {
            _this.synthIn.connect(_this.eq80);
            _this.eq10k.connect(_this.synthOut);
          }
          _this.eqOn = true;
        }
      });
    }

    AudioBus.prototype.connect = function connect() {
      this.synthIn.connect(this.eq80);
      this.eq80.connect(this.eq350);
      this.eq350.connect(this.eq720);
      this.eq720.connect(this.eq16k);
      this.eq16k.connect(this.eq5k);
      this.eq5k.connect(this.eq10k);
      this.eq10k.connect(this.dInput);

      this.dInput.connect(this.delay);
      this.dInput.connect(this.dOutput);
      this.delay.connect(this.feedback);
      this.delay.connect(this.wetLevel);
      this.feedback.connect(this.delay);
      this.wetLevel.connect(this.dOutput);

      this.dOutput.connect(this.synthOut);
      var gain = this.audio.createGain();
      gain.gain.value = 0.001;
      this.compressor.connect(gain);
      gain.connect(this.output);
    };

    AudioBus.prototype.createEq = function createEq() {
      this.eq80 = this.audio.createBiquadFilter();
      this.eq350 = this.audio.createBiquadFilter();
      this.eq720 = this.audio.createBiquadFilter();
      this.eq16k = this.audio.createBiquadFilter();
      this.eq5k = this.audio.createBiquadFilter();
      this.eq10k = this.audio.createBiquadFilter();
      this.eq80.frequency.value = 80;
      this.eq80.type = "lowshelf";
      this.eq80.gain.value = 0;
      this.eq350.frequency.value = 350;
      this.eq350.type = "peaking";
      this.eq350.gain.value = 4;
      this.eq720.frequency.value = 720;
      this.eq720.type = "peaking";
      this.eq720.gain.value = -5;
      this.eq16k.frequency.value = 1600;
      this.eq16k.type = "peaking";
      this.eq16k.gain.value = -5;
      this.eq5k.frequency.value = 5000;
      this.eq5k.type = "peaking";
      this.eq5k.gain.value = -10;
      this.eq10k.frequency.value = 10000;
      this.eq10k.type = "highshelf";
      this.eq10k.gain.value = 0;
    };

    AudioBus.prototype.createDelay = function createDelay() {
      this.dInput = this.audio.createGain();
      this.dOutput = this.audio.createGain();
      this.delay = this.audio.createDelay(5.0);
      this.feedback = this.audio.createGain();
      this.wetLevel = this.audio.createGain();
      this.delay.delayTime.value = 0.50;
      this.feedback.gain.value = 0.15;
      this.wetLevel.gain.value = 0.25;
    };

    AudioBus.prototype.createCompressor = function createCompressor() {
      this.compressor = this.audio.createDynamicsCompressor();
      this.compressor.threshold.value = -55;
      this.compressor.knee.value = 28;
      this.compressor.ratio.value = 4;

      this.compressor.attack.value = 0.1;
      this.compressor.release.value = 0.1;
    };

    return AudioBus;
  }()) || _class);
});
define('showcases/beatmaker/components/edit-effects',['exports', 'aurelia-dialog', 'aurelia-framework', './audio-bus'], function (exports, _aureliaDialog, _aureliaFramework, _audioBus) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditEffects = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var EditEffects = exports.EditEffects = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaDialog.DialogController), _dec(_class = function () {
    function EditEffects(ab, dialog) {
      _classCallCheck(this, EditEffects);

      this.ab = ab;
      this.dialog = dialog;
    }

    EditEffects.prototype.activate = function activate(model) {
      this.model = model;
    };

    EditEffects.prototype.attached = function attached() {
      $('ul.tabs').tabs();
      $('ul.tabs').tabs('select_tab', 'test2');
    };

    return EditEffects;
  }()) || _class);
});
define('showcases/beatmaker/components/knob',["exports", "aurelia-event-aggregator", "aurelia-framework", "jquery-knob"], function (exports, _aureliaEventAggregator, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnobCustomElement = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

  var KnobCustomElement = exports.KnobCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function KnobCustomElement(e, ea) {
      _classCallCheck(this, KnobCustomElement);

      _initDefineProp(this, "min", _descriptor, this);

      _initDefineProp(this, "max", _descriptor2, this);

      _initDefineProp(this, "label", _descriptor3, this);

      _initDefineProp(this, "val", _descriptor4, this);

      _initDefineProp(this, "labels", _descriptor5, this);

      _initDefineProp(this, "offset", _descriptor6, this);

      _initDefineProp(this, "range", _descriptor7, this);

      _initDefineProp(this, "canvas", _descriptor8, this);

      _initDefineProp(this, "preset", _descriptor9, this);

      _initDefineProp(this, "channel", _descriptor10, this);

      this.element = e;
      this.ea = ea;
    }

    KnobCustomElement.prototype.attached = function attached() {
      var _this = this;

      if (this.label === 'Wave' || this.label === 'Octave') {
        this.knob = new Knob(this.element.children[1], new Ui.P1());
      } else {
        this.knob = new Knob(this.element.children[1], new Ui.P2());
      }
      if (this.preset) {
        this.knob.update(this.preset);
      }
      this.knob.input.onchange = function (e) {
        if (_this.channel) {
          _this.ea.publish(_this.channel, _this.knob.value);
        }
      };
    };

    return KnobCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "min", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "max", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "label", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "val", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labels", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "offset", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "range", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "preset", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "channel", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);


  Ui.P1 = function () {};

  Ui.P1.prototype = Object.create(Ui.prototype);

  Ui.P1.prototype.createElement = function () {
    "use strict";

    Ui.prototype.createElement.apply(this, arguments);
    this.addComponent(new Ui.Pointer({
      type: 'Circle',
      pointerWidth: 3,
      pointerHeight: this.width / 5,
      offset: this.width / 2 - this.width / 4.7 - this.width / 10
    }));

    this.addComponent(new Ui.Scale(this.merge(this.options, {
      drawScale: false,
      drawDial: true,
      radius: this.width / 2.6 })));

    var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);

    this.el.node.appendChild(circle.node);
    this.el.node.setAttribute("class", "p1");
  };

  Ui.P2 = function () {};

  Ui.P2.prototype = Object.create(Ui.prototype);

  Ui.P2.prototype.createElement = function () {
    "use strict";

    Ui.prototype.createElement.apply(this, arguments);

    var scale = new Ui.Scale({
      drawScale: true,
      steps: this.width / 2.5,
      tickWidth: 3,
      tickHeight: 9,
      type: 'Rect'

    });
    this.addComponent(scale);
    var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
    this.addComponent(new Ui.Text());

    this.addComponent(new Ui.Pointer(this.merge(this.options, {
      type: 'Circle',
      pointerWidth: 3,
      pointerHeight: this.width / 5,
      offset: this.width / 2 - this.width / 4.7 - this.width / 10
    })));

    this.merge(this.options, { arcWidth: this.width / 7 });

    this.el.node.appendChild(circle.node);
    this.el.node.setAttribute("class", "p2");
  };
  Ui.Scale.prototype.createElement = function (parentEl) {
    this.el = new Ui.El(this.width, this.height);
    this.startAngle = this.options.angleoffset || 0;
    this.options.radius || (this.options.radius = this.height / 2.5);
    this.el.create("g");
    this.el.addClassName('scale');
    if (this.options.drawScale) {
      if (!this.options.labels) {
        var step = this.options.anglerange / this.options.steps;
        var end = this.options.steps + (this.options.anglerange == 360 ? 0 : 1);
        this.ticks = [];
        var Shape = this.options.type;
        for (var i = 0; i < end; i++) {
          var rect = new Shape(this.options.tickWidth, this.options.tickHeight, this.width / 2, -2);
          rect.node.setAttribute('rx', 1);
          rect.node.setAttribute('ry', 1);
          rect.rotate(this.startAngle + i * step, this.width / 2, this.height / 2);
          this.el.append(rect);
          this.ticks.push(rect);
        }
      }
    }
    this.appendTo(parentEl);
    if (this.options.drawDial) {
      this.dial();
    }
  };
});
define('showcases/beatmaker/components/mute-button',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MuteButtonCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var MuteButtonCustomElement = exports.MuteButtonCustomElement = (_class = function MuteButtonCustomElement() {
        _classCallCheck(this, MuteButtonCustomElement);

        _initDefineProp(this, 'muted', _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'muted', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('showcases/beatmaker/components/slider',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Slider = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

  var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function Slider(element, ea) {
      _classCallCheck(this, Slider);

      _initDefineProp(this, 'min', _descriptor, this);

      _initDefineProp(this, 'max', _descriptor2, this);

      _initDefineProp(this, 'label', _descriptor3, this);

      _initDefineProp(this, 'val', _descriptor4, this);

      _initDefineProp(this, 'labels', _descriptor5, this);

      _initDefineProp(this, 'offset', _descriptor6, this);

      _initDefineProp(this, 'range', _descriptor7, this);

      _initDefineProp(this, 'canvas', _descriptor8, this);

      _initDefineProp(this, 'preset', _descriptor9, this);

      _initDefineProp(this, 'channel', _descriptor10, this);

      this.element = element;
      this.ea = ea;
    }

    Slider.prototype.attached = function attached() {
      var _this = this;

      this.range = this.element.children[1];

      this.range.style.margin = '0 2px 15px 2px';
      noUiSlider.create(this.range, {
        start: this.val,
        connect: true,
        step: 1,
        behavior: 'tap-drag',

        tooltips: false,
        range: {
          'min': parseInt(this.min),
          'max': parseInt(this.max)
        },
        format: wNumb({
          decimals: 1
        })
      });
      this.range.noUiSlider.on('slide', function (val) {
        _this.val = val[0];
        _this.change(false);
      });
    };

    Slider.prototype.change = function change() {
      var slider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (slider) {
        this.range.noUiSlider.set(this.val);
      }
      if (this.channel) {
        this.ea.publish(this.channel, this.val);
      }
    };

    Slider.prototype.add = function add() {
      this.val++;
      this.range.noUiSlider.set(this.val);
    };

    Slider.prototype.minus = function minus() {
      this.val--;
      if (this.val < 0) {
        this.val = 0;
      }
      this.range.noUiSlider.set(this.val);
    };

    return Slider;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'min', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'max', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'label', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'val', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'labels', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'offset', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'range', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'canvas', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'preset', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'channel', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/components/sound-wave',['exports', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SoundWave = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var SoundWave = exports.SoundWave = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element), _dec(_class = (_class2 = function () {
    function SoundWave(ea, element) {
      var _this = this;

      _classCallCheck(this, SoundWave);

      _initDefineProp(this, 'ab', _descriptor, this);

      _initDefineProp(this, 'canvasId', _descriptor2, this);

      _initDefineProp(this, 'background', _descriptor3, this);

      this.ea = ea;
      this.element = element;

      this.ea.subscribe('resize', function () {
        _this.canvas.width = $(_this.bgEl).width();
        _this.canvas.height = $(_this.bgEl).height();
        _this.element.style.marginTop = $(_this.bgEl).height() * -1 + 'px';
      });
    }

    SoundWave.prototype.attached = function attached() {
      this.bgColor = "#2196f3";
      this.fgColor = "#69f0ae";
      console.log(this.canvasId);
      this.canvas = this.element.children[0];

      this.canvasCtx = this.canvas.getContext('2d');
      this.bgEl = document.getElementById(this.canvasId);
      var width = $(this.bgEl).width();
      var height = $(this.bgEl).height();
      this.element.style.marginTop = height * -1 + 'px';
      console.log(this.element.style);
      this.canvas.width = width;
      this.canvas.height = height;
      this.draw();
    };

    SoundWave.prototype.draw = function draw() {

      this.ab.analyser.getByteTimeDomainData(this.ab.dataArray);
      this.canvasCtx.fillStyle = this.bgColor;
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.lineWidth = 1;
      this.canvasCtx.strokeStyle = this.fgColor;
      this.canvasCtx.beginPath();

      var sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
      var x = 0;

      for (var i = 0; i < this.ab.bufferLength; i++) {
        var v = this.ab.dataArray[i] / 128.0;
        var y = v * this.canvas.height / 2;
        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
      this.canvasCtx.stroke();

      var drawVisual = requestAnimationFrame(this.draw.bind(this));
    };

    return SoundWave;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'ab', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'canvasId', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'background', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/components/switch',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Switch = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var Switch = exports.Switch = (_class = function Switch() {
    _classCallCheck(this, Switch);

    _initDefineProp(this, 'switched', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'switched', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('showcases/beatmaker/effects/compressor',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Compressor = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Compressor = exports.Compressor = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Compressor(ab, ea) {
      _classCallCheck(this, Compressor);

      this.ab = ab;
      this.ea = ea;
      this.attack = 0.1;
      this.release = 0.1;
      this.threshold = 55;
      this.knee = 28;
      this.ratio = 4;
      this.active = true;
    }

    Compressor.prototype.toggleEffect = function toggleEffect() {
      this.ea.publish('toggleCompressor');
      this.active = !this.active;
    };

    return Compressor;
  }()) || _class);
});
define('showcases/beatmaker/effects/delay',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Delay = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Delay = exports.Delay = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Delay(ab, ea) {
      _classCallCheck(this, Delay);

      this.ab = ab;
      this.ea = ea;
      this.dTime = 75;
      this.dFeed = 50;
      this.dWet = 50;
      this.active = true;
    }

    Delay.prototype.toggleEffect = function toggleEffect() {
      this.ea.publish('toggleDelay');
      this.active = !this.active;
    };

    Delay.prototype.attached = function attached() {
      this.toggleEffect();
    };

    return Delay;
  }()) || _class);
});
define('showcases/beatmaker/effects/equalizer',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Equalizer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Equalizer = exports.Equalizer = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Equalizer(ab, ea) {
      _classCallCheck(this, Equalizer);

      this.eq1 = 40;
      this.eq2 = 44;
      this.eq3 = 35;
      this.eq4 = 35;
      this.eq5 = 30;
      this.eq6 = 40;
      this.ab = ab;
      this.ea = ea;
      this.active = true;
    }

    Equalizer.prototype.toggleEffect = function toggleEffect() {
      this.ea.publish('toggleEQ');
      this.active = !this.active;
    };

    return Equalizer;
  }()) || _class);
});
define('showcases/beatmaker/sequencer/sequencer',["exports", "aurelia-framework", "aurelia-fetch-client", "../components/audio-bus", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaFetchClient, _audioBus, _aureliaEventAggregator) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SequencerCustomElement = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SequencerCustomElement = exports.SequencerCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function SequencerCustomElement(http, ab, ea) {
      var _this = this;

      _classCallCheck(this, SequencerCustomElement);

      this.http = http;
      this.ea = ea;
      this.http.configure(function (config) {
        config.useStandardConfiguration().withDefaults({
          headers: {
            "Content-Type": "audio/mpeg"
          }
        });
      });
      this.kick;
      this.snare;
      this.ab = ab;
      this.audio = this.ab.audio;
      this.timeoutId;
      this.notePlaying = -1;
      this.drums = [];
      this.playing = false;
      console.log(this.drums);
      this.loopLength = 16;
      this.tempo = 120;
      this.volume = 85;
      this.scheduled = new Array(14);
      this.scriptNode = this.audio.createScriptProcessor(4096, 1, 1);
      this.scriptNode.onaudioprocess = function (e) {
        _this.ab.synthOut.gain.value = Math.pow(10, _this.ab.compressor.reduction / 20);
      };
      for (var i = 0; i < 14; i++) {
        this.scheduled[i] = new Array(16);
        for (var ii = 0; ii < 16; ii++) {
          this.scheduled[i][ii] = false;
        }
      }
      for (var i = 0; i < 14; i++) {
        if (i == 0) {
          this.scheduled[i][0] = true;
          this.scheduled[i][4] = true;
          this.scheduled[i][8] = true;
          this.scheduled[i][12] = true;
          this.scheduled[i][14] = true;
        } else if (i == 1) {
          this.scheduled[i][4] = true;
          this.scheduled[i][12] = true;
        } else if (i == 2) {
          this.scheduled[i][2] = true;
        } else if (i == 3) {
          this.scheduled[i][6] = true;
          this.scheduled[i][10] = true;
          this.scheduled[i][14] = true;
        } else if (i == 10) {
          this.scheduled[i][4] = true;
          this.scheduled[i][6] = true;
          this.scheduled[i][12] = true;
        }
      }
      console.log(this.scheduled);
      this.samples = [{ name: 'kick', sample: 'Roland_TR-33_Kick' }, { name: 'snare', sample: 'Roland_TR-33_Snare' }, { name: 'hh open', sample: 'Roland_TR-33_HH Op' }, { name: 'hh close', sample: 'Roland_TR-33_HH Cl' }, { name: 'tom hi', sample: 'Roland_TR-33_Tom Hi' }, { name: 'tom med', sample: 'Roland_TR-33_Tom Mi' }, { name: 'tom low', sample: 'Roland_TR-33_Tom Lo' }, { name: 'bongo hi', sample: 'Roland_TR-33_Bongo Hi' }, { name: 'bongo med', sample: 'Roland_TR-33_Bongo Mi' }, { name: 'bongo low', sample: 'Roland_TR-33_Bongo Lo' }, { name: 'conga hi', sample: 'Roland_TR-33_Conga Hi' }, { name: 'conga med', sample: 'Roland_TR-33_Conga Mi' }, { name: 'conga low', sample: 'Roland_TR-33_Conga Lo' }, { name: 'clave', sample: 'Roland_TR-33_Clave' }];
    }

    SequencerCustomElement.prototype.attached = function attached() {
      for (var i = 0; i < this.samples.length; i++) {
        var obj = {
          name: this.samples[i].name,
          sound: this.loadSample(this.samples[i].sample, i),
          scheduled: []
        };
        this.drums.push(obj);
      }
      this.gain = this.ab.audio.createGain();
      this.sideChainGain = this.ab.audio.createGain();
      this.gain.value = 1.0;
    };

    SequencerCustomElement.prototype.loadSample = function loadSample(type, i) {
      var _this2 = this;

      this.http.fetch("audio/roland-tr-33/" + type + ".wav").then(function (res) {
        return res.arrayBuffer();
      }).then(function (res) {
        _this2.audio.decodeAudioData(res, function (buffer) {
          _this2.drums[i].sound = buffer;
        });
      });
    };

    SequencerCustomElement.prototype.playSound = function playSound(buffer, time, name) {
      var _this3 = this;

      var src = this.audio.createBufferSource();
      src.buffer = buffer;
      src.disconnect();

      if (name === 'kick' && this.ab.compressionOn) {
        this.ea.publish('sidechain', time);
        this.scriptNode.disconnect();

        src.connect(this.sideChainGain);
        this.scriptNode = this.audio.createScriptProcessor(4096, 1, 1);
        this.scriptNode.onaudioprocess = function (e) {
          _this3.ab.synthOut.gain.value = Math.pow(10, _this3.ab.compressor.reduction / 20);
        };
        this.sideChainGain.connect(this.ab.compressor);
        this.scriptNode.connect(this.ab.compressor);
        this.sideChainGain.connect(this.ab.drumsIn);
      } else if (name === 'kick' && !this.ab.compressionOn) {
        src.connect(this.sideChainGain);
        this.scriptNode.disconnect();

        this.gain.connect(this.ab.drumsIn);
      }
      if (name !== 'kick') {
        src.connect(this.gain);

        this.gain.connect(this.ab.drumsIn);
      }
      this.gain.gain.value = this.volume / 50;
      this.sideChainGain.gain.value = this.volume / 50;
      src.start(time);
    };

    SequencerCustomElement.prototype.playSample = function playSample(buffer) {
      var src = this.audio.createBufferSource();
      src.buffer = buffer;
      src.connect(this.gain);
      this.gain.connect(this.ab.drumsIn);
      this.gain.gain.value = this.volume / 50;
      src.start(0);
    };

    SequencerCustomElement.prototype.changeTempo = function changeTempo(up) {
      if (up) {
        this.tempo = this.tempo += 4;
      } else {
        if (this.tempo > 4) {
          this.tempo -= 4;
        }
      }
    };

    SequencerCustomElement.prototype.handlePlay = function handlePlay() {
      if (!this.playing) {
        this.noteTime = 0.0;
        this.startTime = this.audio.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.notePlaying = 0;
        this.schedule();
        this.playing = true;
      } else {
        this.playing = false;
        cancelAnimationFrame(this.timeoutId);
        this.notePlaying = -1;
      }
    };

    SequencerCustomElement.prototype.addNote = function addNote(e, i, ii) {
      console.log(i);
      if (this.scheduled[i][ii] == true) {
        this.scheduled[i][ii] = false;
        e.srcElement.classList.remove('blue');
        e.srcElement.classList.add('green');
        e.srcElement.classList.add('accent-3');
      } else {
        this.scheduled[i][ii] = true;
        e.srcElement.classList.remove('green');
        e.srcElement.classList.remove('accent-3');
        e.srcElement.classList.add('blue');
      }
    };

    SequencerCustomElement.prototype.clearNote = function clearNote(i, ii) {};

    SequencerCustomElement.prototype.handleStop = function handleStop() {};

    SequencerCustomElement.prototype.schedule = function schedule() {
      var currentTime = this.audio.currentTime;

      currentTime -= this.startTime;
      while (this.noteTime < currentTime + 0.200) {
        var contextPlayTime = this.noteTime + this.startTime;
        for (var i = 0; i < this.scheduled.length; i++) {
          if (this.scheduled[i][this.rhythmIndex] === true) {
            this.playSound(this.drums[i].sound, contextPlayTime, this.drums[i].name);
          }
        }
        this.advanceNote();
      }
      this.timeoutId = requestAnimationFrame(this.schedule.bind(this));
    };

    SequencerCustomElement.prototype.advanceNote = function advanceNote() {
      var secondsPerBeat = 60.0 / this.tempo;
      this.rhythmIndex++;
      if (this.rhythmIndex == this.loopLength) {
        this.rhythmIndex = 0;
      }
      this.notePlaying = this.rhythmIndex;
      this.noteTime += 0.25 * secondsPerBeat;
    };

    return SequencerCustomElement;
  }()) || _class);
});
define('showcases/beatmaker/synth/piano',['exports', '../components/audio-bus', 'aurelia-event-aggregator', 'aurelia-framework', 'aurelia-dialog', '../components/edit-effects'], function (exports, _audioBus, _aureliaEventAggregator, _aureliaFramework, _aureliaDialog, _editEffects) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpperValueConverter = exports.Piano = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Piano = exports.Piano = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService), _dec(_class = function () {
    function Piano(ab, ea, dialog) {
      var _this = this;

      _classCallCheck(this, Piano);

      this.ab = ab;
      this.ea = ea;
      this.audio = this.ab.audio;
      this.dialog = dialog;
      this.canvas = "piano";
      this.octaves = [-3, -2, -1, 0, 1, 2, 3];
      this.waves = ['sine', 'sawtooth', 'square', 'triangle'];

      this.A4 = 440;
      this.oscillators = createVoices();
      this.lfoData = {
        wave: 0.1,
        detune: 50,
        osc1: 4,
        osc2: 8,
        osc3: 12,
        freq: 4,
        type: 'Lfo',
        modType: 0
      };
      this.oscPresets = [{
        wave: 0.1,
        detune: 45,
        octave: -3,
        volume: 100
      }, {
        wave: 2,
        detune: 50,
        octave: 3,
        volume: 100
      }, {
        wave: 1,
        detune: 55,
        octave: 4,
        volume: 100
      }];
      this.masterVol = 85;
      this.modMult = 10;

      this.master = this.audio.createGain();
      this.master.gain.value = 1.0;
      this.effectOutput = this.audio.createGain();

      this.lfo = this.audio.createOscillator();
      this.lfo.type = this.waves[this.lfoData.wave === 0.1 ? 0 : this.lfoData.wave];
      this.lfo.frequency.value = this.lfoData.freq;
      this.lfo.detune.value = this.lfoData.detune;
      this.lfo.start(0);

      this.master.connect(this.effectOutput);
      this.effectOutput.gain.value = 2.0;
      this.effectOutput.connect(this.ab.synthIn);

      this.lpfCutoff = 10;
      this.lpfQ = 10.0;
      this.lpfMod = 13;
      this.lpfEnv = 50;

      this.envA = 20;
      this.envD = 65;
      this.envS = 65;
      this.envR = 50;

      this.lpfA = 65;
      this.lpfD = 30;
      this.lpfS = 30;
      this.lpfR = 50;

      this.notes = [{ note: 'c', hz: 261.626, color: true, key: 'a', isPlaying: false }, { note: 'c#', hz: 277.183, color: false, key: 'w', isPlaying: false }, { note: 'd', hz: 293.66, color: true, key: 's', isPlaying: false }, { note: 'd#', hz: 311.127, color: false, key: 'e', isPlaying: false }, { note: 'e', hz: 329.628, color: true, key: 'd', isPlaying: false }, { note: 'f', hz: 349.228, color: true, key: 'f', isPlaying: false }, { note: 'f#', hz: 369.994, color: false, key: 't', isPlaying: false }, { note: 'g', hz: 391.995, color: true, key: 'g', isPlaying: false }, { note: 'g#', hz: 415.305, color: false, key: 'y', isPlaying: false }, { note: 'a', hz: 440, color: true, key: 'h', isPlaying: false }, { note: 'a#', hz: 466.164, color: false, key: 'u', isPlaying: false }, { note: 'b', hz: 493.883, color: true, key: 'j', isPlaying: false }, { note: 'c', hz: 523.252, color: true, key: 'k', isPlaying: false }, { note: 'c#', hz: 554.366, color: false, key: 'o', isPlaying: false }, { note: 'd', hz: 587.33, color: true, key: 'l', isPlaying: false }, { note: 'd#', hz: 622.254, color: false, key: 'p', isPlaying: false }, { note: 'e', hz: 659.256, color: true, key: ';', isPlaying: false }, { note: 'f', hz: 698.456, color: true, key: "'", isPlaying: false }];
      this.x = 0;
      this.y = 0;
      for (var i in this.notes) {
        this.notes[i].element;
      }

      window.addEventListener('keydown', this.play.bind(this));
      window.addEventListener('keyup', this.stop.bind(this));

      this.ea.subscribe('play-key', function (msg) {
        console.log(msg);
        _this.playKey(msg.index);
      });

      this.ea.subscribe('stop-key', function (msg) {
        _this.stopKey(msg.index);
      });
    }

    Piano.prototype.openEffects = function openEffects() {
      this.dialog.open({
        viewModel: _editEffects.EditEffects,
        lock: false,
        model: 'effects'
      }).then(function (res) {
        console.log(res);
      });
    };

    Piano.prototype.activate = function activate(a, b, c) {};

    Piano.prototype.canDeactivate = function canDeactivate() {};

    Piano.prototype.attached = function attached() {};

    Piano.prototype.play = function play(e) {
      var s = e.key;
      for (var i in this.notes) {
        if (!e.key) {
          if (String.fromCharCode(e.keyCode) == this.notes[i].key || String.fromCharCode(e.keyCode) == this.notes[i].key.toUpperCase()) {
            this.playKey(i);
          }
        } else {
          if (s == this.notes[i].key) {
            this.playKey(i);
          }
        }
      }
    };

    Piano.prototype.stop = function stop(e) {
      var s = e.key;
      for (var i in this.notes) {
        if (!e.key) {
          if (String.fromCharCode(e.keyCode) == this.notes[i].key || String.fromCharCode(e.keyCode) == this.notes[i].key.toUpperCase()) {
            this.stopKey(i);
          }
        } else {
          if (s == this.notes[i].key) {
            this.stopKey(i);
          }
        }
      }
    };

    Piano.prototype.playKey = function playKey(i) {
      if (this.notes[i].isPlaying === false) {
        this.lfo.disconnect();
        this.lfo.type = this.waves[this.lfoData.wave === 0.1 ? 0 : this.lfoData.wave];
        this.lfo.frequency.value = this.lfoData.freq;
        this.lfo.detune.value = this.lfoData.detune;
        this.master.gain.value = this.masterVol / 50;

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['f1' + i] = this.ab.audio.createBiquadFilter();
          this.notes[i]['f1' + i].type = "lowpass";
          this.notes[i]['f1' + i].Q.value = this.lpfQ;
          this.notes[i]['f1' + i].frequency.value = this.lpfCutoff * 100;
          this.notes[i]['f2' + i] = this.ab.audio.createBiquadFilter();
          this.notes[i]['f2' + i].type = "lowpass";
          this.notes[i]['f2' + i].Q.value = this.lpfQ;
          this.notes[i]['f2' + i].frequency.value = this.lpfCutoff * 100;

          this.notes[i]['g' + ii] = this.ab.audio.createGain();
          this.notes[i]['g' + ii].gain.value = 0.0005 * this.oscillators[ii].volume;
          this.notes[i]['o' + ii] = this.ab.audio.createOscillator();
          this.notes[i]['o' + ii].detune.value = this.oscillators[ii].detune - 50;
          if (this.oscillators[ii].octave - 3 == 0) {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz;
          } else if (this.oscillators[ii].octave - 3 > 0) {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz * 2 * (this.oscillators[ii].octave - 3);
          } else {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz * 2 / Math.abs(this.oscillators[ii].octave - 3);
          }
          this['lfoOscGain' + ii] = this.ab.audio.createGain();
          this.lfo.connect(this['lfoOscGain' + ii]);
          this['lfoOscGain' + ii].gain.value = this.lfoData['osc' + (ii + 1)] / 100;
          this.notes[i]['o' + ii].type = this.waves[this.oscillators[ii].wave];
          this.notes[i]['o' + ii].connect(this.notes[i]['g' + ii]);
          this.notes[i]['g' + ii].connect(this.notes[i]['f1' + i]);
          this.notes[i]['f1' + i].connect(this.notes[i]['f2' + i]);
          this.notes[i]['modfilterGain' + ii] = this.ab.audio.createGain();
          this.modfilterGain = this.ab.audio.createGain();
          this.lfo.connect(this.notes[i]['modfilterGain' + ii]);
          this.notes[i]['modfilterGain' + ii].gain.value = this.lpfMod * 24;
          this.notes[i]['modfilterGain' + ii].connect(this.notes[i]['f1' + i].detune);
          this.notes[i]['modfilterGain' + ii].connect(this.notes[i]['f2' + i].detune);
          this.notes[i]['e' + i] = this.ab.audio.createGain();
          this.notes[i]['f2' + i].connect(this.notes[i]['e' + i]);

          this.notes[i]['e' + i].connect(this.master);
          var now = this.ab.audio.currentTime;
          var atkEnd = now + this.envA / 100.0;
          this.notes[i]['e' + i].gain.value = 0.0;
          this.notes[i]['e' + i].gain.setValueAtTime(0.0, now);
          this.notes[i]['e' + i].gain.linearRampToValueAtTime(1.0, atkEnd);
          this.notes[i]['e' + i].gain.setTargetAtTime(this.envS / 100.0, atkEnd, this.envD / 100.0 + 0.001);

          var filterAttackLevel = this.lpfEnv * 72;
          var filterSustainLevel = filterAttackLevel * this.lpfS / 100.0;
          var filterAttackEnd = this.lpfA / 100.0;

          if (!filterAttackEnd) {
            filterAttackEnd = 0.05;
          }

          this.notes[i]['f1' + i].detune.setValueAtTime(0, now);
          this.notes[i]['f1' + i].detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
          this.notes[i]['f2' + i].detune.setValueAtTime(0, now);
          this.notes[i]['f2' + i].detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
          this.notes[i]['f1' + i].detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 100.0 + 0.001);
          this.notes[i]['f2' + i].detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 100.0 + 0.001);
        }

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['o' + ii].start(0);
        }

        this.notes[i].isPlaying = true;
      }
    };

    Piano.prototype.stopKey = function stopKey(i) {
      if (this.notes[i].isPlaying === true) {
        var now = this.ab.audio.currentTime;
        var release = now + this.envR / 100.0;
        this.notes[i]['e' + i].gain.cancelScheduledValues(now);
        this.notes[i]['e' + i].gain.setValueAtTime(this.notes[i]['e' + i].gain.value, now);
        this.notes[i]['e' + i].gain.setTargetAtTime(0.0, now, this.envR / 100.0 + 0.001);
        this.notes[i]['f1' + i].detune.cancelScheduledValues(now);
        this.notes[i]['f1' + i].detune.setTargetAtTime(0, now, this.lpfR / 100.0 + 0.001);
        this.notes[i]['f2' + i].detune.cancelScheduledValues(now);
        this.notes[i]['f2' + i].detune.setTargetAtTime(0, now, this.lpfR / 100.0 + 0.001);

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['g' + ii].gain.cancelScheduledValues(now);
          this.notes[i]['g' + ii].gain.setTargetAtTime(0, now, this.envR / 100.0 + 0.001);
          this.notes[i]['o' + ii].stop(now + this.envR / 30.0);
        }
        this.notes[i].isPlaying = false;
      }
    };

    return Piano;
  }()) || _class);

  function createVoices() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
      arr.push(function () {
        var voice = {
          volume: 50,
          wave: 1,
          octave: 0,
          type: 'Oscillator',
          detune: 50
        };
        return voice;
      });
    }
    return arr;
  }

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});
define('showcases/beatmaker/synth/components/oscillator',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Oscillator = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var Oscillator = exports.Oscillator = (_class = function Oscillator() {
    _classCallCheck(this, Oscillator);

    _initDefineProp(this, 'osc', _descriptor, this);

    _initDefineProp(this, 'preset', _descriptor2, this);

    _initDefineProp(this, 'type', _descriptor3, this);

    _initDefineProp(this, 'index', _descriptor4, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'osc', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'preset', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'index', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('showcases/beatmaker/synth/components/piano-key',['exports', 'aurelia-framework', '../piano', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _piano, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PianoKeyCustomElement = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var PianoKeyCustomElement = exports.PianoKeyCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _piano.Piano, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function PianoKeyCustomElement(element, piano, ea) {
      _classCallCheck(this, PianoKeyCustomElement);

      _initDefineProp(this, 'key', _descriptor, this);

      _initDefineProp(this, 'assigned', _descriptor2, this);

      _initDefineProp(this, 'playing', _descriptor3, this);

      _initDefineProp(this, 'index', _descriptor4, this);

      this.element = element;
      this.ea = ea;
    }

    PianoKeyCustomElement.prototype.attached = function attached() {};

    PianoKeyCustomElement.prototype.play = function play() {
      this.ea.publish('play-key', { index: this.index });
    };

    PianoKeyCustomElement.prototype.stop = function stop() {
      this.ea.publish('stop-key', { index: this.index });
    };

    return PianoKeyCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'assigned', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'playing', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'index', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('aurelia-dialog/ai-dialog',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialog = undefined;

  

  var _dec, _dec2, _class;

  var AiDialog = exports.AiDialog = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialog() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) {
        return this._closePromise;
      }

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        _this2._closePromise = undefined;
      }, function (e) {
        _this2._closePromise = undefined;
        return Promise.reject(e);
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this._escapeKeyEventHandler = function (e) {
        if (e.keyCode === 27) {
          var top = _this._dialogControllers[_this._dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = settings.startingZIndex;
      this.modalContainer.style.zIndex = settings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this._escapeKeyEventHandler);
      }

      this._dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this._dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this._dialogControllers.splice(i, 1);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this._escapeKeyEventHandler);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3._dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  DialogRenderer.prototype._dialogControllers = [];

  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result', './dialog-options'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult, _dialogOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      return this.openAndYieldController(settings).then(function (controller) {
        return controller.result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this = this;

      var childContainer = this.container.createChild();
      var dialogController = void 0;
      var promise = new Promise(function (resolve, reject) {
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), _createSettings(settings), resolve, reject);
      });
      childContainer.registerInstance(_dialogController.DialogController, dialogController);
      dialogController.result = promise;
      dialogController.result.then(function () {
        _removeController(_this, dialogController);
      }, function () {
        _removeController(_this, dialogController);
      });
      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _createSettings(settings) {
    settings = Object.assign({}, _dialogOptions.dialogOptions, settings);
    settings.startingZIndex = _dialogOptions.dialogOptions.startingZIndex;
    return settings;
  }

  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            service.controllers.push(dialogController);
            service.hasActiveDialog = !!service.controllers.length;
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }

  function _removeController(service, controller) {
    var i = service.controllers.indexOf(controller);
    if (i !== -1) {
      service.controllers.splice(i, 1);
      service.hasActiveDialog = !!service.controllers.length;
    }
  }
});
define('text!about.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"row topimg \" style=\"\">\r\n    <div class=\"col s12 center-align\" style=\"\">\r\n      <div>\r\n        <h1 style=\"margin-bottom:5px;\">All Things Front End</h1>\r\n        <p style=\"margin-top:5px;color:#bdbdbd\" >(And More)</p>\r\n        <h4 style=\"margin-bottom:5px;\">Hey, I'm Justin, a Front End Developer.</h4>\r\n        <h4 style=\"margin-bottom:10px;\">And this is my website about making websites.</h4>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <div class=\"row z-depth-1 pane1\" style=\"\">\r\n    <div class=\"col s12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-image green accent-3\" style=\"padding:15px;\">\r\n          <div class=\"row\" style=\"margin:0\">\r\n            <div class=\"fixed-action-btn horizontal\" style=\"position:absolute;display:inline-block;\">\r\n              <a class=\"btn-floating btn-large blue\">\r\n                <i class=\"large material-icons\">chat_bubble</i>\r\n              </a>\r\n              <ul>\r\n\r\n                <li title=\"Linked In\"><a class=\"btn-floating yellow darken-1\" href=\"https://www.linkedin.com/in/justin-stoner-95160487\"><i class=\"material-icons\">account_circle</i></a></li>\r\n                <li title=\"Download Resume\"><a class=\"btn-floating green\"><i class=\"material-icons\">insert_drive_file</i></a></li>\r\n                <li title=\"Email\"><a class=\"btn-floating blue\" href=\"mailto:justin@heyjust.in\"><i class=\"material-icons\">mail</i></a></li>\r\n              </ul>\r\n            </div>\r\n            <div class=\"me-img left\"></div>\r\n            <p style=\"color:#fff;font-size:24px;margin:0;padding:18px;\">Who Am I?\r\n\r\n            </p>\r\n          </div>\r\n\r\n        </div>\r\n        <div class=\"card-content\">\r\n          I'm a front end developer at AlterMedia, where we make the worlds leading Studio Management Software. I studied computer science at College of the Canyons.\r\n          <p class=\"grey-text\" style=\"margin-top:5px;\">Please be aware this website is very new and still a work in progress. Suggestions? <a class=\"\" href=\"mailto:justin@heyjust.in\">Email me</a></p>\r\n        </div>\r\n        <div class=\"card-tabs\">\r\n          <ul class=\"tabs\">\r\n            <li class=\"tab tabs-fixed-width\"><a class=\"${skillIndex===$index?'active ':''}blue-text\" href=\"#exp\">Experience</a></li>\r\n            <li class=\"tab tabs-fixed-width\"><a class=\"${skillIndex===$index?'active ':''}blue-text\" href=\"#edu\">Education</a></li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"card-content grey lighten-2\">\r\n          <div id=\"exp\">\r\n            <div class=\"row\">\r\n              <div class=\"col s12 l6\" style=\"padding:0 5px 0 0\">\r\n                <h5>WebGlancer</h5>\r\n                In the last 5 years at AlterMedia, I've converted the front end of a jQuery/PHP system back from the old days of web development over to Angular 1.5 and created a REST api for it in PHP.\r\n                 Later, around the time Angular 2 came out, we decided to switch the front end to Aurelia instead and are very happy with it. I am now finishing up migrating the backend over to Node and Express.\r\n                 I also designed much of the interface and maintained multiple versions of the product.\r\n              </div>\r\n              <div class=\"col s12 l6\" style=\"padding:0\">\r\n                <h5>WordPress</h5>\r\n                I maintain the companies website at <a href=\"https://studiosuite.com\">studiosuite.com</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div id=\"edu\">\r\n            I've finished computer science at College of the Canyons, but I have a few math classes to take before I can transfer.\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"card\">\r\n        <div class=\"card-content blue white-text\">\r\n          <p>Skills </p>\r\n        </div>\r\n        <div class=\"card-tabs\">\r\n          <ul class=\"tabs blue\">\r\n            <li class=\"tab tabs-fixed-width\" repeat.for=\"skill of skills\" click.delegate=\"changeSkill(skill, $index)\"><a class=\"${skillIndex===$index?'active ':''}white-text\" href=\"${'#skill'+$index}\">${skill.name}</a></li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"card-content grey lighten-2\">\r\n          <div class=\"row\">\r\n            <canvas id=\"skills-container\" class=\"left\" width=\"200\" height=\"200\"></canvas>\r\n            <div class=\"\" style=\"\">\r\n              <p style=\"margin-bottom:5px;\">${activeSkill.name+': '}${activeSkill.value}/100</p>\r\n              <p class=\"skill-descripion\">${activeSkill.description}</p>\r\n            </div>\r\n          </div>\r\n          <div id=\"skill0\"></div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"row grey darken-2 pane2\">\r\n      <p style=\"color:#fff;\">Contact: justin@heyjust.in | <a href=\"https://www.linkedin.com/in/justin-stoner-95160487\">Linked In</a></p>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "body {\n  background-color: #fff; }\n\n.topimg {\n  background: url(\"images/IMG_1066.jpg\") top/cover no-repeat;\n  width: 100%;\n  margin-bottom: 0;\n  position: fixed;\n  z-index: 0;\n  padding: 0;\n  height: 400px; }\n  .topimg div {\n    width: 100%;\n    height: 100%;\n    padding-top: 45px;\n    color: #fff; }\n\n.me-img {\n  background: url(\"images/me.jpg\") top/cover no-repeat;\n  width: 75px;\n  height: 75px;\n  border-radius: 75px;\n  margin-right: 10px; }\n\n.card .row .col {\n  background: transparent !important; }\n\n.pane1 {\n  z-index: 1;\n  margin-top: 400px;\n  background: #fff !important;\n  position: relative;\n  margin-bottom: 0;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 -2px 3px 0 rgba(0, 0, 0, 0.14), 0 -3px 5px 0 rgba(0, 0, 0, 0.12), 0 -3px 5px 3px rgba(0, 0, 0, 0.2); }\n  .pane1 div.col {\n    background: #fff !important; }\n\n.pane2 {\n  margin-bottom: 0;\n  text-align: center;\n  color: #fff;\n  background: url(\"images/IMG_0983.jpg\") top/cover no-repeat;\n  height: 400px;\n  margin-top: -15px;\n  position: relative;\n  padding-top: 200px; }\n\n.btn-sm {\n  padding: 0 0.5rem; }\n\nnav .brand-logo,\n.brand-logo {\n  margin-left: 15px;\n  font-size: 18px; }\n\n[md-tabs] .waves-effect {\n  position: static; }\n\n.parallax-container {\n  height: 800px; }\n\n.b-radius-card {\n  border-radius: 0 0 2px 2px; }\n\n.b-radius {\n  border-radius: 2px;\n  -webkit-border-radius: 2px;\n  -moz-border-radius: 2px; }\n\n.switch label input[type=checkbox]:checked + .lever {\n  background-color: #64b5f6; }\n\n.switch label input[type=checkbox]:checked + .lever:after {\n  background-color: #2196f3; }\n\n.ui-range .noUi-active.noUi-handle {\n  width: 15px;\n  height: 15px;\n  left: -5px;\n  top: -6px; }\n\n.ui-range .noUi-handle {\n  background-color: #2196f3 !important; }\n  .ui-range .noUi-handle .noUi-tooltip {\n    background-color: #2196f3 !important;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.ui-range .noUi-value.noUi-value-horizontal.noUi-value-large {\n  display: none; }\n\n.p2 path {\n  fill: #2196f3;\n  stroke: none; }\n\n.p2 path:first-child {\n  stroke: none;\n  fill: #fff;\n  filter: none; }\n\ndiv.au-animate.au-enter {\n  display: none !important; }\n\ndiv.au-animate.au-enter-active {\n  display: initial;\n  -webkit-animation: blurIn 2s;\n  animation: blurIn 2s; }\n\ndiv.au-animate.au-leave-active {\n  -webkit-animation: blurOut 2s;\n  animation: blurOut 2s; }\n\n#synth .p2 path:first-child,\n#sequencer-controller .p2 path:first-child {\n  fill: #eee; }\n\n#synth .p2 path,\n#sequencer-controller .p2 path {\n  stroke: none;\n  fill: #00E676; }\n\ncanvas {\n  transition: all 0.3s ease-in-out; }\n\n.indicator {\n  background: #2196f3 !important; }\n\nul.tabs.blue .indicator {\n  background: #ffffff !important; }\n\nul.tabs {\n  overflow-x: auto; }\n  ul.tabs li a.active {\n    color: #2196f3 !important; }\n  ul.tabs li a.white-text {\n    color: #fff !important; }\n  ul.tabs li a.white-text.active {\n    color: #fff !important; }\n  ul.tabs li a {\n    color: #343434 !important; }\n\n@media only screen and (max-width: 992px) {\n  .topimg {\n    height: 100%; }\n  .pane1 {\n    margin-top: 163%; } }\n\n@-webkit-keyframes blurIn {\n  0% {\n    -webkit-filter: blur(10px); }\n  100% {\n    -webkit-filter: blur(0px); } }\n\n@keyframes blurIn {\n  0% {\n    filter: blur(10px); }\n  100% {\n    filter: blur(0px); } }\n\n@-webkit-keyframes blurOut {\n  0% {\n    -webkit-filter: blur(0px); }\n  100% {\n    -webkit-filter: blur(10px); } }\n\n@keyframes blurOut {\n  0% {\n    -webkit-filter: blur(0px); }\n  100% {\n    -webkit-filter: blur(10px); } }\n\n@media only screen and (max-width: 992px) {\n  nav .brand-logo {\n    left: initial !important;\n    -webkit-transform: none !important;\n    transform: none !important; } }\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"materialize-css/materialize.min.css\"></require>\n  <require from=\"./styles/main.css\"></require>\n  <div class=\"navbar-fixed \">\n    <nav>\n      <div class=\"nav-wrapper blue\">\n        <a href=\"#/\" class=\"brand-logo\"><span>Justin Stoner</span></a>\n        <ul class=\"right\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive?'active':''} waves-effect waves-light\"><a href=\"${row.href}\">${row.title}</a></li>\n        </ul>\n      </div>\n    </nav>\n  </div>\n  <div style=\"overflow:auto;\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!showcases/beatmaker/styles/main.css', ['module'], function(module) { module.exports = ".au-animate .row {\n  margin: 0; }\n\n.card-left {\n  display: table-cell;\n  /*border-right: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right {\n  display: table-cell;\n  /*border-left: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right > div,\n.card-left > div {\n  height: 20%; }\n\n.input-field.inline.col.m4 {\n  text-align: center; }\n\nlabel.sm {\n  font-size: 0.8rem;\n  /*position: absolute !important;*/\n  top: -14px !important;\n  left: 0rem !important; }\n\n.select-wrapper {\n  margin-top: 0px; }\n\n.select-wrapper + label {\n  color: #343434 !important; }\n\nform p {\n  margin-top: 0;\n  margin-bottom: 0; }\n\nsound-wave {\n  position: absolute;\n  border-radius: 2px;\n  overflow: hidden;\n  z-index: 0; }\n  sound-wave canvas {\n    height: 100%;\n    width: 100%; }\n\n.canvas-as-bg p {\n  color: #fff !important; }\n\n.p2 .active ~ rect {\n  fill: #bdbdbd; }\n\n.p2 rect {\n  filter: url(#glow);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.p1 circle.pointer,\n.p2 circle.pointer {\n  fill: #fff;\n  stroke: none; }\n\n.p2 text {\n  font-size: 13px;\n  fill: #fff; }\n\n#synth,\n#sequencer-controller {\n  background: #2196f3; }\n  #synth #synthfilter,\n  #sequencer-controller #synthfilter {\n    z-index: 1;\n    position: relative; }\n  #synth .p2 text,\n  #sequencer-controller .p2 text {\n    fill: #fff;\n    filter: none; }\n  #synth .p1 circle.pointer,\n  #synth .p2 circle.pointer,\n  #sequencer-controller .p1 circle.pointer,\n  #sequencer-controller .p2 circle.pointer {\n    fill: #fff;\n    stroke: none; }\n  #synth .p2 rect,\n  #synth .p1 rect,\n  #sequencer-controller .p2 rect,\n  #sequencer-controller .p1 rect {\n    fill: #00E676; }\n  #synth .p2 .active ~ rect,\n  #sequencer-controller .p2 .active ~ rect {\n    fill: #bdbdbd; }\n  #synth .p2 circle:first-child,\n  #synth .p1 circle:first-child,\n  #sequencer-controller .p2 circle:first-child,\n  #sequencer-controller .p1 circle:first-child {\n    -webkit-filter: url(#dropshadow);\n    filter: url(#dropshadow);\n    fill: #00e676;\n    stroke: #fff; }\n  #synth .p2 circle,\n  #synth .p1 circle,\n  #sequencer-controller .p2 circle,\n  #sequencer-controller .p1 circle {\n    stroke: #69f0ae;\n    stroke-width: 3; }\n  #synth .p1 text,\n  #sequencer-controller .p1 text {\n    fill: #ddd; }\n  #synth .p1 text.active,\n  #sequencer-controller .p1 text.active {\n    fill: #fff; }\n\n.p2 rect,\n.p1 rect {\n  fill: #64b5f6; }\n\n.p2 g polygon,\n.p1 g polygon {\n  opacity: 1; }\n\n.p2 circle:first-child,\n.p1 circle:first-child {\n  -webkit-filter: url(#dropshadow);\n  filter: url(#dropshadow);\n  fill: #2196f3;\n  stroke: #fff; }\n\n.p2 circle,\n.p1 circle {\n  fill: #fff;\n  stroke: #64b5f6;\n  stroke-width: 3; }\n\n.p1 text {\n  font-size: 12px;\n  fill: #bdbdbd;\n  font-family: sans-serif;\n  font-weight: 300;\n  -webkit-transition: all .1s ease-in-out; }\n\n.p1 text.active {\n  font-size: 12px;\n  -webkit-transition: all .3s ease-in-out;\n  fill: #64b5f6; }\n\nsvg:not(:root) {\n  overflow: visible; }\n\n.wave-shape {\n  width: 36px;\n  padding: 0; }\n\n#right form,\n#left form {\n  padding: 0; }\n\n#left form > div:first-child {\n  padding-left: 0; }\n\n#right form > div:last-child {\n  padding-right: 0; }\n\n.dropdown-content li > span {\n  color: #2196f3 !important; }\n\ninput:focus:not([type]):not([readonly]), input[type=\"text\"]:focus:not([readonly]), input[type=\"password\"]:focus:not([readonly]), input[type=\"email\"]:focus:not([readonly]), input[type=\"url\"]:focus:not([readonly]), input[type=\"time\"]:focus:not([readonly]), input[type=\"date\"]:focus:not([readonly]), input[type=\"datetime\"]:focus:not([readonly]), input[type=\"datetime-local\"]:focus:not([readonly]), input[type=\"tel\"]:focus:not([readonly]), input[type=\"number\"]:focus:not([readonly]), input[type=\"search\"]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3; }\n\ninput:not([type]):focus:not([readonly]) + label, input[type=text]:focus:not([readonly]) + label, input[type=password]:focus:not([readonly]) + label, input[type=email]:focus:not([readonly]) + label, input[type=url]:focus:not([readonly]) + label, input[type=time]:focus:not([readonly]) + label, input[type=date]:focus:not([readonly]) + label, input[type=datetime]:focus:not([readonly]) + label, input[type=datetime-local]:focus:not([readonly]) + label, input[type=tel]:focus:not([readonly]) + label, input[type=number]:focus:not([readonly]) + label, input[type=search]:focus:not([readonly]) + label, textarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #2196f3; }\n\n.mute-label {\n  color: #9e9e9e; }\n\ntd {\n  padding: 5px; }\n\nsection {\n  margin: 0; }\n\n.waves-effect.waves-blue .waves-ripple {\n  /*\r\n  The alpha value allows the text and background color\r\n  of the button to still show through.\r\n*/\n  background-color: rgba(3, 169, 244, 0.65); }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.pictureDetail {\n  max-width: 425px; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n.white-notes {\n  /*top:-89px;*/\n  position: relative;\n  margin-top: -90px;\n  z-index: 1; }\n\n.black-notes {\n  /*  position:absolute;*/\n  z-index: 2; }\n"; });
define('text!showcase.html', ['module'], function(module) { module.exports = "<template>\r\n    <!-- <ul class=\"showcase-tabs tabs z-depth-1\" style=\"z-index:998;\">\r\n      <li repeat.for=\"row of router.navigation\" class=\"waves-effect waves-blue\"><a class=\"${row.isActive?'active':''}\" href=\"#tab_${$index+1}\">${row.title}</a></li>\r\n      <li ><a href=\"#tab2\" class=\"disabled\">More coming soon...</a></li>\r\n    </ul> -->\r\n    <router-view></router-view>\r\n</template>\r\n"; });
define('text!work.html', ['module'], function(module) { module.exports = "<template></template>\r\n"; });
define('text!showcases/beatmaker/sequencer/styles/sequencer.css', ['module'], function(module) { module.exports = "form.col.s12 {\n  padding: 0;\n  margin-bottom: 0.75rem; }\n  form.col.s12 .row {\n    padding: 0.75rem; }\n\n@media only screen and (max-width: 600px) {\n  tr > td {\n    padding: 5px 1px; }\n  tr > td:first-child {\n    padding: 5px; } }\n"; });
define('text!showcases/beatmaker/beat-maker.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./synth/piano\"></require>\r\n  <require from=\"./sequencer/sequencer\"></require>\r\n  <require from=\"./components/sound-wave\"></require>\r\n  <require from=\"./styles/main.css\"></require>\r\n  <!-- <sound-wave ab.bind='ab' canvas-id='beatmaker' style=\"\" background.bind=\"true\"></sound-wave> -->\r\n  <ul class=\"tabs showcase-tabs z-depth-1\" style=\"overflow-x:hidden;z-index:998;position:fixed\">\r\n    <li class=\"tab col s4\"><a class=\"active blue-text\" href=\"#synthtab\">Synth</a></li>\r\n    <li class=\"tab col s4\"><a class=\"blue-text\" href=\"#drumtab\">Sequencer</a></li>\r\n  </ul>\r\n  <div style=\"margin-top:50px;\" id='beatmaker'>\r\n    <div class=\"row\" style=\"margin-bottom:15px;\">\r\n      <div id=\"synthtab\" class=\"col s12\" style=\"padding:0;\">\r\n        <piano></piano>\r\n      </div>\r\n      <div id=\"drumtab\" class=\"col s12\" style=\"padding:0;\">\r\n        <sequencer></sequencer>\r\n      </div>\r\n    </div>\r\n  </div>\n  <svg style=\"position:absolute;top:-9999px;\">\n    <filter id=\"dropshadow\" height=\"150%\" width=\"150%\">\r\n  \t\t<feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"2\"/>\r\n  \t\t<feOffset dx=\"1\" dy=\"4\" result=\"offsetblur\"/>\r\n  \t\t<feFlood flood-color=\"rgba(0,0,0,0.2)\"/>\r\n  \t\t<feComposite in2=\"offsetblur\" operator=\"in\"/>\r\n  \t\t<feMerge>\r\n  \t\t\t<feMergeNode/>\r\n  \t\t\t<feMergeNode in=\"SourceGraphic\"/>\r\n  \t\t</feMerge>\r\n  \t</filter>\r\n      <filter id=\"inner-shadow\">\r\n\r\n          <!-- Shadow Offset -->\r\n          <feOffset dx=\"0\" dy=\"5\"></feOffset>\r\n\r\n          <!-- Shadow Blur -->\r\n          <feGaussianBlur stdDeviation=\"5\" result=\"offset-blur\"></feGaussianBlur>\r\n\r\n          <!-- Invert the drop shadow\r\n               to create an inner shadow -->\r\n          <feComposite operator=\"out\" in=\"SourceGraphic\" in2=\"offset-blur\" result=\"inverse\"></feComposite>\r\n\r\n          <!-- Color & Opacity -->\r\n          <feFlood flood-color=\"black\" flood-opacity=\"0.75\" result=\"color\"></feFlood>\r\n\r\n          <!-- Clip color inside shadow -->\r\n          <feComposite operator=\"in\" in=\"color\" in2=\"inverse\" result=\"shadow\"></feComposite>\r\n\r\n          <!-- Put shadow over original object -->\r\n          <feComposite operator=\"over\" in=\"shadow\" in2=\"SourceGraphic\"></feComposite>\r\n      </filter>\n\r\n      <filter id=\"glow\">\n        <feGaussianBlur class=\"blur\" stdDeviation=\"7\" result=\"coloredBlur\"></feGaussianBlur>\n        <feMerge>\n          <feMergeNode in=\"coloredBlur\"></feMergeNode>\n          <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n        </feMerge>\n      </filter>\n  </svg>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/styles/synth.css', ['module'], function(module) { module.exports = "section {\n  background: #eee; }\n\n.tabs .indicator {\n  background-color: #2196f3; }\n\nknob p {\n  text-align: center; }\n\nknob div {\n  margin: 0 auto; }\n\nknob > p {\n  margin-bottom: 7px !important; }\n\noscillator .row .col {\n  padding: 0; }\n\nform div.grey.lighten-3 {\n  padding: 0.75rem 0.375rem !important; }\n\n.input-field {\n  margin-top: 0; }\n\n.key {\n  box-sizing: border-box;\n  width: 9.091% !important;\n  display: inline-block;\n  padding: 0 !important;\n  overflow: visible; }\n\n.key h1 {\n  text-align: center;\n  margin: 0;\n  font-size: 2.2rem; }\n\n.key div {\n  margin: 0 0.5rem 0 0;\n  height: 100%;\n  border-radius: 0px 0px 5px 5px;\n  display: block;\n  font-size: 12px;\n  transition: box-shadow .25s; }\n\n.key:last-child > div {\n  margin-right: 0; }\n\n.key.white {\n  height: 220px;\n  position: relative; }\n  .key.white h1 {\n    color: #000;\n    padding-top: 11rem; }\n  .key.white div {\n    background-color: transparent; }\n\n.key.white.play div {\n  background: #dddddd; }\n\n.key.black-key {\n  height: 148px;\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  background: transparent !important;\n  left: -4.5455% !important;\n  margin-right: -9.091%;\n  padding: 0 4px !important; }\n  .key.black-key div {\n    display: inline-block;\n    margin: 0 0.25rem;\n    outline: none;\n    background-color: #000;\n    width: 100%; }\n  .key.black-key h1 {\n    color: #fff;\n    padding-top: 6rem; }\n\n.key.black-key.play {\n  background: #717171; }\n\n.key.black-key >\n.key-info {\n  list-style: none;\n  margin: 0px;\n  padding: 0px;\n  text-align: center; }\n\n.key-item {\n  height: 100%;\n  padding-top: 105%; }\n\n.key-item > a {\n  padding-top: 50%; }\n\n.parameter-holder {\n  padding: 0;\n  margin: 0 0.75rem; }\n\nform.col.m3.s12,\nform.col.m4,\nform.col.m4.s12,\nform.col.m5,\nform.col.m6.s12 {\n  padding-left: 0;\n  padding-right: 0.75rem;\n  margin-bottom: 0.75rem; }\n  form.col.m3.s12 .row,\n  form.col.m4 .row,\n  form.col.m4.s12 .row,\n  form.col.m5 .row,\n  form.col.m6.s12 .row {\n    padding: 0.75rem 0.375rem; }\n  form.col.m3.s12 .col,\n  form.col.m4 .col,\n  form.col.m4.s12 .col,\n  form.col.m5 .col,\n  form.col.m6.s12 .col {\n    text-align: center;\n    padding: 0 0.375rem; }\n\nform.col.m3:last-child,\nform.col.m4:last-child,\nform.col.m4.s12:last-child,\nform.col.m6.s12:last-child,\nform.col.m5:last-child {\n  padding-right: 0; }\n\n@media only screen and (max-width: 600px) {\n  form.col.m3.s12,\n  form.col.m4,\n  form.col.m4.s12,\n  form.col.m5,\n  form.col.m6.s12 {\n    padding: 0; }\n  .key div {\n    margin: 0 0.05rem; } }\n"; });
define('text!showcases/beatmaker/components/edit-effects.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../effects/compressor\"></require>\r\n  <require from=\"../effects/delay\"></require>\r\n  <require from=\"../effects/equalizer\"></require>\r\n  <ai-dialog style=\"width:auto\">\r\n    <ai-dialog-body>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <ul class=\"tabs\" style=\"overflow-x:hidden;\">\r\n            <li class=\"tab col s4\"><a class=\"blue-text\" id=\"eqtab\" href=\"#test1\">EQ</a></li>\r\n            <li class=\"tab col s4\"><a class=\"blue-text\" href=\"#test2\">Delay</a></li>\r\n            <li class=\"tab col s4\"><a class=\"blue-text\" href=\"#test3\">Compressor</a></li>\r\n          </ul>\r\n        </div>\r\n        <div id=\"test1\" class=\"col s12\">\r\n          <equalizer></equalizer>\r\n        </div>\r\n        <div id=\"test2\" class=\"col s12\">\r\n          <delay></delay>\r\n        </div>\r\n        <div id=\"test3\" class=\"col s12\"><compressor></compressor></div>\r\n      </div>\r\n    </ai-dialog-body>\r\n  </ai-dialog>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/knob.html', ['module'], function(module) { module.exports = "<template>\r\n  <p style=\"\" class=\"${canvas?'white-text':'grey-text text-darken-1'}\">${label}</p>\r\n  <input type=\"range\" class=\"preset1\" min=\"${min}\" max=\"${max}\" value.bind=\"val\" data-anglerange=\"${range || 280}\" data-width=\"60\" data-height=\"60\" data-angleoffset=\"${offset || 220}\" data-fgColor=\"#2196f3\" data-labels=\"${labels}\" step='1' data-bgColor=\"#fff\"/>\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/mute-button.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=\"width:100%;margin-top:33px;\" click.delegate='muted=!muted'>\r\n      <template if.bind='muted'>\r\n        <i class=\"material-icons blue-text\" style=\"vertical-align:sub\">volume_up</i>\r\n      </template>\r\n      <template if.bind='!muted'>\r\n        <i class=\"material-icons red-text\" style=\"vertical-align:sub\">volume_off</i>\r\n      </template>\r\n    </a>\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/slider.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"blue white-text center-align b-radius\" style=\"margin-bottom:15px;\">\r\n    <p class=\"center-align\">${label}</p>\r\n    <div class=\"right\">\r\n      <div class=\"btn btn-flat btn-sm waves-effect waves-green green-text text-accent-3\" click.delegate=\"add()\" style=\"float:none;display:block;height:1.5rem;line-height:1;\">\r\n        <i class=\"material-icons\" style=\"line-height:1;\">add</i>\r\n      </div>\r\n      <div class=\"btn btn-flat btn-sm waves-effect waves-green green-text text-accent-3\" click.delegate=\"minus()\" style=\"float:none;display:block;height:1.5rem;line-height:1;\">\r\n        <i class=\"material-icons\" style=\"line-height:1;\">remove</i>\r\n      </div>\r\n    </div>\r\n    <div class=\"file-field input-field\">\r\n      <div class=\"file-path-wrapper\" style=\"padding:0;\">\r\n        <input type=\"text\" class=\"center-align\" style=\"margin:0;border:none;\" value.bind=\"val\" change.delegate=\"change()\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"ui-range\"></div>\r\n    <!-- <input type=\"range\" value.bind=\"val\" id=\"test5\" min=\"${min}\" max=\"${max}\" change.delegate=\"change()\" orient=\"vertical\"/> -->\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/sound-wave.html', ['module'], function(module) { module.exports = "<template>\r\n  <canvas width=\"50\" height=\"\" id='canv' style=\"z-index:-1;\" class=\"canvas\" css=\"${background?'position:absolute;z-index:-1':''}\"></canvas>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/switch.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"switch\">\r\n    <label>\r\n      Off\r\n      <input type=\"checkbox\" checked.bind=\"switched\">\r\n      <span class=\"lever\"></span>\r\n      On\r\n    </label>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/effects/compressor.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"../components/slider\"></require>\r\n  <require from=\"../components/switch\"></require>\r\n  <p>Compressor <switch class=\"right\" switched.bind=\"active\" click.delegate=\"toggleEffect()\"></switch></p>\r\n  <div class=\"row\" >\r\n    <div class=\"col l4 m4 s6\">\r\n      <slider min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"attack\" channel='compAttack' preset.one-time=\"attack\"></slider>\r\n      <!-- <knob min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"attack\" channel='compAttack' preset=\"25\"></knob> -->\r\n    </div>\r\n    <div class=\"col l4 m4 s6\">\r\n      <slider min=\"0\" max=\"100\" label=\"Threshold\" val.two-way=\"threshold\" channel='compThresh' preset.one-time=\"threshold\"></slider>\r\n    </div>\r\n    <div class=\"col l4 m4 s6\">\r\n      <slider min=\"1\" max=\"20\" label=\"Ratio\" val.two-way=\"ratio\" channel='compRatio' preset.one-time=\"ratio\"></slider>\r\n    </div>\r\n    <div class=\"col l4 m4 s6\">\r\n      <slider min=\"0\" max=\"100\" label=\"Release\" val.two-way=\"release\" channel='compRelease' preset.one-time=\"release\"></slider>\r\n    </div>\r\n\r\n    <div class=\"col l4 m4 s6\">\r\n      <slider min=\"0\" max=\"40\" label=\"Knee\" val.two-way=\"knee\" channel='compKnee' preset.one-time=\"knee\"></slider>\r\n    </div>\r\n\r\n    <div class=\"col l4 m4 s6\">\r\n      <p>Sidechain <switch class=\"right\" switched.bind=\"active\" click.delegate=\"toggleEffect()\"></switch></p>\r\n    </div>\r\n    <!-- <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"100\" label=\"Release\" val.two-way=\"release\" channel='compRelease' preset=\"25\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"100\" label=\"Threshold\" val.two-way=\"threshold\" channel='compThresh' preset=\"50\"></knob>\r\n    </div> -->\r\n  </div>\r\n  <!-- <div class=\"row\">\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"40\" label=\"Knee\" val.two-way=\"knee\" channel='compKnee' preset=\"40\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"1\" max=\"20\" label=\"Ratio\" val.two-way=\"ratio\" channel='compRatio' preset=\"12\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <mute-button></mute-button>\r\n    </div>\r\n  </div> -->\r\n</template>\r\n"; });
define('text!showcases/beatmaker/effects/delay.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"../components/switch\"></require>\r\n  <p>Delay <switch class=\"right\" switched.two-way=\"active\" click.delegate=\"toggleEffect()\"></switch></p>\r\n  <div class=\"row\">\r\n    <div class=\"col s6\">\r\n      <knob min=\"0\" max=\"100\" label=\"Time\" val.two-way=\"dTime\" channel='delayTime' preset=\"50\"></knob>\r\n    </div>\r\n    <div class=\"col s6\">\r\n      <knob min=\"0\" max=\"100\" label=\"Feedback\" val.two-way=\"dFeed\" channel='delayFeedback' preset=\"15\"></knob>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col s6\">\r\n      <knob min=\"0\" max=\"100\" label=\"Wet/Dry\" val.two-way=\"dWet\" channel=\"delayWet\" preset=\"25\"></knob>\r\n    </div>\r\n    <div class=\"col s6\">\r\n\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/effects/equalizer.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"../components/switch\"></require>\r\n  <p>Equalizer <switch class=\"right\" switched.two-way=\"active\" click.delegate=\"toggleEffect()\"></switch></p>\r\n  <div class=\"row\">\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"80hz\" val.two-way=\"eq1\" channel='eq1' preset.one-time=\"eq1\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"350hz\" val.two-way=\"eq2\" channel='eq2' preset.one-time=\"eq2\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"720hz\" val.two-way=\"eq3\" channel='eq3' preset.one-time=\"eq3\"></knob>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"1.6khz\" val.two-way=\"eq4\" channel='eq4' preset.one-time=\"eq4\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"5khz\" val.two-way=\"eq5\" channel='eq5' preset.one-time=\"eq5\"></knob>\r\n    </div>\r\n    <div class=\"col s4\">\r\n      <knob min=\"0\" max=\"80\" label=\"10khz\" val.two-way=\"eq6\" channel='eq6'preset.one-time=\"eq6\"></knob>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/sequencer/sequencer.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"./styles/sequencer.css\"></require>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <div class=\"au-animate col s12\" style=\"padding-top:0.75rem;\">\r\n    <!-- <div class=\"card\" id=\"sequencer\">\r\n      <div class=\"card-content\" style=\"padding:0.75rem\"> -->\r\n        <div class=\"row\">\r\n          <form class=\"col s12 b-radius-card z-depth-1\" style=\"margin-bottom:20px;\" id='sequencer-controller'>\r\n            <div class=\"row canvas-as-bg  b-radius-card blue\" >\r\n              <a class=\"waves-effect waves-${!muted?'green accent-3':'red'} btn-flat center-align\" style=\"padding:0;\" click.delegate='handlePlay()'>\r\n                <template if.bind='!playing'>\r\n                  <i class=\"material-icons green-text text-accent-3\" style=\"vertical-align:sub;font-size:2.3rem\">play_arrow</i>\r\n                </template>\r\n                <template if.bind='playing'>\r\n                  <i class=\"material-icons red-text\" style=\"vertical-align:sub;font-size:2.3rem\" >stop</i>\r\n                </template>\r\n              </a>\r\n              <div class=\"input-field inline\" style=\"margin-top:0;\">\r\n                <p style=\"padding-bottom:3px;margin-top:-24px;\">Tempo</p>\r\n                <button class=\"btn waves-effect waves-light green accent-3\" style=\"display:inline-block;width:36px;padding:0;margin-right:5px;\" click.delegate=\"changeTempo(false)\"><i class=\"material-icons\">remove</i></button>\r\n                <p style=\"width:40px;display:inline-block;\">${tempo}</p>\r\n                <button class=\"btn waves-effect waves-light green accent-3\" style=\"display:inline-block;width:36px;padding:0;margin-left:5px;\" click.delegate=\"changeTempo(true)\"><i class=\"material-icons\">add</i></button>\r\n              </div>\r\n              <div class=\"input-field inline\" style=\"margin-top:0;\">\r\n                <knob min=\"0\" max=\"100\" label=\"Volume\" canvas.bind=\"true\" preset.one-time=\"volume\" val.two-way=\"volume\"></knob>\r\n              </div>\r\n            </div>\r\n            <!-- <sound-wave ab.bind='ab' canvas-id='sequencer-controller' style=\"\"></sound-wave> -->\r\n          </form>\r\n        </div>\r\n        <table class=\"bordered striped\">\r\n          <tbody>\r\n              <tr>\r\n                <td style=\"width:5.88%;background:#fff;\"></td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%;background:#fff;\">\r\n                  <div class=\"${notePlaying-1==i?'blue':'grey'} lighten-2\" style=\"height:5px;\"></div>\r\n                </td>\r\n              </tr>\r\n              <tr repeat.for=\"drum of drums\">\r\n                <td style=\"width:5.88%;cursor:pointer\" class=\"blue-text\" click.delegate=\"playSample(drum.sound)\">${drum.name}</td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%;padding:0;border-left:1px solid #eee;\"><a class=\"waves-effect waves-light  ${scheduled[$parent.$index][i]==true?'blue':'green accent-3'}\" style=\"width:100%;padding:0rem;height:36px;\" click.delegate=\"addNote($event, $parent.$index, i)\"></a></td>\r\n              </tr>\r\n          </tbody>\r\n        </table>\r\n      <!-- </div>\r\n    </div> -->\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/piano.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./components/piano-key\"></require>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"../components/mute-button\"></require>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"./styles/synth.css\"></require>\r\n  <require from='./components/oscillator'></require>\r\n  <require from=\"../effects/compressor\"></require>\r\n  <require from=\"../effects/delay\"></require>\r\n  <require from=\"../effects/equalizer\"></require>\r\n  <div class=\"au-animate col s12\" style=\"padding-top:0.75rem;\">\r\n          <div class=\"row\" >\r\n            <form class=\"col m3 s12\">\r\n              <oscillator type='Lfo' osc.two-way=\"lfoData\" preset.one-time=\"lfoData\"></oscillator>\r\n            </form>\r\n            <form class=\"col m3 s12\" repeat.for=\"osc of oscillators\">\r\n              <oscillator osc.two-way=\"osc\" index.bind=\"$index\" type='Oscillator' preset.one-time=\"oscPresets[$index]\"></oscillator>\r\n            </form>\r\n          </div>\r\n          <div class=\"row\">\r\n            <form class=\"col m6 s12\">\r\n              <div id=\"filter\" class=\"row grey lighten-3 z-depth-1 b-radius-card\">\r\n                <p>Filter</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"200\" label=\"Cutoff\" val.two-way=\"lpfCutoff\" preset.one-time=\"lpfCutoff\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"20\" label=\"Q\" val.two-way=\"lpfQ\" preset.one-time=\"lpfQ\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Mod\" val.two-way=\"lpfMod\" preset.one-time=\"lpfMod\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Env\" val.two-way=\"lpfEnv\" preset.one-time=\"lpfEnv\"></knob>\r\n                  </div>\r\n                </div>\r\n                <p>Envelope</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"lpfA\" preset.one-time=\"lpfA\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Decay\" val.two-way=\"lpfD\" preset.one-time=\"lpfD\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Sustain\" val.two-way=\"lpfS\" preset.one-time=\"lpfS\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Release\" val.two-way=\"lpfR\" preset.one-time=\"lpfR\"></knob>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n            <form class=\"col m6 s12 b-radius-card z-depth-1\" id=\"synth\">\r\n              <div id=\"synthfilter\" class=\"row canvas-as-bg  b-radius-card\">\r\n                <p>Synth</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Drive\" val.two-way=\"lpfA\" canvas.bind=\"true\" preset.one-time=\"lpfA\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Reverb\" val.two-way=\"lpfD\" canvas.bind=\"true\" preset.one-time=\"lpfA\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\" >\r\n                    <knob id=\"soundwave\" min=\"0\" max=\"100\" label=\"Volume\" canvas.bind=\"true\" val.two-way=\"masterVol\" preset.one-time=\"masterVol\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <!-- <p class=\"center-align\">Effects</p>\r\n                    <button class=\"btn waves-effect waves-light green accent-3\" style=\"width:36px;padding:0;margin-top:13px;\" click.delegate=\"openEffects()\"><i class=\"material-icons\">equalizer</i></button> -->\r\n                  </div>\r\n                </div>\r\n                <p>Envelope</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Attack\" canvas.bind=\"true\" val.two-way=\"envA\" preset.one-time=\"envA\" ></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Decay\" canvas.bind=\"true\" val.two-way=\"envD\" preset.one-time=\"envD\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Sustain\" canvas.bind=\"true\" val.two-way=\"envS\" preset.one-time=\"envS\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Release\" canvas.bind=\"true\" val.two-way=\"envR\" preset.one-time=\"envR\"></knob>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <sound-wave ab.bind='ab' canvas-id='synth'></sound-wave>\r\n            </form>\r\n          </div>\r\n          <div class=\"row\">\r\n            <form class=\"col m4 s12\">\r\n              <div class=\"row grey lighten-3 z-depth-1  b-radius-card\">\r\n                <equalizer></equalizer>\r\n              </div>\r\n            </form>\r\n            <form class=\"col m3 s12\">\r\n              <div class=\"row grey lighten-3 z-depth-1  b-radius-card\">\r\n                <delay></delay>\r\n              </div>\r\n            </form>\r\n            <form class=\"col m5 s12\">\r\n              <div class=\"row grey lighten-3 z-depth-1  b-radius-card\" style=\"min-height:267.5px;\">\r\n                <compressor></compressor>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"row\" style=\"\">\r\n            <div class=\"col s12\" id='right' style=\"padding:0;\">\r\n              <piano-key class=\"${note.color?'white'+$index:'black'+$index}\" repeat.for=\"note of notes\" playing.bind=\"note.isPlaying\" index.bind=\"$index\"  assigned.bind=\"note.assigned\" key.bind=\"note\" containerLess></piano-key>\r\n            </div>\r\n          </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/components/oscillator.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from='../../components/knob'></require>\r\n  <require from='../../components/mute-button'></require>\r\n  <div class=\"grey lighten-3 z-depth-1 b-radius-card row\">\r\n    <p>${type==='Lfo' ? type : type + ' ' + (index+1)}</p>\r\n     <template if.bind='type!==\"Lfo\"'>\r\n       <div class=\"col s12 m12\">\r\n         <div class=\"input-field text-center col s6 m6\">\r\n           <knob min=\"0\" max=\"100\" label=\"Mix\" val.two-way=\"osc.volume\" offset=\"222\" preset.one-time=\"preset.volume\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min=\"0\" max=\"3\" label=\"Wave\" labels='sine, saw, sqr, tri' val.two-way=\"osc.wave\" offset='276' range=\"180\" preset.one-time=\"preset.wave\"></knob>\r\n         </div>\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min='0' max=\"7\" label=\"Octave\" labels=\"-3,-2,-1,0,1,2,3\" val.two-way=\"osc.octave\" offset='222' preset.one-time=\"preset.octave\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\" >\r\n            <knob min='0' max=\"100\" label=\"Detune\" val.two-way=\"osc.detune\" offset='222' preset.one-time=\"preset.detune\"></knob>\r\n         </div>\r\n       </div>\r\n     </template>\r\n     <template if.bind='type===\"Lfo\"'>\r\n       <div class=\"col s12 m12\">\r\n         <!-- <div class=\"input-field text-center col s6 m6\">\r\n           <knob min=\"0\" max=\"2\" labels=\"pitch, cutoff, bypass\" label=\"Mod Type\" val.two-way=\"modtype\" range=\"180\" offset=\"271\"></knob>\r\n         </div> -->\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s4 m4\">\r\n           <knob min='0' max=\"20\" label=\"Frequency\"  val.two-way=\"osc.freq\" offset='222' preset.one-time=\"preset.freq\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s4 m4\">\r\n           <knob min=\"0\" max=\"3\" label=\"Wave\" labels='sine, saw, sqr, tri' preset.one-time=\"preset.wave\" val.two-way=\"osc.wave\" offset='276' range=\"180\"></knob>\r\n         </div>\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s4 m4\">\r\n           <knob min='0' max=\"100\" label=\"Osc1\"  val.two-way=\"osc.osc1\" offset='222' preset.one-time=\"preset.osc1\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s4 m4\" >\r\n            <knob min='0' max=\"100\" label=\"Osc2\" val.two-way=\"osc.osc2\" offset='222' preset.one-time=\"preset.osc2\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s4 m4\" >\r\n            <knob min='0' max=\"100\" label=\"Osc2\" val.two-way=\"osc.osc2\" offset='222' preset.one-time=\"preset.osc3\"></knob>\r\n         </div>\r\n       </div>\r\n     </template>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/components/piano-key.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"col s1 key ${key.color===true?'white':'black-key'} \" tabindex=\"0\" mousedown.trigger=\"play()\" mouseup.delegate=\"stop()\" touchstart.trigger=\"play()\" touchend.delegate=\"stop()\">\r\n    <div class=\"${playing?'play z-depth-1':'z-depth-2'} waves-effect waves-blue\"  >\r\n      <h1>${key.key}</h1>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map