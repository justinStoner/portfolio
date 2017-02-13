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
      config.map([{ route: ['', 'about'], name: 'about', moduleId: 'about', href: '#/about', nav: true, title: 'About' }, { route: 'work', name: 'work', moduleId: 'work', nav: true, title: 'Work', auth: false, href: '#/work' }, { route: 'showcase', name: 'showcase', moduleId: 'showcase', nav: true, title: 'Showcase', auth: false }]);
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
define('showcases/beatmaker/components/knob',["exports", "jquery", "aurelia-framework", "jquery-knob"], function (exports, _jquery, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnobCustomElement = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var KnobCustomElement = exports.KnobCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function KnobCustomElement(e) {
      _classCallCheck(this, KnobCustomElement);

      _initDefineProp(this, "min", _descriptor, this);

      _initDefineProp(this, "max", _descriptor2, this);

      _initDefineProp(this, "label", _descriptor3, this);

      _initDefineProp(this, "val", _descriptor4, this);

      this.element = e;
    }

    KnobCustomElement.prototype.attached = function attached() {
      var _this = this;

      console.log(this.element.children);
      (0, _jquery2.default)(this.element.children[0]).knob({
        'change': function change(v) {
          console.log(_this.val = v);
        },
        'displayPrevious': true,
        'draw': function draw() {
          this.cursorExt = 0.3;

          var a = this.arc(this.cv),
              pa,
              r = 1,
              sx = 2,
              sy = 2;
          this.g.lineWidth = this.lineWidth;
          console.log(this);
          this.$div[0].lastChild.style.marginLeft -= sy;
          if (this.o.displayPrevious) {
            pa = this.arc(this.v);
            this.g.beginPath();
            this.g.strokeStyle = this.pColor;
            this.g.shadowColor = 'transparent';
            this.g.arc(this.xy - sx, this.xy - sy, this.radius - (sx + sy), pa.s, pa.e, pa.d);
            this.g.stroke();
          }
          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.bgColor : this.bgColor;
          this.g.arc(this.xy - sx, this.xy - sy, this.radius - (sx + sy), 0, 2 * Math.PI, a.d);
          this.g.shadowColor = 'rgba(0, 0, 0, 0.15)';
          this.g.shadowBlur = 2;
          this.g.shadowOffsetX = sx;
          this.g.shadowOffsetY = sy;
          this.g.stroke();

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.shadowColor = 'transparent';
          this.g.arc(this.xy - sx, this.xy - sy, this.radius - (sx + sy), a.s, a.e, a.d);
          this.g.stroke();

          return false;
        }
      });
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
  })), _class2)) || _class);
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
        if (_this.background) {
          _this.canvas.width = $('.page-host').width();
          _this.canvas.height = $('.page-host').height();
        } else {
          _this.canvas.width = $('#' + _this.canvasId).width();
        }
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

      if (this.background) {
        this.canvas.width = $('.page-host').width();
        this.canvas.height = $('.page-host').height();
      } else {
        this.canvas.width = $('#' + this.canvasId).width();
      }
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
      src.buffer = buffer;
      src.connect(this.ab.input);
      src.start(time);
    };

    SequencerCustomElement.prototype.playSample = function playSample(buffer) {
      var src = this.audio.createBufferSource();
      src.buffer = buffer;
      src.connect(this.ab.input);
      src.start(0);
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
      _classCallCheck(this, Piano);

      this.ab = ab;
      this.ea = ea;
      this.audio = this.ab.audio;
      this.canvas = "piano";
      this.octaves = [-3, -2, -1, 0, 1, 2, 3];
      this.whiteNotes = [];
      this.blackNotes = [];
      this.w1 = "sine";
      this.w2 = "sine";
      this.w3 = "sine";
      this.vol1 = 10;
      this.vol2 = 10;
      this.vol3 = 10;
      this.eq1 = 0;
      this.eq2 = 0;
      this.eq3 = 0;
      this.eq4 = 0;
      this.eq5 = 0;
      this.attack = 50;
      this.release = 50;
      this.octave1 = 0;
      this.octave2 = 0;
      this.octave3 = 0;
      this.dTime = 25;
      this.dFeed = 50;
      this.dWet = 50;
      this.mute1 = false;
      this.mute2 = false;
      this.mute3 = false;

      this.currentFilterCutoff = 8;
      this.currentFilterQ = 7.0;
      this.currentFilterMod = 21;
      this.currentFilterEnv = 56;

      this.currentEnvA = 2;
      this.currentEnvD = 15;
      this.currentEnvS = 68;
      this.currentEnvR = 5;

      this.currentFilterEnvA = 5;
      this.currentFilterEnvD = 6;
      this.currentFilterEnvS = 5;
      this.currentFilterEnvR = 7;
      this.whiteKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
      this.blackKeys = ['w', 'e', 't', 'y', 'u', 'o', 'p'];
      this.bus = {
        input: this.audio.createGain(),
        output: this.audio.createGain(),
        delay: this.createDelay()
      };
      this.notes = [{ note: 'c', hz: 261.626, color: true, key: 'a' }, { note: 'c#', hz: 277.183, color: false, key: 'w' }, { note: 'd', hz: 293.66, color: true, key: 's' }, { note: 'd#', hz: 311.127, color: false, key: 'e' }, { note: 'e', hz: 329.628, color: true, key: 'd' }, { note: 'f', hz: 349.228, color: true, key: 'f' }, { note: 'f#', hz: 369.994, color: false, key: 't' }, { note: 'g', hz: 391.995, color: true, key: 'g' }, { note: 'g#', hz: 415.305, color: false, key: 'y' }, { note: 'a', hz: 440, color: true, key: 'h' }, { note: 'a#', hz: 466.164, color: false, key: 'u' }, { note: 'b', hz: 493.883, color: true, key: 'j' }, { note: 'c', hz: 532.251, color: true, key: 'k' }, { note: 'c#', hz: 554.365, color: false, key: 'o' }, { note: 'd', hz: 587.33, color: true, key: 'l' }, { note: 'd#', hz: 622.254, color: false, key: 'p' }, { note: 'e', hz: 659.255, color: true, key: ';' }, { note: 'f', hz: 698.456, color: true, key: "'" }];
      this.x = 0;
      this.y = 0;
      for (var i in this.notes) {
        this.notes[i].element;
      }

      this.playEvent = document.createEvent('event');
      this.stopEvent = document.createEvent('event');
      this.playEvent.initEvent('play', true, true);
      this.stopEvent.initEvent('stop', true, true);

      window.addEventListener('keydown', this.play.bind(this));
      window.addEventListener('keyup', this.stop.bind(this));
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

    Piano.prototype.createDelay = function createDelay() {
      this.dInput = this.audio.createGain();
      this.output = this.audio.createGain();
      this.delay = this.audio.createDelay(5.0);
      this.feedback = this.audio.createGain();
      this.wetLevel = this.audio.createGain();
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

      this.delay.delayTime.value = this.dTime / 100;
      this.feedback.gain.value = this.dFeed / 100;
      this.wetLevel.gain.value = this.dWet / 100;

      this.eq80.connect(this.eq350);
      this.eq350.connect(this.eq720);
      this.eq720.connect(this.eq16k);
      this.eq16k.connect(this.eq5k);
      this.eq5k.connect(this.dInput);
      this.dInput.connect(this.delay);
      this.dInput.connect(this.output);
      this.delay.connect(this.feedback);
      this.delay.connect(this.wetLevel);
      this.feedback.connect(this.delay);
      this.wetLevel.connect(this.output);
      console.log();
      this.output.connect(this.ab.input);
    };

    Piano.prototype.activate = function activate(a, b, c) {};

    Piano.prototype.canDeactivate = function canDeactivate() {};

    Piano.prototype.attached = function attached() {
      console.log($);
    };

    Piano.prototype.play = function play(e) {
      var s = e.key;
      console.log(e);
      for (var i in this.notes) {
        if (s == this.notes[i].key || s == this.notes[i].key.toUpperCase()) {
          this.notes[i].element.dispatchEvent(this.playEvent);
        }
      }
      console.log(this.output);
    };

    Piano.prototype.stop = function stop(e) {
      var s = e.key;
      for (var i in this.notes) {
        if (s == this.notes[i].key || s == this.notes[i].key.toUpperCase()) {
          this.notes[i].element.dispatchEvent(this.stopEvent);
        }
      }
    };

    return Piano;
  }()) || _class);

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
define('showcases/beatmaker/synth/components/piano-key',['exports', 'aurelia-framework', '../piano', '../../components/audio-bus'], function (exports, _aureliaFramework, _piano, _audioBus) {
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

  var PianoKeyCustomElement = exports.PianoKeyCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _piano.Piano, _audioBus.AudioBus), _dec(_class = (_class2 = function () {
    function PianoKeyCustomElement(element, piano, ab) {
      _classCallCheck(this, PianoKeyCustomElement);

      _initDefineProp(this, 'key', _descriptor, this);

      _initDefineProp(this, 'assigned', _descriptor2, this);

      _initDefineProp(this, 'num', _descriptor3, this);

      this.element = element;
      this.audio = ab.audio;
      this.piano = piano;
      this.ab = ab;
      this.currentOsc;
      this.isPlaying = false;
    }

    PianoKeyCustomElement.prototype.attached = function attached() {

      this.piano.notes[this.num].element = this.element;

      this.element.addEventListener('play', this.playKey.bind(this));
      this.element.addEventListener('stop', this.stopKey.bind(this));
    };

    PianoKeyCustomElement.prototype.playKey = function playKey(e) {
      if (this.isPlaying == false) {
        console.log(this.piano.octave3);
        this.g1 = this.ab.audio.createGain();
        this.g2 = this.ab.audio.createGain();
        this.g3 = this.ab.audio.createGain();
        this.o1 = this.ab.audio.createOscillator();
        if (this.piano.octave1 == 0) {
          this.o1.frequency.value = this.key.hz;
          console.log(true);
        } else if (this.piano.octave1 > 0) {
          this.o1.frequency.value = this.key.hz * 2 * this.piano.octave1;
          console.log(false);
        } else {
          this.o1.frequency.value = this.key.hz * 2 / Math.abs(this.piano.octave1);
          console.log(false);
        }
        this.o1.type = this.piano.w1;
        this.o1.connect(this.g1);
        this.o2 = this.ab.audio.createOscillator();
        if (this.piano.octave2 == 0) {
          this.o2.frequency.value = this.key.hz;
          console.log(true);
        } else if (this.piano.octave2 > 0) {
          this.o2.frequency.value = this.key.hz * 2 * this.piano.octave2;
          console.log(false);
        } else {
          this.o2.frequency.value = this.key.hz * 2 / Math.abs(this.piano.octave2);
          console.log(false);
        }
        this.o2.type = this.piano.w2;
        this.o2.connect(this.g2);
        this.o3 = this.ab.audio.createOscillator();
        if (this.piano.octave3 == 0) {
          this.o3.frequency.value = this.key.hz;
          console.log(true);
        } else if (this.piano.octave3 > 0) {
          this.o3.frequency.value = this.key.hz * 2 * this.piano.octave3;
          console.log(false);
        } else {
          this.o3.frequency.value = this.key.hz * 2 / Math.abs(this.piano.octave3);
          console.log(false);
        }
        console.log(this.ab.audio.currentTime + this.piano.attack / 100);
        this.o3.type = this.piano.w3;
        this.o3.connect(this.g3);
        this.g1.connect(this.piano.eq80);
        this.g2.connect(this.piano.eq80);
        this.g3.connect(this.piano.eq80);
        this.g1.gain.value = this.piano.vol1 / 100;
        this.g2.gain.value = this.piano.vol2 / 100;
        this.g3.gain.value = this.piano.vol3 / 100;
        this.o1.start(0);

        this.g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
        this.g1.gain.setValueAtTime(0, this.ab.audio.currentTime);
        this.g1.gain.linearRampToValueAtTime(this.piano.vol1 / 100, this.ab.audio.currentTime + this.piano.attack / 100);
        this.o2.start(0);
        this.g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
        this.g2.gain.setValueAtTime(0, this.ab.audio.currentTime);
        this.g2.gain.linearRampToValueAtTime(this.piano.vol2 / 100, this.ab.audio.currentTime + this.piano.attack / 100);
        this.o3.start(0);
        this.g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
        this.g3.gain.setValueAtTime(0, this.ab.audio.currentTime);
        this.g3.gain.linearRampToValueAtTime(this.piano.vol3 / 100, this.ab.audio.currentTime + this.piano.attack / 100);
        this.isPlaying = true;
      }
    };

    PianoKeyCustomElement.prototype.stopKey = function stopKey(e) {
      console.log(e);
      if (this.isPlaying == true) {
        this.g1.gain.cancelScheduledValues(this.ab.audio.currentTime);
        this.g2.gain.cancelScheduledValues(this.ab.audio.currentTime);
        this.g3.gain.cancelScheduledValues(this.ab.audio.currentTime);
        console.log(this.g1.gain.value);
        this.g1.gain.setValueAtTime(this.g1.gain.value, this.ab.audio.currentTime);
        this.g1.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + this.piano.release / 100);
        this.g2.gain.setValueAtTime(this.g2.gain.value, this.ab.audio.currentTime);
        this.g2.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + this.piano.release / 100);
        this.g3.gain.setValueAtTime(this.g3.gain.value, this.ab.audio.currentTime);
        this.g3.gain.linearRampToValueAtTime(0, this.ab.audio.currentTime + this.piano.release / 100);

        this.isPlaying = false;
      }
    };

    return PianoKeyCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'assigned', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'num', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!about.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"parallax-container z-depth-2\">\r\n      <div md-parallax>\r\n        <div style=\"position:absolute;width:100%;height:100%;background:rgba(0,0,0,.2)\"></div>\r\n        <img src=\"images/IMG_1066.JPG\">\r\n      </div>\r\n    </div>\r\n    <div class=\"parallax-container z-depth-3\" >\r\n        <div md-parallax>\r\n          <div style=\"height:100%;\" class=\"green accent-3\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"parallax-container\">\r\n          <div md-parallax><img src=\"images/IMG_0983.JPG\" style=\"width:100%\"></div>\r\n        </div>\r\n</template>\r\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "body {\n  background-color: #fff; }\n\nnav .brand-logo,\n.brand-logo {\n  margin-left: 15px;\n  font-size: 18px; }\n\n[md-tabs] .waves-effect {\n  position: static; }\n\n.parallax-container {\n  height: 800px; }\n\n.b-radius-card {\n  border-radius: 0 0 2px 2px; }\n\n.showcase-tabs {\n  border-bottom: 1px solid rgba(160, 160, 160, 0.2); }\n  .showcase-tabs .indicator {\n    background: #2196f3 !important; }\n  .showcase-tabs li a.active {\n    color: #2196f3 !important; }\n  .showcase-tabs li a {\n    color: #343434 !important; }\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"materialize-css/css/materialize.css\"></require>\n  <require from=\"./styles/main.css\"></require>\n  <md-colors md-primary-color=\"#2196f3\" md-accent-color=\"#009688\"></md-colors>\n  <div class=\"navbar-fixed\">\n    <md-navbar>\n      <a href=\"#/samples/navbar\" class=\"brand-logo\"><span>Justin Stoner</span></a>\n      <ul class=\"hide-on-med-and-down right\">\n        <li md-waves repeat.for=\"row of router.navigation\" class=\"${row.isActive?'active':''}\"><a href=\"${row.href}\">${row.title}</a></li>\n      </ul>\n    </md-navbar>\n  </div>\n  <router-view></router-view>\n</template>\n"; });
define('text!showcases/beatmaker/styles/main.css', ['module'], function(module) { module.exports = ".card-content .row {\n  margin: 0; }\n\n.card-left {\n  display: table-cell;\n  /*border-right: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right {\n  display: table-cell;\n  /*border-left: 1px solid #f5f5f5;*/\n  height: 100%;\n  padding: 0 20px; }\n\n.card-right > div,\n.card-left > div {\n  height: 20%; }\n\nmd-card > .card {\n  background-color: inherit; }\n\n.input-field.inline.col.m4 {\n  text-align: center; }\n\nlabel.sm {\n  font-size: 0.8rem;\n  /*position: absolute !important;*/\n  top: -14px !important;\n  left: 0rem !important; }\n\n.select-wrapper {\n  margin-top: 0px; }\n\n.select-wrapper + label {\n  color: #343434 !important; }\n\n.wave-shape {\n  width: 36px;\n  padding: 0; }\n\n#right form,\n#left form {\n  padding: 0; }\n\n#left form > div:first-child {\n  padding-left: 0; }\n\n#right form > div:last-child {\n  padding-right: 0; }\n\n.dropdown-content li > span {\n  color: #2196f3 !important; }\n\ninput:focus:not([type]):not([readonly]), input[type=\"text\"]:focus:not([readonly]), input[type=\"password\"]:focus:not([readonly]), input[type=\"email\"]:focus:not([readonly]), input[type=\"url\"]:focus:not([readonly]), input[type=\"time\"]:focus:not([readonly]), input[type=\"date\"]:focus:not([readonly]), input[type=\"datetime\"]:focus:not([readonly]), input[type=\"datetime-local\"]:focus:not([readonly]), input[type=\"tel\"]:focus:not([readonly]), input[type=\"number\"]:focus:not([readonly]), input[type=\"search\"]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #2196f3;\n  box-shadow: 0 1px 0 0 #2196f3; }\n\ninput:not([type]):focus:not([readonly]) + label, input[type=text]:focus:not([readonly]) + label, input[type=password]:focus:not([readonly]) + label, input[type=email]:focus:not([readonly]) + label, input[type=url]:focus:not([readonly]) + label, input[type=time]:focus:not([readonly]) + label, input[type=date]:focus:not([readonly]) + label, input[type=datetime]:focus:not([readonly]) + label, input[type=datetime-local]:focus:not([readonly]) + label, input[type=tel]:focus:not([readonly]) + label, input[type=number]:focus:not([readonly]) + label, input[type=search]:focus:not([readonly]) + label, textarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #2196f3; }\n\ninput[type=\"range\"] + .thumb {\n  background: #2196f3; }\n\n.range-field.inline input[type=\"checkbox\"] {\n  margin-top: 10px; }\n\ninput[type=range]::-webkit-slider-thumb {\n  background-color: #2196f3; }\n\ninput[type=range]::-moz-range-thumb {\n  background-color: #2196f3; }\n\ninput[type=range]::-ms-thumb {\n  background-color: #2196f3; }\n\n.range-field.inline input {\n  width: 100%; }\n\n.range-field.inline label {\n  display: block;\n  text-align: left !important; }\n\n.mute-label {\n  color: #9e9e9e; }\n\ntd {\n  padding: 5px; }\n\nsection {\n  margin: 0; }\n\n.waves-effect.waves-blue .waves-ripple {\n  /*\r\n  The alpha value allows the text and background color\r\n  of the button to still show through.\r\n*/\n  background-color: rgba(3, 169, 244, 0.65); }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.pictureDetail {\n  max-width: 425px; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n.black0 {\n  margin-left: 24px; }\n\n.black2 {\n  margin-left: 48px; }\n\n.black5 {\n  margin-left: 48px; }\n\n.white-notes {\n  /*top:-89px;*/\n  position: relative;\n  margin-top: -90px;\n  z-index: 1; }\n\n.black-notes {\n  /*  position:absolute;*/\n  z-index: 2; }\n"; });
define('text!showcase.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul md-tabs class=\"showcase-tabs\" style=\"top:3px;\">\r\n      <li md-waves=\"color: primary;\" repeat.for=\"row of router.navigation\"><a class=\"${row.isActive?'active':''}\" href=\"#tab_${$index+1}\">${row.title}</a></li>\r\n      <li md-waves><a href=\"#tab2\" class=\"disabled\">More coming soon...</a></li>\r\n    </ul>\r\n    <router-view></router-view>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/sequencer/styles/sequencer.css', ['module'], function(module) { module.exports = ""; });
define('text!work.html', ['module'], function(module) { module.exports = "<template></template>\r\n"; });
define('text!showcases/beatmaker/synth/styles/synth.css', ['module'], function(module) { module.exports = "section {\n  background: #eee; }\n\n.key {\n  box-sizing: border-box;\n  width: 7.9%;\n  border-radius: 0px 0px 5px 5px;\n  display: inline-block;\n  font-size: 12px;\n  transition: box-shadow .25s;\n  margin-right: 0px;\n  outline: none;\n  padding: 0; }\n\n.key h1 {\n  text-align: center;\n  margin: 0;\n  font-size: 2.2rem; }\n\n.key div {\n  padding: 0 2px; }\n\n.key.white {\n  background-color: #fff;\n  height: 220px;\n  /*float:left;*/\n  position: relative; }\n  .key.white h1 {\n    color: #000;\n    padding-top: 11rem; }\n\n.key.white.play div {\n  background: #dddddd; }\n\n.key.black {\n  background-color: #000;\n  height: 148px;\n  position: absolute;\n  /*top:0;*/\n  z-index: 2;\n  margin-left: -4%; }\n  .key.black h1 {\n    color: #fff;\n    padding-top: 6rem; }\n\n.key.black.play {\n  background: #717171; }\n\n.key.black >\n.key-info {\n  list-style: none;\n  margin: 0px;\n  padding: 0px;\n  text-align: center; }\n\n.key-item {\n  height: 100%;\n  padding-top: 105%; }\n\n.key-item > a {\n  padding-top: 50%; }\n\n.parameter-holder {\n  padding: 0;\n  margin: 0 0.75rem; }\n\nform.col.m4 {\n  padding-left: 0; }\n  form.col.m4 .row {\n    padding: 0.75rem; }\n\nform.col.m4:last-child {\n  padding-right: 0; }\n"; });
define('text!showcases/beatmaker/beat-maker.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./synth/piano\"></require>\r\n  <require from=\"./sequencer/sequencer\"></require>\r\n  <require from=\"./components/sound-wave\"></require>\r\n  <require from=\"./styles/main.css\"></require>\r\n  <sound-wave ab.bind='ab' canvas-id='beatmaker' style=\"\" background.bind=\"true\"></sound-wave>\r\n  <div style=\"height:100%;background:#eee\">\r\n    <div class=\"row\" >\r\n\r\n      <piano ></piano>\r\n      <sequencer></sequencer>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/knob.html', ['module'], function(module) { module.exports = "<template>\r\n  <input type=\"text\" class=\"dial\" data-min=\"${min}\" data-max=\"${max}\" value.bind=\"val\" data-width=\"50\" data-height=\"50\" data-thickness=\".3\" data-fgColor=\"#2196f3\" data-bgColor=\"#fff\"/>\r\n  <label style=\"text-align:left !important;display:block;position:relative;left:0;margin-top:7px;\" class=\"sm\">${label}</label>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/mute-button.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=\"width:100%;margin-top:3px;\" click.delegate='muted=!muted'>\r\n      <template if.bind='muted'>\r\n        <i class=\"material-icons blue-text\" style=\"vertical-align:sub\">volume_up</i>\r\n      </template>\r\n      <template if.bind='!muted'>\r\n        <i class=\"material-icons red-text\" style=\"vertical-align:sub\">volume_off</i>\r\n      </template>\r\n    </a>\r\n\r\n</template>\r\n"; });
define('text!showcases/beatmaker/components/sound-wave.html', ['module'], function(module) { module.exports = "<template>\r\n  <canvas width=\"524\" height=\"50\" id=''  class=\"canvas\" css=\"${background?'position:absolute;z-index:-1':''}\"></canvas>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/sequencer/sequencer.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"./styles/sequencer.css\"></require>\r\n  <section class=\"au-animate col m12 l5\">\r\n\r\n    <div class=\"card\" id=\"sequencer\">\r\n      <sound-wave ab.bind='ab' canvas-id.bind='canvas' style=\"\"></sound-wave>\r\n      <div class=\"card-content\">\r\n        <a class=\"waves-effect waves-${!muted?'blue':'red'} btn-flat center-align\" style=\"margin-bottom:20px;padding:0;\" click.delegate='handlePlay()'>\r\n          <template if.bind='!playing'>\r\n            <i class=\"material-icons blue-text\" style=\"vertical-align:sub;font-size:2.3rem\">play_arrow</i>\r\n          </template>\r\n          <template if.bind='playing'>\r\n            <i class=\"material-icons red-text\" style=\"vertical-align:sub;font-size:2.3rem\" >stop</i>\r\n          </template>\r\n        </a>\r\n        <div class=\"input-field inline\" style=\"margin-top:0;\">\r\n          <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:36px;padding:0;margin-right:5px;\" click.delegate=\"changeTempo(false)\"><i class=\"material-icons\">remove</i></button>\r\n          <input style=\"width:40px;\" type=\"number\" value.bind=\"tempo\">\r\n          <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:36px;padding:0;margin-left:5px;\" click.delegate=\"changeTempo(true)\"><i class=\"material-icons\">add</i></button>\r\n        </div>\r\n        <table>\r\n          <tbody>\r\n              <tr>\r\n                <td style=\"width:5.88%\"></td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%\">\r\n                  <div class=\"${notePlaying-1==i?'blue':'grey'} lighten-2\" style=\"height:5px;\"></div>\r\n                </td>\r\n              </tr>\r\n              <tr repeat.for=\"drum of drums\">\r\n                <td style=\"width:5.88%;cursor:pointer\" class=\"blue-text\" click.delegate=\"playSample(drum.sound)\">${drum.name}</td>\r\n                <td repeat.for=\"i of 16\" style=\"width:5.88%\"><a md-waves class=\"waves-effect waves-light btn green accent-3\" style=\"width:100%;padding:0rem;\" click.delegate=\"addNote($event, $parent.$index, i)\"></a></td>\r\n              </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/piano.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./components/piano-key\"></require>\r\n  <require from=\"../components/sound-wave\"></require>\r\n  <require from=\"../components/mute-button\"></require>\r\n  <require from=\"../components/knob\"></require>\r\n  <require from=\"./styles/synth.css\"></require>\r\n  <section class=\"au-animate col l7 m12\">\r\n      <div class=\"card\" id=\"piano\">\r\n        <sound-wave ab.bind='ab' canvas-id.bind='canvas' style=\"\"></sound-wave>\r\n        <div class=\"card-content\" style=\"padding-top:0\" >\r\n          <div id=\"oscillator\">\r\n          <div class=\"row\">\r\n            <form class=\"col m4 \">\r\n              <div class=\"grey lighten-3 z-depth-1 b-radius-card row\">\r\n                <p>Oscillator 1</p>\r\n                 <div class=\"col m12\">\r\n                   <div class=\"input-field inline col m6\">\r\n                     <knob min=\"0\" max=\"100\" label=\"Volume 1\" val.two-way=\"vol1\"></knob>\r\n                   </div>\r\n                   <div class=\"col m6\">\r\n                     <button class=\"waves-effect waves-light btn ${w1=='sine'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w1='sine'\">Sine</button>\r\n                     <button class=\"waves-effect waves-light btn ${w1=='square'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w1='square'\">Sqr</button>\r\n                      <br>\r\n                     <button class=\"waves-effect waves-light btn ${w1=='triangle'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w1='triangle'\">Tri</button>\r\n                     <button class=\"waves-effect waves-light btn ${w1=='sawtooth'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w1='sawtooth'\">Saw</button>\r\n                   </div>\r\n                 </div>\r\n                 <div class=\"col m12\">\r\n                   <div class=\"input-field inline col m6\">\r\n                     <select md-select value.bind=\"octave1\" >\r\n                       <option repeat.for=\"o of octaves\" value.bind=\"o\" >${o}</option>\r\n                     </select>\r\n                     <label >Octave 1</label>\r\n                   </div>\r\n                   <div class=\"input-field inline col m6\" >\r\n                     <mute-button muted.two-way='mute1'></mute-button>\r\n                   </div>\r\n                 </div>\r\n              </div>\r\n              </form>\r\n              <form class=\"col m4\">\r\n                <div class=\"grey lighten-3 z-depth-1 b-radius-card row\">\r\n                  <p>Oscillator 2</p>\r\n                  <div class=\"col m12\">\r\n                    <div class=\"input-field inline col m6\">\r\n                      <knob min=\"0\" max=\"100\" label=\"Volume 2\" val.two-way=\"vol2\"></knob>\r\n                    </div>\r\n                    <div class=\"col m6\">\r\n                      <button class=\"waves-effect waves-light btn ${w2=='sine'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w2='sine'\">Sine</button>\r\n                      <button class=\"waves-effect waves-light btn ${w2=='square'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w2='square'\">Sqr</button>\r\n                       <br>\r\n                      <button class=\"waves-effect waves-light btn ${w2=='triangle'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w2='triangle'\">Tri</button>\r\n                      <button class=\"waves-effect waves-light btn ${w2=='sawtooth'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w2='sawtooth'\">Saw</button>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col m12\">\r\n                    <div class=\"input-field inline col m6\">\r\n                       <select md-select value.bind=\"octave2\">\r\n                        <option repeat.for=\"o of octaves\" value.bind=\"o\" >${o}</option>\r\n                       </select>\r\n                       <label>Octave 2</label>\r\n                    </div>\r\n                    <div class=\"input-field inline col m6\">\r\n                      <mute-button muted.two-way='mute2'></mute-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n               <form class=\"col m4\">\r\n                 <div class=\"row grey lighten-3 z-depth-1 b-radius-card\">\r\n                   <p>Oscillator 3</p>\r\n                   <div class=\"col m12\">\r\n                     <div class=\"input-field inline col m6\">\r\n                       <knob min=\"0\" max=\"100\" label=\"Volume 3\" val.two-way=\"vol3\"></knob>\r\n                     </div>\r\n                     <div class=\"col m6\">\r\n                       <button class=\"waves-effect waves-light btn ${w3=='sine'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w3='sine'\">Sine</button>\r\n                       <button class=\"waves-effect waves-light btn ${w3=='square'?'green accent-3':'blue'} wave-shape\" style=\"margin-bottom:5px;\" click.delegate=\"w3='square'\">Sqr</button>\r\n                        <br>\r\n                       <button class=\"waves-effect waves-light btn ${w3=='triangle'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w3='triangle'\">Tri</button>\r\n                       <button class=\"waves-effect waves-light btn ${w3=='sawtooth'?'green accent-3':'blue'} wave-shape\" click.delegate=\"w3='sawtooth'\">Saw</button>\r\n                     </div>\r\n                   </div>\r\n                   <div class=\"col m12\">\r\n                     <div class=\"input-field inline col m6\">\r\n                       <select md-select value.bind=\"octave3\">\r\n                         <option repeat.for=\"o of octaves\" value.bind=\"o\" >${o}</option>\r\n                       </select>\r\n                       <label>Octave 3</label>\r\n                    </div>\r\n                    <div class=\"input-field inline col m6\">\r\n                      <mute-button muted.two-way='mute3'></mute-button>\r\n                    </div>\r\n                   </div>\r\n                 </div>\r\n               </form>\r\n            </div>\r\n          </div>\r\n          <md-card class=\"grey lighten-3\">\r\n            <div id=\"delay\" class=\"\">\r\n              <div style=\"display:inline-block;\"><knob min=\"-40\" max=\"40\" label=\"EQ1\" val.two-way=\"eq1\"></knob></div>\r\n              <div style=\"display:inline-block;\"><knob min=\"-40\" max=\"40\" label=\"EQ2\" val.two-way=\"eq2\"></knob></div>\r\n              <div style=\"display:inline-block;\"><knob min=\"-40\" max=\"40\" label=\"EQ3\" val.two-way=\"eq3\"></knob></div>\r\n              <div style=\"display:inline-block;\"><knob min=\"-40\" max=\"40\" label=\"EQ4\" val.two-way=\"eq4\"></knob></div>\r\n              <div style=\"display:inline-block;\"><knob min=\"-40\" max=\"40\" label=\"EQ5\" val.two-way=\"eq5\"></knob></div>\r\n            </div>\r\n            <div id=\"filter\" class=\"\">\r\n              <knob min=\"0\" max=\"100\" label=\"Delay Time\" val.two-way=\"dTime\" style=\"display:inline-block;\"></knob>\r\n              <knob min=\"0\" max=\"100\" label=\"Feedback\" val.two-way=\"dFeed\" style=\"display:inline-block;\"></knob>\r\n              <knob min=\"0\" max=\"100\" label=\"Wet/Dry\" val.two-way=\"dWet\" style=\"display:inline-block;\"></knob>\r\n              <knob min=\"0\" max=\"100\" label=\"Attack\" val.two-way=\"attack\" style=\"display:inline-block;\"></knob>\r\n              <knob min=\"0\" max=\"100\" label=\"Release\" val.two-way=\"release\" style=\"display:inline-block;\"></knob>\r\n            </div>\r\n          </md-card>\r\n          <div class=\"row\" style=\"margin-bottom:0;\">\r\n            <div class=\"col s12\" id='right' style=\"padding:0;height:90%\">\r\n              <div class=\"col s1\" style=\"padding:0;margin-right: 0px;\">\r\n                <div class=\"input-field\" style=\"margin-top:0;\">\r\n                  <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:30px;padding:0;margin-right:5px;\"><i class=\"material-icons\">remove</i></button>\r\n                  <input style=\"width:34px;\" >\r\n                  <button class=\"btn waves-effect waves-light blue\" style=\"display:inline-block;width:30px;padding:0;margin-left:5px;\" ><i class=\"material-icons\">add</i></button>\r\n                </div>\r\n                <div class=\"range-field inline\" style=\"float:left;\">\r\n                  <input type=\"range\" style=\"\">\r\n                </div>\r\n                <div class=\"range-field inline\" style=\"float:left;\">\r\n                  <input type=\"range\" style=\"\">\r\n                </div>\r\n              </div>\r\n              <piano-key class=\"${note.color?'white'+$index:'black'+$index}\" repeat.for=\"note of notes\" num.bind=\"$index\"  assigned.bind=\"note.assigned\" key.bind=\"note\" containerLess></piano-key>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!showcases/beatmaker/synth/components/piano-key.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"col s1 key ${key.color===true?'white':'black'} ${isPlaying?'play z-depth-1':'z-depth-2'}\" md-waves=\"block:true;color:blue\" tabindex=\"0\" mousedown.delegate=\"playKey()\" mouseup.delegate=\"stopKey()\">\r\n    <div>\r\n      <h1>${key.key}</h1>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map