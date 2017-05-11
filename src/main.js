import environment from './environment';

//this file bootstraps the application
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 997;
      config.settings.keyboard = true;
    })
    .plugin('aurelia-mdl-plugin', mdl => {
          mdl.addClasses('mdl-js-selectfield');
      });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
