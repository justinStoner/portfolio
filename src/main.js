import environment from './environment';
import $ from 'jquery';
import 'materialize-css';
//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  aurelia.use.plugin('aurelia-materialize-bridge', b => b.useAll());
  aurelia.start().then(() => aurelia.setRoot());
}
