define('about',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function About() {
    _classCallCheck(this, About);
  };
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
define('main',['exports', './environment', 'jquery', 'materialize-css'], function (exports, _environment, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _jquery2 = _interopRequireDefault(_jquery);

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
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }
    aurelia.use.plugin('aurelia-materialize-bridge', function (b) {
      return b.useAll();
    });
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

  var BeatMaker = exports.BeatMaker = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus), _dec(_class = function BeatMaker(ab) {
    _classCallCheck(this, BeatMaker);

    this.ab = ab;
  }) || _class);
});
define('showcases/beatmaker/components/audio-bus',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioBus = exports.AudioBus = function AudioBus() {
    _classCallCheck(this, AudioBus);

    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audio.createAnalyser();
    this.analyser.connect(this.audio.destination);
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.input = this.audio.createGain();
    this.output = this.audio.createGain();
    this.input.connect(this.output);
    this.output.connect(this.analyser);
  };
});
define('showcases/beatmaker/components/knob',["exports", "aurelia-framework", "jquery-knob"], function (exports, _aureliaFramework) {
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

  console.log(Knob);
  var KnobCustomElement = exports.KnobCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function KnobCustomElement(e) {
      _classCallCheck(this, KnobCustomElement);

      _initDefineProp(this, "min", _descriptor, this);

      _initDefineProp(this, "max", _descriptor2, this);

      _initDefineProp(this, "label", _descriptor3, this);

      _initDefineProp(this, "val", _descriptor4, this);

      _initDefineProp(this, "labels", _descriptor5, this);

      _initDefineProp(this, "offset", _descriptor6, this);

      _initDefineProp(this, "range", _descriptor7, this);

      this.element = e;
      if (this.labels === null) {
        this.labels = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
      }
    }

    KnobCustomElement.prototype.attached = function attached() {

      this.knob = new Knob(this.element.children[1], new Ui.P1());
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
  })), _class2)) || _class);


  Ui.P1 = function () {};

  Ui.P1.prototype = Object.create(Ui.prototype);

  Ui.P1.prototype.createElement = function () {
    "use strict";

    Ui.prototype.createElement.apply(this, arguments);
    this.addComponent(new Ui.Pointer({
      type: 'Rect',
      pointerWidth: 3,
      pointerHeight: this.width / 4,
      offset: this.width / 2 - this.width / 3.3 - this.width / 10
    }));

    this.addComponent(new Ui.Scale(this.merge(this.options, {
      drawScale: false,
      drawDial: true,
      radius: this.width / 2.6 })));

    var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
    this.el.node.appendChild(circle.node);
    this.el.node.setAttribute("class", "p1");
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
        _this.canvas.width = $(_this.element.parentElement).width();
        _this.canvas.height = $('#' + _this.canvasId).height() - 10;
      });
    }

    SoundWave.prototype.attached = function attached() {
      if (this.background) {
        this.bgColor = "#eee";
        this.fgColor = "#2196f3";
      } else {
        this.bgColor = "#2196f3";
        this.fgColor = "#fff";
      }
      console.log(this.canvasId);
      this.canvas = this.element.children[0];
      this.canvasCtx = this.canvas.getContext('2d');

      this.canvas.width = $(this.element.parentElement).width();
      this.canvas.height = $('#' + this.canvasId).height() - 10;

      console.log(this.element.parentElement);
      this.draw();
    };

    SoundWave.prototype.draw = function draw() {
      var drawVisual = requestAnimationFrame(this.draw.bind(this));
      this.ab.analyser.getByteTimeDomainData(this.ab.dataArray);
      this.canvasCtx.fillStyle = this.bgColor;
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.lineWidth = 2;
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
define('showcases/beatmaker/effects/delay',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Delay = exports.Delay = function () {
    function Delay() {
      _classCallCheck(this, Delay);

      this.dTime = 25;
      this.dFeed = 50;
      this.dWet = 50;
    }

    Delay.prototype.createDelay = function createDelay() {
      this.delay = this.audio.createDelay(5.0);
      this.feedback = this.audio.createGain();
      this.wetLevel = this.audio.createGain();
      this.delay.delayTime.value = this.dTime / 100;
      this.feedback.gain.value = this.dFeed / 100;
      this.wetLevel.gain.value = this.dWet / 100;
    };

    return Delay;
  }();
});
define('showcases/beatmaker/effects/equalizer',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Equalizer = exports.Equalizer = function () {
    function Equalizer() {
      _classCallCheck(this, Equalizer);

      this.eq1 = 0;
      this.eq2 = 0;
      this.eq3 = 0;
      this.eq4 = 0;
      this.eq5 = 0;
    }

    Equalizer.prototype.createEq = function createEq() {
      this.eq80 = this.audio.createBiquadFilter();
      this.eq350 = this.audio.createBiquadFilter();
      this.eq720 = this.audio.createBiquadFilter();
      this.eq16k = this.audio.createBiquadFilter();
      this.eq5k = this.audio.createBiquadFilter();
      this.eq80.frequency.value = 80;
      this.eq80.type = "lowshelf";
      this.eq80.gain.value = this.eq1;
      this.eq350.frequency.value = 350;
      this.eq350.type = "peaking";
      this.eq350.gain.value = this.eq2;
      this.eq720.frequency.value = 720;
      this.eq720.type = "peaking";
      this.eq720.gain.value = this.eq3;
      this.eq16k.frequency.value = 1600;
      this.eq16k.type = "peaking";
      this.eq16k.gain.value = this.eq4;
      this.eq5k.frequency.value = 5000;
      this.eq5k.type = "highshelf";
      this.eq5k.gain.value = this.eq5;
      this.eq80.connect(this.eq350);
      this.eq350.connect(this.eq720);
      this.eq720.connect(this.eq16k);
      this.eq16k.connect(this.eq5k);
      this.eq5k.connect(this.dInput);
    };

    return Equalizer;
  }();
});
define('showcases/beatmaker/sequencer/sequencer',["exports", "aurelia-framework", "aurelia-fetch-client", "../components/audio-bus"], function (exports, _aureliaFramework, _aureliaFetchClient, _audioBus) {
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

  var SequencerCustomElement = exports.SequencerCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _audioBus.AudioBus), _dec(_class = function () {
    function SequencerCustomElement(http, ab) {
      _classCallCheck(this, SequencerCustomElement);

      this.http = http;
      this.http.configure(function (config) {
        config.useStandardConfiguration().withDefaults({
          headers: {
            "Content-Type": "audio/mpeg"
          }
        });
      });
      this.canvas = 'sequencer';
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
      this.volume = 100;
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
      this.gain.value = 1.0;
    };

    SequencerCustomElement.prototype.loadSample = function loadSample(type, i) {
      var _this = this;

      this.http.fetch("audio/roland-tr-33/" + type + ".wav").then(function (res) {
        return res.arrayBuffer();
      }).then(function (res) {
        _this.audio.decodeAudioData(res, function (buffer) {
          _this.drums[i].sound = buffer;
        });
      });
    };

    SequencerCustomElement.prototype.playSound = function playSound(buffer, time) {
      var src = this.audio.createBufferSource();
      console.log(src);
      src.buffer = buffer;
      src.connect(this.gain);
      this.gain.connect(this.ab.input);
      this.gain.gain.value = this.volume / 5;
      console.log(this.gain);
      src.start(time);
    };

    SequencerCustomElement.prototype.playSample = function playSample(buffer) {
      var src = this.audio.createBufferSource();
      src.connect(this.gain);

      this.gain.connect(this.ab.input);
      this.gain.gain.value = this.volume / 5;
      console.log(this.gain);
      src.start(0);
      this.src.disconnect(1);
    };

    SequencerCustomElement.prototype.changeTempo = function changeTempo(up) {
      if (up) {
        this.tempo += 4;
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
      var index = this.drums[i].scheduled.indexOf(ii);
      if (index > -1) {
        this.drums[i].scheduled.splice(index, 1);
        e.srcElement.classList.remove('blue');
        e.srcElement.classList.add('green');
      } else {
        this.drums[i].scheduled.push(ii);
        e.srcElement.classList.remove('green');
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

        for (var i = 0; i < this.drums.length; i++) {
          if (this.drums[i].scheduled.indexOf(this.rhythmIndex) > -1) {
            this.playSound(this.drums[i].sound, contextPlayTime);
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
define('showcases/beatmaker/synth/piano',['exports', '../components/audio-bus', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _audioBus, _aureliaEventAggregator, _aureliaFramework) {
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

  var Piano = exports.Piano = (_dec = (0, _aureliaFramework.inject)(_audioBus.AudioBus, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Piano(ab, ea) {
      var _this = this;

      _classCallCheck(this, Piano);

      this.ab = ab;
      this.ea = ea;
      this.audio = this.ab.audio;
      this.canvas = "piano";
      this.octaves = [-3, -2, -1, 0, 1, 2, 3];
      this.waves = ['sine', 'sawtooth', 'square', 'triangle'];
      this.oscillators = createVoices();
      this.lfoData = {
        wave: 1,
        detune: 0,
        osc1: 20,
        osc2: 20,
        freq: 2.1,
        type: 'Lfo',
        modType: 0
      };
      this.masterVol = 50;
      this.modMult = 10;

      this.master = this.audio.createGain();
      this.master.gain.value = 1.0;
      this.effectOutput = this.audio.createGain();

      this.master.connect(this.effectOutput);
      this.effectOutput.gain.value = 2.0;
      this.effectOutput.connect(this.ab.input);

      this.lpfCutoff = 50;
      this.lpfQ = 7.0;
      this.lpfMod = 21;
      this.lpfEnv = 56;

      this.envA = 2;
      this.envD = 15;
      this.envS = 68;
      this.envR = 5;

      this.lpfA = 5;
      this.lpfD = 6;
      this.lpfS = 5;
      this.lpfR = 7;

      this.notes = [{ note: 'c', hz: 261.626, color: true, key: 'a', isPlaying: false }, { note: 'c#', hz: 277.183, color: false, key: 'w', isPlaying: false }, { note: 'd', hz: 293.66, color: true, key: 's', isPlaying: false }, { note: 'd#', hz: 311.127, color: false, key: 'e', isPlaying: false }, { note: 'e', hz: 329.628, color: true, key: 'd', isPlaying: false }, { note: 'f', hz: 349.228, color: true, key: 'f', isPlaying: false }, { note: 'f#', hz: 369.994, color: false, key: 't', isPlaying: false }, { note: 'g', hz: 391.995, color: true, key: 'g', isPlaying: false }, { note: 'g#', hz: 415.305, color: false, key: 'y', isPlaying: false }, { note: 'a', hz: 440, color: true, key: 'h', isPlaying: false }, { note: 'a#', hz: 466.164, color: false, key: 'u', isPlaying: false }, { note: 'b', hz: 493.883, color: true, key: 'j', isPlaying: false }, { note: 'c', hz: 532.251, color: true, key: 'k', isPlaying: false }, { note: 'c#', hz: 554.365, color: false, key: 'o', isPlaying: false }, { note: 'd', hz: 587.33, color: true, key: 'l', isPlaying: false }, { note: 'd#', hz: 622.254, color: false, key: 'p', isPlaying: false }, { note: 'e', hz: 659.255, color: true, key: ';', isPlaying: false }, { note: 'f', hz: 698.456, color: true, key: "'", isPlaying: false }];
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

    Piano.prototype.attached = function attached() {};

    Piano.prototype.changeDelay = function changeDelay() {
      this.delay.delayTime.value = this.dTime / 100;
    };

    Piano.prototype.changeFeed = function changeFeed() {
      this.feedback.gain.value = this.dFeed / 100;
    };

    Piano.prototype.changeWet = function changeWet() {
      this.wetLevel.gain.value = this.dWet / 100;
    };

    Piano.prototype.changeEq = function changeEq() {
      this.eq80.gain.value = this.eq1;
      this.eq350.gain.value = this.eq2;
      this.eq720.gain.value = this.eq3;
      this.eq16k.gain.value = this.eq4;
      this.eq5k.gain.value = this.eq5;
    };

    Piano.prototype.activate = function activate(a, b, c) {};

    Piano.prototype.canDeactivate = function canDeactivate() {};

    Piano.prototype.attached = function attached() {};

    Piano.prototype.play = function play(e) {
      var s = e.key;
      console.log(e);
      for (var i in this.notes) {
        if (s == this.notes[i].key || s == this.notes[i].key) {
          this.playKey(i);
        }
      }
      console.log(this.output);
    };

    Piano.prototype.stop = function stop(e) {
      var s = e.key;
      for (var i in this.notes) {
        if (s == this.notes[i].key || s == this.notes[i].key) {
          this.stopKey(i);
        }
      }
    };

    Piano.prototype.playKey = function playKey(i) {
      if (this.notes[i].isPlaying == false) {
        this.lfo = this.audio.createOscillator();
        this.lfo.type = this.waves[this.lfoData.wave];
        this.lfo.frequency.value = this.lfoData.freq;
        this.lfo.detune.value = this.lfoData.detune;
        this.filter1 = this.ab.audio.createBiquadFilter();
        this.filter1.type = "lowpass";
        this.filter1.Q.value = this.lpfQ;
        this.filter1.frequency.value = this.lpfCutoff * 2000;

        this.master.gain.value = this.masterVol / 5;
        this.filter2 = this.ab.audio.createBiquadFilter();
        this.filter2.type = "lowpass";
        this.filter2.Q.value = this.lpfQ;
        this.filter2.frequency.value = this.lpfCutoff * 2000;
        for (var ii = 0; ii < this.oscillators.length; ii++) {

          this.notes[i]['g' + ii] = this.ab.audio.createGain();
          this.notes[i]['o' + ii] = this.ab.audio.createOscillator();
          this.notes[i]['o' + ii].detune.value = this.oscillators[ii].detune - 50;
          console.log(this.oscillators[ii].octave - 3);
          if (this.oscillators[ii].octave - 3 == 0) {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz;
            console.log(true);
          } else if (this.oscillators[ii].octave - 3 > 0) {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz * 2 * (this.oscillators[ii].octave - 3);
            console.log(false);
          } else {
            this.notes[i]['o' + ii].frequency.value = this.notes[i].hz * 2 / Math.abs(this.oscillators[ii].octave - 3);
            console.log(false);
          }
          this['lfoOscGain' + ii] = this.ab.audio.createGain();
          this.lfo.connect(this['lfoOscGain' + ii]);
          this['lfoOscGain' + ii].gain.value = this.lfoData['osc' + (ii + 1)] / 10;

          this.notes[i]['o' + ii].type = this.waves[this.oscillators[ii].wave];
          this.notes[i]['o' + ii].connect(this.notes[i]['g' + ii]);
          this.notes[i]['g' + ii].gain.value = 0.005 * this.oscillators[ii].volume;
          this.notes[i]['g' + ii].connect(this.filter1);
        }

        this.filter1.connect(this.filter2);
        this.modfilterGain = this.ab.audio.createGain();
        this.lfo.connect(this.modfilterGain);
        this.modfilterGain.gain.value = this.lpfMod * 24;
        this.modfilterGain.connect(this.filter1.detune);
        this.modfilterGain.connect(this.filter2.detune);

        this.envelope = this.ab.audio.createGain();
        this.filter2.connect(this.envelope);

        this.envelope.connect(this.master);

        var now = this.ab.audio.currentTime;
        var atkEnd = now + this.envA / 10.0;
        this.envelope.gain.value = 0.0;
        this.envelope.gain.setValueAtTime(0.0, now);
        this.envelope.gain.linearRampToValueAtTime(1.0, atkEnd);
        this.envelope.gain.setTargetAtTime(this.envS / 10.0, atkEnd, this.envD / 10.0 + 0.001);

        var filterAttackLevel = this.lpfEnv * 72;
        var filterSustainLevel = filterAttackLevel * this.lpfS / 100.0;
        var filterAttackEnd = this.lpfA / 10.0;

        if (!filterAttackEnd) {
          filterAttackEnd = 0.05;
        }

        this.filter1.detune.setValueAtTime(0, now);
        this.filter1.detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
        this.filter2.detune.setValueAtTime(0, now);
        this.filter2.detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
        this.filter1.detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 10.0 + 0.001);
        this.filter2.detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, this.lpfD / 10.0 + 0.001);

        for (var ii = 0; ii < 2; ii++) {
          this.notes[i]['o' + ii].start(0);
        }
        this.lfo.start(0);
        this.notes[i].isPlaying = true;
      }
    };

    Piano.prototype.stopKey = function stopKey(i) {
      if (this.notes[i].isPlaying == true) {
        var now = this.ab.audio.currentTime;
        var release = now + this.envR / 10.0;

        this.envelope.gain.cancelScheduledValues(now);
        this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
        this.envelope.gain.setTargetAtTime(0.0, now, this.envR / 10.0 + 0.001);
        this.filter1.detune.cancelScheduledValues(now);
        this.filter1.detune.setTargetAtTime(0, now, this.lpfR / 10.0 + 0.001);
        this.filter2.detune.cancelScheduledValues(now);
        this.filter2.detune.setTargetAtTime(0, now, this.lpfR / 10.0 + 0.001);

        for (var ii = 0; ii < this.oscillators.length; ii++) {
          this.notes[i]['g' + ii].gain.cancelScheduledValues(now);
          this.notes[i]['g' + ii].gain.setTargetAtTime(0, now, this.envR / 10.0 + 0.001);
          this.notes[i]['o' + ii].stop(now + this.envR / 3.0);
        }
        this.notes[i].isPlaying = false;
      }
    };

    return Piano;
  }()) || _class);

  function createVoices() {
    var arr = [];
    for (var i = 0; i < 2; i++) {
      arr.push(function () {
        var voice = {
          volume: 50,
          wave: 'sine',
          octave: 0,
          type: 'oscillator',
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

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

  var Oscillator = exports.Oscillator = (_class = function Oscillator() {
    _classCallCheck(this, Oscillator);

    _initDefineProp(this, 'wave', _descriptor, this);

    _initDefineProp(this, 'volume', _descriptor2, this);

    _initDefineProp(this, 'type', _descriptor3, this);

    _initDefineProp(this, 'octave', _descriptor4, this);

    _initDefineProp(this, 'freq', _descriptor5, this);

    _initDefineProp(this, 'detune', _descriptor6, this);

    _initDefineProp(this, 'gain', _descriptor7, this);

    _initDefineProp(this, 'osc1', _descriptor8, this);

    _initDefineProp(this, 'osc2', _descriptor9, this);

    _initDefineProp(this, 'modtype', _descriptor10, this);

    _initDefineProp(this, 'index', _descriptor11, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'wave', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'volume', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'octave', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'freq', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'detune', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'gain', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'osc1', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'osc2', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'modtype', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'index', [_aureliaFramework.bindable], {
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var PianoKeyCustomElement = exports.PianoKeyCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _piano.Piano, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function PianoKeyCustomElement(element, piano, ea) {
      _classCallCheck(this, PianoKeyCustomElement);

      _initDefineProp(this, 'key', _descriptor, this);

      _initDefineProp(this, 'assigned', _descriptor2, this);

      _initDefineProp(this, 'index', _descriptor3, this);

      this.element = element;
      this.ea = ea;
    }

    PianoKeyCustomElement.prototype.attached = function attached() {};

    PianoKeyCustomElement.prototype.play = function play() {
      console.log(this.index);
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
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'index', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!about.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"row\">\r\n    <div class=\"col s12 center-align\">\r\n      <md-card md-title=\"Front End Developer\" style=\"max-width:500px;margin:0 auto\" class=\"white\">\r\n        <p style=\"margin-bottom:5px;\">Website currently in development, so please pardon the mess.</p>\r\n        <p style=\"margin-bottom:10px;\">In the mean time, head on over to <a href=\"#/showcase\">showcase</a></p>\r\n        <p>Contact: justin@heyjust.in | <a href=\"https://www.linkedin.com/in/justin-stoner-95160487\">Linked In</a></p>\r\n      </md-card>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "body {\n  background-color: #eee; }\n\nnav .brand-logo,\n.brand-logo {\n  margin-left: 15px;\n  font-size: 18px; }\n\n[md-tabs] .waves-effect {\n  position: static; }\n\n.parallax-container {\n  height: 800px; }\n\n.b-radius-card {\n  border-radius: 0 0 2px 2px; }\n\n.showcase-tabs .indicator {\n  background: #2196f3 !important; }\n\n.showcase-tabs li a.active {\n  color: #2196f3 !important; }\n\n.showcase-tabs li a {\n  color: #343434 !important; }\n\n@media only screen and (max-width: 992px) {\n  nav .brand-logo {\n    left: initial !important;\n    -webkit-transform: none !important;\n    transform: none !important; } }\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"materialize-css/css/materialize.css\"></require>\n  <require from=\"./styles/main.css\"></require>\n  <md-colors md-primary-color=\"#2196f3\" md-accent-color=\"#009688\"></md-colors>\n  <div class=\"navbar-fixed\">\n    <md-navbar>\n      <a href=\"#/samples/navbar\" class=\"brand-logo\"><span>Justin Stoner</span></a>\n      <ul class=\"right\">\n        <li md-waves repeat.for=\"row of router.navigation\" class=\"${row.isActive?'active':''}\"><a href=\"${row.href}\">${row.title}</a></li>\n      </ul>\n    </md-navbar>\n  </div>\n  <router-view></router-view>\n</template>\n"; });
define('text!showcase.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul md-tabs class=\"showcase-tabs z-depth-1\" style=\"z-index:998;\">\r\n      <li md-waves=\"color: primary;\" repeat.for=\"row of router.navigation\"><a class=\"${row.isActive?'active':''}\" href=\"#tab_${$index+1}\">${row.title}</a></li>\r\n      <li md-waves><a href=\"#tab2\" class=\"disabled\">More coming soon...</a></li>\r\n    </ul>\r\n    <router-view></router-view>\r\n</template>\r\n"; });
define('text!work.html', ['module'], function(module) { module.exports = "<template></template>\r\n"; });
define('text!showcases/beatmaker/beat-maker.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./synth/piano\"></require>\r\n  <require from=\"./sequencer/sequencer\"></require>\r\n  <require from=\"./components/sound-wave\"></require>\r\n  <require from=\"./styles/main.css\"></require>\r\n  <!-- <sound-wave ab.bind='ab' canvas-id='beatmaker' style=\"\" background.bind=\"true\"></sound-wave> -->\r\n  <div style=\"\" id='beatmaker'>\r\n    <div class=\"row\" >\r\n\r\n      <piano></piano>\r\n      <sequencer></sequencer>\r\n    </div>\r\n  </div>\n  <svg>\n    <filter id=\"dropshadow\" height=\"150%\" width=\"150%\">\r\n  \t\t<feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"1\"/>\r\n  \t\t<feOffset dx=\"1\" dy=\"2\" result=\"offsetblur\"/>\r\n  \t\t<feFlood flood-color=\"rgba(0,0,0,0.4)\"/>\r\n  \t\t<feComposite in2=\"offsetblur\" operator=\"in\"/>\r\n  \t\t<feMerge>\r\n  \t\t\t<feMergeNode/>\r\n  \t\t\t<feMergeNode in=\"SourceGraphic\"/>\r\n  \t\t</feMerge>\r\n  \t</filter>\r\n      <filter id=\"inner-shadow\">\r\n\r\n          <!-- Shadow Offset -->\r\n          <feOffset dx=\"0\" dy=\"5\"></feOffset>\r\n\r\n          <!-- Shadow Blur -->\r\n          <feGaussianBlur stdDeviation=\"5\" result=\"offset-blur\"></feGaussianBlur>\r\n\r\n          <!-- Invert the drop shadow\r\n               to create an inner shadow -->\r\n          <feComposite operator=\"out\" in=\"SourceGraphic\" in2=\"offset-blur\" result=\"inverse\"></feComposite>\r\n\r\n          <!-- Color & Opacity -->\r\n          <feFlood flood-color=\"black\" flood-opacity=\"0.75\" result=\"color\"></feFlood>\r\n\r\n          <!-- Clip color inside shadow -->\r\n          <feComposite operator=\"in\" in=\"color\" in2=\"inverse\" result=\"shadow\"></feComposite>\r\n\r\n          <!-- Put shadow over original object -->\r\n          <feComposite operator=\"over\" in=\"shadow\" in2=\"SourceGraphic\"></feComposite>\r\n      </filter>\n  </svg>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/styles/main.css', ['module'], function(module) { module.exports = ".card-content .row {\n  margin: 0; }\n\n.card-left {\n  display: table-cell;\n  /*border-right: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right {\n  display: table-cell;\n  /*border-left: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right > div,\n.card-left > div {\n  height: 20%; }\n\nmd-card > .card {\n  background-color: inherit; }\n\n.input-field.inline.col.m4 {\n  text-align: center; }\n\nlabel.sm {\n  font-size: 0.8rem;\n  /*position: absolute !important;*/\n  top: -14px !important;\n  left: 0rem !important; }\n\n.select-wrapper {\n  margin-top: 0px; }\n\n.select-wrapper + label {\n  color: #343434 !important; }\n\n.p1 rect {\n  fill: #2196f3; }\n\n.p1 g polygon {\n  opacity: 1; }\n\n.p1 circle {\n  fill: #fff;\n  stroke: #2196f3;\n  stroke-width: 2;\n  -webkit-filter: url(#dropshadow);\n  filter: url(#dropshadow); }\n\n.p1 text {\n  font-size: 10px;\n  fill: rgba(0, 0, 0, 0.870588);\n  font-family: sans-serif;\n  font-weight: 300;\n  -webkit-transition: all .1s ease-in-out; }\n\n.p1 text.active {\n  font-size: 12px;\n  -webkit-transition: all .3s ease-in-out;\n  fill: #2196f3; }\n\nsvg:not(:root) {\n  overflow: visible; }\n\n.wave-shape {\n  width: 36px;\n  padding: 0; }\n\n#right form,\n#left form {\n  padding: 0; }\n\n#left form > div:first-child {\n  padding-left: 0; }\n\n#right form > div:last-child {\n  padding-right: 0; }\n\n.dropdown-content li > span {\n  color: #2196f3 !important; }\n\ninput:focus:not([type]):not([readonly]), input[type=\"text\"]:focus:not([readonly]), input[type=\"password\"]:focus:not([readonly]), input[type=\"email\"]:focus:not([readonly]), input[type=\"url\"]:focus:not([readonly]), input[type=\"time\"]:focus:not([readonly]), input[type=\"date\"]:focus:not([readonly]), input[type=\"datetime\"]:focus:not([readonly]), input[type=\"datetime-local\"]:focus:not([readonly]), input[type=\"tel\"]:focus:not([readonly]), input[type=\"number\"]:focus:not([readonly]), input[type=\"search\"]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3; }\n\ninput:not([type]):focus:not([readonly]) + label, input[type=text]:focus:not([readonly]) + label, input[type=password]:focus:not([readonly]) + label, input[type=email]:focus:not([readonly]) + label, input[type=url]:focus:not([readonly]) + label, input[type=time]:focus:not([readonly]) + label, input[type=date]:focus:not([readonly]) + label, input[type=datetime]:focus:not([readonly]) + label, input[type=datetime-local]:focus:not([readonly]) + label, input[type=tel]:focus:not([readonly]) + label, input[type=number]:focus:not([readonly]) + label, input[type=search]:focus:not([readonly]) + label, textarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #2196f3; }\n\ninput[type=\"range\"] + .thumb {\n  background: #2196f3; }\n\n.range-field.inline input[type=\"checkbox\"] {\n  margin-top: 10px; }\n\ninput[type=range]::-webkit-slider-thumb {\n  background-color: #2196f3; }\n\ninput[type=range]::-moz-range-thumb {\n  background-color: #2196f3; }\n\ninput[type=range]::-ms-thumb {\n  background-color: #2196f3; }\n\n.range-field.inline input {\n  width: 100%; }\n\n.range-field.inline label {\n  display: block;\n  text-align: left !important; }\n\n.mute-label {\n  color: #9e9e9e; }\n\ntd {\n  padding: 5px; }\n\nsection {\n  margin: 0; }\n\n.waves-effect.waves-blue .waves-ripple {\n  /*\r\n  The alpha value allows the text and background color\r\n  of the button to still show through.\r\n*/\n  background-color: rgba(3, 169, 244, 0.65); }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.pictureDetail {\n  max-width: 425px; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n.black0 {\n  margin-left: 24px; }\n\n.black2 {\n  margin-left: 48px; }\n\n.black5 {\n  margin-left: 48px; }\n\n.white-notes {\n  /*top:-89px;*/\n  position: relative;\n  margin-top: -90px;\n  z-index: 1; }\n\n.black-notes {\n  /*  position:absolute;*/\n  z-index: 2; }\n"; });
define('text!showcases/beatmaker/sequencer/styles/sequencer.css', ['module'], function(module) { module.exports = "form.col.s12 {\n  padding: 0;\n  margin-bottom: 0.75rem; }\n  form.col.s12 .row {\n    padding: 0.75rem; }\n"; });
define('text!showcases/beatmaker/synth/styles/synth.css', ['module'], function(module) { module.exports = "section {\n  background: #eee; }\n\nknob p {\n  text-align: center; }\n\nknob div {\n  margin: 0 auto; }\n\nknob > p {\n  margin-bottom: 7px !important; }\n\n.input-field {\n  margin-top: 0; }\n\n.key {\n  box-sizing: border-box;\n  width: 7.9%;\n  display: inline-block;\n  padding: 0 !important;\n  overflow: visible; }\n\n.key h1 {\n  text-align: center;\n  margin: 0;\n  font-size: 2.2rem; }\n\n.key div {\n  margin: 0 0.25rem;\n  height: 100%;\n  border-radius: 0px 0px 5px 5px;\n  font-size: 12px;\n  transition: box-shadow .25s; }\n\n.key.white {\n  height: 220px;\n  /*float:left;*/\n  position: relative; }\n  .key.white h1 {\n    color: #000;\n    padding-top: 11rem; }\n  .key.white div {\n    background-color: #fff; }\n\n.key.white.play div {\n  background: #dddddd; }\n\n.key.black-key {\n  height: 148px;\n  position: absolute;\n  z-index: 2;\n  text-align: center;\n  background: transparent !important;\n  margin-left: 3.5% !important;\n  padding: 0 4px !important; }\n  .key.black-key div {\n    display: inline-block;\n    margin: 0 0.25rem;\n    outline: none;\n    background-color: #000;\n    width: 100%; }\n  .key.black-key h1 {\n    color: #fff;\n    padding-top: 6rem; }\n\n.key.black-key.play {\n  background: #717171; }\n\n.key.black-key >\n.key-info {\n  list-style: none;\n  margin: 0px;\n  padding: 0px;\n  text-align: center; }\n\n.key-item {\n  height: 100%;\n  padding-top: 105%; }\n\n.key-item > a {\n  padding-top: 50%; }\n\n.parameter-holder {\n  padding: 0;\n  margin: 0 0.75rem; }\n\nform.col.m4,\nform.col.m5,\nform.col.m6 {\n  padding-left: 0;\n  margin-bottom: 0.75rem; }\n  form.col.m4 .row,\n  form.col.m5 .row,\n  form.col.m6 .row {\n    padding: 0.75rem; }\n  form.col.m4 .col,\n  form.col.m5 .col,\n  form.col.m6 .col {\n    text-align: center; }\n\nform.col.m4:last-child,\nform.col.m6:last-child,\nform.col.m5:last-child {\n  padding-right: 0; }\n\n@media only screen and (max-width: 600px) {\n  form.col.m4 {\n    padding: 0; } }\n"; });
define('text!showcases/beatmaker/components/knob.html', ['module'], function(module) { module.exports = "<template>\r\n  <p style=\"\" class=\"grey-text text-darken-1\">${label}</p>\r\n  <input type=\"range\" class=\"preset1\" min=\"${min}\" max=\"${max}\" value.bind=\"val\" data-anglerange=\"${range || 280}\" data-width=\"60\" data-height=\"60\" data-angleoffset=\"${offset || 220}\" data-fgColor=\"#2196f3\" data-labels=\"${labels}\" step='1' data-bgColor=\"#fff\"/>\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/mute-button.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=\"width:100%;margin-top:3px;\" click.delegate='muted=!muted'>\r\n      <template if.bind='muted'>\r\n        <i class=\"material-icons blue-text\" style=\"vertical-align:sub\">volume_up</i>\r\n      </template>\r\n      <template if.bind='!muted'>\r\n        <i class=\"material-icons red-text\" style=\"vertical-align:sub\">volume_off</i>\r\n      </template>\r\n    </a>\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/sound-wave.html', ['module'], function(module) { module.exports = "<template>\r\n  <canvas width=\"50\" height=\"\" id=''  class=\"canvas\" css=\"${background?'position:absolute;z-index:-1':''}\"></canvas>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/effects/delay.html', ['module'], function(module) { module.exports = "<template>\r\n  \r\n</template>\r\n"; });
define('text!showcases/beatmaker/effects/equalizer.html', ['module'], function(module) { module.exports = "<template>\r\n  \r\n</template>\r\n"; });
define('text!showcases/beatmaker/sequencer/sequencer.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"./styles/sequencer.css\"></require>\r\n    <require from=\"../components/knob\"></require>\r\n  <section class=\"au-animate col m12 l6\">\r\n\r\n    <div class=\"card\" id=\"sequencer\">\r\n      <!-- <sound-wave ab.bind='ab' canvas-id='sequencer' style=\"\"></sound-wave> -->\r\n      <div class=\"card-content\" style=\"padding:0.75rem\">\r\n        <div class=\"row\">\r\n          <form class=\"col s12\" style=\"margin-bottom:20px;\">\n            <div class=\"row grey lighten-3 z-depth-1 b-radius-card\">\n              <a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=\"padding:0;\" click.delegate='handlePlay()'>\n                <template if.bind='!playing'>\n                  <i class=\"material-icons blue-text\" style=\"vertical-align:sub;font-size:2.3rem\">play_arrow</i>\n                </template>\n                <template if.bind='playing'>\n                  <i class=\"material-icons red-text\" style=\"vertical-align:sub;font-size:2.3rem\" >stop</i>\n                </template>\n              </a>\n              <div class=\"input-field inline\" style=\"margin-top:0;\">\n                <p>Tempo</p>\n                <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:36px;padding:0;margin-right:5px;\" click.delegate=\"changeTempo(false)\"><i class=\"material-icons\">remove</i></button>\n                <input style=\"width:40px;\" type=\"number\" value.bind=\"tempo\">\n                <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:36px;padding:0;margin-left:5px;\" click.delegate=\"changeTempo(true)\"><i class=\"material-icons\">add</i></button>\n              </div>\n              <div class=\"input-field inline\" style=\"margin-top:0;\">\n                <knob min=\"0\" max=\"100\" label=\"Volume\" val.two-way=\"volume\" style=\"display:inline-block;\"></knob>\n              </div>\n            </div>\n          </form>\r\n          <!-- <form class=\"col s4 row grey lighten-3 z-depth-1 b-radius-card\">\r\n\r\n          </form> -->\r\n        </div>\r\n        <table>\r\n          <tbody>\r\n              <tr>\r\n                <td style=\"width:5.88%\"></td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%\">\r\n                  <div class=\"${notePlaying-1==i?'blue':'grey'} lighten-2\" style=\"height:5px;\"></div>\r\n                </td>\r\n              </tr>\r\n              <tr repeat.for=\"drum of drums\">\r\n                <td style=\"width:5.88%;cursor:pointer\" class=\"blue-text\" click.delegate=\"playSample(drum.sound)\">${drum.name}</td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%\"><a md-waves class=\"waves-effect waves-light btn green accent-3\" style=\"width:100%;padding:0rem;\" click.delegate=\"addNote($event, $parent.$index, i)\"></a></td>\r\n              </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/piano.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./components/piano-key\"></require>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"../components/mute-button\"></require>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"./styles/synth.css\"></require>\r\n  <require from='./components/oscillator'></require>\r\n  <div class=\"au-animate col l6 m12\">\r\n      <div class=\"card\" id=\"piano\">\r\n\r\n        <div class=\"card-content\" style=\"padding:0.75rem\" >\r\n          <div class=\"row\">\r\n            <form class=\"col m4\">\r\n              <oscillator gain.two-way=\"lfoData.gain\" wave.two-way=\"lfoData.wave\" freq.two-way=\"lfoData.freq\" type='Lfo' modtype.two-way=\"lfoData.modType\" detune.two-way=\"lfoData.detune\" osc1.two-way=\"lfoData.osc1\" osc2.two-way=\"lfoData.osc2\"></oscillator>\r\n            </form>\r\n            <form class=\"col m4\" repeat.for=\"osc of oscillators\">\r\n              <oscillator volume.two-way=\"osc.volume\" wave.two-way=\"osc.wave\" octave.two-way=\"osc.octave\" index.bind=\"$index\" type='oscillator' detune.two-way=\"osc.detune\"></oscillator>\r\n            </form>\r\n          </div>\r\n          <div class=\"row\">\r\n            <form class=\"col m6\">\r\n              <div id=\"filter\" class=\"row grey lighten-3 z-depth-1 b-radius-card\">\r\n                <p>Filter</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Cutoff\" val.two-way=\"lpfCutoff\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"20\" label=\"Q\" val.two-way=\"lpfQ\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Mod\" val.two-way=\"lpfMod\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Env\" val.two-way=\"lpfEnv\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                </div>\r\n                <p>Envelope</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"lpfA\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Decay\" val.two-way=\"lpfD\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Sustain\" val.two-way=\"lpfS\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Relase\" val.two-way=\"lpfR\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n            <form class=\"col m6\">\r\n              <div id=\"filter\" class=\"row grey lighten-3 z-depth-1 b-radius-card\">\r\n                <p>Synth</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Drive\" val.two-way=\"lpfA\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Reverb\" val.two-way=\"lpfD\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\" >\r\n                    <knob id=\"soundwave\" min=\"0\" max=\"100\" label=\"Volume\" val.two-way=\"masterVol\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\"  style=\"\">\r\n                    <div class=\"card\" style=\"background:#fff;margin:0\">\r\n                      <div class=\"card-content\" style=\"padding:5px 5px 0px 5px;\">\r\n                        <sound-wave ab.bind='ab' canvas-id='soundwave' style=\"\"></sound-wave>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <p>Envelope</p>\r\n                <div class=\"row\">\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"envA\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Decay\" val.two-way=\"envD\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Sustain\" val.two-way=\"envS\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                  <div class=\"col m3 s6\">\r\n                    <knob min=\"0\" max=\"100\" label=\"Relase\" val.two-way=\"envR\" style=\"display:inline-block;\"></knob>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"row\">\r\n\r\n          </div>\r\n          <div class=\"row\" style=\"margin-bottom:10px;\">\r\n            <div class=\"col s12\" id='right' style=\"padding:0;height:90%\">\r\n              <!-- <div class=\"col s1\" style=\"padding:0;margin-right: 0px;\">\r\n                <div class=\"input-field\" style=\"margin-top:0;\">\r\n                  <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:30px;padding:0;margin-right:5px;\"><i class=\"material-icons\">remove</i></button>\r\n                  <input style=\"width:34px;\" >\r\n                  <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:30px;padding:0;margin-left:5px;\" ><i class=\"material-icons\">add</i></button>\r\n                </div>\r\n                <div class=\"range-field inline\" style=\"float:left;\">\r\n                  <input type=\"range\" style=\"\">\r\n                </div>\r\n                <div class=\"range-field inline\" style=\"float:left;\">\r\n                  <input type=\"range\" style=\"\">\r\n                </div>\r\n              </div> -->\r\n              <piano-key class=\"${note.color?'white'+$index:'black'+$index}\" repeat.for=\"note of notes\" index.bind=\"$index\"  assigned.bind=\"note.assigned\" key.bind=\"note\" containerLess></piano-key>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/components/oscillator.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from='../../components/knob'></require>\r\n  <require from='../../components/mute-button'></require>\r\n  <div class=\"grey lighten-3 z-depth-1 b-radius-card row\">\r\n    <p>${type==='Lfo' ? type : type[0].toUpperCase() + type.slice(1) + ' ' + (index+1)}</p>\r\n     <template if.bind='type!==\"Lfo\"'>\r\n       <div class=\"col s12 m12\">\r\n         <div class=\"input-field text-center col s6 m6\">\r\n           <knob min=\"0\" max=\"100\" label=\"Mix\" val.two-way=\"volume\" offset=\"222\"></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min=\"0\" max=\"3\" label=\"Wave\" labels='sine, saw, sqr, tri' val.two-way=\"wave\" val.two-way=\"wave\" offset='276' range=\"180\"></knob>\r\n         </div>\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min='0' max=\"7\" label=\"Octave\" labels=\"-3,-2,-1,0,1,2,3\" val.two-way=\"octave\" offset='222'></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\" >\r\n            <knob min='0' max=\"100\" label=\"Detune\" val.two-way=\"detune\" offset='222'></knob>\r\n         </div>\r\n       </div>\r\n     </template>\r\n     <template if.bind='type===\"Lfo\"'>\r\n       <div class=\"col s12 m12\">\r\n         <!-- <div class=\"input-field text-center col s6 m6\">\r\n           <knob min=\"0\" max=\"2\" labels=\"pitch, cutoff, bypass\" label=\"Mod Type\" val.two-way=\"modtype\" range=\"180\" offset=\"271\"></knob>\r\n         </div> -->\r\n\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min='0' max=\"20\" label=\"Frequency\"  val.two-way=\"freq\" offset='222'></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min=\"0\" max=\"3\" label=\"Wave\" labels='sine, saw, sqr, tri' val.two-way=\"wave\" val.two-way=\"wave\" offset='276' range=\"180\"></knob>\r\n         </div>\r\n         <!-- <div class=\"input-field col s6 m6\" >\r\n            <knob min='0' max=\"24\" label=\"Detune\" val.two-way=\"detune\" offset='222'></knob>\r\n         </div> -->\r\n       </div>\r\n       <div class=\"input-field col s12 m12\">\r\n         <div class=\"input-field col s6 m6\">\r\n           <knob min='0' max=\"100\" label=\"Osc 1\"  val.two-way=\"osc1\" offset='222'></knob>\r\n         </div>\r\n         <div class=\"input-field col s6 m6\" >\r\n            <knob min='0' max=\"100\" label=\"Osc2\" val.two-way=\"osc2\" offset='222'></knob>\r\n         </div>\r\n       </div>\r\n     </template>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/components/piano-key.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"col s1 key ${key.color===true?'white':'black-key'} \" tabindex=\"0\" mousedown.trigger=\"play()\" mouseup.delegate=\"stop()\">\r\n    <div class=\"${isPlaying?'play z-depth-1':'z-depth-2'}\"  md-waves=\"block:true;color:blue\">\r\n      <h1>${key.key}</h1>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map