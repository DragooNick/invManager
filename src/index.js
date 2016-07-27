//Hotupdate via Remote
if (module.hot) {
  module.hot.accept();
}

import angular from 'angular';
import appModule from 'config/config';
import 'css/master.scss';

angular.bootstrap(document, [appModule.name]);