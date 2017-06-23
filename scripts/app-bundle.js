define('about',['exports', 'chartjs'], function (exports, _chartjs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.About = undefined;

  var _chartjs2 = _interopRequireDefault(_chartjs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function () {
    function About() {
      _classCallCheck(this, About);

      this.labels = ['Javascript', 'HTML', 'CSS', 'Aurelia', 'Angular', 'React', 'Node', 'Express', 'PHP'];

      this.values = [95, 90, 90, 100, 80, 60, 85, 80, 70];
      this.skills = [{
        name: 'Javascript',
        skills: [{
          name: 'Javascript',
          value: 95,
          description: 'An expert on vanilla JavaScript, ES6, AJAX, jQuery, gulp, and grunt. Currently having fun playing around with the Web Audio API and Web GL. I love to explore using JavaScript in other places besides the web, such as React Native and Raspberry Pis. Ever flown a drone running on NodeJS?'
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
        }]
      }, {
        name: 'Html/CSS',
        skills: [{
          name: 'HTML',
          value: 90,
          description: 'Its HTML, what else can you say?'
        }, {
          name: 'CSS',
          value: 90,
          description: '5 years of designing responsive web apps using bootstrap as well as CSS preprocessors such as Sass.'
        }, {
          name: 'Bootstrap',
          value: 90,
          description: 'The OG CSS framework'
        }, {
          name: 'Materialize-css',
          value: 80,
          description: 'I loved Materialize-css until I discovered Material-design-lite'
        }, {
          name: 'Material-design-lite',
          value: 70,
          description: 'Im new to this framework, but so far it\'s my favorite over bootstrap and the others. This site is using Material-design-lite'
        }]
      }, {
        name: 'Backend',
        skills: [{
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
        }]
      }];
      this.activeSkill = this.skills[0];

      this.skillIndex = 0;
      this.colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 159, 64, 1)'];
    }

    About.prototype.attached = function attached() {

      var ctx = document.getElementById("skills-container");
      ctx.width = 200;
      ctx.height = 200;
      var datasets = [];
      for (var i = 0; i < this.activeSkill.skills.length; i++) {
        datasets.push({
          label: this.activeSkill.skills[i].name,
          data: [this.activeSkill.skills[i].value],
          backgroundColor: this.colors[i]
        });
      }
      _chartjs2.default.defaults.global.defaultFontColor = '#fff';
      _chartjs2.default.defaults.global.defaultFontFamily = 'roboto';
      _chartjs2.default.defaults.global.defaultFontSize = 18;
      this.chart = new _chartjs2.default(ctx, {
        type: 'bar',
        data: {
          labels: ['Skills'],
          datasets: datasets
        },
        options: {
          borderColor: '#fff',
          scaleFontColor: '#fff',
          legend: {
            strokeStyle: '#fff',
            display: true,
            labels: {
              fontColor: 'rgb(255,255,255)'
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              gridlines: {
                color: '#fff',
                display: false
              }
            }],
            yAxes: [{
              gridlines: {
                color: '#fff',
                display: false
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                fontColor: '#fff',
                color: '#fff'
              }
            }]
          }
        }
      });
      console.log(this.chart);
    };

    About.prototype.changeSkill = function changeSkill(skill, index) {
      this.activeSkill = skill;
      this.skillIndex = index;
      var ctx = document.getElementById("skills-container").getContext('2d');
      var datasets = [];
      var arr = skill.skills;
      for (var i = 0; i < arr.length; i++) {
        datasets.push({
          label: arr[i].name,
          data: [arr[i].value],
          backgroundColor: this.colors[i]
        });
      }
      this.chart.data.datasets = datasets;
      this.chart.update();
    };

    return About;
  }();
});
define('app-router',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var AppRouter = exports.AppRouter = function () {
    function AppRouter() {
      _classCallCheck(this, AppRouter);

      this.router;
      this.showcaseRouter;
      this.beatmakerRouter;
      this.beatmakerSet = false;
    }

    AppRouter.prototype.setRouter = function setRouter(r) {
      this.router = r;
    };

    AppRouter.prototype.setShowcase = function setShowcase(r) {
      this.showcaseRouter = r;
    };

    AppRouter.prototype.setBeat = function setBeat(r) {
      this.beatmakerRouter = r;
      this.beatmakerSet = true;
    };

    _createClass(AppRouter, [{
      key: "navigation",
      get: function get() {
        return this.router.navigation;
      }
    }, {
      key: "showcase",
      get: function get() {
        return this.showcaseRouter.navigation;
      }
    }, {
      key: "beatMaker",
      get: function get() {
        return this.beatmakerRouter.navigation;
      }
    }]);

    return AppRouter;
  }();
});
define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './app-router'], function (exports, _aureliaFramework, _aureliaEventAggregator, _appRouter) {
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

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _appRouter.AppRouter), _dec(_class = function () {
    function App(ea, appRouter) {
      _classCallCheck(this, App);

      this.ea = ea;
      this.appRouter = appRouter;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      console.log('1');
      config.title = "Justin Stoner";
      config.map([{ route: ['', 'about'], name: 'about', moduleId: 'about', href: '#/about', nav: true, title: 'About', settings: { icon: 'person' } }, { route: 'showcase', name: 'showcase', moduleId: 'showcase', nav: true, title: 'Showcase', settings: { icon: 'whatshot' } }]);
      this.appRouter.setRouter(router);
      console.log(this.appRouter);
    };

    App.prototype.attached = function attached() {
      var _this = this;

      window.addEventListener('resize', function () {
        _this.ea.publish('resize');
      });
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

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-mdl-plugin', function (mdl) {
      mdl.addClasses('mdl-js-selectfield');
    });

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
define('navigation',['exports', 'aurelia-framework', './app-router', './services/drum-service'], function (exports, _aureliaFramework, _appRouter, _drumService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Navigation = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Navigation = exports.Navigation = (_dec = (0, _aureliaFramework.inject)(_appRouter.AppRouter, _drumService.DrumService), _dec(_class = function Navigation(appRouter, ds) {
    _classCallCheck(this, Navigation);

    this.appRouter = appRouter;
  }) || _class);
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

      this.message = 'Hello world';
    }

    Showcase.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'beatmaker'], name: 'beatmaker', moduleId: './showcases/beatmaker/beat-maker', href: '#/showcase/beatmaker', nav: true, title: 'BeatMaker' }]);
      this.router = router;
    };

    return Showcase;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/audio-bus',['exports', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _aureliaFramework) {
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
      this.compressor = this.createCompressor();
      this.connect();
      this.compressionOn = true;
      this.delayOn = true;
      this.eqOn = true;
      this.drumsIn.connect(this.input);
      this.input.connect(this.output);
      this.synthOut.connect(this.output);
      this.output.connect(this.analyser);

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
        _this.compressionOn = !_this.compressionOn;
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
      var compressor = this.audio.createDynamicsCompressor();
      compressor.threshold.value = -55;
      compressor.knee.value = 28;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.1;
      compressor.release.value = 0.1;
      return compressor;
    };

    return AudioBus;
  }()) || _class);
});
define('services/comp-service',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompService = exports.CompService = function CompService() {
    _classCallCheck(this, CompService);

    this.synth = {
      attack: 1,
      release: 1,
      threshold: 40,
      knee: 20,
      ratio: 10,
      active: true
    };
    this.sidechain = {
      attack: 0.1,
      release: 0.1,
      threshold: 55,
      knee: 20,
      ratio: 10,
      active: true
    };
    this.drums = {
      attack: 0.1,
      release: 0.1,
      threshold: 55,
      knee: 28,
      ratio: 4,
      active: true
    };
  };
});
define('services/delay-service',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DelayService = exports.DelayService = function DelayService() {
    _classCallCheck(this, DelayService);

    this.synth = {
      dTime: 75,
      dFeed: 50,
      dWet: 50,
      active: true
    };
  };
});
define('services/drum-service',['exports', 'aurelia-framework', '../showcases/beatmaker/components/audio-bus', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _audioBus, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrumService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DrumService = exports.DrumService = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DrumService(ab, http) {
      _classCallCheck(this, DrumService);

      this.ab = ab;
      http.configure(function (config) {
        config.useStandardConfiguration().withDefaults({
          headers: {
            "Content-Type": "audio/mpeg"
          }
        });
      });
      this.http = http;
      this.drums = [];
      this.scheduled = new Array(14);
      this.loopLength = 16;
      this.tempo = 120;
      this.volume = 85;
      this.timeoutId;
      this.notePlaying = -1;
      this.playing = false;
      this.hasPlayed = false;
      this.loaded = false;
      this.samples = [{ name: 'kick', sample: 'Roland_TR-33_Kick', type: 'kick' }, { name: 'snare', sample: 'Roland_TR-33_Snare', type: 'snare' }, { name: 'hh open', sample: 'Roland_TR-33_HH Op', type: 'hh' }, { name: 'hh close', sample: 'Roland_TR-33_HH Cl', type: 'hh' }, { name: 'tom hi', sample: 'Roland_TR-33_Tom Hi', type: 'tom' }, { name: 'tom med', sample: 'Roland_TR-33_Tom Mi', type: 'tom' }, { name: 'tom low', sample: 'Roland_TR-33_Tom Lo', type: 'tom' }, { name: 'bongo hi', sample: 'Roland_TR-33_Bongo Hi', type: 'tom' }, { name: 'bongo med', sample: 'Roland_TR-33_Bongo Mi', type: 'tom' }, { name: 'bongo low', sample: 'Roland_TR-33_Bongo Lo', type: 'tom' }, { name: 'conga hi', sample: 'Roland_TR-33_Conga Hi', type: 'tom' }, { name: 'conga med', sample: 'Roland_TR-33_Conga Mi', type: 'tom' }, { name: 'conga low', sample: 'Roland_TR-33_Conga Lo', type: 'tom' }, { name: 'clave', sample: 'Roland_TR-33_Clave', type: 'tom' }];

      this.eqFreqs = {
        kick: [50, 450, 3000, 150],
        kickRange: {
          low: [50, 100],
          mid: [300, 600],
          high: [2000, 4000],
          lowmid: [150, 250]
        },
        snare: [150, 500, 3000],
        snareRange: {
          low: [50, 200],
          mid: [300, 600],
          high: [2000, 4000]
        },
        hh: [200, 500, 5000],
        hhRange: {
          low: [100, 300],
          mid: [300, 900],
          high: [4000, 7000]
        },
        tom: [250, 600, 5000],
        tomRange: {
          low: [80, 250],
          mid: [300, 900],
          high: [5000, 7000]
        }
      };
    }

    DrumService.prototype.loadInit = function loadInit() {
      var _this = this;

      if (!this.loaded) {
        for (var i = 0; i < this.samples.length; i++) {
          var obj = {
            name: this.samples[i].name,
            sound: this.loadSample(this.samples[i].sample, i),
            type: this.samples[i].type,
            scheduled: [],
            volume: 50,
            pitch: 0,
            high: 40,
            highFreq: this.eqFreqs[this.samples[i].type][2],
            mid: 40,
            midFreq: this.eqFreqs[this.samples[i].type][1],
            low: 40,
            lowFreq: this.eqFreqs[this.samples[i].type][0],
            range: this.eqFreqs[this.samples[i].type + 'Range'],
            Q: 10,
            cutoff: 200,
            filterType: 'lowpass',
            eq120: this.ab.audio.createBiquadFilter(),
            eq600: this.ab.audio.createBiquadFilter(),
            eq5k: this.ab.audio.createBiquadFilter(),
            filter1: this.ab.audio.createBiquadFilter(),
            filter2: this.ab.audio.createBiquadFilter()
          };
          if (obj.type === 'kick') {
            obj.lowmid = this.eqFreqs[this.samples[i].type][3];
          }
          this.drums.push(obj);
        }
        this.gain = this.ab.audio.createGain();
        this.sideChainGain = this.ab.audio.createGain();
        this.gain.value = 1.0;

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
        this.scriptNode = this.ab.audio.createScriptProcessor(4096, 1, 1);
        this.scriptNode.onaudioprocess = function (e) {
          _this.ab.synthOut.gain.value = Math.pow(10, _this.ab.compressor.reduction / 20);
        };
        this.loaded = true;
      }
    };

    DrumService.prototype.loadSample = function loadSample(type, i) {
      var _this2 = this;

      this.http.fetch("audio/roland-tr-33/" + type + ".wav").then(function (res) {
        return res.arrayBuffer();
      }).then(function (res) {
        _this2.ab.audio.decodeAudioData(res, function (buffer) {
          _this2.drums[i].sound = buffer;
        });
      });
    };

    DrumService.prototype.playSound = function playSound(buffer, time, name, i) {
      var _this3 = this;

      var src = this.ab.audio.createBufferSource();
      src.buffer = buffer;

      this.drums[i].eq120.frequency.value = this.drums[i].lowFreq;
      this.drums[i].eq120.type = "lowshelf";
      this.drums[i].eq120.gain.value = this.drums[i].low - 40;

      this.drums[i].eq600.frequency.value = this.drums[i].midFreq;
      this.drums[i].eq600.type = "peaking";
      this.drums[i].eq600.gain.value = this.drums[i].mid - 40;

      this.drums[i].eq5k.frequency.value = this.drums[i].highFreq;
      this.drums[i].eq5k.type = "highshelf";
      this.drums[i].eq5k.gain.value = this.drums[i].high - 40;

      this.drums[i].filter1.type = this.drums[i].filterType;
      this.drums[i].filter1.Q.value = this.drums[i].Q;
      this.drums[i].filter1.frequency.value = this.drums[i].cutoff * 100;

      this.drums[i].filter2.type = this.drums[i].filterType;
      this.drums[i].filter2.Q.value = this.drums[i].Q;
      this.drums[i].filter2.frequency.value = this.drums[i].cutoff * 100;

      src.connect(this.drums[i].eq120);
      this.drums[i].eq120.connect(this.drums[i].eq600);
      this.drums[i].eq600.connect(this.drums[i].eq5k);
      this.drums[i].eq5k.connect(this.drums[i].filter1);
      this.drums[i].filter1.connect(this.drums[i].filter2);

      if (name === 'kick' && this.ab.compressionOn) {
        this.scriptNode.disconnect();
        this.drums[i].filter2.connect(this.sideChainGain);
        this.scriptNode = this.ab.audio.createScriptProcessor(4096, 1, 1);
        this.scriptNode.onaudioprocess = function (e) {
          _this3.ab.synthOut.gain.value = Math.pow(10, _this3.ab.compressor.reduction / 20);
        };
        this.sideChainGain.connect(this.ab.compressor);
        this.scriptNode.connect(this.ab.compressor);
        this.sideChainGain.connect(this.ab.drumsIn);
      } else if (name === 'kick' && !this.ab.compressionOn) {
        this.scriptNode.disconnect();
        this.drums[i].filter2.connect(this.gain);
        this.gain.connect(this.ab.drumsIn);
      }
      if (name !== 'kick') {
        this.drums[i].filter2.connect(this.gain);
        this.gain.connect(this.ab.drumsIn);
      }
      this.gain.gain.value = this.volume / 50;
      this.sideChainGain.gain.value = this.volume / 50;
      src.start(time);
    };

    DrumService.prototype.playSample = function playSample(buffer) {
      var src = this.ab.audio.createBufferSource();
      src.buffer = buffer;
      src.connect(this.gain);
      this.gain.connect(this.ab.drumsIn);
      this.gain.gain.value = this.volume / 50;
      src.start(0);
    };

    DrumService.prototype.changeTempo = function changeTempo(up) {
      if (up) {
        this.tempo = this.tempo += 4;
      } else {
        if (this.tempo > 4) {
          this.tempo -= 4;
        }
      }
    };

    DrumService.prototype.handlePlay = function handlePlay() {
      if (!this.playing) {
        this.noteTime = 0.0;
        this.startTime = this.ab.audio.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.notePlaying = 0;
        this.hasPlayed = true;
        this.schedule();
        this.playing = true;
      } else {
        this.playing = false;
        cancelAnimationFrame(this.timeoutId);
        this.notePlaying = -1;
      }
    };

    DrumService.prototype.addNote = function addNote(e, i, ii) {
      console.log(i);
      if (this.scheduled[i][ii] == true) {
        this.scheduled[i][ii] = false;
        e.srcElement.classList.remove('mdl-color--blue-500');
        e.srcElement.classList.add('mdl-color--green-A400');
      } else {
        this.scheduled[i][ii] = true;
        e.srcElement.classList.remove('mdl-color--green-A400');
        e.srcElement.classList.add('mdl-color--blue-500');
      }
    };

    DrumService.prototype.clearNote = function clearNote(i, ii) {};

    DrumService.prototype.handleStop = function handleStop() {};

    DrumService.prototype.schedule = function schedule() {
      var currentTime = this.ab.audio.currentTime;

      currentTime -= this.startTime;
      while (this.noteTime < currentTime + 0.200) {
        for (var i = 0; i < this.scheduled.length; i++) {
          if (this.scheduled[i][this.rhythmIndex] === true) {
            this.playSound(this.drums[i].sound, this.noteTime + this.startTime, this.drums[i].name, i);
          }
        }
        this.advanceNote();
      }
      this.timeoutId = requestAnimationFrame(this.schedule.bind(this));
    };

    DrumService.prototype.advanceNote = function advanceNote() {
      this.rhythmIndex++;
      if (this.rhythmIndex == this.loopLength) {
        this.rhythmIndex = 0;
        this.notePlaying++;
      } else {
        this.notePlaying = this.rhythmIndex;
      }

      this.noteTime += 0.25 * (60.0 / this.tempo);
    };

    return DrumService;
  }()) || _class);
});
define('services/eq-service',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var EqService = exports.EqService = function EqService() {
    _classCallCheck(this, EqService);

    this.synth = {
      eq1: 40,
      eq2: 44,
      eq3: 35,
      eq4: 35,
      eq5: 30,
      eq6: 40,
      active: true
    };
  };
});
define('services/midi',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Midi = exports.Midi = function () {
    function Midi() {
      _classCallCheck(this, Midi);

      this.selectMidi = null;
      this.midiAcccess = null;
      this.midiIn = null;
    }

    Midi.prototype.midiMessageReceived = function midiMessageReceived(ev) {
      var cmd = ev.data[0] >> 4;
      var channel = ev.data[0] & 0xf;
      var noteNumber = ev.data[1];
      var velocity = ev.data[2];

      if (channel == 9) return;
      if (cmd == 8 || cmd == 9 && velocity == 0) {
        noteOff(noteNumber);
      } else if (cmd == 9) {
        noteOn(noteNumber, velocity / 127.0);
      } else if (cmd == 11) {
        controller(noteNumber, velocity / 127.0);
      } else if (cmd == 14) {
        pitchWheel((velocity * 128.0 + noteNumber - 8192) / 8192.0);
      } else if (cmd == 10) {
        polyPressure(noteNumber, velocity / 127);
      } else console.log("" + ev.data[0] + " " + ev.data[1] + " " + ev.data[2]);
    };

    Midi.prototype.selectMIDIIn = function selectMIDIIn(ev) {
      if (this.midiIn) this.midiIn.onmidimessage = null;
      var id = ev.target[ev.target.selectedIndex].value;
      if (typeof this.midiAccess.inputs == "function") this.midiIn = this.midiAccess.inputs()[ev.target.selectedIndex];else this.midiIn = this.midiAccess.inputs.get(id);
      if (this.midiIn) this.midiIn.onmidimessage = midiMessageReceived;
    };

    Midi.prototype.populateMIDIInSelect = function populateMIDIInSelect() {
      this.selectMidi.options.length = 0;
      if (this.midiIn && this.midiIn.state == "disconnected") this.midiIn = null;
      var firstInput = null;

      var inputs = this.midiAccess.inputs.values();
      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input = input.value;
        if (!firstInput) firstInput = input;
        var str = input.name.toString();
        var preferred = !this.midiIn && (str.indexOf("MPK") != -1 || str.indexOf("Keyboard") != -1 || str.indexOf("keyboard") != -1 || str.indexOf("KEYBOARD") != -1);

        if (this.midiIn && this.midiIn == input) preferred = true;

        this.selectMidi.appendChild(new Option(input.name, input.id, preferred, preferred));
        if (preferred) {
          this.midiIn = input;
          this.midiIn.onmidimessage = midiMessageReceived;
        }
      }
      if (!this.midiIn) {
        this.midiIn = firstInput;
        if (this.midiIn) this.midiIn.onmidimessage = midiMessageReceived;
      }
    };

    Midi.prototype.midiConnectionStateChange = function midiConnectionStateChange(e) {
      console.log("connection: " + e.port.name + " " + e.port.connection + " " + e.port.state);
      populateMIDIInSelect();
    };

    Midi.prototype.onMIDIStarted = function onMIDIStarted(midi) {
      var preferredIndex = 0;

      this.midiAccess = midi;

      document.getElementById("synthbox").className = "loaded";
      this.selectMidi = document.getElementById("this.midiIn");
      midi.onstatechange = midiConnectionStateChange;
      populateMIDIInSelect();
      this.selectMidi.onchange = this.selectMIDIIn;
    };

    Midi.prototype.onMIDISystemError = function onMIDISystemError(err) {
      document.getElementById("synthbox").className = "error";
      console.log("MIDI not initialized - error encountered:" + err.code);
    };

    Midi.prototype.onAttach = function onAttach() {};

    return Midi;
  }();
});
define('services/synth-service',['exports', 'aurelia-framework', '../showcases/beatmaker/components/audio-bus', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _audioBus, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SynthService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SynthService = exports.SynthService = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function SynthService(ab, ea) {
      _classCallCheck(this, SynthService);

      this.ab = ab;
      this.ea = ea;
      this.octaves = [-3, -2, -1, 0, 1, 2, 3];
      this.waves = ['sine', 'sawtooth', 'square', 'triangle'];
      this.A4 = 440;
      this.synthOctave = 0;
      this.lfoData = {
        wave: 0,
        detune: 50,
        osc1: 4,
        osc2: 8,
        osc3: 12,
        freq: 4,
        type: 'Lfo',
        modType: 0
      };
      this.oscPresets = [{
        wave: 0,
        detune: 45,
        octave: 2,
        volume: 100
      }, {
        wave: 2,
        detune: 50,
        octave: 3,
        volume: 100
      }, {
        wave: 1,
        detune: 55,
        octave: 5,
        volume: 100
      }];
      this.oscillators = this.createVoices();
      this.masterVol = 85;
      this.modMult = 10;
      this.master = this.ab.audio.createGain();
      this.master.gain.value = this.masterVol / 50;
      this.master.connect(this.ab.synthIn);
      this.effectsIn = this.ab.audio.createGain();
      this.effectsIn.gain.value = 1;
      this.effectsOut = this.ab.audio.createGain();
      this.effectsOut.gain.value = 1;
      this.createEq();
      this.createDelay();
      this.compressor = this.ab.createCompressor();
      this.connect();
      this.compressionOn = true;
      this.delayOn = true;
      this.eqOn = true;
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

      this.notes = [{ note: 'c', hz: 60, color: true, key: 'a', isPlaying: false }, { note: 'c#', hz: 61, color: false, key: 'w', isPlaying: false }, { note: 'd', hz: 62, color: true, key: 's', isPlaying: false }, { note: 'd#', hz: 63, color: false, key: 'e', isPlaying: false }, { note: 'e', hz: 64, color: true, key: 'd', isPlaying: false }, { note: 'f', hz: 65, color: true, key: 'f', isPlaying: false }, { note: 'f#', hz: 66, color: false, key: 't', isPlaying: false }, { note: 'g', hz: 67, color: true, key: 'g', isPlaying: false }, { note: 'g#', hz: 68, color: false, key: 'y', isPlaying: false }, { note: 'a', hz: 69, color: true, key: 'h', isPlaying: false }, { note: 'a#', hz: 70, color: false, key: 'u', isPlaying: false }, { note: 'b', hz: 71, color: true, key: 'j', isPlaying: false }, { note: 'c', hz: 72, color: true, key: 'k', isPlaying: false }, { note: 'c#', hz: 73, color: false, key: 'o', isPlaying: false }, { note: 'd', hz: 74, color: true, key: 'l', isPlaying: false }, { note: 'd#', hz: 75, color: false, key: 'p', isPlaying: false }, { note: 'e', hz: 76, color: true, key: ';', isPlaying: false }, { note: 'f', hz: 77, color: true, key: "'", isPlaying: false }];


      window.addEventListener('keydown', this.play.bind(this));
      window.addEventListener('keyup', this.stop.bind(this));

      this.createSubs();
    }

    SynthService.prototype.changeSynthOctave = function changeSynthOctave(dir) {
      if (dir === 'up') {
        this.synthOctave++;
      } else {
        this.synthOctave--;
      }
      for (var i = 0; i < this.notes.length; i++) {
        try {
          this.notes[i].o0.frequency.value = this.frequency(this.notes[i].hz, this.oscillators[0].octave - 3);
          this.notes[i].o1.frequency.value = this.frequency(this.notes[i].hz, this.oscillators[1].octave - 3);
          this.notes[i].o2.frequency.value = this.frequency(this.notes[i].hz, this.oscillators[2].octave - 3);
        } catch (e) {}
      }
    };

    SynthService.prototype.frequency = function frequency(note, octave) {
      var freq;
      if (this.synthOctave != 0) {
        note = note + this.synthOctave * 12;
      }
      if (octave === 0) {
        freq = this.A4 * Math.pow(2, (note - 69) / 12);
      } else {
        note = note + octave * 12;
        freq = this.A4 * Math.pow(2, (note - 69) / 12);
      }
      return freq;
    };

    SynthService.prototype.play = function play(e) {
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

    SynthService.prototype.stop = function stop(e) {
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

    SynthService.prototype.playKey = function playKey(i) {

      if (this.notes[i].isPlaying === false) {
        this.notes[i].lfo = this.ab.audio.createOscillator();
        this.notes[i].lfo.type = this.waves[this.lfoData.wave | 0];
        this.notes[i].lfo.frequency.value = this.lfoData.freq;
        this.notes[i].lfo.detune.value = this.lfoData.detune;

        this.notes[i]['f1'] = this.ab.audio.createBiquadFilter();
        this.notes[i]['f1'].type = "lowpass";
        this.notes[i]['f1'].Q.value = this.lpfQ;
        this.notes[i]['f1'].frequency.value = this.lpfCutoff * 100;
        this.notes[i]['f2'] = this.ab.audio.createBiquadFilter();
        this.notes[i]['f2'].type = "lowpass";
        this.notes[i]['f2'].Q.value = this.lpfQ;
        this.notes[i]['f2'].frequency.value = this.lpfCutoff * 100;

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['lfoOscGain' + ii] = this.ab.audio.createGain();
          this.notes[i]['lfoOscGain' + ii].gain.value = this.lfoData['osc' + (ii + 1)] / 100;
          this.notes[i].lfo.connect(this.notes[i]['lfoOscGain' + ii]);

          this.notes[i]['o' + ii] = this.ab.audio.createOscillator();
          this.notes[i]['o' + ii].detune.value = this.oscillators[ii].detune - 50;
          this.notes[i]['o' + ii].frequency.value = this.frequency(this.notes[i].hz, this.oscillators[ii].octave - 3);

          this.notes[i]['o' + ii].type = this.waves[this.oscillators[ii].wave | 0];

          this.notes[i]['lfoOscGain' + ii].connect(this.notes[i]['o' + ii].frequency);

          this.notes[i]['g' + ii] = this.ab.audio.createGain();
          this.notes[i]['g' + ii].gain.value = 0.0005 * this.oscillators[ii].volume;

          this.notes[i]['o' + ii].connect(this.notes[i]['g' + ii]);

          this.notes[i]['g' + ii].connect(this.notes[i]['f1']);
        }

        this.notes[i].modfilterGain = this.ab.audio.createGain();
        this.notes[i].modfilterGain.gain.value = this.lpfMod * 24;
        this.notes[i].modfilterGain.connect(this.notes[i]['f1'].detune);
        this.notes[i].modfilterGain.connect(this.notes[i]['f2'].detune);
        this.notes[i].lfo.connect(this.notes[i].modfilterGain);

        this.notes[i]['f1'].connect(this.notes[i]['f2']);
        this.notes[i]['e'] = this.ab.audio.createGain();
        this.notes[i]['f2'].connect(this.notes[i]['e']);
        this.notes[i]['e'].connect(this.effectsIn);
        var now = this.ab.audio.currentTime;
        var atkEnd = now + this.envA / 100.0;
        this.notes[i]['e'].gain.value = 0.0;
        this.notes[i]['e'].gain.setValueAtTime(0.0, now);
        this.notes[i]['e'].gain.linearRampToValueAtTime(1.0, atkEnd);
        this.notes[i]['e'].gain.setTargetAtTime(this.envS / 100.0, atkEnd, this.envD / 100.0 + 0.001);

        var filterAttackLevel = this.lpfEnv * 72;
        var filterSustainLevel = filterAttackLevel * this.lpfS / 100.0;
        var filterAttackEnd = this.lpfA / 100.0;

        if (!filterAttackEnd) {
          filterAttackEnd = 0.05;
        }

        this.notes[i]['f1'].detune.setValueAtTime(0, now);
        this.notes[i]['f1'].detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
        this.notes[i]['f2'].detune.setValueAtTime(0, now);
        this.notes[i]['f2'].detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
        this.notes[i]['f1'].detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 100.0 + 0.001);
        this.notes[i]['f2'].detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 100.0 + 0.001);

        this.notes[i].lfo.start(0);
        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['o' + ii].start(0);
        }

        this.notes[i].isPlaying = true;
      }
    };

    SynthService.prototype.stopKey = function stopKey(i) {
      if (this.notes[i].isPlaying === true) {
        var now = this.ab.audio.currentTime;
        var release = now + this.envR / 100.0;
        this.notes[i]['e'].gain.cancelScheduledValues(now);
        this.notes[i]['e'].gain.setValueAtTime(this.notes[i]['e'].gain.value, now);
        this.notes[i]['e'].gain.setTargetAtTime(0.0, now, this.envR / 100.0 + 0.001);
        this.notes[i]['f1'].detune.cancelScheduledValues(now);
        this.notes[i]['f1'].detune.setTargetAtTime(0, now, this.lpfR / 100.0 + 0.001);
        this.notes[i]['f2'].detune.cancelScheduledValues(now);
        this.notes[i]['f2'].detune.setTargetAtTime(0, now, this.lpfR / 100.0 + 0.001);

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['g' + ii].gain.cancelScheduledValues(now);
          this.notes[i]['g' + ii].gain.setTargetAtTime(0, now, this.envR / 100.0 + 0.001);
          this.notes[i]['o' + ii].stop(now + this.envR / 30.0);
        }
        this.notes[i].lfo.stop(now + this.envR / 30.0);
        this.notes[i].isPlaying = false;
      }
    };

    SynthService.prototype.createEq = function createEq() {
      this.eq80 = this.ab.audio.createBiquadFilter();
      this.eq350 = this.ab.audio.createBiquadFilter();
      this.eq720 = this.ab.audio.createBiquadFilter();
      this.eq16k = this.ab.audio.createBiquadFilter();
      this.eq5k = this.ab.audio.createBiquadFilter();
      this.eq10k = this.ab.audio.createBiquadFilter();
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

    SynthService.prototype.createDelay = function createDelay() {
      this.dInput = this.ab.audio.createGain();
      this.dOutput = this.ab.audio.createGain();
      this.delay = this.ab.audio.createDelay(5.0);
      this.feedback = this.ab.audio.createGain();
      this.wetLevel = this.ab.audio.createGain();
      this.delay.delayTime.value = 0.50;
      this.feedback.gain.value = 0.15;
      this.wetLevel.gain.value = 0.25;
    };

    SynthService.prototype.connect = function connect() {
      this.effectsIn.connect(this.eq80);
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
      this.dOutput.connect(this.compressor);
      this.compressor.connect(this.effectsOut);
      this.effectsOut.connect(this.master);
    };

    SynthService.prototype.createVoices = function createVoices() {
      var arr = [];
      var voice;
      for (var i = 0; i < 3; i++) {
        voice = {
          volume: 50,
          wave: 1,
          octave: this.oscPresets[i].octave,
          type: 'Oscillator',
          detune: this.oscPresets[i].detune
        };
        arr.push(voice);
      }
      return arr;
    };

    SynthService.prototype.createSubs = function createSubs() {
      var _this = this;

      this.ea.subscribe('play-key', function (msg) {
        console.log(msg);
        _this.playKey(msg.index);
      });

      this.ea.subscribe('stop-key', function (msg) {
        _this.stopKey(msg.index);
      });
      this.ea.subscribe('lpfCutoff', function (msg) {
        _this.lpfCutoff = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i]['f1'].frequency.value = msg * 100;
            _this.notes[i]['f2'].frequency.value = msg * 100;
          } catch (e) {}
        }
      });
      this.ea.subscribe('lpfQ', function (msg) {
        _this.lpfQ = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          _this.notes[i]['f1'].Q.value = msg;
          _this.notes[i]['f2'].Q.value = msg;
        }
      });
      this.ea.subscribe('lpfMod', function (msg) {
        _this.lpfMod = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          _this.notes[i].modfilterGain.gain.value = msg * 24;
        }
      });

      this.ea.subscribe('synthvol', function (msg) {
        _this.master.gain.value = msg / 50;
      });
      this.ea.subscribe('lfofreq', function (msg) {
        _this.lfoData.freq = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].lfo.frequency.value = msg;
          } catch (e) {}
        }
      });
      this.ea.subscribe('lfowave', function (msg) {
        _this.lfoData.wave = msg | 0;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].lfo.type = _this.waves[_this.lfoData.wave];
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-vol1', function (msg) {
        _this.oscillators[0].volume = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].g0.gain.value = 0.0005 * msg;
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-wave1', function (msg) {
        _this.oscillators[0].wave = msg | 0;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i]['o0'].type = _this.waves[msg | 0];
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-oct1', function (msg) {
        _this.oscillators[0].octave = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o0.frequency.value = _this.frequency(_this.notes[i].hz, _this.oscillators[0].octave - 3);
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-det1', function (msg) {
        _this.oscillators[0].detune = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o0.detune.value = msg - 50;
          } catch (e) {}
        }
      });

      this.ea.subscribe('osc-vol2', function (msg) {
        _this.oscillators[1].volume = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].g1.gain.value = 0.0005 * msg;
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-wave2', function (msg) {
        _this.oscillators[1].wave = msg | 0;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o1.type = _this.waves[msg | 0];
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-oct2', function (msg) {
        _this.oscillators[1].octave = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o1.frequency.value = _this.frequency(_this.notes[i].hz, _this.oscillators[1].octave - 3);
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-det2', function (msg) {
        _this.oscillators[1].detune = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o1.detune.value = msg - 50;
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-vol3', function (msg) {
        _this.oscillators[2].volume = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].g2.gain.value = 0.0005 * msg;
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-wave3', function (msg) {
        _this.oscillators[2].wave = msg | 0;
        console.log(msg);
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o2.type = _this.waves[msg | 0];
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-oct3', function (msg) {
        _this.oscillators[2].octave = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o2.frequency.value = _this.frequency(_this.notes[i].hz, _this.oscillators[2].octave - 3);
          } catch (e) {}
        }
      });
      this.ea.subscribe('osc-det3', function (msg) {
        _this.oscillators[2].detune = msg;
        for (var i = 0; i < _this.notes.length; i++) {
          try {
            _this.notes[i].o2.detune.value = msg - 50;
          } catch (e) {}
        }
      });
      this.ea.subscribe('compAttack:synth', function (msg) {
        _this.compressor.attack.value = msg / 100;
      });
      this.ea.subscribe('compRelease:synth', function (msg) {
        _this.compressor.release.value = msg / 100;
      });
      this.ea.subscribe('compThresh:synth', function (msg) {
        _this.compressor.threshold.value = msg - 100;
      });
      this.ea.subscribe('compKnee:synth', function (msg) {
        _this.compressor.knee.value = msg;
      });
      this.ea.subscribe('compRatio:synth', function (msg) {
        _this.compressor.ratio.value = msg;
      });
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
      this.ea.subscribe('toggleCompressor:synth', function (msg) {
        _this.compressionOn = !_this.compressionOn;
        if (_this.compressionOn) {
          if (_this.delayOn) {
            _this.dOutput.disconnect();
            _this.dOutput.connect(_this.compressor);
          } else if (_this.eqOn) {
            _this.eq10k.disconnect();
            _this.eq10k.connect(_this.compressor);
          } else {
            _this.effectsIn.disconnect();
            _this.effectsIn.connect(_this.compressor);
          }
          _this.compressor.connect(_this.effectsOut);
        } else {
          _this.compressor.disconnect();
          if (_this.delayOn) {
            _this.dOutput.disconnect();
            _this.dOutput.connect(_this.effectsOut);
          } else if (_this.eqOn) {
            _this.eq10k.disconnect();
            _this.eq10k.connect(_this.effectsOut);
          } else {
            _this.effectsIn.disconnect();
            _this.effectsIn.connect(_this.effectsOut);
          }
        }
      });

      this.ea.subscribe('toggleDelay', function (msg) {
        _this.delayOn = !_this.delayOn;
        console.log(_this.delayOn);
        if (_this.delayOn) {
          if (_this.eqOn) {
            _this.eq10k.disconnect();
            _this.eq10k.connect(_this.dInput);
            if (_this.compressionOn) {
              _this.dOutput.connect(_this.compressor);
            } else {
              _this.dOutput.connect(_this.effectsOut);
            }
          } else if (_this.compressionOn) {
            _this.effectsIn.connect(_this.dInput);
            _this.dOutput.connect(_this.compressor);
          } else {
            _this.effectsIn.connect(_this.dInput);
            _this.dOutput.connect(_this.effectsOut);
          }
        } else {
          _this.dOutput.disconnect();
          if (_this.eqOn) {
            _this.eq10k.disconnect();
            if (_this.compressionOn) {
              _this.eq10k.connect(_this.compressor);
            } else {
              _this.eq10k.connect(_this.effectsOut);
            }
          } else if (_this.compressionOn) {
            _this.effectsIn.connect(_this.compressor);
          } else {
            _this.effectsIn.connect(_this.effectsOut);
          }
        }
      });
      this.ea.subscribe('toggleEQ', function (msg) {
        _this.eqOn = !_this.eqOn;
        console.log(_this.eqOn);
        if (_this.eqOn) {
          _this.effectsIn.disconnect();
          _this.effectsIn.connect(_this.eq80);
          if (_this.delayOn) {
            _this.eq10k.connect(_this.dInput);
          } else if (_this.compressionOn) {
            _this.eq10k.connect(_this.compressor);
          } else {
            _this.eq10k.connect(_this.effectsOut);
          }
        } else {
          _this.effectsIn.disconnect();
          if (_this.delayOn) {
            _this.effectsIn.connect(_this.dInput);
            if (_this.compressionOn) {
              _this.dOutput.connect(_this.compressor);
            } else {
              _this.dOutput.connect(_this.effectsOut);
            }
          } else if (_this.compressionOn) {
            _this.effectsIn.connect(_this.compressor);
          } else {
            _this.effectsIn.connect(_this.effectsOut);
          }
        }
      });
    };

    return SynthService;
  }()) || _class);
});
define('showcases/beatmaker/beat-maker',['exports', '../../app-router', 'aurelia-framework'], function (exports, _appRouter, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Beatmaker = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Beatmaker = exports.Beatmaker = (_dec = (0, _aureliaFramework.inject)(_appRouter.AppRouter), _dec(_class = function () {
    function Beatmaker(appRouter) {
      _classCallCheck(this, Beatmaker);

      this.message = 'Hello world';
      this.appRouter = appRouter;
    }

    Beatmaker.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'synth'], name: 'synth', moduleId: './synth/piano', href: '#/showcase/beatmaker/synth', nav: true, title: 'Synth' }, { route: 'sequencer', name: 'sequencer', moduleId: './sequencer/sequencer', href: '#/showcase/beatmaker/sequencer', nav: true, title: 'Sequencer' }]);
      this.appRouter.setBeat(router);
    };

    return Beatmaker;
  }()) || _class);
});
define('resources/elements/side-nav/side-nav',['exports', 'aurelia-framework', '../../../app-router', '../../../services/drum-service', '../../../showcases/beatmaker/components/audio-bus'], function (exports, _aureliaFramework, _appRouter, _drumService, _audioBus) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SideNav = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SideNav = exports.SideNav = (_dec = (0, _aureliaFramework.inject)(_appRouter.AppRouter, _drumService.DrumService, _audioBus.AudioBus), _dec(_class = function () {
    function SideNav(appRouter, ds, ab) {
      _classCallCheck(this, SideNav);

      this.appRouter = appRouter;
      this.ds = ds;
      this.ab = ab;
      var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|' + 'Opera Mini|IEMobile|Mobile', 'i');
      this.isMobile = testExp.test(navigator.userAgent);
    }

    SideNav.prototype.attached = function attached() {
      this.container = document.querySelector('app-container');
    };

    SideNav.prototype.closeDrawer = function closeDrawer(href) {
      if (this.isMobile) {
        document.querySelector('.mdl-layout__obfuscator').click();
      }
      this.appRouter.router.navigate(href);
    };

    return SideNav;
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
      this.showVisualizer = false;
      this.input = this.audio.createGain();
      this.output = this.audio.createGain();
      this.synthIn = this.audio.createGain();
      this.drumsIn = this.audio.createGain();
      this.compressor = this.createCompressor();
      this.connect();
      this.compressionOn = true;
      this.delayOn = true;
      this.eqOn = true;
      this.drumsIn.connect(this.input);
      this.input.connect(this.output);
      this.synthOut.connect(this.output);
      this.output.connect(this.analyser);
      var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|' + 'Opera Mini|IEMobile|Mobile', 'i');
      this.isMobile = testExp.test(navigator.userAgent);
      console.log(this.isMobile);

      this.ea.subscribe('compAttack:sidechain', function (msg) {
        _this.compressor.attack.value = msg / 100;
      });
      this.ea.subscribe('compRelease:sidechain', function (msg) {
        _this.compressor.release.value = msg / 100;
      });
      this.ea.subscribe('compThresh:sidechain', function (msg) {
        _this.compressor.threshold.value = msg - 100;
      });
      this.ea.subscribe('compKnee:sidechain', function (msg) {
        _this.compressor.knee.value = msg;
      });
      this.ea.subscribe('compRatio:sidechain', function (msg) {
        _this.compressor.ratio.value = msg;
      });
      this.ea.subscribe('toggleCompressor:sidechain', function (msg) {
        _this.compressionOn = !_this.compressionOn;
      });
    }

    AudioBus.prototype.connect = function connect() {
      this.synthIn.connect(this.synthOut);
      var gain = this.audio.createGain();
      gain.gain.value = 0.001;
      this.compressor.connect(gain);
      gain.connect(this.output);
    };

    AudioBus.prototype.createCompressor = function createCompressor() {
      var compressor = this.audio.createDynamicsCompressor();
      compressor.threshold.value = -55;
      compressor.knee.value = 28;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.1;
      compressor.release.value = 0.1;
      return compressor;
    };

    return AudioBus;
  }()) || _class);
});
define('showcases/beatmaker/components/edit-effects',['exports', 'aurelia-framework', './audio-bus'], function (exports, _aureliaFramework, _audioBus) {
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

  var EditEffects = exports.EditEffects = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus), _dec(_class = function () {
    function EditEffects(ab) {
      _classCallCheck(this, EditEffects);

      this.ab = ab;
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
      this.hasAttached = false;
    }

    KnobCustomElement.prototype.attached = function attached() {
      var _this = this;

      if (!this.hasAttached) {
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
        this.hasAttached = true;
      }
    };

    KnobCustomElement.prototype.detached = function detached() {
      console.log('detached');
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
        var end = this.options.steps + 1;
        var width = this.width / 2;
        var height = this.height / 2;
        this.ticks = [];
        var Shape = this.options.type;
        var rect;
        for (var i = 0; i < end; i++) {
          rect = new Shape(this.options.tickWidth, this.options.tickHeight, width, -2);
          rect.node.setAttribute('rx', 1);
          rect.node.setAttribute('ry', 1);
          rect.rotate(this.startAngle + i * step, width, height);
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
define('showcases/beatmaker/components/slider',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'nouislider'], function (exports, _aureliaFramework, _aureliaEventAggregator, noUiSlider) {
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

  var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function Slider(element, ea) {
      _classCallCheck(this, Slider);

      _initDefineProp(this, 'min', _descriptor, this);

      _initDefineProp(this, 'max', _descriptor2, this);

      _initDefineProp(this, 'label', _descriptor3, this);

      _initDefineProp(this, 'val', _descriptor4, this);

      _initDefineProp(this, 'labels', _descriptor5, this);

      _initDefineProp(this, 'canvas', _descriptor6, this);

      _initDefineProp(this, 'preset', _descriptor7, this);

      _initDefineProp(this, 'channel', _descriptor8, this);

      _initDefineProp(this, 'canvas', _descriptor9, this);

      this.element = element;
      this.ea = ea;

      this.isOpen = false;
      this.octaves = [-3, -2, -1, 0, 1, 2, 3];
      this.waves = ['sine', 'saw', 'sqr', 'tri'];
    }

    Slider.prototype.attached = function attached() {
      this.range = this.element.children[2];
      this.range.style.margin = '0 2px 15px 2px';
    };

    Slider.prototype.toggleSlider = function toggleSlider(e) {
      var _this = this;

      console.log(e);
      if (this.isOpen) {
        this.range.noUiSlider.destroy();
      } else {
        noUiSlider.create(this.range, {
          start: this.val,
          step: 1,
          behavior: 'tap-drag',
          orientation: 'vertical',
          direction: 'rtl',

          tooltips: false,
          range: {
            'min': parseInt(this.min),
            'max': parseInt(this.max)
          }
        });
        this.range.noUiSlider.on('slide', function (val) {
          _this.val = val[0];
          _this.change(false);
        });
        this.range.style.left = this.element.children[1].offsetLeft + 50 + 'px';
        this.range.style.top = this.element.children[1].offsetTop - 40 + 'px';
      }
      this.isOpen = !this.isOpen;
    };

    Slider.prototype.change = function change() {

      if (this.channel) {
        this.ea.publish(this.channel, this.val);
      }
    };

    Slider.prototype.add = function add() {
      this.val++;
      if (this.channel) {
        this.ea.publish(this.channel, this.val);
      }
    };

    Slider.prototype.minus = function minus() {
      this.val--;
      if (this.val < 0) {
        this.val = 0;
      }
      if (this.channel) {
        this.ea.publish(this.channel, this.val);
      }
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
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'canvas', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'preset', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'channel', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'canvas', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/components/sound-wave',['exports', 'aurelia-event-aggregator', 'aurelia-framework', './audio-bus', 'jquery'], function (exports, _aureliaEventAggregator, _aureliaFramework, _audioBus) {
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var SoundWave = exports.SoundWave = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element, _audioBus.AudioBus), _dec(_class = (_class2 = function () {
    function SoundWave(ea, element, audiobus) {
      var _this = this;

      _classCallCheck(this, SoundWave);

      _initDefineProp(this, 'ab', _descriptor, this);

      _initDefineProp(this, 'canvasId', _descriptor2, this);

      _initDefineProp(this, 'background', _descriptor3, this);

      _initDefineProp(this, 'asHeader', _descriptor4, this);

      this.ea = ea;
      this.element = element;
      this.x = 0;
      this.y;
      this.v;
      this.animId;
      this.audiobus = audiobus;
      this.ea.subscribe('resize', function () {
        var height, width;
        width = $(_this.bgEl).width();
        height = $(_this.bgEl).height();
        if (_this.asHeader) {
          width += 32;
          _this.bgColor = "transparent";
          _this.fgColor = "#fff";
          _this.element.style.marginLeft = '-16px';
          _this.element.style.marginRight = '-16px';
          _this.ab = _this.audiobus;
        }
        _this.canvas.width = width;
        _this.canvas.height = height;
        _this.element.style.marginTop = height * -1 + 'px';
      });
    }

    SoundWave.prototype.attached = function attached() {
      this.bgColor = "#2196f3";
      this.fgColor = "#69f0ae";
      console.log(this.canvasId);
      this.canvas = this.element.children[0];

      this.canvasCtx = this.canvas.getContext('2d');
      this.bgEl = document.getElementById(this.canvasId);
      var height, width;
      width = $(this.bgEl).width();
      height = $(this.bgEl).height();
      if (this.asHeader) {
        width += 32;
        this.bgColor = "transparent";
        this.fgColor = "#fff";
        this.element.style.marginLeft = '-16px';
        this.element.style.marginRight = '-16px';
        this.ab = this.audiobus;
      }

      this.element.style.marginTop = height * -1 + 'px';
      console.log(this.element.style);
      this.canvas.width = width;
      this.canvas.height = height;
      this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
      this.draw();
    };

    SoundWave.prototype.draw = function draw() {
      this.ab.analyser.getByteTimeDomainData(this.ab.dataArray);
      this.canvasCtx.fillStyle = this.bgColor;
      if (this.asHeader) {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.canvasCtx.lineWidth = 1;
      this.canvasCtx.strokeStyle = this.fgColor;
      this.canvasCtx.beginPath();
      this.sliceWidth = this.canvas.width * 1.0 / this.ab.bufferLength;
      this.x = 0;
      for (var i = 0; i < this.ab.bufferLength; i++) {
        this.v = this.ab.dataArray[i] / 128.0;
        this.y = this.v * this.canvas.height / 2;
        if (i === 0) {
          this.canvasCtx.moveTo(this.x, this.y);
        } else {
          this.canvasCtx.lineTo(this.x, this.y);
        }
        this.x += this.sliceWidth;
      }
      this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
      this.canvasCtx.stroke();
      this.animId = requestAnimationFrame(this.draw.bind(this));
    };

    SoundWave.prototype.detached = function detached() {
      cancelAnimationFrame(this.animId);
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
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'asHeader', [_aureliaFramework.bindable], {
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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Switch = exports.Switch = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function Switch(element) {
      _classCallCheck(this, Switch);

      _initDefineProp(this, 'switched', _descriptor, this);

      this.element = element;
    }

    Switch.prototype.attached = function attached() {
      if (this.switched === true) {
        this.element.children[0].children[0].children[0].checked = true;
      }
    };

    Switch.prototype.toggle = function toggle() {
      console.log(this.element.children[0]);
      if (this.switched) {
        this.element.children[0].children[0].MaterialSwitch.off();

        this.switched = false;
      } else {
        this.element.children[0].children[0].MaterialSwitch.on();
        this.switched = true;
      }
    };

    return Switch;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'switched', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/effects/compressor',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/comp-service'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator, _compService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Compressor = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Compressor = exports.Compressor = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _compService.CompService), _dec(_class = (_class2 = function () {
    function Compressor(ab, ea, comp) {
      _classCallCheck(this, Compressor);

      _initDefineProp(this, 'mode', _descriptor, this);

      this.comp = comp;
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
      this.ea.publish('toggleCompressor' + (':' + this.mode));
      this.active = !this.active;
    };

    return Compressor;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'mode', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/effects/delay',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/delay-service'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator, _delayService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Delay = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Delay = exports.Delay = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _delayService.DelayService), _dec(_class = (_class2 = function () {
    function Delay(ab, ea, ds) {
      _classCallCheck(this, Delay);

      _initDefineProp(this, 'mode', _descriptor, this);

      this.ab = ab;
      this.ea = ea;
      this.ds = ds;
    }

    Delay.prototype.toggleEffect = function toggleEffect() {
      this.ea.publish('toggleDelay');
      this.ds[this.mode].active = !this.ds[this.mode].active;
    };

    Delay.prototype.attached = function attached() {};

    return Delay;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'mode', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/effects/equalizer',['exports', '../components/audio-bus', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/eq-service'], function (exports, _audioBus, _aureliaFramework, _aureliaEventAggregator, _eqService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Equalizer = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Equalizer = exports.Equalizer = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _eqService.EqService), _dec(_class = (_class2 = function () {
    function Equalizer(ab, ea, eq) {
      _classCallCheck(this, Equalizer);

      _initDefineProp(this, 'mode', _descriptor, this);

      this.eq = eq;
      this.ab = ab;
      this.ea = ea;
    }

    Equalizer.prototype.toggleEffect = function toggleEffect() {
      this.ea.publish('toggleEQ');
      this.eq[this.mode].active = !this.eq[this.mode].active;
    };

    return Equalizer;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'mode', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/sequencer/sequencer',['exports', 'aurelia-framework', '../components/audio-bus', 'aurelia-event-aggregator', '../../../services/drum-service'], function (exports, _aureliaFramework, _audioBus, _aureliaEventAggregator, _drumService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SequencerCustomElement = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var SequencerCustomElement = exports.SequencerCustomElement = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _drumService.DrumService), _dec(_class = (_class2 = function () {
    function SequencerCustomElement(ab, ea, ds) {
      _classCallCheck(this, SequencerCustomElement);

      _initDefineProp(this, 'isOpen', _descriptor, this);

      this.ea = ea;
      this.kick;
      this.snare;
      this.ab = ab;
      this.ds = ds;
      this.ds.loadInit();
      this.audio = this.ab.audio;

      this.mixer = false;
    }

    SequencerCustomElement.prototype.attached = function attached() {};

    SequencerCustomElement.prototype.toggleMixer = function toggleMixer() {
      this.mixer = !this.mixer;
    };

    SequencerCustomElement.prototype.playSound = function playSound(buffer, time, name, i) {
      this.ds.playSound(buffer, time, name, i);
    };

    SequencerCustomElement.prototype.playSample = function playSample(buffer) {
      this.ds.playSample(buffer);
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
      this.ds.handlePlay();
    };

    SequencerCustomElement.prototype.addNote = function addNote(e, i, ii) {
      this.ds.addNote(e, i, ii);
    };

    SequencerCustomElement.prototype.clearNote = function clearNote(i, ii) {
      this.ds.clearNote(i, ii);
    };

    SequencerCustomElement.prototype.handleStop = function handleStop() {};

    SequencerCustomElement.prototype.schedule = function schedule() {
      var currentTime = this.audio.currentTime;

      currentTime -= this.startTime;
      while (this.noteTime < currentTime + 0.200) {
        var contextPlayTime = this.noteTime + this.startTime;
        for (var i = 0; i < this.scheduled.length; i++) {
          if (this.scheduled[i][this.rhythmIndex] === true) {
            this.playSound(this.drums[i].sound, contextPlayTime, this.drums[i].name, i);
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
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isOpen', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('showcases/beatmaker/synth/piano',['exports', '../components/audio-bus', 'aurelia-event-aggregator', 'aurelia-framework', '../../../services/synth-service'], function (exports, _audioBus, _aureliaEventAggregator, _aureliaFramework, _synthService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Piano = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var Piano = exports.Piano = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator, _synthService.SynthService), _dec(_class = (_class2 = function () {
        function Piano(ab, ea, synth) {
            _classCallCheck(this, Piano);

            _initDefineProp(this, 'isOpen', _descriptor, this);

            this.ab = ab;
            this.ea = ea;
            this.audio = this.ab.audio;
            this.synth = synth;
        }

        Piano.prototype.activate = function activate(a, b, c) {};

        Piano.prototype.canDeactivate = function canDeactivate() {};

        Piano.prototype.attached = function attached() {};

        return Piano;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isOpen', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
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
define('showcases/beatmaker/synth/components/piano-key',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
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

  var PianoKeyCustomElement = exports.PianoKeyCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function PianoKeyCustomElement(element, ea) {
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
define('text!about.html', ['module'], function(module) { module.exports = "<template><svg xmlns=http://www.w3.org/2000/svg width=56 height=100 style=position:absolute;top:-9999px id=cubesvg><rect width=56 height=100 fill=#2196f3 /><path d=\"M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100\" fill=none stroke=#00E676 stroke-width=2 /><path d=\"M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34\" fill=none stroke=#00E676 stroke-width=2 /></svg><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col\"><div class=\"topimg mdl-card mdl-shadow--2dp\"><div class=\"mdl-card__title mdl-card--expand text-center\"><div class=text-center style=\"margin:0 auto;color:#fff\"><h1 style=margin-bottom:5px>All Things Front End</h1><p style=margin-top:5px>(And More)</p><h4 style=margin-bottom:5px>Hey, I'm Justin, a Front End Developer.</h4><h4 style=margin-bottom:10px>And this is my website about making websites.</h4></div></div><div class=mdl-card__actions><span class=demo-card-image__filename></span></div></div></div><div class=\"mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet\"><div class=\"mdl-card mdl-shadow--2dp\" style=width:100%><div class=mdl-card__title id=who-am-i><h2 class=mdl-card__title-text>Who am I?</h2></div><div class=mdl-card__supporting-text>I'm a front end developer at AlterMedia, where we make the worlds leading Studio Management Software. I studied computer science at College of the Canyons.<p class=mdl-color-text--grey style=margin-top:5px>Please be aware this website is very new and still a work in progress. Suggestions? &nbsp;<a class=\"\" href=mailto:justin@heyjust.in>Email me</a></p><div class=\"mdl-tabs mdl-js-tabs mdl-js-ripple-effect\"><div class=mdl-tabs__tab-bar><a href=#exp-panel class=\"mdl-tabs__tab is-active\">Experience</a><a href=#edu-panel class=mdl-tabs__tab>Education</a></div><div class=\"mdl-tabs__panel is-active\" id=exp-panel><div class=mdl-grid><div class=\"mdl-cell mdl-cell--6-col\"><h5 class=text-center>WebGlancer</h5>In the last 5 years at AlterMedia, I've converted the front end of a jQuery/PHP system back from the old days of web development over to Angular 1.5 and created a REST api for it in PHP. Later, around the time Angular 2 came out, we decided to switch the front end to Aurelia instead and are very happy with it. I am now finishing up migrating the backend over to Node and Express. I also designed much of the interface and maintained multiple versions of the product.</div><div class=\"mdl-cell mdl-cell--6-col text-center\"><h5 class=text-center>WordPress</h5>I maintain the companies website at &nbsp;<a href=https://studiosuite.com>studiosuite.com</a></div></div></div><div class=mdl-tabs__panel id=edu-panel style=min-height:146px><div class=mdl-grid><div class=\"mdl-cell mdl-cell--6-col\"><h5 class=text-center>College of the Canyons</h5>I've finished computer science at College of the Canyons, but I have a few math classes to take before I can transfer.</div><div class=\"mdl-cell mdl-cell--6-col text-center\"><h5 class=text-center>ACM Club</h5>Founding member of an ACM club chaper at COC</div></div></div></div></div><div class=mdl-card__menu></div></div></div><div class=\"mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet\"><div class=\"mdl-card mdl-shadow--2dp\" style=width:100%><div class=mdl-card__title id=skills style=\"padding:0 16px\"><canvas id=skills-container width=200 height=200></canvas><h2 class=mdl-card__title-text>Skills</h2></div><div class=mdl-card__supporting-text><div class=\"mdl-tabs mdl-js-tabs mdl-js-ripple-effect\"><div class=mdl-tabs__tab-bar><a href=\"${'#skill'+$index}\" class=\"mdl-tabs__tab ${skillIndex===$index?'is-active':''}\" click.delegate=\"changeSkill(skill, $index)\" repeat.for=\"skill of skills\">${skill.name}</a></div><div class=mdl-grid style=min-height:364px><div class=\"mdl-cell mdl-cell--6-col text-left\" repeat.for=\"skill of activeSkill.skills\"><h5>${skill.name}</h5><p>${skill.description}</p></div></div><div class=mdl-tabs__panel id=skill0></div><div class=mdl-tabs__panel id=skill1></div><div class=mdl-tabs__panel id=skill2></div><div class=mdl-tabs__panel id=skill3></div><div class=mdl-tabs__panel id=skill4></div><div class=mdl-tabs__panel id=skill5></div><div class=mdl-tabs__panel id=skill6></div><div class=mdl-tabs__panel id=skill7></div></div></div><div class=mdl-card__menu></div></div></div></div><div class=\"mdl-grid pane1\"></div></template>"; });
define('text!styles/breakpoints.css', ['module'], function(module) { module.exports = ""; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=material-design-lite/material.blue-amber.min.css></require><require from=nouislider/nouislider.css></require><require from=./styles/main.css></require><require from=./navigation></require><navigation><router-view></router-view></navigation></template>"; });
define('text!navigation.html', ['module'], function(module) { module.exports = "<template><require from=./resources/elements/side-nav/side-nav></require><div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer\" id=app-container><header class=mdl-layout__header><div class=mdl-layout__header-row><span class=mdl-layout-title>${appRouter.router.currentInstruction.config.title}</span><div class=mdl-layout-spacer></div><nav class=mdl-navigation if.bind=\"appRouter.beatmakerSet && appRouter.router.currentInstruction.config.title==='Showcase'\"><a class=\"mdl-navigation__link ${row.isActive?'nav-active':''}\" repeat.for=\"row of appRouter.beatMaker\" href=${row.href}>${row.title}</a></nav></div></header><side-nav containerless></side-nav><main class=mdl-layout__content style=background:#e0e0e0><div class=page-content><slot></slot></div></main></div></template>"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = ".no-bottom-spacing {\n  padding-bottom: 0px; }\n  .no-bottom-spacing div.mdl-cell {\n    margin-bottom: 0px; }\n\nslider p, slider slider-knob {\n  text-align: center; }\n\n.slider-label {\n  margin-bottom: 0px; }\n\n.slider-overlay {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 5; }\n\n.slider {\n  z-index: 6; }\n\n.slider-overlay.open {\n  display: initial; }\n\n.slider-knob {\n  width: 36px;\n  height: 36px;\n  border-radius: 36px;\n  color: #fff;\n  text-align: center;\n  border: 3px solid #fff;\n  margin: 0 auto; }\n\n.noUi-target {\n  position: absolute;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border: 0px; }\n\n.noUi-base {\n  background: #fff;\n  height: 100px;\n  border-radius: 4px; }\n\n.noUi-handle {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: #2196f3;\n  border: 0px; }\n\n.green-handle .noUi-handle {\n  background: #00e676; }\n\n.no-bottom-margin {\n  margin-bottom: 0px; }\n\n.nav-active {\n  background-color: rgba(0, 0, 0, 0.1); }\n\n.card-title {\n  margin-top: 0px; }\n\n.mdl-layout__header-row .mdl-navigation__link {\n  padding: 0 16px; }\n\n.topimg {\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMjE5NmYzIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRTY3NiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRTY3NiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==\");\n  width: 100%;\n  height: 400px;\n  color: #fff; }\n\n.pane1 {\n  z-index: 1;\n  position: relative; }\n\n.mdl-layout__tab-bar.normal-tabs {\n  height: 48px;\n  padding: 0;\n  margin: 0; }\n\n#who-am-i {\n  color: #fff;\n  background: url(\"images/sideofhouseresize1.jpg\") center/cover;\n  height: 176px; }\n  #who-am-i .mdl-card__menu button .mdl-button__ripple-container {\n    color: #fff; }\n\n#skills {\n  color: #fff;\n  height: 200px;\n  background-color: #02e17e;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='304' height='304' viewBox='0 0 304 304' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.1 224c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H0v-2h44.1zm160 48c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H82v-2h122.1zm57.8-46c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H304v2h-42.1zm0 16c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H304v2h-42.1zm6.2-114c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4h-86.2c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h86.2zm-256-48c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H0v-2h12.1zm185.8 34c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h86.2c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4h-86.2zM258 12.1c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9V0h2v12.1zm-64 208c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9v-54.2c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9v54.2zm48-198.2c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V82h64v-2h-62V21.9zm16 16c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V66h48v-2h-46V37.9zm-128 96c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V210h16v10.1c-2.282.463-4 2.48-4 4.9 0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.42-1.718-4.437-4-4.9V208h-16v-74.1zm-5.9-21.9c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H114v48H85.9c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H112v-48h12.1zm-6.2 130c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H176v-74.1c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9V242h-60.1zm-16-64c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H114v48h10.1c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H112v-48h-10.1zM66 284.1c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9V274H50v30h-2v-32h18v12.1zM236.1 176c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H274v44.1c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9V146h-10.1zm-64 96c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H208v-80h16v-14h-42.1c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H226v18h-16v80h-12.1zm86.2-210c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H272V0h2v32h10.1zM98 101.9c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V144H53.9c-.463-2.282-2.48-4-4.9-4-2.76 0-5 2.24-5 5s2.24 5 5 5c2.42 0 4.437-1.718 4.9-4H98v-44.1zM53.9 34c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H80V0h2v34H53.9zm60.1 3.9c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V64H80v64H69.9c-.463-2.282-2.48-4-4.9-4-2.76 0-5 2.24-5 5s2.24 5 5 5c2.42 0 4.437-1.718 4.9-4H82V66h32V37.9zM101.9 82c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H128V37.9c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9V82h-28.1zm16-64c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H146v44.1c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9V18h-26.1zm102.2 270c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H98v14h-2v-16h124.1zM242 149.9c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9V162h16v30h-16v66h48v46h2v-48h-48v-62h16v-34h-16v-10.1zM53.9 18c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H64V2H48V0h18v18H53.9zm112 32c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H192V0h50v2h-48v48h-28.1zm-48-48c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5 0-.342.034-.677.1-1h2.07c-.11.313-.17.65-.17 1 0 1.657 1.343 3 3 3s3-1.343 3-3c0-.35-.06-.687-.17-1H178v34h-18V21.9c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9V32h14V2h-58.1zm0 96c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H137l32-32h39V21.9c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9V66h-40.172l-32 32H117.9zm28.1 90.1c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9v-76.513L175.586 80H224V21.9c-2.282-.463-4-2.48-4-4.9 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.42-1.718 4.437-4 4.9V82h-49.586L146 112.414V188.1zm16 32c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9v-99.513L184.586 96H300.1c.398-1.96 1.94-3.502 3.9-3.9v2.07c-1.165.413-2 1.524-2 2.83s.835 2.417 2 2.83v2.07c-1.96-.398-3.502-1.94-3.9-3.9H185.414L162 121.414V220.1zm-144-64c2.282.463 4 2.48 4 4.9 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.42 1.718-4.437 4-4.9v-3.513l48-48V48h32V0h2v50H66v55.413l-48 48v2.687zM50 53.9c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9v42.686l-48 48V210h28.1c.463 2.282 2.48 4 4.9 4 2.76 0 5-2.24 5-5s-2.24-5-5-5c-2.42 0-4.437 1.718-4.9 4H2v-62.586l48-48V53.9zm-16 16c2.282-.463 4-2.48 4-4.9 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.42 1.718 4.437 4 4.9v18.686l-32 32v2.828l34-34V69.9zM12.1 32c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H9.414L0 43.414v-2.828L8.586 32H12.1zm265.8 18c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h18.686L304 40.586v2.828L297.414 50H277.9zm-16 160c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H288V136.587l16-16v2.827l-14 14V210h-28.1zm-208 32c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H64v-22.586L40.586 194H21.9c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h19.513L66 216.586V242H53.9zm150.2 14c.463-2.282 2.48-4 4.9-4 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.437-1.718-4.9-4H96v-56.598L56.598 162H37.9c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h19.502L98 200.598V256h106.1zm-150.2 2c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4H80v-46.586L48.586 178H21.9c-.463 2.282-2.48 4-4.9 4-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.437 1.718 4.9 4h27.513L82 208.586V258H53.9zM97 100c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-48 32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32 48c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16-64c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 96c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-144c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-96 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm96 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16-64c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-32 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM49 36c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-32 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM33 68c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-48c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 240c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16-64c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm80-176c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32 48c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm112 176c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-16 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM17 180c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0-32c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM17 84c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm32 64c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm16-16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 39.793V0h-2v40.586L8.586 64H0v2h9.413L34 41.414v-1.62zM2 300.1V258h14v46h2v-48H0V302.17c.313-.11.65-.17 1-.17 1.306 0 2.417.835 2.83 2H5.9c-.398-1.96-1.94-3.502-3.9-3.9zM34 241v63h-2v-62H0v-2h34v1zM17 18h1V0h-2v16H0v2h17zm273-2V0h-2v18h16v-2h-14zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1c.323-.066.658-.1 1-.1 2.76 0 5 2.24 5 5s-2.24 5-5 5c-.342 0-.677-.034-1-.1v-2.07c.313.11.65.17 1 .17 1.657 0 3-1.343 3-3s-1.343-3-3-3c-.35 0-.687.06-1 .17V92.1zM80 272h2v32h-2v-32zm37.9 32c-.463-2.282-2.48-4-4.9-4-2.42 0-4.437 1.718-4.9 4h2.07c.413-1.165 1.524-2 2.83-2s2.417.835 2.83 2h2.07zM5.9 0c.066.323.1.658.1 1 0 2.76-2.24 5-5 5-.342 0-.677-.034-1-.1V3.83C.313 3.94.65 4 1 4c1.657 0 3-1.343 3-3 0-.35-.06-.687-.17-1H5.9zm294.2 0c-.066.323-.1.658-.1 1 0 2.42 1.718 4.437 4 4.9V3.83c-1.165-.413-2-1.524-2-2.83 0-.35.06-.687.17-1h-2.07zm3.9 300.1c-1.96.398-3.502 1.94-3.9 3.9h2.07c.302-.852.978-1.528 1.83-1.83v-2.07z' fill='%232196f3' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\"); }\n\n.header p {\n  z-index: 1;\n  position: relative; }\n\nsound-wave {\n  position: absolute;\n  border-radius: 2px;\n  overflow: hidden;\n  z-index: 0; }\n\n.b-radius-card {\n  border-radius: 2px;\n  -webkit-border-radius: 2px;\n  -moz-border-radius: 2px; }\n\n.right {\n  float: right !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.left {\n  float: left !important; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-center {\n  text-align: center !important; }\n\n.full-width {\n  width: 100%; }\n\n.secondary-info {\n  color: rgba(0, 0, 0, 0.54); }\n\n.btn-icon i {\n  margin-right: 5px;\n  top: -2px;\n  position: relative; }\n\np switch {\n  margin-right: 24px; }\n\n.p2 path {\n  fill: #2196f3;\n  stroke: none; }\n\n.p2 path:first-child {\n  stroke: none;\n  fill: #fff;\n  filter: none; }\n\n.p2 .active ~ rect {\n  fill: #bdbdbd; }\n\n.p2 rect {\n  filter: url(#glow);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.p1 circle.pointer,\n.p2 circle.pointer {\n  fill: #fff;\n  stroke: none; }\n\n.p2 text {\n  font-size: 13px;\n  fill: #fff; }\n\n.p2 .active ~ rect {\n  fill: #bdbdbd; }\n\n.p2 rect {\n  filter: url(#glow);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.p1 circle.pointer,\n.p2 circle.pointer {\n  fill: #fff;\n  stroke: none; }\n\n.p2 text {\n  font-size: 13px;\n  fill: #fff; }\n\n#synth,\n#sequencer-controller {\n  background: #2196f3; }\n  #synth #synthfilter,\n  #sequencer-controller #synthfilter {\n    z-index: 1;\n    position: relative; }\n  #synth .p2 text,\n  #sequencer-controller .p2 text {\n    fill: #fff;\n    filter: none; }\n  #synth .p1 circle.pointer,\n  #synth .p2 circle.pointer,\n  #sequencer-controller .p1 circle.pointer,\n  #sequencer-controller .p2 circle.pointer {\n    fill: #fff;\n    stroke: none; }\n  #synth .p2 rect,\n  #synth .p1 rect,\n  #sequencer-controller .p2 rect,\n  #sequencer-controller .p1 rect {\n    fill: #00E676; }\n  #synth .p2 .active ~ rect,\n  #sequencer-controller .p2 .active ~ rect {\n    fill: #bdbdbd; }\n  #synth .p2 circle:first-child,\n  #synth .p1 circle:first-child,\n  #sequencer-controller .p2 circle:first-child,\n  #sequencer-controller .p1 circle:first-child {\n    -webkit-filter: url(#dropshadow);\n    filter: url(#dropshadow);\n    fill: #00e676;\n    stroke: #fff; }\n  #synth .p2 circle,\n  #synth .p1 circle,\n  #sequencer-controller .p2 circle,\n  #sequencer-controller .p1 circle {\n    stroke: #69f0ae;\n    stroke-width: 3; }\n  #synth .p1 text,\n  #sequencer-controller .p1 text {\n    fill: #ddd; }\n  #synth .p1 text.active,\n  #sequencer-controller .p1 text.active {\n    fill: #fff; }\n\n.p2 rect,\n.p1 rect {\n  fill: #64b5f6; }\n\n.p2 g polygon,\n.p1 g polygon {\n  opacity: 1; }\n\n.p2 circle:first-child,\n.p1 circle:first-child {\n  -webkit-filter: url(#dropshadow);\n  filter: url(#dropshadow);\n  fill: #2196f3;\n  stroke: #fff; }\n\n.p2 circle,\n.p1 circle {\n  fill: #fff;\n  stroke: #64b5f6;\n  stroke-width: 3; }\n\n.p1 text {\n  font-size: 12px;\n  fill: #bdbdbd;\n  font-family: sans-serif;\n  font-weight: 300;\n  -webkit-transition: all .1s ease-in-out; }\n\n.p1 text.active {\n  font-size: 12px;\n  -webkit-transition: all .3s ease-in-out;\n  fill: #64b5f6; }\n\nsvg:not(:root) {\n  overflow: visible; }\n\n.au-data-table {\n  box-shadow: none; }\n\n.c-scrim--date-only {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.541176);\n  opacity: 0;\n  transition: 200ms ease opacity;\n  will-change: opacity; }\n\n.c-scrim--date-only--shown {\n  opacity: 1; }\n\n.c-scrim--shown,\n.c-scrim--date-only--shown {\n  z-index: 999; }\n\n.c-datepicker--open {\n  z-index: 1000; }\n\n.c-scrim--date-only--shown +\n.c-datepicker--open {\n  min-height: 500px; }\n  .c-scrim--date-only--shown +\n.c-datepicker--open .c-datepicker__header-date {\n    height: 84px; }\n    .c-scrim--date-only--shown +\n.c-datepicker--open .c-datepicker__header-date .c-datepicker__header-date__month {\n      padding-top: 0px; }\n  .c-scrim--date-only--shown +\n.c-datepicker--open .c-datepicker--show-time,\n  .c-scrim--date-only--shown +\n.c-datepicker--open .c-datepicker--show-calendar,\n  .c-scrim--date-only--shown +\n.c-datepicker--open .c-datepicker__header-date__time {\n    display: none; }\n\n.c-datepicker__header-date span {\n  padding: 16px 0px; }\n\n.c-datepicker__header-date span.c-datepicker__header-date__time {\n  padding-top: 0px; }\n\n.mdl-datepicker-wrapper.is-visible {\n  z-index: 1000; }\n\n.mtp-overlay {\n  z-index: 1000; }\n  .mtp-overlay .mtp-actions__ok {\n    color: #2196f3; }\n  .mtp-overlay .mtp-display {\n    background-color: #00bcd4; }\n  .mtp-overlay .mtp-clock--active {\n    background-color: #00bcd4; }\n  .mtp-overlay .mtp-clock__hand {\n    background-color: #00bcd4; }\n  .mtp-overlay .mtp-clock__center {\n    background-color: #00bcd4; }\n  .mtp-overlay .mtp-meridiem span:hover:not(.mtp-clock--active) {\n    background-color: #b2ebf2; }\n  .mtp-overlay .mtp-clock__time li:hover:not(.mtp-clock--active) {\n    background-color: #b2ebf2; }\n\nux-dialog-overlay.active {\n  background: rgba(0, 0, 0, 0.541176); }\n\n.hidden {\n  display: none !important; }\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
define('text!showcase.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!showcases/beatmaker/beat-maker.html', ['module'], function(module) { module.exports = "<template><router-view></router-view><svg style=position:absolute;top:-9999px><filter id=dropshadow height=150% width=150%><feGaussianBlur in=SourceAlpha stdDeviation=2 /><feOffset dx=1 dy=4 result=offsetblur /><feFlood flood-color=rgba(0,0,0,0.2) /><feComposite in2=offsetblur operator=in /><feMerge><feMergeNode/><feMergeNode in=SourceGraphic /></feMerge></filter><filter id=inner-shadow><feOffset dx=0 dy=5></feOffset><feGaussianBlur stdDeviation=5 result=offset-blur></feGaussianBlur><feComposite operator=out in=SourceGraphic in2=offset-blur result=inverse></feComposite><feFlood flood-color=black flood-opacity=0.75 result=color></feFlood><feComposite operator=in in=color in2=inverse result=shadow></feComposite><feComposite operator=over in=shadow in2=SourceGraphic></feComposite></filter><filter id=glow><feGaussianBlur class=blur stdDeviation=7 result=coloredBlur></feGaussianBlur><feMerge><feMergeNode in=coloredBlur></feMergeNode><feMergeNode in=SourceGraphic></feMergeNode></feMerge></filter></svg></template>"; });
define('text!showcases/beatmaker/styles/main.css', ['module'], function(module) { module.exports = ".au-animate .row {\n  margin: 0; }\n\n.slider-label {\n  margin-bottom: 9px; }\n\n.card-left {\n  display: table-cell;\n  /*border-right: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right {\n  display: table-cell;\n  /*border-left: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right > div,\n.card-left > div {\n  height: 20%; }\n\n.input-field.inline.col.m4 {\n  text-align: center; }\n\nlabel.sm {\n  font-size: 0.8rem;\n  /*position: absolute !important;*/\n  top: -14px !important;\n  left: 0rem !important; }\n\n.select-wrapper {\n  margin-top: 0px; }\n\n.select-wrapper + label {\n  color: #343434 !important; }\n\nform p {\n  margin-top: 0;\n  margin-bottom: 0; }\n\nsound-wave {\n  position: absolute;\n  border-radius: 2px;\n  overflow: hidden;\n  z-index: 0; }\n  sound-wave canvas {\n    height: 100%;\n    width: 100%; }\n\n.canvas-as-bg p {\n  color: #fff !important; }\n\n.p2 .active ~ rect {\n  fill: #bdbdbd; }\n\n.p2 rect {\n  filter: url(#glow);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.p1 circle.pointer,\n.p2 circle.pointer {\n  fill: #fff;\n  stroke: none; }\n\n.p2 text {\n  font-size: 13px;\n  fill: #fff; }\n\n#synth,\n#sequencer-controller {\n  background: #2196f3; }\n  #synth #synthfilter,\n  #sequencer-controller #synthfilter {\n    z-index: 1;\n    position: relative; }\n  #synth .p2 text,\n  #sequencer-controller .p2 text {\n    fill: #fff;\n    filter: none; }\n  #synth .p1 circle.pointer,\n  #synth .p2 circle.pointer,\n  #sequencer-controller .p1 circle.pointer,\n  #sequencer-controller .p2 circle.pointer {\n    fill: #fff;\n    stroke: none; }\n  #synth .p2 rect,\n  #synth .p1 rect,\n  #sequencer-controller .p2 rect,\n  #sequencer-controller .p1 rect {\n    fill: #00E676; }\n  #synth .p2 .active ~ rect,\n  #sequencer-controller .p2 .active ~ rect {\n    fill: #bdbdbd; }\n  #synth .p2 circle:first-child,\n  #synth .p1 circle:first-child,\n  #sequencer-controller .p2 circle:first-child,\n  #sequencer-controller .p1 circle:first-child {\n    -webkit-filter: url(#dropshadow);\n    filter: url(#dropshadow);\n    fill: #00e676;\n    stroke: #fff; }\n  #synth .p2 circle,\n  #synth .p1 circle,\n  #sequencer-controller .p2 circle,\n  #sequencer-controller .p1 circle {\n    stroke: #69f0ae;\n    stroke-width: 3; }\n  #synth .p1 text,\n  #sequencer-controller .p1 text {\n    fill: #ddd; }\n  #synth .p1 text.active,\n  #sequencer-controller .p1 text.active {\n    fill: #fff; }\n\n.p2 rect,\n.p1 rect {\n  fill: #64b5f6; }\n\n.p2 g polygon,\n.p1 g polygon {\n  opacity: 1; }\n\n.p2 circle:first-child,\n.p1 circle:first-child {\n  -webkit-filter: url(#dropshadow);\n  filter: url(#dropshadow);\n  fill: #2196f3;\n  stroke: #fff; }\n\n.p2 circle,\n.p1 circle {\n  fill: #fff;\n  stroke: #64b5f6;\n  stroke-width: 3; }\n\n.p1 text {\n  font-size: 12px;\n  fill: #bdbdbd;\n  font-family: sans-serif;\n  font-weight: 300;\n  -webkit-transition: all .1s ease-in-out; }\n\n.p1 text.active {\n  font-size: 12px;\n  -webkit-transition: all .3s ease-in-out;\n  fill: #64b5f6; }\n\nsvg:not(:root) {\n  overflow: visible; }\n\n.wave-shape {\n  width: 36px;\n  padding: 0; }\n\n#right form,\n#left form {\n  padding: 0; }\n\n#left form > div:first-child {\n  padding-left: 0; }\n\n#right form > div:last-child {\n  padding-right: 0; }\n\n.dropdown-content li > span {\n  color: #2196f3 !important; }\n\ninput:focus:not([type]):not([readonly]), input[type=\"text\"]:focus:not([readonly]), input[type=\"password\"]:focus:not([readonly]), input[type=\"email\"]:focus:not([readonly]), input[type=\"url\"]:focus:not([readonly]), input[type=\"time\"]:focus:not([readonly]), input[type=\"date\"]:focus:not([readonly]), input[type=\"datetime\"]:focus:not([readonly]), input[type=\"datetime-local\"]:focus:not([readonly]), input[type=\"tel\"]:focus:not([readonly]), input[type=\"number\"]:focus:not([readonly]), input[type=\"search\"]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3; }\n\ninput:not([type]):focus:not([readonly]) + label, input[type=text]:focus:not([readonly]) + label, input[type=password]:focus:not([readonly]) + label, input[type=email]:focus:not([readonly]) + label, input[type=url]:focus:not([readonly]) + label, input[type=time]:focus:not([readonly]) + label, input[type=date]:focus:not([readonly]) + label, input[type=datetime]:focus:not([readonly]) + label, input[type=datetime-local]:focus:not([readonly]) + label, input[type=tel]:focus:not([readonly]) + label, input[type=number]:focus:not([readonly]) + label, input[type=search]:focus:not([readonly]) + label, textarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #2196f3; }\n\n.mute-label {\n  color: #9e9e9e; }\n\ntd {\n  padding: 5px; }\n\nsection {\n  margin: 0; }\n\n.waves-effect.waves-blue .waves-ripple {\n  /*\r\n  The alpha value allows the text and background color\r\n  of the button to still show through.\r\n*/\n  background-color: rgba(3, 169, 244, 0.65); }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.pictureDetail {\n  max-width: 425px; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n.white-notes {\n  /*top:-89px;*/\n  position: relative;\n  margin-top: -90px;\n  z-index: 1; }\n\n.black-notes {\n  /*  position:absolute;*/\n  z-index: 2; }\n"; });
define('text!resources/elements/side-nav/styles/sidenav.css', ['module'], function(module) { module.exports = ".header {\n  position: relative;\n  padding: 16px 16px 0;\n  background: #ee0979;\n  /* fallback for old browsers */\n  background: -webkit-linear-gradient(to bottom, #ff6a00, #ee0979);\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to bottom, #ff6a00, #ee0979);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  color: #fff; }\n  .header .profile {\n    margin-bottom: 0px;\n    height: 64px; }\n    .header .profile i {\n      font-size: 64px; }\n  .header .name {\n    margin-top: 16px;\n    font-weight: 500;\n    margin-bottom: 0px; }\n  .header .email {\n    padding-bottom: 16px;\n    font-weight: 400;\n    margin-bottom: 0px; }\n\n.top-menu a {\n  text-decoration: none;\n  color: #2196f3;\n  display: block; }\n\n.mdl-navigation__link {\n  padding-left: 16px !important;\n  transition: 0.2s all ease; }\n  .mdl-navigation__link i {\n    margin-right: 32px; }\n\n.active {\n  color: #2196f3 !important; }\n"; });
define('text!resources/elements/side-nav/side-nav.html', ['module'], function(module) { module.exports = "<template><require from=./styles/sidenav.css></require><require from=../../../showcases/beatmaker/components/sound-wave></require><div class=mdl-layout__drawer><span class=mdl-layout-title></span><div class=header id=profile-header><p class=profile><img src=images/me1.jpg width=64 height=64 style=border-radius:50px;cursor:pointer alt=\"\" click.trigger=\"appRouter.router.navigate('')\"><a class=\"mdl-navigation__link right\" id=settings style=color:#fff;cursor:pointer><i class=material-icons style=font-size:32px;margin-right:0>info</i></a><ul class=\"mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect top-menu\" data-mdl-for=settings><li class=mdl-menu__item><a href=https://www.linkedin.com/in/justin-stoner-95160487 target=_blank>LinkedIn</a></li><li class=mdl-menu__item><a href=justin-stoner-resume.pdf target=_blank>Resume</a></li><li class=mdl-menu__item><a href=mailto:justin-stoner-resume.pdf target=_blank>Contact</a></li></ul></p><a class=\"mdl-navigation__link right\" id=play style=color:#fff;cursor:pointer;z-index:3;position:relative if.bind=ds.hasPlayed click.trigger=ds.handlePlay()><button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ${!mixer?'mdl-color-text--white':'mdl-color-text--green-A400'} mdl-color--grey-200\" style=margin-right:0><template if.bind=!ds.playing><i class=\"material-icons mdl-color-text--green-A400\">play_arrow</i></template><template if.bind=ds.playing><i class=\"material-icons mdl-color-text--red-500\">stop</i></template></button></a><p class=name>Justin Stoner</p><p class=email>justin@heyjust.in</p><sound-wave canvas-id=profile-header as-header=true if.bind=ab.showVisualizer></sound-wave></div><nav class=mdl-navigation><a class=\"mdl-navigation__link ${row.isActive?'active':''}\" repeat.for=\"row of appRouter.navigation\" href=${row.href} click.delegate=closeDrawer(row.href)><i class=material-icons>${row.settings.icon}</i>${row.title}</a></nav></div></template>"; });
define('text!showcases/beatmaker/components/edit-effects.html', ['module'], function(module) { module.exports = "<template><require from=../effects/compressor></require><require from=../effects/delay></require><require from=../effects/equalizer></require><ai-dialog style=width:auto><ai-dialog-body><div class=row><div class=\"col s12\"><ul class=tabs style=overflow-x:hidden><li class=\"tab col s4\"><a class=blue-text id=eqtab href=#test1>EQ</a></li><li class=\"tab col s4\"><a class=blue-text href=#test2>Delay</a></li><li class=\"tab col s4\"><a class=blue-text href=#test3>Compressor</a></li></ul></div><div id=test1 class=\"col s12\"><equalizer></equalizer></div><div id=test2 class=\"col s12\"><delay></delay></div><div id=test3 class=\"col s12\"><compressor></compressor></div></div></ai-dialog-body></ai-dialog></template>"; });
define('text!showcases/beatmaker/sequencer/styles/sequencer.css', ['module'], function(module) { module.exports = "form.col.s12 {\n  padding: 0;\n  margin-bottom: 0.75rem; }\n  form.col.s12 .row {\n    padding: 0.75rem; }\n\n#sequencer-controller p {\n  color: #fff; }\n\n#sequencer-mixer,\n#sequencer-notes {\n  width: 100%; }\n\n@media only screen and (max-width: 600px) {\n  tr > td {\n    padding: 5px 1px; }\n  tr > td:first-child {\n    padding: 5px; } }\n\n.drum-mixer ul {\n  list-style: none; }\n  .drum-mixer ul li {\n    list-style: none;\n    margin-bottom: 15px; }\n\n.drum-mixer > ul > li > div {\n  display: inline-block;\n  width: 75px; }\n"; });
define('text!showcases/beatmaker/components/knob.html', ['module'], function(module) { module.exports = "<template><p style=\"\" class=\"${canvas?'mdl-color-text--white':''}\">${label}</p><input type=range class=preset1 min=${min} max=${max} value.bind=val data-anglerange=\"${range || 280}\" data-width=60 data-height=60 data-angleoffset=\"${offset || 220}\" data-fgcolor=#2196f3 data-labels=${labels} step=1 data-bgcolor=#fff></template>"; });
define('text!showcases/beatmaker/synth/styles/synth.css', ['module'], function(module) { module.exports = "section {\n  background: #eee; }\n\n.tabs .indicator {\n  background-color: #2196f3; }\n\n#filter {\n  height: 100%; }\n\n.synth-octave {\n  color: #fff;\n  float: right;\n  line-height: 24px; }\n\nknob p {\n  text-align: center; }\n\nknob div {\n  margin: 0 auto; }\n\nknob > p {\n  margin-bottom: 7px !important; }\n\nequalizer div.b-radius-card, compressor div.b-radius-card, delay div.b-radius-card {\n  height: 100%; }\n\nequalizer p {\n  color: #fff; }\n\n#synthfilter p {\n  color: #fff; }\n\n.synth-container {\n  overflow: hidden; }\n\n.effects-container {\n  overflow: auto;\n  position: absolute;\n  height: 81%; }\n\n.effects-container > div {\n  overflow-y: auto;\n  height: 100%;\n  overflow-x: hidden;\n  position: relative; }\n\n.key-container > div {\n  height: 100%;\n  position: relative;\n  padding-top: 0px; }\n\n.key-container {\n  position: absolute;\n  height: 19%;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  overflow: hidden;\n  padding: 0px 8px;\n  margin-left: 4px;\n  margin-right: 4px; }\n  .key-container .key.white {\n    height: 95%; }\n  .key-container .key.black-key {\n    height: 50%; }\n    .key-container .key.black-key h1 {\n      line-height: 0.8; }\n\n.key {\n  box-sizing: border-box;\n  width: 9.090% !important;\n  display: inline-block;\n  padding: 0 !important;\n  overflow: visible;\n  float: left; }\n\n.key h1 {\n  text-align: center;\n  margin: 0;\n  font-size: 2.2rem; }\n\n.key div {\n  margin: 0 0.3rem 0 0;\n  height: 100%;\n  border-radius: 0px 0px 5px 5px;\n  display: block;\n  font-size: 12px;\n  transition: box-shadow .25s; }\n\n.key:last-child > div {\n  margin-right: 0; }\n\n.black-key > div > h1.hide-on-large-only {\n  font-size: 120%; }\n\n.key.white {\n  height: 220px;\n  position: relative; }\n  .key.white h1 {\n    color: #000;\n    position: relative;\n    top: 55%; }\n  .key.white div {\n    background-color: #fff; }\n\n.key.white.play div {\n  background: #dddddd; }\n\n.key.black-key {\n  height: 148px;\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  background: transparent !important;\n  left: -4.5455% !important;\n  margin-right: -9.091%;\n  padding: 0 4px !important; }\n  .key.black-key div {\n    display: inline-block;\n    margin: 0 0.25rem;\n    outline: none;\n    background-color: #000;\n    width: 100%; }\n  .key.black-key h1 {\n    color: #fff;\n    position: relative;\n    top: 10%; }\n\n.key.black-key.play {\n  background: #717171; }\n\n.key.black-key >\n.key-info {\n  list-style: none;\n  margin: 0px;\n  padding: 0px;\n  text-align: center; }\n\n.key-item {\n  height: 100%;\n  padding-top: 105%; }\n\n.key-item > a {\n  padding-top: 50%; }\n\n.parameter-holder {\n  padding: 0;\n  margin: 0 0.75rem; }\n\nform.col.m3.s12,\nform.col.m4,\nform.col.m4.s12,\nform.col.m5,\nform.col.m6.s12 {\n  padding-left: 0;\n  padding-right: 0.75rem;\n  margin-bottom: 0.75rem; }\n  form.col.m3.s12 .row,\n  form.col.m4 .row,\n  form.col.m4.s12 .row,\n  form.col.m5 .row,\n  form.col.m6.s12 .row {\n    padding: 0.75rem 0.375rem; }\n  form.col.m3.s12 .col,\n  form.col.m4 .col,\n  form.col.m4.s12 .col,\n  form.col.m5 .col,\n  form.col.m6.s12 .col {\n    text-align: center;\n    padding: 0 0.375rem; }\n\n@media (max-height: 420px) and (orientation: landscape) {\n  .effects-container {\n    height: 79%; }\n  .key-container {\n    height: 19% !important;\n    padding: 0px;\n    margin-left: 0px;\n    margin-right: 0px; }\n  .key-container {\n    bottom: 5px; }\n  .key h1 {\n    font-size: 1.7rem; }\n  .key.black-key h1 {\n    top: 5% !important; }\n  .key.white h1 {\n    top: 32%; } }\n\n@media only screen and (max-width: 600px) {\n  .key-container {\n    padding: 0px;\n    margin-left: 0px;\n    margin-right: 0px; }\n  .key div {\n    margin: 0 0.05rem; } }\n"; });
define('text!showcases/beatmaker/components/mute-button.html', ['module'], function(module) { module.exports = "<template><a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=width:100%;margin-top:33px click.delegate=\"muted=!muted\"><template if.bind=muted><i class=\"material-icons blue-text\" style=vertical-align:sub>volume_up</i></template><template if.bind=!muted><i class=\"material-icons red-text\" style=vertical-align:sub>volume_off</i></template></a></template>"; });
define('text!showcases/beatmaker/components/slider.html', ['module'], function(module) { module.exports = "<template><p class=slider-label>${label}</p><div class=\"slider-knob mdl-shadow--2dp ${canvas?'mdl-color--green-A400':'mdl-color--blue-500'}\" style=\"\" click.trigger=toggleSlider($event)><span style=margin-top:8px;display:inline-block><span if.bind=\"label!='Wave' && label !='Octave'\">${val}</span><template if.bind=\"label==='Wave'\"><span>${waves[val]}</span></template><template if.bind=\"label==='Octave'\"><span>${val-3}</span></template></span></div><div class=\"slider ${canvas?'green-handle':''}\"></div><div class=\"slider-overlay ${isOpen?'open':''}\" click.trigger=toggleSlider($event)></div></template>"; });
define('text!showcases/beatmaker/components/sound-wave.html', ['module'], function(module) { module.exports = "<template><canvas width=50 height=\"\" id=canv style=z-index:-1 class=canvas css=\"${background?'position:absolute;z-index:-1':''}\"></canvas></template>"; });
define('text!showcases/beatmaker/components/switch.html', ['module'], function(module) { module.exports = "<template><div class=switch click.delegate=toggle()><label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=switch-1><input type=checkbox id=switch-1 class=mdl-switch__input><span class=mdl-switch__label>On</span></label></div></template>"; });
define('text!showcases/beatmaker/effects/compressor.html', ['module'], function(module) { module.exports = "<template><require from=../components/knob></require><require from=../components/slider></require><require from=../components/switch></require><div class=\"mdl-shadow--2dp b-radius-card mdl-color--blue-grey-100\"><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>${mode=='sidechain'?'Sidechain ':''}Compressor<switch class=right switched.two-way=comp[mode].active click.delegate=toggleEffect()></switch></p></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Attack val.two-way=comp[mode].attack inline.bind=true channel=compAttack:${mode} preset.one-time=comp[mode].attack></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Thrsh. val.two-way=comp[mode].threshold inline.bind=true channel=compThresh:${mode} preset.one-time=comp[mode].threshold></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=1 max=20 label=Ratio val.two-way=comp[mode].ratio inline.bind=true channel=compRatio:${mode} preset.one-time=comp[mode].ratio></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Rls. val.two-way=comp[mode].release inline.bind=true channel=compRelease:${mode} preset.one-time=comp[mode].release></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=40 label=Knee val.two-way=comp[mode].knee inline.bind=true channel=compKnee:${mode} preset.one-time=comp[mode].knee></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--3-col-phone mdl-cell--2-col-tablet\" if.bind=\"mode==='sidechain'\"><label for=\"\" style=position:relative;top:0>Source</label><select name=\"\" id=\"\" class=mdl-textfield__input disabled style=\"background:0 0\"><option value=kick selected>kick</option></select></div></div></div></template>"; });
define('text!showcases/beatmaker/effects/delay.html', ['module'], function(module) { module.exports = "<template><require from=../components/slider></require><require from=../components/switch></require><div class=\"mdl-shadow--2dp b-radius-card mdl-color--lime-400\"><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>Delay<switch class=right switched.two-way=ds[mode].active click.delegate=toggleEffect()></switch></p></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Time val.two-way=ds[mode].dTime channel=delayTime preset.one-time=ds[mode].dTime></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Feedback val.two-way=ds[mode].dFeed channel=delayFeedback preset.one-time=ds[mode].dFeed></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Wet/Dry val.two-way=ds[mode].dWet channel=delayWet preset.one-time=ds[mode].dWet></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"></div></div></div></template>"; });
define('text!showcases/beatmaker/effects/equalizer.html', ['module'], function(module) { module.exports = "<template><require from=../components/slider></require><require from=../components/switch></require><div class=\"mdl-shadow--2dp b-radius-card mdl-color--red-300\"><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>Equalizer<switch class=right switched.two-way=eq[mode].active click.delegate=toggleEffect()></switch></p></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=80hz val.two-way=eq[mode].eq1 channel=eq1 preset.one-time=eq[mode].eq1></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=350hz val.two-way=eq[mode].eq2 channel=eq2 preset.one-time=eq[mode].eq2></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=720hz val.two-way=eq[mode].eq3 channel=eq3 preset.one-time=eq[mode].eq3></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=1.6khz val.two-way=eq[mode].eq4 channel=eq4 preset.one-time=eq[mode].eq4></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=5khz val.two-way=eq[mode].eq5 channel=eq5 preset.one-time=eq[mode].eq5></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=80 label=10khz val.two-way=eq[mode].eq6 channel=eq6 preset.one-time=eq[mode].eq6></slider></div></div></div></template>"; });
define('text!showcases/beatmaker/sequencer/sequencer.html', ['module'], function(module) { module.exports = "<template><require from=../components/sound-wave></require><require from=./styles/sequencer.css></require><require from=../components/knob></require><require from=../components/sound-wave></require><require from=../components/slider></require><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col\"><div class=\"b-radius-card mdl-color--blue-500 mdl-shadow--2dp\" id=sequencer-controller><div class=mdl-grid><div class=\"mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--2-col-phone\" style=padding-top:13px><button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ${!mixer?'mdl-color-text--white':'mdl-color-text--green-A400'} mdl-color--grey-200\" style=margin-right:15px click.delegate=handlePlay()><template if.bind=!ds.playing><i class=\"material-icons mdl-color-text--green-A400\">play_arrow</i></template><template if.bind=ds.playing><i class=\"material-icons mdl-color-text--red-500\">stop</i></template></button><button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ${!mixer?'mdl-color-text--grey-400':'mdl-color-text--green-A400'} mdl-color--grey-200\" click.delegate=toggleMixer()><i class=material-icons>equalizer</i></button></div><div class=\"mdl-cell mdl-cell--1-col mdl-cell--2-col-tablet mdl-cell--1-col-phone\"><slider min=0 max=100 label=Volume val.two-way=ds.volume canvas.bind=true preset.one-time=volume></slider></div><div class=\"mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet mdl-cell--1-col-phone\"><slider min=0 max=220 label=Tempo val.two-way=ds.tempo canvas.bind=true channel=tempo preset=120></slider></div></div></div></div><div class=\"mdl-cell mdl-cell--12-col\"><table class=striped id=sequencer-notes><thead style=border-bottom:0><tr><td style=width:5.88%></td><td repeat.for=\"i of 16\" style=width:5.88%><div class=\"${ds.notePlaying-1==i?'mdl-color--blue-300':'mdl-color--white'} lighten-2\" style=height:5px></div></td></tr></thead><tbody if.bind=!mixer><tr repeat.for=\"drum of ds.drums\"><td style=width:5.88%;cursor:pointer;height:36px class=mdl-color-text--blue-500 click.trigger=playSample(drum.sound)>${drum.name}</td><td class=\"${ds.scheduled[$parent.$index][i]==true?'mdl-color--blue-500':'mdl-color--green-A400'}\" repeat.for=\"i of 16\" style=\"width:5.88%;border-left:1px solid #fff;border-bottom:1px solid #fff;min-height:36px;cursor:pointer\" click.trigger=\"addNote($event, $parent.$index, i)\"></td></tr></tbody></table><div class=drum-mixer if.bind=mixer id=sequencer-mixer><ul><li repeat.for=\"drum of ds.drums\"><div style=cursor:pointer;height:81px;text-align:center class=mdl-color-text--blue-500 click.trigger=playSample(drum.sound)>${drum.name}</div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=80 label=Volume preset.one-time=drum.volume val.two-way=drum.volume></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=80 label=Pitch preset.one-time=drum.pitch val.two-way=drum.pitch></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=80 label=High preset.one-time=drum.high val.two-way=drum.high></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min.one-time=drum.range.high[0] max.one-time=drum.range.high[1] label=\"High Freq\" preset.one-time=drum.highFreq val.two-way=drum.highFreq></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=80 label=Mid preset.one-time=drum.mid val.two-way=drum.mid></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min.one-time=drum.range.mid[0] max.one-time=drum.range.mid[1] label=\"Mid Freq\" preset.one-time=drum.midFreq val.two-way=drum.midFreq></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=80 label=Low preset.one-time=drum.low val.two-way=drum.low></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min.one-time=drum.range.low[0] max.one-time=drum.range.low[1] label=\"Low Freq\" preset.one-time=drum.lowFreq val.two-way=drum.lowFreq></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=200 label=Cutoff preset.one-time=drum.cutoff val.two-way=drum.cutoff></slider></div></div><div><div class=\"input-field inline\" style=margin-top:0><slider min=0 max=20 label=Q preset.one-time=drum.Q val.two-way=drum.Q></slider></div></div><div><div class=\"input-field inline\" style=\"\"><label for=\"\" style=position:relative;top:0>Filter Type</label><select name=\"\" id=\"\" class=browser-default value.bind=drum.filterType><option value=lowpass>lowpass</option><option value=highpass>highpass</option><option value=bandpass>bandpass</option><option value=lowshelf>lowshelf</option><option value=highshelf>highshelf</option><option value=peaking>peaking</option><option value=notch>notch</option><option value=allpass>allpass</option></select></div></div></li></ul></div></div></div></template>"; });
define('text!showcases/beatmaker/synth/piano.html', ['module'], function(module) { module.exports = "<template><require from=./components/piano-key></require><require from=../components/sound-wave></require><require from=../components/mute-button></require><require from=../components/slider></require><require from=./styles/synth.css></require><require from=./components/oscillator></require><require from=../effects/compressor></require><require from=../effects/delay></require><require from=../effects/equalizer></require><div class=synth-container><div class=effects-container><div><div class=mdl-grid><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\"><oscillator type=Lfo osc.two-way=synth.lfoData preset.one-time=synth.lfoData></oscillator></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\" repeat.for=\"osc of synth.oscillators\"><oscillator osc.two-way=osc index.bind=$index type=Oscillator preset.one-time=synth.oscPresets[$index]></oscillator></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--4-col-tablet\"><div id=filter class=\"mdl-shadow--2dp mdl-color--orange-300 b-radius-card\"><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>Filter</p></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=200 label=Cutoff val.two-way=synth.lpfCutoff channel=lpfCutoff preset.one-time=synth.lpfCutoff></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=20 label=Q channel=lpfQ val.two-way=synth.lpfQ preset.one-time=synth.lpfQ></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Mod channel=lpfMod val.two-way=synth.lpfMod preset.one-time=synth.lpfMod></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Env val.two-way=synth.lpfEnv preset.one-time=synth.lpfEnv></slider></div><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=\"no-bottom-margin no-bottom-margin\">Envelope</p></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Attack val.two-way=synth.lpfA preset.one-time=synth.lpfA></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Decay val.two-way=synth.lpfD preset.one-time=synth.lpfD></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Sustain val.two-way=synth.lpfS preset.one-time=synth.lpfS></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Release val.two-way=synth.lpfR preset.one-time=synth.lpfR></slider></div></div></div></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--4-col-tablet\" id=synth><div id=synthfilter class=\"mdl-shadow--2dp b-radius-card\"><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin style=float:left>Synth</p><div class=synth-octave>Octave: ${synth.synthOctave}<button class=\"mdl-button mdl-js-button mdl-button--icon\" style=\"\" click.delegate=\"synth.changeSynthOctave('up')\"><i class=material-icons>add</i></button><button class=\"mdl-button mdl-js-button mdl-button--icon\" click.delegate=\"synth.changeSynthOctave('down')\"><i class=material-icons>remove</i></button></div></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Drive val.two-way=synth.lpfA canvas.bind=true preset.one-time=synth.lpfA></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Reverb val.two-way=synth.lpfD canvas.bind=true preset.one-time=synth.lpfD></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider id=soundwave min=0 max=100 label=Volume val.two-way=synth.masterVol channel=synthvol canvas.bind=true preset.one-time=synth.masterVol></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet text-center\"><p style=margin-bottom:0>Visualizer</p><button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ${ab.showVisualizer?'mdl-color-text--green-A400 mdl-color--white':'mdl-color--green-A400 mdl-color-text--white'}\" css=\"width:42px;height:42px;min-width:42px;border:3px solid ${ab.showVisualizer?'#00e676;':'#fff;'}\" click.trigger=\"ab.showVisualizer=!ab.showVisualizer\" id=visualizer><i class=material-icons>graphic_eq</i></button></div><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>Envelope</p></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Attack val.two-way=synth.envA canvas.bind=true preset.one-time=synth.envA></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Decay val.two-way=synth.envD canvas.bind=true preset.one-time=synth.envD></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Sustain val.two-way=synth.envS canvas.bind=true preset.one-time=synth.envS></slider></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Release val.two-way=synth.envR canvas.bind=true preset.one-time=synth.envR></slider></div></div></div><sound-wave ab.bind=ab canvas-id=synthfilter if.bind=ab.showVisualizer></sound-wave></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\"><equalizer mode=synth></equalizer></div><div class=\"mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\"><delay mode=synth></delay></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\"><compressor mode=synth></compressor></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--12-col-phone mdl-cell--8-col-tablet\"><compressor mode=sidechain></compressor></div></div></div></div><div class=\"key-container b-radius-card\"><div><piano-key class=\"${note.color?'white'+$index:'black'+$index}\" repeat.for=\"note of synth.notes\" playing.bind=note.isPlaying index.bind=$index assigned.bind=note.assigned key.bind=note containerless></piano-key></div></div></div></template>"; });
define('text!showcases/beatmaker/synth/components/oscillator.html', ['module'], function(module) { module.exports = "<template><require from=../../components/knob></require><require from=../../components/slider></require><div class=\"mdl-shadow--2dp b-radius-card ${type==='Lfo'?'mdl-color--deep-orange-400':'mdl-color--blue-grey-100'}\"><template if.bind='type!==\"Lfo\"'><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>${type + ' ' + (index+1)}</p></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Mix val.two-way=osc.volume offset=222 channel=osc-vol${index+1} preset.one-time=preset.volume></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=7 label=Octave val.two-way=osc.octave channel=osc-oct${index+1} preset.one-time=osc.octave></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=3 label=Wave val.two-way=osc.wave channel=osc-wave${index+1} preset.one-time=preset.wave></slider></div><div class=\"mdl-cell mdl-cell--6-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Detune val.two-way=osc.detune offset=222 channel=osc-det${index+1} preset.one-time=preset.detune></slider></div></div></template><template if.bind='type===\"Lfo\"'><div class=mdl-grid><div class=\"mdl-cell mdl-cell--12-col no-bottom-margin card-title\"><p class=no-bottom-margin>Lfo</p></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--2-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=20 label=Frequency val.two-way=osc.freq offset=222 preset.one-time=preset.freq channel=lfofreq></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--2-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=3 label=Wave val.two-way=osc.wave channel=lfowave preset.one-time=preset.wave></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--2-col-tablet\"><slider min=0 max=100 label=Osc1 val.two-way=osc.osc1 offset=222 preset.one-time=preset.osc1></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--2-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=100 label=Osc2 val.two-way=osc.osc2 offset=222 preset.one-time=preset.osc2></slider></div><div class=\"mdl-cell mdl-cell--4-col mdl-cell--1-col-phone mdl-cell--1-col-tablet\"><slider min=0 max=100 label=Osc3 val.two-way=osc.osc3 offset=222 preset.one-time=preset.osc3></slider></div></div></template></div></template>"; });
define('text!showcases/beatmaker/synth/components/piano-key.html', ['module'], function(module) { module.exports = "<template><div class=\"col s1 key ${key.color===true?'white':'black-key'}\" tabindex=0 mousedown.trigger=play() mouseup.delegate=stop() touchstart.trigger=play() touchend.delegate=stop()><div class=\"${playing?' mdl-shadow--2dp mdl-color--grey':' mdl-shadow--4dp'}\"><h1 class=\"mdl-cell--hide-phone mdl-cell--hide-tablet\">${key.key}</h1><h1 class=mdl-cell--hide-desktop>${key.note}</h1></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map