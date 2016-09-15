/*jshint esversion: 6 */

import PaginatorFactory from './paginator_factory.es6';
console.log("here");
import {PaginatorControlDirective} from './paginator_control_directive.es6';
import MainController from './main_controller.es6';

var storeModule = angular.module('store', []);
storeModule.factory('paginatorFactory', PaginatorFactory);
storeModule.controller('MainController', MainController);
storeModule.directive('paginatorControlDirective', PaginatorControlDirective);

