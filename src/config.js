import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import todoFactory from 'factories/todo-factory';
import invManFactory from 'factories/invMan-factory';
import todosController from 'todos/todos';
import invController from 'invMan/invMan';

const app = angular.module('app', [uiRouter, todoFactory.name, invManFactory.name, uiBootstrap]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('todos', {
      url: '/',
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
      controller: invController
    })
    
    $locationProvider.html5Mode(true);
});

export default app;