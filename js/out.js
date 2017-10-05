/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener("DOMContentLoaded", function () {
  var Exchange = function () {
    function Exchange() {
      _classCallCheck(this, Exchange);

      this.value = 85;
    }

    _createClass(Exchange, [{
      key: "watch",
      value: function watch() {
        var _this = this;

        var exInput = document.querySelector("#exchange input");
        exInput.onkeyup = function () {
          if (exInput.value == "") {
            _this.value = 85;
          } else {
            _this.value = Math.floor(parseFloat(exInput.value) * 100);
          }
          transactions.refresh(_this.value);
        };
      }
    }]);

    return Exchange;
  }();

  var Transactions = function () {
    function Transactions() {
      _classCallCheck(this, Transactions);
    }

    _createClass(Transactions, [{
      key: "add",
      value: function add() {
        var sub = document.querySelector("input[name='add']");
        var self = this;

        sub.addEventListener("click", function (event) {
          event.preventDefault();
          var name = document.querySelector("input[name='name']");
          var amount = document.querySelector("input[name='amount']");
          if (name.value != "" && amount.value != "") {
            self.addToList(name.value, amount.value);
            name.value = "";
            amount.value = "";
          }
        });
      }
    }, {
      key: "addToList",
      value: function addToList(name, amount) {
        var ul = document.querySelector(".transactionList ul");
        var li = document.createElement("li");
        var spanName = document.createElement("span");
        spanName.classList.add("liName");
        spanName.innerText = name;
        var spanUSD = document.createElement("span");
        spanUSD.classList.add("liUSD");
        spanUSD.innerText = parseFloat(amount).toFixed(2) + "USD";
        var spanEUR = document.createElement("span");
        spanEUR.classList.add("liEUR");
        spanEUR.innerText = (Math.floor(parseFloat(amount) * 100) * exchange.value / 10000).toFixed(2) + "EUR";
        var button = document.createElement("button");
        button.innerText = "-";

        li.appendChild(spanName);
        li.appendChild(spanUSD);
        li.appendChild(spanEUR);
        li.appendChild(button);
        ul.appendChild(li);

        var listElementsLi = document.querySelectorAll(".transactionList li");
        var newLi = listElementsLi.length - 1;
        button.addEventListener("click", function () {
          listElementsLi[newLi].parentNode.removeChild(listElementsLi[newLi]);
        });
      }
    }, {
      key: "refresh",
      value: function refresh(newValue) {
        var listElementsUSD = document.querySelectorAll(".transactionList .liUSD");
        var listElementsEUR = document.querySelectorAll(".transactionList .liEUR");
        var listLength = listElementsUSD.length;
        for (var i = 0; i < listLength; i++) {
          listElementsEUR[i].innerText = (newValue * Math.floor(parseFloat(listElementsUSD[i].innerText) * 100) / 10000).toFixed(2) + "EUR";
        }
      }
    }]);

    return Transactions;
  }();

  var exchange = new Exchange();
  var transactions = new Transactions();

  transactions.add();
  exchange.watch();
});

/***/ })
/******/ ]);