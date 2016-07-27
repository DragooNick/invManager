import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import todoFactory from 'factories/todo-factory';
import invManFactory from 'factories/invMan-factory';
import loginFactory from 'factories/login-factory';
import todosController from 'todos/todos';
import invController from 'invMan/invMan';
import loginController from 'login/login';

const app = angular.module('app', [uiRouter, todoFactory.name, invManFactory.name, loginFactory.name, uiBootstrap]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('todos', {
      url: '/todo',
      template: require('todos/todos.html'),
      controller: todosController
    })
    .state('about', {
      url: '/about',
      template: require('about/about.html')
    })
    .state('invMan', {
      url: '/invMan',
      template: require('invMan/invMan.html'),
      controller: invController,
      resolve: { loginCheck: checkLogin }
    })
    .state('login', {
      url: '/',
      template: require('login/login.html'),
      controller: loginController
    })
    
    $locationProvider.html5Mode(true);
});

var checkLogin = function($q, $timeout, $http, $location, $rootScope) {
  console.log('checkLogin');
  var deffered = $q.defer();

  $http.get('/login/stuff/loggedIn').success(function(user) {
    $rootScope.errorMessage = null;
    // User is Authenticated
    if(user !== '0') {
      console.log('is authed');
      $rootScope.currentUser = user;
      deffered.resolve();
    // User is not Authenticated
    } else {
      console.log('not authed');
      $rootScope.errorMessage = 'You need to be log in.';
      deffered.reject();
      $location.url('/');
    }
  });
  return deffered.promise;
};

export default app;