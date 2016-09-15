/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _paginator_factory = __webpack_require__(1);

	var _paginator_factory2 = _interopRequireDefault(_paginator_factory);

	var _paginator_control_directive = __webpack_require__(2);

	var _main_controller = __webpack_require__(3);

	var _main_controller2 = _interopRequireDefault(_main_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log("here"); /*jshint esversion: 6 */

	var storeModule = angular.module('store', []);
	storeModule.factory('paginatorFactory', _paginator_factory2.default);
	storeModule.controller('MainController', _main_controller2.default);
	storeModule.directive('paginatorControlDirective', _paginator_control_directive.PaginatorControlDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*jshint esversion: 6 */

	function PaginatorFactory() {
	  var self = this;
	  self._itemsPerPage = 10;
	  self._total = 10;
	  self._currentPage = 1;
	  self._totalPages = 1;
	  self.isValidPageNum = function (num) {
	    return num >= 1 && num <= self._totalPages;
	  };

	  return {
	    init: function init(total, itemsPerPage, currentPage) {
	      console.log(itemsPerPage);
	      self._itemsPerPage = itemsPerPage;
	      self._total = total;
	      self._currentPage = Number.isNaN(Number(currentPage)) && currentPage > 0 ? currentPage : 10;
	      self._totalPages = Math.ceil(total / itemsPerPage);
	      console.log(self._itemsPerPage, self._total, self._currentPage);
	    },
	    isValidPage: function isValidPage(pageNum) {
	      return self.isValidPageNum(pageNum);
	    },
	    currentPage: function currentPage() {
	      console.log("current");
	      return self._currentPage;
	    },
	    getPagesRange: function getPagesRange() {
	      console.log();
	      var array = [];
	      for (var i = 1; i <= self._totalPages; i++) {
	        array.push(i);
	      }
	      return array;
	    },
	    goToPage: function goToPage(pageNum) {
	      if (self.isValidPageNum(pageNum)) {
	        self._currentPage = pageNum;return true;
	      } else {
	        return false;
	      }
	    }
	  };
	}

	exports.default = PaginatorFactory;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* jshint esversion: 6 */

	function PaginatorControlDirective() {
	  return {
	    templateUrl: './paginator_control.html',
	    scope: {
	      totalValues: '=',
	      valuesPerPage: '=',
	      pageChangeCallback: '&'
	    },
	    controller: PaginatorController,
	    controllerAs: 'ctrl'
	  };
	}

	var PaginatorController = function () {
	  function PaginatorController($scope, PaginatorFactory) {
	    var _this = this;

	    _classCallCheck(this, PaginatorController);

	    console.log(PaginatorFactory);
	    PaginatorFactory.init($scope.totalValues, $scope.valuesPerPage);
	    this.paginatorFactory = PaginatorFactory;
	    this.pageChangeCallback = $scope.pageChangeCallback;
	    this.pagesList = PaginatorFactory.getPagesRange();
	    $scope.$watch('totalValues', function () {
	      PaginatorFactory.init($scope.totalValues, $scope.valuesPerPage, 0);
	      _this.pagesList = PaginatorFactory.getPagesRange();
	    });
	    console.log("total", $scope.totalValues, $scope.valuesPerPage);
	    console.log({ "pageNum": this.pagesList });
	  }

	  _createClass(PaginatorController, [{
	    key: 'returnHello',
	    value: function returnHello() {
	      return 'Hello';
	    }
	  }, {
	    key: 'changePage',
	    value: function changePage(pageNum) {
	      console.log("In page change", pageNum);
	      if (this.paginatorFactory.goToPage(pageNum)) {
	        console.log(this.pageChangeCallback);
	        this.pageChangeCallback({ pageNum: pageNum });
	      }
	    }
	  }, {
	    key: 'nextPage',
	    value: function nextPage() {
	      console.log("Really here?");
	      var pageNum = this.paginatorFactory.currentPage() + 1;
	      if (this.paginatorFactory.goToPage(pageNum)) {
	        console.log("Changed page");
	        this.pageChangeCallback({ pageNum: pageNum });
	      }
	    }
	  }, {
	    key: 'prevPage',
	    value: function prevPage() {
	      console.log("Really here?");
	      var pageNum = this.paginatorFactory.currentPage() - 1;
	      if (this.paginatorFactory.goToPage(pageNum)) {
	        console.log("Changed page");
	        this.pageChangeCallback({ pageNum: pageNum });
	      }
	    }
	  }, {
	    key: 'hasPrevPage',
	    value: function hasPrevPage() {
	      return this.paginatorFactory.isValidPage(this.paginatorFactory.currentPage() - 1);
	    }
	  }, {
	    key: 'hasNextPage',
	    value: function hasNextPage() {
	      return this.paginatorFactory.isValidPage(this.paginatorFactory.currentPage() + 1);
	    }
	  }]);

	  return PaginatorController;
	}();

	PaginatorController.$inject = ['$scope', 'paginatorFactory'];

	exports.PaginatorControlDirective = PaginatorControlDirective;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* jshint esversion: 6 */

	var MainController = function MainController($scope) {
	  _classCallCheck(this, MainController);

	  console.log("Hello Darkness");
	  $scope.totalValues = 100;
	  $scope.valuesPerPage = 10;
	  $scope.mainPageChange = function (pageNum) {
	    console.log("In main controller", pageNum);
	    return 1;
	  };
	};

	MainController.$inject = ['$scope'];
	exports.default = MainController;

/***/ }
/******/ ]);