/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Renderer.js":
/*!*************************!*\
  !*** ./src/Renderer.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": function() { return /* binding */ Renderer; },
/* harmony export */   "executeRenderer": function() { return /* binding */ executeRenderer; },
/* harmony export */   "isRendererRequired": function() { return /* binding */ isRendererRequired; }
/* harmony export */ });
/* harmony import */ var _adloader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adloader.js */ "./src/adloader.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");




var pbjsInstance = (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__.getGlobal)();
var moduleCode = 'outstream';

/**
 * @typedef {object} Renderer
 *
 * A Renderer stores some functions which are used to render a particular Bid.
 * These are used in Outstream Video Bids, returned on the Bid by the adapter, and will
 * be used to render that bid unless the Publisher overrides them.
 */

function Renderer(options) {
  var _this = this;
  var url = options.url,
    config = options.config,
    id = options.id,
    callback = options.callback,
    loaded = options.loaded,
    adUnitCode = options.adUnitCode,
    renderNow = options.renderNow;
  this.url = url;
  this.config = config;
  this.handlers = {};
  this.id = id;
  this.renderNow = renderNow;

  // a renderer may push to the command queue to delay rendering until the
  // render function is loaded by loadExternalScript, at which point the the command
  // queue will be processed
  this.loaded = loaded;
  this.cmd = [];
  this.push = function (func) {
    if (typeof func !== 'function') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Commands given to Renderer.push must be wrapped in a function');
      return;
    }
    _this.loaded ? func.call() : _this.cmd.push(func);
  };

  // bidders may override this with the `callback` property given to `install`
  this.callback = callback || function () {
    _this.loaded = true;
    _this.process();
  };

  // use a function, not an arrow, in order to be able to pass "arguments" through
  this.render = function () {
    var _this2 = this;
    var renderArgs = arguments;
    var runRender = function runRender() {
      if (_this2._render) {
        _this2._render.apply(_this2, renderArgs);
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("No render function was provided, please use .setRender on the renderer");
      }
    };
    if (isRendererPreferredFromAdUnit(adUnitCode)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(adUnitCode));
      runRender();
    } else if (renderNow) {
      runRender();
    } else {
      // we expect to load a renderer url once only so cache the request to load script
      this.cmd.unshift(runRender); // should render run first ?
      (0,_adloader_js__WEBPACK_IMPORTED_MODULE_2__.loadExternalScript)(url, moduleCode, this.callback, this.documentContext);
    }
  }.bind(this); // bind the function to this object to avoid 'this' errors
}

Renderer.install = function (_ref) {
  var url = _ref.url,
    config = _ref.config,
    id = _ref.id,
    callback = _ref.callback,
    loaded = _ref.loaded,
    adUnitCode = _ref.adUnitCode,
    renderNow = _ref.renderNow;
  return new Renderer({
    url: url,
    config: config,
    id: id,
    callback: callback,
    loaded: loaded,
    adUnitCode: adUnitCode,
    renderNow: renderNow
  });
};
Renderer.prototype.getConfig = function () {
  return this.config;
};
Renderer.prototype.setRender = function (fn) {
  this._render = fn;
};
Renderer.prototype.setEventHandlers = function (handlers) {
  this.handlers = handlers;
};
Renderer.prototype.handleVideoEvent = function (_ref2) {
  var id = _ref2.id,
    eventName = _ref2.eventName;
  if (typeof this.handlers[eventName] === 'function') {
    this.handlers[eventName]();
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Prebid Renderer event for id ".concat(id, " type ").concat(eventName));
};

/*
 * Calls functions that were pushed to the command queue before the
 * renderer was loaded by `loadExternalScript`
 */
Renderer.prototype.process = function () {
  while (this.cmd.length > 0) {
    try {
      this.cmd.shift().call();
    } catch (error) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Error processing Renderer command: ', error);
    }
  }
};

/**
 * Checks whether creative rendering should be done by Renderer or not.
 * @param {Object} renderer Renderer object installed by adapter
 * @returns {Boolean}
 */
function isRendererRequired(renderer) {
  return !!(renderer && (renderer.url || renderer.renderNow));
}

/**
 * Render the bid returned by the adapter
 * @param {Object} renderer Renderer object installed by adapter
 * @param {Object} bid Bid response
 * @param {Document} doc context document of bid
 */
function executeRenderer(renderer, bid, doc) {
  var docContext = null;
  if (renderer.config && renderer.config.documentResolver) {
    docContext = renderer.config.documentResolver(bid, document, doc); // a user provided callback, which should return a Document, and expect the parameters; bid, sourceDocument, renderDocument
  }

  if (!docContext) {
    docContext = document;
  }
  renderer.documentContext = docContext;
  renderer.render(bid, renderer.documentContext);
}
function isRendererPreferredFromAdUnit(adUnitCode) {
  var adUnits = pbjsInstance.adUnits;
  var adUnit = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.find)(adUnits, function (adUnit) {
    return adUnit.code === adUnitCode;
  });
  if (!adUnit) {
    return false;
  }

  // renderer defined at adUnit level
  var adUnitRenderer = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"])(adUnit, 'renderer');
  var hasValidAdUnitRenderer = !!(adUnitRenderer && adUnitRenderer.url && adUnitRenderer.render);

  // renderer defined at adUnit.mediaTypes level
  var mediaTypeRenderer = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"])(adUnit, 'mediaTypes.video.renderer');
  var hasValidMediaTypeRenderer = !!(mediaTypeRenderer && mediaTypeRenderer.url && mediaTypeRenderer.render);
  return !!(hasValidAdUnitRenderer && !(adUnitRenderer.backupOnly === true) || hasValidMediaTypeRenderer && !(mediaTypeRenderer.backupOnly === true));
}

/***/ }),

/***/ "./src/activities/activities.js":
/*!**************************************!*\
  !*** ./src/activities/activities.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACTIVITY_ACCESS_DEVICE": function() { return /* binding */ ACTIVITY_ACCESS_DEVICE; },
/* harmony export */   "ACTIVITY_ENRICH_EIDS": function() { return /* binding */ ACTIVITY_ENRICH_EIDS; },
/* harmony export */   "ACTIVITY_FETCH_BIDS": function() { return /* binding */ ACTIVITY_FETCH_BIDS; },
/* harmony export */   "ACTIVITY_REPORT_ANALYTICS": function() { return /* binding */ ACTIVITY_REPORT_ANALYTICS; },
/* harmony export */   "ACTIVITY_SYNC_USER": function() { return /* binding */ ACTIVITY_SYNC_USER; },
/* harmony export */   "ACTIVITY_TRANSMIT_EIDS": function() { return /* binding */ ACTIVITY_TRANSMIT_EIDS; },
/* harmony export */   "ACTIVITY_TRANSMIT_PRECISE_GEO": function() { return /* binding */ ACTIVITY_TRANSMIT_PRECISE_GEO; },
/* harmony export */   "ACTIVITY_TRANSMIT_TID": function() { return /* binding */ ACTIVITY_TRANSMIT_TID; },
/* harmony export */   "ACTIVITY_TRANSMIT_UFPD": function() { return /* binding */ ACTIVITY_TRANSMIT_UFPD; }
/* harmony export */ });
/* unused harmony export ACTIVITY_ENRICH_UFPD */
/**
 * Activity (that are relevant for privacy) definitions
 *
 * ref. https://docs.google.com/document/d/1dRxFUFmhh2jGanzGZvfkK_6jtHPpHXWD7Qsi6KEugeE
 * & https://github.com/prebid/Prebid.js/issues/9546
 */

/**
 * accessDevice: some component wants to read or write to localStorage or cookies.
 */
var ACTIVITY_ACCESS_DEVICE = 'accessDevice';
/**
 * syncUser: A bid adapter wants to run a user sync.
 */
var ACTIVITY_SYNC_USER = 'syncUser';
/**
 * enrichUfpd: some component wants to add user first-party data to bid requests.
 */
var ACTIVITY_ENRICH_UFPD = 'enrichUfpd';
/**
 * enrichEids: some component wants to add user IDs to bid requests.
 */
var ACTIVITY_ENRICH_EIDS = 'enrichEids';
/**
 * fetchBid: a bidder wants to bid.
 */
var ACTIVITY_FETCH_BIDS = 'fetchBids';

/**
 * reportAnalytics: some component wants to phone home with analytics data.
 */
var ACTIVITY_REPORT_ANALYTICS = 'reportAnalytics';

/**
 * some component wants access to (and send along) user IDs
 */
var ACTIVITY_TRANSMIT_EIDS = 'transmitEids';

/**
 * transmitUfpd: some component wants access to (and send along) user FPD
 */
var ACTIVITY_TRANSMIT_UFPD = 'transmitUfpd';

/**
 * transmitPreciseGeo: some component wants access to (and send along) geolocation info
 */
var ACTIVITY_TRANSMIT_PRECISE_GEO = 'transmitPreciseGeo';

/**
 * transmit TID: some component wants access ot (and send along) transaction IDs
 */
var ACTIVITY_TRANSMIT_TID = 'transmitTid';

/***/ }),

/***/ "./src/activities/activityParams.js":
/*!******************************************!*\
  !*** ./src/activities/activityParams.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activityParams": function() { return /* binding */ activityParams; }
/* harmony export */ });
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params.js */ "./src/activities/params.js");



/**
 * Utility function for building common activity parameters - broken out to its own
 * file to avoid circular imports.
 */
var activityParams = (0,_params_js__WEBPACK_IMPORTED_MODULE_0__.activityParamsBuilder)(function (alias) {
  return _adapterManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].resolveAlias(alias);
});

/***/ }),

/***/ "./src/activities/modules.js":
/*!***********************************!*\
  !*** ./src/activities/modules.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODULE_TYPE_ANALYTICS": function() { return /* binding */ MODULE_TYPE_ANALYTICS; },
/* harmony export */   "MODULE_TYPE_BIDDER": function() { return /* binding */ MODULE_TYPE_BIDDER; },
/* harmony export */   "MODULE_TYPE_PREBID": function() { return /* binding */ MODULE_TYPE_PREBID; },
/* harmony export */   "MODULE_TYPE_RTD": function() { return /* binding */ MODULE_TYPE_RTD; },
/* harmony export */   "MODULE_TYPE_UID": function() { return /* binding */ MODULE_TYPE_UID; }
/* harmony export */ });
var MODULE_TYPE_PREBID = 'prebid';
var MODULE_TYPE_BIDDER = 'bidder';
var MODULE_TYPE_UID = 'userId';
var MODULE_TYPE_RTD = 'rtd';
var MODULE_TYPE_ANALYTICS = 'analytics';

/***/ }),

/***/ "./src/activities/params.js":
/*!**********************************!*\
  !*** ./src/activities/params.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACTIVITY_PARAM_ADAPTER_CODE": function() { return /* binding */ ACTIVITY_PARAM_ADAPTER_CODE; },
/* harmony export */   "ACTIVITY_PARAM_ANL_CONFIG": function() { return /* binding */ ACTIVITY_PARAM_ANL_CONFIG; },
/* harmony export */   "ACTIVITY_PARAM_COMPONENT": function() { return /* binding */ ACTIVITY_PARAM_COMPONENT; },
/* harmony export */   "ACTIVITY_PARAM_COMPONENT_NAME": function() { return /* binding */ ACTIVITY_PARAM_COMPONENT_NAME; },
/* harmony export */   "ACTIVITY_PARAM_COMPONENT_TYPE": function() { return /* binding */ ACTIVITY_PARAM_COMPONENT_TYPE; },
/* harmony export */   "ACTIVITY_PARAM_S2S_NAME": function() { return /* binding */ ACTIVITY_PARAM_S2S_NAME; },
/* harmony export */   "ACTIVITY_PARAM_STORAGE_TYPE": function() { return /* binding */ ACTIVITY_PARAM_STORAGE_TYPE; },
/* harmony export */   "ACTIVITY_PARAM_SYNC_TYPE": function() { return /* binding */ ACTIVITY_PARAM_SYNC_TYPE; },
/* harmony export */   "ACTIVITY_PARAM_SYNC_URL": function() { return /* binding */ ACTIVITY_PARAM_SYNC_URL; },
/* harmony export */   "activityParamsBuilder": function() { return /* binding */ activityParamsBuilder; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules.js */ "./src/activities/modules.js");



/**
 * Component ID - who is trying to perform the activity?
 * Relevant for all activities.
 */
var ACTIVITY_PARAM_COMPONENT = 'component';
var ACTIVITY_PARAM_COMPONENT_TYPE = ACTIVITY_PARAM_COMPONENT + 'Type';
var ACTIVITY_PARAM_COMPONENT_NAME = ACTIVITY_PARAM_COMPONENT + 'Name';

/**
 * Code of the bid adapter that `componentName` is an alias of.
 * May be the same as the component name.
 *
 * relevant for all activities, but only when componentType is 'bidder'.
 */
var ACTIVITY_PARAM_ADAPTER_CODE = 'adapterCode';

/**
 * Storage type - either 'html5' or 'cookie'.
 * Relevant for: accessDevice
 */
var ACTIVITY_PARAM_STORAGE_TYPE = 'storageType';

/**
 * s2sConfig[].configName, used to identify a particular s2s instance
 * relevant for: fetchBids, but only when component is 'prebid.pbsBidAdapter'
 */
var ACTIVITY_PARAM_S2S_NAME = 'configName';
/**
 * user sync type - 'iframe' or 'pixel'
 * relevant for: syncUser
 */
var ACTIVITY_PARAM_SYNC_TYPE = 'syncType';
/**
 * user sync URL
 * relevant for: syncUser
 */
var ACTIVITY_PARAM_SYNC_URL = 'syncUrl';
/**
 * @private
 * configuration options for analytics adapter - the argument passed to `enableAnalytics`.
 * relevant for: reportAnalytics
 */
var ACTIVITY_PARAM_ANL_CONFIG = '_config';
function activityParamsBuilder(resolveAlias) {
  return function activityParams(moduleType, moduleName, params) {
    var _defaults;
    var defaults = (_defaults = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_defaults, ACTIVITY_PARAM_COMPONENT_TYPE, moduleType), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_defaults, ACTIVITY_PARAM_COMPONENT_NAME, moduleName), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_defaults, ACTIVITY_PARAM_COMPONENT, "".concat(moduleType, ".").concat(moduleName)), _defaults);
    if (moduleType === _modules_js__WEBPACK_IMPORTED_MODULE_1__.MODULE_TYPE_BIDDER) {
      defaults[ACTIVITY_PARAM_ADAPTER_CODE] = resolveAlias(moduleName);
    }
    return Object.assign(defaults, params);
  };
}

/***/ }),

/***/ "./src/activities/redactor.js":
/*!************************************!*\
  !*** ./src/activities/redactor.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "redactor": function() { return /* binding */ redactor; }
/* harmony export */ });
/* unused harmony exports ORTB_UFPD_PATHS, ORTB_EIDS_PATHS, ORTB_GEO_PATHS, redactRule, objectTransformer, sessionedApplies, isData, appliesWhenActivityDenied, ortb2TransmitRules, redactorFactory */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/* harmony import */ var _rules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules.js */ "./src/activities/rules.js");
/* harmony import */ var _activities_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./activities.js */ "./src/activities/activities.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var ORTB_UFPD_PATHS = ['user.data', 'user.ext.data'];
var ORTB_EIDS_PATHS = ['user.eids', 'user.ext.eids'];
var ORTB_GEO_PATHS = ['user.geo.lat', 'user.geo.lon', 'device.geo.lat', 'device.geo.lon'];

/**
 * @typedef TransformationRuleDef
 * @property {name}
 * @property {Array[string]} paths dot-separated list of paths that this rule applies to.
 * @property {function(*): boolean} applies a predicate that should return true if this rule applies
 * (and the transformation defined herein should be applied). The arguments are those passed to the transformation function.
 * @property {name} a name for the rule; used to debounce calls to `applies` (and avoid excessive logging):
 * if a rule with the same name was already found to apply (or not), this one will (or won't) as well.
 */

/**
 * @typedef RedactRuleDef A rule that removes, or replaces, values from an object (modifications are done in-place).
 * @augments TransformationRuleDef
 * @property {function(*): *} get? substitution functions for values that should be redacted;
 *  takes in the original (unredacted) value as an input, and returns a substitute to use in the redacted
 *  version. If it returns undefined, or this option is omitted, protected paths will be removed
 *  from the redacted object.
 */

/**
 * @param {RedactRuleDef} ruleDef
 * @return {TransformationRule}
 */
function redactRule(ruleDef) {
  return Object.assign({
    get: function get() {},
    run: function run(root, path, object, property, applies) {
      var val = object && object[property];
      if (isData(val) && applies()) {
        var repl = this.get(val);
        if (repl === undefined) {
          delete object[property];
        } else {
          object[property] = repl;
        }
      }
    }
  }, ruleDef);
}

/**
 * @typedef TransformationRule
 * @augments TransformationRuleDef
 * @property {function} run rule logic - see `redactRule` for an example.
 */

/**
 * @typedef {Function} TransformationFunction
 * @param object object to transform
 * @param ...args arguments to pass down to rule's `apply` methods.
 */

/**
 * Return a transformation function that will apply the given rules to an object.
 *
 * @param {Array[TransformationRule]} rules
 * @return {TransformationFunction}
 */
function objectTransformer(rules) {
  rules.forEach(function (rule) {
    rule.paths = rule.paths.map(function (path) {
      var parts = path.split('.');
      var tail = parts.pop();
      return [parts.length > 0 ? parts.join('.') : null, tail];
    });
  });
  return function applyTransform(session, obj) {
    var result = [];
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var applies = sessionedApplies.apply(void 0, [session].concat(args));
    rules.forEach(function (rule) {
      if (session[rule.name] === false) return;
      var _iterator = _createForOfIteratorHelper(rule.paths),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_step.value, 2),
            head = _step$value[0],
            tail = _step$value[1];
          var parent = head == null ? obj : (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, head);
          result.push(rule.run(obj, head, parent, tail, applies.bind(null, rule)));
          if (session[rule.name] === false) return;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    return result.filter(function (el) {
      return el != null;
    });
  };
}
function sessionedApplies(session) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  return function applies(rule) {
    if (!session.hasOwnProperty(rule.name)) {
      session[rule.name] = !!rule.applies.apply(rule, args);
    }
    return session[rule.name];
  };
}
function isData(val) {
  return val != null && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(val) !== 'object' || Object.keys(val).length > 0);
}
function appliesWhenActivityDenied(activity) {
  var isAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _rules_js__WEBPACK_IMPORTED_MODULE_3__.isActivityAllowed;
  return function applies(params) {
    return !isAllowed(activity, params);
  };
}
function bidRequestTransmitRules() {
  var isAllowed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _rules_js__WEBPACK_IMPORTED_MODULE_3__.isActivityAllowed;
  return [{
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_EIDS,
    paths: ['userId', 'userIdAsEids'],
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_EIDS, isAllowed)
  }, {
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_TID,
    paths: ['ortb2Imp.ext.tid'],
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_TID, isAllowed)
  }].map(redactRule);
}
function ortb2TransmitRules() {
  var isAllowed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _rules_js__WEBPACK_IMPORTED_MODULE_3__.isActivityAllowed;
  return [{
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_UFPD,
    paths: ORTB_UFPD_PATHS,
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_UFPD, isAllowed)
  }, {
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_EIDS,
    paths: ORTB_EIDS_PATHS,
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_EIDS, isAllowed)
  }, {
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_PRECISE_GEO,
    paths: ORTB_GEO_PATHS,
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_PRECISE_GEO, isAllowed),
    get: function get(val) {
      return Math.round((val + Number.EPSILON) * 100) / 100;
    }
  }, {
    name: _activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_TID,
    paths: ['source.tid'],
    applies: appliesWhenActivityDenied(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_TID, isAllowed)
  }].map(redactRule);
}
function redactorFactory() {
  var isAllowed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _rules_js__WEBPACK_IMPORTED_MODULE_3__.isActivityAllowed;
  var redactOrtb2 = objectTransformer(ortb2TransmitRules(isAllowed));
  var redactBidRequest = objectTransformer(bidRequestTransmitRules(isAllowed));
  return function redactor(params) {
    var session = {};
    return {
      ortb2: function ortb2(obj) {
        redactOrtb2(session, obj, params);
        return obj;
      },
      bidRequest: function bidRequest(obj) {
        redactBidRequest(session, obj, params);
        return obj;
      }
    };
  };
}

/**
 * Returns an object that can redact other privacy-sensitive objects according
 * to activity rules.
 *
 * @param {{}} params activity parameters to use for activity checks
 * @return {{ortb2: function({}): {}, bidRequest: function({}): {}}} methods
 *  that can redact disallowed data from ORTB2 and/or bid request objects.
 */
var redactor = redactorFactory();

// by default, TIDs are off since version 8
(0,_rules_js__WEBPACK_IMPORTED_MODULE_3__.registerActivityControl)(_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_TRANSMIT_TID, 'enableTIDs config', function () {
  if (!_config_js__WEBPACK_IMPORTED_MODULE_5__.config.getConfig('enableTIDs')) {
    return {
      allow: false,
      reason: 'TIDs are disabled'
    };
  }
});

/***/ }),

/***/ "./src/activities/rules.js":
/*!*********************************!*\
  !*** ./src/activities/rules.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isActivityAllowed": function() { return /* binding */ isActivityAllowed; },
/* harmony export */   "registerActivityControl": function() { return /* binding */ registerActivityControl; }
/* harmony export */ });
/* unused harmony export ruleRegistry */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./params.js */ "./src/activities/params.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function ruleRegistry() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.prefixLog)('Activity control:');
  var registry = {};
  function getRules(activity) {
    return registry[activity] = registry[activity] || [];
  }
  function runRule(activity, name, rule, params) {
    var res;
    try {
      res = rule(params);
    } catch (e) {
      logger.logError("Exception in rule ".concat(name, " for '").concat(activity, "'"), e);
      res = {
        allow: false,
        reason: e
      };
    }
    return res && Object.assign({
      activity: activity,
      name: name,
      component: params[_params_js__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_PARAM_COMPONENT]
    }, res);
  }
  var dupes = {};
  var DEDUPE_INTERVAL = 1000;
  function logResult(_ref) {
    var activity = _ref.activity,
      name = _ref.name,
      allow = _ref.allow,
      reason = _ref.reason,
      component = _ref.component;
    var msg = "".concat(name, " ").concat(allow ? 'allowed' : 'denied', " '").concat(activity, "' for '").concat(component, "'").concat(reason ? ':' : '');
    var deduping = dupes.hasOwnProperty(msg);
    if (deduping) {
      clearTimeout(dupes[msg]);
    }
    dupes[msg] = setTimeout(function () {
      return delete dupes[msg];
    }, DEDUPE_INTERVAL);
    if (!deduping) {
      var parts = [msg];
      reason && parts.push(reason);
      (allow ? logger.logInfo : logger.logWarn).apply(logger, parts);
    }
  }
  return [
  /**
   * Register an activity control rule.
   *
   * @param {string} activity activity name - set is defined in `activities.js`
   * @param {string} ruleName a name for this rule; used for logging.
   * @param {function({}): {allow: boolean, reason?: string}} rule definition function. Takes in activity
   *        parameters as a single map; MAY return an object {allow, reason}, where allow is true/false,
   *        and reason is an optional message used for logging.
   *
   *        {allow: true} will allow this activity AS LONG AS no other rules with same or higher priority return {allow: false};
   *        {allow: false} will deny this activity AS LONG AS no other rules with higher priority return {allow: true};
   *        returning null/undefined has no effect - the decision is left to other rules.
   *        If no rule returns an allow value, the default is to allow the activity.
   *
   * @param {number} priority rule priority; lower number means higher priority
   * @returns {function(void): void} a function that unregisters the rule when called.
   */
  function registerActivityControl(activity, ruleName, rule) {
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var rules = getRules(activity);
    var pos = rules.findIndex(function (_ref2) {
      var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref2, 1),
        itemPriority = _ref3[0];
      return priority < itemPriority;
    });
    var entry = [priority, ruleName, rule];
    rules.splice(pos < 0 ? rules.length : pos, 0, entry);
    return function () {
      var idx = rules.indexOf(entry);
      if (idx >= 0) rules.splice(idx, 1);
    };
  },
  /**
   * Test whether an activity is allowed.
   *
   * @param {string} activity activity name
   * @param {{}} params activity parameters; should be generated through the `activityParams` utility.
   * @return {boolean} true for allow, false for deny.
   */
  function isActivityAllowed(activity, params) {
    var lastPriority, foundAllow;
    var _iterator = _createForOfIteratorHelper(getRules(activity)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_step.value, 3),
          priority = _step$value[0],
          name = _step$value[1],
          rule = _step$value[2];
        if (lastPriority !== priority && foundAllow) break;
        lastPriority = priority;
        var ruleResult = runRule(activity, name, rule, params);
        if (ruleResult) {
          if (!ruleResult.allow) {
            logResult(ruleResult);
            return false;
          } else {
            foundAllow = ruleResult;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    foundAllow && logResult(foundAllow);
    return true;
  }];
}
var _ruleRegistry = ruleRegistry(),
  _ruleRegistry2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_ruleRegistry, 2),
  registerActivityControl = _ruleRegistry2[0],
  isActivityAllowed = _ruleRegistry2[1];


/***/ }),

/***/ "./src/adRendering.js":
/*!****************************!*\
  !*** ./src/adRendering.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emitAdRenderFail": function() { return /* binding */ emitAdRenderFail; },
/* harmony export */   "emitAdRenderSucceeded": function() { return /* binding */ emitAdRenderSucceeded; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");



var _CONSTANTS$EVENTS = _constants_json__WEBPACK_IMPORTED_MODULE_0__.EVENTS,
  AD_RENDER_FAILED = _CONSTANTS$EVENTS.AD_RENDER_FAILED,
  AD_RENDER_SUCCEEDED = _CONSTANTS$EVENTS.AD_RENDER_SUCCEEDED;

/**
 * Emit the AD_RENDER_FAILED event.
 *
 * @param reason one of the values in CONSTANTS.AD_RENDER_FAILED_REASON
 * @param message failure description
 * @param bid? bid response object that failed to render
 * @param id? adId that failed to render
 */
function emitAdRenderFail(_ref) {
  var reason = _ref.reason,
    message = _ref.message,
    bid = _ref.bid,
    id = _ref.id;
  var data = {
    reason: reason,
    message: message
  };
  if (bid) data.bid = bid;
  if (id) data.adId = id;
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(message);
  _events_js__WEBPACK_IMPORTED_MODULE_2__.emit(AD_RENDER_FAILED, data);
}

/**
 * Emit the AD_RENDER_SUCCEEDED event.
 * (Note: Invocation of this function indicates that the render function did not generate an error, it does not guarantee that tracking for this event has occurred yet.)
 * @param doc document object that was used to `.write` the ad. Should be `null` if unavailable (e.g. for documents in
 * a cross-origin frame).
 * @param bid bid response object for the ad that was rendered
 * @param id adId that was rendered.
 */
function emitAdRenderSucceeded(_ref2) {
  var doc = _ref2.doc,
    bid = _ref2.bid,
    id = _ref2.id;
  var data = {
    doc: doc
  };
  if (bid) data.bid = bid;
  if (id) data.adId = id;
  _events_js__WEBPACK_IMPORTED_MODULE_2__.emit(AD_RENDER_SUCCEEDED, data);
}

/***/ }),

/***/ "./src/adUnits.js":
/*!************************!*\
  !*** ./src/adUnits.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adunitCounter": function() { return /* binding */ adunitCounter; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");

var adUnits = {};
function ensureAdUnit(adunit, bidderCode) {
  var adUnit = adUnits[adunit] = adUnits[adunit] || {
    bidders: {}
  };
  if (bidderCode) {
    return adUnit.bidders[bidderCode] = adUnit.bidders[bidderCode] || {};
  }
  return adUnit;
}
function incrementAdUnitCount(adunit, counter, bidderCode) {
  var adUnit = ensureAdUnit(adunit, bidderCode);
  adUnit[counter] = (adUnit[counter] || 0) + 1;
  return adUnit[counter];
}

/**
 * Increments and returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */
function incrementRequestsCounter(adunit) {
  return incrementAdUnitCount(adunit, 'requestsCounter');
}

/**
 * Increments and returns current Adunit requests counter for a bidder
 * @param {string} adunit id
 * @param {string} bidderCode code
 * @returns {number} current adunit bidder requests count
 */
function incrementBidderRequestsCounter(adunit, bidderCode) {
  return incrementAdUnitCount(adunit, 'requestsCounter', bidderCode);
}

/**
 * Increments and returns current Adunit wins counter for a bidder
 * @param {string} adunit id
 * @param {string} bidderCode code
 * @returns {number} current adunit bidder requests count
 */
function incrementBidderWinsCounter(adunit, bidderCode) {
  return incrementAdUnitCount(adunit, 'winsCounter', bidderCode);
}

/**
 * Returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */
function getRequestsCounter(adunit) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(adUnits, "".concat(adunit, ".requestsCounter")) || 0;
}

/**
 * Returns current Adunit requests counter for a specific bidder code
 * @param {string} adunit id
 * @param {string} bidder code
 * @returns {number} current adunit bidder requests count
 */
function getBidderRequestsCounter(adunit, bidder) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(adUnits, "".concat(adunit, ".bidders.").concat(bidder, ".requestsCounter")) || 0;
}

/**
 * Returns current Adunit requests counter for a specific bidder code
 * @param {string} adunit id
 * @param {string} bidder code
 * @returns {number} current adunit bidder requests count
 */
function getBidderWinsCounter(adunit, bidder) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(adUnits, "".concat(adunit, ".bidders.").concat(bidder, ".winsCounter")) || 0;
}

/**
 * A module which counts how many times an adunit was called
 * @module adunitCounter
 */
var adunitCounter = {
  incrementRequestsCounter: incrementRequestsCounter,
  incrementBidderRequestsCounter: incrementBidderRequestsCounter,
  incrementBidderWinsCounter: incrementBidderWinsCounter,
  getRequestsCounter: getRequestsCounter,
  getBidderRequestsCounter: getBidderRequestsCounter,
  getBidderWinsCounter: getBidderWinsCounter
};


/***/ }),

/***/ "./src/adapter.js":
/*!************************!*\
  !*** ./src/adapter.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Adapter; }
/* harmony export */ });
function Adapter(code) {
  var bidderCode = code;
  function setBidderCode(code) {
    bidderCode = code;
  }
  function getBidderCode() {
    return bidderCode;
  }
  function callBids() {}
  return {
    callBids: callBids,
    setBidderCode: setBidderCode,
    getBidderCode: getBidderCode
  };
}

/***/ }),

/***/ "./src/adapterManager.js":
/*!*******************************!*\
  !*** ./src/adapterManager.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coppaDataHandler": function() { return /* binding */ coppaDataHandler; },
/* harmony export */   "gdprDataHandler": function() { return /* binding */ gdprDataHandler; },
/* harmony export */   "getS2SBidderSet": function() { return /* binding */ getS2SBidderSet; },
/* harmony export */   "gppDataHandler": function() { return /* binding */ gppDataHandler; },
/* harmony export */   "uspDataHandler": function() { return /* binding */ uspDataHandler; }
/* harmony export */ });
/* unused harmony exports PBS_ADAPTER_NAME, PARTITIONS, dep, s2sActivityParams, _filterBidsForAdUnit, filterBidsForAdUnit, setupAdUnitMediaTypes, _partitionBidders, partitionBidders */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./native.js */ "./src/native.js");
/* harmony import */ var _adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./adapters/bidderFactory.js */ "./src/adapters/bidderFactory.js");
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ajax.js */ "./src/ajax.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _adUnits_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./adUnits.js */ "./src/adUnits.js");
/* harmony import */ var _refererDetection_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./refererDetection.js */ "./src/refererDetection.js");
/* harmony import */ var _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./consentHandler.js */ "./src/consentHandler.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _activities_modules_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _activities_rules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _activities_activities_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./activities/activities.js */ "./src/activities/activities.js");
/* harmony import */ var _activities_params_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activities/params.js */ "./src/activities/params.js");
/* harmony import */ var _activities_redactor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activities/redactor.js */ "./src/activities/redactor.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/** @module adaptermanger */




















var PBS_ADAPTER_NAME = 'pbsBidAdapter';
var PARTITIONS = {
  CLIENT: 'client',
  SERVER: 'server'
};
var dep = {
  isAllowed: _activities_rules_js__WEBPACK_IMPORTED_MODULE_1__.isActivityAllowed,
  redact: _activities_redactor_js__WEBPACK_IMPORTED_MODULE_2__.redactor
};
var adapterManager = {};
var _bidderRegistry = adapterManager.bidderRegistry = {};
var _aliasRegistry = adapterManager.aliasRegistry = {};
var _s2sConfigs = [];
_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('s2sConfig', function (config) {
  if (config && config.s2sConfig) {
    _s2sConfigs = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(config.s2sConfig) ? config.s2sConfig : [config.s2sConfig];
  }
});
var _analyticsRegistry = {};
var activityParams = (0,_activities_params_js__WEBPACK_IMPORTED_MODULE_5__.activityParamsBuilder)(function (alias) {
  return adapterManager.resolveAlias(alias);
});
function s2sActivityParams(s2sConfig) {
  return activityParams(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_PREBID, PBS_ADAPTER_NAME, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _activities_params_js__WEBPACK_IMPORTED_MODULE_5__.ACTIVITY_PARAM_S2S_NAME, s2sConfig.configName));
}

/**
 * @typedef {object} LabelDescriptor
 * @property {boolean} labelAll describes whether or not this object expects all labels to match, or any label to match
 * @property {Array<string>} labels the labels listed on the bidder or adUnit
 * @property {Array<string>} activeLabels the labels specified as being active by requestBids
 */

function getBids(_ref) {
  var bidderCode = _ref.bidderCode,
    auctionId = _ref.auctionId,
    bidderRequestId = _ref.bidderRequestId,
    adUnits = _ref.adUnits,
    src = _ref.src,
    metrics = _ref.metrics;
  return adUnits.reduce(function (result, adUnit) {
    var bids = adUnit.bids.filter(function (bid) {
      return bid.bidder === bidderCode;
    });
    if (bidderCode == null && bids.length === 0 && adUnit.s2sBid != null) {
      bids.push({
        bidder: null
      });
    }
    result.push(bids.reduce(function (bids, bid) {
      bid = Object.assign({}, bid, {
        ortb2Imp: (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.mergeDeep)({}, adUnit.ortb2Imp, bid.ortb2Imp)
      }, (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getDefinedParams)(adUnit, ['nativeParams', 'nativeOrtbRequest', 'mediaType', 'renderer']));
      var mediaTypes = bid.mediaTypes == null ? adUnit.mediaTypes : bid.mediaTypes;
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isValidMediaTypes)(mediaTypes)) {
        bid = Object.assign({}, bid, {
          mediaTypes: mediaTypes
        });
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("mediaTypes is not correctly configured for adunit ".concat(adUnit.code));
      }
      bids.push(Object.assign({}, bid, {
        adUnitCode: adUnit.code,
        transactionId: adUnit.transactionId,
        sizes: (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"])(mediaTypes, 'banner.sizes') || (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"])(mediaTypes, 'video.playerSize') || [],
        bidId: bid.bid_id || (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUniqueIdentifierStr)(),
        bidderRequestId: bidderRequestId,
        auctionId: auctionId,
        src: src,
        metrics: metrics,
        bidRequestsCount: _adUnits_js__WEBPACK_IMPORTED_MODULE_8__.adunitCounter.getRequestsCounter(adUnit.code),
        bidderRequestsCount: _adUnits_js__WEBPACK_IMPORTED_MODULE_8__.adunitCounter.getBidderRequestsCounter(adUnit.code, bid.bidder),
        bidderWinsCount: _adUnits_js__WEBPACK_IMPORTED_MODULE_8__.adunitCounter.getBidderWinsCounter(adUnit.code, bid.bidder)
      }));
      return bids;
    }, []));
    return result;
  }, []).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_4__.flatten, []).filter(function (val) {
    return val !== '';
  });
}
var hookedGetBids = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', getBids, 'getBids');

/**
 * Filter an adUnit's  bids for building client and/or server requests
 *
 * @param bids an array of bids as defined in an adUnit
 * @param s2sConfig null if the adUnit is being routed to a client adapter; otherwise the s2s adapter's config
 * @returns the subset of `bids` that are pertinent for the given `s2sConfig`
 */
function _filterBidsForAdUnit(bids, s2sConfig) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$getS2SBidders = _ref2.getS2SBidders,
    getS2SBidders = _ref2$getS2SBidders === void 0 ? getS2SBidderSet : _ref2$getS2SBidders;
  if (s2sConfig == null) {
    return bids;
  } else {
    var serverBidders = getS2SBidders(s2sConfig);
    return bids.filter(function (bid) {
      return serverBidders.has(bid.bidder);
    });
  }
}
var filterBidsForAdUnit = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', _filterBidsForAdUnit, 'filterBidsForAdUnit');
function getAdUnitCopyForPrebidServer(adUnits, s2sConfig) {
  var adUnitsCopy = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnits);
  var hasModuleBids = false;
  adUnitsCopy.forEach(function (adUnit) {
    // filter out client side bids
    var s2sBids = adUnit.bids.filter(function (b) {
      var _b$params;
      return b.module === PBS_ADAPTER_NAME && ((_b$params = b.params) === null || _b$params === void 0 ? void 0 : _b$params.configName) === s2sConfig.configName;
    });
    if (s2sBids.length === 1) {
      adUnit.s2sBid = s2sBids[0];
      hasModuleBids = true;
      adUnit.ortb2Imp = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.mergeDeep)({}, adUnit.s2sBid.ortb2Imp, adUnit.ortb2Imp);
    } else if (s2sBids.length > 1) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)('Multiple "module" bids for the same s2s configuration; all will be ignored', s2sBids);
    }
    adUnit.bids = filterBidsForAdUnit(adUnit.bids, s2sConfig).map(function (bid) {
      bid.bid_id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUniqueIdentifierStr)();
      return bid;
    });
  });

  // don't send empty requests
  adUnitsCopy = adUnitsCopy.filter(function (adUnit) {
    return adUnit.bids.length !== 0 || adUnit.s2sBid != null;
  });
  return {
    adUnits: adUnitsCopy,
    hasModuleBids: hasModuleBids
  };
}
function getAdUnitCopyForClientAdapters(adUnits) {
  var adUnitsClientCopy = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnits);
  adUnitsClientCopy.forEach(function (adUnit) {
    adUnit.bids = filterBidsForAdUnit(adUnit.bids, null);
  });

  // don't send empty requests
  adUnitsClientCopy = adUnitsClientCopy.filter(function (adUnit) {
    return adUnit.bids.length !== 0;
  });
  return adUnitsClientCopy;
}
var gdprDataHandler = new _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__.GdprConsentHandler();
var uspDataHandler = new _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__.UspConsentHandler();
var gppDataHandler = new _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__.GppConsentHandler();
var coppaDataHandler = {
  getCoppa: function getCoppa() {
    return !!_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('coppa');
  }
};

/**
 * Filter and/or modify media types for ad units based on the given labels.
 *
 * This should return adUnits that are active for the given labels, modified to have their `mediaTypes`
 * conform to size mapping configuration. If different bids for the same adUnit should use different `mediaTypes`,
 * they should be exposed under `adUnit.bids[].mediaTypes`.
 */
var setupAdUnitMediaTypes = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', function (adUnits, labels) {
  return adUnits;
}, 'setupAdUnitMediaTypes');

/**
 * @param {{}|Array<{}>} s2sConfigs
 * @returns {Set<String>} a set of all the bidder codes that should be routed through the S2S adapter(s)
 *                        as defined in `s2sConfigs`
 */
function getS2SBidderSet(s2sConfigs) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(s2sConfigs)) s2sConfigs = [s2sConfigs];
  // `null` represents the "no bid bidder" - when an ad unit is meant only for S2S adapters, like stored impressions
  var serverBidders = new Set([null]);
  s2sConfigs.filter(function (s2s) {
    return s2s && s2s.enabled;
  }).flatMap(function (s2s) {
    return s2s.bidders;
  }).forEach(function (bidder) {
    return serverBidders.add(bidder);
  });
  return serverBidders;
}

/**
 * @returns {{[PARTITIONS.CLIENT]: Array<String>, [PARTITIONS.SERVER]: Array<String>}}
 *           All the bidder codes in the given `adUnits`, divided in two arrays -
 *           those that should be routed to client, and server adapters (according to the configuration in `s2sConfigs`).
 */
function _partitionBidders(adUnits, s2sConfigs) {
  var _getBidderCodes$reduc;
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref3$getS2SBidders = _ref3.getS2SBidders,
    getS2SBidders = _ref3$getS2SBidders === void 0 ? getS2SBidderSet : _ref3$getS2SBidders;
  var serverBidders = getS2SBidders(s2sConfigs);
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getBidderCodes)(adUnits).reduce(function (memo, bidder) {
    var partition = serverBidders.has(bidder) ? PARTITIONS.SERVER : PARTITIONS.CLIENT;
    memo[partition].push(bidder);
    return memo;
  }, (_getBidderCodes$reduc = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_getBidderCodes$reduc, PARTITIONS.CLIENT, []), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_getBidderCodes$reduc, PARTITIONS.SERVER, []), _getBidderCodes$reduc));
}
var partitionBidders = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', _partitionBidders, 'partitionBidders');
adapterManager.makeBidRequests = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', function (adUnits, auctionStart, auctionId, cbTimeout, labels) {
  var ortb2Fragments = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var auctionMetrics = arguments.length > 6 ? arguments[6] : undefined;
  auctionMetrics = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_11__.useMetrics)(auctionMetrics);
  /**
   * emit and pass adunits for external modification
   * @see {@link https://github.com/prebid/Prebid.js/issues/4149|Issue}
   */
  _events_js__WEBPACK_IMPORTED_MODULE_12__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_13__.EVENTS.BEFORE_REQUEST_BIDS, adUnits);
  if (true) {
    (0,_native_js__WEBPACK_IMPORTED_MODULE_14__.decorateAdUnitsWithNativeParams)(adUnits);
  }
  adUnits.forEach(function (au) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(au.mediaTypes)) {
      au.mediaTypes = {};
    }
    // filter out bidders that cannot participate in the auction
    au.bids = au.bids.filter(function (bid) {
      return !bid.bidder || dep.isAllowed(_activities_activities_js__WEBPACK_IMPORTED_MODULE_15__.ACTIVITY_FETCH_BIDS, activityParams(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_BIDDER, bid.bidder));
    });
  });
  adUnits = setupAdUnitMediaTypes(adUnits, labels);
  var _partitionBidders2 = partitionBidders(adUnits, _s2sConfigs),
    clientBidders = _partitionBidders2[PARTITIONS.CLIENT],
    serverBidders = _partitionBidders2[PARTITIONS.SERVER];
  if (_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('bidderSequence') === _config_js__WEBPACK_IMPORTED_MODULE_3__.RANDOM) {
    clientBidders = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.shuffle)(clientBidders);
  }
  var refererInfo = (0,_refererDetection_js__WEBPACK_IMPORTED_MODULE_16__.getRefererInfo)();
  var bidRequests = [];
  var ortb2 = ortb2Fragments.global || {};
  var bidderOrtb2 = ortb2Fragments.bidder || {};
  function addOrtb2(bidderRequest, s2sActivityParams) {
    var redact = dep.redact(s2sActivityParams != null ? s2sActivityParams : activityParams(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_BIDDER, bidderRequest.bidderCode));
    var fpd = Object.freeze(redact.ortb2((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.mergeDeep)({
      source: {
        tid: auctionId
      }
    }, ortb2, bidderOrtb2[bidderRequest.bidderCode])));
    bidderRequest.ortb2 = fpd;
    bidderRequest.bids = bidderRequest.bids.map(function (bid) {
      bid.ortb2 = fpd;
      return redact.bidRequest(bid);
    });
    return bidderRequest;
  }
  _s2sConfigs.forEach(function (s2sConfig) {
    var s2sParams = s2sActivityParams(s2sConfig);
    if (s2sConfig && s2sConfig.enabled && dep.isAllowed(_activities_activities_js__WEBPACK_IMPORTED_MODULE_15__.ACTIVITY_FETCH_BIDS, s2sParams)) {
      var _getAdUnitCopyForPreb = getAdUnitCopyForPrebidServer(adUnits, s2sConfig),
        adUnitsS2SCopy = _getAdUnitCopyForPreb.adUnits,
        hasModuleBids = _getAdUnitCopyForPreb.hasModuleBids;

      // uniquePbsTid is so we know which server to send which bids to during the callBids function
      var uniquePbsTid = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.generateUUID)();
      (serverBidders.length === 0 && hasModuleBids ? [null] : serverBidders).forEach(function (bidderCode) {
        var bidderRequestId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUniqueIdentifierStr)();
        var metrics = auctionMetrics.fork();
        var bidderRequest = addOrtb2({
          bidderCode: bidderCode,
          auctionId: auctionId,
          bidderRequestId: bidderRequestId,
          uniquePbsTid: uniquePbsTid,
          bids: hookedGetBids({
            bidderCode: bidderCode,
            auctionId: auctionId,
            bidderRequestId: bidderRequestId,
            'adUnits': (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnitsS2SCopy),
            src: _constants_json__WEBPACK_IMPORTED_MODULE_13__.S2S.SRC,
            metrics: metrics
          }),
          auctionStart: auctionStart,
          timeout: s2sConfig.timeout,
          src: _constants_json__WEBPACK_IMPORTED_MODULE_13__.S2S.SRC,
          refererInfo: refererInfo,
          metrics: metrics
        }, s2sParams);
        if (bidderRequest.bids.length !== 0) {
          bidRequests.push(bidderRequest);
        }
      });

      // update the s2sAdUnits object and remove all bids that didn't pass sizeConfig/label checks from getBids()
      // this is to keep consistency and only allow bids/adunits that passed the checks to go to pbs
      adUnitsS2SCopy.forEach(function (adUnitCopy) {
        var validBids = adUnitCopy.bids.filter(function (adUnitBid) {
          return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.find)(bidRequests, function (request) {
            return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.find)(request.bids, function (reqBid) {
              return reqBid.bidId === adUnitBid.bid_id;
            });
          });
        });
        adUnitCopy.bids = validBids;
      });
      bidRequests.forEach(function (request) {
        if (request.adUnitsS2SCopy === undefined) {
          request.adUnitsS2SCopy = adUnitsS2SCopy.filter(function (au) {
            return au.bids.length > 0 || au.s2sBid != null;
          });
        }
      });
    }
  });

  // client adapters
  var adUnitsClientCopy = getAdUnitCopyForClientAdapters(adUnits);
  clientBidders.forEach(function (bidderCode) {
    var bidderRequestId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUniqueIdentifierStr)();
    var metrics = auctionMetrics.fork();
    var bidderRequest = addOrtb2({
      bidderCode: bidderCode,
      auctionId: auctionId,
      bidderRequestId: bidderRequestId,
      bids: hookedGetBids({
        bidderCode: bidderCode,
        auctionId: auctionId,
        bidderRequestId: bidderRequestId,
        'adUnits': (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnitsClientCopy),
        labels: labels,
        src: 'client',
        metrics: metrics
      }),
      auctionStart: auctionStart,
      timeout: cbTimeout,
      refererInfo: refererInfo,
      metrics: metrics
    });
    var adapter = _bidderRegistry[bidderCode];
    if (!adapter) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("Trying to make a request for bidder that does not exist: ".concat(bidderCode));
    }
    if (adapter && bidderRequest.bids && bidderRequest.bids.length !== 0) {
      bidRequests.push(bidderRequest);
    }
  });
  bidRequests.forEach(function (bidRequest) {
    if (gdprDataHandler.getConsentData()) {
      bidRequest['gdprConsent'] = gdprDataHandler.getConsentData();
    }
    if (uspDataHandler.getConsentData()) {
      bidRequest['uspConsent'] = uspDataHandler.getConsentData();
    }
    if (gppDataHandler.getConsentData()) {
      bidRequest['gppConsent'] = gppDataHandler.getConsentData();
    }
  });
  return bidRequests;
}, 'makeBidRequests');
adapterManager.callBids = function (adUnits, bidRequests, addBidResponse, doneCb, requestCallbacks, requestBidsTimeout, onTimelyResponse) {
  var ortb2Fragments = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
  if (!bidRequests.length) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)('callBids executed with no bidRequests.  Were they filtered by labels or sizing?');
    return;
  }
  var _bidRequests$reduce = bidRequests.reduce(function (partitions, bidRequest) {
      partitions[Number(typeof bidRequest.src !== 'undefined' && bidRequest.src === _constants_json__WEBPACK_IMPORTED_MODULE_13__.S2S.SRC)].push(bidRequest);
      return partitions;
    }, [[], []]),
    _bidRequests$reduce2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_18__["default"])(_bidRequests$reduce, 2),
    clientBidRequests = _bidRequests$reduce2[0],
    serverBidRequests = _bidRequests$reduce2[1];
  var uniqueServerBidRequests = [];
  serverBidRequests.forEach(function (serverBidRequest) {
    var index = -1;
    for (var i = 0; i < uniqueServerBidRequests.length; ++i) {
      if (serverBidRequest.uniquePbsTid === uniqueServerBidRequests[i].uniquePbsTid) {
        index = i;
        break;
      }
    }
    if (index <= -1) {
      uniqueServerBidRequests.push(serverBidRequest);
    }
  });
  var counter = 0;
  _s2sConfigs.forEach(function (s2sConfig) {
    if (s2sConfig && uniqueServerBidRequests[counter] && getS2SBidderSet(s2sConfig).has(uniqueServerBidRequests[counter].bidderCode)) {
      // s2s should get the same client side timeout as other client side requests.
      var s2sAjax = (0,_ajax_js__WEBPACK_IMPORTED_MODULE_19__.ajaxBuilder)(requestBidsTimeout, requestCallbacks ? {
        request: requestCallbacks.request.bind(null, 's2s'),
        done: requestCallbacks.done
      } : undefined);
      var adaptersServerSide = s2sConfig.bidders;
      var s2sAdapter = _bidderRegistry[s2sConfig.adapter];
      var uniquePbsTid = uniqueServerBidRequests[counter].uniquePbsTid;
      var adUnitsS2SCopy = uniqueServerBidRequests[counter].adUnitsS2SCopy;
      var uniqueServerRequests = serverBidRequests.filter(function (serverBidRequest) {
        return serverBidRequest.uniquePbsTid === uniquePbsTid;
      });
      if (s2sAdapter) {
        var s2sBidRequest = {
          'ad_units': adUnitsS2SCopy,
          s2sConfig: s2sConfig,
          ortb2Fragments: ortb2Fragments
        };
        if (s2sBidRequest.ad_units.length) {
          var doneCbs = uniqueServerRequests.map(function (bidRequest) {
            bidRequest.start = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.timestamp)();
            return doneCb.bind(bidRequest);
          });
          var bidders = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getBidderCodes)(s2sBidRequest.ad_units).filter(function (bidder) {
            return adaptersServerSide.includes(bidder);
          });
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)("CALLING S2S HEADER BIDDERS ==== ".concat(bidders.length > 0 ? bidders.join(', ') : 'No bidder specified, using "ortb2Imp" definition(s) only'));

          // fire BID_REQUESTED event for each s2s bidRequest
          uniqueServerRequests.forEach(function (bidRequest) {
            // add the new sourceTid
            _events_js__WEBPACK_IMPORTED_MODULE_12__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_13__.EVENTS.BID_REQUESTED, _objectSpread(_objectSpread({}, bidRequest), {}, {
              tid: bidRequest.auctionId
            }));
          });

          // make bid requests
          s2sAdapter.callBids(s2sBidRequest, serverBidRequests, addBidResponse, function () {
            return doneCbs.forEach(function (done) {
              return done();
            });
          }, s2sAjax);
        }
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('missing ' + s2sConfig.adapter);
      }
      counter++;
    }
  });

  // handle client adapter requests
  clientBidRequests.forEach(function (bidRequest) {
    bidRequest.start = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.timestamp)();
    // TODO : Do we check for bid in pool from here and skip calling adapter again ?
    var adapter = _bidderRegistry[bidRequest.bidderCode];
    _config_js__WEBPACK_IMPORTED_MODULE_3__.config.runWithBidder(bidRequest.bidderCode, function () {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)("CALLING BIDDER");
      _events_js__WEBPACK_IMPORTED_MODULE_12__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_13__.EVENTS.BID_REQUESTED, bidRequest);
    });
    var ajax = (0,_ajax_js__WEBPACK_IMPORTED_MODULE_19__.ajaxBuilder)(requestBidsTimeout, requestCallbacks ? {
      request: requestCallbacks.request.bind(null, bidRequest.bidderCode),
      done: requestCallbacks.done
    } : undefined);
    var adapterDone = doneCb.bind(bidRequest);
    try {
      _config_js__WEBPACK_IMPORTED_MODULE_3__.config.runWithBidder(bidRequest.bidderCode, _utils_js__WEBPACK_IMPORTED_MODULE_4__.bind.call(adapter.callBids, adapter, bidRequest, addBidResponse, adapterDone, ajax, onTimelyResponse, _config_js__WEBPACK_IMPORTED_MODULE_3__.config.callbackWithBidder(bidRequest.bidderCode)));
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("".concat(bidRequest.bidderCode, " Bid Adapter emitted an uncaught error when parsing their bidRequest"), {
        e: e,
        bidRequest: bidRequest
      });
      adapterDone();
    }
  });
};
function getSupportedMediaTypes(bidderCode) {
  var supportedMediaTypes = [];
  if ( true && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.includes)(adapterManager.videoAdapters, bidderCode)) supportedMediaTypes.push('video');
  if ( true && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.includes)(_native_js__WEBPACK_IMPORTED_MODULE_14__.nativeAdapters, bidderCode)) supportedMediaTypes.push('native');
  return supportedMediaTypes;
}
adapterManager.videoAdapters = []; // added by adapterLoader for now

adapterManager.registerBidAdapter = function (bidAdapter, bidderCode) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref4$supportedMediaT = _ref4.supportedMediaTypes,
    supportedMediaTypes = _ref4$supportedMediaT === void 0 ? [] : _ref4$supportedMediaT;
  if (bidAdapter && bidderCode) {
    if (typeof bidAdapter.callBids === 'function') {
      var _bidAdapter$getSpec;
      _bidderRegistry[bidderCode] = bidAdapter;
      _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__.GDPR_GVLIDS.register(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_BIDDER, bidderCode, (_bidAdapter$getSpec = bidAdapter.getSpec) === null || _bidAdapter$getSpec === void 0 ? void 0 : _bidAdapter$getSpec.call(bidAdapter).gvlid);
      if ( true && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.includes)(supportedMediaTypes, 'video')) {
        adapterManager.videoAdapters.push(bidderCode);
      }
      if ( true && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.includes)(supportedMediaTypes, 'native')) {
        _native_js__WEBPACK_IMPORTED_MODULE_14__.nativeAdapters.push(bidderCode);
      }
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Bidder adaptor error for bidder code: ' + bidderCode + 'bidder must implement a callBids() function');
    }
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('bidAdapter or bidderCode not specified');
  }
};
adapterManager.aliasBidAdapter = function (bidderCode, alias, options) {
  var existingAlias = _bidderRegistry[alias];
  if (typeof existingAlias === 'undefined') {
    var bidAdapter = _bidderRegistry[bidderCode];
    if (typeof bidAdapter === 'undefined') {
      // check if alias is part of s2sConfig and allow them to register if so (as base bidder may be s2s-only)
      var nonS2SAlias = [];
      _s2sConfigs.forEach(function (s2sConfig) {
        if (s2sConfig.bidders && s2sConfig.bidders.length) {
          var s2sBidders = s2sConfig && s2sConfig.bidders;
          if (!(s2sConfig && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_17__.includes)(s2sBidders, alias))) {
            nonS2SAlias.push(bidderCode);
          } else {
            _aliasRegistry[alias] = bidderCode;
          }
        }
      });
      nonS2SAlias.forEach(function (bidderCode) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('bidderCode "' + bidderCode + '" is not an existing bidder.', 'adapterManager.aliasBidAdapter');
      });
    } else {
      try {
        var newAdapter;
        var supportedMediaTypes = getSupportedMediaTypes(bidderCode);
        // Have kept old code to support backward compatibilitiy.
        // Remove this if loop when all adapters are supporting bidderFactory. i.e When Prebid.js is 1.0
        if (bidAdapter.constructor.prototype != Object.prototype) {
          newAdapter = new bidAdapter.constructor();
          newAdapter.setBidderCode(alias);
        } else {
          var spec = bidAdapter.getSpec();
          var gvlid = options && options.gvlid;
          var skipPbsAliasing = options && options.skipPbsAliasing;
          newAdapter = (0,_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_20__.newBidder)(Object.assign({}, spec, {
            code: alias,
            gvlid: gvlid,
            skipPbsAliasing: skipPbsAliasing
          }));
          _aliasRegistry[alias] = bidderCode;
        }
        adapterManager.registerBidAdapter(newAdapter, alias, {
          supportedMediaTypes: supportedMediaTypes
        });
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(bidderCode + ' bidder does not currently support aliasing.', 'adapterManager.aliasBidAdapter');
      }
    }
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)('alias name "' + alias + '" has been already specified.');
  }
};
adapterManager.resolveAlias = function (alias) {
  var code = alias;
  var visited;
  while (_aliasRegistry[code] && (!visited || !visited.has(code))) {
    code = _aliasRegistry[code];
    (visited = visited || new Set()).add(code);
  }
  return code;
};
adapterManager.registerAnalyticsAdapter = function (_ref5) {
  var adapter = _ref5.adapter,
    code = _ref5.code,
    gvlid = _ref5.gvlid;
  if (adapter && code) {
    if (typeof adapter.enableAnalytics === 'function') {
      adapter.code = code;
      _analyticsRegistry[code] = {
        adapter: adapter,
        gvlid: gvlid
      };
      _consentHandler_js__WEBPACK_IMPORTED_MODULE_10__.GDPR_GVLIDS.register(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_ANALYTICS, code, gvlid);
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("Prebid Error: Analytics adaptor error for analytics \"".concat(code, "\"\n        analytics adapter must implement an enableAnalytics() function"));
    }
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Prebid Error: analyticsAdapter or analyticsCode not specified');
  }
};
adapterManager.enableAnalytics = function (config) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(config)) {
    config = [config];
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__._each)(config, function (adapterConfig) {
    var entry = _analyticsRegistry[adapterConfig.provider];
    if (entry && entry.adapter) {
      if (dep.isAllowed(_activities_activities_js__WEBPACK_IMPORTED_MODULE_15__.ACTIVITY_REPORT_ANALYTICS, activityParams(_activities_modules_js__WEBPACK_IMPORTED_MODULE_6__.MODULE_TYPE_ANALYTICS, adapterConfig.provider, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _activities_params_js__WEBPACK_IMPORTED_MODULE_5__.ACTIVITY_PARAM_ANL_CONFIG, adapterConfig)))) {
        entry.adapter.enableAnalytics(adapterConfig);
      }
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("Prebid Error: no analytics adapter found in registry for '".concat(adapterConfig.provider, "'."));
    }
  });
};
adapterManager.getBidAdapter = function (bidder) {
  return _bidderRegistry[bidder];
};
adapterManager.getAnalyticsAdapter = function (code) {
  return _analyticsRegistry[code];
};
function getBidderMethod(bidder, method) {
  var adapter = _bidderRegistry[bidder];
  var spec = (adapter === null || adapter === void 0 ? void 0 : adapter.getSpec) && adapter.getSpec();
  if (spec && spec[method] && typeof spec[method] === 'function') {
    return [spec, spec[method]];
  }
}
function invokeBidderMethod(bidder, method, spec, fn) {
  try {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking ".concat(bidder, ".").concat(method));
    for (var _len = arguments.length, params = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      params[_key - 4] = arguments[_key];
    }
    _config_js__WEBPACK_IMPORTED_MODULE_3__.config.runWithBidder(bidder, fn.bind.apply(fn, [spec].concat(params)));
  } catch (e) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)("Error calling ".concat(method, " of ").concat(bidder));
  }
}
function tryCallBidderMethod(bidder, method, param) {
  if ((param === null || param === void 0 ? void 0 : param.src) !== _constants_json__WEBPACK_IMPORTED_MODULE_13__.S2S.SRC) {
    var target = getBidderMethod(bidder, method);
    if (target != null) {
      invokeBidderMethod.apply(void 0, [bidder, method].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_21__["default"])(target), [param]));
    }
  }
}
adapterManager.callTimedOutBidders = function (adUnits, timedOutBidders, cbTimeout) {
  timedOutBidders = timedOutBidders.map(function (timedOutBidder) {
    // Adding user configured params & timeout to timeout event data
    timedOutBidder.params = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUserConfiguredParams)(adUnits, timedOutBidder.adUnitCode, timedOutBidder.bidder);
    timedOutBidder.timeout = cbTimeout;
    return timedOutBidder;
  });
  timedOutBidders = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.groupBy)(timedOutBidders, 'bidder');
  Object.keys(timedOutBidders).forEach(function (bidder) {
    tryCallBidderMethod(bidder, 'onTimeout', timedOutBidders[bidder]);
  });
};
adapterManager.callBidWonBidder = function (bidder, bid, adUnits) {
  // Adding user configured params to bidWon event data
  bid.params = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getUserConfiguredParams)(adUnits, bid.adUnitCode, bid.bidder);
  _adUnits_js__WEBPACK_IMPORTED_MODULE_8__.adunitCounter.incrementBidderWinsCounter(bid.adUnitCode, bid.bidder);
  tryCallBidderMethod(bidder, 'onBidWon', bid);
};
adapterManager.callBidBillableBidder = function (bid) {
  tryCallBidderMethod(bid.bidder, 'onBidBillable', bid);
};
adapterManager.callSetTargetingBidder = function (bidder, bid) {
  tryCallBidderMethod(bidder, 'onSetTargeting', bid);
};
adapterManager.callBidViewableBidder = function (bidder, bid) {
  tryCallBidderMethod(bidder, 'onBidViewable', bid);
};
adapterManager.callBidderError = function (bidder, error, bidderRequest) {
  var param = {
    error: error,
    bidderRequest: bidderRequest
  };
  tryCallBidderMethod(bidder, 'onBidderError', param);
};
function resolveAlias(alias) {
  var seen = new Set();
  while (_aliasRegistry.hasOwnProperty(alias) && !seen.has(alias)) {
    seen.add(alias);
    alias = _aliasRegistry[alias];
  }
  return alias;
}
/**
 * Ask every adapter to delete PII.
 * See https://github.com/prebid/Prebid.js/issues/9081
 */
adapterManager.callDataDeletionRequest = (0,_hook_js__WEBPACK_IMPORTED_MODULE_9__.hook)('sync', function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var method = 'onDataDeletionRequest';
  Object.keys(_bidderRegistry).filter(function (bidder) {
    return !_aliasRegistry.hasOwnProperty(bidder);
  }).forEach(function (bidder) {
    var target = getBidderMethod(bidder, method);
    if (target != null) {
      var bidderRequests = _auctionManager_js__WEBPACK_IMPORTED_MODULE_22__.auctionManager.getBidsRequested().filter(function (br) {
        return resolveAlias(br.bidderCode) === bidder;
      });
      invokeBidderMethod.apply(void 0, [bidder, method].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_21__["default"])(target), [bidderRequests], args));
    }
  });
  Object.entries(_analyticsRegistry).forEach(function (_ref6) {
    var _entry$adapter;
    var _ref7 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_18__["default"])(_ref6, 2),
      name = _ref7[0],
      entry = _ref7[1];
    var fn = entry === null || entry === void 0 ? void 0 : (_entry$adapter = entry.adapter) === null || _entry$adapter === void 0 ? void 0 : _entry$adapter[method];
    if (typeof fn === 'function') {
      try {
        fn.apply(entry.adapter, args);
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("error calling ".concat(method, " of ").concat(name), e);
      }
    }
  });
});
/* harmony default export */ __webpack_exports__["default"] = (adapterManager);

/***/ }),

/***/ "./src/adapters/bidderFactory.js":
/*!***************************************!*\
  !*** ./src/adapters/bidderFactory.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newBidder": function() { return /* binding */ newBidder; },
/* harmony export */   "registerBidder": function() { return /* binding */ registerBidder; }
/* harmony export */ });
/* unused harmony exports processBidderRequests, registerSyncInner, addComponentAuction, isValid */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _adapter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../adapter.js */ "./src/adapter.js");
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/* harmony import */ var _bidfactory_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../bidfactory.js */ "./src/bidfactory.js");
/* harmony import */ var _userSync_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../userSync.js */ "./src/userSync.js");
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../native.js */ "./src/native.js");
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../video.js */ "./src/video.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants.json */ "./src/constants.json");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../events.js */ "./src/events.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../hook.js */ "./src/hook.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _bidderSettings_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _activities_rules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _activities_activityParams_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../activities/activityParams.js */ "./src/activities/activityParams.js");
/* harmony import */ var _activities_modules_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _activities_activities_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../activities/activities.js */ "./src/activities/activities.js");






















/**
 * This file aims to support Adapters during the Prebid 0.x -> 1.x transition.
 *
 * Prebid 1.x and Prebid 0.x will be in separate branches--perhaps for a long time.
 * This function defines an API for adapter construction which is compatible with both versions.
 * Adapters which use it can maintain their code in master, and only this file will need to change
 * in the 1.x branch.
 *
 * Typical usage looks something like:
 *
 * const adapter = registerBidder({
 *   code: 'myBidderCode',
 *   aliases: ['alias1', 'alias2'],
 *   supportedMediaTypes: ['video', 'native'],
 *   isBidRequestValid: function(paramsObject) { return true/false },
 *   buildRequests: function(bidRequests, bidderRequest) { return some ServerRequest(s) },
 *   interpretResponse: function(oneServerResponse) { return some Bids, or throw an error. }
 * });
 *
 * @see BidderSpec for the full API and more thorough descriptions.
 *
 */

/**
 * @typedef {object} BidderSpec An object containing the adapter-specific functions needed to
 * make a Bidder.
 *
 * @property {string} code A code which will be used to uniquely identify this bidder. This should be the same
 *   one as is used in the call to registerBidAdapter
 * @property {string[]} [aliases] A list of aliases which should also resolve to this bidder.
 * @property {MediaType[]} [supportedMediaTypes]: A list of Media Types which the adapter supports.
 * @property {function(object): boolean} isBidRequestValid Determines whether or not the given bid has all the params
 *   needed to make a valid request.
 * @property {function(BidRequest[], bidderRequest): ServerRequest|ServerRequest[]} buildRequests Build the request to the Server
 *   which requests Bids for the given array of Requests. Each BidRequest in the argument array is guaranteed to have
 *   passed the isBidRequestValid() test.
 * @property {function(ServerResponse, BidRequest): Bid[]} interpretResponse Given a successful response from the Server,
 *   interpret it and return the Bid objects. This function will be run inside a try/catch.
 *   If it throws any errors, your bids will be discarded.
 * @property {function(SyncOptions, ServerResponse[]): UserSync[]} [getUserSyncs] Given an array of all the responses
 *   from the server, determine which user syncs should occur. The argument array will contain every element
 *   which has been sent through to interpretResponse. The order of syncs in this array matters. The most
 *   important ones should come first, since publishers may limit how many are dropped on their page.
 * @property {function(object): object} transformBidParams Updates bid params before creating bid request
 }}
 */

/**
 * @typedef {object} BidRequest
 *
 * @property {string} bidId A string which uniquely identifies this BidRequest in the current Auction.
 * @property {object} params Any bidder-specific params which the publisher used in their bid request.
 */

/**
 * @typedef {object} BidderAuctionResponse An object encapsulating an adapter response for current Auction
 *
 * @property {Array<Bid>} bids Contextual bids returned by this adapter, if any
 * @property {object|null} fledgeAuctionConfigs Optional FLEDGE response, as a map of impid -> auction_config
 */

/**
 * @typedef {object} ServerRequest
 *
 * @property {('GET'|'POST')} method The type of request which this is.
 * @property {string} url The endpoint for the request. For example, "//bids.example.com".
 * @property {string|object} data Data to be sent in the request.
 * @property {object} options Content-Type set in the header of the bid request, overrides default 'text/plain'.
 *   If this is a GET request, they'll become query params. If it's a POST request, they'll be added to the body.
 *   Strings will be added as-is. Objects will be unpacked into query params based on key/value mappings, or
 *   JSON-serialized into the Request body.
 */

/**
 * @typedef {object} ServerResponse
 *
 * @property {*} body The response body. If this is legal JSON, then it will be parsed. Otherwise it'll be a
 *   string with the body's content.
 * @property {{get: function(string): string} headers The response headers.
 *   Call this like `ServerResponse.headers.get("Content-Type")`
 */

/**
 * @typedef {object} Bid
 *
 * @property {string} requestId The specific BidRequest which this bid is aimed at.
 *   This should match the BidRequest.bidId which this Bid targets.
 * @property {string} ad A URL which can be used to load this ad, if it's chosen by the publisher.
 * @property {string} currency The currency code for the cpm value
 * @property {number} cpm The bid price, in US cents per thousand impressions.
 * @property {number} ttl Time-to-live - how long (in seconds) Prebid can use this bid.
 * @property {boolean} netRevenue Boolean defining whether the bid is Net or Gross.  The default is true (Net).
 * @property {number} height The height of the ad, in pixels.
 * @property {number} width The width of the ad, in pixels.
 *
 * @property {object} [native] Object for storing native creative assets
 * @property {object} [video] Object for storing video response data
 * @property {object} [meta] Object for storing bid meta data
 * @property {string} [meta.primaryCatId] The IAB primary category ID
 * @property [Renderer] renderer A Renderer which can be used as a default for this bid,
 *   if the publisher doesn't override it. This is only relevant for Outstream Video bids.
 */

/**
 * @typedef {Object} SyncOptions
 *
 * An object containing information about usersyncs which the adapter should obey.
 *
 * @property {boolean} iframeEnabled True if iframe usersyncs are allowed, and false otherwise
 * @property {boolean} pixelEnabled True if image usersyncs are allowed, and false otherwise
 */

/**
 * TODO: Move this to the UserSync module after that PR is merged.
 *
 * @typedef {object} UserSync
 *
 * @property {('image'|'iframe')} type The type of user sync to be done.
 * @property {string} url The URL which makes the sync happen.
 */

// common params for all mediaTypes
var COMMON_BID_RESPONSE_KEYS = ['cpm', 'ttl', 'creativeId', 'netRevenue', 'currency'];

/**
 * Register a bidder with prebid, using the given spec.
 *
 * If possible, Adapter modules should use this function instead of adapterManager.registerBidAdapter().
 *
 * @param {BidderSpec} spec An object containing the bare-bones functions we need to make a Bidder.
 */
function registerBidder(spec) {
  var mediaTypes = Array.isArray(spec.supportedMediaTypes) ? {
    supportedMediaTypes: spec.supportedMediaTypes
  } : undefined;
  function putBidder(spec) {
    var bidder = newBidder(spec);
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerBidAdapter(bidder, spec.code, mediaTypes);
  }
  putBidder(spec);
  if (Array.isArray(spec.aliases)) {
    spec.aliases.forEach(function (alias) {
      var aliasCode = alias;
      var gvlid;
      var skipPbsAliasing;
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(alias)) {
        aliasCode = alias.code;
        gvlid = alias.gvlid;
        skipPbsAliasing = alias.skipPbsAliasing;
      }
      _adapterManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].aliasRegistry[aliasCode] = spec.code;
      putBidder(Object.assign({}, spec, {
        code: aliasCode,
        gvlid: gvlid,
        skipPbsAliasing: skipPbsAliasing
      }));
    });
  }
}
function guardTids(bidderCode) {
  if ((0,_activities_rules_js__WEBPACK_IMPORTED_MODULE_2__.isActivityAllowed)(_activities_activities_js__WEBPACK_IMPORTED_MODULE_3__.ACTIVITY_TRANSMIT_TID, (0,_activities_activityParams_js__WEBPACK_IMPORTED_MODULE_4__.activityParams)(_activities_modules_js__WEBPACK_IMPORTED_MODULE_5__.MODULE_TYPE_BIDDER, bidderCode))) {
    return {
      bidRequest: function bidRequest(br) {
        return br;
      },
      bidderRequest: function bidderRequest(br) {
        return br;
      }
    };
  }
  function _get(target, prop, receiver) {
    if (['transactionId', 'auctionId'].includes(prop)) {
      return null;
    }
    return Reflect.get(target, prop, receiver);
  }
  var bidRequest = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.memoize)(function (br) {
    return new Proxy(br, {
      get: _get
    });
  }, function (arg) {
    return arg.bidId;
  });
  /**
   * Return a view on bidd(er) requests where auctionId/transactionId are nulled if the bidder is not allowed `transmitTid`.
   *
   * Because both auctionId and transactionId are used for Prebid's own internal bookkeeping, we cannot simply erase them
   * from request objects; and because request objects are quite complex and not easily cloneable, we hide the IDs
   * with a proxy instead. This should be used only around the adapter logic.
   */
  return {
    bidRequest: bidRequest,
    bidderRequest: function bidderRequest(br) {
      return new Proxy(br, {
        get: function get(target, prop, receiver) {
          if (prop === 'bids') return br.bids.map(bidRequest);
          return _get(target, prop, receiver);
        }
      });
    }
  };
}

/**
 * Make a new bidder from the given spec. This is exported mainly for testing.
 * Adapters will probably find it more convenient to use registerBidder instead.
 *
 * @param {BidderSpec} spec
 */
function newBidder(spec) {
  return Object.assign(new _adapter_js__WEBPACK_IMPORTED_MODULE_6__["default"](spec.code), {
    getSpec: function getSpec() {
      return Object.freeze(Object.assign({}, spec));
    },
    registerSyncs: registerSyncs,
    callBids: function callBids(bidderRequest, addBidResponse, done, ajax, onTimelyResponse, configEnabledCallback) {
      if (!Array.isArray(bidderRequest.bids)) {
        return;
      }
      var tidGuard = guardTids(bidderRequest.bidderCode);
      var adUnitCodesHandled = {};
      function addBidWithCode(adUnitCode, bid) {
        var metrics = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_7__.useMetrics)(bid.metrics);
        metrics.checkpoint('addBidResponse');
        adUnitCodesHandled[adUnitCode] = true;
        if (metrics.measureTime('addBidResponse.validate', function () {
          return isValid(adUnitCode, bid);
        })) {
          addBidResponse(adUnitCode, bid);
        } else {
          addBidResponse.reject(adUnitCode, bid, _constants_json__WEBPACK_IMPORTED_MODULE_8__.REJECTION_REASON.INVALID);
        }
      }

      // After all the responses have come back, call done() and
      // register any required usersync pixels.
      var responses = [];
      function afterAllResponses() {
        done();
        _config_js__WEBPACK_IMPORTED_MODULE_9__.config.runWithBidder(spec.code, function () {
          _events_js__WEBPACK_IMPORTED_MODULE_10__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_8__.EVENTS.BIDDER_DONE, bidderRequest);
          registerSyncs(responses, bidderRequest.gdprConsent, bidderRequest.uspConsent, bidderRequest.gppConsent);
        });
      }
      var validBidRequests = adapterMetrics(bidderRequest).measureTime('validate', function () {
        return bidderRequest.bids.filter(function (br) {
          return filterAndWarn(tidGuard.bidRequest(br));
        });
      });
      if (validBidRequests.length === 0) {
        afterAllResponses();
        return;
      }
      var bidRequestMap = {};
      validBidRequests.forEach(function (bid) {
        bidRequestMap[bid.bidId] = bid;
        // Delete this once we are 1.0
        if (!bid.adUnitCode) {
          bid.adUnitCode = bid.placementCode;
        }
      });
      processBidderRequests(spec, validBidRequests.map(tidGuard.bidRequest), tidGuard.bidderRequest(bidderRequest), ajax, configEnabledCallback, {
        onRequest: function onRequest(requestObject) {
          return _events_js__WEBPACK_IMPORTED_MODULE_10__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_8__.EVENTS.BEFORE_BIDDER_HTTP, bidderRequest, requestObject);
        },
        onResponse: function onResponse(resp) {
          onTimelyResponse(spec.code);
          responses.push(resp);
        },
        /** Process eventual BidderAuctionResponse.fledgeAuctionConfig field in response.
         * @param {Array<FledgeAuctionConfig>} fledgeAuctionConfigs
         */
        onFledgeAuctionConfigs: function onFledgeAuctionConfigs(fledgeAuctionConfigs) {
          fledgeAuctionConfigs.forEach(function (fledgeAuctionConfig) {
            var bidRequest = bidRequestMap[fledgeAuctionConfig.bidId];
            if (bidRequest) {
              addComponentAuction(bidRequest.adUnitCode, fledgeAuctionConfig.config);
            } else {
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('Received fledge auction configuration for an unknown bidId', fledgeAuctionConfig);
            }
          });
        },
        // If the server responds with an error, there's not much we can do beside logging.
        onError: function onError(errorMessage, error) {
          onTimelyResponse(spec.code);
          _adapterManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].callBidderError(spec.code, error, bidderRequest);
          _events_js__WEBPACK_IMPORTED_MODULE_10__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_8__.EVENTS.BIDDER_ERROR, {
            error: error,
            bidderRequest: bidderRequest
          });
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("Server call for ".concat(spec.code, " failed: ").concat(errorMessage, " ").concat(error.status, ". Continuing without bids."));
        },
        onBid: function onBid(bid) {
          var bidRequest = bidRequestMap[bid.requestId];
          if (bidRequest) {
            bid.adapterCode = bidRequest.bidder;
            if (isInvalidAlternateBidder(bid.bidderCode, bidRequest.bidder)) {
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(bid.bidderCode, " is not a registered partner or known bidder of ").concat(bidRequest.bidder, ", hence continuing without bid. If you wish to support this bidder, please mark allowAlternateBidderCodes as true in bidderSettings."));
              addBidResponse.reject(bidRequest.adUnitCode, bid, _constants_json__WEBPACK_IMPORTED_MODULE_8__.REJECTION_REASON.BIDDER_DISALLOWED);
              return;
            }
            // creating a copy of original values as cpm and currency are modified later
            bid.originalCpm = bid.cpm;
            bid.originalCurrency = bid.currency;
            bid.meta = bid.meta || Object.assign({}, bid[bidRequest.bidder]);
            var prebidBid = Object.assign((0,_bidfactory_js__WEBPACK_IMPORTED_MODULE_11__.createBid)(_constants_json__WEBPACK_IMPORTED_MODULE_8__.STATUS.GOOD, bidRequest), bid);
            addBidWithCode(bidRequest.adUnitCode, prebidBid);
          } else {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Bidder ".concat(spec.code, " made bid for unknown request ID: ").concat(bid.requestId, ". Ignoring."));
            addBidResponse.reject(null, bid, _constants_json__WEBPACK_IMPORTED_MODULE_8__.REJECTION_REASON.INVALID_REQUEST_ID);
          }
        },
        onCompletion: afterAllResponses
      });
    }
  });
  function isInvalidAlternateBidder(responseBidder, requestBidder) {
    var allowAlternateBidderCodes = _bidderSettings_js__WEBPACK_IMPORTED_MODULE_12__.bidderSettings.get(requestBidder, 'allowAlternateBidderCodes') || false;
    var alternateBiddersList = _bidderSettings_js__WEBPACK_IMPORTED_MODULE_12__.bidderSettings.get(requestBidder, 'allowedAlternateBidderCodes');
    if (!!responseBidder && !!requestBidder && requestBidder !== responseBidder) {
      alternateBiddersList = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(alternateBiddersList) ? alternateBiddersList.map(function (val) {
        return val.trim().toLowerCase();
      }).filter(function (val) {
        return !!val;
      }).filter(_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques) : alternateBiddersList;
      if (!allowAlternateBidderCodes || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(alternateBiddersList) && alternateBiddersList[0] !== '*' && !alternateBiddersList.includes(responseBidder)) {
        return true;
      }
    }
    return false;
  }
  function registerSyncs(responses, gdprConsent, uspConsent, gppConsent) {
    registerSyncInner(spec, responses, gdprConsent, uspConsent, gppConsent);
  }
  function filterAndWarn(bid) {
    if (!spec.isBidRequestValid(bid)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Invalid bid sent to bidder ".concat(spec.code, ": ").concat(JSON.stringify(bid)));
      return false;
    }
    return true;
  }
}

/**
 * Run a set of bid requests - that entails converting them to HTTP requests, sending
 * them over the network, and parsing the responses.
 *
 * @param spec bid adapter spec
 * @param bids bid requests to run
 * @param bidderRequest the bid request object that `bids` is connected to
 * @param ajax ajax method to use
 * @param wrapCallback {function(callback)} a function used to wrap every callback (for the purpose of `config.currentBidder`)
 * @param onRequest {function({})} invoked once for each HTTP request built by the adapter - with the raw request
 * @param onResponse {function({})} invoked once on each successful HTTP response - with the raw response
 * @param onError {function(String, {})} invoked once for each HTTP error - with status code and response
 * @param onBid {function({})} invoked once for each bid in the response - with the bid as returned by interpretResponse
 * @param onCompletion {function()} invoked once when all bid requests have been processed
 */
var processBidderRequests = (0,_hook_js__WEBPACK_IMPORTED_MODULE_13__.hook)('sync', function (spec, bids, bidderRequest, ajax, wrapCallback, _ref) {
  var onRequest = _ref.onRequest,
    onResponse = _ref.onResponse,
    onFledgeAuctionConfigs = _ref.onFledgeAuctionConfigs,
    onError = _ref.onError,
    onBid = _ref.onBid,
    onCompletion = _ref.onCompletion;
  var metrics = adapterMetrics(bidderRequest);
  onCompletion = metrics.startTiming('total').stopBefore(onCompletion);
  var requests = metrics.measureTime('buildRequests', function () {
    return spec.buildRequests(bids, bidderRequest);
  });
  if (!requests || requests.length === 0) {
    onCompletion();
    return;
  }
  if (!Array.isArray(requests)) {
    requests = [requests];
  }
  var requestDone = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.delayExecution)(onCompletion, requests.length);
  requests.forEach(function (request) {
    var requestMetrics = metrics.fork();
    function addBid(bid) {
      if (bid != null) bid.metrics = requestMetrics.fork().renameWith();
      onBid(bid);
    }
    // If the server responds successfully, use the adapter code to unpack the Bids from it.
    // If the adapter code fails, no bids should be added. After all the bids have been added,
    // make sure to call the `requestDone` function so that we're one step closer to calling onCompletion().
    var onSuccess = wrapCallback(function (response, responseObj) {
      networkDone();
      try {
        response = JSON.parse(response);
      } catch (e) {/* response might not be JSON... that's ok. */}

      // Make response headers available for #1742. These are lazy-loaded because most adapters won't need them.
      response = {
        body: response,
        headers: headerParser(responseObj)
      };
      onResponse(response);
      try {
        response = requestMetrics.measureTime('interpretResponse', function () {
          return spec.interpretResponse(response, request);
        });
      } catch (err) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("Bidder ".concat(spec.code, " failed to interpret the server's response. Continuing without bids"), null, err);
        requestDone();
        return;
      }
      var bids;
      // Extract additional data from a structured {BidderAuctionResponse} response
      if (response && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(response.fledgeAuctionConfigs)) {
        onFledgeAuctionConfigs(response.fledgeAuctionConfigs);
        bids = response.bids;
      } else {
        bids = response;
      }
      if (bids) {
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bids)) {
          bids.forEach(addBid);
        } else {
          addBid(bids);
        }
      }
      requestDone();
      function headerParser(xmlHttpResponse) {
        return {
          get: responseObj.getResponseHeader.bind(responseObj)
        };
      }
    });
    var onFailure = wrapCallback(function (errorMessage, error) {
      networkDone();
      onError(errorMessage, error);
      requestDone();
    });
    onRequest(request);
    var networkDone = requestMetrics.startTiming('net');
    switch (request.method) {
      case 'GET':
        ajax("".concat(request.url).concat(formatGetParameters(request.data)), {
          success: onSuccess,
          error: onFailure
        }, undefined, Object.assign({
          method: 'GET',
          withCredentials: true
        }, request.options));
        break;
      case 'POST':
        ajax(request.url, {
          success: onSuccess,
          error: onFailure
        }, typeof request.data === 'string' ? request.data : JSON.stringify(request.data), Object.assign({
          method: 'POST',
          contentType: 'text/plain',
          withCredentials: true
        }, request.options));
        break;
      default:
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Skipping invalid request from ".concat(spec.code, ". Request type ").concat(request.type, " must be GET or POST"));
        requestDone();
    }
    function formatGetParameters(data) {
      if (data) {
        return "?".concat((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_14__["default"])(data) === 'object' ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.parseQueryStringParameters)(data) : data);
      }
      return '';
    }
  });
}, 'processBidderRequests');
var registerSyncInner = (0,_hook_js__WEBPACK_IMPORTED_MODULE_13__.hook)('async', function (spec, responses, gdprConsent, uspConsent, gppConsent) {
  var aliasSyncEnabled = _config_js__WEBPACK_IMPORTED_MODULE_9__.config.getConfig('userSync.aliasSyncEnabled');
  if (spec.getUserSyncs && (aliasSyncEnabled || !_adapterManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].aliasRegistry[spec.code])) {
    var filterConfig = _config_js__WEBPACK_IMPORTED_MODULE_9__.config.getConfig('userSync.filterSettings');
    var syncs = spec.getUserSyncs({
      iframeEnabled: !!(filterConfig && (filterConfig.iframe || filterConfig.all)),
      pixelEnabled: !!(filterConfig && (filterConfig.image || filterConfig.all))
    }, responses, gdprConsent, uspConsent, gppConsent);
    if (syncs) {
      if (!Array.isArray(syncs)) {
        syncs = [syncs];
      }
      syncs.forEach(function (sync) {
        _userSync_js__WEBPACK_IMPORTED_MODULE_15__.userSync.registerSync(sync.type, spec.code, sync.url);
      });
      _userSync_js__WEBPACK_IMPORTED_MODULE_15__.userSync.bidderDone(spec.code);
    }
  }
}, 'registerSyncs');
var addComponentAuction = (0,_hook_js__WEBPACK_IMPORTED_MODULE_13__.hook)('sync', function (adUnitCode, fledgeAuctionConfig) {}, 'addComponentAuction');

// check that the bid has a width and height set
function validBidSize(adUnitCode, bid) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$index = _ref2.index,
    index = _ref2$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_16__.auctionManager.index : _ref2$index;
  if ((bid.width || parseInt(bid.width, 10) === 0) && (bid.height || parseInt(bid.height, 10) === 0)) {
    bid.width = parseInt(bid.width, 10);
    bid.height = parseInt(bid.height, 10);
    return true;
  }
  var bidRequest = index.getBidRequest(bid);
  var mediaTypes = index.getMediaTypes(bid);
  var sizes = bidRequest && bidRequest.sizes || mediaTypes && mediaTypes.banner && mediaTypes.banner.sizes;
  var parsedSizes = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.parseSizesInput)(sizes);

  // if a banner impression has one valid size, we assign that size to any bid
  // response that does not explicitly set width or height
  if (parsedSizes.length === 1) {
    var _parsedSizes$0$split = parsedSizes[0].split('x'),
      _parsedSizes$0$split2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_17__["default"])(_parsedSizes$0$split, 2),
      width = _parsedSizes$0$split2[0],
      height = _parsedSizes$0$split2[1];
    bid.width = parseInt(width, 10);
    bid.height = parseInt(height, 10);
    return true;
  }
  return false;
}

// Validate the arguments sent to us by the adapter. If this returns false, the bid should be totally ignored.
function isValid(adUnitCode, bid) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref3$index = _ref3.index,
    index = _ref3$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_16__.auctionManager.index : _ref3$index;
  function hasValidKeys() {
    var bidKeys = Object.keys(bid);
    return COMMON_BID_RESPONSE_KEYS.every(function (key) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_18__.includes)(bidKeys, key) && !(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_18__.includes)([undefined, null], bid[key]);
    });
  }
  function errorMessage(msg) {
    return "Invalid bid from ".concat(bid.bidderCode, ". Ignoring bid: ").concat(msg);
  }
  if (!adUnitCode) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('No adUnitCode was supplied to addBidResponse.');
    return false;
  }
  if (!bid) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Some adapter tried to add an undefined bid for ".concat(adUnitCode, "."));
    return false;
  }
  if (!hasValidKeys()) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(errorMessage("Bidder ".concat(bid.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.")));
    return false;
  }
  if ( true && bid.mediaType === 'native' && !(0,_native_js__WEBPACK_IMPORTED_MODULE_19__.nativeBidIsValid)(bid, {
    index: index
  })) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(errorMessage('Native bid missing some required properties.'));
    return false;
  }
  if ( true && bid.mediaType === 'video' && !(0,_video_js__WEBPACK_IMPORTED_MODULE_20__.isValidVideoBid)(bid, {
    index: index
  })) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(errorMessage("Video bid does not have required vastUrl or renderer property"));
    return false;
  }
  if (bid.mediaType === 'banner' && !validBidSize(adUnitCode, bid, {
    index: index
  })) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(errorMessage("Banner bids require a width and height"));
    return false;
  }
  return true;
}
function adapterMetrics(bidderRequest) {
  return (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_7__.useMetrics)(bidderRequest.metrics).renameWith(function (n) {
    return ["adapter.client.".concat(n), "adapters.client.".concat(bidderRequest.bidderCode, ".").concat(n)];
  });
}

/***/ }),

/***/ "./src/adloader.js":
/*!*************************!*\
  !*** ./src/adloader.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadExternalScript": function() { return /* binding */ loadExternalScript; }
/* harmony export */ });
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


var _requestCache = new WeakMap();
// The below list contains modules or vendors whom Prebid allows to load external JS.
var _approvedLoadExternalJSList = ['debugging', 'adloox', 'criteo', 'outstream', 'adagio', 'spotx', 'browsi', 'brandmetrics', 'justtag', 'tncId', 'akamaidap', 'ftrackId', 'inskin', 'hadron', 'medianet', 'improvedigital', 'aaxBlockmeter', 'pbjs-debug-ui', 'confiant', 'arcspan', 'airgrid', 'clean.io'];

/**
 * Loads external javascript. Can only be used if external JS is approved by Prebid. See https://github.com/prebid/prebid-js-external-js-template#policy
 * Each unique URL will be loaded at most 1 time.
 * @param {string} url the url to load
 * @param {string} moduleCode bidderCode or module code of the module requesting this resource
 * @param {function} [callback] callback function to be called after the script is loaded
 * @param {Document} [doc] the context document, in which the script will be loaded, defaults to loaded document
 * @param {object} an object of attributes to be added to the script with setAttribute by [key] and [value]; Only the attributes passed in the first request of a url will be added.
 */
function loadExternalScript(url, moduleCode, callback, doc, attributes) {
  if (!moduleCode || !url) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError)('cannot load external script without url and moduleCode');
    return;
  }
  if (!(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.includes)(_approvedLoadExternalJSList, moduleCode)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError)("".concat(moduleCode, " not whitelisted for loading external JavaScript"));
    return;
  }
  if (!doc) {
    doc = document; // provide a "valid" key for the WeakMap
  }
  // only load each asset once
  var storedCachedObject = getCacheObject(doc, url);
  if (storedCachedObject) {
    if (callback && typeof callback === 'function') {
      if (storedCachedObject.loaded) {
        // invokeCallbacks immediately
        callback();
      } else {
        // queue the callback
        storedCachedObject.callbacks.push(callback);
      }
    }
    return storedCachedObject.tag;
  }
  var cachedDocObj = _requestCache.get(doc) || {};
  var cacheObject = {
    loaded: false,
    tag: null,
    callbacks: []
  };
  cachedDocObj[url] = cacheObject;
  _requestCache.set(doc, cachedDocObj);
  if (callback && typeof callback === 'function') {
    cacheObject.callbacks.push(callback);
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logWarn)("module ".concat(moduleCode, " is loading external JavaScript"));
  return requestResource(url, function () {
    cacheObject.loaded = true;
    try {
      for (var i = 0; i < cacheObject.callbacks.length; i++) {
        cacheObject.callbacks[i]();
      }
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError)('Error executing callback', 'adloader.js:loadExternalScript', e);
    }
  }, doc, attributes);
  function requestResource(tagSrc, callback, doc, attributes) {
    if (!doc) {
      doc = document;
    }
    var jptScript = doc.createElement('script');
    jptScript.type = 'text/javascript';
    jptScript.async = true;
    var cacheObject = getCacheObject(doc, url);
    if (cacheObject) {
      cacheObject.tag = jptScript;
    }
    if (jptScript.readyState) {
      jptScript.onreadystatechange = function () {
        if (jptScript.readyState === 'loaded' || jptScript.readyState === 'complete') {
          jptScript.onreadystatechange = null;
          callback();
        }
      };
    } else {
      jptScript.onload = function () {
        callback();
      };
    }
    jptScript.src = tagSrc;
    if (attributes) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setScriptAttributes)(jptScript, attributes);
    }

    // add the new script tag to the page
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.insertElement)(jptScript, doc);
    return jptScript;
  }
  function getCacheObject(doc, url) {
    var cachedDocObj = _requestCache.get(doc);
    if (cachedDocObj && cachedDocObj[url]) {
      return cachedDocObj[url];
    }
    return null; // return new cache object?
  }
}

;

/***/ }),

/***/ "./src/ajax.js":
/*!*********************!*\
  !*** ./src/ajax.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ajax": function() { return /* binding */ ajax; },
/* harmony export */   "ajaxBuilder": function() { return /* binding */ ajaxBuilder; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");



var XHR_DONE = 4;

/**
 * Simple IE9+ and cross-browser ajax request function
 * Note: x-domain requests in IE9 do not support the use of cookies
 *
 * @param url string url
 * @param callback {object | function} callback
 * @param data mixed data
 * @param options object
 */
var ajax = ajaxBuilder();
function ajaxBuilder() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    request = _ref.request,
    done = _ref.done;
  return function (url, callback, data) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    try {
      var x;
      var method = options.method || (data ? 'POST' : 'GET');
      var parser = document.createElement('a');
      parser.href = url;
      var callbacks = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(callback) === 'object' && callback !== null ? callback : {
        success: function success() {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)('xhr success');
        },
        error: function error(e) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('xhr error', null, e);
        }
      };
      if (typeof callback === 'function') {
        callbacks.success = callback;
      }
      x = new window.XMLHttpRequest();
      x.onreadystatechange = function () {
        if (x.readyState === XHR_DONE) {
          if (typeof done === 'function') {
            done(parser.origin);
          }
          var status = x.status;
          if (status >= 200 && status < 300 || status === 304) {
            callbacks.success(x.responseText, x);
          } else {
            callbacks.error(x.statusText, x);
          }
        }
      };
      // Disabled timeout temporarily to avoid xhr failed requests. https://github.com/prebid/Prebid.js/issues/2648
      if (!_config_js__WEBPACK_IMPORTED_MODULE_2__.config.getConfig('disableAjaxTimeout')) {
        x.ontimeout = function () {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('  xhr timeout after ', x.timeout, 'ms');
        };
      }
      if (method === 'GET' && data) {
        var urlInfo = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.parseUrl)(url, options);
        Object.assign(urlInfo.search, data);
        url = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.buildUrl)(urlInfo);
      }
      x.open(method, url, true);
      // IE needs timeout to be set after open - see #1410
      // Disabled timeout temporarily to avoid xhr failed requests. https://github.com/prebid/Prebid.js/issues/2648
      if (!_config_js__WEBPACK_IMPORTED_MODULE_2__.config.getConfig('disableAjaxTimeout')) {
        x.timeout = timeout;
      }
      if (options.withCredentials) {
        x.withCredentials = true;
      }
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__._each)(options.customHeaders, function (value, header) {
        x.setRequestHeader(header, value);
      });
      if (options.preflight) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }
      x.setRequestHeader('Content-Type', options.contentType || 'text/plain');
      if (typeof request === 'function') {
        request(parser.origin);
      }
      if (method === 'POST' && data) {
        x.send(data);
      } else {
        x.send();
      }
    } catch (error) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('xhr construction', error);
      (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(callback) === 'object' && callback !== null && callback.error(error);
    }
  };
}

/***/ }),

/***/ "./src/auction.js":
/*!************************!*\
  !*** ./src/auction.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUCTION_COMPLETED": function() { return /* binding */ AUCTION_COMPLETED; },
/* harmony export */   "getStandardBidderSettings": function() { return /* binding */ getStandardBidderSettings; },
/* harmony export */   "newAuction": function() { return /* binding */ newAuction; }
/* harmony export */ });
/* unused harmony exports AUCTION_STARTED, AUCTION_IN_PROGRESS, resetAuctionState, addBidResponse, addBidderRequests, bidsBackCallback, auctionCallbacks, doCallbacksIfTimedout, addBidToAuction, batchingCache, callPrebidCache, getMediaTypeGranularity, getPriceGranularity, getPriceByGranularity, getAdvertiserDomain, getPrimaryCatId, getKeyValueTargetingPairs, adjustBids */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _cpmBucketManager_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./cpmBucketManager.js */ "./src/cpmBucketManager.js");
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./native.js */ "./src/native.js");
/* harmony import */ var _videoCache_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./videoCache.js */ "./src/videoCache.js");
/* harmony import */ var _Renderer_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Renderer.js */ "./src/Renderer.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _userSync_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userSync.js */ "./src/userSync.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./video.js */ "./src/video.js");
/* harmony import */ var _mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mediaTypes.js */ "./src/mediaTypes.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");
/* harmony import */ var _utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _utils_cpm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/cpm.js */ "./src/utils/cpm.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");

/**
 * Module for auction instances.
 *
 * In Prebid 0.x, $$PREBID_GLOBAL$$ had _bidsRequested and _bidsReceived as public properties.
 * Starting 1.0, Prebid will support concurrent auctions. Each auction instance will store private properties, bidsRequested and bidsReceived.
 *
 * AuctionManager will create instance of auction and will store all the auctions.
 *
 */

/**
  * @typedef {Object} AdUnit An object containing the adUnit configuration.
  *
  * @property {string} code A code which will be used to uniquely identify this bidder. This should be the same
  *   one as is used in the call to registerBidAdapter
  * @property {Array.<size>} sizes A list of size for adUnit.
  * @property {object} params Any bidder-specific params which the publisher used in their bid request.
  *   This is guaranteed to have passed the spec.areParamsValid() test.
  */

/**
 * @typedef {Array.<number>} size
 */

/**
 * @typedef {Array.<string>} AdUnitCode
 */

/**
 * @typedef {Object} BidderRequest
 *
 * @property {string} bidderCode - adUnit bidder
 * @property {number} auctionId - random UUID
 * @property {string} bidderRequestId - random string, unique key set on all bidRequest.bids[]
 * @property {Array.<Bid>} bids
 * @property {number} auctionStart - Date.now() at auction start
 * @property {number} timeout - callback timeout
 * @property {refererInfo} refererInfo - referer info object
 * @property {string} [tid] - random UUID (used for s2s)
 * @property {string} [src] - s2s or client (used for s2s)
 */

/**
 * @typedef {Object} BidReceived
 * //TODO add all properties
 */

/**
 * @typedef {Object} Auction
 *
 * @property {function(): string} getAuctionStatus - returns the auction status which can be any one of 'started', 'in progress' or 'completed'
 * @property {function(): AdUnit[]} getAdUnits - return the adUnits for this auction instance
 * @property {function(): AdUnitCode[]} getAdUnitCodes - return the adUnitCodes for this auction instance
 * @property {function(): BidRequest[]} getBidRequests - get all bid requests for this auction instance
 * @property {function(): BidReceived[]} getBidsReceived - get all bid received for this auction instance
 * @property {function(): void} startAuctionTimer - sets the bidsBackHandler callback and starts the timer for auction
 * @property {function(): void} callBids - sends requests to all adapters for bids
 */





















var syncUsers = _userSync_js__WEBPACK_IMPORTED_MODULE_0__.userSync.syncUsers;
var AUCTION_STARTED = 'started';
var AUCTION_IN_PROGRESS = 'inProgress';
var AUCTION_COMPLETED = 'completed';

// register event for bid adjustment
_events_js__WEBPACK_IMPORTED_MODULE_1__.on(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.BID_ADJUSTMENT, function (bid) {
  adjustBids(bid);
});
var MAX_REQUESTS_PER_ORIGIN = 4;
var outstandingRequests = {};
var sourceInfo = {};
var queuedCalls = [];
var pbjsInstance = (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_3__.getGlobal)();

/**
 * Clear global state for tests
 */
function resetAuctionState() {
  queuedCalls.length = 0;
  [outstandingRequests, sourceInfo].forEach(function (ob) {
    return Object.keys(ob).forEach(function (k) {
      delete ob[k];
    });
  });
}

/**
  * Creates new auction instance
  *
  * @param {Object} requestConfig
  * @param {AdUnit} requestConfig.adUnits
  * @param {AdUnitCode} requestConfig.adUnitCodes
  * @param {function():void} requestConfig.callback
  * @param {number} requestConfig.cbTimeout
  * @param {Array.<string>} requestConfig.labels
  * @param {string} requestConfig.auctionId
  * @param {{global: {}, bidder: {}}} ortb2Fragments first party data, separated into global
  *    (from getConfig('ortb2') + requestBids({ortb2})) and bidder (a map from bidderCode to ortb2)
  * @returns {Auction} auction instance
  */
function newAuction(_ref) {
  var adUnits = _ref.adUnits,
    adUnitCodes = _ref.adUnitCodes,
    callback = _ref.callback,
    cbTimeout = _ref.cbTimeout,
    labels = _ref.labels,
    auctionId = _ref.auctionId,
    ortb2Fragments = _ref.ortb2Fragments,
    metrics = _ref.metrics;
  metrics = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_4__.useMetrics)(metrics);
  var _adUnits = adUnits;
  var _labels = labels;
  var _adUnitCodes = adUnitCodes;
  var _auctionId = auctionId || (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.generateUUID)();
  var _timeout = cbTimeout;
  var _timelyBidders = new Set();
  var _bidsRejected = [];
  var _callback = callback;
  var _bidderRequests = [];
  var _bidsReceived = [];
  var _noBids = [];
  var _winningBids = [];
  var _auctionStart;
  var _auctionEnd;
  var _timer;
  var _auctionStatus;
  var _nonBids = [];
  function addBidRequests(bidderRequests) {
    _bidderRequests = _bidderRequests.concat(bidderRequests);
  }
  function addBidReceived(bidsReceived) {
    _bidsReceived = _bidsReceived.concat(bidsReceived);
  }
  function addBidRejected(bidsRejected) {
    _bidsRejected = _bidsRejected.concat(bidsRejected);
  }
  function addNoBid(noBid) {
    _noBids = _noBids.concat(noBid);
  }
  function addNonBids(seatnonbids) {
    _nonBids = _nonBids.concat(seatnonbids);
  }
  function getProperties() {
    return {
      auctionId: _auctionId,
      timestamp: _auctionStart,
      auctionEnd: _auctionEnd,
      auctionStatus: _auctionStatus,
      adUnits: _adUnits,
      adUnitCodes: _adUnitCodes,
      labels: _labels,
      bidderRequests: _bidderRequests,
      noBids: _noBids,
      bidsReceived: _bidsReceived,
      bidsRejected: _bidsRejected,
      winningBids: _winningBids,
      timeout: _timeout,
      metrics: metrics,
      seatNonBids: _nonBids
    };
  }
  function startAuctionTimer() {
    var timedOut = true;
    var timeoutCallback = executeCallback.bind(null, timedOut);
    var timer = setTimeout(timeoutCallback, _timeout);
    _timer = timer;
  }
  function executeCallback(timedOut, cleartimer) {
    // clear timer when done calls executeCallback
    if (cleartimer) {
      clearTimeout(_timer);
    }
    if (_auctionEnd === undefined) {
      var timedOutBidders = [];
      if (timedOut) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logMessage)("Auction ".concat(_auctionId, " timedOut"));
        timedOutBidders = getTimedOutBids(_bidderRequests, _timelyBidders);
        if (timedOutBidders.length) {
          _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.BID_TIMEOUT, timedOutBidders);
        }
      }
      _auctionStatus = AUCTION_COMPLETED;
      _auctionEnd = Date.now();
      metrics.checkpoint('auctionEnd');
      metrics.timeBetween('requestBids', 'auctionEnd', 'requestBids.total');
      metrics.timeBetween('callBids', 'auctionEnd', 'requestBids.callBids');
      _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.AUCTION_END, getProperties());
      bidsBackCallback(_adUnits, function () {
        try {
          if (_callback != null) {
            var _adUnitCodes2 = _adUnitCodes;
            var bids = _bidsReceived.filter(_utils_js__WEBPACK_IMPORTED_MODULE_5__.bind.call(_utils_js__WEBPACK_IMPORTED_MODULE_5__.adUnitsFilter, this, _adUnitCodes2)).reduce(groupByPlacement, {});
            _callback.apply(pbjsInstance, [bids, timedOut, _auctionId]);
            _callback = null;
          }
        } catch (e) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logError)('Error executing bidsBackHandler', null, e);
        } finally {
          // Calling timed out bidders
          if (timedOutBidders.length) {
            _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].callTimedOutBidders(adUnits, timedOutBidders, _timeout);
          }
          // Only automatically sync if the publisher has not chosen to "enableOverride"
          var userSyncConfig = _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('userSync') || {};
          if (!userSyncConfig.enableOverride) {
            // Delay the auto sync by the config delay
            syncUsers(userSyncConfig.syncDelay);
          }
        }
      });
    }
  }
  function auctionDone() {
    _config_js__WEBPACK_IMPORTED_MODULE_7__.config.resetBidder();
    // when all bidders have called done callback atleast once it means auction is complete
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logInfo)("Bids Received for Auction with id: ".concat(_auctionId), _bidsReceived);
    _auctionStatus = AUCTION_COMPLETED;
    executeCallback(false, true);
  }
  function onTimelyResponse(bidderCode) {
    _timelyBidders.add(bidderCode);
  }
  function callBids() {
    _auctionStatus = AUCTION_STARTED;
    _auctionStart = Date.now();
    var bidRequests = metrics.measureTime('requestBids.makeRequests', function () {
      return _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].makeBidRequests(_adUnits, _auctionStart, _auctionId, _timeout, _labels, ortb2Fragments, metrics);
    });
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logInfo)("Bids Requested for Auction with id: ".concat(_auctionId), bidRequests);
    metrics.checkpoint('callBids');
    if (bidRequests.length < 1) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)('No valid bid requests returned for auction');
      auctionDone();
    } else {
      addBidderRequests.call({
        dispatch: addBidderRequestsCallback,
        context: this
      }, bidRequests);
    }
  }

  /**
   * callback executed after addBidderRequests completes
   * @param {BidRequest[]} bidRequests
   */
  function addBidderRequestsCallback(bidRequests) {
    var _this = this;
    bidRequests.forEach(function (bidRequest) {
      addBidRequests(bidRequest);
    });
    var requests = {};
    var call = {
      bidRequests: bidRequests,
      run: function run() {
        startAuctionTimer();
        _auctionStatus = AUCTION_IN_PROGRESS;
        _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.AUCTION_INIT, getProperties());
        var callbacks = auctionCallbacks(auctionDone, _this);
        _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].callBids(_adUnits, bidRequests, callbacks.addBidResponse, callbacks.adapterDone, {
          request: function request(source, origin) {
            increment(outstandingRequests, origin);
            increment(requests, source);
            if (!sourceInfo[source]) {
              sourceInfo[source] = {
                SRA: true,
                origin: origin
              };
            }
            if (requests[source] > 1) {
              sourceInfo[source].SRA = false;
            }
          },
          done: function done(origin) {
            outstandingRequests[origin]--;
            if (queuedCalls[0]) {
              if (runIfOriginHasCapacity(queuedCalls[0])) {
                queuedCalls.shift();
              }
            }
          }
        }, _timeout, onTimelyResponse, ortb2Fragments);
      }
    };
    if (!runIfOriginHasCapacity(call)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)('queueing auction due to limited endpoint capacity');
      queuedCalls.push(call);
    }
    function runIfOriginHasCapacity(call) {
      var hasCapacity = true;
      var maxRequests = _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('maxRequestsPerOrigin') || MAX_REQUESTS_PER_ORIGIN;
      call.bidRequests.some(function (bidRequest) {
        var requests = 1;
        var source = typeof bidRequest.src !== 'undefined' && bidRequest.src === _constants_json__WEBPACK_IMPORTED_MODULE_2__.S2S.SRC ? 's2s' : bidRequest.bidderCode;
        // if we have no previous info on this source just let them through
        if (sourceInfo[source]) {
          if (sourceInfo[source].SRA === false) {
            // some bidders might use more than the MAX_REQUESTS_PER_ORIGIN in a single auction.  In those cases
            // set their request count to MAX_REQUESTS_PER_ORIGIN so the auction isn't permanently queued waiting
            // for capacity for that bidder
            requests = Math.min(bidRequest.bids.length, maxRequests);
          }
          if (outstandingRequests[sourceInfo[source].origin] + requests > maxRequests) {
            hasCapacity = false;
          }
        }
        // return only used for terminating this .some() iteration early if it is determined we don't have capacity
        return !hasCapacity;
      });
      if (hasCapacity) {
        call.run();
      }
      return hasCapacity;
    }
    function increment(obj, prop) {
      if (typeof obj[prop] === 'undefined') {
        obj[prop] = 1;
      } else {
        obj[prop]++;
      }
    }
  }
  function addWinningBid(winningBid) {
    var winningAd = adUnits.find(function (adUnit) {
      return adUnit.transactionId === winningBid.transactionId;
    });
    _winningBids = _winningBids.concat(winningBid);
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].callBidWonBidder(winningBid.adapterCode || winningBid.bidder, winningBid, adUnits);
    if (winningAd && !winningAd.deferBilling) _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].callBidBillableBidder(winningBid);
  }
  function setBidTargeting(bid) {
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_6__["default"].callSetTargetingBidder(bid.adapterCode || bid.bidder, bid);
  }
  _events_js__WEBPACK_IMPORTED_MODULE_1__.on(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.SEAT_NON_BID, function (event) {
    if (event.auctionId === _auctionId) {
      addNonBids(event.seatnonbid);
    }
  });
  return {
    addBidReceived: addBidReceived,
    addBidRejected: addBidRejected,
    addNoBid: addNoBid,
    executeCallback: executeCallback,
    callBids: callBids,
    addWinningBid: addWinningBid,
    setBidTargeting: setBidTargeting,
    getWinningBids: function getWinningBids() {
      return _winningBids;
    },
    getAuctionStart: function getAuctionStart() {
      return _auctionStart;
    },
    getTimeout: function getTimeout() {
      return _timeout;
    },
    getAuctionId: function getAuctionId() {
      return _auctionId;
    },
    getAuctionStatus: function getAuctionStatus() {
      return _auctionStatus;
    },
    getAdUnits: function getAdUnits() {
      return _adUnits;
    },
    getAdUnitCodes: function getAdUnitCodes() {
      return _adUnitCodes;
    },
    getBidRequests: function getBidRequests() {
      return _bidderRequests;
    },
    getBidsReceived: function getBidsReceived() {
      return _bidsReceived;
    },
    getNoBids: function getNoBids() {
      return _noBids;
    },
    getNonBids: function getNonBids() {
      return _nonBids;
    },
    getFPD: function getFPD() {
      return ortb2Fragments;
    },
    getMetrics: function getMetrics() {
      return metrics;
    }
  };
}

/**
 * Hook into this to intercept bids before they are added to an auction.
 *
 * @param adUnitCode
 * @param bid
 * @param {function(String)} reject: a function that, when called, rejects `bid` with the given reason.
 */
var addBidResponse = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('sync', function (adUnitCode, bid, reject) {
  this.dispatch.call(null, adUnitCode, bid);
}, 'addBidResponse');
var addBidderRequests = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('sync', function (bidderRequests) {
  this.dispatch.call(this.context, bidderRequests);
}, 'addBidderRequests');
var bidsBackCallback = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function (adUnits, callback) {
  if (callback) {
    callback();
  }
}, 'bidsBackCallback');
function auctionCallbacks(auctionDone, auctionInstance) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$index = _ref2.index,
    index = _ref2$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref2$index;
  var outstandingBidsAdded = 0;
  var allAdapterCalledDone = false;
  var bidderRequestsDone = new Set();
  var bidResponseMap = {};
  var ready = {};
  function waitFor(requestId, result) {
    if (ready[requestId] == null) {
      ready[requestId] = _utils_promise_js__WEBPACK_IMPORTED_MODULE_10__.GreedyPromise.resolve();
    }
    ready[requestId] = ready[requestId].then(function () {
      return _utils_promise_js__WEBPACK_IMPORTED_MODULE_10__.GreedyPromise.resolve(result).catch(function () {});
    });
  }
  function guard(bidderRequest, fn) {
    var timeout = bidderRequest.timeout;
    if (timeout == null || timeout > auctionInstance.getTimeout()) {
      timeout = auctionInstance.getTimeout();
    }
    var timeRemaining = auctionInstance.getAuctionStart() + timeout - Date.now();
    var wait = ready[bidderRequest.bidderRequestId];
    var orphanWait = ready['']; // also wait for "orphan" responses that are not associated with any request
    if ((wait != null || orphanWait != null) && timeRemaining > 0) {
      _utils_promise_js__WEBPACK_IMPORTED_MODULE_10__.GreedyPromise.race([_utils_promise_js__WEBPACK_IMPORTED_MODULE_10__.GreedyPromise.timeout(timeRemaining), _utils_promise_js__WEBPACK_IMPORTED_MODULE_10__.GreedyPromise.resolve(orphanWait).then(function () {
        return wait;
      })]).then(fn);
    } else {
      fn();
    }
  }
  function afterBidAdded() {
    outstandingBidsAdded--;
    if (allAdapterCalledDone && outstandingBidsAdded === 0) {
      auctionDone();
    }
  }
  function handleBidResponse(adUnitCode, bid, handler) {
    bidResponseMap[bid.requestId] = true;
    addCommonResponseProperties(bid, adUnitCode);
    outstandingBidsAdded++;
    return handler(afterBidAdded);
  }
  function acceptBidResponse(adUnitCode, bid) {
    handleBidResponse(adUnitCode, bid, function (done) {
      var bidResponse = getPreparedBidForAuction(bid);
      if ( true && bidResponse.mediaType === _mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__.VIDEO) {
        tryAddVideoBid(auctionInstance, bidResponse, done);
      } else {
        if ( true && bidResponse.native != null && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_12__["default"])(bidResponse.native) === 'object') {
          // NOTE: augment bidResponse.native even if bidResponse.mediaType !== NATIVE; it's possible
          // to treat banner responses as native
          addLegacyFieldsIfNeeded(bidResponse);
        }
        addBidToAuction(auctionInstance, bidResponse);
        done();
      }
    });
  }
  function rejectBidResponse(adUnitCode, bid, reason) {
    return handleBidResponse(adUnitCode, bid, function (done) {
      bid.rejectionReason = reason;
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)("Bid from ".concat(bid.bidder || 'unknown bidder', " was rejected: ").concat(reason), bid);
      _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.BID_REJECTED, bid);
      auctionInstance.addBidRejected(bid);
      done();
    });
  }
  function _adapterDone() {
    var bidderRequest = this;
    var bidderRequests = auctionInstance.getBidRequests();
    var auctionOptionsConfig = _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('auctionOptions');
    bidderRequestsDone.add(bidderRequest);
    if (auctionOptionsConfig && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.isEmpty)(auctionOptionsConfig)) {
      var secondaryBidders = auctionOptionsConfig.secondaryBidders;
      if (secondaryBidders && !bidderRequests.every(function (bidder) {
        return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_13__.includes)(secondaryBidders, bidder.bidderCode);
      })) {
        bidderRequests = bidderRequests.filter(function (request) {
          return !(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_13__.includes)(secondaryBidders, request.bidderCode);
        });
      }
    }
    allAdapterCalledDone = bidderRequests.every(function (bidderRequest) {
      return bidderRequestsDone.has(bidderRequest);
    });
    bidderRequest.bids.forEach(function (bid) {
      if (!bidResponseMap[bid.bidId]) {
        auctionInstance.addNoBid(bid);
        _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.NO_BID, bid);
      }
    });
    if (allAdapterCalledDone && outstandingBidsAdded === 0) {
      auctionDone();
    }
  }
  return {
    addBidResponse: function () {
      function addBid(adUnitCode, bid) {
        var bidderRequest = index.getBidderRequest(bid);
        waitFor(bidderRequest && bidderRequest.bidderRequestId || '', addBidResponse.call({
          dispatch: acceptBidResponse
        }, adUnitCode, bid, function () {
          var rejected = false;
          return function (reason) {
            if (!rejected) {
              rejectBidResponse(adUnitCode, bid, reason);
              rejected = true;
            }
          };
        }()));
      }
      addBid.reject = rejectBidResponse;
      return addBid;
    }(),
    adapterDone: function adapterDone() {
      guard(this, _adapterDone.bind(this));
    }
  };
}
function doCallbacksIfTimedout(auctionInstance, bidResponse) {
  if (bidResponse.timeToRespond > auctionInstance.getTimeout() + _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('timeoutBuffer')) {
    auctionInstance.executeCallback(true);
  }
}

// Add a bid to the auction.
function addBidToAuction(auctionInstance, bidResponse) {
  setupBidTargeting(bidResponse);
  (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_4__.useMetrics)(bidResponse.metrics).timeSince('addBidResponse', 'addBidResponse.total');
  auctionInstance.addBidReceived(bidResponse);
  _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.BID_RESPONSE, bidResponse);
  doCallbacksIfTimedout(auctionInstance, bidResponse);
}

// Video bids may fail if the cache is down, or there's trouble on the network.
function tryAddVideoBid(auctionInstance, bidResponse, afterBidAdded) {
  var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    _ref3$index = _ref3.index,
    index = _ref3$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref3$index;
  var addBid = true;
  var videoMediaType = (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(index.getMediaTypes({
    requestId: bidResponse.originalRequestId || bidResponse.requestId,
    transactionId: bidResponse.transactionId
  }), 'video');
  var context = videoMediaType && (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(videoMediaType, 'context');
  var useCacheKey = videoMediaType && (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(videoMediaType, 'useCacheKey');
  if (_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('cache.url') && (useCacheKey || context !== _video_js__WEBPACK_IMPORTED_MODULE_15__.OUTSTREAM)) {
    if (!bidResponse.videoCacheKey || _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('cache.ignoreBidderCacheKey')) {
      addBid = false;
      callPrebidCache(auctionInstance, bidResponse, afterBidAdded, videoMediaType);
    } else if (!bidResponse.vastUrl) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logError)('videoCacheKey specified but not required vastUrl for video bid');
      addBid = false;
    }
  }
  if (addBid) {
    addBidToAuction(auctionInstance, bidResponse);
    afterBidAdded();
  }
}

// Native bid response might be in ortb2 format - adds legacy field for backward compatibility
var addLegacyFieldsIfNeeded = function addLegacyFieldsIfNeeded(bidResponse) {
  var _auctionManager$index, _bidResponse$native;
  var nativeOrtbRequest = (_auctionManager$index = _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index.getAdUnit(bidResponse)) === null || _auctionManager$index === void 0 ? void 0 : _auctionManager$index.nativeOrtbRequest;
  var nativeOrtbResponse = (_bidResponse$native = bidResponse.native) === null || _bidResponse$native === void 0 ? void 0 : _bidResponse$native.ortb;
  if (nativeOrtbRequest && nativeOrtbResponse) {
    var legacyResponse = (0,_native_js__WEBPACK_IMPORTED_MODULE_16__.toLegacyResponse)(nativeOrtbResponse, nativeOrtbRequest);
    Object.assign(bidResponse.native, legacyResponse);
  }
};
var _storeInCache = function _storeInCache(batch) {
  (0,_videoCache_js__WEBPACK_IMPORTED_MODULE_17__.store)(batch.map(function (entry) {
    return entry.bidResponse;
  }), function (error, cacheIds) {
    cacheIds.forEach(function (cacheId, i) {
      var _batch$i = batch[i],
        auctionInstance = _batch$i.auctionInstance,
        bidResponse = _batch$i.bidResponse,
        afterBidAdded = _batch$i.afterBidAdded;
      if (error) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)("Failed to save to the video cache: ".concat(error, ". Video bid must be discarded."));
        doCallbacksIfTimedout(auctionInstance, bidResponse);
      } else {
        if (cacheId.uuid === '') {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.");
          doCallbacksIfTimedout(auctionInstance, bidResponse);
        } else {
          bidResponse.videoCacheKey = cacheId.uuid;
          if (!bidResponse.vastUrl) {
            bidResponse.vastUrl = (0,_videoCache_js__WEBPACK_IMPORTED_MODULE_17__.getCacheUrl)(bidResponse.videoCacheKey);
          }
          addBidToAuction(auctionInstance, bidResponse);
          afterBidAdded();
        }
      }
    });
  });
};
var storeInCache =  true ? _storeInCache : 0;
var batchSize, batchTimeout;
_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('cache', function (cacheConfig) {
  batchSize = typeof cacheConfig.cache.batchSize === 'number' && cacheConfig.cache.batchSize > 0 ? cacheConfig.cache.batchSize : 1;
  batchTimeout = typeof cacheConfig.cache.batchTimeout === 'number' && cacheConfig.cache.batchTimeout > 0 ? cacheConfig.cache.batchTimeout : 0;
});
var batchingCache = function batchingCache() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : setTimeout;
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : storeInCache;
  var batches = [[]];
  var debouncing = false;
  var noTimeout = function noTimeout(cb) {
    return cb();
  };
  return function (auctionInstance, bidResponse, afterBidAdded) {
    var batchFunc = batchTimeout > 0 ? timeout : noTimeout;
    if (batches[batches.length - 1].length >= batchSize) {
      batches.push([]);
    }
    batches[batches.length - 1].push({
      auctionInstance: auctionInstance,
      bidResponse: bidResponse,
      afterBidAdded: afterBidAdded
    });
    if (!debouncing) {
      debouncing = true;
      batchFunc(function () {
        batches.forEach(cache);
        batches = [[]];
        debouncing = false;
      }, batchTimeout);
    }
  };
};
var batchAndStore = batchingCache();
var callPrebidCache = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function (auctionInstance, bidResponse, afterBidAdded, videoMediaType) {
  batchAndStore(auctionInstance, bidResponse, afterBidAdded);
}, 'callPrebidCache');

/**
 * Augment `bidResponse` with properties that are common across all bids - including rejected bids.
 *
 */
function addCommonResponseProperties(bidResponse, adUnitCode) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref4$index = _ref4.index,
    index = _ref4$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref4$index;
  var bidderRequest = index.getBidderRequest(bidResponse);
  var adUnit = index.getAdUnit(bidResponse);
  var start = bidderRequest && bidderRequest.start || bidResponse.requestTimestamp;
  Object.assign(bidResponse, {
    responseTimestamp: bidResponse.responseTimestamp || (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.timestamp)(),
    requestTimestamp: bidResponse.requestTimestamp || start,
    cpm: parseFloat(bidResponse.cpm) || 0,
    bidder: bidResponse.bidder || bidResponse.bidderCode,
    adUnitCode: adUnitCode
  });
  if ((adUnit === null || adUnit === void 0 ? void 0 : adUnit.ttlBuffer) != null) {
    bidResponse.ttlBuffer = adUnit.ttlBuffer;
  }
  bidResponse.timeToRespond = bidResponse.responseTimestamp - bidResponse.requestTimestamp;
}

/**
 * Add additional bid response properties that are universal for all _accepted_ bids.
 */
function getPreparedBidForAuction(bid) {
  var _index$getBidRequest;
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref5$index = _ref5.index,
    index = _ref5$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref5$index;
  // Let listeners know that now is the time to adjust the bid, if they want to.
  //
  // CAREFUL: Publishers rely on certain bid properties to be available (like cpm),
  // but others to not be set yet (like priceStrings). See #1372 and #1389.
  _events_js__WEBPACK_IMPORTED_MODULE_1__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.BID_ADJUSTMENT, bid);

  // a publisher-defined renderer can be used to render bids
  var bidRenderer = ((_index$getBidRequest = index.getBidRequest(bid)) === null || _index$getBidRequest === void 0 ? void 0 : _index$getBidRequest.renderer) || index.getAdUnit(bid).renderer;

  // a publisher can also define a renderer for a mediaType
  var bidObjectMediaType = bid.mediaType;
  var mediaTypes = index.getMediaTypes(bid);
  var bidMediaType = mediaTypes && mediaTypes[bidObjectMediaType];
  var mediaTypeRenderer = bidMediaType && bidMediaType.renderer;
  var renderer = null;

  // the renderer for the mediaType takes precendence
  if (mediaTypeRenderer && mediaTypeRenderer.url && mediaTypeRenderer.render && !(mediaTypeRenderer.backupOnly === true && bid.renderer)) {
    renderer = mediaTypeRenderer;
  } else if (bidRenderer && bidRenderer.url && bidRenderer.render && !(bidRenderer.backupOnly === true && bid.renderer)) {
    renderer = bidRenderer;
  }
  if (renderer) {
    // be aware, an adapter could already have installed the bidder, in which case this overwrite's the existing adapter
    bid.renderer = _Renderer_js__WEBPACK_IMPORTED_MODULE_18__.Renderer.install({
      url: renderer.url,
      config: renderer.options
    }); // rename options to config, to make it consistent?
    bid.renderer.setRender(renderer.render);
  }

  // Use the config value 'mediaTypeGranularity' if it has been defined for mediaType, else use 'customPriceBucket'
  var mediaTypeGranularity = getMediaTypeGranularity(bid.mediaType, mediaTypes, _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('mediaTypePriceGranularity'));
  var priceStringsObj = (0,_cpmBucketManager_js__WEBPACK_IMPORTED_MODULE_19__.getPriceBucketString)(bid.cpm, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_12__["default"])(mediaTypeGranularity) === 'object' ? mediaTypeGranularity : _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('customPriceBucket'), _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('currency.granularityMultiplier'));
  bid.pbLg = priceStringsObj.low;
  bid.pbMg = priceStringsObj.med;
  bid.pbHg = priceStringsObj.high;
  bid.pbAg = priceStringsObj.auto;
  bid.pbDg = priceStringsObj.dense;
  bid.pbCg = priceStringsObj.custom;
  return bid;
}
function setupBidTargeting(bidObject) {
  var keyValues;
  var cpmCheck = _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.get(bidObject.bidderCode, 'allowZeroCpmBids') === true ? bidObject.cpm >= 0 : bidObject.cpm > 0;
  if (bidObject.bidderCode && (cpmCheck || bidObject.dealId)) {
    keyValues = getKeyValueTargetingPairs(bidObject.bidderCode, bidObject);
  }

  // use any targeting provided as defaults, otherwise just set from getKeyValueTargetingPairs
  bidObject.adserverTargeting = Object.assign(bidObject.adserverTargeting || {}, keyValues);
}

/**
 * @param {MediaType} mediaType
 * @param mediaTypes media types map from adUnit
 * @param {MediaTypePriceGranularity} [mediaTypePriceGranularity]
 * @returns {(Object|string|undefined)}
 */
function getMediaTypeGranularity(mediaType, mediaTypes, mediaTypePriceGranularity) {
  if (mediaType && mediaTypePriceGranularity) {
    if ( true && mediaType === _mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__.VIDEO) {
      var context = (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(mediaTypes, "".concat(_mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__.VIDEO, ".context"), 'instream');
      if (mediaTypePriceGranularity["".concat(_mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__.VIDEO, "-").concat(context)]) {
        return mediaTypePriceGranularity["".concat(_mediaTypes_js__WEBPACK_IMPORTED_MODULE_11__.VIDEO, "-").concat(context)];
      }
    }
    return mediaTypePriceGranularity[mediaType];
  }
}

/**
 * This function returns the price granularity defined. It can be either publisher defined or default value
 * @param bid bid response object
 * @param index
 * @returns {string} granularity
 */
var getPriceGranularity = function getPriceGranularity(bid) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$index = _ref6.index,
    index = _ref6$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref6$index;
  // Use the config value 'mediaTypeGranularity' if it has been set for mediaType, else use 'priceGranularity'
  var mediaTypeGranularity = getMediaTypeGranularity(bid.mediaType, index.getMediaTypes(bid), _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('mediaTypePriceGranularity'));
  var granularity = typeof bid.mediaType === 'string' && mediaTypeGranularity ? typeof mediaTypeGranularity === 'string' ? mediaTypeGranularity : 'custom' : _config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('priceGranularity');
  return granularity;
};

/**
 * This function returns a function to get bid price by price granularity
 * @param {string} granularity
 * @returns {function}
 */
var getPriceByGranularity = function getPriceByGranularity(granularity) {
  return function (bid) {
    var bidGranularity = granularity || getPriceGranularity(bid);
    if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.AUTO) {
      return bid.pbAg;
    } else if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.DENSE) {
      return bid.pbDg;
    } else if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.LOW) {
      return bid.pbLg;
    } else if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.MEDIUM) {
      return bid.pbMg;
    } else if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.HIGH) {
      return bid.pbHg;
    } else if (bidGranularity === _constants_json__WEBPACK_IMPORTED_MODULE_2__.GRANULARITY_OPTIONS.CUSTOM) {
      return bid.pbCg;
    }
  };
};

/**
 * This function returns a function to get first advertiser domain from bid response meta
 * @returns {function}
 */
var getAdvertiserDomain = function getAdvertiserDomain() {
  return function (bid) {
    return bid.meta && bid.meta.advertiserDomains && bid.meta.advertiserDomains.length > 0 ? [bid.meta.advertiserDomains].flat()[0] : '';
  };
};

/**
 * This function returns a function to get the primary category id from bid response meta
 * @returns {function}
 */
var getPrimaryCatId = function getPrimaryCatId() {
  return function (bid) {
    return bid.meta && bid.meta.primaryCatId ? bid.meta.primaryCatId : '';
  };
};

// factory for key value objs
function createKeyVal(key, value) {
  return {
    key: key,
    val: typeof value === 'function' ? function (bidResponse, bidReq) {
      return value(bidResponse, bidReq);
    } : function (bidResponse) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.getValue)(bidResponse, value);
    }
  };
}
function defaultAdserverTargeting() {
  var TARGETING_KEYS = _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS;
  return [createKeyVal(TARGETING_KEYS.BIDDER, 'bidderCode'), createKeyVal(TARGETING_KEYS.AD_ID, 'adId'), createKeyVal(TARGETING_KEYS.PRICE_BUCKET, getPriceByGranularity()), createKeyVal(TARGETING_KEYS.SIZE, 'size'), createKeyVal(TARGETING_KEYS.DEAL, 'dealId'), createKeyVal(TARGETING_KEYS.SOURCE, 'source'), createKeyVal(TARGETING_KEYS.FORMAT, 'mediaType'), createKeyVal(TARGETING_KEYS.ADOMAIN, getAdvertiserDomain()), createKeyVal(TARGETING_KEYS.ACAT, getPrimaryCatId())];
}

/**
 * @param {string} mediaType
 * @param {string} bidderCode
 * @param {BidRequest} bidReq
 * @returns {*}
 */
function getStandardBidderSettings(mediaType, bidderCode) {
  var TARGETING_KEYS = _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS;
  var standardSettings = Object.assign({}, _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.settingsFor(null));
  if (!standardSettings[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING]) {
    standardSettings[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING] = defaultAdserverTargeting();
  }
  if ( true && mediaType === 'video') {
    var adserverTargeting = standardSettings[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING].slice();
    standardSettings[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING] = adserverTargeting;

    // Adding hb_uuid + hb_cache_id
    [TARGETING_KEYS.UUID, TARGETING_KEYS.CACHE_ID].forEach(function (targetingKeyVal) {
      if (typeof (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_13__.find)(adserverTargeting, function (kvPair) {
        return kvPair.key === targetingKeyVal;
      }) === 'undefined') {
        adserverTargeting.push(createKeyVal(targetingKeyVal, 'videoCacheKey'));
      }
    });

    // Adding hb_cache_host
    if (_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('cache.url') && (!bidderCode || _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.get(bidderCode, 'sendStandardTargeting') !== false)) {
      var urlInfo = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('cache.url'));
      if (typeof (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_13__.find)(adserverTargeting, function (targetingKeyVal) {
        return targetingKeyVal.key === TARGETING_KEYS.CACHE_HOST;
      }) === 'undefined') {
        adserverTargeting.push(createKeyVal(TARGETING_KEYS.CACHE_HOST, function (bidResponse) {
          return (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(bidResponse, "adserverTargeting.".concat(TARGETING_KEYS.CACHE_HOST)) ? bidResponse.adserverTargeting[TARGETING_KEYS.CACHE_HOST] : urlInfo.hostname;
        }));
      }
    }
  }
  return standardSettings;
}
function getKeyValueTargetingPairs(bidderCode, custBidObj) {
  var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref7$index = _ref7.index,
    index = _ref7$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_9__.auctionManager.index : _ref7$index;
  if (!custBidObj) {
    return {};
  }
  var bidRequest = index.getBidRequest(custBidObj);
  var keyValues = {};

  // 1) set the keys from "standard" setting or from prebid defaults
  // initialize default if not set
  var standardSettings = getStandardBidderSettings(custBidObj.mediaType, bidderCode);
  setKeys(keyValues, standardSettings, custBidObj, bidRequest);

  // 2) set keys from specific bidder setting override if they exist
  if (bidderCode && _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.getOwn(bidderCode, _constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING)) {
    setKeys(keyValues, _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.ownSettingsFor(bidderCode), custBidObj, bidRequest);
    custBidObj.sendStandardTargeting = _bidderSettings_js__WEBPACK_IMPORTED_MODULE_20__.bidderSettings.get(bidderCode, 'sendStandardTargeting');
  }

  // set native key value targeting
  if ( true && custBidObj['native']) {
    keyValues = Object.assign({}, keyValues, (0,_native_js__WEBPACK_IMPORTED_MODULE_16__.getNativeTargeting)(custBidObj));
  }
  return keyValues;
}
function setKeys(keyValues, bidderSettings, custBidObj, bidReq) {
  var targeting = bidderSettings[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING];
  custBidObj.size = custBidObj.getSize();
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__._each)(targeting, function (kvPair) {
    var key = kvPair.key;
    var value = kvPair.val;
    if (keyValues[key]) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logWarn)('The key: ' + key + ' is being overwritten');
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.isFn)(value)) {
      try {
        value = value(custBidObj, bidReq);
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logError)('bidmanager', 'ERROR', e);
      }
    }
    if ((typeof bidderSettings.suppressEmptyKeys !== 'undefined' && bidderSettings.suppressEmptyKeys === true || key === _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS.DEAL || key === _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS.ACAT) && (
    // hb_deal & hb_acat are suppressed automatically if not set

    (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.isEmptyStr)(value) || value === null || value === undefined)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.logInfo)("suppressing empty key '" + key + "' from adserver targeting");
    } else {
      keyValues[key] = value;
    }
  });
  return keyValues;
}
function adjustBids(bid) {
  var bidPriceAdjusted = (0,_utils_cpm_js__WEBPACK_IMPORTED_MODULE_21__.adjustCpm)(bid.cpm, bid);
  if (bidPriceAdjusted >= 0) {
    bid.cpm = bidPriceAdjusted;
  }
}

/**
 * groupByPlacement is a reduce function that converts an array of Bid objects
 * to an object with placement codes as keys, with each key representing an object
 * with an array of `Bid` objects for that placement
 * @returns {*} as { [adUnitCode]: { bids: [Bid, Bid, Bid] } }
 */
function groupByPlacement(bidsByPlacement, bid) {
  if (!bidsByPlacement[bid.adUnitCode]) {
    bidsByPlacement[bid.adUnitCode] = {
      bids: []
    };
  }
  bidsByPlacement[bid.adUnitCode].bids.push(bid);
  return bidsByPlacement;
}

/**
 * Returns a list of bids that we haven't received a response yet where the bidder did not call done
 * @param {BidRequest[]} bidderRequests List of bids requested for auction instance
 * @param {Set} timelyBidders Set of bidders which responded in time
 *
 * @typedef {Object} TimedOutBid
 * @property {string} bidId The id representing the bid
 * @property {string} bidder The string name of the bidder
 * @property {string} adUnitCode The code used to uniquely identify the ad unit on the publisher's page
 * @property {string} auctionId The id representing the auction
 *
 * @return {Array<TimedOutBid>} List of bids that Prebid hasn't received a response for
 */
function getTimedOutBids(bidderRequests, timelyBidders) {
  var timedOutBids = bidderRequests.map(function (bid) {
    return (bid.bids || []).filter(function (bid) {
      return !timelyBidders.has(bid.bidder);
    });
  }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_5__.flatten, []);
  return timedOutBids;
}

/***/ }),

/***/ "./src/auctionIndex.js":
/*!*****************************!*\
  !*** ./src/auctionIndex.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuctionIndex": function() { return /* binding */ AuctionIndex; }
/* harmony export */ });
/**
 * Retrieves request-related bid data.
 * All methods are designed to work with Bid (response) objects returned by bid adapters.
 */
function AuctionIndex(getAuctions) {
  Object.assign(this, {
    /**
     * @param auctionId
     * @returns {*} Auction instance for `auctionId`
     */
    getAuction: function getAuction(_ref) {
      var auctionId = _ref.auctionId;
      if (auctionId != null) {
        return getAuctions().find(function (auction) {
          return auction.getAuctionId() === auctionId;
        });
      }
    },
    /**
     * NOTE: you should prefer {@link #getMediaTypes} for looking up bid media types.
     * @param transactionId
     * @returns adUnit object for `transactionId`
     */
    getAdUnit: function getAdUnit(_ref2) {
      var transactionId = _ref2.transactionId;
      if (transactionId != null) {
        return getAuctions().flatMap(function (a) {
          return a.getAdUnits();
        }).find(function (au) {
          return au.transactionId === transactionId;
        });
      }
    },
    /**
     * @param transactionId
     * @param requestId?
     * @returns {*} mediaTypes object from bidRequest (through requestId) falling back to the adUnit (through transactionId).
     *
     * The bidRequest is given precedence because its mediaTypes can differ from the adUnit's (if bidder-specific labels are in use).
     * Bids that have no associated request do not have labels either, and use the adUnit's mediaTypes.
     */
    getMediaTypes: function getMediaTypes(_ref3) {
      var transactionId = _ref3.transactionId,
        requestId = _ref3.requestId;
      if (requestId != null) {
        var req = this.getBidRequest({
          requestId: requestId
        });
        if (req != null && (transactionId == null || req.transactionId === transactionId)) {
          return req.mediaTypes;
        }
      } else if (transactionId != null) {
        var au = this.getAdUnit({
          transactionId: transactionId
        });
        if (au != null) {
          return au.mediaTypes;
        }
      }
    },
    /**
     * @param requestId?
     * @param bidderRequestId?
     * @returns {*} bidderRequest that matches both requestId and bidderRequestId (if either or both are provided).
     *
     * NOTE: Bid responses are not guaranteed to have a corresponding request.
     */
    getBidderRequest: function getBidderRequest(_ref4) {
      var requestId = _ref4.requestId,
        bidderRequestId = _ref4.bidderRequestId;
      if (requestId != null || bidderRequestId != null) {
        var bers = getAuctions().flatMap(function (a) {
          return a.getBidRequests();
        });
        if (bidderRequestId != null) {
          bers = bers.filter(function (ber) {
            return ber.bidderRequestId === bidderRequestId;
          });
        }
        if (requestId == null) {
          return bers[0];
        } else {
          return bers.find(function (ber) {
            return ber.bids && ber.bids.find(function (br) {
              return br.bidId === requestId;
            }) != null;
          });
        }
      }
    },
    /**
     * @param requestId
     * @returns {*} bidRequest object for requestId
     *
     * NOTE: Bid responses are not guaranteed to have a corresponding request.
     */
    getBidRequest: function getBidRequest(_ref5) {
      var requestId = _ref5.requestId;
      if (requestId != null) {
        return getAuctions().flatMap(function (a) {
          return a.getBidRequests();
        }).flatMap(function (ber) {
          return ber.bids;
        }).find(function (br) {
          return br && br.bidId === requestId;
        });
      }
    }
  });
}

/***/ }),

/***/ "./src/auctionManager.js":
/*!*******************************!*\
  !*** ./src/auctionManager.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auctionManager": function() { return /* binding */ auctionManager; }
/* harmony export */ });
/* unused harmony export newAuctionManager */
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _auction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auction.js */ "./src/auction.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _auctionIndex_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auctionIndex.js */ "./src/auctionIndex.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/**
 * AuctionManager modules is responsible for creating auction instances.
 * This module is the gateway for Prebid core to access auctions.
 * It stores all created instances of auction and can be used to get consolidated values from auction.
 */

/**
 * @typedef {Object} AuctionManager
 *
 * @property {function(): Array} getBidsRequested - returns consolidated bid requests
 * @property {function(): Array} getBidsReceived - returns consolidated bid received
 * @property {function(): Array} getAllBidsForAdUnitCode - returns consolidated bid received for a given adUnit
 * @property {function(): Array} getAdUnits - returns consolidated adUnits
 * @property {function(): Array} getAdUnitCodes - returns consolidated adUnitCodes
 * @property {function(): Object} createAuction - creates auction instance and stores it for future reference
 * @property {function(): Object} findBidByAdId - find bid received by adId. This function will be called by $$PREBID_GLOBAL$$.renderAd
 * @property {function(): Object} getStandardBidderAdServerTargeting - returns standard bidder targeting for all the adapters. Refer http://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.bidderSettings for more details
 * @property {function(Object): void} addWinningBid - add a winning bid to an auction based on auctionId
 * @property {function(): void} clearAllAuctions - clear all auctions for testing
 */








/**
 * Creates new instance of auctionManager. There will only be one instance of auctionManager but
 * a factory is created to assist in testing.
 *
 * @returns {AuctionManager} auctionManagerInstance
 */
function newAuctionManager() {
  var _auctions = [];
  var auctionManager = {};
  auctionManager.addWinningBid = function (bid) {
    var metrics = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_0__.useMetrics)(bid.metrics);
    metrics.checkpoint('bidWon');
    metrics.timeBetween('auctionEnd', 'bidWon', 'render.pending');
    metrics.timeBetween('requestBids', 'bidWon', 'render.e2e');
    var auction = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.find)(_auctions, function (auction) {
      return auction.getAuctionId() === bid.auctionId;
    });
    if (auction) {
      bid.status = _constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.RENDERED;
      auction.addWinningBid(bid);
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logWarn)("Auction not found when adding winning bid");
    }
  };
  auctionManager.getAllWinningBids = function () {
    return _auctions.map(function (auction) {
      return auction.getWinningBids();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []);
  };
  auctionManager.getBidsRequested = function () {
    return _auctions.map(function (auction) {
      return auction.getBidRequests();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []);
  };
  auctionManager.getNoBids = function () {
    return _auctions.map(function (auction) {
      return auction.getNoBids();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []);
  };
  auctionManager.getBidsReceived = function () {
    return _auctions.map(function (auction) {
      if (auction.getAuctionStatus() === _auction_js__WEBPACK_IMPORTED_MODULE_4__.AUCTION_COMPLETED) {
        return auction.getBidsReceived();
      }
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []).filter(function (bid) {
      return bid;
    });
  };
  auctionManager.getAllBidsForAdUnitCode = function (adUnitCode) {
    return _auctions.map(function (auction) {
      return auction.getBidsReceived();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []).filter(function (bid) {
      return bid && bid.adUnitCode === adUnitCode;
    });
  };
  auctionManager.getAdUnits = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnits();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []);
  };
  auctionManager.getAdUnitCodes = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnitCodes();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []).filter(_utils_js__WEBPACK_IMPORTED_MODULE_3__.uniques);
  };
  auctionManager.createAuction = function (opts) {
    var auction = (0,_auction_js__WEBPACK_IMPORTED_MODULE_4__.newAuction)(opts);
    _addAuction(auction);
    return auction;
  };
  auctionManager.findBidByAdId = function (adId) {
    return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.find)(_auctions.map(function (auction) {
      return auction.getBidsReceived();
    }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_3__.flatten, []), function (bid) {
      return bid.adId === adId;
    });
  };
  auctionManager.getStandardBidderAdServerTargeting = function () {
    return (0,_auction_js__WEBPACK_IMPORTED_MODULE_4__.getStandardBidderSettings)()[_constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING];
  };
  auctionManager.setStatusForBids = function (adId, status) {
    var bid = auctionManager.findBidByAdId(adId);
    if (bid) bid.status = status;
    if (bid && status === _constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.BID_TARGETING_SET) {
      var auction = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.find)(_auctions, function (auction) {
        return auction.getAuctionId() === bid.auctionId;
      });
      if (auction) auction.setBidTargeting(bid);
    }
  };
  auctionManager.getLastAuctionId = function () {
    return _auctions.length && _auctions[_auctions.length - 1].getAuctionId();
  };
  auctionManager.clearAllAuctions = function () {
    _auctions.length = 0;
  };
  function _addAuction(auction) {
    _auctions.push(auction);
  }
  auctionManager.index = new _auctionIndex_js__WEBPACK_IMPORTED_MODULE_5__.AuctionIndex(function () {
    return _auctions;
  });
  return auctionManager;
}
var auctionManager = newAuctionManager();

/***/ }),

/***/ "./src/bidderSettings.js":
/*!*******************************!*\
  !*** ./src/bidderSettings.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bidderSettings": function() { return /* binding */ bidderSettings; }
/* harmony export */ });
/* unused harmony export ScopedSettings */
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _resolveScope = /*#__PURE__*/new WeakSet();
var ScopedSettings = /*#__PURE__*/function () {
  function ScopedSettings(getSettings, defaultScope) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ScopedSettings);
    _classPrivateMethodInitSpec(this, _resolveScope);
    this.getSettings = getSettings;
    this.defaultScope = defaultScope;
  }

  /**
   * Get setting value at `path` under the given scope, falling back to the default scope if needed.
   * If `scope` is `null`, get the setting's default value.
   * @param scope {String|null}
   * @param path {String}
   * @returns {*}
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ScopedSettings, [{
    key: "get",
    value: function get(scope, path) {
      var value = this.getOwn(scope, path);
      if (typeof value === 'undefined') {
        value = this.getOwn(null, path);
      }
      return value;
    }

    /**
     * Get the setting value at `path` *without* falling back to the default value.
     * @param scope {String}
     * @param path {String}
     * @returns {*}
     */
  }, {
    key: "getOwn",
    value: function getOwn(scope, path) {
      scope = _classPrivateMethodGet(this, _resolveScope, _resolveScope2).call(this, scope);
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.getSettings(), "".concat(scope, ".").concat(path));
    }

    /**
     * @returns {string[]} all existing scopes except the default one.
     */
  }, {
    key: "getScopes",
    value: function getScopes() {
      var _this = this;
      return Object.keys(this.getSettings()).filter(function (scope) {
        return scope !== _this.defaultScope;
      });
    }

    /**
     * @returns all settings in the given scope, merged with the settings for the default scope.
     */
  }, {
    key: "settingsFor",
    value: function settingsFor(scope) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.mergeDeep)({}, this.ownSettingsFor(null), this.ownSettingsFor(scope));
    }

    /**
     * @returns all settings in the given scope, *without* any of the default settings.
     */
  }, {
    key: "ownSettingsFor",
    value: function ownSettingsFor(scope) {
      scope = _classPrivateMethodGet(this, _resolveScope, _resolveScope2).call(this, scope);
      return this.getSettings()[scope] || {};
    }
  }]);
  return ScopedSettings;
}();
function _resolveScope2(scope) {
  if (scope == null) {
    return this.defaultScope;
  } else {
    return scope;
  }
}
var bidderSettings = new ScopedSettings(function () {
  return (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_4__.getGlobal)().bidderSettings || {};
}, _constants_json__WEBPACK_IMPORTED_MODULE_5__.JSON_MAPPING.BD_SETTING_STANDARD);

/***/ }),

/***/ "./src/bidfactory.js":
/*!***************************!*\
  !*** ./src/bidfactory.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBid": function() { return /* binding */ createBid; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


/**
 Required paramaters
 bidderCode,
 height,
 width,
 statusCode
 Optional paramaters
 adId,
 cpm,
 ad,
 adUrl,
 dealId,
 priceKeyString;
 */
function Bid(statusCode) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$src = _ref.src,
    src = _ref$src === void 0 ? 'client' : _ref$src,
    _ref$bidder = _ref.bidder,
    bidder = _ref$bidder === void 0 ? '' : _ref$bidder,
    bidId = _ref.bidId,
    transactionId = _ref.transactionId,
    auctionId = _ref.auctionId;
  var _bidSrc = src;
  var _statusCode = statusCode || 0;
  this.bidderCode = bidder;
  this.width = 0;
  this.height = 0;
  this.statusMessage = _getStatus();
  this.adId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getUniqueIdentifierStr)();
  this.requestId = bidId;
  this.transactionId = transactionId;
  this.auctionId = auctionId;
  this.mediaType = 'banner';
  this.source = _bidSrc;
  function _getStatus() {
    switch (_statusCode) {
      case 0:
        return 'Pending';
      case 1:
        return 'Bid available';
      case 2:
        return 'Bid returned empty or error response';
      case 3:
        return 'Bid timed out';
    }
  }
  this.getStatusCode = function () {
    return _statusCode;
  };

  // returns the size of the bid creative. Concatenation of width and height by ‘x’.
  this.getSize = function () {
    return this.width + 'x' + this.height;
  };
  this.getIdentifiers = function () {
    return {
      src: this.source,
      bidder: this.bidderCode,
      bidId: this.requestId,
      transactionId: this.transactionId,
      auctionId: this.auctionId
    };
  };
}

// Bid factory function.
function createBid(statusCode, identifiers) {
  return new Bid(statusCode, identifiers);
}

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RANDOM": function() { return /* binding */ RANDOM; },
/* harmony export */   "config": function() { return /* binding */ config; }
/* harmony export */ });
/* unused harmony export newConfig */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _cpmBucketManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cpmBucketManager.js */ "./src/cpmBucketManager.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*
 * Module for getting and setting Prebid configuration.
*/

/**
 * @typedef {Object} MediaTypePriceGranularity
 *
 * @property {(string|Object)} [banner]
 * @property {(string|Object)} [native]
 * @property {(string|Object)} [video]
 * @property {(string|Object)} [video-instream]
 * @property {(string|Object)} [video-outstream]
 */





var DEFAULT_DEBUG = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getParameterByName)(_constants_json__WEBPACK_IMPORTED_MODULE_2__.DEBUG_MODE).toUpperCase() === 'TRUE';
var DEFAULT_BIDDER_TIMEOUT = 3000;
var DEFAULT_ENABLE_SEND_ALL_BIDS = true;
var DEFAULT_DISABLE_AJAX_TIMEOUT = false;
var DEFAULT_BID_CACHE = false;
var DEFAULT_DEVICE_ACCESS = true;
var DEFAULT_MAX_NESTED_IFRAMES = 10;
var DEFAULT_TIMEOUTBUFFER = 400;
var RANDOM = 'random';
var FIXED = 'fixed';
var VALID_ORDERS = {};
VALID_ORDERS[RANDOM] = true;
VALID_ORDERS[FIXED] = true;
var DEFAULT_BIDDER_SEQUENCE = RANDOM;
var GRANULARITY_OPTIONS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  AUTO: 'auto',
  DENSE: 'dense',
  CUSTOM: 'custom'
};
var ALL_TOPICS = '*';

/**
 * @typedef {object} PrebidConfig
 *
 * @property {string} cache.url Set a url if we should use prebid-cache to store video bids before adding
 *   bids to the auction. **NOTE** This must be set if you want to use the dfpAdServerVideo module.
 */

function newConfig() {
  var listeners = [];
  var defaults;
  var config;
  var bidderConfig;
  var currBidder = null;
  function resetConfig() {
    defaults = {};
    function getProp(name) {
      return props[name].val;
    }
    function setProp(name, val) {
      props[name].val = val;
    }
    var props = {
      publisherDomain: {
        set: function set(val) {
          if (val != null) {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('publisherDomain is deprecated and has no effect since v7 - use pageUrl instead');
          }
          setProp('publisherDomain', val);
        }
      },
      priceGranularity: {
        val: GRANULARITY_OPTIONS.MEDIUM,
        set: function set(val) {
          if (validatePriceGranularity(val)) {
            if (typeof val === 'string') {
              setProp('priceGranularity', hasGranularity(val) ? val : GRANULARITY_OPTIONS.MEDIUM);
            } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(val)) {
              setProp('customPriceBucket', val);
              setProp('priceGranularity', GRANULARITY_OPTIONS.CUSTOM);
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)('Using custom price granularity');
            }
          }
        }
      },
      customPriceBucket: {
        val: {},
        set: function set() {}
      },
      mediaTypePriceGranularity: {
        val: {},
        set: function set(val) {
          val != null && setProp('mediaTypePriceGranularity', Object.keys(val).reduce(function (aggregate, item) {
            if (validatePriceGranularity(val[item])) {
              if (typeof val === 'string') {
                aggregate[item] = hasGranularity(val[item]) ? val[item] : getProp('priceGranularity');
              } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(val)) {
                aggregate[item] = val[item];
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Using custom price granularity for ".concat(item));
              }
            } else {
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Invalid price granularity for media type: ".concat(item));
            }
            return aggregate;
          }, {}));
        }
      },
      bidderSequence: {
        val: DEFAULT_BIDDER_SEQUENCE,
        set: function set(val) {
          if (VALID_ORDERS[val]) {
            setProp('bidderSequence', val);
          } else {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Invalid order: ".concat(val, ". Bidder Sequence was not set."));
          }
        }
      },
      auctionOptions: {
        val: {},
        set: function set(val) {
          if (validateauctionOptions(val)) {
            setProp('auctionOptions', val);
          }
        }
      }
    };
    var newConfig = {
      // `debug` is equivalent to legacy `pbjs.logging` property
      debug: DEFAULT_DEBUG,
      bidderTimeout: DEFAULT_BIDDER_TIMEOUT,
      enableSendAllBids: DEFAULT_ENABLE_SEND_ALL_BIDS,
      useBidCache: DEFAULT_BID_CACHE,
      /**
       * deviceAccess set to false will disable setCookie, getCookie, hasLocalStorage
       * @type {boolean}
       */
      deviceAccess: DEFAULT_DEVICE_ACCESS,
      // timeout buffer to adjust for bidder CDN latency
      timeoutBuffer: DEFAULT_TIMEOUTBUFFER,
      disableAjaxTimeout: DEFAULT_DISABLE_AJAX_TIMEOUT,
      // default max nested iframes for referer detection
      maxNestedIframes: DEFAULT_MAX_NESTED_IFRAMES
    };
    Object.defineProperties(newConfig, Object.fromEntries(Object.entries(props).map(function (_ref) {
      var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref, 2),
        k = _ref2[0],
        def = _ref2[1];
      return [k, Object.assign({
        get: getProp.bind(null, k),
        set: setProp.bind(null, k),
        enumerable: true
      }, def)];
    })));
    if (config) {
      callSubscribers(Object.keys(config).reduce(function (memo, topic) {
        if (config[topic] !== newConfig[topic]) {
          memo[topic] = newConfig[topic] || {};
        }
        return memo;
      }, {}));
    }
    config = newConfig;
    bidderConfig = {};
    function hasGranularity(val) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.find)(Object.keys(GRANULARITY_OPTIONS), function (option) {
        return val === GRANULARITY_OPTIONS[option];
      });
    }
    function validatePriceGranularity(val) {
      if (!val) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Prebid Error: no value passed to `setPriceGranularity()`');
        return false;
      }
      if (typeof val === 'string') {
        if (!hasGranularity(val)) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.');
        }
      } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(val)) {
        if (!(0,_cpmBucketManager_js__WEBPACK_IMPORTED_MODULE_5__.isValidPriceConfig)(val)) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Invalid custom price value passed to `setPriceGranularity()`');
          return false;
        }
      }
      return true;
    }
    function validateauctionOptions(val) {
      if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(val)) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('Auction Options must be an object');
        return false;
      }
      for (var _i = 0, _Object$keys = Object.keys(val); _i < _Object$keys.length; _i++) {
        var k = _Object$keys[_i];
        if (k !== 'secondaryBidders' && k !== 'suppressStaleRender') {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Auction Options given an incorrect param: ".concat(k));
          return false;
        }
        if (k === 'secondaryBidders') {
          if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(val[k])) {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Auction Options ".concat(k, " must be of type Array"));
            return false;
          } else if (!val[k].every(_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)) {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Auction Options ".concat(k, " must be only string"));
            return false;
          }
        } else if (k === 'suppressStaleRender') {
          if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(val[k])) {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Auction Options ".concat(k, " must be of type boolean"));
            return false;
          }
        }
      }
      return true;
    }
  }

  /**
   * Returns base config with bidder overrides (if there is currently a bidder)
   * @private
   */
  function _getConfig() {
    if (currBidder && bidderConfig && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(bidderConfig[currBidder])) {
      var currBidderConfig = bidderConfig[currBidder];
      var configTopicSet = new Set(Object.keys(config).concat(Object.keys(currBidderConfig)));
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.arrayFrom)(configTopicSet).reduce(function (memo, topic) {
        if (typeof currBidderConfig[topic] === 'undefined') {
          memo[topic] = config[topic];
        } else if (typeof config[topic] === 'undefined') {
          memo[topic] = currBidderConfig[topic];
        } else {
          if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(currBidderConfig[topic])) {
            memo[topic] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)({}, config[topic], currBidderConfig[topic]);
          } else {
            memo[topic] = currBidderConfig[topic];
          }
        }
        return memo;
      }, {});
    }
    return Object.assign({}, config);
  }
  function _getRestrictedConfig() {
    // This causes reading 'ortb2' to throw an error; with prebid 7, that will almost
    // always be the incorrect way to access FPD configuration (https://github.com/prebid/Prebid.js/issues/7651)
    // code that needs the ortb2 config should explicitly use `getAnyConfig`
    // TODO: this is meant as a temporary tripwire to catch inadvertent use of `getConfig('ortb')` as we transition.
    // It should be removed once the risk of that happening is low enough.
    var conf = _getConfig();
    Object.defineProperty(conf, 'ortb2', {
      get: function get() {
        throw new Error('invalid access to \'orbt2\' config - use request parameters instead');
      }
    });
    return conf;
  }
  var _map = [_getConfig, _getRestrictedConfig].map(function (accessor) {
      /*
       * Returns configuration object if called without parameters,
       * or single configuration property if given a string matching a configuration
       * property name.  Allows deep access e.g. getConfig('currency.adServerCurrency')
       *
       * If called with callback parameter, or a string and a callback parameter,
       * subscribes to configuration updates. See `subscribe` function for usage.
       */
      return function getConfig() {
        if (arguments.length <= 1 && typeof (arguments.length <= 0 ? undefined : arguments[0]) !== 'function') {
          var option = arguments.length <= 0 ? undefined : arguments[0];
          return option ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(accessor(), option) : _getConfig();
        }
        return subscribe.apply(void 0, arguments);
      };
    }),
    _map2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_map, 2),
    getAnyConfig = _map2[0],
    getConfig = _map2[1];
  var _map3 = [getConfig, getAnyConfig].map(function (wrapee) {
      /*
       * Like getConfig, except that it returns a deepClone of the result.
       */
      return function readConfig() {
        var res = wrapee.apply(void 0, arguments);
        if (res && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_7__["default"])(res) === 'object') {
          res = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.deepClone)(res);
        }
        return res;
      };
    }),
    _map4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_map3, 2),
    readConfig = _map4[0],
    readAnyConfig = _map4[1];

  /**
   * Internal API for modules (such as prebid-server) that might need access to all bidder config
   */
  function getBidderConfig() {
    return bidderConfig;
  }

  /*
   * Sets configuration given an object containing key-value pairs and calls
   * listeners that were added by the `subscribe` function
   */
  function setConfig(options) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(options)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('setConfig options must be an object');
      return;
    }
    var topics = Object.keys(options);
    var topicalConfig = {};
    topics.forEach(function (topic) {
      var option = options[topic];
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(defaults[topic]) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(option)) {
        option = Object.assign({}, defaults[topic], option);
      }
      try {
        topicalConfig[topic] = config[topic] = option;
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Cannot set config for property ".concat(topic, " : "), e);
      }
    });
    callSubscribers(topicalConfig);
  }

  /**
   * Sets configuration defaults which setConfig values can be applied on top of
   * @param {object} options
   */
  function setDefaults(options) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(defaults)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('defaults must be an object');
      return;
    }
    Object.assign(defaults, options);
    // Add default values to config as well
    Object.assign(config, options);
  }

  /*
   * Adds a function to a set of listeners that are invoked whenever `setConfig`
   * is called. The subscribed function will be passed the options object that
   * was used in the `setConfig` call. Topics can be subscribed to to only get
   * updates when specific properties are updated by passing a topic string as
   * the first parameter.
   *
   * If `options.init` is true, the listener will be immediately called with the current options.
   *
   * Returns an `unsubscribe` function for removing the subscriber from the
   * set of listeners
   *
   * Example use:
   * // subscribe to all configuration changes
   * subscribe((config) => console.log('config set:', config));
   *
   * // subscribe to only 'logging' changes
   * subscribe('logging', (config) => console.log('logging set:', config));
   *
   * // unsubscribe
   * const unsubscribe = subscribe(...);
   * unsubscribe(); // no longer listening
   *
   */
  function subscribe(topic, listener) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = listener;
    if (typeof topic !== 'string') {
      // first param should be callback function in this case,
      // meaning it gets called for any config change
      callback = topic;
      topic = ALL_TOPICS;
      options = listener || {};
    }
    if (typeof callback !== 'function') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('listener must be a function');
      return;
    }
    var nl = {
      topic: topic,
      callback: callback
    };
    listeners.push(nl);
    if (options.init) {
      if (topic === ALL_TOPICS) {
        callback(getConfig());
      } else {
        // eslint-disable-next-line standard/no-callback-literal
        callback((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, topic, getConfig(topic)));
      }
    }

    // save and call this function to remove the listener
    return function unsubscribe() {
      listeners.splice(listeners.indexOf(nl), 1);
    };
  }

  /*
   * Calls listeners that were added by the `subscribe` function
   */
  function callSubscribers(options) {
    var TOPICS = Object.keys(options);

    // call subscribers of a specific topic, passing only that configuration
    listeners.filter(function (listener) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.includes)(TOPICS, listener.topic);
    }).forEach(function (listener) {
      listener.callback((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, listener.topic, options[listener.topic]));
    });

    // call subscribers that didn't give a topic, passing everything that was set
    listeners.filter(function (listener) {
      return listener.topic === ALL_TOPICS;
    }).forEach(function (listener) {
      return listener.callback(options);
    });
  }
  function setBidderConfig(config) {
    var mergeFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    try {
      check(config);
      config.bidders.forEach(function (bidder) {
        if (!bidderConfig[bidder]) {
          bidderConfig[bidder] = {};
        }
        Object.keys(config.config).forEach(function (topic) {
          var option = config.config[topic];
          if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(option)) {
            var func = mergeFlag ? _utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep : Object.assign;
            bidderConfig[bidder][topic] = func({}, bidderConfig[bidder][topic] || {}, option);
          } else {
            bidderConfig[bidder][topic] = option;
          }
        });
      });
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(e);
    }
    function check(obj) {
      if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(obj)) {
        throw 'setBidderConfig bidder options must be an object';
      }
      if (!(Array.isArray(obj.bidders) && obj.bidders.length)) {
        throw 'setBidderConfig bidder options must contain a bidders list with at least 1 bidder';
      }
      if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(obj.config)) {
        throw 'setBidderConfig bidder options must contain a config object';
      }
    }
  }
  function mergeConfig(obj) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(obj)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('mergeConfig input must be an object');
      return;
    }
    var mergedConfig = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(_getConfig(), obj);
    setConfig(_objectSpread({}, mergedConfig));
    return mergedConfig;
  }
  function mergeBidderConfig(obj) {
    return setBidderConfig(obj, true);
  }

  /**
   * Internal functions for core to execute some synchronous code while having an active bidder set.
   */
  function runWithBidder(bidder, fn) {
    currBidder = bidder;
    try {
      return fn();
    } finally {
      resetBidder();
    }
  }
  function callbackWithBidder(bidder) {
    return function (cb) {
      return function () {
        if (typeof cb === 'function') {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return runWithBidder(bidder, _utils_js__WEBPACK_IMPORTED_MODULE_1__.bind.call.apply(_utils_js__WEBPACK_IMPORTED_MODULE_1__.bind, [cb, this].concat(args)));
        } else {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('config.callbackWithBidder callback is not a function');
        }
      };
    };
  }
  function getCurrentBidder() {
    return currBidder;
  }
  function resetBidder() {
    currBidder = null;
  }
  resetConfig();
  return {
    getCurrentBidder: getCurrentBidder,
    resetBidder: resetBidder,
    getConfig: getConfig,
    getAnyConfig: getAnyConfig,
    readConfig: readConfig,
    readAnyConfig: readAnyConfig,
    setConfig: setConfig,
    mergeConfig: mergeConfig,
    setDefaults: setDefaults,
    resetConfig: resetConfig,
    runWithBidder: runWithBidder,
    callbackWithBidder: callbackWithBidder,
    setBidderConfig: setBidderConfig,
    getBidderConfig: getBidderConfig,
    mergeBidderConfig: mergeBidderConfig
  };
}
var config = newConfig();

/***/ }),

/***/ "./src/consentHandler.js":
/*!*******************************!*\
  !*** ./src/consentHandler.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GDPR_GVLIDS": function() { return /* binding */ GDPR_GVLIDS; },
/* harmony export */   "GdprConsentHandler": function() { return /* binding */ GdprConsentHandler; },
/* harmony export */   "GppConsentHandler": function() { return /* binding */ GppConsentHandler; },
/* harmony export */   "UspConsentHandler": function() { return /* binding */ UspConsentHandler; },
/* harmony export */   "VENDORLESS_GVLID": function() { return /* binding */ VENDORLESS_GVLID; }
/* harmony export */ });
/* unused harmony exports ConsentHandler, gvlidRegistry */
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



/**
 * Placeholder gvlid for when vendor consent is not required. When this value is used as gvlid, the gdpr
 * enforcement module will take it to mean "vendor consent was given".
 *
 * see https://github.com/prebid/Prebid.js/issues/8161
 */
var VENDORLESS_GVLID = Object.freeze({});
var _enabled = /*#__PURE__*/new WeakMap();
var _data = /*#__PURE__*/new WeakMap();
var _defer = /*#__PURE__*/new WeakMap();
var _ready = /*#__PURE__*/new WeakMap();
var _resolve = /*#__PURE__*/new WeakSet();
var ConsentHandler = /*#__PURE__*/function () {
  function ConsentHandler() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ConsentHandler);
    _classPrivateMethodInitSpec(this, _resolve);
    _classPrivateFieldInitSpec(this, _enabled, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _defer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ready, {
      writable: true,
      value: void 0
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "generatedTime", void 0);
    this.reset();
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(ConsentHandler, [{
    key: "reset",
    value:
    /**
     * reset this handler (mainly for tests)
     */
    function reset() {
      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _defer, (0,_utils_promise_js__WEBPACK_IMPORTED_MODULE_6__.defer)());
      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _enabled, false);
      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _data, null);
      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _ready, false);
      this.generatedTime = null;
    }

    /**
     * Enable this consent handler. This should be called by the relevant consent management module
     * on initialization.
     */
  }, {
    key: "enable",
    value: function enable() {
      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _enabled, true);
    }

    /**
     * @returns {boolean} true if the related consent management module is enabled.
     */
  }, {
    key: "enabled",
    get: function get() {
      return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _enabled);
    }

    /**
     * @returns {boolean} true if consent data has been resolved (it may be `null` if the resolution failed).
     */
  }, {
    key: "ready",
    get: function get() {
      return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _ready);
    }

    /**
     * @returns a promise than resolves to the consent data, or null if no consent data is available
     */
  }, {
    key: "promise",
    get: function get() {
      if ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _ready)) {
        return _utils_promise_js__WEBPACK_IMPORTED_MODULE_6__.GreedyPromise.resolve((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _data));
      }
      if (!(0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _enabled)) {
        _classPrivateMethodGet(this, _resolve, _resolve2).call(this, null);
      }
      return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _defer).promise;
    }
  }, {
    key: "setConsentData",
    value: function setConsentData(data) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.timestamp)();
      this.generatedTime = time;
      _classPrivateMethodGet(this, _resolve, _resolve2).call(this, data);
    }
  }, {
    key: "getConsentData",
    value: function getConsentData() {
      return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _data);
    }
  }]);
  return ConsentHandler;
}();
function _resolve2(data) {
  (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _ready, true);
  (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _data, data);
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _defer).resolve(data);
}
var UspConsentHandler = /*#__PURE__*/function (_ConsentHandler) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(UspConsentHandler, _ConsentHandler);
  var _super = _createSuper(UspConsentHandler);
  function UspConsentHandler() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, UspConsentHandler);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(UspConsentHandler, [{
    key: "getConsentMeta",
    value: function getConsentMeta() {
      var consentData = this.getConsentData();
      if (consentData && this.generatedTime) {
        return {
          usp: consentData,
          generatedAt: this.generatedTime
        };
      }
    }
  }]);
  return UspConsentHandler;
}(ConsentHandler);
var GdprConsentHandler = /*#__PURE__*/function (_ConsentHandler2) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(GdprConsentHandler, _ConsentHandler2);
  var _super2 = _createSuper(GdprConsentHandler);
  function GdprConsentHandler() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, GdprConsentHandler);
    return _super2.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(GdprConsentHandler, [{
    key: "getConsentMeta",
    value: function getConsentMeta() {
      var consentData = this.getConsentData();
      if (consentData && consentData.vendorData && this.generatedTime) {
        return {
          gdprApplies: consentData.gdprApplies,
          consentStringSize: (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.isStr)(consentData.vendorData.tcString) ? consentData.vendorData.tcString.length : 0,
          generatedAt: this.generatedTime,
          apiVersion: consentData.apiVersion
        };
      }
    }
  }]);
  return GdprConsentHandler;
}(ConsentHandler);
var GppConsentHandler = /*#__PURE__*/function (_ConsentHandler3) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(GppConsentHandler, _ConsentHandler3);
  var _super3 = _createSuper(GppConsentHandler);
  function GppConsentHandler() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, GppConsentHandler);
    return _super3.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(GppConsentHandler, [{
    key: "getConsentMeta",
    value: function getConsentMeta() {
      var consentData = this.getConsentData();
      if (consentData && this.generatedTime) {
        return {
          generatedAt: this.generatedTime
        };
      }
    }
  }]);
  return GppConsentHandler;
}(ConsentHandler);
function gvlidRegistry() {
  var registry = {};
  var flat = {};
  var none = {};
  return {
    /**
     * Register a module's GVL ID.
     * @param {string} moduleType defined in `activities/modules.js`
     * @param {string} moduleName
     * @param {number} gvlid
     */
    register: function register(moduleType, moduleName, gvlid) {
      if (gvlid) {
        (registry[moduleName] = registry[moduleName] || {})[moduleType] = gvlid;
        if (flat.hasOwnProperty(moduleName)) {
          if (flat[moduleName] !== gvlid) flat[moduleName] = none;
        } else {
          flat[moduleName] = gvlid;
        }
      }
    },
    /**
     * Get a module's GVL ID(s).
     *
     * @param {string} moduleName
     * @return {{modules: {[moduleType]: number}, gvlid?: number}} an object where:
     *   `modules` is a map from module type to that module's GVL ID;
     *   `gvlid` is the single GVL ID for this family of modules (only defined
     *   if all modules with this name declared the same ID).
     */
    get: function get(moduleName) {
      var result = {
        modules: registry[moduleName] || {}
      };
      if (flat.hasOwnProperty(moduleName) && flat[moduleName] !== none) {
        result.gvlid = flat[moduleName];
      }
      return result;
    }
  };
}
var GDPR_GVLIDS = gvlidRegistry();

/***/ }),

/***/ "./src/cpmBucketManager.js":
/*!*********************************!*\
  !*** ./src/cpmBucketManager.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPriceBucketString": function() { return /* binding */ getPriceBucketString; },
/* harmony export */   "isValidPriceConfig": function() { return /* binding */ isValidPriceConfig; }
/* harmony export */ });
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.js */ "./src/config.js");



var _defaultPrecision = 2;
var _lgPriceConfig = {
  'buckets': [{
    'max': 5,
    'increment': 0.5
  }]
};
var _mgPriceConfig = {
  'buckets': [{
    'max': 20,
    'increment': 0.1
  }]
};
var _hgPriceConfig = {
  'buckets': [{
    'max': 20,
    'increment': 0.01
  }]
};
var _densePriceConfig = {
  'buckets': [{
    'max': 3,
    'increment': 0.01
  }, {
    'max': 8,
    'increment': 0.05
  }, {
    'max': 20,
    'increment': 0.5
  }]
};
var _autoPriceConfig = {
  'buckets': [{
    'max': 5,
    'increment': 0.05
  }, {
    'max': 10,
    'increment': 0.1
  }, {
    'max': 20,
    'increment': 0.5
  }]
};
function getPriceBucketString(cpm, customConfig) {
  var granularityMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cpmFloat = parseFloat(cpm);
  if (isNaN(cpmFloat)) {
    cpmFloat = '';
  }
  return {
    low: cpmFloat === '' ? '' : getCpmStringValue(cpm, _lgPriceConfig, granularityMultiplier),
    med: cpmFloat === '' ? '' : getCpmStringValue(cpm, _mgPriceConfig, granularityMultiplier),
    high: cpmFloat === '' ? '' : getCpmStringValue(cpm, _hgPriceConfig, granularityMultiplier),
    auto: cpmFloat === '' ? '' : getCpmStringValue(cpm, _autoPriceConfig, granularityMultiplier),
    dense: cpmFloat === '' ? '' : getCpmStringValue(cpm, _densePriceConfig, granularityMultiplier),
    custom: cpmFloat === '' ? '' : getCpmStringValue(cpm, customConfig, granularityMultiplier)
  };
}
function getCpmStringValue(cpm, config, granularityMultiplier) {
  var cpmStr = '';
  if (!isValidPriceConfig(config)) {
    return cpmStr;
  }
  var cap = config.buckets.reduce(function (prev, curr) {
    if (prev.max > curr.max) {
      return prev;
    }
    return curr;
  }, {
    'max': 0
  });
  var bucketFloor = 0;
  var bucket = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_0__.find)(config.buckets, function (bucket) {
    if (cpm > cap.max * granularityMultiplier) {
      // cpm exceeds cap, just return the cap.
      var precision = bucket.precision;
      if (typeof precision === 'undefined') {
        precision = _defaultPrecision;
      }
      cpmStr = (bucket.max * granularityMultiplier).toFixed(precision);
    } else if (cpm <= bucket.max * granularityMultiplier && cpm >= bucketFloor * granularityMultiplier) {
      bucket.min = bucketFloor;
      return bucket;
    } else {
      bucketFloor = bucket.max;
    }
  });
  if (bucket) {
    cpmStr = getCpmTarget(cpm, bucket, granularityMultiplier);
  }
  return cpmStr;
}
function isValidPriceConfig(config) {
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(config) || !config.buckets || !Array.isArray(config.buckets)) {
    return false;
  }
  var isValid = true;
  config.buckets.forEach(function (bucket) {
    if (!bucket.max || !bucket.increment) {
      isValid = false;
    }
  });
  return isValid;
}
function getCpmTarget(cpm, bucket, granularityMultiplier) {
  var precision = typeof bucket.precision !== 'undefined' ? bucket.precision : _defaultPrecision;
  var increment = bucket.increment * granularityMultiplier;
  var bucketMin = bucket.min * granularityMultiplier;
  var roundingFunction = Math.floor;
  var customRoundingFunction = _config_js__WEBPACK_IMPORTED_MODULE_2__.config.getConfig('cpmRoundingFunction');
  if (typeof customRoundingFunction === 'function') {
    roundingFunction = customRoundingFunction;
  }

  // start increments at the bucket min and then add bucket min back to arrive at the correct rounding
  // note - we're padding the values to avoid using decimals in the math prior to flooring
  // this is done as JS can return values slightly below the expected mark which would skew the price bucket target
  //   (eg 4.01 / 0.01 = 400.99999999999994)
  // min precison should be 2 to move decimal place over.
  var pow = Math.pow(10, precision + 2);
  var cpmToRound = (cpm * pow - bucketMin * pow) / (increment * pow);
  var cpmTarget;
  var invalidRounding;
  // It is likely that we will be passed {cpmRoundingFunction: roundingFunction()}
  // rather than the expected {cpmRoundingFunction: roundingFunction}. Default back to floor in that case
  try {
    cpmTarget = roundingFunction(cpmToRound) * increment + bucketMin;
  } catch (err) {
    invalidRounding = true;
  }
  if (invalidRounding || typeof cpmTarget !== 'number') {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('Invalid rounding function passed in config');
    cpmTarget = Math.floor(cpmToRound) * increment + bucketMin;
  }
  // force to 10 decimal places to deal with imprecise decimal/binary conversions
  //    (for example 0.1 * 3 = 0.30000000000000004)

  cpmTarget = Number(cpmTarget.toFixed(10));
  return cpmTarget.toFixed(precision);
}


/***/ }),

/***/ "./src/debugging.js":
/*!**************************!*\
  !*** ./src/debugging.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSession": function() { return /* binding */ loadSession; }
/* harmony export */ });
/* unused harmony exports DEBUG_KEY, debuggingModuleLoader, debuggingControls, reset */
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _bidfactory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bidfactory.js */ "./src/bidfactory.js");
/* harmony import */ var _adloader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adloader.js */ "./src/adloader.js");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");







var DEBUG_KEY = "__owpbjs_debugging__";
function isDebuggingInstalled() {
  return (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__.getGlobal)().installedModules.includes('debugging');
}
function loadScript(url) {
  return new _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__.GreedyPromise(function (resolve) {
    (0,_adloader_js__WEBPACK_IMPORTED_MODULE_2__.loadExternalScript)(url, 'debugging', resolve);
  });
}
function debuggingModuleLoader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$alreadyInstalled = _ref.alreadyInstalled,
    alreadyInstalled = _ref$alreadyInstalled === void 0 ? isDebuggingInstalled : _ref$alreadyInstalled,
    _ref$script = _ref.script,
    script = _ref$script === void 0 ? loadScript : _ref$script;
  var loading = null;
  return function () {
    if (loading == null) {
      loading = new _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__.GreedyPromise(function (resolve, reject) {
        // run this in a 0-delay timeout to give installedModules time to be populated
        setTimeout(function () {
          if (alreadyInstalled()) {
            resolve();
          } else {
            var url = "/build/dev/debugging-standalone.js";
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logMessage)("Debugging module not installed, loading it from \"".concat(url, "\"..."));
            (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__.getGlobal)()._installDebugging = true;
            script(url).then(function () {
              (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__.getGlobal)()._installDebugging({
                DEBUG_KEY: DEBUG_KEY,
                hook: _hook_js__WEBPACK_IMPORTED_MODULE_4__.hook,
                config: _config_js__WEBPACK_IMPORTED_MODULE_5__.config,
                createBid: _bidfactory_js__WEBPACK_IMPORTED_MODULE_6__.createBid,
                logger: (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.prefixLog)('DEBUG:')
              });
            }).then(resolve, reject);
          }
        });
      });
    }
    return loading;
  };
}
function debuggingControls() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$load = _ref2.load,
    load = _ref2$load === void 0 ? debuggingModuleLoader() : _ref2$load,
    _ref2$hook = _ref2.hook,
    hook = _ref2$hook === void 0 ? (0,_hook_js__WEBPACK_IMPORTED_MODULE_4__.getHook)('requestBids') : _ref2$hook;
  var promise = null;
  var enabled = false;
  function waitForDebugging(next) {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return (promise || _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__.GreedyPromise.resolve()).then(function () {
      return next.apply(_this, args);
    });
  }
  function enable() {
    if (!enabled) {
      promise = load();
      // set debugging to high priority so that it has the opportunity to mess with most things
      hook.before(waitForDebugging, 99);
      enabled = true;
    }
  }
  function disable() {
    hook.getHooks({
      hook: waitForDebugging
    }).remove();
    enabled = false;
  }
  function reset() {
    promise = null;
    disable();
  }
  return {
    enable: enable,
    disable: disable,
    reset: reset
  };
}
var ctl = debuggingControls();
var reset = ctl.reset;
function loadSession() {
  var storage = null;
  try {
    storage = window.sessionStorage;
  } catch (e) {}
  if (storage !== null) {
    var debugging = ctl;
    var _config = null;
    try {
      _config = storage.getItem(DEBUG_KEY);
    } catch (e) {}
    if (_config !== null) {
      // just make sure the module runs; it will take care of parsing the config (and disabling itself if necessary)
      debugging.enable();
    }
  }
}
_config_js__WEBPACK_IMPORTED_MODULE_5__.config.getConfig('debugging', function (_ref3) {
  var debugging = _ref3.debugging;
  debugging !== null && debugging !== void 0 && debugging.enabled ? ctl.enable() : ctl.disable();
});

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emit": function() { return /* binding */ emit; },
/* harmony export */   "getEvents": function() { return /* binding */ getEvents; },
/* harmony export */   "off": function() { return /* binding */ off; },
/* harmony export */   "on": function() { return /* binding */ on; }
/* harmony export */ });
/* unused harmony exports get, addEvents, clearEvents */
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/**
 * events.js
 */


var slice = Array.prototype.slice;
var push = Array.prototype.push;

// define entire events
// var allEvents = ['bidRequested','bidResponse','bidWon','bidTimeout'];
var allEvents = _utils_js__WEBPACK_IMPORTED_MODULE_0__._map(_constants_json__WEBPACK_IMPORTED_MODULE_1__.EVENTS, function (v) {
  return v;
});
var idPaths = _constants_json__WEBPACK_IMPORTED_MODULE_1__.EVENT_ID_PATHS;

// keep a record of all events fired
var eventsFired = [];
var _public = function () {
  var _handlers = {};
  var _public = {};

  /**
   *
   * @param {String} eventString  The name of the event.
   * @param {Array} args  The payload emitted with the event.
   * @private
   */
  function _dispatch(eventString, args) {
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.logMessage('Emitting event for: ' + eventString);
    var eventPayload = args[0] || {};
    var idPath = idPaths[eventString];
    var key = eventPayload[idPath];
    var event = _handlers[eventString] || {
      que: []
    };
    var eventKeys = _utils_js__WEBPACK_IMPORTED_MODULE_0__._map(event, function (v, k) {
      return k;
    });
    var callbacks = [];

    // record the event:
    eventsFired.push({
      eventType: eventString,
      args: eventPayload,
      id: key,
      elapsedTime: _utils_js__WEBPACK_IMPORTED_MODULE_0__.getPerformanceNow()
    });

    /** Push each specific callback to the `callbacks` array.
     * If the `event` map has a key that matches the value of the
     * event payload id path, e.g. `eventPayload[idPath]`, then apply
     * each function in the `que` array as an argument to push to the
     * `callbacks` array
     * */
    if (key && _utils_js__WEBPACK_IMPORTED_MODULE_0__.contains(eventKeys, key)) {
      push.apply(callbacks, event[key].que);
    }

    /** Push each general callback to the `callbacks` array. */
    push.apply(callbacks, event.que);

    /** call each of the callbacks */
    _utils_js__WEBPACK_IMPORTED_MODULE_0__._each(callbacks, function (fn) {
      if (!fn) return;
      try {
        fn.apply(null, args);
      } catch (e) {
        _utils_js__WEBPACK_IMPORTED_MODULE_0__.logError('Error executing handler:', 'events.js', e);
      }
    });
  }
  function _checkAvailableEvent(event) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__.contains(allEvents, event);
  }
  _public.on = function (eventString, handler, id) {
    // check whether available event or not
    if (_checkAvailableEvent(eventString)) {
      var event = _handlers[eventString] || {
        que: []
      };
      if (id) {
        event[id] = event[id] || {
          que: []
        };
        event[id].que.push(handler);
      } else {
        event.que.push(handler);
      }
      _handlers[eventString] = event;
    } else {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__.logError('Wrong event name : ' + eventString + ' Valid event names :' + allEvents);
    }
  };
  _public.emit = function (event) {
    var args = slice.call(arguments, 1);
    _dispatch(event, args);
  };
  _public.off = function (eventString, handler, id) {
    var event = _handlers[eventString];
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(event) || _utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(event.que) && _utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(event[id])) {
      return;
    }
    if (id && (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(event[id]) || _utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(event[id].que))) {
      return;
    }
    if (id) {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__._each(event[id].que, function (_handler) {
        var que = event[id].que;
        if (_handler === handler) {
          que.splice(que.indexOf(_handler), 1);
        }
      });
    } else {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__._each(event.que, function (_handler) {
        var que = event.que;
        if (_handler === handler) {
          que.splice(que.indexOf(_handler), 1);
        }
      });
    }
    _handlers[eventString] = event;
  };
  _public.get = function () {
    return _handlers;
  };
  _public.addEvents = function (events) {
    allEvents = allEvents.concat(events);
  };

  /**
   * This method can return a copy of all the events fired
   * @return {Array} array of events fired
   */
  _public.getEvents = function () {
    var arrayCopy = [];
    _utils_js__WEBPACK_IMPORTED_MODULE_0__._each(eventsFired, function (value) {
      var newProp = Object.assign({}, value);
      arrayCopy.push(newProp);
    });
    return arrayCopy;
  };
  return _public;
}();
_utils_js__WEBPACK_IMPORTED_MODULE_0__._setEventEmitter(_public.emit.bind(_public));
var on = _public.on,
  off = _public.off,
  get = _public.get,
  getEvents = _public.getEvents,
  emit = _public.emit,
  addEvents = _public.addEvents;

function clearEvents() {
  eventsFired.length = 0;
}

/***/ }),

/***/ "./src/fpd/enrichment.js":
/*!*******************************!*\
  !*** ./src/fpd/enrichment.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enrichFPD": function() { return /* binding */ enrichFPD; }
/* harmony export */ });
/* unused harmony export dep */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hook.js */ "./src/hook.js");
/* harmony import */ var _refererDetection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../refererDetection.js */ "./src/refererDetection.js");
/* harmony import */ var _rootDomain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rootDomain.js */ "./src/fpd/rootDomain.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/* harmony import */ var _sua_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sua.js */ "./src/fpd/sua.js");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/promise.js */ "./src/utils/promise.js");
/* harmony import */ var _oneClient_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oneClient.js */ "./src/fpd/oneClient.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








var dep = {
  getRefererInfo: _refererDetection_js__WEBPACK_IMPORTED_MODULE_0__.getRefererInfo,
  findRootDomain: _rootDomain_js__WEBPACK_IMPORTED_MODULE_1__.findRootDomain,
  getWindowTop: _utils_js__WEBPACK_IMPORTED_MODULE_2__.getWindowTop,
  getWindowSelf: _utils_js__WEBPACK_IMPORTED_MODULE_2__.getWindowSelf,
  getHighEntropySUA: _sua_js__WEBPACK_IMPORTED_MODULE_3__.getHighEntropySUA,
  getLowEntropySUA: _sua_js__WEBPACK_IMPORTED_MODULE_3__.getLowEntropySUA
};
var oneClient = (0,_oneClient_js__WEBPACK_IMPORTED_MODULE_4__.clientSectionChecker)('FPD');

/**
 * Enrich an ortb2 object with first party data.
 * @param {Promise[{}]} fpd: a promise to an ortb2 object.
 * @returns: {Promise[{}]}: a promise to an enriched ortb2 object.
 */
var enrichFPD = (0,_hook_js__WEBPACK_IMPORTED_MODULE_5__.hook)('sync', function (fpd) {
  return _utils_promise_js__WEBPACK_IMPORTED_MODULE_6__.GreedyPromise.all([fpd, getSUA().catch(function () {
    return null;
  })]).then(function (_ref) {
    var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, 2),
      ortb2 = _ref2[0],
      sua = _ref2[1];
    var ri = dep.getRefererInfo();
    mergeLegacySetConfigs(ortb2);
    Object.entries(ENRICHMENTS).forEach(function (_ref3) {
      var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref3, 2),
        section = _ref4[0],
        getEnrichments = _ref4[1];
      var data = getEnrichments(ortb2, ri);
      if (data && Object.keys(data).length > 0) {
        ortb2[section] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)({}, data, ortb2[section]);
      }
    });
    if (sua) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.dset)(ortb2, 'device.sua', Object.assign({}, sua, ortb2.device.sua));
    }
    ortb2 = oneClient(ortb2);
    var _iterator = _createForOfIteratorHelper(_oneClient_js__WEBPACK_IMPORTED_MODULE_4__.CLIENT_SECTIONS),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var section = _step.value;
        if ((0,_oneClient_js__WEBPACK_IMPORTED_MODULE_4__.hasSection)(ortb2, section)) {
          ortb2[section] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)({}, clientEnrichment(ortb2, ri), ortb2[section]);
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return ortb2;
  });
});
function mergeLegacySetConfigs(ortb2) {
  // merge in values from "legacy" setConfig({app, site, device})
  // TODO: deprecate these eventually
  ['app', 'site', 'device'].forEach(function (prop) {
    var cfg = _config_js__WEBPACK_IMPORTED_MODULE_9__.config.getConfig(prop);
    if (cfg != null) {
      ortb2[prop] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)({}, cfg, ortb2[prop]);
    }
  });
}
function winFallback(fn) {
  try {
    return fn(dep.getWindowTop());
  } catch (e) {
    return fn(dep.getWindowSelf());
  }
}
function getSUA() {
  var hints = _config_js__WEBPACK_IMPORTED_MODULE_9__.config.getConfig('firstPartyData.uaHints');
  return !Array.isArray(hints) || hints.length === 0 ? _utils_promise_js__WEBPACK_IMPORTED_MODULE_6__.GreedyPromise.resolve(dep.getLowEntropySUA()) : dep.getHighEntropySUA(hints);
}
function removeUndef(obj) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDefinedParams)(obj, Object.keys(obj));
}
var ENRICHMENTS = {
  site: function site(ortb2, ri) {
    if (_oneClient_js__WEBPACK_IMPORTED_MODULE_4__.CLIENT_SECTIONS.filter(function (p) {
      return p !== 'site';
    }).some(_oneClient_js__WEBPACK_IMPORTED_MODULE_4__.hasSection.bind(null, ortb2))) {
      // do not enrich site if dooh or app are set
      return;
    }
    return removeUndef({
      page: ri.page,
      ref: ri.ref
    });
  },
  device: function device() {
    return winFallback(function (win) {
      var w = win.innerWidth || win.document.documentElement.clientWidth || win.document.body.clientWidth;
      var h = win.innerHeight || win.document.documentElement.clientHeight || win.document.body.clientHeight;
      return {
        w: w,
        h: h,
        dnt: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDNT)() ? 1 : 0,
        ua: win.navigator.userAgent,
        language: win.navigator.language.split('-').shift()
      };
    });
  },
  regs: function regs() {
    var regs = {};
    if (winFallback(function (win) {
      return win.navigator.globalPrivacyControl;
    })) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.dset)(regs, 'ext.gpc', 1);
    }
    var coppa = _config_js__WEBPACK_IMPORTED_MODULE_9__.config.getConfig('coppa');
    if (typeof coppa === 'boolean') {
      regs.coppa = coppa ? 1 : 0;
    }
    return regs;
  }
};

// Enrichment of properties common across dooh, app and site - will be dropped into whatever
// section is appropriate
function clientEnrichment(ortb2, ri) {
  var _winFallback, _winFallback$content, _winFallback$content$;
  var domain = (0,_refererDetection_js__WEBPACK_IMPORTED_MODULE_0__.parseDomain)(ri.page, {
    noLeadingWww: true
  });
  var keywords = (_winFallback = winFallback(function (win) {
    return win.document.querySelector('meta[name=\'keywords\']');
  })) === null || _winFallback === void 0 ? void 0 : (_winFallback$content = _winFallback.content) === null || _winFallback$content === void 0 ? void 0 : (_winFallback$content$ = _winFallback$content.replace) === null || _winFallback$content$ === void 0 ? void 0 : _winFallback$content$.call(_winFallback$content, /\s/g, '');
  return removeUndef({
    domain: domain,
    keywords: keywords,
    publisher: removeUndef({
      domain: dep.findRootDomain(domain)
    })
  });
}

/***/ }),

/***/ "./src/fpd/oneClient.js":
/*!******************************!*\
  !*** ./src/fpd/oneClient.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT_SECTIONS": function() { return /* binding */ CLIENT_SECTIONS; },
/* harmony export */   "clientSectionChecker": function() { return /* binding */ clientSectionChecker; },
/* harmony export */   "hasSection": function() { return /* binding */ hasSection; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


// mutually exclusive ORTB sections in order of priority - 'dooh' beats 'app' & 'site' and 'app' beats 'site';
// if one is set, the others will be removed
var CLIENT_SECTIONS = ['dooh', 'app', 'site'];
function clientSectionChecker(logPrefix) {
  return function onlyOneClientSection(ortb2) {
    CLIENT_SECTIONS.reduce(function (found, section) {
      if (hasSection(ortb2, section)) {
        if (found != null) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logWarn)("".concat(logPrefix, " specifies both '").concat(found, "' and '").concat(section, "'; dropping the latter."));
          delete ortb2[section];
        } else {
          found = section;
        }
      }
      return found;
    }, null);
    return ortb2;
  };
}
function hasSection(ortb2, section) {
  return ortb2[section] != null && Object.keys(ortb2[section]).length > 0;
}

/***/ }),

/***/ "./src/fpd/rootDomain.js":
/*!*******************************!*\
  !*** ./src/fpd/rootDomain.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findRootDomain": function() { return /* binding */ findRootDomain; }
/* harmony export */ });
/* unused harmony export coreStorage */
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _storageManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../storageManager.js */ "./src/storageManager.js");


var coreStorage = (0,_storageManager_js__WEBPACK_IMPORTED_MODULE_0__.getCoreStorageManager)('fpdEnrichment');

/**
 * Find the root domain by testing for the topmost domain that will allow setting cookies.
 */

var findRootDomain = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.memoize)(function findRootDomain() {
  var fullDomain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.host;
  if (!coreStorage.cookiesAreEnabled()) {
    return fullDomain;
  }
  var domainParts = fullDomain.split('.');
  if (domainParts.length === 2) {
    return fullDomain;
  }
  var rootDomain;
  var continueSearching;
  var startIndex = -2;
  var TEST_COOKIE_NAME = "_rdc".concat(Date.now());
  var TEST_COOKIE_VALUE = 'writeable';
  do {
    rootDomain = domainParts.slice(startIndex).join('.');
    var expirationDate = new Date((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timestamp)() + 10 * 1000).toUTCString();

    // Write a test cookie
    coreStorage.setCookie(TEST_COOKIE_NAME, TEST_COOKIE_VALUE, expirationDate, 'Lax', rootDomain, undefined);

    // See if the write was successful
    var value = coreStorage.getCookie(TEST_COOKIE_NAME, undefined);
    if (value === TEST_COOKIE_VALUE) {
      continueSearching = false;
      // Delete our test cookie
      coreStorage.setCookie(TEST_COOKIE_NAME, '', 'Thu, 01 Jan 1970 00:00:01 GMT', undefined, rootDomain, undefined);
    } else {
      startIndex += -1;
      continueSearching = Math.abs(startIndex) <= domainParts.length;
    }
  } while (continueSearching);
  return rootDomain;
});

/***/ }),

/***/ "./src/fpd/sua.js":
/*!************************!*\
  !*** ./src/fpd/sua.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHighEntropySUA": function() { return /* binding */ getHighEntropySUA; },
/* harmony export */   "getLowEntropySUA": function() { return /* binding */ getLowEntropySUA; }
/* harmony export */ });
/* unused harmony exports SUA_SOURCE_UNKNOWN, SUA_SOURCE_LOW_ENTROPY, SUA_SOURCE_HIGH_ENTROPY, SUA_SOURCE_UA_HEADER, HIGH_ENTROPY_HINTS, lowEntropySUAAccessor, highEntropySUAAccessor, uaDataToSUA */
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/promise.js */ "./src/utils/promise.js");


var SUA_SOURCE_UNKNOWN = 0;
var SUA_SOURCE_LOW_ENTROPY = 1;
var SUA_SOURCE_HIGH_ENTROPY = 2;
var SUA_SOURCE_UA_HEADER = 3;

// "high entropy" (i.e. privacy-sensitive) fields that can be requested from the navigator.
var HIGH_ENTROPY_HINTS = ['architecture', 'bitness', 'model', 'platformVersion', 'fullVersionList'];

/**
 * Returns low entropy UA client hints encoded as an ortb2.6 device.sua object; or null if no UA client hints are available.
 */
var getLowEntropySUA = lowEntropySUAAccessor();

/**
 * Returns a promise to high entropy UA client hints encoded as an ortb2.6 device.sua object, or null if no UA client hints are available.
 *
 * Note that the return value is a promise because the underlying browser API returns a promise; this
 * seems to plan for additional controls (such as alerts / permission request prompts to the user); it's unclear
 * at the moment if this means that asking for more hints would result in slower / more expensive calls.
 *
 * @param {Array[String]} hints hints to request, defaults to all (HIGH_ENTROPY_HINTS).
 */
var getHighEntropySUA = highEntropySUAAccessor();
function lowEntropySUAAccessor() {
  var _window$navigator;
  var uaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_window$navigator = window.navigator) === null || _window$navigator === void 0 ? void 0 : _window$navigator.userAgentData;
  var sua = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(uaData) ? null : Object.freeze(uaDataToSUA(SUA_SOURCE_LOW_ENTROPY, uaData));
  return function () {
    return sua;
  };
}
function highEntropySUAAccessor() {
  var _window$navigator2;
  var uaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_window$navigator2 = window.navigator) === null || _window$navigator2 === void 0 ? void 0 : _window$navigator2.userAgentData;
  var cache = {};
  var keys = new WeakMap();
  return function () {
    var hints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HIGH_ENTROPY_HINTS;
    if (!keys.has(hints)) {
      var sorted = Array.from(hints);
      sorted.sort();
      keys.set(hints, sorted.join('|'));
    }
    var key = keys.get(hints);
    if (!cache.hasOwnProperty(key)) {
      try {
        cache[key] = uaData.getHighEntropyValues(hints).then(function (result) {
          return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(result) ? null : Object.freeze(uaDataToSUA(SUA_SOURCE_HIGH_ENTROPY, result));
        }).catch(function () {
          return null;
        });
      } catch (e) {
        cache[key] = _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__.GreedyPromise.resolve(null);
      }
    }
    return cache[key];
  };
}

/**
 * Convert a User Agent client hints object to an ORTB 2.6 device.sua fragment
 * https://iabtechlab.com/wp-content/uploads/2022/04/OpenRTB-2-6_FINAL.pdf
 *
 * @param source source of the UAData object (0 to 3)
 * @param uaData https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/
 * @return {{}}
 */
function uaDataToSUA(source, uaData) {
  function toBrandVersion(brand, version) {
    var bv = {
      brand: brand
    };
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(version) && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyStr)(version)) {
      bv.version = version.split('.');
    }
    return bv;
  }
  var sua = {
    source: source
  };
  if (uaData.platform) {
    sua.platform = toBrandVersion(uaData.platform, uaData.platformVersion);
  }
  if (uaData.fullVersionList || uaData.brands) {
    sua.browsers = (uaData.fullVersionList || uaData.brands).map(function (_ref) {
      var brand = _ref.brand,
        version = _ref.version;
      return toBrandVersion(brand, version);
    });
  }
  if (uaData.hasOwnProperty('mobile')) {
    sua.mobile = uaData.mobile ? 1 : 0;
  }
  ['model', 'bitness', 'architecture'].forEach(function (prop) {
    var value = uaData[prop];
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(value)) {
      sua[prop] = value;
    }
  });
  return sua;
}

/***/ }),

/***/ "./src/hook.js":
/*!*********************!*\
  !*** ./src/hook.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHook": function() { return /* binding */ getHook; },
/* harmony export */   "hook": function() { return /* binding */ hook; },
/* harmony export */   "module": function() { return /* binding */ module; },
/* harmony export */   "ready": function() { return /* binding */ ready; },
/* harmony export */   "submodule": function() { return /* binding */ submodule; },
/* harmony export */   "wrapHook": function() { return /* binding */ wrapHook; }
/* harmony export */ });
/* unused harmony export setupBeforeHookFnOnce */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fun-hooks/no-eval/index.js */ "./node_modules/fun-hooks/no-eval/index.js");
/* harmony import */ var fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");



var hook = fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0___default()({
  useProxy: false,
  ready: (fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0___default().SYNC) | (fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0___default().ASYNC) | (fun_hooks_no_eval_index_js__WEBPACK_IMPORTED_MODULE_0___default().QUEUE)
});
var readyCtl = (0,_utils_promise_js__WEBPACK_IMPORTED_MODULE_1__.defer)();
hook.ready = function () {
  var ready = hook.ready;
  return function () {
    try {
      return ready.apply(hook, arguments);
    } finally {
      readyCtl.resolve();
    }
  };
}();

/**
 * A promise that resolves when hooks are ready.
 * @type {Promise}
 */
var ready = readyCtl.promise;
var getHook = hook.get;
function setupBeforeHookFnOnce(baseFn, hookFn) {
  var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;
  var result = baseFn.getHooks({
    hook: hookFn
  });
  if (result.length === 0) {
    baseFn.before(hookFn, priority);
  }
}
var submoduleInstallMap = {};
function module(name, install) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$postInstallAllow = _ref.postInstallAllowed,
    postInstallAllowed = _ref$postInstallAllow === void 0 ? false : _ref$postInstallAllow;
  hook('async', function (submodules) {
    submodules.forEach(function (args) {
      return install.apply(void 0, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(args));
    });
    if (postInstallAllowed) submoduleInstallMap[name] = install;
  }, name)([]); // will be queued until hook.ready() called in pbjs.processQueue();
}

function submodule(name) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var install = submoduleInstallMap[name];
  if (install) return install.apply(void 0, args);
  getHook(name).before(function (next, modules) {
    modules.push(args);
    next(modules);
  });
}

/**
 * Copy hook methods (.before, .after, etc) from a given hook to a given wrapper object.
 */
function wrapHook(hook, wrapper) {
  Object.defineProperties(wrapper, Object.fromEntries(['before', 'after', 'getHooks', 'removeAll'].map(function (m) {
    return [m, {
      get: function get() {
        return hook[m];
      }
    }];
  })));
  return wrapper;
}

/***/ }),

/***/ "./src/mediaTypes.js":
/*!***************************!*\
  !*** ./src/mediaTypes.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADPOD": function() { return /* binding */ ADPOD; },
/* harmony export */   "BANNER": function() { return /* binding */ BANNER; },
/* harmony export */   "NATIVE": function() { return /* binding */ NATIVE; },
/* harmony export */   "VIDEO": function() { return /* binding */ VIDEO; }
/* harmony export */ });
/**
 * This file contains the valid Media Types in Prebid.
 *
 * All adapters are assumed to support banner ads. Other media types are specified by Adapters when they
 * register themselves with prebid-core.
 */

/**
 * @typedef {('native'|'video'|'banner')} MediaType
 * @typedef {('adpod')} VideoContext
 */

/** @type MediaType */
var NATIVE = 'native';
/** @type MediaType */
var VIDEO = 'video';
/** @type MediaType */
var BANNER = 'banner';
/** @type VideoContext */
var ADPOD = 'adpod';

/***/ }),

/***/ "./src/native.js":
/*!***********************!*\
  !*** ./src/native.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NATIVE_TARGETING_KEYS": function() { return /* binding */ NATIVE_TARGETING_KEYS; },
/* harmony export */   "decorateAdUnitsWithNativeParams": function() { return /* binding */ decorateAdUnitsWithNativeParams; },
/* harmony export */   "fireNativeTrackers": function() { return /* binding */ fireNativeTrackers; },
/* harmony export */   "getAllAssetsMessage": function() { return /* binding */ getAllAssetsMessage; },
/* harmony export */   "getAssetMessage": function() { return /* binding */ getAssetMessage; },
/* harmony export */   "getNativeTargeting": function() { return /* binding */ getNativeTargeting; },
/* harmony export */   "nativeAdapters": function() { return /* binding */ nativeAdapters; },
/* harmony export */   "nativeBidIsValid": function() { return /* binding */ nativeBidIsValid; },
/* harmony export */   "toLegacyResponse": function() { return /* binding */ toLegacyResponse; }
/* harmony export */ });
/* unused harmony exports IMAGE, processNativeAdUnitParams, isOpenRTBBidRequestValid, nativeAdUnit, nativeBidder, hasNonNativeBidder, isNativeOpenRTBBidValid, fireImpressionTrackers, fireClickTrackers, toOrtbNativeRequest, fromOrtbNativeRequest, convertOrtbRequestToProprietaryNative, legacyPropertiesToOrtbNative, toOrtbNativeResponse */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mediaTypes.js */ "./src/mediaTypes.js");



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var nativeAdapters = [];
var NATIVE_TARGETING_KEYS = Object.keys(_constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS).map(function (key) {
  return _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS[key];
});
var IMAGE = {
  ortb: {
    ver: '1.2',
    assets: [{
      required: 1,
      id: 1,
      img: {
        type: 3,
        wmin: 100,
        hmin: 100
      }
    }, {
      required: 1,
      id: 2,
      title: {
        len: 140
      }
    }, {
      required: 1,
      id: 3,
      data: {
        type: 1
      }
    }, {
      required: 0,
      id: 4,
      data: {
        type: 2
      }
    }, {
      required: 0,
      id: 5,
      img: {
        type: 1,
        wmin: 20,
        hmin: 20
      }
    }]
  },
  image: {
    required: true
  },
  title: {
    required: true
  },
  sponsoredBy: {
    required: true
  },
  clickUrl: {
    required: true
  },
  body: {
    required: false
  },
  icon: {
    required: false
  }
};
var SUPPORTED_TYPES = {
  image: IMAGE
};
var NATIVE_ASSET_TYPES = _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_ASSET_TYPES,
  NATIVE_IMAGE_TYPES = _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_IMAGE_TYPES,
  PREBID_NATIVE_DATA_KEYS_TO_ORTB = _constants_json__WEBPACK_IMPORTED_MODULE_1__.PREBID_NATIVE_DATA_KEYS_TO_ORTB,
  NATIVE_KEYS_THAT_ARE_NOT_ASSETS = _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS_THAT_ARE_NOT_ASSETS,
  NATIVE_KEYS = _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS;

// inverse native maps useful for converting to legacy
var PREBID_NATIVE_DATA_KEYS_TO_ORTB_INVERSE = inverse(PREBID_NATIVE_DATA_KEYS_TO_ORTB);
var NATIVE_ASSET_TYPES_INVERSE = inverse(NATIVE_ASSET_TYPES);
var TRACKER_METHODS = {
  img: 1,
  js: 2,
  1: 'img',
  2: 'js'
};
var TRACKER_EVENTS = {
  impression: 1,
  'viewable-mrc50': 2,
  'viewable-mrc100': 3,
  'viewable-video50': 4
};

/**
 * Recieves nativeParams from an adUnit. If the params were not of type 'type',
 * passes them on directly. If they were of type 'type', translate
 * them into the predefined specific asset requests for that type of native ad.
 */
function processNativeAdUnitParams(params) {
  if (params && params.type && typeIsSupported(params.type)) {
    params = SUPPORTED_TYPES[params.type];
  }
  if (params && params.ortb && !isOpenRTBBidRequestValid(params.ortb)) {
    return;
  }
  return params;
}
function decorateAdUnitsWithNativeParams(adUnits) {
  adUnits.forEach(function (adUnit) {
    var nativeParams = adUnit.nativeParams || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, 'mediaTypes.native');
    if (nativeParams) {
      adUnit.nativeParams = processNativeAdUnitParams(nativeParams);
    }
    if (adUnit.nativeParams) {
      adUnit.nativeOrtbRequest = adUnit.nativeParams.ortb || toOrtbNativeRequest(adUnit.nativeParams);
    }
  });
}
function isOpenRTBBidRequestValid(ortb) {
  var assets = ortb.assets;
  if (!Array.isArray(assets) || assets.length === 0) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("assets in mediaTypes.native.ortb is not an array, or it's empty. Assets: ", assets);
    return false;
  }

  // validate that ids exist, that they are unique and that they are numbers
  var ids = assets.map(function (asset) {
    return asset.id;
  });
  if (assets.length !== new Set(ids).size || ids.some(function (id) {
    return id !== parseInt(id, 10);
  })) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("each asset object must have 'id' property, it must be unique and it must be an integer");
    return false;
  }
  if (ortb.hasOwnProperty('eventtrackers') && !Array.isArray(ortb.eventtrackers)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)('ortb.eventtrackers is not an array. Eventtrackers: ', ortb.eventtrackers);
    return false;
  }
  return assets.every(function (asset) {
    return isOpenRTBAssetValid(asset);
  });
}
function isOpenRTBAssetValid(asset) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(asset)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("asset must be an object. Provided asset: ", asset);
    return false;
  }
  if (asset.img) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.img.w) && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.img.wmin)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("for img asset there must be 'w' or 'wmin' property");
      return false;
    }
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.img.h) && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.img.hmin)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("for img asset there must be 'h' or 'hmin' property");
      return false;
    }
  } else if (asset.title) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.title.len)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("for title asset there must be 'len' property defined");
      return false;
    }
  } else if (asset.data) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.data.type)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("for data asset 'type' property must be a number");
      return false;
    }
  } else if (asset.video) {
    if (!Array.isArray(asset.video.mimes) || !Array.isArray(asset.video.protocols) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.video.minduration) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNumber)(asset.video.maxduration)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)('video asset is not properly configured');
      return false;
    }
  }
  return true;
}

/**
 * Check if the native type specified in the adUnit is supported by Prebid.
 */
function typeIsSupported(type) {
  if (!(type && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.includes)(Object.keys(SUPPORTED_TYPES), type))) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("".concat(type, " nativeParam is not supported"));
    return false;
  }
  return true;
}

/**
 * Helper functions for working with native-enabled adUnits
 * TODO: abstract this and the video helper functions into general
 * adunit validation helper functions
 */
var nativeAdUnit = function nativeAdUnit(adUnit) {
  var mediaType = adUnit.mediaType === 'native';
  var mediaTypes = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, 'mediaTypes.native');
  return mediaType || mediaTypes;
};
var nativeBidder = function nativeBidder(bid) {
  return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.includes)(nativeAdapters, bid.bidder);
};
var hasNonNativeBidder = function hasNonNativeBidder(adUnit) {
  return adUnit.bids.filter(function (bid) {
    return !nativeBidder(bid);
  }).length;
};

/**
 * Validate that the native assets on this bid contain all assets that were
 * marked as required in the adUnit configuration.
 * @param {Bid} bid Native bid to validate
 * @param {BidRequest[]} bidRequests All bid requests for an auction
 * @return {Boolean} If object is valid
 */
function nativeBidIsValid(bid) {
  var _bid$native;
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$index = _ref.index,
    index = _ref$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.index : _ref$index;
  var adUnit = index.getAdUnit(bid);
  if (!adUnit) {
    return false;
  }
  var ortbRequest = adUnit.nativeOrtbRequest;
  var ortbResponse = ((_bid$native = bid.native) === null || _bid$native === void 0 ? void 0 : _bid$native.ortb) || toOrtbNativeResponse(bid.native, ortbRequest);
  return isNativeOpenRTBBidValid(ortbResponse, ortbRequest);
}
function isNativeOpenRTBBidValid(bidORTB, bidRequestORTB) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(bidORTB, 'link.url')) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("native response doesn't have 'link' property. Ortb response: ", bidORTB);
    return false;
  }
  var requiredAssetIds = bidRequestORTB.assets.filter(function (asset) {
    return asset.required === 1;
  }).map(function (a) {
    return a.id;
  });
  var returnedAssetIds = bidORTB.assets.map(function (asset) {
    return asset.id;
  });
  var match = requiredAssetIds.every(function (assetId) {
    return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_4__.includes)(returnedAssetIds, assetId);
  });
  if (!match) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("didn't receive a bid with all required assets. Required ids: ".concat(requiredAssetIds, ", but received ids in response: ").concat(returnedAssetIds));
  }
  return match;
}

/*
 * Native responses may have associated impression or click trackers.
 * This retrieves the appropriate tracker urls for the given ad object and
 * fires them. As a native creatives may be in a cross-origin frame, it may be
 * necessary to invoke this function via postMessage. secureCreatives is
 * configured to fire this function when it receives a `message` of 'Prebid Native'
 * and an `adId` with the value of the `bid.adId`. When a message is posted with
 * these parameters, impression trackers are fired. To fire click trackers, the
 * message should contain an `action` set to 'click'.
 *
 * // Native creative template example usage
 * <a href="%%CLICK_URL_UNESC%%%%PATTERN:hb_native_linkurl%%"
 *    target="_blank"
 *    onclick="fireTrackers('click')">
 *    %%PATTERN:hb_native_title%%
 * </a>
 *
 * <script>
 *   function fireTrackers(action) {
 *     var message = {message: 'Prebid Native', adId: '%%PATTERN:hb_adid%%'};
 *     if (action === 'click') {message.action = 'click';} // fires click trackers
 *     window.parent.postMessage(JSON.stringify(message), '*');
 *   }
 *   fireTrackers(); // fires impressions when creative is loaded
 * </script>
 */
function fireNativeTrackers(message, bidResponse) {
  var nativeResponse = bidResponse.native.ortb || legacyPropertiesToOrtbNative(bidResponse.native);
  if (message.action === 'click') {
    fireClickTrackers(nativeResponse, message === null || message === void 0 ? void 0 : message.assetId);
  } else {
    fireImpressionTrackers(nativeResponse);
  }
  return message.action;
}
function fireImpressionTrackers(nativeResponse) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$runMarkup = _ref2.runMarkup,
    runMarkup = _ref2$runMarkup === void 0 ? function (mkup) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.insertHtmlIntoIframe)(mkup);
    } : _ref2$runMarkup,
    _ref2$fetchURL = _ref2.fetchURL,
    fetchURL = _ref2$fetchURL === void 0 ? _utils_js__WEBPACK_IMPORTED_MODULE_3__.triggerPixel : _ref2$fetchURL;
  var impTrackers = (nativeResponse.eventtrackers || []).filter(function (tracker) {
    return tracker.event === TRACKER_EVENTS.impression;
  });
  var _impTrackers$reduce = impTrackers.reduce(function (tally, tracker) {
      if (TRACKER_METHODS.hasOwnProperty(tracker.method)) {
        tally[TRACKER_METHODS[tracker.method]].push(tracker.url);
      }
      return tally;
    }, {
      img: [],
      js: []
    }),
    img = _impTrackers$reduce.img,
    js = _impTrackers$reduce.js;
  if (nativeResponse.imptrackers) {
    img = img.concat(nativeResponse.imptrackers);
  }
  img.forEach(function (url) {
    return fetchURL(url);
  });
  js = js.map(function (url) {
    return "<script async src=\"".concat(url, "\"></script>");
  });
  if (nativeResponse.jstracker) {
    // jstracker is already HTML markup
    js = js.concat([nativeResponse.jstracker]);
  }
  if (js.length) {
    runMarkup(js.join('\n'));
  }
}
function fireClickTrackers(nativeResponse) {
  var assetId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref3$fetchURL = _ref3.fetchURL,
    fetchURL = _ref3$fetchURL === void 0 ? _utils_js__WEBPACK_IMPORTED_MODULE_3__.triggerPixel : _ref3$fetchURL;
  // legacy click tracker
  if (!assetId) {
    var _nativeResponse$link;
    (((_nativeResponse$link = nativeResponse.link) === null || _nativeResponse$link === void 0 ? void 0 : _nativeResponse$link.clicktrackers) || []).forEach(function (url) {
      return fetchURL(url);
    });
  } else {
    var _nativeResponse$link2;
    // ortb click tracker. This will try to call the clicktracker associated with the asset;
    // will fallback to the link if none is found.
    var assetIdLinkMap = (nativeResponse.assets || []).filter(function (a) {
      return a.link;
    }).reduce(function (map, asset) {
      map[asset.id] = asset.link;
      return map;
    }, {});
    var masterClickTrackers = ((_nativeResponse$link2 = nativeResponse.link) === null || _nativeResponse$link2 === void 0 ? void 0 : _nativeResponse$link2.clicktrackers) || [];
    var assetLink = assetIdLinkMap[assetId];
    var clickTrackers = masterClickTrackers;
    if (assetLink) {
      clickTrackers = assetLink.clicktrackers || [];
    }
    clickTrackers.forEach(function (url) {
      return fetchURL(url);
    });
  }
}

/**
 * Gets native targeting key-value pairs
 * @param {Object} bid
 * @return {Object} targeting
 */
function getNativeTargeting(bid) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref4$index = _ref4.index,
    index = _ref4$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.index : _ref4$index;
  var keyValues = {};
  var adUnit = index.getAdUnit(bid);
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, 'nativeParams.rendererUrl')) {
    bid['native']['rendererUrl'] = getAssetValue(adUnit.nativeParams['rendererUrl']);
  } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, 'nativeParams.adTemplate')) {
    bid['native']['adTemplate'] = getAssetValue(adUnit.nativeParams['adTemplate']);
  }
  var globalSendTargetingKeys = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, "nativeParams.sendTargetingKeys") !== false;
  var nativeKeys = getNativeKeys(adUnit);
  var flatBidNativeKeys = _objectSpread(_objectSpread({}, bid.native), bid.native.ext);
  delete flatBidNativeKeys.ext;
  Object.keys(flatBidNativeKeys).forEach(function (asset) {
    var key = nativeKeys[asset];
    var value = getAssetValue(bid.native[asset]) || getAssetValue((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(bid, "native.ext.".concat(asset)));
    if (asset === 'adTemplate' || !key || !value) {
      return;
    }
    var sendPlaceholder = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, "nativeParams.".concat(asset, ".sendId"));
    if (typeof sendPlaceholder !== 'boolean') {
      sendPlaceholder = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, "nativeParams.ext.".concat(asset, ".sendId"));
    }
    if (sendPlaceholder) {
      var placeholder = "".concat(key, ":").concat(bid.adId);
      value = placeholder;
    }
    var assetSendTargetingKeys = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, "nativeParams.".concat(asset, ".sendTargetingKeys"));
    if (typeof assetSendTargetingKeys !== 'boolean') {
      assetSendTargetingKeys = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, "nativeParams.ext.".concat(asset, ".sendTargetingKeys"));
    }
    var sendTargeting = typeof assetSendTargetingKeys === 'boolean' ? assetSendTargetingKeys : globalSendTargetingKeys;
    if (sendTargeting) {
      keyValues[key] = value;
    }
  });
  return keyValues;
}
function assetsMessage(data, adObject, keys) {
  var _adUnit$mediaTypes, _adUnit$mediaTypes$na;
  var _ref5 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    _ref5$index = _ref5.index,
    index = _ref5$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.index : _ref5$index;
  var message = {
    message: 'assetResponse',
    adId: data.adId
  };
  var adUnit = index.getAdUnit(adObject);
  var nativeResp = adObject.native;
  if (adObject.native.ortb) {
    message.ortb = adObject.native.ortb;
  } else if ((_adUnit$mediaTypes = adUnit.mediaTypes) !== null && _adUnit$mediaTypes !== void 0 && (_adUnit$mediaTypes$na = _adUnit$mediaTypes.native) !== null && _adUnit$mediaTypes$na !== void 0 && _adUnit$mediaTypes$na.ortb) {
    message.ortb = toOrtbNativeResponse(adObject.native, adUnit.nativeOrtbRequest);
  }
  message.assets = [];
  (keys == null ? Object.keys(nativeResp) : keys).forEach(function (key) {
    if (key === 'adTemplate' && nativeResp[key]) {
      message.adTemplate = getAssetValue(nativeResp[key]);
    } else if (key === 'rendererUrl' && nativeResp[key]) {
      message.rendererUrl = getAssetValue(nativeResp[key]);
    } else if (key === 'ext') {
      Object.keys(nativeResp[key]).forEach(function (extKey) {
        if (nativeResp[key][extKey]) {
          var value = getAssetValue(nativeResp[key][extKey]);
          message.assets.push({
            key: extKey,
            value: value
          });
        }
      });
    } else if (nativeResp[key] && _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS.hasOwnProperty(key)) {
      var value = getAssetValue(nativeResp[key]);
      message.assets.push({
        key: key,
        value: value
      });
    }
  });
  return message;
}

/**
 * Constructs a message object containing asset values for each of the
 * requested data keys.
 */
function getAssetMessage(data, adObject) {
  var keys = data.assets.map(function (k) {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.getKeyByValue)(_constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS, k);
  });
  return assetsMessage(data, adObject, keys);
}
function getAllAssetsMessage(data, adObject) {
  return assetsMessage(data, adObject, null);
}

/**
 * Native assets can be a string or an object with a url prop. Returns the value
 * appropriate for sending in adserver targeting or placeholder replacement.
 */
function getAssetValue(value) {
  return (value === null || value === void 0 ? void 0 : value.url) || value;
}
function getNativeKeys(adUnit) {
  var extraNativeKeys = {};
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"])(adUnit, 'nativeParams.ext')) {
    Object.keys(adUnit.nativeParams.ext).forEach(function (extKey) {
      extraNativeKeys[extKey] = "hb_native_".concat(extKey);
    });
  }
  return _objectSpread(_objectSpread({}, _constants_json__WEBPACK_IMPORTED_MODULE_1__.NATIVE_KEYS), extraNativeKeys);
}

/**
 * converts Prebid legacy native assets request to OpenRTB format
 * @param {object} legacyNativeAssets an object that describes a native bid request in Prebid proprietary format
 * @returns an OpenRTB format of the same bid request
 */
function toOrtbNativeRequest(legacyNativeAssets) {
  if (!legacyNativeAssets && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(legacyNativeAssets)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)('Native assets object is empty or not an object: ', legacyNativeAssets);
    return;
  }
  var ortb = {
    ver: '1.2',
    assets: []
  };
  for (var key in legacyNativeAssets) {
    // skip conversion for non-asset keys
    if (NATIVE_KEYS_THAT_ARE_NOT_ASSETS.includes(key)) continue;
    if (!NATIVE_KEYS.hasOwnProperty(key)) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("Unrecognized native asset code: ".concat(key, ". Asset will be ignored."));
      continue;
    }
    var asset = legacyNativeAssets[key];
    var required = 0;
    if (asset.required && (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isBoolean)(asset.required)) {
      required = Number(asset.required);
    }
    var ortbAsset = {
      id: ortb.assets.length,
      required: required
    };
    // data cases
    if (key in PREBID_NATIVE_DATA_KEYS_TO_ORTB) {
      ortbAsset.data = {
        type: NATIVE_ASSET_TYPES[PREBID_NATIVE_DATA_KEYS_TO_ORTB[key]]
      };
      if (asset.len) {
        ortbAsset.data.len = asset.len;
      }
      // icon or image case
    } else if (key === 'icon' || key === 'image') {
      ortbAsset.img = {
        type: key === 'icon' ? NATIVE_IMAGE_TYPES.ICON : NATIVE_IMAGE_TYPES.MAIN
      };
      // if min_width and min_height are defined in aspect_ratio, they are preferred
      if (asset.aspect_ratios) {
        if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isArray)(asset.aspect_ratios)) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("image.aspect_ratios was passed, but it's not a an array:", asset.aspect_ratios);
        } else if (!asset.aspect_ratios.length) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("image.aspect_ratios was passed, but it's empty:", asset.aspect_ratios);
        } else {
          var _asset$aspect_ratios$ = asset.aspect_ratios[0],
            minWidth = _asset$aspect_ratios$.min_width,
            minHeight = _asset$aspect_ratios$.min_height;
          if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isInteger)(minWidth) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isInteger)(minHeight)) {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)('image.aspect_ratios min_width or min_height are invalid: ', minWidth, minHeight);
          } else {
            ortbAsset.img.wmin = minWidth;
            ortbAsset.img.hmin = minHeight;
          }
          var aspectRatios = asset.aspect_ratios.filter(function (ar) {
            return ar.ratio_width && ar.ratio_height;
          }).map(function (ratio) {
            return "".concat(ratio.ratio_width, ":").concat(ratio.ratio_height);
          });
          if (aspectRatios.length > 0) {
            ortbAsset.img.ext = {
              aspectratios: aspectRatios
            };
          }
        }
      }

      // if asset.sizes exist, by OpenRTB spec we should remove wmin and hmin
      if (asset.sizes) {
        if (asset.sizes.length !== 2 || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isInteger)(asset.sizes[0]) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isInteger)(asset.sizes[1])) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)('image.sizes was passed, but its value is not an array of integers:', asset.sizes);
        } else {
          ortbAsset.img.w = asset.sizes[0];
          ortbAsset.img.h = asset.sizes[1];
          delete ortbAsset.img.hmin;
          delete ortbAsset.img.wmin;
        }
      }
      // title case
    } else if (key === 'title') {
      ortbAsset.title = {
        // in openRTB, len is required for titles, while in legacy prebid was not.
        // for this reason, if len is missing in legacy prebid, we're adding a default value of 140.
        len: asset.len || 140
      };
      // all extensions to the native bid request are passed as is
    } else if (key === 'ext') {
      ortbAsset.ext = asset;
      // in `ext` case, required field is not needed
      delete ortbAsset.required;
    }
    ortb.assets.push(ortbAsset);
  }
  return ortb;
}

/**
 * Greatest common divisor between two positive integers
 * https://en.wikipedia.org/wiki/Euclidean_algorithm
 */
function gcd(a, b) {
  while (a && b && a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a || b;
}

/**
 * This function converts an OpenRTB native request object to Prebid proprietary
 * format. The purpose of this function is to help adapters to handle the
 * transition phase where publishers may be using OpenRTB objects but the
 *  bidder does not yet support it.
 * @param {object} openRTBRequest an OpenRTB v1.2 request object
 * @returns a Prebid legacy native format request
 */
function fromOrtbNativeRequest(openRTBRequest) {
  if (!isOpenRTBBidRequestValid(openRTBRequest)) {
    return;
  }
  var oldNativeObject = {};
  var _iterator = _createForOfIteratorHelper(openRTBRequest.assets),
    _step;
  try {
    var _loop = function _loop() {
      var asset = _step.value;
      if (asset.title) {
        var title = {
          required: asset.required ? Boolean(asset.required) : false,
          len: asset.title.len
        };
        oldNativeObject.title = title;
      } else if (asset.img) {
        var image = {
          required: asset.required ? Boolean(asset.required) : false
        };
        if (asset.img.w && asset.img.h) {
          image.sizes = [asset.img.w, asset.img.h];
        } else if (asset.img.wmin && asset.img.hmin) {
          var scale = gcd(asset.img.wmin, asset.img.hmin);
          image.aspect_ratios = [{
            min_width: asset.img.wmin,
            min_height: asset.img.hmin,
            ratio_width: asset.img.wmin / scale,
            ratio_height: asset.img.hmin / scale
          }];
        }
        if (asset.img.type === NATIVE_IMAGE_TYPES.MAIN) {
          oldNativeObject.image = image;
        } else {
          oldNativeObject.icon = image;
        }
      } else if (asset.data) {
        var assetType = Object.keys(NATIVE_ASSET_TYPES).find(function (k) {
          return NATIVE_ASSET_TYPES[k] === asset.data.type;
        });
        var prebidAssetName = Object.keys(PREBID_NATIVE_DATA_KEYS_TO_ORTB).find(function (k) {
          return PREBID_NATIVE_DATA_KEYS_TO_ORTB[k] === assetType;
        });
        oldNativeObject[prebidAssetName] = {
          required: asset.required ? Boolean(asset.required) : false
        };
        if (asset.data.len) {
          oldNativeObject[prebidAssetName].len = asset.data.len;
        }
      }
      // video was not supported by old prebid assets
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return oldNativeObject;
}

/**
 * Converts an OpenRTB request to a proprietary Prebid.js format.
 * The proprietary Prebid format has many limitations and will be dropped in
 * the future; adapters are encouraged to stop using it in favour of OpenRTB format.
 * IMPLEMENTATION DETAILS: This function returns the same exact object if no
 * conversion is needed. If a conversion is needed (meaning, at least one
 * bidRequest contains a native.ortb definition), it will return a copy.
 *
 * @param {BidRequest[]} bidRequests an array of valid bid requests
 * @returns an array of valid bid requests where the openRTB bids are converted to proprietary format.
 */
function convertOrtbRequestToProprietaryNative(bidRequests) {
  if (true) {
    if (!bidRequests || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isArray)(bidRequests)) return bidRequests;
    // check if a conversion is needed
    if (!bidRequests.some(function (bidRequest) {
      var _NATIVE;
      return (_NATIVE = ((bidRequest === null || bidRequest === void 0 ? void 0 : bidRequest.mediaTypes) || {})[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE]) === null || _NATIVE === void 0 ? void 0 : _NATIVE.ortb;
    })) {
      return bidRequests;
    }
    var bidRequestsCopy = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.deepClone)(bidRequests);
    // convert Native ORTB definition to old-style prebid native definition
    var _iterator2 = _createForOfIteratorHelper(bidRequestsCopy),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var bidRequest = _step2.value;
        if (bidRequest.mediaTypes && bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE] && bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE].ortb) {
          bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE] = Object.assign((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.pick)(bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE], NATIVE_KEYS_THAT_ARE_NOT_ASSETS), fromOrtbNativeRequest(bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE].ortb));
          bidRequest.nativeParams = processNativeAdUnitParams(bidRequest.mediaTypes[_mediaTypes_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE]);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return bidRequestsCopy;
  }
  return bidRequests;
}

/**
 * convert PBJS proprietary native properties that are *not* assets to the ORTB native format.
 *
 * @param legacyNative `bidResponse.native` object as returned by adapters
 */
function legacyPropertiesToOrtbNative(legacyNative) {
  var response = {
    link: {},
    eventtrackers: []
  };
  Object.entries(legacyNative).forEach(function (_ref6) {
    var _ref7 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref6, 2),
      key = _ref7[0],
      value = _ref7[1];
    switch (key) {
      case 'clickUrl':
        response.link.url = value;
        break;
      case 'clickTrackers':
        response.link.clicktrackers = Array.isArray(value) ? value : [value];
        break;
      case 'impressionTrackers':
        (Array.isArray(value) ? value : [value]).forEach(function (url) {
          response.eventtrackers.push({
            event: TRACKER_EVENTS.impression,
            method: TRACKER_METHODS.img,
            url: url
          });
        });
        break;
      case 'javascriptTrackers':
        // jstracker is deprecated, but we need to use it here since 'javascriptTrackers' is markup, not an url
        // TODO: at the time of writing this, core expected javascriptTrackers to be a string (despite the name),
        // but many adapters are passing an array. It's possible that some of them are, in fact, passing URLs and not markup
        // in general, native trackers seem to be neglected and/or broken
        response.jstracker = Array.isArray(value) ? value.join('') : value;
        break;
    }
  });
  return response;
}
function toOrtbNativeResponse(legacyResponse, ortbRequest) {
  var ortbResponse = _objectSpread(_objectSpread({}, legacyPropertiesToOrtbNative(legacyResponse)), {}, {
    assets: []
  });
  function useRequestAsset(predicate, fn) {
    var asset = ortbRequest.assets.find(predicate);
    if (asset != null) {
      asset = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.deepClone)(asset);
      fn(asset);
      ortbResponse.assets.push(asset);
    }
  }
  Object.keys(legacyResponse).filter(function (key) {
    return !!legacyResponse[key];
  }).forEach(function (key) {
    var value = getAssetValue(legacyResponse[key]);
    switch (key) {
      // process titles
      case 'title':
        useRequestAsset(function (asset) {
          return asset.title != null;
        }, function (titleAsset) {
          titleAsset.title = {
            text: value
          };
        });
        break;
      case 'image':
      case 'icon':
        var imageType = key === 'image' ? NATIVE_IMAGE_TYPES.MAIN : NATIVE_IMAGE_TYPES.ICON;
        useRequestAsset(function (asset) {
          return asset.img != null && asset.img.type === imageType;
        }, function (imageAsset) {
          imageAsset.img = {
            url: value
          };
        });
        break;
      default:
        if (key in PREBID_NATIVE_DATA_KEYS_TO_ORTB) {
          useRequestAsset(function (asset) {
            return asset.data != null && asset.data.type === NATIVE_ASSET_TYPES[PREBID_NATIVE_DATA_KEYS_TO_ORTB[key]];
          }, function (dataAsset) {
            dataAsset.data = {
              value: value
            };
          });
        }
        break;
    }
  });
  return ortbResponse;
}

/**
 * Generates a legacy response from an ortb response. Useful during the transition period.
 * @param {*} ortbResponse a standard ortb response object
 * @param {*} ortbRequest the ortb request, useful to match ids.
 * @returns an object containing the response in legacy native format: { title: "this is a title", image: ... }
 */
function toLegacyResponse(ortbResponse, ortbRequest) {
  var legacyResponse = {};
  var requestAssets = (ortbRequest === null || ortbRequest === void 0 ? void 0 : ortbRequest.assets) || [];
  legacyResponse.clickUrl = ortbResponse.link.url;
  legacyResponse.privacyLink = ortbResponse.privacy;
  var _iterator3 = _createForOfIteratorHelper((ortbResponse === null || ortbResponse === void 0 ? void 0 : ortbResponse.assets) || []),
    _step3;
  try {
    var _loop2 = function _loop2() {
      var asset = _step3.value;
      var requestAsset = requestAssets.find(function (reqAsset) {
        return asset.id === reqAsset.id;
      });
      if (asset.title) {
        legacyResponse.title = asset.title.text;
      } else if (asset.img) {
        legacyResponse[requestAsset.img.type === NATIVE_IMAGE_TYPES.MAIN ? 'image' : 'icon'] = {
          url: asset.img.url,
          width: asset.img.w,
          height: asset.img.h
        };
      } else if (asset.data) {
        legacyResponse[PREBID_NATIVE_DATA_KEYS_TO_ORTB_INVERSE[NATIVE_ASSET_TYPES_INVERSE[requestAsset.data.type]]] = asset.data.value;
      }
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop2();
    }

    // Handle trackers
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  legacyResponse.impressionTrackers = [];
  var jsTrackers = [];
  if (ortbRequest !== null && ortbRequest !== void 0 && ortbRequest.imptrackers) {
    var _legacyResponse$impre;
    (_legacyResponse$impre = legacyResponse.impressionTrackers).push.apply(_legacyResponse$impre, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__["default"])(ortbRequest.imptrackers));
  }
  var _iterator4 = _createForOfIteratorHelper((ortbResponse === null || ortbResponse === void 0 ? void 0 : ortbResponse.eventtrackers) || []),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var eventTracker = _step4.value;
      if (eventTracker.event === TRACKER_EVENTS.impression && eventTracker.method === TRACKER_METHODS.img) {
        legacyResponse.impressionTrackers.push(eventTracker.url);
      }
      if (eventTracker.event === TRACKER_EVENTS.impression && eventTracker.method === TRACKER_METHODS.js) {
        jsTrackers.push(eventTracker.url);
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  jsTrackers = jsTrackers.map(function (url) {
    return "<script async src=\"".concat(url, "\"></script>");
  });
  if (ortbResponse !== null && ortbResponse !== void 0 && ortbResponse.jstracker) {
    jsTrackers.push(ortbResponse.jstracker);
  }
  if (jsTrackers.length) {
    legacyResponse.javascriptTrackers = jsTrackers.join('\n');
  }
  return legacyResponse;
}

/**
 * Inverts key-values of an object.
 */
function inverse(obj) {
  var retobj = {};
  for (var key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}

/***/ }),

/***/ "./src/polyfill.js":
/*!*************************!*\
  !*** ./src/polyfill.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayFrom": function() { return /* binding */ arrayFrom; },
/* harmony export */   "find": function() { return /* binding */ find; },
/* harmony export */   "includes": function() { return /* binding */ includes; }
/* harmony export */ });
/* unused harmony export findIndex */
// These stubs are here to help transition away from core-js polyfills for browsers we are no longer supporting.
// You should not need these for new code; use stock JS instead!

function includes(target, elem, start) {
  return target && target.includes(elem, start) || false;
}
function arrayFrom() {
  return Array.from.apply(Array, arguments);
}
function find(arr, pred, thisArg) {
  return arr && arr.find(pred, thisArg);
}
function findIndex(arr, pred, thisArg) {
  return arr && arr.findIndex(pred, thisArg);
}

/***/ }),

/***/ "./src/prebidGlobal.js":
/*!*****************************!*\
  !*** ./src/prebidGlobal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGlobal": function() { return /* binding */ getGlobal; },
/* harmony export */   "registerModule": function() { return /* binding */ registerModule; }
/* harmony export */ });
// if $$PREBID_GLOBAL$$ already exists in global document scope, use it, if not, create the object
// global defination should happen BEFORE imports to avoid global undefined errors.
/* eslint-disable */
if (window.owpbjs) {
  var _window, _window$PWT;
  console.warn("Namespace clash happened, with name: ".concat("window.owpbjs", " and existing PWT version details: ", JSON.stringify((_window = window) === null || _window === void 0 ? void 0 : (_window$PWT = _window.PWT) === null || _window$PWT === void 0 ? void 0 : _window$PWT.versionDetails)));
}
/* eslint-disable */

/* global $$DEFINE_PREBID_GLOBAL$$ */
var scope =  false ? 0 : window;
var global = scope.owpbjs = scope.owpbjs || {};
global.cmd = global.cmd || [];
global.que = global.que || [];

// create a pbjs global pointer
if (scope === window) {
  scope._pbjsGlobals = scope._pbjsGlobals || [];
  scope._pbjsGlobals.push("owpbjs");
}
function getGlobal() {
  return global;
}
function registerModule(name) {
  global.installedModules.push(name);
}

/***/ }),

/***/ "./src/refererDetection.js":
/*!*********************************!*\
  !*** ./src/refererDetection.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRefererInfo": function() { return /* binding */ getRefererInfo; },
/* harmony export */   "parseDomain": function() { return /* binding */ parseDomain; }
/* harmony export */ });
/* unused harmony exports ensureProtocol, detectReferer, cacheWithLocation */
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/**
 * The referer detection module attempts to gather referer information from the current page that prebid.js resides in.
 * The information that it tries to collect includes:
 * The detected top url in the nav bar,
 * Whether it was able to reach the top most window (if for example it was embedded in several iframes),
 * The number of iframes it was embedded in if applicable (by default max ten iframes),
 * A list of the domains of each embedded window if applicable.
 * Canonical URL which refers to an HTML link element, with the attribute of rel="canonical", found in the <head> element of your webpage
 */




/**
 * Prepend a URL with the page's protocol (http/https), if necessary.
 */
function ensureProtocol(url) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  if (!url) return url;
  if (/\w+:\/\//.exec(url)) {
    // url already has protocol
    return url;
  }
  var windowProto = win.location.protocol;
  try {
    windowProto = win.top.location.protocol;
  } catch (e) {}
  if (/^\/\//.exec(url)) {
    // url uses relative protocol ("//example.com")
    return windowProto + url;
  } else {
    return "".concat(windowProto, "//").concat(url);
  }
}

/**
 * Extract the domain portion from a URL.
 * @param url
 * @param noLeadingWww: if true, remove 'www.' appearing at the beginning of the domain.
 * @param noPort: if true, do not include the ':[port]' portion
 */
function parseDomain(url) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$noLeadingWww = _ref.noLeadingWww,
    noLeadingWww = _ref$noLeadingWww === void 0 ? false : _ref$noLeadingWww,
    _ref$noPort = _ref.noPort,
    noPort = _ref$noPort === void 0 ? false : _ref$noPort;
  try {
    url = new URL(ensureProtocol(url));
  } catch (e) {
    return;
  }
  url = noPort ? url.hostname : url.host;
  if (noLeadingWww && url.startsWith('www.')) {
    url = url.substring(4);
  }
  return url;
}

/**
 * This function returns canonical URL which refers to an HTML link element, with the attribute of rel="canonical", found in the <head> element of your webpage
 *
 * @param {Object} doc document
 * @returns {string|null}
 */
function getCanonicalUrl(doc) {
  try {
    var element = doc.querySelector("link[rel='canonical']");
    if (element !== null) {
      return element.href;
    }
  } catch (e) {
    // Ignore error
  }
  return null;
}

/**
 * @param {Window} win Window
 * @returns {Function}
 */
function detectReferer(win) {
  /**
   * This function would return a read-only array of hostnames for all the parent frames.
   * win.location.ancestorOrigins is only supported in webkit browsers. For non-webkit browsers it will return undefined.
   *
   * @param {Window} win Window object
   * @returns {(undefined|Array)} Ancestor origins or undefined
   */
  function getAncestorOrigins(win) {
    try {
      if (!win.location.ancestorOrigins) {
        return;
      }
      return win.location.ancestorOrigins;
    } catch (e) {
      // Ignore error
    }
  }

  // TODO: the meaning of "reachedTop" seems to be intentionally ambiguous - best to leave them out of
  // the typedef for now. (for example, unit tests enforce that "reachedTop" should be false in some situations where we
  // happily provide a location for the top).

  /**
   * @typedef {Object} refererInfo
   * @property {string|null} location the browser's location, or null if not available (due to cross-origin restrictions)
   * @property {string|null} canonicalUrl the site's canonical URL as set by the publisher, through setConfig({pageUrl}) or <link rel="canonical" />
   * @property {string|null} page the best candidate for the current page URL: `canonicalUrl`, falling back to `location`
   * @property {string|null} domain the domain portion of `page`
   * @property {string|null} ref the referrer (document.referrer) to the current page, or null if not available (due to cross-origin restrictions)
   * @property {string} topmostLocation of the top-most frame for which we could guess the location. Outside of cross-origin scenarios, this is equivalent to `location`.
   * @property {number} numIframes number of steps between window.self and window.top
   * @property {Array[string|null]} stack our best guess at the location for each frame, in the direction top -> self.
   */

  /**
   * Walk up the windows to get the origin stack and best available referrer, canonical URL, etc.
   *
   * @returns {refererInfo}
   */
  function refererInfo() {
    var stack = [];
    var ancestors = getAncestorOrigins(win);
    var maxNestedIframes = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('maxNestedIframes');
    var currentWindow;
    var bestLocation;
    var bestCanonicalUrl;
    var reachedTop = false;
    var level = 0;
    var valuesFromAmp = false;
    var inAmpFrame = false;
    var hasTopLocation = false;
    do {
      var previousWindow = currentWindow;
      var wasInAmpFrame = inAmpFrame;
      var currentLocation = void 0;
      var crossOrigin = false;
      var foundLocation = null;
      inAmpFrame = false;
      currentWindow = currentWindow ? currentWindow.parent : win;
      try {
        currentLocation = currentWindow.location.href || null;
      } catch (e) {
        crossOrigin = true;
      }
      if (crossOrigin) {
        if (wasInAmpFrame) {
          var context = previousWindow.context;
          try {
            foundLocation = context.sourceUrl;
            bestLocation = foundLocation;
            hasTopLocation = true;
            valuesFromAmp = true;
            if (currentWindow === win.top) {
              reachedTop = true;
            }
            if (context.canonicalUrl) {
              bestCanonicalUrl = context.canonicalUrl;
            }
          } catch (e) {/* Do nothing */}
        } else {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('Trying to access cross domain iframe. Continuing without referrer and location');
          try {
            // the referrer to an iframe is the parent window
            var referrer = previousWindow.document.referrer;
            if (referrer) {
              foundLocation = referrer;
              if (currentWindow === win.top) {
                reachedTop = true;
              }
            }
          } catch (e) {/* Do nothing */}
          if (!foundLocation && ancestors && ancestors[level - 1]) {
            foundLocation = ancestors[level - 1];
            if (currentWindow === win.top) {
              hasTopLocation = true;
            }
          }
          if (foundLocation && !valuesFromAmp) {
            bestLocation = foundLocation;
          }
        }
      } else {
        if (currentLocation) {
          foundLocation = currentLocation;
          bestLocation = foundLocation;
          valuesFromAmp = false;
          if (currentWindow === win.top) {
            reachedTop = true;
            var _canonicalUrl = getCanonicalUrl(currentWindow.document);
            if (_canonicalUrl) {
              bestCanonicalUrl = _canonicalUrl;
            }
          }
        }
        if (currentWindow.context && currentWindow.context.sourceUrl) {
          inAmpFrame = true;
        }
      }
      stack.push(foundLocation);
      level++;
    } while (currentWindow !== win.top && level < maxNestedIframes);
    stack.reverse();
    var ref;
    try {
      ref = win.top.document.referrer;
    } catch (e) {}
    var location = reachedTop || hasTopLocation ? bestLocation : null;
    var canonicalUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('pageUrl') || bestCanonicalUrl || null;
    var page = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('pageUrl') || location || ensureProtocol(canonicalUrl, win);
    if (location && location.indexOf('?') > -1 && page.indexOf('?') === -1) {
      page = "".concat(page).concat(location.substring(location.indexOf('?')));
    }
    return {
      reachedTop: reachedTop,
      isAmp: valuesFromAmp,
      numIframes: level - 1,
      stack: stack,
      topmostLocation: bestLocation || null,
      location: location,
      canonicalUrl: canonicalUrl,
      page: page,
      domain: parseDomain(page) || null,
      ref: ref || null,
      // TODO: the "legacy" refererInfo object is provided here, for now, to accomodate
      // adapters that decided to just send it verbatim to their backend.
      legacy: {
        reachedTop: reachedTop,
        isAmp: valuesFromAmp,
        numIframes: level - 1,
        stack: stack,
        referer: bestLocation || null,
        canonicalUrl: canonicalUrl
      }
    };
  }
  return refererInfo;
}

// cache result of fn (= referer info) as long as:
// - we are the top window
// - canonical URL tag and window location have not changed
function cacheWithLocation(fn) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  if (win.top !== win) return fn;
  var canonical, href, value;
  return function () {
    var newCanonical = getCanonicalUrl(win.document);
    var newHref = win.location.href;
    if (canonical !== newCanonical || newHref !== href) {
      canonical = newCanonical;
      href = newHref;
      value = fn();
    }
    return value;
  };
}

/**
 * @type {function(): refererInfo}
 */
var getRefererInfo = cacheWithLocation(detectReferer(window));

/***/ }),

/***/ "./src/secureCreatives.js":
/*!********************************!*\
  !*** ./src/secureCreatives.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listenMessagesFromCreative": function() { return /* binding */ listenMessagesFromCreative; }
/* harmony export */ });
/* unused harmony exports getReplier, receiveMessage, _sendAdToCreative */
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./native.js */ "./src/native.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _Renderer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Renderer.js */ "./src/Renderer.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _adRendering_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./adRendering.js */ "./src/adRendering.js");
/* Secure Creatives
  Provides support for rendering creatives into cross domain iframes such as SafeFrame to prevent
   access to a publisher page from creative payloads.
 */










var BID_WON = _constants_json__WEBPACK_IMPORTED_MODULE_0__.EVENTS.BID_WON;
var STALE_RENDER = _constants_json__WEBPACK_IMPORTED_MODULE_0__.EVENTS.STALE_RENDER;
var WON_AD_IDS = new WeakSet();
var HANDLER_MAP = {
  'Prebid Request': handleRenderRequest,
  'Prebid Event': handleEventRequest
};
if (true) {
  Object.assign(HANDLER_MAP, {
    'Prebid Native': handleNativeRequest
  });
}
function listenMessagesFromCreative() {
  window.addEventListener('message', receiveMessage, false);
}
function getReplier(ev) {
  if (ev.origin == null && ev.ports.length === 0) {
    return function () {
      var msg = 'Cannot post message to a frame with null origin. Please update creatives to use MessageChannel, see https://github.com/prebid/Prebid.js/issues/7870';
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(msg);
      throw new Error(msg);
    };
  } else if (ev.ports.length > 0) {
    return function (message) {
      ev.ports[0].postMessage(JSON.stringify(message));
    };
  } else {
    return function (message) {
      ev.source.postMessage(JSON.stringify(message), ev.origin);
    };
  }
}
function receiveMessage(ev) {
  var key = ev.message ? 'message' : 'data';
  var data = {};
  try {
    data = JSON.parse(ev[key]);
  } catch (e) {
    return;
  }
  if (data && data.adId && data.message) {
    var adObject = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.find)(_auctionManager_js__WEBPACK_IMPORTED_MODULE_3__.auctionManager.getBidsReceived(), function (bid) {
      return bid.adId === data.adId;
    });
    if (HANDLER_MAP.hasOwnProperty(data.message)) {
      HANDLER_MAP[data.message](getReplier(ev), data, adObject);
    }
  }
}
function handleRenderRequest(reply, data, adObject) {
  if (adObject == null) {
    (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_4__.emitAdRenderFail)({
      reason: _constants_json__WEBPACK_IMPORTED_MODULE_0__.AD_RENDER_FAILED_REASON.CANNOT_FIND_AD,
      message: "Cannot find ad for cross-origin render request: '".concat(data.adId, "'"),
      id: data.adId
    });
    return;
  }
  if (adObject.status === _constants_json__WEBPACK_IMPORTED_MODULE_0__.BID_STATUS.RENDERED) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Ad id ".concat(adObject.adId, " has been rendered before"));
    _events_js__WEBPACK_IMPORTED_MODULE_5__.emit(STALE_RENDER, adObject);
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('auctionOptions'), 'suppressStaleRender')) {
      return;
    }
  }
  try {
    _sendAdToCreative(adObject, reply);
  } catch (e) {
    (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_4__.emitAdRenderFail)({
      reason: _constants_json__WEBPACK_IMPORTED_MODULE_0__.AD_RENDER_FAILED_REASON.EXCEPTION,
      message: e.message,
      id: data.adId,
      bid: adObject
    });
    return;
  }

  // save winning bids
  _auctionManager_js__WEBPACK_IMPORTED_MODULE_3__.auctionManager.addWinningBid(adObject);
  _events_js__WEBPACK_IMPORTED_MODULE_5__.emit(BID_WON, adObject);
}
function handleNativeRequest(reply, data, adObject) {
  // handle this script from native template in an ad server
  // window.parent.postMessage(JSON.stringify({
  //   message: 'Prebid Native',
  //   adId: '%%PATTERN:hb_adid%%'
  // }), '*');
  if (adObject == null) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("Cannot find ad for x-origin event request: '".concat(data.adId, "'"));
    return;
  }
  if (!WON_AD_IDS.has(adObject)) {
    WON_AD_IDS.add(adObject);
    _auctionManager_js__WEBPACK_IMPORTED_MODULE_3__.auctionManager.addWinningBid(adObject);
    _events_js__WEBPACK_IMPORTED_MODULE_5__.emit(BID_WON, adObject);
  }
  switch (data.action) {
    case 'assetRequest':
      reply((0,_native_js__WEBPACK_IMPORTED_MODULE_8__.getAssetMessage)(data, adObject));
      break;
    case 'allAssetRequest':
      reply((0,_native_js__WEBPACK_IMPORTED_MODULE_8__.getAllAssetsMessage)(data, adObject));
      break;
    case 'resizeNativeHeight':
      adObject.height = data.height;
      adObject.width = data.width;
      resizeRemoteCreative(adObject);
      break;
    default:
      (0,_native_js__WEBPACK_IMPORTED_MODULE_8__.fireNativeTrackers)(data, adObject);
  }
}
function handleEventRequest(reply, data, adObject) {
  if (adObject == null) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("Cannot find ad '".concat(data.adId, "' for x-origin event request"));
    return;
  }
  if (adObject.status !== _constants_json__WEBPACK_IMPORTED_MODULE_0__.BID_STATUS.RENDERED) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Received x-origin event request without corresponding render request for ad '".concat(data.adId, "'"));
    return;
  }
  switch (data.event) {
    case _constants_json__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AD_RENDER_FAILED:
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_4__.emitAdRenderFail)({
        bid: adObject,
        id: data.adId,
        reason: data.info.reason,
        message: data.info.message
      });
      break;
    case _constants_json__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AD_RENDER_SUCCEEDED:
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_4__.emitAdRenderSucceeded)({
        doc: null,
        bid: adObject,
        id: data.adId
      });
      break;
    default:
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("Received x-origin event request for unsupported event: '".concat(data.event, "' (adId: '").concat(data.adId, "')"));
  }
}
function _sendAdToCreative(adObject, reply) {
  var adId = adObject.adId,
    ad = adObject.ad,
    adUrl = adObject.adUrl,
    width = adObject.width,
    height = adObject.height,
    renderer = adObject.renderer,
    cpm = adObject.cpm,
    originalCpm = adObject.originalCpm;
  // rendering for outstream safeframe
  if ((0,_Renderer_js__WEBPACK_IMPORTED_MODULE_9__.isRendererRequired)(renderer)) {
    (0,_Renderer_js__WEBPACK_IMPORTED_MODULE_9__.executeRenderer)(renderer, adObject);
  } else if (adId) {
    resizeRemoteCreative(adObject);
    reply({
      message: 'Prebid Response',
      ad: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceAuctionPrice)(ad, originalCpm || cpm),
      adUrl: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceAuctionPrice)(adUrl, originalCpm || cpm),
      adId: adId,
      width: width,
      height: height
    });
  }
}
function resizeRemoteCreative(_ref) {
  var adId = _ref.adId,
    adUnitCode = _ref.adUnitCode,
    width = _ref.width,
    height = _ref.height;
  // resize both container div + iframe
  ['div', 'iframe'].forEach(function (elmType) {
    // not select element that gets removed after dfp render
    var element = getElementByAdUnit(elmType + ':not([style*="display: none"])');
    if (element) {
      var elementStyle = element.style;
      elementStyle.width = width ? width + 'px' : '100%';
      elementStyle.height = height + 'px';
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Unable to locate matching page element for adUnitCode ".concat(adUnitCode, ".  Can't resize it to ad's dimensions.  Please review setup."));
    }
  });
  function getElementByAdUnit(elmType) {
    var id = getElementIdBasedOnAdServer(adId, adUnitCode);
    var parentDivEle = document.getElementById(id);
    return parentDivEle && parentDivEle.querySelector(elmType);
  }
  function getElementIdBasedOnAdServer(adId, adUnitCode) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isGptPubadsDefined)()) {
      return getDfpElementId(adId);
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isApnGetTagDefined)()) {
      return getAstElementId(adUnitCode);
    } else {
      return adUnitCode;
    }
  }
  function getDfpElementId(adId) {
    var slot = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.find)(window.googletag.pubads().getSlots(), function (slot) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.find)(slot.getTargetingKeys(), function (key) {
        return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.includes)(slot.getTargeting(key), adId);
      });
    });
    return slot ? slot.getSlotElementId() : null;
  }
  function getAstElementId(adUnitCode) {
    var astTag = window.apntag.getTag(adUnitCode);
    return astTag && astTag.targetId;
  }
}

/***/ }),

/***/ "./src/storageManager.js":
/*!*******************************!*\
  !*** ./src/storageManager.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORAGE_TYPE_COOKIES": function() { return /* binding */ STORAGE_TYPE_COOKIES; },
/* harmony export */   "STORAGE_TYPE_LOCALSTORAGE": function() { return /* binding */ STORAGE_TYPE_LOCALSTORAGE; },
/* harmony export */   "getCoreStorageManager": function() { return /* binding */ getCoreStorageManager; },
/* harmony export */   "getStorageManager": function() { return /* binding */ getStorageManager; },
/* harmony export */   "storageCallbacks": function() { return /* binding */ storageCallbacks; }
/* harmony export */ });
/* unused harmony exports newStorageManager, deviceAccessRule, storageAllowedRule, resetData */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _bidderSettings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _activities_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _activities_params_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./activities/params.js */ "./src/activities/params.js");
/* harmony import */ var _activities_activities_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./activities/activities.js */ "./src/activities/activities.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _activities_activityParams_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activities/activityParams.js */ "./src/activities/activityParams.js");










var STORAGE_TYPE_LOCALSTORAGE = 'html5';
var STORAGE_TYPE_COOKIES = 'cookie';
var storageCallbacks = [];

/*
 *  Storage manager constructor. Consumers should prefer one of `getStorageManager` or `getCoreStorageManager`.
 */
function newStorageManager() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    moduleName = _ref.moduleName,
    moduleType = _ref.moduleType;
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$isAllowed = _ref2.isAllowed,
    isAllowed = _ref2$isAllowed === void 0 ? _activities_rules_js__WEBPACK_IMPORTED_MODULE_0__.isActivityAllowed : _ref2$isAllowed;
  function isValid(cb, storageType) {
    var mod = moduleName;
    var curBidder = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.getCurrentBidder();
    if (curBidder && moduleType === _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_BIDDER && _adapterManager_js__WEBPACK_IMPORTED_MODULE_3__["default"].aliasRegistry[curBidder] === moduleName) {
      mod = curBidder;
    }
    var result = {
      valid: isAllowed(_activities_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_ACCESS_DEVICE, (0,_activities_activityParams_js__WEBPACK_IMPORTED_MODULE_5__.activityParams)(moduleType, mod, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, _activities_params_js__WEBPACK_IMPORTED_MODULE_7__.ACTIVITY_PARAM_STORAGE_TYPE, storageType)))
    };
    return cb(result);
  }
  function schedule(operation, storageType, done) {
    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(operation, storageType);
        done(result);
      });
    } else {
      return isValid(operation, storageType);
    }
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {string} [expires='']
   * @param {string} [sameSite='/']
   * @param {string} [domain] domain (e.g., 'example.com' or 'subdomain.example.com').
   * If not specified, defaults to the host portion of the current document location.
   * If a domain is specified, subdomains are always included.
   * Domain must match the domain of the JavaScript origin. Setting cookies to foreign domains will be silently ignored.
   */
  var setCookie = function setCookie(key, value, expires, sameSite, domain, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var domainPortion = domain && domain !== '' ? " ;domain=".concat(encodeURIComponent(domain)) : '';
        var expiresPortion = expires && expires !== '' ? " ;expires=".concat(expires) : '';
        var isNone = sameSite != null && sameSite.toLowerCase() == 'none';
        var secure = isNone ? '; Secure' : '';
        document.cookie = "".concat(key, "=").concat(encodeURIComponent(value)).concat(expiresPortion, "; path=/").concat(domainPortion).concat(sameSite ? "; SameSite=".concat(sameSite) : '').concat(secure);
      }
    };
    return schedule(cb, STORAGE_TYPE_COOKIES, done);
  };

  /**
   * @param {string} name
   * @returns {(string|null)}
   */
  var getCookie = function getCookie(name, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var m = window.document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)\\s*(;|$)');
        return m ? decodeURIComponent(m[2]) : null;
      }
      return null;
    };
    return schedule(cb, STORAGE_TYPE_COOKIES, done);
  };

  /**
   * @returns {boolean}
   */
  var localStorageIsEnabled = function localStorageIsEnabled(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        try {
          localStorage.setItem('prebid.cookieTest', '1');
          return localStorage.getItem('prebid.cookieTest') === '1';
        } catch (error) {} finally {
          try {
            localStorage.removeItem('prebid.cookieTest');
          } catch (error) {}
        }
      }
      return false;
    };
    return schedule(cb, STORAGE_TYPE_LOCALSTORAGE, done);
  };

  /**
   * @returns {boolean}
   */
  var cookiesAreEnabled = function cookiesAreEnabled(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.checkCookieSupport)();
      }
      return false;
    };
    return schedule(cb, STORAGE_TYPE_COOKIES, done);
  };

  /**
   * @param {string} key
   * @param {string} value
   */
  var setDataInLocalStorage = function setDataInLocalStorage(key, value, done) {
    var cb = function cb(result) {
      if (result && result.valid && hasLocalStorage()) {
        window.localStorage.setItem(key, value);
      }
    };
    return schedule(cb, STORAGE_TYPE_LOCALSTORAGE, done);
  };

  /**
   * @param {string} key
   * @returns {(string|null)}
   */
  var getDataFromLocalStorage = function getDataFromLocalStorage(key, done) {
    var cb = function cb(result) {
      if (result && result.valid && hasLocalStorage()) {
        return window.localStorage.getItem(key);
      }
      return null;
    };
    return schedule(cb, STORAGE_TYPE_LOCALSTORAGE, done);
  };

  /**
   * @param {string} key
   */
  var removeDataFromLocalStorage = function removeDataFromLocalStorage(key, done) {
    var cb = function cb(result) {
      if (result && result.valid && hasLocalStorage()) {
        window.localStorage.removeItem(key);
      }
    };
    return schedule(cb, STORAGE_TYPE_LOCALSTORAGE, done);
  };

  /**
   * @returns {boolean}
   */
  var hasLocalStorage = function hasLocalStorage(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        try {
          return !!window.localStorage;
        } catch (e) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.logError)('Local storage api disabled');
        }
      }
      return false;
    };
    return schedule(cb, STORAGE_TYPE_LOCALSTORAGE, done);
  };

  /**
   * Returns all cookie values from the jar whose names contain the `keyLike`
   * Needs to exist in `utils.js` as it follows the StorageHandler interface defined in live-connect-js. If that module were to be removed, this function can go as well.
   * @param {string} keyLike
   * @return {[]}
   */
  var findSimilarCookies = function findSimilarCookies(keyLike, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var all = [];
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.hasDeviceAccess)()) {
          var cookies = document.cookie.split(';');
          while (cookies.length) {
            var cookie = cookies.pop();
            var separatorIndex = cookie.indexOf('=');
            separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;
            var cookieName = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));
            if (cookieName.indexOf(keyLike) >= 0) {
              all.push(decodeURIComponent(cookie.slice(separatorIndex + 1)));
            }
          }
        }
        return all;
      }
    };
    return schedule(cb, STORAGE_TYPE_COOKIES, done);
  };
  return {
    setCookie: setCookie,
    getCookie: getCookie,
    localStorageIsEnabled: localStorageIsEnabled,
    cookiesAreEnabled: cookiesAreEnabled,
    setDataInLocalStorage: setDataInLocalStorage,
    getDataFromLocalStorage: getDataFromLocalStorage,
    removeDataFromLocalStorage: removeDataFromLocalStorage,
    hasLocalStorage: hasLocalStorage,
    findSimilarCookies: findSimilarCookies
  };
}

/**
 * Get a storage manager for a particular module.
 *
 * Either bidderCode or a combination of moduleType + moduleName must be provided. The former is a shorthand
 *  for `{moduleType: 'bidder', moduleName: bidderCode}`.
 *
 */
function getStorageManager() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    moduleType = _ref3.moduleType,
    moduleName = _ref3.moduleName,
    bidderCode = _ref3.bidderCode;
  function err() {
    throw new Error("Invalid invocation for getStorageManager: must set either bidderCode, or moduleType + moduleName");
  }
  if (bidderCode) {
    if (moduleType && moduleType !== _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_BIDDER || moduleName) err();
    moduleType = _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_BIDDER;
    moduleName = bidderCode;
  } else if (!moduleName || !moduleType) {
    err();
  }
  return newStorageManager({
    moduleType: moduleType,
    moduleName: moduleName
  });
}

/**
 * Get a storage manager for "core" (vendorless, or first-party) modules. Shorthand for `getStorageManager({moduleName, moduleType: 'core'})`.
 *
 * @param {string} moduleName Module name
 */
function getCoreStorageManager(moduleName) {
  return newStorageManager({
    moduleName: moduleName,
    moduleType: _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_PREBID
  });
}

/**
 * Block all access to storage when deviceAccess = false
 */
function deviceAccessRule() {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.hasDeviceAccess)()) {
    return {
      allow: false
    };
  }
}
(0,_activities_rules_js__WEBPACK_IMPORTED_MODULE_0__.registerActivityControl)(_activities_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_ACCESS_DEVICE, 'deviceAccess config', deviceAccessRule);

/**
 * By default, deny bidders accessDevice unless they enable it through bidderSettings
 *
 * // TODO: for backwards compat, the check is done on the adapter - rather than bidder's code.
 */
function storageAllowedRule(params) {
  var bs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _bidderSettings_js__WEBPACK_IMPORTED_MODULE_9__.bidderSettings;
  if (params[_activities_params_js__WEBPACK_IMPORTED_MODULE_7__.ACTIVITY_PARAM_COMPONENT_TYPE] !== _activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_BIDDER) return;
  var allow = bs.get(params[_activities_params_js__WEBPACK_IMPORTED_MODULE_7__.ACTIVITY_PARAM_ADAPTER_CODE], 'storageAllowed');
  if (!allow || allow === true) {
    allow = !!allow;
  } else {
    var storageType = params[_activities_params_js__WEBPACK_IMPORTED_MODULE_7__.ACTIVITY_PARAM_STORAGE_TYPE];
    allow = Array.isArray(allow) ? allow.some(function (e) {
      return e === storageType;
    }) : allow === storageType;
  }
  if (!allow) {
    return {
      allow: allow
    };
  }
}
(0,_activities_rules_js__WEBPACK_IMPORTED_MODULE_0__.registerActivityControl)(_activities_activities_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_ACCESS_DEVICE, 'bidderSettings.*.storageAllowed', storageAllowedRule);
function resetData() {
  storageCallbacks = [];
}

/***/ }),

/***/ "./src/targeting.js":
/*!**************************!*\
  !*** ./src/targeting.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBidUsable": function() { return /* binding */ isBidUsable; },
/* harmony export */   "targeting": function() { return /* binding */ targeting; }
/* harmony export */ });
/* unused harmony exports TARGETING_KEYS, filters, getHighestCpmBidsFromBidPool, sortByDealAndPriceBucketOrCpm, newTargeting */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./native.js */ "./src/native.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _mediaTypes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mediaTypes.js */ "./src/mediaTypes.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _bidderSettings_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");











var pbTargetingKeys = [];
var MAX_DFP_KEYLENGTH = 20;
var DEFAULT_TTL_BUFFER = 1;
_config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('ttlBuffer', function (cfg) {
  if (typeof cfg.ttlBuffer === 'number') {
    DEFAULT_TTL_BUFFER = cfg.ttlBuffer;
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Invalid value for ttlBuffer', cfg.ttlBuffer);
  }
});
var CFG_ALLOW_TARGETING_KEYS = "targetingControls.allowTargetingKeys";
var CFG_ADD_TARGETING_KEYS = "targetingControls.addTargetingKeys";
var TARGETING_KEY_CONFIGURATION_ERROR_MSG = "Only one of \"".concat(CFG_ALLOW_TARGETING_KEYS, "\" or \"").concat(CFG_ADD_TARGETING_KEYS, "\" can be set");
var TARGETING_KEYS = Object.keys(_constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS).map(function (key) {
  return _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS[key];
});

// return unexpired bids
var isBidNotExpired = function isBidNotExpired(bid) {
  return bid.responseTimestamp + (bid.ttl - (bid.hasOwnProperty('ttlBuffer') ? bid.ttlBuffer : DEFAULT_TTL_BUFFER)) * 1000 > (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timestamp)();
};

// return bids whose status is not set. Winning bids can only have a status of `rendered`.
var isUnusedBid = function isUnusedBid(bid) {
  return bid && (bid.status && !(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)([_constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.RENDERED], bid.status) || !bid.status);
};
var filters = {
  isActualBid: function isActualBid(bid) {
    return bid.getStatusCode() === _constants_json__WEBPACK_IMPORTED_MODULE_2__.STATUS.GOOD;
  },
  isBidNotExpired: isBidNotExpired,
  isUnusedBid: isUnusedBid
};
function isBidUsable(bid) {
  return !Object.values(filters).some(function (predicate) {
    return !predicate(bid);
  });
}

// If two bids are found for same adUnitCode, we will use the highest one to take part in auction
// This can happen in case of concurrent auctions
// If adUnitBidLimit is set above 0 return top N number of bids
var getHighestCpmBidsFromBidPool = (0,_hook_js__WEBPACK_IMPORTED_MODULE_4__.hook)('sync', function (bidsReceived, highestCpmCallback) {
  var adUnitBidLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var hasModified = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!hasModified) {
    var bids = [];
    var dealPrioritization = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('sendBidsControl.dealPrioritization');
    // bucket by adUnitcode
    var buckets = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.groupBy)(bidsReceived, 'adUnitCode');
    // filter top bid for each bucket by bidder
    Object.keys(buckets).forEach(function (bucketKey) {
      var bucketBids = [];
      var bidsByBidder = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.groupBy)(buckets[bucketKey], 'bidderCode');
      Object.keys(bidsByBidder).forEach(function (key) {
        return bucketBids.push(bidsByBidder[key].reduce(highestCpmCallback));
      });
      // if adUnitBidLimit is set, pass top N number bids
      if (adUnitBidLimit > 0) {
        bucketBids = dealPrioritization ? bucketBids.sort(sortByDealAndPriceBucketOrCpm(true)) : bucketBids.sort(function (a, b) {
          return b.cpm - a.cpm;
        });
        bids.push.apply(bids, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__["default"])(bucketBids.slice(0, adUnitBidLimit)));
      } else {
        bids.push.apply(bids, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__["default"])(bucketBids));
      }
    });
    return bids;
  }
  return bidsReceived;
});

/**
* A descending sort function that will sort the list of objects based on the following two dimensions:
*  - bids with a deal are sorted before bids w/o a deal
*  - then sort bids in each grouping based on the hb_pb value
* eg: the following list of bids would be sorted like:
*  [{
*    "hb_adid": "vwx",
*    "hb_pb": "28",
*    "hb_deal": "7747"
*  }, {
*    "hb_adid": "jkl",
*    "hb_pb": "10",
*    "hb_deal": "9234"
*  }, {
*    "hb_adid": "stu",
*    "hb_pb": "50"
*  }, {
*    "hb_adid": "def",
*    "hb_pb": "2"
*  }]
*/
function sortByDealAndPriceBucketOrCpm() {
  var useCpm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (a, b) {
    if (a.adserverTargeting.hb_deal !== undefined && b.adserverTargeting.hb_deal === undefined) {
      return -1;
    }
    if (a.adserverTargeting.hb_deal === undefined && b.adserverTargeting.hb_deal !== undefined) {
      return 1;
    }

    // assuming both values either have a deal or don't have a deal - sort by the hb_pb param
    if (useCpm) {
      return b.cpm - a.cpm;
    }
    return b.adserverTargeting.hb_pb - a.adserverTargeting.hb_pb;
  };
}

/**
 * @typedef {Object.<string,string>} targeting
 * @property {string} targeting_key
 */

/**
 * @typedef {Object.<string,Object.<string,string[]>[]>[]} targetingArray
 */

function newTargeting(auctionManager) {
  var targeting = {};
  var latestAuctionForAdUnit = {};
  targeting.setLatestAuctionForAdUnit = function (adUnitCode, auctionId) {
    latestAuctionForAdUnit[adUnitCode] = auctionId;
  };
  targeting.resetPresetTargeting = function (adUnitCode, customSlotMatching) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isGptPubadsDefined)()) {
      var adUnitCodes = getAdUnitCodes(adUnitCode);
      var adUnits = auctionManager.getAdUnits().filter(function (adUnit) {
        return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(adUnitCodes, adUnit.code);
      });
      var unsetKeys = pbTargetingKeys.reduce(function (reducer, key) {
        reducer[key] = null;
        return reducer;
      }, {});
      window.googletag.pubads().getSlots().forEach(function (slot) {
        var customSlotMatchingFunc = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFn)(customSlotMatching) && customSlotMatching(slot);
        // reset only registered adunits
        adUnits.forEach(function (unit) {
          if (unit.code === slot.getAdUnitPath() || unit.code === slot.getSlotElementId() || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFn)(customSlotMatchingFunc) && customSlotMatchingFunc(unit.code)) {
            slot.updateTargetingFromMap(unsetKeys);
          }
        });
      });
    }
  };
  targeting.resetPresetTargetingAST = function (adUnitCode) {
    var adUnitCodes = getAdUnitCodes(adUnitCode);
    adUnitCodes.forEach(function (unit) {
      var astTag = window.apntag.getTag(unit);
      if (astTag && astTag.keywords) {
        var currentKeywords = Object.keys(astTag.keywords);
        var newKeywords = {};
        currentKeywords.forEach(function (key) {
          if (!(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(pbTargetingKeys, key.toLowerCase())) {
            newKeywords[key] = astTag.keywords[key];
          }
        });
        window.apntag.modifyTag(unit, {
          keywords: newKeywords
        });
      }
    });
  };

  /**
   * checks if bid has targeting set and belongs based on matching ad unit codes
   * @return {boolean} true or false
   */
  function bidShouldBeAddedToTargeting(bid, adUnitCodes) {
    return bid.adserverTargeting && adUnitCodes && ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(adUnitCodes) && (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(adUnitCodes, bid.adUnitCode) || typeof adUnitCodes === 'string' && bid.adUnitCode === adUnitCodes);
  }
  ;

  /**
   * Returns targeting for any bids which have deals if alwaysIncludeDeals === true
   */
  function getDealBids(adUnitCodes, bidsReceived) {
    if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('targetingControls.alwaysIncludeDeals') === true) {
      var standardKeys =  true ? TARGETING_KEYS.concat(_native_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE_TARGETING_KEYS) : 0;

      // we only want the top bid from bidders who have multiple entries per ad unit code
      var bids = getHighestCpmBidsFromBidPool(bidsReceived, _utils_js__WEBPACK_IMPORTED_MODULE_1__.getHighestCpm);

      // populate targeting keys for the remaining bids if they have a dealId
      return bids.map(function (bid) {
        if (bid.dealId && bidShouldBeAddedToTargeting(bid, adUnitCodes)) {
          return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, bid.adUnitCode, getTargetingMap(bid, standardKeys.filter(function (key) {
            return typeof bid.adserverTargeting[key] !== 'undefined';
          })));
        }
      }).filter(function (bid) {
        return bid;
      }); // removes empty elements in array
    }

    return [];
  }
  ;

  /**
   * Returns filtered ad server targeting for custom and allowed keys.
   * @param {targetingArray} targeting
   * @param {string[]} allowedKeys
   * @return {targetingArray} filtered targeting
   */
  function getAllowedTargetingKeyValues(targeting, allowedKeys) {
    var defaultKeyring = Object.assign({}, _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS, _constants_json__WEBPACK_IMPORTED_MODULE_2__.NATIVE_KEYS);
    var defaultKeys = Object.keys(defaultKeyring);
    var keyDispositions = {};
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("allowTargetingKeys - allowed keys [ ".concat(allowedKeys.map(function (k) {
      return defaultKeyring[k];
    }).join(', '), " ]"));
    targeting.map(function (adUnit) {
      var adUnitCode = Object.keys(adUnit)[0];
      var keyring = adUnit[adUnitCode];
      var keys = keyring.filter(function (kvPair) {
        var key = Object.keys(kvPair)[0];
        // check if key is in default keys, if not, it's custom, we won't remove it.
        var isCustom = defaultKeys.filter(function (defaultKey) {
          return key.indexOf(defaultKeyring[defaultKey]) === 0;
        }).length === 0;
        // check if key explicitly allowed, if not, we'll remove it.
        var found = isCustom || (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.find)(allowedKeys, function (allowedKey) {
          var allowedKeyName = defaultKeyring[allowedKey];
          // we're looking to see if the key exactly starts with one of our default keys.
          // (which hopefully means it's not custom)
          var found = key.indexOf(allowedKeyName) === 0;
          return found;
        });
        keyDispositions[key] = !found;
        return found;
      });
      adUnit[adUnitCode] = keys;
    });
    var removedKeys = Object.keys(keyDispositions).filter(function (d) {
      return keyDispositions[d];
    });
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("allowTargetingKeys - removed keys [ ".concat(removedKeys.join(', '), " ]"));
    // remove any empty targeting objects, as they're unnecessary.
    var filteredTargeting = targeting.filter(function (adUnit) {
      var adUnitCode = Object.keys(adUnit)[0];
      var keyring = adUnit[adUnitCode];
      return keyring.length > 0;
    });
    return filteredTargeting;
  }

  /**
   * Returns all ad server targeting for all ad units.
   * @param {string=} adUnitCode
   * @return {Object.<string,targeting>} targeting
   */
  targeting.getAllTargeting = function (adUnitCode) {
    var bidsReceived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBidsReceived();
    var adUnitCodes = getAdUnitCodes(adUnitCode);

    // Get targeting for the winning bid. Add targeting for any bids that have
    // `alwaysUseBid=true`. If sending all bids is enabled, add targeting for losing bids.
    var targeting = getWinningBidTargeting(adUnitCodes, bidsReceived).concat(getCustomBidTargeting(adUnitCodes, bidsReceived)).concat(_config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('enableSendAllBids') ? getBidLandscapeTargeting(adUnitCodes, bidsReceived) : getDealBids(adUnitCodes, bidsReceived)).concat(getAdUnitTargeting(adUnitCodes));

    // store a reference of the targeting keys
    targeting.map(function (adUnitCode) {
      Object.keys(adUnitCode).map(function (key) {
        adUnitCode[key].map(function (targetKey) {
          if (pbTargetingKeys.indexOf(Object.keys(targetKey)[0]) === -1) {
            pbTargetingKeys = Object.keys(targetKey).concat(pbTargetingKeys);
          }
        });
      });
    });
    var defaultKeys = Object.keys(Object.assign({}, _constants_json__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_TARGETING_KEYS, _constants_json__WEBPACK_IMPORTED_MODULE_2__.NATIVE_KEYS));
    var allowedKeys = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig(CFG_ALLOW_TARGETING_KEYS);
    var addedKeys = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig(CFG_ADD_TARGETING_KEYS);
    if (addedKeys != null && allowedKeys != null) {
      throw new Error(TARGETING_KEY_CONFIGURATION_ERROR_MSG);
    } else if (addedKeys != null) {
      allowedKeys = defaultKeys.concat(addedKeys);
    } else {
      allowedKeys = allowedKeys || defaultKeys;
    }
    if (Array.isArray(allowedKeys) && allowedKeys.length > 0) {
      targeting = getAllowedTargetingKeyValues(targeting, allowedKeys);
    }
    targeting = flattenTargeting(targeting);
    var auctionKeysThreshold = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('targetingControls.auctionKeyMaxChars');
    if (auctionKeysThreshold) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(auctionKeysThreshold, " characters.  Running checks on auction keys..."));
      targeting = filterTargetingKeys(targeting, auctionKeysThreshold);
    }

    // make sure at least there is a entry per adUnit code in the targetingSet so receivers of SET_TARGETING call's can know what ad units are being invoked
    adUnitCodes.forEach(function (code) {
      if (!targeting[code]) {
        targeting[code] = {};
      }
    });
    return targeting;
  };

  // warn about conflicting configuration
  _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('targetingControls', function (config) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"])(config, CFG_ALLOW_TARGETING_KEYS) != null && (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"])(config, CFG_ADD_TARGETING_KEYS) != null) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(TARGETING_KEY_CONFIGURATION_ERROR_MSG);
    }
  });

  // create an encoded string variant based on the keypairs of the provided object
  //  - note this will encode the characters between the keys (ie = and &)
  function convertKeysToQueryForm(keyMap) {
    return Object.keys(keyMap).reduce(function (queryString, key) {
      var encodedKeyPair = "".concat(key, "%3d").concat(encodeURIComponent(keyMap[key]), "%26");
      return queryString += encodedKeyPair;
    }, '');
  }
  function filterTargetingKeys(targeting, auctionKeysThreshold) {
    // read each targeting.adUnit object and sort the adUnits into a list of adUnitCodes based on priorization setting (eg CPM)
    var targetingCopy = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.deepClone)(targeting);
    var targetingMap = Object.keys(targetingCopy).map(function (adUnitCode) {
      return {
        adUnitCode: adUnitCode,
        adserverTargeting: targetingCopy[adUnitCode]
      };
    }).sort(sortByDealAndPriceBucketOrCpm());

    // iterate through the targeting based on above list and transform the keys into the query-equivalent and count characters
    return targetingMap.reduce(function (accMap, currMap, index, arr) {
      var adUnitQueryString = convertKeysToQueryForm(currMap.adserverTargeting);

      // for the last adUnit - trim last encoded ampersand from the converted query string
      if (index + 1 === arr.length) {
        adUnitQueryString = adUnitQueryString.slice(0, -3);
      }

      // if under running threshold add to result
      var code = currMap.adUnitCode;
      var querySize = adUnitQueryString.length;
      if (querySize <= auctionKeysThreshold) {
        auctionKeysThreshold -= querySize;
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("AdUnit '".concat(code, "' auction keys comprised of ").concat(querySize, " characters.  Deducted from running threshold; new limit is ").concat(auctionKeysThreshold), targetingCopy[code]);
        accMap[code] = targetingCopy[code];
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("The following keys for adUnitCode '".concat(code, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(querySize, ", the current allotted amount was ").concat(auctionKeysThreshold, ".\n"), targetingCopy[code]);
      }
      if (index + 1 === arr.length && Object.keys(accMap).length === 0) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting.');
      }
      return accMap;
    }, {});
  }

  /**
   * Converts targeting array and flattens to make it easily iteratable
   * e.g: Sample input to this function
   * ```
   * [
   *    {
   *      "div-gpt-ad-1460505748561-0": [{"hb_bidder": ["appnexusAst"]}]
   *    },
   *    {
   *      "div-gpt-ad-1460505748561-0": [{"hb_bidder_appnexusAs": ["appnexusAst", "other"]}]
   *    }
   * ]
   * ```
   * Resulting array
   * ```
   * {
   *  "div-gpt-ad-1460505748561-0": {
   *    "hb_bidder": "appnexusAst",
   *    "hb_bidder_appnexusAs": "appnexusAst,other"
   *  }
   * }
   * ```
   *
   * @param {targetingArray}  targeting
   * @return {Object.<string,targeting>}  targeting
   */
  function flattenTargeting(targeting) {
    var targetingObj = targeting.map(function (targeting) {
      return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, Object.keys(targeting)[0], targeting[Object.keys(targeting)[0]].map(function (target) {
        return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, Object.keys(target)[0], target[Object.keys(target)[0]].join(','));
      }).reduce(function (p, c) {
        return Object.assign(c, p);
      }, {}));
    }).reduce(function (accumulator, targeting) {
      var key = Object.keys(targeting)[0];
      accumulator[key] = Object.assign({}, accumulator[key], targeting[key]);
      return accumulator;
    }, {});
    return targetingObj;
  }

  /**
   * Sets targeting for DFP
   * @param {Object.<string,Object.<string,string>>} targetingConfig
   */
  targeting.setTargetingForGPT = function (targetingConfig, customSlotMatching) {
    window.googletag.pubads().getSlots().forEach(function (slot) {
      Object.keys(targetingConfig).filter(customSlotMatching ? customSlotMatching(slot) : (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAdUnitCodeMatchingSlot)(slot)).forEach(function (targetId) {
        Object.keys(targetingConfig[targetId]).forEach(function (key) {
          var value = targetingConfig[targetId][key];
          if (typeof value === 'string' && value.indexOf(',') !== -1) {
            // due to the check the array will be formed only if string has ',' else plain string will be assigned as value
            value = value.split(',');
          }
          targetingConfig[targetId][key] = value;
        });
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Attempting to set targeting-map for slot: ".concat(slot.getSlotElementId(), " with targeting-map:"), targetingConfig[targetId]);
        slot.updateTargetingFromMap(targetingConfig[targetId]);
      });
    });
  };

  /**
   * normlizes input to a `adUnit.code` array
   * @param  {(string|string[])} adUnitCode [description]
   * @return {string[]}     AdUnit code array
   */
  function getAdUnitCodes(adUnitCode) {
    if (typeof adUnitCode === 'string') {
      return [adUnitCode];
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(adUnitCode)) {
      return adUnitCode;
    }
    return auctionManager.getAdUnitCodes() || [];
  }
  function getBidsReceived() {
    var bidsReceived = auctionManager.getBidsReceived();
    if (!_config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('useBidCache')) {
      // don't use bid cache (i.e. filter out bids not in the latest auction)
      bidsReceived = bidsReceived.filter(function (bid) {
        return latestAuctionForAdUnit[bid.adUnitCode] === bid.auctionId;
      });
    } else {
      // if custom bid cache filter function exists, run for each bid from
      // previous auctions. If it returns true, include bid in bid pool
      var filterFunction = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('bidCacheFilterFunction');
      if (typeof filterFunction === 'function') {
        bidsReceived = bidsReceived.filter(function (bid) {
          return latestAuctionForAdUnit[bid.adUnitCode] === bid.auctionId || !!filterFunction(bid);
        });
      }
    }
    bidsReceived = bidsReceived.filter(function (bid) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"])(bid, 'video.context') !== _mediaTypes_js__WEBPACK_IMPORTED_MODULE_9__.ADPOD;
    }).filter(isBidUsable);
    return getHighestCpmBidsFromBidPool(bidsReceived, _utils_js__WEBPACK_IMPORTED_MODULE_1__.getOldestHighestCpmBid);
  }

  /**
   * Returns top bids for a given adUnit or set of adUnits.
   * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
   * @return {[type]}            [description]
   */
  targeting.getWinningBids = function (adUnitCode) {
    var bidsReceived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBidsReceived();
    var adUnitCodes = getAdUnitCodes(adUnitCode);
    return bidsReceived.filter(function (bid) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(adUnitCodes, bid.adUnitCode);
    }).filter(function (bid) {
      return _bidderSettings_js__WEBPACK_IMPORTED_MODULE_10__.bidderSettings.get(bid.bidderCode, 'allowZeroCpmBids') === true ? bid.cpm >= 0 : bid.cpm > 0;
    }).map(function (bid) {
      return bid.adUnitCode;
    }).filter(_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques).map(function (adUnitCode) {
      return bidsReceived.filter(function (bid) {
        return bid.adUnitCode === adUnitCode ? bid : null;
      }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_1__.getHighestCpm);
    });
  };

  /**
   * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
   * Sets targeting for AST
   */
  targeting.setTargetingForAst = function (adUnitCodes) {
    var astTargeting = targeting.getAllTargeting(adUnitCodes);
    try {
      targeting.resetPresetTargetingAST(adUnitCodes);
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('unable to reset targeting for AST' + e);
    }
    Object.keys(astTargeting).forEach(function (targetId) {
      return Object.keys(astTargeting[targetId]).forEach(function (key) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Attempting to set targeting for targetId: ".concat(targetId, " key: ").concat(key, " value: ").concat(astTargeting[targetId][key]));
        // setKeywords supports string and array as value
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(astTargeting[targetId][key]) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(astTargeting[targetId][key])) {
          var keywordsObj = {};
          var regex = /pt[0-9]/;
          if (key.search(regex) < 0) {
            keywordsObj[key.toUpperCase()] = astTargeting[targetId][key];
          } else {
            // pt${n} keys should not be uppercased
            keywordsObj[key] = astTargeting[targetId][key];
          }
          window.apntag.setKeywords(targetId, keywordsObj, {
            overrideKeyValue: true
          });
        }
      });
    });
  };

  /**
   * Get targeting key value pairs for winning bid.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   winning bids targeting
   */
  function getWinningBidTargeting(adUnitCodes, bidsReceived) {
    var winners = targeting.getWinningBids(adUnitCodes, bidsReceived);
    var standardKeys = getStandardKeys();
    winners = winners.map(function (winner) {
      return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, winner.adUnitCode, Object.keys(winner.adserverTargeting).filter(function (key) {
        return typeof winner.sendStandardTargeting === 'undefined' || winner.sendStandardTargeting || standardKeys.indexOf(key) === -1;
      }).reduce(function (acc, key) {
        var targetingValue = [winner.adserverTargeting[key]];
        var targeting = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key.substring(0, MAX_DFP_KEYLENGTH), targetingValue);
        if (key === _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS.DEAL) {
          var bidderCodeTargetingKey = "".concat(key, "_").concat(winner.bidderCode).substring(0, MAX_DFP_KEYLENGTH);
          var bidderCodeTargeting = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, bidderCodeTargetingKey, targetingValue);
          return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__["default"])(acc), [targeting, bidderCodeTargeting]);
        }
        return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__["default"])(acc), [targeting]);
      }, []));
    });
    return winners;
  }
  function getStandardKeys() {
    return auctionManager.getStandardBidderAdServerTargeting() // in case using a custom standard key set
    .map(function (targeting) {
      return targeting.key;
    }).concat(TARGETING_KEYS).filter(_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques); // standard keys defined in the library.
  }

  /**
   * Merge custom adserverTargeting with same key name for same adUnitCode.
   * e.g: Appnexus defining custom keyvalue pair foo:bar and Rubicon defining custom keyvalue pair foo:baz will be merged to foo: ['bar','baz']
   *
   * @param {Object[]} acc Accumulator for reducer. It will store updated bidResponse objects
   * @param {Object} bid BidResponse
   * @param {number} index current index
   * @param {Array} arr original array
   */
  function mergeAdServerTargeting(acc, bid, index, arr) {
    function concatTargetingValue(key) {
      return function (currentBidElement) {
        if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(currentBidElement.adserverTargeting[key])) {
          currentBidElement.adserverTargeting[key] = [currentBidElement.adserverTargeting[key]];
        }
        currentBidElement.adserverTargeting[key] = currentBidElement.adserverTargeting[key].concat(bid.adserverTargeting[key]).filter(_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques);
        delete bid.adserverTargeting[key];
      };
    }
    function hasSameAdunitCodeAndKey(key) {
      return function (currentBidElement) {
        return currentBidElement.adUnitCode === bid.adUnitCode && currentBidElement.adserverTargeting[key];
      };
    }
    Object.keys(bid.adserverTargeting).filter(getCustomKeys()).forEach(function (key) {
      if (acc.length) {
        acc.filter(hasSameAdunitCodeAndKey(key)).forEach(concatTargetingValue(key));
      }
    });
    acc.push(bid);
    return acc;
  }
  function getCustomKeys() {
    var standardKeys = getStandardKeys();
    if (true) {
      standardKeys = standardKeys.concat(_native_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE_TARGETING_KEYS);
    }
    return function (key) {
      return standardKeys.indexOf(key) === -1;
    };
  }
  function truncateCustomKeys(bid) {
    return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, bid.adUnitCode, Object.keys(bid.adserverTargeting)
    // Get only the non-standard keys of the losing bids, since we
    // don't want to override the standard keys of the winning bid.
    .filter(getCustomKeys()).map(function (key) {
      return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key.substring(0, MAX_DFP_KEYLENGTH), [bid.adserverTargeting[key]]);
    }));
  }

  /**
   * Get custom targeting key value pairs for bids.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   bids with custom targeting defined in bidderSettings
   */
  function getCustomBidTargeting(adUnitCodes, bidsReceived) {
    return bidsReceived.filter(function (bid) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(adUnitCodes, bid.adUnitCode);
    }).map(function (bid) {
      return Object.assign({}, bid);
    }).reduce(mergeAdServerTargeting, []).map(truncateCustomKeys).filter(function (bid) {
      return bid;
    }); // removes empty elements in array;
  }

  /**
   * Get targeting key value pairs for non-winning bids.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   all non-winning bids targeting
   */
  function getBidLandscapeTargeting(adUnitCodes, bidsReceived) {
    var standardKeys =  true ? TARGETING_KEYS.concat(_native_js__WEBPACK_IMPORTED_MODULE_6__.NATIVE_TARGETING_KEYS) : 0;
    var adUnitBidLimit = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('sendBidsControl.bidLimit');
    var bids = getHighestCpmBidsFromBidPool(bidsReceived, _utils_js__WEBPACK_IMPORTED_MODULE_1__.getHighestCpm, adUnitBidLimit);
    var allowSendAllBidsTargetingKeys = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('targetingControls.allowSendAllBidsTargetingKeys');
    var allowedSendAllBidTargeting = allowSendAllBidsTargetingKeys ? allowSendAllBidsTargetingKeys.map(function (key) {
      return _constants_json__WEBPACK_IMPORTED_MODULE_2__.TARGETING_KEYS[key];
    }) : standardKeys;

    // populate targeting keys for the remaining bids
    return bids.map(function (bid) {
      if (bidShouldBeAddedToTargeting(bid, adUnitCodes)) {
        return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, bid.adUnitCode, getTargetingMap(bid, standardKeys.filter(function (key) {
          return typeof bid.adserverTargeting[key] !== 'undefined' && allowedSendAllBidTargeting.indexOf(key) !== -1;
        })));
      }
    }).filter(function (bid) {
      return bid;
    }); // removes empty elements in array
  }

  function getTargetingMap(bid, keys) {
    return keys.map(function (key) {
      return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, "".concat(key, "_").concat(bid.bidderCode).substring(0, MAX_DFP_KEYLENGTH), [bid.adserverTargeting[key]]);
    });
  }
  function getAdUnitTargeting(adUnitCodes) {
    function getTargetingObj(adUnit) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"])(adUnit, _constants_json__WEBPACK_IMPORTED_MODULE_2__.JSON_MAPPING.ADSERVER_TARGETING);
    }
    function getTargetingValues(adUnit) {
      var aut = getTargetingObj(adUnit);
      return Object.keys(aut).map(function (key) {
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(aut[key])) aut[key] = aut[key].split(',').map(function (s) {
          return s.trim();
        });
        if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(aut[key])) aut[key] = [aut[key]];
        return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key, aut[key]);
      });
    }
    return auctionManager.getAdUnits().filter(function (adUnit) {
      return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_3__.includes)(adUnitCodes, adUnit.code) && getTargetingObj(adUnit);
    }).map(function (adUnit) {
      return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, adUnit.code, getTargetingValues(adUnit));
    });
  }
  targeting.isApntagDefined = function () {
    if (window.apntag && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFn)(window.apntag.setKeywords)) {
      return true;
    }
  };
  return targeting;
}
var targeting = newTargeting(_auctionManager_js__WEBPACK_IMPORTED_MODULE_11__.auctionManager);

/***/ }),

/***/ "./src/userSync.js":
/*!*************************!*\
  !*** ./src/userSync.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userSync": function() { return /* binding */ userSync; }
/* harmony export */ });
/* unused harmony exports USERSYNC_DEFAULT_CONFIG, newUserSync */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _storageManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _activities_rules_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _activities_activities_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activities/activities.js */ "./src/activities/activities.js");
/* harmony import */ var _activities_params_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./activities/params.js */ "./src/activities/params.js");
/* harmony import */ var _activities_modules_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _activities_activityParams_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./activities/activityParams.js */ "./src/activities/activityParams.js");











var USERSYNC_DEFAULT_CONFIG = {
  syncEnabled: true,
  filterSettings: {
    image: {
      bidders: '*',
      filter: 'include'
    }
  },
  syncsPerBidder: 5,
  syncDelay: 3000,
  auctionDelay: 0
};

// Set userSync default values
_config_js__WEBPACK_IMPORTED_MODULE_0__.config.setDefaults({
  'userSync': (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.deepClone)(USERSYNC_DEFAULT_CONFIG)
});
var storage = (0,_storageManager_js__WEBPACK_IMPORTED_MODULE_2__.getCoreStorageManager)('usersync');

/**
 * Factory function which creates a new UserSyncPool.
 *
 * @param {} deps Configuration options and dependencies which the
 *   UserSync object needs in order to behave properly.
 */
function newUserSync(deps) {
  var publicApi = {};
  // A queue of user syncs for each adapter
  // Let getDefaultQueue() set the defaults
  var queue = getDefaultQueue();

  // Whether or not user syncs have been trigger on this page load for a specific bidder
  var hasFiredBidder = new Set();
  // How many bids for each adapter
  var numAdapterBids = {};

  // for now - default both to false in case filterSettings config is absent/misconfigured
  var permittedPixels = {
    image: true,
    iframe: false
  };

  // Use what is in config by default
  var usConfig = deps.config;
  // Update if it's (re)set
  _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('userSync', function (conf) {
    // Added this logic for https://github.com/prebid/Prebid.js/issues/4864
    // if userSync.filterSettings does not contain image/all configs, merge in default image config to ensure image pixels are fired
    if (conf.userSync) {
      var fs = conf.userSync.filterSettings;
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(fs)) {
        if (!fs.image && !fs.all) {
          conf.userSync.filterSettings.image = {
            bidders: '*',
            filter: 'include'
          };
        }
      }
    }
    usConfig = Object.assign(usConfig, conf.userSync);
  });
  deps.regRule(_activities_activities_js__WEBPACK_IMPORTED_MODULE_3__.ACTIVITY_SYNC_USER, 'userSync config', function (params) {
    if (!usConfig.syncEnabled) {
      return {
        allow: false,
        reason: 'syncs are disabled'
      };
    }
    if (params[_activities_params_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_PARAM_COMPONENT_TYPE] === _activities_modules_js__WEBPACK_IMPORTED_MODULE_5__.MODULE_TYPE_BIDDER) {
      var syncType = params[_activities_params_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_PARAM_SYNC_TYPE];
      var bidder = params[_activities_params_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_PARAM_COMPONENT_NAME];
      if (!publicApi.canBidderRegisterSync(syncType, bidder)) {
        return {
          allow: false,
          reason: "".concat(syncType, " syncs are not enabled for ").concat(bidder)
        };
      }
    }
  });

  /**
   * @function getDefaultQueue
   * @summary Returns the default empty queue
   * @private
   * @return {object} A queue with no syncs
   */
  function getDefaultQueue() {
    return {
      image: [],
      iframe: []
    };
  }

  /**
   * @function fireSyncs
   * @summary Trigger all user syncs in the queue
   * @private
   */
  function fireSyncs() {
    if (!usConfig.syncEnabled || !deps.browserSupportsCookies) {
      return;
    }
    try {
      // Iframe syncs
      loadIframes();
      // Image pixels
      fireImagePixels();
    } catch (e) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)('Error firing user syncs', e);
    }
    // Reset the user sync queue
    queue = getDefaultQueue();
  }
  function forEachFire(queue, fn) {
    // Randomize the order of the pixels before firing
    // This is to avoid giving any bidder who has registered multiple syncs
    // any preferential treatment and balancing them out
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.shuffle)(queue).forEach(fn);
  }

  /**
   * @function fireImagePixels
   * @summary Loops through user sync pixels and fires each one
   * @private
   */
  function fireImagePixels() {
    if (!permittedPixels.image) {
      return;
    }
    forEachFire(queue.image, function (sync) {
      var _sync = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(sync, 2),
        bidderName = _sync[0],
        trackingPixelUrl = _sync[1];
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Invoking image pixel user sync for bidder: ".concat(bidderName));
      // Create image object and add the src url
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.triggerPixel)(trackingPixelUrl);
    });
  }

  /**
   * @function loadIframes
   * @summary Loops through iframe syncs and loads an iframe element into the page
   * @private
   */
  function loadIframes() {
    if (!permittedPixels.iframe) {
      return;
    }
    forEachFire(queue.iframe, function (sync) {
      var _sync2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(sync, 2),
        bidderName = _sync2[0],
        iframeUrl = _sync2[1];
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("Invoking iframe user sync for bidder: ".concat(bidderName));
      // Insert iframe into DOM
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.insertUserSyncIframe)(iframeUrl);
      // for a bidder, if iframe sync is present then remove image pixel
      removeImagePixelsForBidder(queue, bidderName);
    });
  }
  function removeImagePixelsForBidder(queue, iframeSyncBidderName) {
    queue.image = queue.image.filter(function (imageSync) {
      var imageSyncBidderName = imageSync[0];
      return imageSyncBidderName !== iframeSyncBidderName;
    });
  }

  /**
   * @function incrementAdapterBids
   * @summary Increment the count of user syncs queue for the adapter
   * @private
   * @params {object} numAdapterBids The object contain counts for all adapters
   * @params {string} bidder The name of the bidder adding a sync
   * @returns {object} The updated version of numAdapterBids
   */
  function incrementAdapterBids(numAdapterBids, bidder) {
    if (!numAdapterBids[bidder]) {
      numAdapterBids[bidder] = 1;
    } else {
      numAdapterBids[bidder] += 1;
    }
    return numAdapterBids;
  }

  /**
   * @function registerSync
   * @summary Add sync for this bidder to a queue to be fired later
   * @public
   * @params {string} type The type of the sync including image, iframe
   * @params {string} bidder The name of the adapter. e.g. "rubicon"
   * @params {string} url Either the pixel url or iframe url depending on the type
    * @example <caption>Using Image Sync</caption>
   * // registerSync(type, adapter, pixelUrl)
   * userSync.registerSync('image', 'rubicon', 'http://example.com/pixel')
   */
  publicApi.registerSync = function (type, bidder, url) {
    var _activityParams;
    if (hasFiredBidder.has(bidder)) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logMessage)("already fired syncs for \"".concat(bidder, "\", ignoring registerSync call"));
    }
    if (!usConfig.syncEnabled || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(queue[type])) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("User sync type \"".concat(type, "\" not supported"));
    }
    if (!bidder) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Bidder is required for registering sync");
    }
    if (usConfig.syncsPerBidder !== 0 && Number(numAdapterBids[bidder]) >= usConfig.syncsPerBidder) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Number of user syncs exceeded for \"".concat(bidder, "\""));
    }
    if (deps.isAllowed(_activities_activities_js__WEBPACK_IMPORTED_MODULE_3__.ACTIVITY_SYNC_USER, (0,_activities_activityParams_js__WEBPACK_IMPORTED_MODULE_7__.activityParams)(_activities_modules_js__WEBPACK_IMPORTED_MODULE_5__.MODULE_TYPE_BIDDER, bidder, (_activityParams = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_activityParams, _activities_params_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_PARAM_SYNC_TYPE, type), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_activityParams, _activities_params_js__WEBPACK_IMPORTED_MODULE_4__.ACTIVITY_PARAM_SYNC_URL, url), _activityParams)))) {
      // the bidder's pixel has passed all checks and is allowed to register
      queue[type].push([bidder, url]);
      numAdapterBids = incrementAdapterBids(numAdapterBids, bidder);
    }
  };

  /**
   * Mark a bidder as done with its user syncs - no more will be accepted from them in this session.
   * @param {string} bidderCode
   */
  publicApi.bidderDone = hasFiredBidder.add.bind(hasFiredBidder);

  /**
   * @function shouldBidderBeBlocked
   * @summary Check filterSettings logic to determine if the bidder should be prevented from registering their userSync tracker
   * @private
   * @param {string} type The type of the sync; either image or iframe
   * @param {string} bidder The name of the adapter. e.g. "rubicon"
   * @returns {boolean} true => bidder is not allowed to register; false => bidder can register
    */
  function shouldBidderBeBlocked(type, bidder) {
    var filterConfig = usConfig.filterSettings;

    // apply the filter check if the config object is there (eg filterSettings.iframe exists) and if the config object is properly setup
    if (isFilterConfigValid(filterConfig, type)) {
      permittedPixels[type] = true;
      var activeConfig = filterConfig.all ? filterConfig.all : filterConfig[type];
      var biddersToFilter = activeConfig.bidders === '*' ? [bidder] : activeConfig.bidders;
      var filterType = activeConfig.filter || 'include'; // set default if undefined

      // return true if the bidder is either: not part of the include (ie outside the whitelist) or part of the exclude (ie inside the blacklist)
      var checkForFiltering = {
        'include': function include(bidders, bidder) {
          return !(0,_polyfill_js__WEBPACK_IMPORTED_MODULE_9__.includes)(bidders, bidder);
        },
        'exclude': function exclude(bidders, bidder) {
          return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_9__.includes)(bidders, bidder);
        }
      };
      return checkForFiltering[filterType](biddersToFilter, bidder);
    }
    return !permittedPixels[type];
  }

  /**
   * @function isFilterConfigValid
   * @summary Check if the filterSettings object in the userSync config is setup properly
   * @private
   * @param {object} filterConfig sub-config object taken from filterSettings
   * @param {string} type The type of the sync; either image or iframe
   * @returns {boolean} true => config is setup correctly, false => setup incorrectly or filterConfig[type] is not present
   */
  function isFilterConfigValid(filterConfig, type) {
    if (filterConfig.all && filterConfig[type]) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Detected presence of the \"filterSettings.all\" and \"filterSettings.".concat(type, "\" in userSync config.  You cannot mix \"all\" with \"iframe/image\" configs; they are mutually exclusive."));
      return false;
    }
    var activeConfig = filterConfig.all ? filterConfig.all : filterConfig[type];
    var activeConfigName = filterConfig.all ? 'all' : type;

    // if current pixel type isn't part of the config's logic, skip rest of the config checks...
    // we return false to skip subsequent filter checks in shouldBidderBeBlocked() function
    if (!activeConfig) {
      return false;
    }
    var filterField = activeConfig.filter;
    var biddersField = activeConfig.bidders;
    if (filterField && filterField !== 'include' && filterField !== 'exclude') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("UserSync \"filterSettings.".concat(activeConfigName, ".filter\" setting '").concat(filterField, "' is not a valid option; use either 'include' or 'exclude'."));
      return false;
    }
    if (biddersField !== '*' && !(Array.isArray(biddersField) && biddersField.length > 0 && biddersField.every(function (bidderInList) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(bidderInList) && bidderInList !== '*';
    }))) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("Detected an invalid setup in userSync \"filterSettings.".concat(activeConfigName, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders."));
      return false;
    }
    return true;
  }

  /**
   * @function syncUsers
   * @summary Trigger all the user syncs based on publisher-defined timeout
   * @public
   * @params {int} timeout The delay in ms before syncing data - default 0
   */
  publicApi.syncUsers = function () {
    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (timeout) {
      return setTimeout(fireSyncs, Number(timeout));
    }
    fireSyncs();
  };

  /**
   * @function triggerUserSyncs
   * @summary A `syncUsers` wrapper for determining if enableOverride has been turned on
   * @public
   */
  publicApi.triggerUserSyncs = function () {
    if (usConfig.enableOverride) {
      publicApi.syncUsers();
    }
  };
  publicApi.canBidderRegisterSync = function (type, bidder) {
    if (usConfig.filterSettings) {
      if (shouldBidderBeBlocked(type, bidder)) {
        return false;
      }
    }
    return true;
  };
  return publicApi;
}
var userSync = newUserSync(Object.defineProperties({
  config: _config_js__WEBPACK_IMPORTED_MODULE_0__.config.getConfig('userSync'),
  isAllowed: _activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.isActivityAllowed,
  regRule: _activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl
}, {
  browserSupportsCookies: {
    get: function get() {
      // call storage lazily to give time for consent data to be available
      return !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isSafariBrowser)() && storage.cookiesAreEnabled();
    }
  }
}));

/**
 * @typedef {Object} UserSyncConfig
 *
 * @property {boolean} enableOverride
 * @property {boolean} syncEnabled
 * @property {int} syncsPerBidder
 * @property {string[]} enabledBidders
 * @property {Object} filterSettings
 */

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_each": function() { return /* binding */ _each; },
/* harmony export */   "_map": function() { return /* binding */ _map; },
/* harmony export */   "_setEventEmitter": function() { return /* binding */ _setEventEmitter; },
/* harmony export */   "adUnitsFilter": function() { return /* binding */ adUnitsFilter; },
/* harmony export */   "bind": function() { return /* binding */ bind; },
/* harmony export */   "buildUrl": function() { return /* binding */ buildUrl; },
/* harmony export */   "callBurl": function() { return /* binding */ callBurl; },
/* harmony export */   "checkCookieSupport": function() { return /* binding */ checkCookieSupport; },
/* harmony export */   "contains": function() { return /* binding */ contains; },
/* harmony export */   "convertTypes": function() { return /* binding */ convertTypes; },
/* harmony export */   "createInvisibleIframe": function() { return /* binding */ createInvisibleIframe; },
/* harmony export */   "cyrb53Hash": function() { return /* binding */ cyrb53Hash; },
/* harmony export */   "deepClone": function() { return /* binding */ deepClone; },
/* harmony export */   "delayExecution": function() { return /* binding */ delayExecution; },
/* harmony export */   "flatten": function() { return /* binding */ flatten; },
/* harmony export */   "generateUUID": function() { return /* binding */ generateUUID; },
/* harmony export */   "getBidRequest": function() { return /* binding */ getBidRequest; },
/* harmony export */   "getBidderCodes": function() { return /* binding */ getBidderCodes; },
/* harmony export */   "getDNT": function() { return /* binding */ getDNT; },
/* harmony export */   "getDefinedParams": function() { return /* binding */ getDefinedParams; },
/* harmony export */   "getHighestCpm": function() { return /* binding */ getHighestCpm; },
/* harmony export */   "getKeyByValue": function() { return /* binding */ getKeyByValue; },
/* harmony export */   "getOldestHighestCpmBid": function() { return /* binding */ getOldestHighestCpmBid; },
/* harmony export */   "getParameterByName": function() { return /* binding */ getParameterByName; },
/* harmony export */   "getPerformanceNow": function() { return /* binding */ getPerformanceNow; },
/* harmony export */   "getPrebidInternal": function() { return /* binding */ getPrebidInternal; },
/* harmony export */   "getUniqueIdentifierStr": function() { return /* binding */ getUniqueIdentifierStr; },
/* harmony export */   "getUserConfiguredParams": function() { return /* binding */ getUserConfiguredParams; },
/* harmony export */   "getValue": function() { return /* binding */ getValue; },
/* harmony export */   "getWindowSelf": function() { return /* binding */ getWindowSelf; },
/* harmony export */   "getWindowTop": function() { return /* binding */ getWindowTop; },
/* harmony export */   "groupBy": function() { return /* binding */ groupBy; },
/* harmony export */   "hasDeviceAccess": function() { return /* binding */ hasDeviceAccess; },
/* harmony export */   "inIframe": function() { return /* binding */ inIframe; },
/* harmony export */   "insertElement": function() { return /* binding */ insertElement; },
/* harmony export */   "insertHtmlIntoIframe": function() { return /* binding */ insertHtmlIntoIframe; },
/* harmony export */   "insertUserSyncIframe": function() { return /* binding */ insertUserSyncIframe; },
/* harmony export */   "isAdUnitCodeMatchingSlot": function() { return /* binding */ isAdUnitCodeMatchingSlot; },
/* harmony export */   "isApnGetTagDefined": function() { return /* binding */ isApnGetTagDefined; },
/* harmony export */   "isArray": function() { return /* binding */ isArray; },
/* harmony export */   "isArrayOfNums": function() { return /* binding */ isArrayOfNums; },
/* harmony export */   "isBoolean": function() { return /* binding */ isBoolean; },
/* harmony export */   "isEmpty": function() { return /* binding */ isEmpty; },
/* harmony export */   "isEmptyStr": function() { return /* binding */ isEmptyStr; },
/* harmony export */   "isFn": function() { return /* binding */ isFn; },
/* harmony export */   "isGptPubadsDefined": function() { return /* binding */ isGptPubadsDefined; },
/* harmony export */   "isInteger": function() { return /* binding */ isInteger; },
/* harmony export */   "isNumber": function() { return /* binding */ isNumber; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; },
/* harmony export */   "isSafariBrowser": function() { return /* binding */ isSafariBrowser; },
/* harmony export */   "isStr": function() { return /* binding */ isStr; },
/* harmony export */   "isValidMediaTypes": function() { return /* binding */ isValidMediaTypes; },
/* harmony export */   "logError": function() { return /* binding */ logError; },
/* harmony export */   "logInfo": function() { return /* binding */ logInfo; },
/* harmony export */   "logMessage": function() { return /* binding */ logMessage; },
/* harmony export */   "logWarn": function() { return /* binding */ logWarn; },
/* harmony export */   "memoize": function() { return /* binding */ memoize; },
/* harmony export */   "mergeDeep": function() { return /* binding */ mergeDeep; },
/* harmony export */   "parseQueryStringParameters": function() { return /* binding */ parseQueryStringParameters; },
/* harmony export */   "parseSizesInput": function() { return /* binding */ parseSizesInput; },
/* harmony export */   "parseUrl": function() { return /* binding */ parseUrl; },
/* harmony export */   "pick": function() { return /* binding */ pick; },
/* harmony export */   "prefixLog": function() { return /* binding */ prefixLog; },
/* harmony export */   "replaceAuctionPrice": function() { return /* binding */ replaceAuctionPrice; },
/* harmony export */   "replaceClickThrough": function() { return /* binding */ replaceClickThrough; },
/* harmony export */   "safeJSONParse": function() { return /* binding */ safeJSONParse; },
/* harmony export */   "setScriptAttributes": function() { return /* binding */ setScriptAttributes; },
/* harmony export */   "shuffle": function() { return /* binding */ shuffle; },
/* harmony export */   "skipUndefinedValues": function() { return /* binding */ skipUndefinedValues; },
/* harmony export */   "timestamp": function() { return /* binding */ timestamp; },
/* harmony export */   "transformAdServerTargetingObj": function() { return /* binding */ transformAdServerTargetingObj; },
/* harmony export */   "triggerPixel": function() { return /* binding */ triggerPixel; },
/* harmony export */   "uniques": function() { return /* binding */ uniques; },
/* harmony export */   "unsupportedBidderMessage": function() { return /* binding */ unsupportedBidderMessage; }
/* harmony export */ });
/* unused harmony exports internal, getBidIdParameter, tryAppendQueryString, getAdUnitSizes, parseGPTSingleSizeArray, parseGPTSingleSizeArrayToRtbSize, getWindowLocation, hasConsoleLogger, debugTurnedOn, isA, hasOwn, waitForElementToLoad, createTrackPixelHtml, createTrackPixelIframeHtml, getValueString, getKeys, getLatestHighestCpmBid, isSlotMatchingAdUnitCode, getGptSlotForAdUnitCode, getGptSlotInfoForAdUnitCode, convertCamelToUnderscore, cleanObj, fill, chunk, getMinValueFromArray, getMaxValueFromArray, compareOn, parseQS, formatQS, deepEqual, getWindowFromDocument, escapeUnsafeChars */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var just_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-clone */ "./node_modules/just-clone/index.js");
/* harmony import */ var just_clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(just_clone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");












var tArr = 'Array';
var tStr = 'String';
var tFn = 'Function';
var tNumb = 'Number';
var tObject = 'Object';
var tBoolean = 'Boolean';
var toString = Object.prototype.toString;
var consoleExists = Boolean(window.console);
var consoleLogExists = Boolean(consoleExists && window.console.log);
var consoleInfoExists = Boolean(consoleExists && window.console.info);
var consoleWarnExists = Boolean(consoleExists && window.console.warn);
var consoleErrorExists = Boolean(consoleExists && window.console.error);
var eventEmitter;
var pbjsInstance = (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_1__.getGlobal)();
function _setEventEmitter(emitFn) {
  // called from events.js - this hoop is to avoid circular imports
  eventEmitter = emitFn;
}
function emitEvent() {
  if (eventEmitter != null) {
    eventEmitter.apply(void 0, arguments);
  }
}

// this allows stubbing of utility functions that are used internally by other utility functions
var internal = {
  checkCookieSupport: checkCookieSupport,
  createTrackPixelIframeHtml: createTrackPixelIframeHtml,
  getWindowSelf: getWindowSelf,
  getWindowTop: getWindowTop,
  getWindowLocation: getWindowLocation,
  insertUserSyncIframe: insertUserSyncIframe,
  insertElement: insertElement,
  isFn: isFn,
  triggerPixel: triggerPixel,
  logError: logError,
  logWarn: logWarn,
  logMessage: logMessage,
  logInfo: logInfo,
  parseQS: parseQS,
  formatQS: formatQS,
  deepEqual: deepEqual,
  isEmpty: isEmpty,
  skipUndefinedValues: skipUndefinedValues
};
var prebidInternal = {};
/**
 * Returns object that is used as internal prebid namespace
 */
function getPrebidInternal() {
  return prebidInternal;
}
var uniqueRef = {};
var bind = function (a, b) {
  return b;
}.bind(null, 1, uniqueRef)() === uniqueRef ? Function.prototype.bind : function (bind) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return self.apply(bind, args.concat(Array.prototype.slice.call(arguments)));
  };
};

/* utility method to get incremental integer starting from 1 */
var getIncrementalInteger = function () {
  var count = 0;
  return function () {
    count++;
    return count;
  };
}();

// generate a random string (to be used as a dynamic JSONP callback)
function getUniqueIdentifierStr() {
  return getIncrementalInteger() + Math.random().toString(16).substr(2);
}

/**
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f,
 * and y is replaced with a random hexadecimal digit from 8 to b.
 * https://gist.github.com/jed/982883 via node-uuid
 */
function generateUUID(placeholder) {
  return placeholder ? (placeholder ^ _getRandomData() >> placeholder / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUID);
}

/**
 * Returns random data using the Crypto API if available and Math.random if not
 * Method is from https://gist.github.com/jed/982883 like generateUUID, direct link https://gist.github.com/jed/982883#gistcomment-45104
 */
function _getRandomData() {
  if (window && window.crypto && window.crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint8Array(1))[0] % 16;
  } else {
    return Math.random() * 16;
  }
}
function getBidIdParameter(key, paramsObj) {
  if (paramsObj && paramsObj[key]) {
    return paramsObj[key];
  }
  return '';
}
function tryAppendQueryString(existingUrl, key, value) {
  if (value) {
    return existingUrl + key + '=' + encodeURIComponent(value) + '&';
  }
  return existingUrl;
}

// parse a query string object passed in bid params
// bid params should be an object such as {key: "value", key1 : "value1"}
// aliases to formatQS
function parseQueryStringParameters(queryObj) {
  var result = '';
  for (var k in queryObj) {
    if (queryObj.hasOwnProperty(k)) {
      result += k + '=' + encodeURIComponent(queryObj[k]) + '&';
    }
  }
  result = result.replace(/&$/, '');
  return result;
}

// transform an AdServer targeting bids into a query string to send to the adserver
function transformAdServerTargetingObj(targeting) {
  // we expect to receive targeting for a single slot at a time
  if (targeting && Object.getOwnPropertyNames(targeting).length > 0) {
    return getKeys(targeting).map(function (key) {
      return "".concat(key, "=").concat(encodeURIComponent(getValue(targeting, key)));
    }).join('&');
  } else {
    return '';
  }
}

/**
 * Read an adUnit object and return the sizes used in an [[728, 90]] format (even if they had [728, 90] defined)
 * Preference is given to the `adUnit.mediaTypes.banner.sizes` object over the `adUnit.sizes`
 * @param {object} adUnit one adUnit object from the normal list of adUnits
 * @returns {Array.<number[]>} array of arrays containing numeric sizes
 */
function getAdUnitSizes(adUnit) {
  if (!adUnit) {
    return;
  }
  var sizes = [];
  if (adUnit.mediaTypes && adUnit.mediaTypes.banner && Array.isArray(adUnit.mediaTypes.banner.sizes)) {
    var bannerSizes = adUnit.mediaTypes.banner.sizes;
    if (Array.isArray(bannerSizes[0])) {
      sizes = bannerSizes;
    } else {
      sizes.push(bannerSizes);
    }
    // TODO - remove this else block when we're ready to deprecate adUnit.sizes for bidders
  } else if (Array.isArray(adUnit.sizes)) {
    if (Array.isArray(adUnit.sizes[0])) {
      sizes = adUnit.sizes;
    } else {
      sizes.push(adUnit.sizes);
    }
  }
  return sizes;
}

/**
 * Parse a GPT-Style general size Array like `[[300, 250]]` or `"300x250,970x90"` into an array of sizes `["300x250"]` or '['300x250', '970x90']'
 * @param  {(Array.<number[]>|Array.<number>)} sizeObj Input array or double array [300,250] or [[300,250], [728,90]]
 * @return {Array.<string>}  Array of strings like `["300x250"]` or `["300x250", "728x90"]`
 */
function parseSizesInput(sizeObj) {
  var parsedSizes = [];

  // if a string for now we can assume it is a single size, like "300x250"
  if (typeof sizeObj === 'string') {
    // multiple sizes will be comma-separated
    var sizes = sizeObj.split(',');

    // regular expression to match strigns like 300x250
    // start of line, at least 1 number, an "x" , then at least 1 number, and the then end of the line
    var sizeRegex = /^(\d)+x(\d)+$/i;
    if (sizes) {
      for (var curSizePos in sizes) {
        if (hasOwn(sizes, curSizePos) && sizes[curSizePos].match(sizeRegex)) {
          parsedSizes.push(sizes[curSizePos]);
        }
      }
    }
  } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(sizeObj) === 'object') {
    var sizeArrayLength = sizeObj.length;

    // don't process empty array
    if (sizeArrayLength > 0) {
      // if we are a 2 item array of 2 numbers, we must be a SingleSize array
      if (sizeArrayLength === 2 && typeof sizeObj[0] === 'number' && typeof sizeObj[1] === 'number') {
        parsedSizes.push(parseGPTSingleSizeArray(sizeObj));
      } else {
        // otherwise, we must be a MultiSize array
        for (var i = 0; i < sizeArrayLength; i++) {
          parsedSizes.push(parseGPTSingleSizeArray(sizeObj[i]));
        }
      }
    }
  }
  return parsedSizes;
}

// Parse a GPT style single size array, (i.e [300, 250])
// into an AppNexus style string, (i.e. 300x250)
function parseGPTSingleSizeArray(singleSize) {
  if (isValidGPTSingleSize(singleSize)) {
    return singleSize[0] + 'x' + singleSize[1];
  }
}

// Parse a GPT style single size array, (i.e [300, 250])
// into OpenRTB-compatible (imp.banner.w/h, imp.banner.format.w/h, imp.video.w/h) object(i.e. {w:300, h:250})
function parseGPTSingleSizeArrayToRtbSize(singleSize) {
  if (isValidGPTSingleSize(singleSize)) {
    return {
      w: singleSize[0],
      h: singleSize[1]
    };
  }
}
function isValidGPTSingleSize(singleSize) {
  // if we aren't exactly 2 items in this array, it is invalid
  return isArray(singleSize) && singleSize.length === 2 && !isNaN(singleSize[0]) && !isNaN(singleSize[1]);
}
function getWindowTop() {
  return window.top;
}
function getWindowSelf() {
  return window.self;
}
function getWindowLocation() {
  return window.location;
}

/**
 * Wrappers to console.(log | info | warn | error). Takes N arguments, the same as the native methods
 */
function logMessage() {
  if (debugTurnedOn() && consoleLogExists) {
    // eslint-disable-next-line no-console
    console.log.apply(console, decorateLog(arguments, 'MESSAGE:'));
  }
}
function logInfo() {
  if (debugTurnedOn() && consoleInfoExists) {
    // eslint-disable-next-line no-console
    console.info.apply(console, decorateLog(arguments, 'INFO:'));
  }
}
function logWarn() {
  if (debugTurnedOn() && consoleWarnExists) {
    // eslint-disable-next-line no-console
    console.warn.apply(console, decorateLog(arguments, 'WARNING:'));
  }
  emitEvent(_constants_json__WEBPACK_IMPORTED_MODULE_3__.EVENTS.AUCTION_DEBUG, {
    type: 'WARNING',
    arguments: arguments
  });
}
function logError() {
  if (debugTurnedOn() && consoleErrorExists) {
    // eslint-disable-next-line no-console
    console.error.apply(console, decorateLog(arguments, 'ERROR:'));
  }
  emitEvent(_constants_json__WEBPACK_IMPORTED_MODULE_3__.EVENTS.AUCTION_DEBUG, {
    type: 'ERROR',
    arguments: arguments
  });
}
function prefixLog(prefix) {
  function decorate(fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      fn.apply(void 0, [prefix].concat(args));
    };
  }
  return {
    logError: decorate(logError),
    logWarn: decorate(logWarn),
    logMessage: decorate(logMessage),
    logInfo: decorate(logInfo)
  };
}
function decorateLog(args, prefix) {
  args = [].slice.call(args);
  var bidder = _config_js__WEBPACK_IMPORTED_MODULE_4__.config.getCurrentBidder();
  prefix && args.unshift(prefix);
  if (bidder) {
    args.unshift(label('#aaa'));
  }
  args.unshift(label('#3b88c3'));
  args.unshift('%cPrebid' + (bidder ? "%c".concat(bidder) : ''));
  return args;
  function label(color) {
    return "display: inline-block; color: #fff; background: ".concat(color, "; padding: 1px 4px; border-radius: 3px;");
  }
}
function hasConsoleLogger() {
  return consoleLogExists;
}
function debugTurnedOn() {
  return !!_config_js__WEBPACK_IMPORTED_MODULE_4__.config.getConfig('debug');
}
function createInvisibleIframe() {
  var f = document.createElement('iframe');
  f.id = getUniqueIdentifierStr();
  f.height = 0;
  f.width = 0;
  f.border = '0px';
  f.hspace = '0';
  f.vspace = '0';
  f.marginWidth = '0';
  f.marginHeight = '0';
  f.style.border = '0';
  f.scrolling = 'no';
  f.frameBorder = '0';
  f.src = 'about:blank';
  f.style.display = 'none';
  return f;
}

/*
 *   Check if a given parameter name exists in query string
 *   and if it does return the value
 */
function getParameterByName(name) {
  return parseQS(getWindowLocation().search)[name] || '';
}

/**
 * Return if the object is of the
 * given type.
 * @param {*} object to test
 * @param {String} _t type string (e.g., Array)
 * @return {Boolean} if object is of type _t
 */
function isA(object, _t) {
  return toString.call(object) === '[object ' + _t + ']';
}
function isFn(object) {
  return isA(object, tFn);
}
function isStr(object) {
  return isA(object, tStr);
}
function isArray(object) {
  return isA(object, tArr);
}
function isNumber(object) {
  return isA(object, tNumb);
}
function isPlainObject(object) {
  return isA(object, tObject);
}
function isBoolean(object) {
  return isA(object, tBoolean);
}

/**
 * Return if the object is "empty";
 * this includes falsey, no keys, or no items at indices
 * @param {*} object object to test
 * @return {Boolean} if object is empty
 */
function isEmpty(object) {
  if (!object) return true;
  if (isArray(object) || isStr(object)) {
    return !(object.length > 0);
  }
  for (var k in object) {
    if (hasOwnProperty.call(object, k)) return false;
  }
  return true;
}

/**
 * Return if string is empty, null, or undefined
 * @param str string to test
 * @returns {boolean} if string is empty
 */
function isEmptyStr(str) {
  return isStr(str) && (!str || str.length === 0);
}

/**
 * Iterate object with the function
 * falls back to es5 `forEach`
 * @param {Array|Object} object
 * @param {Function(value, key, object)} fn
 */
function _each(object, fn) {
  if (isEmpty(object)) return;
  if (isFn(object.forEach)) return object.forEach(fn, this);
  var k = 0;
  var l = object.length;
  if (l > 0) {
    for (; k < l; k++) {
      fn(object[k], k, object);
    }
  } else {
    for (k in object) {
      if (hasOwnProperty.call(object, k)) fn.call(this, object[k], k);
    }
  }
}
function contains(a, obj) {
  if (isEmpty(a)) {
    return false;
  }
  if (isFn(a.indexOf)) {
    return a.indexOf(obj) !== -1;
  }
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

/**
 * Map an array or object into another array
 * given a function
 * @param {Array|Object} object
 * @param {Function(value, key, object)} callback
 * @return {Array}
 */
function _map(object, callback) {
  if (isEmpty(object)) return [];
  if (isFn(object.map)) return object.map(callback);
  var output = [];
  _each(object, function (value, key) {
    output.push(callback(value, key, object));
  });
  return output;
}
function hasOwn(objectToCheck, propertyToCheckFor) {
  if (objectToCheck.hasOwnProperty) {
    return objectToCheck.hasOwnProperty(propertyToCheckFor);
  } else {
    return typeof objectToCheck[propertyToCheckFor] !== 'undefined' && objectToCheck.constructor.prototype[propertyToCheckFor] !== objectToCheck[propertyToCheckFor];
  }
}
;

/*
* Inserts an element(elm) as targets child, by default as first child
* @param {HTMLElement} elm
* @param {HTMLElement} [doc]
* @param {HTMLElement} [target]
* @param {Boolean} [asLastChildChild]
* @return {HTML Element}
*/
function insertElement(elm, doc, target, asLastChildChild) {
  doc = doc || document;
  var parentEl;
  if (target) {
    parentEl = doc.getElementsByTagName(target);
  } else {
    parentEl = doc.getElementsByTagName('head');
  }
  try {
    parentEl = parentEl.length ? parentEl : doc.getElementsByTagName('body');
    if (parentEl.length) {
      parentEl = parentEl[0];
      var insertBeforeEl = asLastChildChild ? null : parentEl.firstChild;
      return parentEl.insertBefore(elm, insertBeforeEl);
    }
  } catch (e) {}
}

/**
 * Returns a promise that completes when the given element triggers a 'load' or 'error' DOM event, or when
 * `timeout` milliseconds have elapsed.
 *
 * @param {HTMLElement} element
 * @param {Number} [timeout]
 * @returns {Promise}
 */
function waitForElementToLoad(element, timeout) {
  var timer = null;
  return new _utils_promise_js__WEBPACK_IMPORTED_MODULE_5__.GreedyPromise(function (resolve) {
    var onLoad = function onLoad() {
      element.removeEventListener('load', onLoad);
      element.removeEventListener('error', onLoad);
      if (timer != null) {
        window.clearTimeout(timer);
      }
      resolve();
    };
    element.addEventListener('load', onLoad);
    element.addEventListener('error', onLoad);
    if (timeout != null) {
      timer = window.setTimeout(onLoad, timeout);
    }
  });
}

/**
 * Inserts an image pixel with the specified `url` for cookie sync
 * @param {string} url URL string of the image pixel to load
 * @param  {function} [done] an optional exit callback, used when this usersync pixel is added during an async process
 * @param  {Number} [timeout] an optional timeout in milliseconds for the image to load before calling `done`
 */
function triggerPixel(url, done, timeout) {
  var img = new Image();
  if (done && internal.isFn(done)) {
    waitForElementToLoad(img, timeout).then(done);
  }
  img.src = url;
}
function callBurl(_ref) {
  var source = _ref.source,
    burl = _ref.burl;
  if (source === _constants_json__WEBPACK_IMPORTED_MODULE_3__.S2S.SRC && burl) {
    internal.triggerPixel(burl);
  }
}

/**
 * Inserts an empty iframe with the specified `html`, primarily used for tracking purposes
 * (though could be for other purposes)
 * @param {string} htmlCode snippet of HTML code used for tracking purposes
 */
function insertHtmlIntoIframe(htmlCode) {
  if (!htmlCode) {
    return;
  }
  var iframe = document.createElement('iframe');
  iframe.id = getUniqueIdentifierStr();
  iframe.width = 0;
  iframe.height = 0;
  iframe.hspace = '0';
  iframe.vspace = '0';
  iframe.marginWidth = '0';
  iframe.marginHeight = '0';
  iframe.style.display = 'none';
  iframe.style.height = '0px';
  iframe.style.width = '0px';
  iframe.scrolling = 'no';
  iframe.frameBorder = '0';
  iframe.allowtransparency = 'true';
  internal.insertElement(iframe, document, 'body');
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(htmlCode);
  iframe.contentWindow.document.close();
}

/**
 * Inserts empty iframe with the specified `url` for cookie sync
 * @param  {string} url URL to be requested
 * @param  {string} encodeUri boolean if URL should be encoded before inserted. Defaults to true
 * @param  {function} [done] an optional exit callback, used when this usersync pixel is added during an async process
 * @param  {Number} [timeout] an optional timeout in milliseconds for the iframe to load before calling `done`
 */
function insertUserSyncIframe(url, done, timeout) {
  var iframeHtml = internal.createTrackPixelIframeHtml(url, false, 'allow-scripts allow-same-origin');
  var div = document.createElement('div');
  div.innerHTML = iframeHtml;
  var iframe = div.firstChild;
  if (done && internal.isFn(done)) {
    waitForElementToLoad(iframe, timeout).then(done);
  }
  internal.insertElement(iframe, document, 'html', true);
}

/**
 * Creates a snippet of HTML that retrieves the specified `url`
 * @param  {string} url URL to be requested
 * @return {string}     HTML snippet that contains the img src = set to `url`
 */
function createTrackPixelHtml(url) {
  if (!url) {
    return '';
  }
  var escapedUrl = encodeURI(url);
  var img = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
  img += '<img src="' + escapedUrl + '"></div>';
  return img;
}
;

/**
 * Creates a snippet of Iframe HTML that retrieves the specified `url`
 * @param  {string} url plain URL to be requested
 * @param  {string} encodeUri boolean if URL should be encoded before inserted. Defaults to true
 * @param  {string} sandbox string if provided the sandbox attribute will be included with the given value
 * @return {string}     HTML snippet that contains the iframe src = set to `url`
 */
function createTrackPixelIframeHtml(url) {
  var encodeUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var sandbox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (!url) {
    return '';
  }
  if (encodeUri) {
    url = encodeURI(url);
  }
  if (sandbox) {
    sandbox = "sandbox=\"".concat(sandbox, "\"");
  }
  return "<iframe ".concat(sandbox, " id=\"").concat(getUniqueIdentifierStr(), "\"\n      frameborder=\"0\"\n      allowtransparency=\"true\"\n      marginheight=\"0\" marginwidth=\"0\"\n      width=\"0\" hspace=\"0\" vspace=\"0\" height=\"0\"\n      style=\"height:0px;width:0px;display:none;\"\n      scrolling=\"no\"\n      src=\"").concat(url, "\">\n    </iframe>");
}
function getValueString(param, val, defaultValue) {
  if (val === undefined || val === null) {
    return defaultValue;
  }
  if (isStr(val)) {
    return val;
  }
  if (isNumber(val)) {
    return val.toString();
  }
  internal.logWarn('Unsuported type for param: ' + param + ' required type: String');
}
function uniques(value, index, arry) {
  return arry.indexOf(value) === index;
}
function flatten(a, b) {
  return a.concat(b);
}
function getBidRequest(id, bidderRequests) {
  if (!id) {
    return;
  }
  var bidRequest;
  bidderRequests.some(function (bidderRequest) {
    var result = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_6__.find)(bidderRequest.bids, function (bid) {
      return ['bidId', 'adId', 'bid_id'].some(function (type) {
        return bid[type] === id;
      });
    });
    if (result) {
      bidRequest = result;
    }
    return result;
  });
  return bidRequest;
}
function getKeys(obj) {
  return Object.keys(obj);
}
function getValue(obj, key) {
  return obj[key];
}

/**
 * Get the key of an object for a given value
 */
function getKeyByValue(obj, value) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) {
        return prop;
      }
    }
  }
}
function getBidderCodes() {
  var adUnits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pbjsInstance.adUnits;
  // this could memoize adUnits
  return adUnits.map(function (unit) {
    return unit.bids.map(function (bid) {
      return bid.bidder;
    }).reduce(flatten, []);
  }).reduce(flatten, []).filter(function (bidder) {
    return typeof bidder !== 'undefined';
  }).filter(uniques);
}
function isGptPubadsDefined() {
  if (window.googletag && isFn(window.googletag.pubads) && isFn(window.googletag.pubads().getSlots)) {
    return true;
  }
}
function isApnGetTagDefined() {
  if (window.apntag && isFn(window.apntag.getTag)) {
    return true;
  }
}

// This function will get highest cpm value bid, in case of tie it will return the bid with lowest timeToRespond
var getHighestCpm = getHighestCpmCallback('timeToRespond', function (previous, current) {
  return previous > current;
});

// This function will get the oldest hightest cpm value bid, in case of tie it will return the bid which came in first
// Use case for tie: https://github.com/prebid/Prebid.js/issues/2448
var getOldestHighestCpmBid = getHighestCpmCallback('responseTimestamp', function (previous, current) {
  return previous > current;
});

// This function will get the latest hightest cpm value bid, in case of tie it will return the bid which came in last
// Use case for tie: https://github.com/prebid/Prebid.js/issues/2539
var getLatestHighestCpmBid = getHighestCpmCallback('responseTimestamp', function (previous, current) {
  return previous < current;
});
function getHighestCpmCallback(useTieBreakerProperty, tieBreakerCallback) {
  return function (previous, current) {
    if (previous.cpm === current.cpm) {
      return tieBreakerCallback(previous[useTieBreakerProperty], current[useTieBreakerProperty]) ? current : previous;
    }
    return previous.cpm < current.cpm ? current : previous;
  };
}

/**
 * Fisher–Yates shuffle
 * http://stackoverflow.com/a/6274398
 * https://bost.ocks.org/mike/shuffle/
 * istanbul ignore next
 */
function shuffle(array) {
  var counter = array.length;

  // while there are elements in the array
  while (counter > 0) {
    // pick a random index
    var index = Math.floor(Math.random() * counter);

    // decrease counter by 1
    counter--;

    // and swap the last element with it
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
function adUnitsFilter(filter, bid) {
  return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_6__.includes)(filter, bid && bid.adUnitCode);
}
function deepClone(obj) {
  return just_clone__WEBPACK_IMPORTED_MODULE_0___default()(obj);
}
function inIframe() {
  try {
    return internal.getWindowSelf() !== internal.getWindowTop();
  } catch (e) {
    return true;
  }
}
function isSafariBrowser() {
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
}
function replaceAuctionPrice(str, cpm) {
  if (!str) return;
  return str.replace(/\$\{AUCTION_PRICE\}/g, cpm);
}
function replaceClickThrough(str, clicktag) {
  if (!str || !clicktag || typeof clicktag !== 'string') return;
  return str.replace(/\${CLICKTHROUGH}/g, clicktag);
}
function timestamp() {
  return new Date().getTime();
}

/**
 * The returned value represents the time elapsed since the time origin. @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
 * @returns {number}
 */
function getPerformanceNow() {
  return window.performance && window.performance.now && window.performance.now() || 0;
}

/**
 * When the deviceAccess flag config option is false, no cookies should be read or set
 * @returns {boolean}
 */
function hasDeviceAccess() {
  return _config_js__WEBPACK_IMPORTED_MODULE_4__.config.getConfig('deviceAccess') !== false;
}

/**
 * @returns {(boolean|undefined)}
 */
function checkCookieSupport() {
  if (window.navigator.cookieEnabled || !!document.cookie.length) {
    return true;
  }
}

/**
 * Given a function, return a function which only executes the original after
 * it's been called numRequiredCalls times.
 *
 * Note that the arguments from the previous calls will *not* be forwarded to the original function.
 * Only the final call's arguments matter.
 *
 * @param {function} func The function which should be executed, once the returned function has been executed
 *   numRequiredCalls times.
 * @param {int} numRequiredCalls The number of times which the returned function needs to be called before
 *   func is.
 */
function delayExecution(func, numRequiredCalls) {
  if (numRequiredCalls < 1) {
    throw new Error("numRequiredCalls must be a positive number. Got ".concat(numRequiredCalls));
  }
  var numCalls = 0;
  return function () {
    numCalls++;
    if (numCalls === numRequiredCalls) {
      func.apply(this, arguments);
    }
  };
}

/**
 * https://stackoverflow.com/a/34890276/428704
 * @export
 * @param {array} xs
 * @param {string} key
 * @returns {Object} {${key_value}: ${groupByArray}, key_value: {groupByArray}}
 */
function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

/**
 * Build an object consisting of only defined parameters to avoid creating an
 * object with defined keys and undefined values.
 * @param {Object} object The object to pick defined params out of
 * @param {string[]} params An array of strings representing properties to look for in the object
 * @returns {Object} An object containing all the specified values that are defined
 */
function getDefinedParams(object, params) {
  return params.filter(function (param) {
    return object[param];
  }).reduce(function (bid, param) {
    return Object.assign(bid, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, param, object[param]));
  }, {});
}

/**
 * @typedef {Object} MediaTypes
 * @property {Object} banner banner configuration
 * @property {Object} native native configuration
 * @property {Object} video video configuration
 */

/**
 * Validates an adunit's `mediaTypes` parameter
 * @param {MediaTypes} mediaTypes mediaTypes parameter to validate
 * @return {boolean} If object is valid
 */
function isValidMediaTypes(mediaTypes) {
  var SUPPORTED_MEDIA_TYPES = ['banner', 'native', 'video'];
  var SUPPORTED_STREAM_TYPES = ['instream', 'outstream', 'adpod'];
  var types = Object.keys(mediaTypes);
  if (!types.every(function (type) {
    return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_6__.includes)(SUPPORTED_MEDIA_TYPES, type);
  })) {
    return false;
  }
  if ( true && mediaTypes.video && mediaTypes.video.context) {
    return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_6__.includes)(SUPPORTED_STREAM_TYPES, mediaTypes.video.context);
  }
  return true;
}

/**
 * Returns user configured bidder params from adunit
 * @param {Object} adUnits
 * @param {string} adUnitCode code
 * @param {string} bidder code
 * @return {Array} user configured param for the given bidder adunit configuration
 */
function getUserConfiguredParams(adUnits, adUnitCode, bidder) {
  return adUnits.filter(function (adUnit) {
    return adUnit.code === adUnitCode;
  }).map(function (adUnit) {
    return adUnit.bids;
  }).reduce(flatten, []).filter(function (bidderData) {
    return bidderData.bidder === bidder;
  }).map(function (bidderData) {
    return bidderData.params || {};
  });
}

/**
 * Returns Do Not Track state
 */
function getDNT() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1' || navigator.doNotTrack === 'yes';
}
var compareCodeAndSlot = function compareCodeAndSlot(slot, adUnitCode) {
  return slot.getAdUnitPath() === adUnitCode || slot.getSlotElementId() === adUnitCode;
};

/**
 * Returns filter function to match adUnitCode in slot
 * @param {Object} slot GoogleTag slot
 * @return {function} filter function
 */
function isAdUnitCodeMatchingSlot(slot) {
  return function (adUnitCode) {
    return compareCodeAndSlot(slot, adUnitCode);
  };
}

/**
 * Returns filter function to match adUnitCode in slot
 * @param {string} adUnitCode AdUnit code
 * @return {function} filter function
 */
function isSlotMatchingAdUnitCode(adUnitCode) {
  return function (slot) {
    return compareCodeAndSlot(slot, adUnitCode);
  };
}

/**
 * @summary Uses the adUnit's code in order to find a matching gpt slot object on the page
 */
function getGptSlotForAdUnitCode(adUnitCode) {
  var matchingSlot;
  if (isGptPubadsDefined()) {
    // find the first matching gpt slot on the page
    matchingSlot = (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_6__.find)(window.googletag.pubads().getSlots(), isSlotMatchingAdUnitCode(adUnitCode));
  }
  return matchingSlot;
}
;

/**
 * @summary Uses the adUnit's code in order to find a matching gptSlot on the page
 */
function getGptSlotInfoForAdUnitCode(adUnitCode) {
  var matchingSlot = getGptSlotForAdUnitCode(adUnitCode);
  if (matchingSlot) {
    return {
      gptSlot: matchingSlot.getAdUnitPath(),
      divId: matchingSlot.getSlotElementId()
    };
  }
  return {};
}
;

/**
 * Constructs warning message for when unsupported bidders are dropped from an adunit
 * @param {Object} adUnit ad unit from which the bidder is being dropped
 * @param {string} bidder bidder code that is not compatible with the adUnit
 * @return {string} warning message to display when condition is met
 */
function unsupportedBidderMessage(adUnit, bidder) {
  var mediaType = Object.keys(adUnit.mediaTypes || {
    'banner': 'banner'
  }).join(', ');
  return "\n    ".concat(adUnit.code, " is a ").concat(mediaType, " ad unit\n    containing bidders that don't support ").concat(mediaType, ": ").concat(bidder, ".\n    This bidder won't fetch demand.\n  ");
}

/**
 * Checks input is integer or not
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value
 */
function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  } else {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }
}

/**
 * Converts a string value in camel-case to underscore eg 'placementId' becomes 'placement_id'
 * @param {string} value string value to convert
 */
function convertCamelToUnderscore(value) {
  return value.replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
    return '_' + y.toLowerCase();
  }).replace(/^_/, '');
}

/**
 * Returns a new object with undefined properties removed from given object
 * @param obj the object to clean
 */
function cleanObj(obj) {
  return Object.keys(obj).reduce(function (newObj, key) {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}

/**
 * Create a new object with selected properties.  Also allows property renaming and transform functions.
 * @param obj the original object
 * @param properties An array of desired properties
 */
function pick(obj, properties) {
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(obj) !== 'object') {
    return {};
  }
  return properties.reduce(function (newObj, prop, i) {
    if (typeof prop === 'function') {
      return newObj;
    }
    var newProp = prop;
    var match = prop.match(/^(.+?)\sas\s(.+?)$/i);
    if (match) {
      prop = match[1];
      newProp = match[2];
    }
    var value = obj[prop];
    if (typeof properties[i + 1] === 'function') {
      value = properties[i + 1](value, newObj);
    }
    if (typeof value !== 'undefined') {
      newObj[newProp] = value;
    }
    return newObj;
  }, {});
}

/**
 * Try to convert a value to a type.
 * If it can't be done, the value will be returned.
 *
 * @param {string} typeToConvert The target type. e.g. "string", "number", etc.
 * @param {*} value The value to be converted into typeToConvert.
 */
function tryConvertType(typeToConvert, value) {
  if (typeToConvert === 'string') {
    return value && value.toString();
  } else if (typeToConvert === 'number') {
    return Number(value);
  } else {
    return value;
  }
}
function convertTypes(types, params) {
  Object.keys(types).forEach(function (key) {
    if (params[key]) {
      if (isFn(types[key])) {
        params[key] = types[key](params[key]);
      } else {
        params[key] = tryConvertType(types[key], params[key]);
      }

      // don't send invalid values
      if (isNaN(params[key])) {
        delete params.key;
      }
    }
  });
  return params;
}
function isArrayOfNums(val, size) {
  return isArray(val) && (size ? val.length === size : true) && val.every(function (v) {
    return isInteger(v);
  });
}

/**
 * Creates an array of n length and fills each item with the given value
 */
function fill(value, length) {
  var newArray = [];
  for (var i = 0; i < length; i++) {
    var valueToPush = isPlainObject(value) ? deepClone(value) : value;
    newArray.push(valueToPush);
  }
  return newArray;
}

/**
 * http://npm.im/chunk
 * Returns an array with *size* chunks from given array
 *
 * Example:
 * ['a', 'b', 'c', 'd', 'e'] chunked by 2 =>
 * [['a', 'b'], ['c', 'd'], ['e']]
 */
function chunk(array, size) {
  var newArray = [];
  for (var i = 0; i < Math.ceil(array.length / size); i++) {
    var start = i * size;
    var end = start + size;
    newArray.push(array.slice(start, end));
  }
  return newArray;
}
function getMinValueFromArray(array) {
  return Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__["default"])(array));
}
function getMaxValueFromArray(array) {
  return Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__["default"])(array));
}

/**
 * This function will create compare function to sort on object property
 * @param {string} property
 * @returns {function} compare function to be used in sorting
 */
function compareOn(property) {
  return function compare(a, b) {
    if (a[property] < b[property]) {
      return 1;
    }
    if (a[property] > b[property]) {
      return -1;
    }
    return 0;
  };
}
function parseQS(query) {
  return !query ? {} : query.replace(/^\?/, '').split('&').reduce(function (acc, criteria) {
    var _criteria$split = criteria.split('='),
      _criteria$split2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_9__["default"])(_criteria$split, 2),
      k = _criteria$split2[0],
      v = _criteria$split2[1];
    if (/\[\]$/.test(k)) {
      k = k.replace('[]', '');
      acc[k] = acc[k] || [];
      acc[k].push(v);
    } else {
      acc[k] = v || '';
    }
    return acc;
  }, {});
}
function formatQS(query) {
  return Object.keys(query).map(function (k) {
    return Array.isArray(query[k]) ? query[k].map(function (v) {
      return "".concat(k, "[]=").concat(v);
    }).join('&') : "".concat(k, "=").concat(query[k]);
  }).join('&');
}
function parseUrl(url, options) {
  var parsed = document.createElement('a');
  if (options && 'noDecodeWholeURL' in options && options.noDecodeWholeURL) {
    parsed.href = url;
  } else {
    parsed.href = decodeURIComponent(url);
  }
  // in window.location 'search' is string, not object
  var qsAsString = options && 'decodeSearchAsString' in options && options.decodeSearchAsString;
  return {
    href: parsed.href,
    protocol: (parsed.protocol || '').replace(/:$/, ''),
    hostname: parsed.hostname,
    port: +parsed.port,
    pathname: parsed.pathname.replace(/^(?!\/)/, '/'),
    search: qsAsString ? parsed.search : internal.parseQS(parsed.search || ''),
    hash: (parsed.hash || '').replace(/^#/, ''),
    host: parsed.host || window.location.host
  };
}
function buildUrl(obj) {
  return (obj.protocol || 'http') + '://' + (obj.host || obj.hostname + (obj.port ? ":".concat(obj.port) : '')) + (obj.pathname || '') + (obj.search ? "?".concat(internal.formatQS(obj.search || '')) : '') + (obj.hash ? "#".concat(obj.hash) : '');
}

/**
 * This function deeply compares two objects checking for their equivalence.
 * @param {Object} obj1
 * @param {Object} obj2
 * @param checkTypes {boolean} if set, two objects with identical properties but different constructors will *not*
 * be considered equivalent.
 * @returns {boolean}
 */
function deepEqual(obj1, obj2) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref2$checkTypes = _ref2.checkTypes,
    checkTypes = _ref2$checkTypes === void 0 ? false : _ref2$checkTypes;
  if (obj1 === obj2) return true;else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(obj1) === 'object' && obj1 !== null && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(obj2) === 'object' && obj2 !== null && (!checkTypes || obj1.constructor === obj2.constructor)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (var prop in obj1) {
      if (obj2.hasOwnProperty(prop)) {
        if (!deepEqual(obj1[prop], obj2[prop], {
          checkTypes: checkTypes
        })) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
function mergeDeep(target) {
  for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }
  if (!sources.length) return target;
  var source = sources.shift();
  if (isPlainObject(target) && isPlainObject(source)) {
    var _loop = function _loop(key) {
      if (isPlainObject(source[key])) {
        if (!target[key]) Object.assign(target, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key, {}));
        mergeDeep(target[key], source[key]);
      } else if (isArray(source[key])) {
        if (!target[key]) {
          Object.assign(target, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__["default"])(source[key])));
        } else if (isArray(target[key])) {
          source[key].forEach(function (obj) {
            var addItFlag = 1;
            for (var i = 0; i < target[key].length; i++) {
              if (deepEqual(target[key][i], obj)) {
                addItFlag = 0;
                break;
              }
            }
            if (addItFlag) {
              target[key].push(obj);
            }
          });
        }
      } else {
        Object.assign(target, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, key, source[key]));
      }
    };
    for (var key in source) {
      _loop(key);
    }
  }
  return mergeDeep.apply(void 0, [target].concat(sources));
}

/**
 * returns a hash of a string using a fast algorithm
 * source: https://stackoverflow.com/a/52171480/845390
 * @param str
 * @param seed (optional)
 * @returns {string}
 */
function cyrb53Hash(str) {
  var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // IE doesn't support imul
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul#Polyfill
  var imul = function imul(opA, opB) {
    if (isFn(Math.imul)) {
      return Math.imul(opA, opB);
    } else {
      opB |= 0; // ensure that opB is an integer. opA will automatically be coerced.
      // floating points give us 53 bits of precision to work with plus 1 sign bit
      // automatically handled for our convienence:
      // 1. 0x003fffff /*opA & 0x000fffff*/ * 0x7fffffff /*opB*/ = 0x1fffff7fc00001
      //    0x1fffff7fc00001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
      var result = (opA & 0x003fffff) * opB;
      // 2. We can remove an integer coersion from the statement above because:
      //    0x1fffff7fc00001 + 0xffc00000 = 0x1fffffff800001
      //    0x1fffffff800001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
      if (opA & 0xffc00000) result += (opA & 0xffc00000) * opB | 0;
      return result | 0;
    }
  };
  var h1 = 0xdeadbeef ^ seed;
  var h2 = 0x41c6ce57 ^ seed;
  for (var i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = imul(h1 ^ ch, 2654435761);
    h2 = imul(h2 ^ ch, 1597334677);
  }
  h1 = imul(h1 ^ h1 >>> 16, 2246822507) ^ imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = imul(h2 ^ h2 >>> 16, 2246822507) ^ imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
}
function skipUndefinedValues(obj) {
  var newObj = {};
  var prop;
  for (prop in obj) {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

/**
 * returns a window object, which holds the provided document or null
 * @param {Document} doc
 * @returns {Window}
 */
function getWindowFromDocument(doc) {
  return doc ? doc.defaultView : null;
}

/**
 * returns the result of `JSON.parse(data)`, or undefined if that throws an error.
 * @param data
 * @returns {any}
 */
function safeJSONParse(data) {
  try {
    return JSON.parse(data);
  } catch (e) {}
}

/**
 * Returns a memoized version of `fn`.
 *
 * @param fn
 * @param key cache key generator, invoked with the same arguments passed to `fn`.
 *        By default, the first argument is used as key.
 * @return {function(): any}
 */
function memoize(fn) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (arg) {
    return arg;
  };
  var cache = new Map();
  var memoized = function memoized() {
    var cacheKey = key.apply(this, arguments);
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, fn.apply(this, arguments));
    }
    return cache.get(cacheKey);
  };
  memoized.clear = cache.clear.bind(cache);
  return memoized;
}

/**
 * Sets dataset attributes on a script
 * @param {Script} script
 * @param {object} attributes
 */
function setScriptAttributes(script, attributes) {
  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      script.setAttribute(key, attributes[key]);
    }
  }
}

/**
 * Encode a string for inclusion in HTML.
 * See https://pragmaticwebsecurity.com/articles/spasecurity/json-stringify-xss.html and
 * https://codeql.github.com/codeql-query-help/javascript/js-bad-code-sanitization/
 * @return {string}
 */
var escapeUnsafeChars = function () {
  var escapes = {
    '<': "\\u003C",
    '>': "\\u003E",
    '/': "\\u002F",
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  return function (str) {
    return str.replace(/[<>\b\f\n\r\t\0\u2028\u2029\\]/g, function (x) {
      return escapes[x];
    });
  };
}();

/***/ }),

/***/ "./src/utils/cpm.js":
/*!**************************!*\
  !*** ./src/utils/cpm.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adjustCpm": function() { return /* binding */ adjustCpm; }
/* harmony export */ });
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _bidderSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");



function adjustCpm(cpm, bidResponse, bidRequest) {
  var _bidRequest;
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    _ref$index = _ref.index,
    index = _ref$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_0__.auctionManager.index : _ref$index,
    _ref$bs = _ref.bs,
    bs = _ref$bs === void 0 ? _bidderSettings_js__WEBPACK_IMPORTED_MODULE_1__.bidderSettings : _ref$bs;
  bidRequest = bidRequest || index.getBidRequest(bidResponse);
  var adapterCode = bidResponse === null || bidResponse === void 0 ? void 0 : bidResponse.adapterCode;
  var bidderCode = (bidResponse === null || bidResponse === void 0 ? void 0 : bidResponse.bidderCode) || ((_bidRequest = bidRequest) === null || _bidRequest === void 0 ? void 0 : _bidRequest.bidder);
  var adjustAlternateBids = bs.get(bidResponse === null || bidResponse === void 0 ? void 0 : bidResponse.adapterCode, 'adjustAlternateBids');
  var bidCpmAdjustment = bs.getOwn(bidderCode, 'bidCpmAdjustment') || bs.get(adjustAlternateBids ? adapterCode : bidderCode, 'bidCpmAdjustment');
  if (bidCpmAdjustment && typeof bidCpmAdjustment === 'function') {
    try {
      return bidCpmAdjustment(cpm, Object.assign({}, bidResponse), bidRequest);
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.logError)('Error during bid adjustment', e);
    }
  }
  return cpm;
}

/***/ }),

/***/ "./src/utils/perfMetrics.js":
/*!**********************************!*\
  !*** ./src/utils/perfMetrics.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newMetrics": function() { return /* binding */ newMetrics; },
/* harmony export */   "timedAuctionHook": function() { return /* binding */ timedAuctionHook; },
/* harmony export */   "useMetrics": function() { return /* binding */ useMetrics; }
/* harmony export */ });
/* unused harmony exports CONFIG_TOGGLE, metricsFactory, hookTimer, timedBidResponseHook */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ "./src/config.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CONFIG_TOGGLE = 'performanceMetrics';
var getTime = window.performance && window.performance.now ? function () {
  return window.performance.now();
} : function () {
  return Date.now();
};
var NODES = new WeakMap();
function metricsFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$now = _ref.now,
    now = _ref$now === void 0 ? getTime : _ref$now,
    _ref$mkNode = _ref.mkNode,
    mkNode = _ref$mkNode === void 0 ? makeNode : _ref$mkNode,
    _ref$mkTimer = _ref.mkTimer,
    mkTimer = _ref$mkTimer === void 0 ? makeTimer : _ref$mkTimer,
    _ref$mkRenamer = _ref.mkRenamer,
    mkRenamer = _ref$mkRenamer === void 0 ? function (rename) {
      return rename;
    } : _ref$mkRenamer,
    _ref$nodes = _ref.nodes,
    nodes = _ref$nodes === void 0 ? NODES : _ref$nodes;
  return function newMetrics() {
    function makeMetrics(self) {
      var rename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (n) {
        return {
          forEach: function forEach(fn) {
            fn(n);
          }
        };
      };
      rename = mkRenamer(rename);
      function accessor(slot) {
        return function (name) {
          return self.dfWalk({
            visit: function visit(edge, node) {
              var obj = node[slot];
              if (obj.hasOwnProperty(name)) {
                return obj[name];
              }
            }
          });
        };
      }
      var getTimestamp = accessor('timestamps');

      /**
       * Register a metric.
       *
       * @param name metric name
       * @param value metric valiue
       */
      function setMetric(name, value) {
        var names = rename(name);
        self.dfWalk({
          follow: function follow(inEdge, outEdge) {
            return outEdge.propagate && (!inEdge || !inEdge.stopPropagation);
          },
          visit: function visit(edge, node) {
            names.forEach(function (name) {
              if (edge == null) {
                node.metrics[name] = value;
              } else {
                if (!node.groups.hasOwnProperty(name)) {
                  node.groups[name] = [];
                }
                node.groups[name].push(value);
              }
            });
          }
        });
      }

      /**
       * Mark the current time as a checkpoint with the given name, to be referenced later
       * by `timeSince` or `timeBetween`.
       *
       * @param name checkpoint name
       */
      function checkpoint(name) {
        self.timestamps[name] = now();
      }

      /**
       * Get the tame passed since `checkpoint`, and optionally save it as a metric.
       *
       * @param checkpoint checkpoint name
       * @param metric? metric name
       * @return {number} time between now and `checkpoint`
       */
      function timeSince(checkpoint, metric) {
        var ts = getTimestamp(checkpoint);
        var elapsed = ts != null ? now() - ts : null;
        if (metric != null) {
          setMetric(metric, elapsed);
        }
        return elapsed;
      }

      /**
       * Get the time passed between `startCheckpoint` and `endCheckpoint`, optionally saving it as a metric.
       *
       * @param startCheckpoint begin checkpoint
       * @param endCheckpoint end checkpoint
       * @param metric? metric name
       * @return {number} time passed between `startCheckpoint` and `endCheckpoint`
       */
      function timeBetween(startCheckpoint, endCheckpoint, metric) {
        var start = getTimestamp(startCheckpoint);
        var end = getTimestamp(endCheckpoint);
        var elapsed = start != null && end != null ? end - start : null;
        if (metric != null) {
          setMetric(metric, elapsed);
        }
        return elapsed;
      }

      /**
       * A function that, when called, stops a time measure and saves it as a metric.
       *
       * @typedef {function(): void} MetricsTimer
       * @template {function} F
       * @property {function(F): F} stopBefore returns a wrapper around the given function that begins by
       *   stopping this time measure.
       * @property {function(F): F} stopAfter returns a wrapper around the given function that ends by
       *   stopping this time measure.
       */

      /**
       * Start measuring a time metric with the given name.
       *
       * @param name metric name
       * @return {MetricsTimer}
       */
      function startTiming(name) {
        return mkTimer(now, function (val) {
          return setMetric(name, val);
        });
      }

      /**
       * Run fn and measure the time spent in it.
       *
       * @template T
       * @param name the name to use for the measured time metric
       * @param {function(): T} fn
       * @return {T} the return value of `fn`
       */
      function measureTime(name, fn) {
        return startTiming(name).stopAfter(fn)();
      }

      /**
       * @typedef {function: T} HookFn
       * @property {function(T): void} bail
       *
       * @template T
       * @typedef {T: HookFn} TimedHookFn
       * @property {function(): void} stopTiming
       * @property {T} untimed
       */

      /**
       * Convenience method for measuring time spent in a `.before` or `.after` hook.
       *
       * @template T
       * @param name metric name
       * @param {HookFn} next the hook's `next` (first) argument
       * @param {function(TimedHookFn): T} fn a function that will be run immediately; it takes `next`,
       *    where both `next` and `next.bail` automatically
       *    call `stopTiming` before continuing with the original hook.
       * @return {T} fn's return value
       */
      function measureHookTime(name, next, fn) {
        var stopTiming = startTiming(name);
        return fn(function (orig) {
          var next = stopTiming.stopBefore(orig);
          next.bail = orig.bail && stopTiming.stopBefore(orig.bail);
          next.stopTiming = stopTiming;
          next.untimed = orig;
          return next;
        }(next));
      }

      /**
       * Get all registered metrics.
       * @return {{}}
       */
      function getMetrics() {
        var result = {};
        self.dfWalk({
          visit: function visit(edge, node) {
            result = Object.assign({}, !edge || edge.includeGroups ? node.groups : null, node.metrics, result);
          }
        });
        return result;
      }

      /**
       * Create and return a new metrics object that starts as a view on all metrics registered here,
       * and - by default - also propagates all new metrics here.
       *
       * Propagated metrics are grouped together, and intended for repeated operations. For example, with the following:
       *
       * ```
       * const metrics = newMetrics();
       * const requests = metrics.measureTime('buildRequests', buildRequests)
       * requests.forEach((req) => {
       *   const requestMetrics = metrics.fork();
       *   requestMetrics.measureTime('processRequest', () => processRequest(req);
       * })
       * ```
       *
       * if `buildRequests` takes 10ms and returns 3 objects, which respectively take 100, 200, and 300ms in `processRequest`, then
       * the final `metrics.getMetrics()` would be:
       *
       * ```
       * {
       *    buildRequests: 10,
       *    processRequest: [100, 200, 300]
       * }
       * ```
       *
       * while the inner `requestMetrics.getMetrics()` would be:
       *
       * ```
       * {
       *   buildRequests: 10,
       *   processRequest: 100 // or 200 for the 2nd loop, etc
       * }
       * ```
       *
       *
       * @param propagate if false, the forked metrics will not be propagated here
       * @param stopPropagation if true, propagation from the new metrics is stopped here - instead of
       *   continuing up the chain (if for example these metrics were themselves created through `.fork()`)
       * @param includeGroups if true, the forked metrics will also replicate metrics that were propagated
       *   here from elsewhere. For example:
       *   ```
       *   const metrics = newMetrics();
       *   const op1 = metrics.fork();
       *   const withoutGroups = metrics.fork();
       *   const withGroups = metrics.fork({includeGroups: true});
       *   op1.setMetric('foo', 'bar');
       *   withoutGroups.getMetrics() // {}
       *   withGroups.getMetrics() // {foo: ['bar']}
       *   ```
       */
      function fork() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$propagate = _ref2.propagate,
          propagate = _ref2$propagate === void 0 ? true : _ref2$propagate,
          _ref2$stopPropagation = _ref2.stopPropagation,
          stopPropagation = _ref2$stopPropagation === void 0 ? false : _ref2$stopPropagation,
          _ref2$includeGroups = _ref2.includeGroups,
          includeGroups = _ref2$includeGroups === void 0 ? false : _ref2$includeGroups;
        return makeMetrics(mkNode([[self, {
          propagate: propagate,
          stopPropagation: stopPropagation,
          includeGroups: includeGroups
        }]]), rename);
      }

      /**
       * Join `otherMetrics` with these; all metrics from `otherMetrics` will (by default) be propagated here,
       * and all metrics from here will be included in `otherMetrics`.
       *
       * `propagate`, `stopPropagation` and `includeGroups` have the same semantics as in `.fork()`.
       */
      function join(otherMetrics) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$propagate = _ref3.propagate,
          propagate = _ref3$propagate === void 0 ? true : _ref3$propagate,
          _ref3$stopPropagation = _ref3.stopPropagation,
          stopPropagation = _ref3$stopPropagation === void 0 ? false : _ref3$stopPropagation,
          _ref3$includeGroups = _ref3.includeGroups,
          includeGroups = _ref3$includeGroups === void 0 ? false : _ref3$includeGroups;
        var other = nodes.get(otherMetrics);
        if (other != null) {
          other.addParent(self, {
            propagate: propagate,
            stopPropagation: stopPropagation,
            includeGroups: includeGroups
          });
        }
      }

      /**
       * return a version of these metrics where all new metrics are renamed according to `renameFn`.
       *
       * @param {function(String): Array[String]} renameFn
       */
      function renameWith(renameFn) {
        return makeMetrics(self, renameFn);
      }

      /**
       * Create a new metrics object that uses the same propagation and renaming rules as this one.
       */
      function newMetrics() {
        return makeMetrics(self.newSibling(), rename);
      }
      var metrics = {
        startTiming: startTiming,
        measureTime: measureTime,
        measureHookTime: measureHookTime,
        checkpoint: checkpoint,
        timeSince: timeSince,
        timeBetween: timeBetween,
        setMetric: setMetric,
        getMetrics: getMetrics,
        fork: fork,
        join: join,
        newMetrics: newMetrics,
        renameWith: renameWith,
        toJSON: function toJSON() {
          return getMetrics();
        }
      };
      nodes.set(metrics, self);
      return metrics;
    }
    return makeMetrics(mkNode([]));
  };
}
function wrapFn(fn, before, after) {
  return function () {
    before && before();
    try {
      return fn.apply(this, arguments);
    } finally {
      after && after();
    }
  };
}
function makeTimer(now, cb) {
  var start = now();
  var done = false;
  function stopTiming() {
    if (!done) {
      // eslint-disable-next-line standard/no-callback-literal
      cb(now() - start);
      done = true;
    }
  }
  stopTiming.stopBefore = function (fn) {
    return wrapFn(fn, stopTiming);
  };
  stopTiming.stopAfter = function (fn) {
    return wrapFn(fn, null, stopTiming);
  };
  return stopTiming;
}
function makeNode(parents) {
  return {
    metrics: {},
    timestamps: {},
    groups: {},
    addParent: function addParent(node, edge) {
      parents.push([node, edge]);
    },
    newSibling: function newSibling() {
      return makeNode(parents.slice());
    },
    dfWalk: function dfWalk() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        visit = _ref4.visit,
        _ref4$follow = _ref4.follow,
        follow = _ref4$follow === void 0 ? function () {
          return true;
        } : _ref4$follow,
        _ref4$visited = _ref4.visited,
        visited = _ref4$visited === void 0 ? new Set() : _ref4$visited,
        inEdge = _ref4.inEdge;
      var res;
      if (!visited.has(this)) {
        visited.add(this);
        res = visit(inEdge, this);
        if (res != null) return res;
        var _iterator = _createForOfIteratorHelper(parents),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_step.value, 2),
              parent = _step$value[0],
              outEdge = _step$value[1];
            if (follow(inEdge, outEdge)) {
              res = parent.dfWalk({
                visit: visit,
                follow: follow,
                visited: visited,
                inEdge: outEdge
              });
              if (res != null) return res;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  };
}
var nullMetrics = function () {
  var nop = function nop() {};
  var empty = function empty() {
    return {};
  };
  var none = {
    forEach: nop
  };
  var nullTimer = function nullTimer() {
    return null;
  };
  nullTimer.stopBefore = function (fn) {
    return fn;
  };
  nullTimer.stopAfter = function (fn) {
    return fn;
  };
  var nullNode = Object.defineProperties({
    dfWalk: nop,
    newSibling: function newSibling() {
      return nullNode;
    },
    addParent: nop
  }, Object.fromEntries(['metrics', 'timestamps', 'groups'].map(function (prop) {
    return [prop, {
      get: empty
    }];
  })));
  return metricsFactory({
    now: function now() {
      return 0;
    },
    mkNode: function mkNode() {
      return nullNode;
    },
    mkRenamer: function mkRenamer() {
      return function () {
        return none;
      };
    },
    mkTimer: function mkTimer() {
      return nullTimer;
    },
    nodes: {
      get: nop,
      set: nop
    }
  })();
}();
var enabled = true;
_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig(CONFIG_TOGGLE, function (cfg) {
  enabled = !!cfg[CONFIG_TOGGLE];
});

/**
 * convenience fallback function for metrics that may be undefined, especially during tests.
 */
function useMetrics(metrics) {
  return enabled && metrics || nullMetrics;
}
var newMetrics = function () {
  var makeMetrics = metricsFactory();
  return function () {
    return enabled ? makeMetrics() : nullMetrics;
  };
}();
function hookTimer(prefix, getMetrics) {
  return function (name, hookFn) {
    return function (next) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var that = this;
      return useMetrics(getMetrics.apply(that, args)).measureHookTime(prefix + name, next, function (next) {
        return hookFn.call.apply(hookFn, [that, next].concat(args));
      });
    };
  };
}
var timedAuctionHook = hookTimer('requestBids.', function (req) {
  return req.metrics;
});
var timedBidResponseHook = hookTimer('addBidResponse.', function (_, bid) {
  return bid.metrics;
});

/***/ }),

/***/ "./src/utils/promise.js":
/*!******************************!*\
  !*** ./src/utils/promise.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GreedyPromise": function() { return /* binding */ GreedyPromise; },
/* harmony export */   "defer": function() { return /* binding */ defer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");





function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
var SUCCESS = 0;
var FAIL = 1;

/**
 * A version of Promise that runs callbacks synchronously when it can (i.e. after it's been fulfilled or rejected).
 */
var _result = /*#__PURE__*/new WeakMap();
var _callbacks = /*#__PURE__*/new WeakMap();
var GreedyPromise = /*#__PURE__*/function () {
  function GreedyPromise(resolver) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, GreedyPromise);
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _callbacks, {
      writable: true,
      value: void 0
    });
    if (typeof resolver !== 'function') {
      throw new Error('resolver not a function');
    }
    var result = [];
    var callbacks = [];
    var _map = [SUCCESS, FAIL].map(function (type) {
        return function (value) {
          if (type === SUCCESS && typeof (value === null || value === void 0 ? void 0 : value.then) === 'function') {
            value.then(resolve, reject);
          } else if (!result.length) {
            result.push(type, value);
            while (callbacks.length) {
              callbacks.shift()();
            }
          }
        };
      }),
      _map2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_map, 2),
      resolve = _map2[0],
      reject = _map2[1];
    try {
      resolver(resolve, reject);
    } catch (e) {
      reject(e);
    }
    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _result, result);
    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _callbacks, callbacks);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(GreedyPromise, [{
    key: "then",
    value: function then(onSuccess, onError) {
      var _this = this;
      var result = (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _result);
      return new this.constructor(function (resolve, reject) {
        var continuation = function continuation() {
          var value = result[1];
          var _ref = result[0] === SUCCESS ? [onSuccess, resolve] : [onError, reject],
            _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, 2),
            handler = _ref2[0],
            resolveFn = _ref2[1];
          if (typeof handler === 'function') {
            try {
              value = handler(value);
            } catch (e) {
              reject(e);
              return;
            }
            resolveFn = resolve;
          }
          resolveFn(value);
        };
        result.length ? continuation() : (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4__["default"])(_this, _callbacks).push(continuation);
      });
    }
  }, {
    key: "catch",
    value: function _catch(onError) {
      return this.then(null, onError);
    }
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      var _this2 = this;
      var val;
      return this.then(function (v) {
        val = v;
        return onFinally();
      }, function (e) {
        val = _this2.constructor.reject(e);
        return onFinally();
      }).then(function () {
        return val;
      });
    }
  }], [{
    key: "timeout",
    value:
    /**
     * Convenience wrapper for setTimeout; takes care of returning an already fulfilled GreedyPromise when the delay is zero.
     *
     * @param {Number} delayMs delay in milliseconds
     * @returns {GreedyPromise} a promise that resolves (to undefined) in `delayMs` milliseconds
     */
    function timeout() {
      var delayMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return new GreedyPromise(function (resolve) {
        delayMs === 0 ? resolve() : setTimeout(resolve, delayMs);
      });
    }
  }, {
    key: "race",
    value: function race(promises) {
      var _this3 = this;
      return new this(function (resolve, reject) {
        _classStaticPrivateMethodGet(_this3, GreedyPromise, _collect).call(_this3, promises, function (success, result) {
          return success ? resolve(result) : reject(result);
        });
      });
    }
  }, {
    key: "all",
    value: function all(promises) {
      var _this4 = this;
      return new this(function (resolve, reject) {
        var res = [];
        _classStaticPrivateMethodGet(_this4, GreedyPromise, _collect).call(_this4, promises, function (success, val, i) {
          return success ? res[i] = val : reject(val);
        }, function () {
          return resolve(res);
        });
      });
    }
  }, {
    key: "allSettled",
    value: function allSettled(promises) {
      var _this5 = this;
      return new this(function (resolve) {
        var res = [];
        _classStaticPrivateMethodGet(_this5, GreedyPromise, _collect).call(_this5, promises, function (success, val, i) {
          return res[i] = success ? {
            status: 'fulfilled',
            value: val
          } : {
            status: 'rejected',
            reason: val
          };
        }, function () {
          return resolve(res);
        });
      });
    }
  }, {
    key: "resolve",
    value: function resolve(value) {
      return new this(function (resolve) {
        return resolve(value);
      });
    }
  }, {
    key: "reject",
    value: function reject(error) {
      return new this(function (resolve, reject) {
        return reject(error);
      });
    }
  }]);
  return GreedyPromise;
}();

/**
 * @returns a {promise, resolve, reject} trio where `promise` is resolved by calling `resolve` or `reject`.
 */
function _collect(promises, collector, done) {
  var _this6 = this;
  var cnt = promises.length;
  function clt() {
    collector.apply(this, arguments);
    if (--cnt <= 0 && done) done();
  }
  promises.length === 0 && done ? done() : promises.forEach(function (p, i) {
    return _this6.resolve(p).then(function (val) {
      return clt(true, val, i);
    }, function (err) {
      return clt(false, err, i);
    });
  });
}
function defer() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref3$promiseFactory = _ref3.promiseFactory,
    promiseFactory = _ref3$promiseFactory === void 0 ? function (resolver) {
      return new GreedyPromise(resolver);
    } : _ref3$promiseFactory;
  function invoker(delegate) {
    return function (val) {
      return delegate(val);
    };
  }
  var resolveFn, rejectFn;
  return {
    promise: promiseFactory(function (resolve, reject) {
      resolveFn = resolve;
      rejectFn = reject;
    }),
    resolve: invoker(resolveFn),
    reject: invoker(rejectFn)
  };
}

/***/ }),

/***/ "./src/video.js":
/*!**********************!*\
  !*** ./src/video.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OUTSTREAM": function() { return /* binding */ OUTSTREAM; },
/* harmony export */   "isValidVideoBid": function() { return /* binding */ isValidVideoBid; }
/* harmony export */ });
/* unused harmony exports INSTREAM, videoAdUnit, videoBidder, hasNonVideoBidder, checkVideoBidSetup */
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");






var VIDEO_MEDIA_TYPE = 'video';
var OUTSTREAM = 'outstream';
var INSTREAM = 'instream';

/**
 * Helper functions for working with video-enabled adUnits
 */
var videoAdUnit = function videoAdUnit(adUnit) {
  var mediaType = adUnit.mediaType === VIDEO_MEDIA_TYPE;
  var mediaTypes = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(adUnit, 'mediaTypes.video');
  return mediaType || mediaTypes;
};
var videoBidder = function videoBidder(bid) {
  return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.includes)(_adapterManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].videoAdapters, bid.bidder);
};
var hasNonVideoBidder = function hasNonVideoBidder(adUnit) {
  return adUnit.bids.filter(function (bid) {
    return !videoBidder(bid);
  }).length;
};

/**
 * @typedef {object} VideoBid
 * @property {string} adId id of the bid
 */

/**
 * Validate that the assets required for video context are present on the bid
 * @param {VideoBid} bid Video bid to validate
 * @param index
 * @return {Boolean} If object is valid
 */
function isValidVideoBid(bid) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$index = _ref.index,
    index = _ref$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_3__.auctionManager.index : _ref$index;
  var videoMediaType = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(index.getMediaTypes(bid), 'video');
  var context = videoMediaType && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(videoMediaType, 'context');
  var useCacheKey = videoMediaType && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"])(videoMediaType, 'useCacheKey');
  var adUnit = index.getAdUnit(bid);

  // if context not defined assume default 'instream' for video bids
  // instream bids require a vast url or vast xml content
  return checkVideoBidSetup(bid, adUnit, videoMediaType, context, useCacheKey);
}
var checkVideoBidSetup = (0,_hook_js__WEBPACK_IMPORTED_MODULE_4__.hook)('sync', function (bid, adUnit, videoMediaType, context, useCacheKey) {
  if (videoMediaType && (useCacheKey || context !== OUTSTREAM)) {
    // xml-only video bids require a prebid cache url
    if (!_src_config_js__WEBPACK_IMPORTED_MODULE_5__.config.getConfig('cache.url') && bid.vastXml && !bid.vastUrl) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)("\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with owpbjs.setConfig({ cache: {url: \"...\"} });\n      ");
      return false;
    }
    return !!(bid.vastUrl || bid.vastXml);
  }

  // outstream bids require a renderer on the bid or pub-defined on adunit
  if (context === OUTSTREAM && !useCacheKey) {
    return !!(bid.renderer || adUnit && adUnit.renderer || videoMediaType.renderer);
  }
  return true;
}, 'checkVideoBidSetup');

/***/ }),

/***/ "./src/videoCache.js":
/*!***************************!*\
  !*** ./src/videoCache.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCacheUrl": function() { return /* binding */ getCacheUrl; },
/* harmony export */   "store": function() { return /* binding */ store; }
/* harmony export */ });
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax.js */ "./src/ajax.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/**
 * This module interacts with the server used to cache video ad content to be restored later.
 * At a high level, the expected workflow goes like this:
 *
 *   - Request video ads from Bidders
 *   - Generate IDs for each valid bid, and cache the key/value pair on the server.
 *   - Return these IDs so that publishers can use them to fetch the bids later.
 *
 * This trickery helps integrate with ad servers, which set character limits on request params.
 */





/**
 * Might be useful to be configurable in the future
 * Depending on publisher needs
 */
var ttlBufferInSeconds = 15;

/**
 * @typedef {object} CacheableUrlBid
 * @property {string} vastUrl A URL which loads some valid VAST XML.
 */

/**
 * @typedef {object} CacheablePayloadBid
 * @property {string} vastXml Some VAST XML which loads an ad in a video player.
 */

/**
 * A CacheableBid describes the types which the videoCache can store.
 *
 * @typedef {CacheableUrlBid|CacheablePayloadBid} CacheableBid
 */

/**
 * Function which wraps a URI that serves VAST XML, so that it can be loaded.
 *
 * @param {string} uri The URI where the VAST content can be found.
 * @param {string} impUrl An impression tracker URL for the delivery of the video ad
 * @return A VAST URL which loads XML from the given URI.
 */
function wrapURI(uri, impUrl) {
  // Technically, this is vulnerable to cross-script injection by sketchy vastUrl bids.
  // We could make sure it's a valid URI... but since we're loading VAST XML from the
  // URL they provide anyway, that's probably not a big deal.
  var vastImp = impUrl ? "<![CDATA[".concat(impUrl, "]]>") : "";
  return "<VAST version=\"3.0\">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA[".concat(uri, "]]></VASTAdTagURI>\n        <Impression>").concat(vastImp, "</Impression>\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>");
}

/**
 * Wraps a bid in the format expected by the prebid-server endpoints, or returns null if
 * the bid can't be converted cleanly.
 *
 * @param {CacheableBid} bid
 * @param index
 */
function toStorageRequest(bid) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$index = _ref.index,
    index = _ref$index === void 0 ? _auctionManager_js__WEBPACK_IMPORTED_MODULE_0__.auctionManager.index : _ref$index;
  var vastValue = bid.vastXml ? bid.vastXml : wrapURI(bid.vastUrl, bid.vastImpUrl);
  var auction = index.getAuction(bid);
  /* istanbul ignore next */
  if (window && window.PWT) {
    vastValue = window.PWT.UpdateVastWithTracker(bid, vastValue);
  }
  var ttlWithBuffer = Number(bid.ttl) + ttlBufferInSeconds;
  var payload = {
    type: 'xml',
    value: vastValue,
    ttlseconds: ttlWithBuffer
  };
  if (_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('cache.vasttrack')) {
    payload.bidder = bid.bidder;
    payload.bidid = bid.requestId;
    payload.aid = bid.auctionId;
  }
  if (auction != null) {
    payload.timestamp = auction.getAuctionStart();
  }
  if (typeof bid.customCacheKey === 'string' && bid.customCacheKey !== '') {
    payload.key = bid.customCacheKey;
  }
  return payload;
}

/**
 * A function which should be called with the results of the storage operation.
 *
 * @callback videoCacheStoreCallback
 *
 * @param {Error} [error] The error, if one occurred.
 * @param {?string[]} uuids An array of unique IDs. The array will have one element for each bid we were asked
 *   to store. It may include null elements if some of the bids were malformed, or an error occurred.
 *   Each non-null element in this array is a valid input into the retrieve function, which will fetch
 *   some VAST XML which can be used to render this bid's ad.
 */

/**
 * A function which bridges the APIs between the videoCacheStoreCallback and our ajax function's API.
 *
 * @param {videoCacheStoreCallback} done A callback to the "store" function.
 * @return {Function} A callback which interprets the cache server's responses, and makes up the right
 *   arguments for our callback.
 */
function shimStorageCallback(done) {
  return {
    success: function success(responseBody) {
      var ids;
      try {
        ids = JSON.parse(responseBody).responses;
      } catch (e) {
        done(e, []);
        return;
      }
      if (ids) {
        done(null, ids);
      } else {
        done(new Error("The cache server didn't respond with a responses property."), []);
      }
    },
    error: function error(statusText, responseBody) {
      done(new Error("Error storing video ad in the cache: ".concat(statusText, ": ").concat(JSON.stringify(responseBody))), []);
    }
  };
}

/**
 * If the given bid is for a Video ad, generate a unique ID and cache it somewhere server-side.
 *
 * @param {CacheableBid[]} bids A list of bid objects which should be cached.
 * @param {videoCacheStoreCallback} [done] An optional callback which should be executed after
 * the data has been stored in the cache.
 */
function store(bids, done) {
  var getAjax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ajax_js__WEBPACK_IMPORTED_MODULE_2__.ajaxBuilder;
  var requestData = {
    puts: bids.map(toStorageRequest)
  };
  var ajax = getAjax(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('cache.timeout'));
  ajax(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('cache.url'), shimStorageCallback(done), JSON.stringify(requestData), {
    contentType: 'text/plain',
    withCredentials: true
  });
}
function getCacheUrl(id) {
  return "".concat(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('cache.url'), "?uuid=").concat(id);
}

/***/ }),

/***/ "./node_modules/dlv/index.js":
/*!***********************************!*\
  !*** ./node_modules/dlv/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ dlv; }
/* harmony export */ });
function dlv(obj, key, def, p, undef) {
	key = key.split ? key.split('.') : key;
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? def : obj;
}


/***/ }),

/***/ "./node_modules/fun-hooks/no-eval/index.js":
/*!*************************************************!*\
  !*** ./node_modules/fun-hooks/no-eval/index.js ***!
  \*************************************************/
/***/ (function(module) {

/*
* @license MIT
* Fun Hooks v0.9.10
* (c) @snapwich
*/
create.SYNC = 1;
create.ASYNC = 2;
create.QUEUE = 4;

var packageName = "fun-hooks";

function hasProxy() {
  return !!(typeof Proxy === "function" && Proxy.revocable);
}

var defaults = Object.freeze({
  useProxy: true,
  ready: 0
});

var hookableMap = new WeakMap();

// detect incorrectly implemented reduce and if found use polyfill
// https://github.com/prebid/Prebid.js/issues/3576
// polyfill from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
var reduce =
  [1]
    .reduce(function(a, b, c) {
      return [a, b, c];
    }, 2)
    .toString() === "2,1,0"
    ? Array.prototype.reduce
    : function(callback, initial) {
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (initial) {
          value = initial;
        } else {
          while (k < len && !(k in o)) {
            k++;
          }
          value = o[k++];
        }
        while (k < len) {
          if (k in o) {
            value = callback(value, o[k], k, o);
          }
          k++;
        }
        return value;
      };

function rest(args, skip) {
  return Array.prototype.slice.call(args, skip);
}

var assign =
  Object.assign ||
  function assign(target) {
    return reduce.call(
      rest(arguments, 1),
      function(target, obj) {
        if (obj) {
          Object.keys(obj).forEach(function(prop) {
            target[prop] = obj[prop];
          });
        }
        return target;
      },
      target
    );
  };

function runAll(queue) {
  var queued;
  // eslint-disable-next-line no-cond-assign
  while ((queued = queue.shift())) {
    queued();
  }
}

function create(config) {
  var hooks = {};
  var postReady = [];

  config = assign({}, defaults, config);

  function dispatch(arg1, arg2) {
    if (typeof arg1 === "function") {
      return hookFn.call(null, "sync", arg1, arg2);
    } else if (typeof arg1 === "string" && typeof arg2 === "function") {
      return hookFn.apply(null, arguments);
    } else if (typeof arg1 === "object") {
      return hookObj.apply(null, arguments);
    }
  }

  var ready;
  if (config.ready) {
    dispatch.ready = function() {
      ready = true;
      runAll(postReady);
    };
  } else {
    ready = true;
  }

  function hookObj(obj, props, objName) {
    var walk = true;
    if (typeof props === "undefined") {
      props = Object.getOwnPropertyNames(obj);
      walk = false;
    }
    var objHooks = {};
    var doNotHook = ["constructor"];
    do {
      props = props.filter(function(prop) {
        return (
          typeof obj[prop] === "function" &&
          !(doNotHook.indexOf(prop) !== -1) &&
          !prop.match(/^_/)
        );
      });
      props.forEach(function(prop) {
        var parts = prop.split(":");
        var name = parts[0];
        var type = parts[1] || "sync";
        if (!objHooks[name]) {
          var fn = obj[name];
          objHooks[name] = obj[name] = hookFn(
            type,
            fn,
            objName ? [objName, name] : undefined
          );
        }
      });
      obj = Object.getPrototypeOf(obj);
    } while (walk && obj);
    return objHooks;
  }

  /**
   * Navigates a string path to return a hookable function.  If not found, creates a placeholder for hooks.
   * @param {(Array<string> | string)} path
   */
  function get(path) {
    var parts = Array.isArray(path) ? path : path.split(".");
    return reduce.call(
      parts,
      function(memo, part, i) {
        var item = memo[part];
        var installed = false;
        if (item) {
          return item;
        } else if (i === parts.length - 1) {
          if (!ready) {
            postReady.push(function() {
              if (!installed) {
                // eslint-disable-next-line no-console
                console.warn(
                  packageName +
                    ": referenced '" +
                    path +
                    "' but it was never created"
                );
              }
            });
          }
          return (memo[part] = newHookable(function(fn) {
            memo[part] = fn;
            installed = true;
          }));
        }
        return (memo[part] = {});
      },
      hooks
    );
  }

  function newHookable(onInstall) {
    var before = [];
    var after = [];
    var generateTrap = function() {};

    var api = {
      before: function(hook, priority) {
        return add.call(this, before, "before", hook, priority);
      },
      after: function(hook, priority) {
        return add.call(this, after, "after", hook, priority);
      },
      getHooks: function(match) {
        var hooks = before.concat(after);
        if (typeof match === "object") {
          hooks = hooks.filter(function(entry) {
            return Object.keys(match).every(function(prop) {
              return entry[prop] === match[prop];
            });
          });
        }
        try {
          assign(hooks, {
            remove: function() {
              hooks.forEach(function(entry) {
                entry.remove();
              });
              return this;
            }
          });
        } catch (e) {
          console.error(
            "error adding `remove` to array, did you modify Array.prototype?"
          );
        }
        return hooks;
      },
      removeAll: function() {
        return this.getHooks().remove();
      }
    };

    var meta = {
      install: function(type, fn, generate) {
        this.type = type;
        generateTrap = generate;
        generate(before, after);
        onInstall && onInstall(fn);
      }
    };

    // store meta data related to hookable. use `api.after` since `api` reference is not available on our proxy.
    hookableMap.set(api.after, meta);

    return api;

    function add(store, type, hook, priority) {
      var entry = {
        hook: hook,
        type: type,
        priority: priority || 10,
        remove: function() {
          var index = store.indexOf(entry);
          if (index !== -1) {
            store.splice(index, 1);
            generateTrap(before, after);
          }
        }
      };
      store.push(entry);
      store.sort(function(a, b) {
        return b.priority - a.priority;
      });
      generateTrap(before, after);
      return this;
    }
  }

  function hookFn(type, fn, name) {
    // check if function has already been wrapped
    var meta = fn.after && hookableMap.get(fn.after);
    if (meta) {
      if (meta.type !== type) {
        throw packageName + ": recreated hookable with different type";
      } else {
        return fn;
      }
    }

    var hookable = name ? get(name) : newHookable();

    var trap;
    var hookedFn;
    var handlers = {
      get: function(target, prop) {
        return hookable[prop] || Reflect.get.apply(Reflect, arguments);
      }
    };

    if (!ready) {
      postReady.push(setTrap);
    }

    if (config.useProxy && hasProxy()) {
      hookedFn = new Proxy(fn, handlers);
    } else {
      hookedFn = function() {
        return handlers.apply
          ? handlers.apply(fn, this, rest(arguments))
          : fn.apply(this, arguments);
      };
      assign(hookedFn, hookable);
    }

    hookableMap.get(hookedFn.after).install(type, hookedFn, generateTrap);

    return hookedFn;

    // eslint-disable-next-line no-redeclare
    function generateTrap(before, after) {
      var order = [];
      var targetIndex;
      if (before.length || after.length) {
        before.forEach(addToOrder);
        // placeholder for target function wrapper
        targetIndex = order.push(undefined) - 1;
        after.forEach(addToOrder);
        trap = function(target, thisArg, args) {
          var curr = 0;
          var result;
          var callback =
            type === "async" &&
            typeof args[args.length - 1] === "function" &&
            args.pop();
          function bail(value) {
            if (type === "sync") {
              result = value;
            } else if (callback) {
              callback.apply(null, arguments);
            }
          }
          function next(value) {
            if (order[curr]) {
              var args = rest(arguments);
              next.bail = bail;
              args.unshift(next);
              return order[curr++].apply(thisArg, args);
            }
            if (type === "sync") {
              result = value;
            } else if (callback) {
              callback.apply(null, arguments);
            }
          }
          order[targetIndex] = function() {
            var args = rest(arguments, 1);
            if (type === "async" && callback) {
              delete next.bail;
              args.push(next);
            }
            var result = target.apply(thisArg, args);
            if (type === "sync") {
              next(result);
            }
          };
          next.apply(null, args);
          return result;
        };
      } else {
        trap = undefined;
      }
      setTrap();

      function addToOrder(entry) {
        order.push(entry.hook);
      }
    }

    function setTrap() {
      if (
        ready ||
        (type === "sync" && !(config.ready & create.SYNC)) ||
        (type === "async" && !(config.ready & create.ASYNC))
      ) {
        handlers.apply = trap;
      } else if (type === "sync" || !(config.ready & create.QUEUE)) {
        handlers.apply = function() {
          throw packageName + ": hooked function not ready";
        };
      } else {
        handlers.apply = function() {
          var args = arguments;
          postReady.push(function() {
            hookedFn.apply(args[1], args[2]);
          });
        };
      }
    }
  }

  dispatch.get = get;
  return dispatch;
}

/* global module */
module.exports = create;


/***/ }),

/***/ "./node_modules/just-clone/index.js":
/*!******************************************!*\
  !*** ./node_modules/just-clone/index.js ***!
  \******************************************/
/***/ (function(module) {

module.exports = clone;

/*
  Identical to `just-extend(true, {}, obj1)`

  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  arr.push(4);
  subObj.bb = 2;
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}  
  objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
*/

function clone(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    // include prototype properties
    var value = obj[key];
    if (value && typeof value == 'object') {
      result[key] = clone(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayLikeToArray; }
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithHoles; }
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _assertThisInitialized; }
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classApplyDescriptorGet; }
/* harmony export */ });
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classApplyDescriptorSet; }
/* harmony export */ });
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classCallCheck; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classExtractFieldDescriptor; }
/* harmony export */ });
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classPrivateFieldGet; }
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classApplyDescriptorGet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, privateMap, "get");
  return (0,_classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, descriptor);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classPrivateFieldSet; }
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classApplyDescriptorSet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, privateMap, "set");
  (0,_classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, descriptor, value);
  return value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _createClass; }
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _getPrototypeOf; }
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _inherits; }
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArrayLimit; }
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableRest; }
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _possibleConstructorReturn; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _setPrototypeOf; }
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _slicedToArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _unsupportedIterableToArray; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./node_modules/dset/dist/index.mjs":
/*!******************************************!*\
  !*** ./node_modules/dset/dist/index.mjs ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dset": function() { return /* binding */ dset; }
/* harmony export */ });
function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}


/***/ }),

/***/ "./src/constants.json":
/*!****************************!*\
  !*** ./src/constants.json ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"JSON_MAPPING":{"ADSERVER_TARGETING":"adserverTargeting","BD_SETTING_STANDARD":"standard"},"DEBUG_MODE":"pbjs_debug","STATUS":{"GOOD":1},"EVENTS":{"AUCTION_INIT":"auctionInit","AUCTION_END":"auctionEnd","BID_ADJUSTMENT":"bidAdjustment","BID_TIMEOUT":"bidTimeout","BID_REQUESTED":"bidRequested","BID_RESPONSE":"bidResponse","BID_REJECTED":"bidRejected","NO_BID":"noBid","SEAT_NON_BID":"seatNonBid","BID_WON":"bidWon","BIDDER_DONE":"bidderDone","BIDDER_ERROR":"bidderError","SET_TARGETING":"setTargeting","BEFORE_REQUEST_BIDS":"beforeRequestBids","BEFORE_BIDDER_HTTP":"beforeBidderHttp","REQUEST_BIDS":"requestBids","ADD_AD_UNITS":"addAdUnits","AD_RENDER_FAILED":"adRenderFailed","AD_RENDER_SUCCEEDED":"adRenderSucceeded","TCF2_ENFORCEMENT":"tcf2Enforcement","AUCTION_DEBUG":"auctionDebug","BID_VIEWABLE":"bidViewable","STALE_RENDER":"staleRender","BILLABLE_EVENT":"billableEvent","IH_INIT":"initIdentityHub"},"AD_RENDER_FAILED_REASON":{"PREVENT_WRITING_ON_MAIN_DOCUMENT":"preventWritingOnMainDocument","NO_AD":"noAd","EXCEPTION":"exception","CANNOT_FIND_AD":"cannotFindAd","MISSING_DOC_OR_ADID":"missingDocOrAdid"},"EVENT_ID_PATHS":{"bidWon":"adUnitCode"},"GRANULARITY_OPTIONS":{"LOW":"low","MEDIUM":"medium","HIGH":"high","AUTO":"auto","DENSE":"dense","CUSTOM":"custom"},"TARGETING_KEYS":{"BIDDER":"hb_bidder","AD_ID":"hb_adid","PRICE_BUCKET":"hb_pb","SIZE":"hb_size","DEAL":"hb_deal","SOURCE":"hb_source","FORMAT":"hb_format","UUID":"hb_uuid","CACHE_ID":"hb_cache_id","CACHE_HOST":"hb_cache_host","ADOMAIN":"hb_adomain","ACAT":"hb_acat"},"DEFAULT_TARGETING_KEYS":{"BIDDER":"hb_bidder","AD_ID":"hb_adid","PRICE_BUCKET":"hb_pb","SIZE":"hb_size","DEAL":"hb_deal","SOURCE":"hb_source","FORMAT":"hb_format","UUID":"hb_uuid","CACHE_ID":"hb_cache_id","CACHE_HOST":"hb_cache_host"},"NATIVE_KEYS":{"title":"pwt_native_title","body":"pwt_native_body","body2":"pwt_native_body2","privacyLink":"pwt_native_privacy","sponsoredBy":"pwt_native_brand","image":"pwt_native_image","icon":"pwt_native_icon","clickUrl":"pwt_native_linkurl","displayUrl":"pwt_native_displayurl","cta":"pwt_native_cta","rating":"pwt_native_rating","address":"pwt_native_address","downloads":"pwt_native_downloads","likes":"pwt_native_likes","phone":"pwt_native_phone","price":"pwt_native_price","salePrice":"pwt_native_saleprice"},"S2S":{"SRC":"s2s"},"BID_STATUS":{"BID_TARGETING_SET":"targetingSet","RENDERED":"rendered"},"REFRESH_IDMODULES_LIST":{"PRIMARY_MODULES":["id5Id","publinkId","connectId"],"SCRIPT_BASED_MODULES":["zeotapIdPlus","identityLink","publinkId"]},"MODULE_PARAM_TO_UPDATE_FOR_SSO":{"id5Id":[{"key":"pd"}],"publinkId":[{"key":"e","hashType":"MD5"}],"connectId":[{"key":"he","hashType":"SHA256"}]},"REJECTION_REASON":{"INVALID":"Bid has missing or invalid properties","INVALID_REQUEST_ID":"Invalid request ID","BIDDER_DISALLOWED":"Bidder code is not allowed by allowedAlternateBidderCodes / allowUnknownBidderCodes"},"PREBID_NATIVE_DATA_KEYS_TO_ORTB":{"body":"desc","body2":"desc2","sponsoredBy":"sponsored","cta":"ctatext","rating":"rating","address":"address","downloads":"downloads","likes":"likes","phone":"phone","price":"price","salePrice":"saleprice","displayUrl":"displayurl"},"NATIVE_ASSET_TYPES":{"sponsored":1,"desc":2,"rating":3,"likes":4,"downloads":5,"price":6,"saleprice":7,"phone":8,"address":9,"desc2":10,"displayurl":11,"ctatext":12},"NATIVE_IMAGE_TYPES":{"ICON":1,"MAIN":3},"NATIVE_KEYS_THAT_ARE_NOT_ASSETS":["privacyLink","clickUrl","sendTargetingKeys","adTemplate","rendererUrl","type"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"prebid-core": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["owpbjsChunk"] = self["owpbjsChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***********************!*\
  !*** ./src/prebid.js ***!
  \***********************/
/* unused harmony exports adUnitSetupChecks, checkAdUnitSetup, startAuction, executeCallbacks */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var _secureCreatives_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./secureCreatives.js */ "./src/secureCreatives.js");
/* harmony import */ var _userSync_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userSync.js */ "./src/userSync.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./config.js */ "./src/config.js");
/* harmony import */ var _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auctionManager.js */ "./src/auctionManager.js");
/* harmony import */ var _targeting_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./targeting.js */ "./src/targeting.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _debugging_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debugging.js */ "./src/debugging.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _adUnits_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./adUnits.js */ "./src/adUnits.js");
/* harmony import */ var _Renderer_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Renderer.js */ "./src/Renderer.js");
/* harmony import */ var _bidfactory_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./bidfactory.js */ "./src/bidfactory.js");
/* harmony import */ var _storageManager_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _adRendering_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./adRendering.js */ "./src/adRendering.js");
/* harmony import */ var _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.json */ "./src/constants.json");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _utils_promise_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/promise.js */ "./src/utils/promise.js");
/* harmony import */ var _fpd_enrichment_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./fpd/enrichment.js */ "./src/fpd/enrichment.js");


/** @module pbjs */






















var pbjsInstance = (0,_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_0__.getGlobal)();
var triggerUserSyncs = _userSync_js__WEBPACK_IMPORTED_MODULE_1__.userSync.triggerUserSyncs;

/* private variables */
var _CONSTANTS$EVENTS = _constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS,
  ADD_AD_UNITS = _CONSTANTS$EVENTS.ADD_AD_UNITS,
  BID_WON = _CONSTANTS$EVENTS.BID_WON,
  REQUEST_BIDS = _CONSTANTS$EVENTS.REQUEST_BIDS,
  SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
  STALE_RENDER = _CONSTANTS$EVENTS.STALE_RENDER;
var _CONSTANTS$AD_RENDER_ = _constants_json__WEBPACK_IMPORTED_MODULE_2__.AD_RENDER_FAILED_REASON,
  PREVENT_WRITING_ON_MAIN_DOCUMENT = _CONSTANTS$AD_RENDER_.PREVENT_WRITING_ON_MAIN_DOCUMENT,
  NO_AD = _CONSTANTS$AD_RENDER_.NO_AD,
  EXCEPTION = _CONSTANTS$AD_RENDER_.EXCEPTION,
  CANNOT_FIND_AD = _CONSTANTS$AD_RENDER_.CANNOT_FIND_AD,
  MISSING_DOC_OR_ADID = _CONSTANTS$AD_RENDER_.MISSING_DOC_OR_ADID;
var eventValidators = {
  bidWon: checkDefinedPlacement
};

// initialize existing debugging sessions if present
(0,_debugging_js__WEBPACK_IMPORTED_MODULE_3__.loadSession)();

/* Public vars */
pbjsInstance.bidderSettings = pbjsInstance.bidderSettings || {};

// let the world know we are loaded
pbjsInstance.libLoaded = true;

// version auto generated from build
pbjsInstance.version = "v8.0.0";
(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Prebid.js v8.0.0 loaded");
pbjsInstance.installedModules = pbjsInstance.installedModules || [];

// create adUnit array
pbjsInstance.adUnits = pbjsInstance.adUnits || [];

// Allow publishers who enable user sync override to trigger their sync
pbjsInstance.triggerUserSyncs = triggerUserSyncs;
function checkDefinedPlacement(id) {
  var adUnitCodes = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getBidsRequested().map(function (bidSet) {
    return bidSet.bids.map(function (bid) {
      return bid.adUnitCode;
    });
  }).reduce(_utils_js__WEBPACK_IMPORTED_MODULE_4__.flatten).filter(_utils_js__WEBPACK_IMPORTED_MODULE_4__.uniques);
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.contains)(adUnitCodes, id)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('The "' + id + '" placement is not defined.');
    return;
  }
  return true;
}
function setRenderSize(doc, width, height) {
  if (doc.defaultView && doc.defaultView.frameElement) {
    doc.defaultView.frameElement.width = width;
    doc.defaultView.frameElement.height = height;
  }
}
function validateSizes(sizes, targLength) {
  var cleanSizes = [];
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(sizes) && (targLength ? sizes.length === targLength : sizes.length > 0)) {
    // check if an array of arrays or array of numbers
    if (sizes.every(function (sz) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArrayOfNums)(sz, 2);
    })) {
      cleanSizes = sizes;
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArrayOfNums)(sizes, 2)) {
      cleanSizes.push(sizes);
    }
  }
  return cleanSizes;
}
function validateBannerMediaType(adUnit) {
  var validatedAdUnit = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnit);
  var banner = validatedAdUnit.mediaTypes.banner;
  var bannerSizes = validateSizes(banner.sizes);
  if (bannerSizes.length > 0) {
    banner.sizes = bannerSizes;
    // Deprecation Warning: This property will be deprecated in next release in favor of adUnit.mediaTypes.banner.sizes
    validatedAdUnit.sizes = bannerSizes;
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request.');
    delete validatedAdUnit.mediaTypes.banner;
  }
  return validatedAdUnit;
}
function validateVideoMediaType(adUnit) {
  var validatedAdUnit = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnit);
  var video = validatedAdUnit.mediaTypes.video;
  if (video.playerSize) {
    var tarPlayerSizeLen = typeof video.playerSize[0] === 'number' ? 2 : 1;
    var videoSizes = validateSizes(video.playerSize, tarPlayerSizeLen);
    if (videoSizes.length > 0) {
      if (tarPlayerSizeLen === 2) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)('Transforming video.playerSize from [640,480] to [[640,480]] so it\'s in the proper format.');
      }
      video.playerSize = videoSizes;
      // Deprecation Warning: This property will be deprecated in next release in favor of adUnit.mediaTypes.video.playerSize
      validatedAdUnit.sizes = videoSizes;
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request.');
      delete validatedAdUnit.mediaTypes.video.playerSize;
    }
  }
  return validatedAdUnit;
}
function validateNativeMediaType(adUnit) {
  var validatedAdUnit = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepClone)(adUnit);
  var native = validatedAdUnit.mediaTypes.native;
  // if native assets are specified in OpenRTB format, remove legacy assets and print a warn.
  if (native.ortb) {
    var legacyNativeKeys = Object.keys(_constants_json__WEBPACK_IMPORTED_MODULE_2__.NATIVE_KEYS).filter(function (key) {
      return _constants_json__WEBPACK_IMPORTED_MODULE_2__.NATIVE_KEYS[key].includes('hb_native_');
    });
    var nativeKeys = Object.keys(native);
    var intersection = nativeKeys.filter(function (nativeKey) {
      return legacyNativeKeys.includes(nativeKey);
    });
    if (intersection.length > 0) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("when using native OpenRTB format, you cannot use legacy native properties. Deleting ".concat(intersection, " keys from request."));
      intersection.forEach(function (legacyKey) {
        return delete validatedAdUnit.mediaTypes.native[legacyKey];
      });
    }
  }
  if (native.image && native.image.sizes && !Array.isArray(native.image.sizes)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request.');
    delete validatedAdUnit.mediaTypes.native.image.sizes;
  }
  if (native.image && native.image.aspect_ratios && !Array.isArray(native.image.aspect_ratios)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request.');
    delete validatedAdUnit.mediaTypes.native.image.aspect_ratios;
  }
  if (native.icon && native.icon.sizes && !Array.isArray(native.icon.sizes)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request.');
    delete validatedAdUnit.mediaTypes.native.icon.sizes;
  }
  return validatedAdUnit;
}
function validateAdUnitPos(adUnit, mediaType) {
  var pos = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(adUnit, "mediaTypes.".concat(mediaType, ".pos"));
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isNumber)(pos) || isNaN(pos) || !isFinite(pos)) {
    var warning = "Value of property 'pos' on ad unit ".concat(adUnit.code, " should be of type: Number");
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)(warning);
    _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(_constants_json__WEBPACK_IMPORTED_MODULE_2__.EVENTS.AUCTION_DEBUG, {
      type: 'WARNING',
      arguments: warning
    });
    delete adUnit.mediaTypes[mediaType].pos;
  }
  return adUnit;
}
function validateAdUnit(adUnit) {
  var msg = function msg(_msg) {
    return "adUnit.code '".concat(adUnit.code, "' ").concat(_msg);
  };
  var mediaTypes = adUnit.mediaTypes;
  var bids = adUnit.bids;
  if (bids != null && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(bids)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(msg("defines 'adUnit.bids' that is not an array. Removing adUnit from auction"));
    return null;
  }
  if (bids == null && adUnit.ortb2Imp == null) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(msg("has no 'adUnit.bids' and no 'adUnit.ortb2Imp'. Removing adUnit from auction"));
    return null;
  }
  if (!mediaTypes || Object.keys(mediaTypes).length === 0) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(msg("does not define a 'mediaTypes' object.  This is a required field for the auction, so this adUnit has been removed."));
    return null;
  }
  if (adUnit.ortb2Imp != null && (bids == null || bids.length === 0)) {
    adUnit.bids = [{
      bidder: null
    }]; // the 'null' bidder is treated as an s2s-only placeholder by adapterManager
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)(msg("defines 'adUnit.ortb2Imp' with no 'adUnit.bids'; it will be seen only by S2S adapters"));
  }
  return adUnit;
}
var adUnitSetupChecks = {
  validateAdUnit: validateAdUnit,
  validateBannerMediaType: validateBannerMediaType,
  validateSizes: validateSizes
};
if (true) {
  Object.assign(adUnitSetupChecks, {
    validateNativeMediaType: validateNativeMediaType
  });
}
if (true) {
  Object.assign(adUnitSetupChecks, {
    validateVideoMediaType: validateVideoMediaType
  });
}
var checkAdUnitSetup = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('sync', function (adUnits) {
  var validatedAdUnits = [];
  adUnits.forEach(function (adUnit) {
    adUnit = validateAdUnit(adUnit);
    if (adUnit == null) return;
    var mediaTypes = adUnit.mediaTypes;
    var validatedBanner, validatedVideo, validatedNative;
    if (mediaTypes.banner) {
      validatedBanner = validateBannerMediaType(adUnit);
      if (mediaTypes.banner.hasOwnProperty('pos')) validatedBanner = validateAdUnitPos(validatedBanner, 'banner');
    }
    if ( true && mediaTypes.video) {
      validatedVideo = validatedBanner ? validateVideoMediaType(validatedBanner) : validateVideoMediaType(adUnit);
      if (mediaTypes.video.hasOwnProperty('pos')) validatedVideo = validateAdUnitPos(validatedVideo, 'video');
    }
    if ( true && mediaTypes.native) {
      validatedNative = validatedVideo ? validateNativeMediaType(validatedVideo) : validatedBanner ? validateNativeMediaType(validatedBanner) : validateNativeMediaType(adUnit);
    }
    var validatedAdUnit = Object.assign({}, validatedBanner, validatedVideo, validatedNative);
    validatedAdUnits.push(validatedAdUnit);
  });
  return validatedAdUnits;
}, 'checkAdUnitSetup');

/// ///////////////////////////////
//                              //
//    Start Public APIs         //
//                              //
/// ///////////////////////////////

/**
 * This function returns the query string targeting parameters available at this moment for a given ad unit. Note that some bidder's response may not have been received if you call this function too quickly after the requests are sent.
 * @param  {string} [adunitCode] adUnitCode to get the bid responses for
 * @alias module:pbjs.getAdserverTargetingForAdUnitCodeStr
 * @return {Array}  returnObj return bids array
 */
pbjsInstance.getAdserverTargetingForAdUnitCodeStr = function (adunitCode) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getAdserverTargetingForAdUnitCodeStr", arguments);

  // call to retrieve bids array
  if (adunitCode) {
    var res = pbjsInstance.getAdserverTargetingForAdUnitCode(adunitCode);
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.transformAdServerTargetingObj)(res);
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)('Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode');
  }
};

/**
 * This function returns the query string targeting parameters available at this moment for a given ad unit. Note that some bidder's response may not have been received if you call this function too quickly after the requests are sent.
 * @param adUnitCode {string} adUnitCode to get the bid responses for
 * @alias module:pbjs.getHighestUnusedBidResponseForAdUnitCode
 * @returns {Object}  returnObj return bid
 */
pbjsInstance.getHighestUnusedBidResponseForAdUnitCode = function (adunitCode) {
  if (adunitCode) {
    var bid = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getAllBidsForAdUnitCode(adunitCode).filter(_targeting_js__WEBPACK_IMPORTED_MODULE_9__.isBidUsable);
    return bid.length ? bid.reduce(_utils_js__WEBPACK_IMPORTED_MODULE_4__.getHighestCpm) : {};
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)('Need to call getHighestUnusedBidResponseForAdUnitCode with adunitCode');
  }
};

/**
 * This function returns the query string targeting parameters available at this moment for a given ad unit. Note that some bidder's response may not have been received if you call this function too quickly after the requests are sent.
 * @param adUnitCode {string} adUnitCode to get the bid responses for
 * @alias module:pbjs.getAdserverTargetingForAdUnitCode
 * @returns {Object}  returnObj return bids
 */
pbjsInstance.getAdserverTargetingForAdUnitCode = function (adUnitCode) {
  return pbjsInstance.getAdserverTargeting(adUnitCode)[adUnitCode];
};

/**
 * returns all ad server targeting for all ad units
 * @return {Object} Map of adUnitCodes and targeting values []
 * @alias module:pbjs.getAdserverTargeting
 */

pbjsInstance.getAdserverTargeting = function (adUnitCode) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getAdserverTargeting", arguments);
  return _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.getAllTargeting(adUnitCode);
};

/**
 * returns all consent data
 * @return {Object} Map of consent types and data
 * @alias module:pbjs.getConsentData
 */
function getConsentMetadata() {
  return {
    gdpr: _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__.gdprDataHandler.getConsentMeta(),
    usp: _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__.uspDataHandler.getConsentMeta(),
    gpp: _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__.gppDataHandler.getConsentMeta(),
    coppa: !!_config_js__WEBPACK_IMPORTED_MODULE_11__.config.getConfig('coppa')
  };
}
pbjsInstance.getConsentMetadata = function () {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getConsentMetadata");
  return getConsentMetadata();
};
function getBids(type) {
  var responses = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager[type]().filter(_utils_js__WEBPACK_IMPORTED_MODULE_4__.bind.call(_utils_js__WEBPACK_IMPORTED_MODULE_4__.adUnitsFilter, this, _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getAdUnitCodes()));

  // find the last auction id to get responses for most recent auction only
  var currentAuctionId = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getLastAuctionId();
  return responses.map(function (bid) {
    return bid.adUnitCode;
  }).filter(_utils_js__WEBPACK_IMPORTED_MODULE_4__.uniques).map(function (adUnitCode) {
    return responses.filter(function (bid) {
      return bid.auctionId === currentAuctionId && bid.adUnitCode === adUnitCode;
    });
  }).filter(function (bids) {
    return bids && bids[0] && bids[0].adUnitCode;
  }).map(function (bids) {
    return (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])({}, bids[0].adUnitCode, {
      bids: bids
    });
  }).reduce(function (a, b) {
    return Object.assign(a, b);
  }, {});
}

/**
 * This function returns the bids requests involved in an auction but not bid on
 * @alias module:pbjs.getNoBids
 * @return {Object}            map | object that contains the bidRequests
 */

pbjsInstance.getNoBids = function () {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getNoBids", arguments);
  return getBids('getNoBids');
};

/**
 * This function returns the bids requests involved in an auction but not bid on or the specified adUnitCode
 * @param  {string} adUnitCode adUnitCode
 * @alias module:pbjs.getNoBidsForAdUnitCode
 * @return {Object}           bidResponse object
 */

pbjsInstance.getNoBidsForAdUnitCode = function (adUnitCode) {
  var bids = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getNoBids().filter(function (bid) {
    return bid.adUnitCode === adUnitCode;
  });
  return {
    bids: bids
  };
};

/**
 * This function returns the bid responses at the given moment.
 * @alias module:pbjs.getBidResponses
 * @return {Object}            map | object that contains the bidResponses
 */

pbjsInstance.getBidResponses = function () {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getBidResponses", arguments);
  return getBids('getBidsReceived');
};

/**
 * Returns bidResponses for the specified adUnitCode
 * @param  {string} adUnitCode adUnitCode
 * @alias module:pbjs.getBidResponsesForAdUnitCode
 * @return {Object}            bidResponse object
 */

pbjsInstance.getBidResponsesForAdUnitCode = function (adUnitCode) {
  var bids = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getBidsReceived().filter(function (bid) {
    return bid.adUnitCode === adUnitCode;
  });
  return {
    bids: bids
  };
};

/**
 * Set query string targeting on one or more GPT ad units.
 * @param {(string|string[])} adUnit a single `adUnit.code` or multiple.
 * @param {function(object)} customSlotMatching gets a GoogleTag slot and returns a filter function for adUnitCode, so you can decide to match on either eg. return slot => { return adUnitCode => { return slot.getSlotElementId() === 'myFavoriteDivId'; } };
 * @alias module:pbjs.setTargetingForGPTAsync
 */
pbjsInstance.setTargetingForGPTAsync = function (adUnit, customSlotMatching) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.setTargetingForGPTAsync", arguments);
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isGptPubadsDefined)()) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('window.googletag is not defined on the page');
    return;
  }

  // get our ad unit codes
  var targetingSet = _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.getAllTargeting(adUnit);

  // first reset any old targeting
  _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.resetPresetTargeting(adUnit, customSlotMatching);

  // now set new targeting keys
  _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.setTargetingForGPT(targetingSet, customSlotMatching);
  Object.keys(targetingSet).forEach(function (adUnitCode) {
    Object.keys(targetingSet[adUnitCode]).forEach(function (targetingKey) {
      if (targetingKey === 'hb_adid') {
        _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.setStatusForBids(targetingSet[adUnitCode][targetingKey], _constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.BID_TARGETING_SET);
      }
    });
  });

  // emit event
  _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(SET_TARGETING, targetingSet);
};

/**
 * Set query string targeting on all AST (AppNexus Seller Tag) ad units. Note that this function has to be called after all ad units on page are defined. For working example code, see [Using Prebid.js with AppNexus Publisher Ad Server](http://prebid.org/dev-docs/examples/use-prebid-with-appnexus-ad-server.html).
 * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
 * @alias module:pbjs.setTargetingForAst
 */
pbjsInstance.setTargetingForAst = function (adUnitCodes) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.setTargetingForAn", arguments);
  if (!_targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.isApntagDefined()) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('window.apntag is not defined on the page');
    return;
  }
  _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.setTargetingForAst(adUnitCodes);

  // emit event
  _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(SET_TARGETING, _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.getAllTargeting());
};

/**
 * This function will check for presence of given node in given parent. If not present - will inject it.
 * @param {Node} node node, whose existance is in question
 * @param {Document} doc document element do look in
 * @param {string} tagName tag name to look in
 */
function reinjectNodeIfRemoved(node, doc, tagName) {
  var injectionNode = doc.querySelector(tagName);
  if (!node.parentNode || node.parentNode !== injectionNode) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.insertElement)(node, doc, tagName);
  }
}

/**
 * This function will render the ad (based on params) in the given iframe document passed through.
 * Note that doc SHOULD NOT be the parent document page as we can't doc.write() asynchronously
 * @param  {Document} doc document
 * @param  {string} id bid id to locate the ad
 * @alias module:pbjs.renderAd
 */
pbjsInstance.renderAd = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function (doc, id, options) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.renderAd", arguments);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)('Calling renderAd with adId :' + id);
  if (!id) {
    var message = "Error trying to write ad Id :".concat(id, " to the page. Missing adId");
    (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
      reason: MISSING_DOC_OR_ADID,
      message: message,
      id: id
    });
    return;
  }
  try {
    // lookup ad by ad Id
    var bid = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.findBidByAdId(id);
    if (!bid) {
      var _message = "Error trying to write ad. Cannot find ad by given id : ".concat(id);
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
        reason: CANNOT_FIND_AD,
        message: _message,
        id: id
      });
      return;
    }
    if (bid.status === _constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.RENDERED) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)("Ad id ".concat(bid.adId, " has been rendered before"));
      _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(STALE_RENDER, bid);
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_config_js__WEBPACK_IMPORTED_MODULE_11__.config.getConfig('auctionOptions'), 'suppressStaleRender')) {
        return;
      }
    }

    // replace macros according to openRTB with price paid = bid.cpm
    bid.ad = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.replaceAuctionPrice)(bid.ad, bid.originalCpm || bid.cpm);
    bid.adUrl = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.replaceAuctionPrice)(bid.adUrl, bid.originalCpm || bid.cpm);
    // replacing clickthrough if submitted
    if (options && options.clickThrough) {
      var clickThrough = options.clickThrough;
      bid.ad = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.replaceClickThrough)(bid.ad, clickThrough);
      bid.adUrl = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.replaceClickThrough)(bid.adUrl, clickThrough);
    }

    // save winning bids
    _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.addWinningBid(bid);

    // emit 'bid won' event here
    _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(BID_WON, bid);
    var height = bid.height,
      width = bid.width,
      ad = bid.ad,
      mediaType = bid.mediaType,
      adUrl = bid.adUrl,
      renderer = bid.renderer;

    // video module
    if (true) {
      var adUnitCode = bid.adUnitCode;
      var adUnit = pbjsInstance.adUnits.filter(function (adUnit) {
        return adUnit.code === adUnitCode;
      });
      var videoModule = pbjsInstance.videoModule;
      if (adUnit.video && videoModule) {
        videoModule.renderBid(adUnit.video.divId, bid);
        return;
      }
    }
    if (!doc) {
      var _message2 = "Error trying to write ad Id :".concat(id, " to the page. Missing document");
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
        reason: MISSING_DOC_OR_ADID,
        message: _message2,
        id: id
      });
      return;
    }
    var creativeComment = document.createComment("Creative ".concat(bid.creativeId, " served by ").concat(bid.bidder, " Prebid.js Header Bidding"));
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.insertElement)(creativeComment, doc, 'html');
    if ((0,_Renderer_js__WEBPACK_IMPORTED_MODULE_14__.isRendererRequired)(renderer)) {
      (0,_Renderer_js__WEBPACK_IMPORTED_MODULE_14__.executeRenderer)(renderer, bid, doc);
      reinjectNodeIfRemoved(creativeComment, doc, 'html');
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderSucceeded)({
        doc: doc,
        bid: bid,
        id: id
      });
    } else if (doc === document && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.inIframe)() || mediaType === 'video') {
      var _message3 = "Error trying to write ad. Ad render call ad id ".concat(id, " was prevented from writing to the main document.");
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
        reason: PREVENT_WRITING_ON_MAIN_DOCUMENT,
        message: _message3,
        bid: bid,
        id: id
      });
    } else if (ad) {
      doc.write(ad);
      doc.close();
      setRenderSize(doc, width, height);
      reinjectNodeIfRemoved(creativeComment, doc, 'html');
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.callBurl)(bid);
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderSucceeded)({
        doc: doc,
        bid: bid,
        id: id
      });
    } else if (adUrl) {
      var iframe = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.createInvisibleIframe)();
      iframe.height = height;
      iframe.width = width;
      iframe.style.display = 'inline';
      iframe.style.overflow = 'hidden';
      iframe.src = adUrl;
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.insertElement)(iframe, doc, 'body');
      setRenderSize(doc, width, height);
      reinjectNodeIfRemoved(creativeComment, doc, 'html');
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.callBurl)(bid);
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderSucceeded)({
        doc: doc,
        bid: bid,
        id: id
      });
    } else {
      var _message4 = "Error trying to write ad. No ad for bid response id: ".concat(id);
      (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
        reason: NO_AD,
        message: _message4,
        bid: bid,
        id: id
      });
    }
  } catch (e) {
    var _message5 = "Error trying to write ad Id :".concat(id, " to the page:").concat(e.message);
    (0,_adRendering_js__WEBPACK_IMPORTED_MODULE_13__.emitAdRenderFail)({
      reason: EXCEPTION,
      message: _message5,
      id: id
    });
  }
});

/**
 * Remove adUnit from the $$PREBID_GLOBAL$$ configuration, if there are no addUnitCode(s) it will remove all
 * @param  {string| Array} adUnitCode the adUnitCode(s) to remove
 * @alias module:pbjs.removeAdUnit
 */
pbjsInstance.removeAdUnit = function (adUnitCode) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.removeAdUnit", arguments);
  if (!adUnitCode) {
    pbjsInstance.adUnits = [];
    return;
  }
  var adUnitCodes;
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(adUnitCode)) {
    adUnitCodes = adUnitCode;
  } else {
    adUnitCodes = [adUnitCode];
  }
  adUnitCodes.forEach(function (adUnitCode) {
    for (var i = pbjsInstance.adUnits.length - 1; i >= 0; i--) {
      if (pbjsInstance.adUnits[i].code === adUnitCode) {
        pbjsInstance.adUnits.splice(i, 1);
      }
    }
  });
};

/**
 * @param {Object} requestOptions
 * @param {function} requestOptions.bidsBackHandler
 * @param {number} requestOptions.timeout
 * @param {Array} requestOptions.adUnits
 * @param {Array} requestOptions.adUnitCodes
 * @param {Array} requestOptions.labels
 * @param {String} requestOptions.auctionId
 * @alias module:pbjs.requestBids
 */
pbjsInstance.requestBids = function () {
  var delegate = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      bidsBackHandler = _ref2.bidsBackHandler,
      timeout = _ref2.timeout,
      adUnits = _ref2.adUnits,
      adUnitCodes = _ref2.adUnitCodes,
      labels = _ref2.labels,
      auctionId = _ref2.auctionId,
      ttlBuffer = _ref2.ttlBuffer,
      ortb2 = _ref2.ortb2,
      metrics = _ref2.metrics,
      defer = _ref2.defer;
    _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(REQUEST_BIDS);
    var cbTimeout = timeout || _config_js__WEBPACK_IMPORTED_MODULE_11__.config.getConfig('bidderTimeout');
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.requestBids", arguments);
    if (adUnitCodes && adUnitCodes.length) {
      // if specific adUnitCodes supplied filter adUnits for those codes
      adUnits = adUnits.filter(function (unit) {
        return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_15__.includes)(adUnitCodes, unit.code);
      });
    } else {
      // otherwise derive adUnitCodes from adUnits
      adUnitCodes = adUnits && adUnits.map(function (unit) {
        return unit.code;
      });
    }
    var ortb2Fragments = {
      global: (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.mergeDeep)({}, _config_js__WEBPACK_IMPORTED_MODULE_11__.config.getAnyConfig('ortb2') || {}, ortb2 || {}),
      bidder: Object.fromEntries(Object.entries(_config_js__WEBPACK_IMPORTED_MODULE_11__.config.getBidderConfig()).map(function (_ref3) {
        var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_16__["default"])(_ref3, 2),
          bidder = _ref4[0],
          cfg = _ref4[1];
        return [bidder, cfg.ortb2];
      }).filter(function (_ref5) {
        var _ref6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_16__["default"])(_ref5, 2),
          _ = _ref6[0],
          ortb2 = _ref6[1];
        return ortb2 != null;
      }))
    };
    return (0,_fpd_enrichment_js__WEBPACK_IMPORTED_MODULE_17__.enrichFPD)(_utils_promise_js__WEBPACK_IMPORTED_MODULE_18__.GreedyPromise.resolve(ortb2Fragments.global)).then(function (global) {
      ortb2Fragments.global = global;
      return startAuction({
        bidsBackHandler: bidsBackHandler,
        timeout: cbTimeout,
        adUnits: adUnits,
        adUnitCodes: adUnitCodes,
        labels: labels,
        auctionId: auctionId,
        ttlBuffer: ttlBuffer,
        ortb2Fragments: ortb2Fragments,
        metrics: metrics,
        defer: defer
      });
    });
  }, 'requestBids');
  return (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.wrapHook)(delegate, function requestBids() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // unlike the main body of `delegate`, this runs before any other hook has a chance to;
    // it's also not restricted in its return value in the way `async` hooks are.

    // if the request does not specify adUnits, clone the global adUnit array;
    // otherwise, if the caller goes on to use addAdUnits/removeAdUnits, any asynchronous logic
    // in any hook might see their effects.
    var adUnits = req.adUnits || pbjsInstance.adUnits;
    req.adUnits = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(adUnits) ? adUnits.slice() : [adUnits];
    req.metrics = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_19__.newMetrics)();
    req.metrics.checkpoint('requestBids');
    req.defer = (0,_utils_promise_js__WEBPACK_IMPORTED_MODULE_18__.defer)({
      promiseFactory: function promiseFactory(r) {
        return new Promise(r);
      }
    });
    delegate.call(this, req);
    return req.defer.promise;
  });
}();
var startAuction = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function () {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    bidsBackHandler = _ref7.bidsBackHandler,
    cbTimeout = _ref7.timeout,
    adUnits = _ref7.adUnits,
    ttlBuffer = _ref7.ttlBuffer,
    adUnitCodes = _ref7.adUnitCodes,
    labels = _ref7.labels,
    auctionId = _ref7.auctionId,
    ortb2Fragments = _ref7.ortb2Fragments,
    metrics = _ref7.metrics,
    defer = _ref7.defer;
  var s2sBidders = (0,_adapterManager_js__WEBPACK_IMPORTED_MODULE_10__.getS2SBidderSet)(_config_js__WEBPACK_IMPORTED_MODULE_11__.config.getConfig('s2sConfig') || []);
  adUnits = (0,_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_19__.useMetrics)(metrics).measureTime('requestBids.validate', function () {
    return checkAdUnitSetup(adUnits);
  });
  function auctionDone(bids, timedOut, auctionId) {
    if (typeof bidsBackHandler === 'function') {
      try {
        bidsBackHandler(bids, timedOut, auctionId);
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error executing bidsBackHandler', null, e);
      }
    }
    defer.resolve({
      bids: bids,
      timedOut: timedOut,
      auctionId: auctionId
    });
  }

  /*
   * for a given adunit which supports a set of mediaTypes
   * and a given bidder which supports a set of mediaTypes
   * a bidder is eligible to participate on the adunit
   * if it supports at least one of the mediaTypes on the adunit
   */
  adUnits.forEach(function (adUnit) {
    var _adUnit$ortb2Imp, _adUnit$ortb2Imp$ext;
    // get the adunit's mediaTypes, defaulting to banner if mediaTypes isn't present
    var adUnitMediaTypes = Object.keys(adUnit.mediaTypes || {
      'banner': 'banner'
    });

    // get the bidder's mediaTypes
    var allBidders = adUnit.bids.map(function (bid) {
      return bid.bidder;
    });
    var bidderRegistry = _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].bidderRegistry;
    var bidders = allBidders.filter(function (bidder) {
      return !s2sBidders.has(bidder);
    });
    var tid = ((_adUnit$ortb2Imp = adUnit.ortb2Imp) === null || _adUnit$ortb2Imp === void 0 ? void 0 : (_adUnit$ortb2Imp$ext = _adUnit$ortb2Imp.ext) === null || _adUnit$ortb2Imp$ext === void 0 ? void 0 : _adUnit$ortb2Imp$ext.tid) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.generateUUID)();
    adUnit.transactionId = tid;
    if (ttlBuffer != null && !adUnit.hasOwnProperty('ttlBuffer')) {
      adUnit.ttlBuffer = ttlBuffer;
    }
    // Populate ortb2Imp.ext.tid with transactionId. Specifying a transaction ID per item in the ortb impression array, lets multiple transaction IDs be transmitted in a single bid request.
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_20__.dset)(adUnit, 'ortb2Imp.ext.tid', tid);
    bidders.forEach(function (bidder) {
      var adapter = bidderRegistry[bidder];
      var spec = adapter && adapter.getSpec && adapter.getSpec();
      // banner is default if not specified in spec
      var bidderMediaTypes = spec && spec.supportedMediaTypes || ['banner'];

      // check if the bidder's mediaTypes are not in the adUnit's mediaTypes
      var bidderEligible = adUnitMediaTypes.some(function (type) {
        return (0,_polyfill_js__WEBPACK_IMPORTED_MODULE_15__.includes)(bidderMediaTypes, type);
      });
      if (!bidderEligible) {
        // drop the bidder from the ad unit if it's not compatible
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.unsupportedBidderMessage)(adUnit, bidder));
        adUnit.bids = adUnit.bids.filter(function (bid) {
          return bid.bidder !== bidder;
        });
      } else {
        _adUnits_js__WEBPACK_IMPORTED_MODULE_21__.adunitCounter.incrementBidderRequestsCounter(adUnit.code, bidder);
      }
    });
    _adUnits_js__WEBPACK_IMPORTED_MODULE_21__.adunitCounter.incrementRequestsCounter(adUnit.code);
  });
  if (!adUnits || adUnits.length === 0) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logMessage)('No adUnits configured. No bids requested.');
    auctionDone();
  } else {
    var auction = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.createAuction({
      adUnits: adUnits,
      adUnitCodes: adUnitCodes,
      callback: auctionDone,
      cbTimeout: cbTimeout,
      labels: labels,
      auctionId: auctionId,
      ortb2Fragments: ortb2Fragments,
      metrics: metrics
    });
    var adUnitsLen = adUnits.length;
    if (adUnitsLen > 15) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Current auction ".concat(auction.getAuctionId(), " contains ").concat(adUnitsLen, " adUnits."), adUnits);
    }
    adUnitCodes.forEach(function (code) {
      return _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.setLatestAuctionForAdUnit(code, auction.getAuctionId());
    });
    auction.callBids();
  }
}, 'startAuction');
function executeCallbacks(fn, reqBidsConfigObj) {
  runAll(_storageManager_js__WEBPACK_IMPORTED_MODULE_22__.storageCallbacks);
  runAll(enableAnalyticsCallbacks);
  fn.call(this, reqBidsConfigObj);
  function runAll(queue) {
    var queued;
    while (queued = queue.shift()) {
      queued();
    }
  }
}

// This hook will execute all storage callbacks which were registered before gdpr enforcement hook was added. Some bidders, user id modules use storage functions when module is parsed but gdpr enforcement hook is not added at that stage as setConfig callbacks are yet to be called. Hence for such calls we execute all the stored callbacks just before requestBids. At this hook point we will know for sure that gdprEnforcement module is added or not
pbjsInstance.requestBids.before(executeCallbacks, 49);

/**
 *
 * Add adunit(s)
 * @param {Array|Object} adUnitArr Array of adUnits or single adUnit Object.
 * @alias module:pbjs.addAdUnits
 */
pbjsInstance.addAdUnits = function (adUnitArr) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.addAdUnits", arguments);
  pbjsInstance.adUnits.push.apply(pbjsInstance.adUnits, (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(adUnitArr) ? adUnitArr : [adUnitArr]);
  // emit event
  _events_js__WEBPACK_IMPORTED_MODULE_7__.emit(ADD_AD_UNITS);
};

/**
 * @param {string} event the name of the event
 * @param {Function} handler a callback to set on event
 * @param {string} id an identifier in the context of the event
 * @alias module:pbjs.onEvent
 *
 * This API call allows you to register a callback to handle a Prebid.js event.
 * An optional `id` parameter provides more finely-grained event callback registration.
 * This makes it possible to register callback events for a specific item in the
 * event context. For example, `bidWon` events will accept an `id` for ad unit code.
 * `bidWon` callbacks registered with an ad unit code id will be called when a bid
 * for that ad unit code wins the auction. Without an `id` this method registers the
 * callback for every `bidWon` event.
 *
 * Currently `bidWon` is the only event that accepts an `id` parameter.
 */
pbjsInstance.onEvent = function (event, handler, id) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.onEvent", arguments);
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isFn)(handler)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('The event handler provided is not a function and was not set on event "' + event + '".');
    return;
  }
  if (id && !eventValidators[event].call(null, id)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('The id provided is not valid for event "' + event + '" and no handler was set.');
    return;
  }
  _events_js__WEBPACK_IMPORTED_MODULE_7__.on(event, handler, id);
};

/**
 * @param {string} event the name of the event
 * @param {Function} handler a callback to remove from the event
 * @param {string} id an identifier in the context of the event (see `$$PREBID_GLOBAL$$.onEvent`)
 * @alias module:pbjs.offEvent
 */
pbjsInstance.offEvent = function (event, handler, id) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.offEvent", arguments);
  if (id && !eventValidators[event].call(null, id)) {
    return;
  }
  _events_js__WEBPACK_IMPORTED_MODULE_7__.off(event, handler, id);
};

/**
 * Return a copy of all events emitted
 *
 * @alias module:pbjs.getEvents
 */
pbjsInstance.getEvents = function () {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.getEvents");
  return _events_js__WEBPACK_IMPORTED_MODULE_7__.getEvents();
};

/*
 * Wrapper to register bidderAdapter externally (adapterManager.registerBidAdapter())
 * @param  {Function} bidderAdaptor [description]
 * @param  {string} bidderCode [description]
 * @alias module:pbjs.registerBidAdapter
 */
pbjsInstance.registerBidAdapter = function (bidderAdaptor, bidderCode) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.registerBidAdapter", arguments);
  try {
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].registerBidAdapter(bidderAdaptor(), bidderCode);
  } catch (e) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error registering bidder adapter : ' + e.message);
  }
};

/**
 * Wrapper to register analyticsAdapter externally (adapterManager.registerAnalyticsAdapter())
 * @param  {Object} options [description]
 * @alias module:pbjs.registerAnalyticsAdapter
 */
pbjsInstance.registerAnalyticsAdapter = function (options) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.registerAnalyticsAdapter", arguments);
  try {
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].registerAnalyticsAdapter(options);
  } catch (e) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error registering analytics adapter : ' + e.message);
  }
};

/**
 * Wrapper to bidfactory.createBid()
 * @param  {string} statusCode [description]
 * @alias module:pbjs.createBid
 * @return {Object} bidResponse [description]
 */
pbjsInstance.createBid = function (statusCode) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.createBid", arguments);
  return (0,_bidfactory_js__WEBPACK_IMPORTED_MODULE_23__.createBid)(statusCode);
};

/**
 * Enable sending analytics data to the analytics provider of your
 * choice.
 *
 * For usage, see [Integrate with the Prebid Analytics
 * API](http://prebid.org/dev-docs/integrate-with-the-prebid-analytics-api.html).
 *
 * For a list of analytics adapters, see [Analytics for
 * Prebid](http://prebid.org/overview/analytics.html).
 * @param  {Object} config
 * @param {string} config.provider The name of the provider, e.g., `"ga"` for Google Analytics.
 * @param {Object} config.options The options for this particular analytics adapter.  This will likely vary between adapters.
 * @alias module:pbjs.enableAnalytics
 */

// Stores 'enableAnalytics' callbacks for later execution.
var enableAnalyticsCallbacks = [];
var enableAnalyticsCb = (0,_hook_js__WEBPACK_IMPORTED_MODULE_8__.hook)('async', function (config) {
  if (config && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(config)) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.enableAnalytics for: ", config);
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].enableAnalytics(config);
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("owpbjs.enableAnalytics should be called with option {}");
  }
}, 'enableAnalyticsCb');
pbjsInstance.enableAnalytics = function (config) {
  enableAnalyticsCallbacks.push(enableAnalyticsCb.bind(this, config));
};

/**
 * @alias module:pbjs.aliasBidder
 */
pbjsInstance.aliasBidder = function (bidderCode, alias, options) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)("Invoking owpbjs.aliasBidder", arguments);
  if (bidderCode && alias) {
    _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].aliasBidAdapter(bidderCode, alias, options);
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('bidderCode and alias must be passed as arguments', "owpbjs.aliasBidder");
  }
};

/**
 * @alias module:pbjs.aliasRegistry
 */
pbjsInstance.aliasRegistry = _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].aliasRegistry;
_config_js__WEBPACK_IMPORTED_MODULE_11__.config.getConfig('aliasRegistry', function (config) {
  if (config.aliasRegistry === 'private') delete pbjsInstance.aliasRegistry;
});

/**
 * The bid response object returned by an external bidder adapter during the auction.
 * @typedef {Object} AdapterBidResponse
 * @property {string} pbAg Auto granularity price bucket; CPM <= 5 ? increment = 0.05 : CPM > 5 && CPM <= 10 ? increment = 0.10 : CPM > 10 && CPM <= 20 ? increment = 0.50 : CPM > 20 ? priceCap = 20.00.  Example: `"0.80"`.
 * @property {string} pbCg Custom price bucket.  For example setup, see {@link setPriceGranularity}.  Example: `"0.84"`.
 * @property {string} pbDg Dense granularity price bucket; CPM <= 3 ? increment = 0.01 : CPM > 3 && CPM <= 8 ? increment = 0.05 : CPM > 8 && CPM <= 20 ? increment = 0.50 : CPM > 20? priceCap = 20.00.  Example: `"0.84"`.
 * @property {string} pbLg Low granularity price bucket; $0.50 increment, capped at $5, floored to two decimal places.  Example: `"0.50"`.
 * @property {string} pbMg Medium granularity price bucket; $0.10 increment, capped at $20, floored to two decimal places.  Example: `"0.80"`.
 * @property {string} pbHg High granularity price bucket; $0.01 increment, capped at $20, floored to two decimal places.  Example: `"0.84"`.
 *
 * @property {string} bidder The string name of the bidder.  This *may* be the same as the `bidderCode`.  For For a list of all bidders and their codes, see [Bidders' Params](http://prebid.org/dev-docs/bidders.html).
 * @property {string} bidderCode The unique string that identifies this bidder.  For a list of all bidders and their codes, see [Bidders' Params](http://prebid.org/dev-docs/bidders.html).
 *
 * @property {string} requestId The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) representing the bid request.
 * @property {number} requestTimestamp The time at which the bid request was sent out, expressed in milliseconds.
 * @property {number} responseTimestamp The time at which the bid response was received, expressed in milliseconds.
 * @property {number} timeToRespond How long it took for the bidder to respond with this bid, expressed in milliseconds.
 *
 * @property {string} size The size of the ad creative, expressed in `"AxB"` format, where A and B are numbers of pixels.  Example: `"320x50"`.
 * @property {string} width The width of the ad creative in pixels.  Example: `"320"`.
 * @property {string} height The height of the ad creative in pixels.  Example: `"50"`.
 *
 * @property {string} ad The actual ad creative content, often HTML with CSS, JavaScript, and/or links to additional content.  Example: `"<div id='beacon_-YQbipJtdxmMCgEPHExLhmqzEm' style='position: absolute; left: 0px; top: 0px; visibility: hidden;'><img src='http://aplus-...'/></div><iframe src=\"http://aax-us-east.amazon-adsystem.com/e/is/8dcfcd..." width=\"728\" height=\"90\" frameborder=\"0\" ...></iframe>",`.
 * @property {number} ad_id The ad ID of the creative, as understood by the bidder's system.  Used by the line item's [creative in the ad server](http://prebid.org/adops/send-all-bids-adops.html#step-3-add-a-creative).
 * @property {string} adUnitCode The code used to uniquely identify the ad unit on the publisher's page.
 *
 * @property {string} statusMessage The status of the bid.  Allowed values: `"Bid available"` or `"Bid returned empty or error response"`.
 * @property {number} cpm The exact bid price from the bidder, expressed to the thousandths place.  Example: `"0.849"`.
 *
 * @property {Object} adserverTargeting An object whose values represent the ad server's targeting on the bid.
 * @property {string} adserverTargeting.hb_adid The ad ID of the creative, as understood by the ad server.
 * @property {string} adserverTargeting.hb_pb The price paid to show the creative, as logged in the ad server.
 * @property {string} adserverTargeting.hb_bidder The winning bidder whose ad creative will be served by the ad server.
 */

/**
 * Get all of the bids that have been rendered.  Useful for [troubleshooting your integration](http://prebid.org/dev-docs/prebid-troubleshooting-guide.html).
 * @return {Array<AdapterBidResponse>} A list of bids that have been rendered.
 */
pbjsInstance.getAllWinningBids = function () {
  return _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getAllWinningBids();
};

/**
 * Get all of the bids that have won their respective auctions.
 * @return {Array<AdapterBidResponse>} A list of bids that have won their respective auctions.
 */
pbjsInstance.getAllPrebidWinningBids = function () {
  return _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getBidsReceived().filter(function (bid) {
    return bid.status === _constants_json__WEBPACK_IMPORTED_MODULE_2__.BID_STATUS.BID_TARGETING_SET;
  });
};

/**
 * Get array of highest cpm bids for all adUnits, or highest cpm bid
 * object for the given adUnit
 * @param {string} adUnitCode - optional ad unit code
 * @alias module:pbjs.getHighestCpmBids
 * @return {Array} array containing highest cpm bid object(s)
 */
pbjsInstance.getHighestCpmBids = function (adUnitCode) {
  return _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.getWinningBids(adUnitCode);
};
if (true) {
  /**
   * Mark the winning bid as used, should only be used in conjunction with video
   * @typedef {Object} MarkBidRequest
   * @property {string} adUnitCode The ad unit code
   * @property {string} adId The id representing the ad we want to mark
   *
   * @alias module:pbjs.markWinningBidAsUsed
   */
  pbjsInstance.markWinningBidAsUsed = function (markBidRequest) {
    var bids = fetchReceivedBids(markBidRequest, 'Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function.');
    if (bids.length > 0) {
      _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.addWinningBid(bids[0]);
    }
  };
}
var fetchReceivedBids = function fetchReceivedBids(bidRequest, warningMessage) {
  var bids = [];
  if (bidRequest.adUnitCode && bidRequest.adId) {
    bids = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getBidsReceived().filter(function (bid) {
      return bid.adId === bidRequest.adId && bid.adUnitCode === bidRequest.adUnitCode;
    });
  } else if (bidRequest.adUnitCode) {
    bids = _targeting_js__WEBPACK_IMPORTED_MODULE_9__.targeting.getWinningBids(bidRequest.adUnitCode);
  } else if (bidRequest.adId) {
    bids = _auctionManager_js__WEBPACK_IMPORTED_MODULE_5__.auctionManager.getBidsReceived().filter(function (bid) {
      return bid.adId === bidRequest.adId;
    });
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)(warningMessage);
  }
  return bids;
};

/**
 * Get Prebid config options
 * @param {Object} options
 * @alias module:pbjs.getConfig
 */
pbjsInstance.getConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.getAnyConfig;
pbjsInstance.readConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.readAnyConfig;
pbjsInstance.mergeConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.mergeConfig;
pbjsInstance.mergeBidderConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.mergeBidderConfig;

/**
 * Set Prebid config options.
 * See https://docs.prebid.org/dev-docs/publisher-api-reference/setConfig.html
 *
 * @param {Object} options Global Prebid configuration object. Must be JSON - no JavaScript functions are allowed.
 */
pbjsInstance.setConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.setConfig;
pbjsInstance.setBidderConfig = _config_js__WEBPACK_IMPORTED_MODULE_11__.config.setBidderConfig;
pbjsInstance.que.push(function () {
  return (0,_secureCreatives_js__WEBPACK_IMPORTED_MODULE_24__.listenMessagesFromCreative)();
});

/**
 * This queue lets users load Prebid asynchronously, but run functions the same way regardless of whether it gets loaded
 * before or after their script executes. For example, given the code:
 *
 * <script src="url/to/Prebid.js" async></script>
 * <script>
 *   var pbjs = pbjs || {};
 *   pbjs.cmd = pbjs.cmd || [];
 *   pbjs.cmd.push(functionToExecuteOncePrebidLoads);
 * </script>
 *
 * If the page's script runs before prebid loads, then their function gets added to the queue, and executed
 * by prebid once it's done loading. If it runs after prebid loads, then this monkey-patch causes their
 * function to execute immediately.
 *
 * @memberof pbjs
 * @param  {function} command A function which takes no arguments. This is guaranteed to run exactly once, and only after
 *                            the Prebid script has been fully loaded.
 * @alias module:pbjs.cmd.push
 */
pbjsInstance.cmd.push = function (command) {
  if (typeof command === 'function') {
    try {
      command.call();
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error processing command :', e.message, e.stack);
    }
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)("Commands written into owpbjs.cmd.push must be wrapped in a function");
  }
};
pbjsInstance.que.push = pbjsInstance.cmd.push;
function processQueue(queue) {
  queue.forEach(function (cmd) {
    if (typeof cmd.called === 'undefined') {
      try {
        cmd.call();
        cmd.called = true;
      } catch (e) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error processing command :', 'prebid.js', e);
      }
    }
  });
}

/**
 * @alias module:pbjs.processQueue
 */
pbjsInstance.processQueue = function () {
  _hook_js__WEBPACK_IMPORTED_MODULE_8__.hook.ready();
  processQueue(pbjsInstance.que);
  processQueue(pbjsInstance.cmd);
};

/**
 * @alias module:pbjs.triggerBilling
 */
pbjsInstance.triggerBilling = function (winningBid) {
  var bids = fetchReceivedBids(winningBid, 'Improper use of triggerBilling. It requires a bid with at least an adUnitCode or an adId to function.');
  var triggerBillingBid = bids.find(function (bid) {
    return bid.requestId === winningBid.requestId;
  }) || bids[0];
  if (bids.length > 0 && triggerBillingBid) {
    try {
      _adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].callBidBillableBidder(triggerBillingBid);
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)('Error when triggering billing :', e);
    }
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)('The bid provided to triggerBilling did not match any bids received.');
  }
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (pbjsInstance);
}();
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ })()
;
//# sourceMappingURL=prebid-core.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["domainOverrideToRootDomain"],{

/***/ "./libraries/domainOverrideToRootDomain/index.js":
/*!*******************************************************!*\
  !*** ./libraries/domainOverrideToRootDomain/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domainOverrideToRootDomain": function() { return /* binding */ domainOverrideToRootDomain; }
/* harmony export */ });
/**
 * Create a domainOverride callback for an ID module, closing over
 * an instance of StorageManager.
 *
 * The domainOverride function, given document.domain, will return
 * the topmost domain we are able to set a cookie on. For example,
 * given subdomain.example.com, it would return example.com.
 *
 * @param {StorageManager} storage e.g. from getStorageManager()
 * @param {string} moduleName the name of the module using this function
 * @returns {function(): string}
 */
function domainOverrideToRootDomain(storage, moduleName) {
  return function () {
    var domainElements = document.domain.split('.');
    var cookieName = "_gd".concat(Date.now(), "_").concat(moduleName);
    for (var i = 0, topDomain, testCookie; i < domainElements.length; i++) {
      var nextDomain = domainElements.slice(i).join('.');

      // write test cookie
      storage.setCookie(cookieName, '1', undefined, undefined, nextDomain);

      // read test cookie to verify domain was valid
      testCookie = storage.getCookie(cookieName);

      // delete test cookie
      storage.setCookie(cookieName, '', 'Thu, 01 Jan 1970 00:00:01 GMT', undefined, nextDomain);
      if (testCookie === '1') {
        // cookie was written successfully using test domain so the topDomain is updated
        topDomain = nextDomain;
      } else {
        // cookie failed to write using test domain so exit by returning the topDomain
        return topDomain;
      }
    }
  };
}

/***/ })

}]);
//# sourceMappingURL=domainOverrideToRootDomain.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["allowActivities"],{

/***/ "./modules/allowActivities.js":
/*!************************************!*\
  !*** ./modules/allowActivities.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export updateRulesFromConfig */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _src_activities_rules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/activities/rules.js */ "./src/activities/rules.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var CFG_NAME = 'allowActivities';
var RULE_NAME = "".concat(CFG_NAME, " config");
var DEFAULT_PRIORITY = 1;
function updateRulesFromConfig(registerRule) {
  var activeRuleHandles = new Map();
  var defaultRuleHandles = new Map();
  var rulesByActivity = new Map();
  function clearAllRules() {
    rulesByActivity.clear();
    Array.from(activeRuleHandles.values()).flatMap(function (ruleset) {
      return Array.from(ruleset.values());
    }).forEach(function (fn) {
      return fn();
    });
    activeRuleHandles.clear();
    Array.from(defaultRuleHandles.values()).forEach(function (fn) {
      return fn();
    });
    defaultRuleHandles.clear();
  }
  function cleanParams(params) {
    // remove private parameters for publisher condition checks
    return Object.fromEntries(Object.entries(params).filter(function (_ref) {
      var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 1),
        k = _ref2[0];
      return !k.startsWith('_');
    }));
  }
  function setupRule(activity, priority) {
    if (!activeRuleHandles.has(activity)) {
      activeRuleHandles.set(activity, new Map());
    }
    var handles = activeRuleHandles.get(activity);
    if (!handles.has(priority)) {
      handles.set(priority, registerRule(activity, RULE_NAME, function (params) {
        var _iterator = _createForOfIteratorHelper(rulesByActivity.get(activity).get(priority)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var rule = _step.value;
            if (!rule.condition || rule.condition(cleanParams(params))) {
              return {
                allow: rule.allow,
                reason: rule
              };
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }, priority));
    }
  }
  function setupDefaultRule(activity) {
    if (!defaultRuleHandles.has(activity)) {
      defaultRuleHandles.set(activity, registerRule(activity, RULE_NAME, function () {
        return {
          allow: false,
          reason: 'activity denied by default'
        };
      }, Number.POSITIVE_INFINITY));
    }
  }
  _src_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig(CFG_NAME, function (cfg) {
    clearAllRules();
    Object.entries(cfg[CFG_NAME]).forEach(function (_ref3) {
      var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, 2),
        activity = _ref4[0],
        activityCfg = _ref4[1];
      if (activityCfg.default === false) {
        setupDefaultRule(activity);
      }
      var rules = new Map();
      rulesByActivity.set(activity, rules);
      (activityCfg.rules || []).forEach(function (rule) {
        var priority = rule.priority == null ? DEFAULT_PRIORITY : rule.priority;
        if (!rules.has(priority)) {
          rules.set(priority, []);
        }
        rules.get(priority).push(rule);
      });
      Array.from(rules.keys()).forEach(function (priority) {
        return setupRule(activity, priority);
      });
    });
  });
}
updateRulesFromConfig(_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_2__.registerActivityControl);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_3__.registerModule)('allowActivities');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/allowActivities.js"));
/******/ }
]);
//# sourceMappingURL=allowActivities.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["consentManagement"],{

/***/ "./modules/consentManagement.js":
/*!**************************************!*\
  !*** ./modules/consentManagement.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports userCMP, consentTimeout, gdprScope, staticConsentData, requestBidsHook, resetConsentData, setConsentConfig, enrichFPDHook, setOrtbAdditionalConsent */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_polyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/pbjsORTB.js */ "./src/pbjsORTB.js");
/* harmony import */ var _src_fpd_enrichment_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/fpd/enrichment.js */ "./src/fpd/enrichment.js");



/**
 * This module adds GDPR consentManagement support to prebid.js.  It interacts with
 * supported CMPs (Consent Management Platforms) to grab the user's consent information
 * and make it available for any GDPR supported adapters to read/pass this information to
 * their system.
 */








var DEFAULT_CMP = 'iab';
var DEFAULT_CONSENT_TIMEOUT = 10000;
var CMP_VERSION = 2;
var userCMP;
var consentTimeout;
var gdprScope;
var staticConsentData;
var actionTimeout;
var consentData;
var addedConsentHook = false;

// add new CMPs here, with their dedicated lookup function
var cmpCallMap = {
  'iab': lookupIabConsent,
  'static': lookupStaticConsentData
};

/**
 * This function reads the consent string from the config to obtain the consent information of the user.
 * @param {function({})} onSuccess acts as a success callback when the value is read from config; pass along consentObject from CMP
 */
function lookupStaticConsentData(_ref) {
  var onSuccess = _ref.onSuccess,
    onError = _ref.onError;
  processCmpData(staticConsentData, {
    onSuccess: onSuccess,
    onError: onError
  });
}

/**
 * This function handles interacting with an IAB compliant CMP to obtain the consent information of the user.
 * Given the async nature of the CMP's API, we pass in acting success/error callback functions to exit this function
 * based on the appropriate result.
 * @param {function({})} onSuccess acts as a success callback when CMP returns a value; pass along consentObjectfrom CMP
 * @param {function(string, ...{}?)} cmpError acts as an error callback while interacting with CMP; pass along an error message (string) and any extra error arguments (purely for logging)
 */
function lookupIabConsent(_ref2) {
  var onSuccess = _ref2.onSuccess,
    onError = _ref2.onError,
    onEvent = _ref2.onEvent;
  function findCMP() {
    var f = window;
    var cmpFrame;
    var cmpFunction;
    while (true) {
      try {
        if (typeof f.__tcfapi === 'function') {
          cmpFunction = f.__tcfapi;
          cmpFrame = f;
          break;
        }
      } catch (e) {}

      // need separate try/catch blocks due to the exception errors thrown when trying to check for a frame that doesn't exist in 3rd party env
      try {
        if (f.frames['__tcfapiLocator']) {
          cmpFrame = f;
          break;
        }
      } catch (e) {}
      if (f === window.top) break;
      f = f.parent;
    }
    return {
      cmpFrame: cmpFrame,
      cmpFunction: cmpFunction
    };
  }
  function cmpResponseCallback(tcfData, success) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)('Received a response from CMP', tcfData);
    if (success) {
      onEvent(tcfData);
      if (tcfData && (tcfData.gdprApplies === false || tcfData.eventStatus === 'tcloaded' || tcfData.eventStatus === 'useractioncomplete')) {
        processCmpData(tcfData, {
          onSuccess: onSuccess,
          onError: onError
        });
      }
    } else {
      onError('CMP unable to register callback function.  Please check CMP setup.');
    }
  }
  var cmpCallbacks = {};
  var _findCMP = findCMP(),
    cmpFrame = _findCMP.cmpFrame,
    cmpFunction = _findCMP.cmpFunction;
  if (!cmpFrame) {
    return onError('TCF2 CMP not found.');
  }
  // to collect the consent information from the user, we perform two calls to the CMP in parallel:
  // first to collect the user's consent choices represented in an encoded string (via getConsentData)
  // second to collect the user's full unparsed consent information (via getVendorConsents)

  // the following code also determines where the CMP is located and uses the proper workflow to communicate with it:
  // check to see if CMP is found on the same window level as prebid and call it directly if so
  // check to see if prebid is in a safeframe (with CMP support)
  // else assume prebid may be inside an iframe and use the IAB CMP locator code to see if CMP's located in a higher parent window. this works in cross domain iframes
  // if the CMP is not found, the iframe function will call the cmpError exit callback to abort the rest of the CMP workflow

  if (typeof cmpFunction === 'function') {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)('Detected CMP API is directly accessible, calling it now...');
    cmpFunction('addEventListener', CMP_VERSION, cmpResponseCallback);
  } else {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)('Detected CMP is outside the current iframe where Prebid.js is located, calling it now...');
    callCmpWhileInIframe('addEventListener', cmpFrame, cmpResponseCallback);
  }
  function callCmpWhileInIframe(commandName, cmpFrame, moduleCallback) {
    var apiName = '__tcfapi';
    var callName = "".concat(apiName, "Call");

    /* Setup up a __cmp function to do the postMessage and stash the callback.
    This function behaves (from the caller's perspective identicially to the in-frame __cmp call */
    window[apiName] = function (cmd, cmpVersion, callback, arg) {
      var callId = Math.random() + '';
      var msg = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, callName, {
        command: cmd,
        version: cmpVersion,
        parameter: arg,
        callId: callId
      });
      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');
    };

    /** when we get the return message, call the stashed callback */
    window.addEventListener('message', readPostMessageResponse, false);

    // call CMP
    window[apiName](commandName, CMP_VERSION, moduleCallback);
    function readPostMessageResponse(event) {
      var cmpDataPkgName = "".concat(apiName, "Return");
      var json = typeof event.data === 'string' && (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.includes)(event.data, cmpDataPkgName) ? JSON.parse(event.data) : event.data;
      if (json[cmpDataPkgName] && json[cmpDataPkgName].callId) {
        var payload = json[cmpDataPkgName];
        // TODO - clean up this logic (move listeners?); we have duplicate messages responses because 2 eventlisteners are active from the 2 cmp requests running in parallel
        if (cmpCallbacks.hasOwnProperty(payload.callId)) {
          cmpCallbacks[payload.callId](payload.returnValue, payload.success);
        }
      }
    }
  }
}

/**
 * Look up consent data and store it in the `consentData` global as well as `adapterManager.js`' gdprDataHandler.
 *
 * @param cb A callback that takes: a boolean that is true if the auction should be canceled; an error message and extra
 * error arguments that will be undefined if there's no error.
 */
function loadConsentData(cb) {
  var isDone = false;
  var timer = null;
  var onTimeout, provisionalConsent;
  var cmpLoaded = false;
  function resetTimeout(timeout) {
    if (timer != null) {
      clearTimeout(timer);
    }
    if (!isDone && timeout != null) {
      if (timeout === 0) {
        onTimeout();
      } else {
        timer = setTimeout(onTimeout, timeout);
      }
    }
  }
  function done(consentData, shouldCancelAuction, errMsg) {
    resetTimeout(null);
    isDone = true;
    _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__.gdprDataHandler.setConsentData(consentData);
    if (typeof cb === 'function') {
      for (var _len = arguments.length, extraArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        extraArgs[_key - 3] = arguments[_key];
      }
      cb.apply(void 0, [shouldCancelAuction, errMsg].concat(extraArgs));
    }
  }
  if (!(0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_2__.includes)(Object.keys(cmpCallMap), userCMP)) {
    done(null, false, "CMP framework (".concat(userCMP, ") is not a supported framework.  Aborting consentManagement module and resuming auction."));
    return;
  }
  var callbacks = {
    onSuccess: function onSuccess(data) {
      return done(data, false);
    },
    onError: function onError(msg) {
      for (var _len2 = arguments.length, extraArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        extraArgs[_key2 - 1] = arguments[_key2];
      }
      done.apply(void 0, [null, true, msg].concat(extraArgs));
    },
    onEvent: function onEvent(consentData) {
      provisionalConsent = consentData;
      if (cmpLoaded) return;
      cmpLoaded = true;
      if (actionTimeout != null) {
        resetTimeout(actionTimeout);
      }
    }
  };
  onTimeout = function onTimeout() {
    var continueToAuction = function continueToAuction(data) {
      done(data, false, "".concat(cmpLoaded ? 'Timeout waiting for user action on CMP' : 'CMP did not load', ", continuing auction..."));
    };
    processCmpData(provisionalConsent, {
      onSuccess: continueToAuction,
      onError: function onError() {
        return continueToAuction(storeConsentData(undefined));
      }
    });
  };
  cmpCallMap[userCMP](callbacks);
  if (!(actionTimeout != null && cmpLoaded)) {
    resetTimeout(consentTimeout);
  }
}

/**
 * Like `loadConsentData`, but cache and re-use previously loaded data.
 * @param cb
 */
function loadIfMissing(cb) {
  if (consentData) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)('User consent information already known.  Pulling internally stored information...');
    // eslint-disable-next-line standard/no-callback-literal
    cb(false);
  } else {
    loadConsentData(cb);
  }
}

/**
 * If consentManagement module is enabled (ie included in setConfig), this hook function will attempt to fetch the
 * user's encoded consent string from the supported CMP.  Once obtained, the module will store this
 * data as part of a gdprConsent object which gets transferred to adapterManager's gdprDataHandler object.
 * This information is later added into the bidRequest object for any supported adapters to read/pass along to their system.
 * @param {object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */
var requestBidsHook = (0,_src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_4__.timedAuctionHook)('gdpr', function requestBidsHook(fn, reqBidsConfigObj) {
  loadIfMissing(function (shouldCancelAuction, errMsg) {
    if (errMsg) {
      var log = _src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logWarn;
      if (shouldCancelAuction) {
        log = _src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError;
        errMsg = "".concat(errMsg, " Canceling auction as per consentManagement config.");
      }
      for (var _len3 = arguments.length, extraArgs = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        extraArgs[_key3 - 2] = arguments[_key3];
      }
      log.apply(void 0, [errMsg].concat(extraArgs));
    }
    if (shouldCancelAuction) {
      fn.stopTiming();
      if (typeof reqBidsConfigObj.bidsBackHandler === 'function') {
        reqBidsConfigObj.bidsBackHandler();
      } else {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError)('Error executing bidsBackHandler');
      }
    } else {
      fn.call(this, reqBidsConfigObj);
    }
  });
});

/**
 * This function checks the consent data provided by CMP to ensure it's in an expected state.
 * If it's bad, we call `onError`
 * If it's good, then we store the value and call `onSuccess`
 */
function processCmpData(consentObject, _ref3) {
  var onSuccess = _ref3.onSuccess,
    onError = _ref3.onError;
  function checkData() {
    // if CMP does not respond with a gdprApplies boolean, use defaultGdprScope (gdprScope)
    var gdprApplies = consentObject && typeof consentObject.gdprApplies === 'boolean' ? consentObject.gdprApplies : gdprScope;
    var tcString = consentObject && consentObject.tcString;
    return !!(typeof gdprApplies !== 'boolean' || gdprApplies === true && (!tcString || !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(tcString)));
  }
  if (checkData()) {
    onError("CMP returned unexpected value during lookup process.", consentObject);
  } else {
    onSuccess(storeConsentData(consentObject));
  }
}

/**
 * Stores CMP data locally in module to make information available in adaptermanager.js for later in the auction
 * @param {object} cmpConsentObject required; an object representing user's consent choices (can be undefined in certain use-cases for this function only)
 */
function storeConsentData(cmpConsentObject) {
  consentData = {
    consentString: cmpConsentObject ? cmpConsentObject.tcString : undefined,
    vendorData: cmpConsentObject || undefined,
    gdprApplies: cmpConsentObject && typeof cmpConsentObject.gdprApplies === 'boolean' ? cmpConsentObject.gdprApplies : gdprScope
  };
  if (cmpConsentObject && cmpConsentObject.addtlConsent && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(cmpConsentObject.addtlConsent)) {
    consentData.addtlConsent = cmpConsentObject.addtlConsent;
  }
  consentData.apiVersion = CMP_VERSION;
  return consentData;
}

/**
 * Simply resets the module's consentData variable back to undefined, mainly for testing purposes
 */
function resetConsentData() {
  consentData = undefined;
  userCMP = undefined;
  consentTimeout = undefined;
  _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__.gdprDataHandler.reset();
}

/**
 * A configuration function that initializes some module variables, as well as add a hook into the requestBids function
 * @param {{cmp:string, timeout:number, allowAuctionWithoutConsent:boolean, defaultGdprScope:boolean}} config required; consentManagement module config settings; cmp (string), timeout (int), allowAuctionWithoutConsent (boolean)
 */
function setConsentConfig(config) {
  // if `config.gdpr`, `config.usp` or `config.gpp` exist, assume new config format.
  // else for backward compatability, just use `config`
  config = config && (config.gdpr || config.usp || config.gpp ? config.gdpr : config);
  if (!config || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__["default"])(config) !== 'object') {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logWarn)('consentManagement (gdpr) config not defined, exiting consent manager');
    return;
  }
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(config.cmpApi)) {
    userCMP = config.cmpApi;
  } else {
    userCMP = DEFAULT_CMP;
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)("consentManagement config did not specify cmp.  Using system default setting (".concat(DEFAULT_CMP, ")."));
  }
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(config.timeout)) {
    consentTimeout = config.timeout;
  } else {
    consentTimeout = DEFAULT_CONSENT_TIMEOUT;
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)("consentManagement config did not specify timeout.  Using system default setting (".concat(DEFAULT_CONSENT_TIMEOUT, ")."));
  }
  actionTimeout = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(config.actionTimeout) ? config.actionTimeout : null;

  // if true, then gdprApplies should be set to true
  gdprScope = config.defaultGdprScope === true;
  (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logInfo)('consentManagement module has been activated...');
  if (userCMP === 'static') {
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(config.consentData)) {
      var _staticConsentData;
      staticConsentData = config.consentData;
      if (((_staticConsentData = staticConsentData) === null || _staticConsentData === void 0 ? void 0 : _staticConsentData.getTCData) != null) {
        // accept static config with or without `getTCData` - see https://github.com/prebid/Prebid.js/issues/9581
        staticConsentData = staticConsentData.getTCData;
      }
      consentTimeout = 0;
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.logError)("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.");
    }
  }
  if (!addedConsentHook) {
    (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__.getGlobal)().requestBids.before(requestBidsHook, 50);
  }
  addedConsentHook = true;
  _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__.gdprDataHandler.enable();
  loadConsentData(); // immediately look up consent data to make it available without requiring an auction
}

_src_config_js__WEBPACK_IMPORTED_MODULE_7__.config.getConfig('consentManagement', function (config) {
  return setConsentConfig(config.consentManagement);
});
function enrichFPDHook(next, fpd) {
  return next(fpd.then(function (ortb2) {
    var consent = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__.gdprDataHandler.getConsentData();
    if (consent) {
      if (typeof consent.gdprApplies === 'boolean') {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_8__.dset)(ortb2, 'regs.ext.gdpr', consent.gdprApplies ? 1 : 0);
      }
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_8__.dset)(ortb2, 'user.ext.consent', consent.consentString);
    }
    return ortb2;
  }));
}
_src_fpd_enrichment_js__WEBPACK_IMPORTED_MODULE_9__.enrichFPD.before(enrichFPDHook);
function setOrtbAdditionalConsent(ortbRequest, bidderRequest) {
  var _bidderRequest$gdprCo;
  // this is not a standardized name for addtlConsent, so keep this as an ORTB library processor rather than an FPD enrichment
  var addtl = (_bidderRequest$gdprCo = bidderRequest.gdprConsent) === null || _bidderRequest$gdprCo === void 0 ? void 0 : _bidderRequest$gdprCo.addtlConsent;
  if (addtl && typeof addtl === 'string') {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_8__.dset)(ortbRequest, 'user.ext.ConsentedProvidersSettings.consented_providers', addtl);
  }
}
(0,_src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_10__.registerOrtbProcessor)({
  type: _src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_10__.REQUEST,
  name: 'gdprAddtlConsent',
  fn: setOrtbAdditionalConsent
});
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__.registerModule)('consentManagement');

/***/ }),

/***/ "./src/pbjsORTB.js":
/*!*************************!*\
  !*** ./src/pbjsORTB.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REQUEST": function() { return /* binding */ REQUEST; },
/* harmony export */   "registerOrtbProcessor": function() { return /* binding */ registerOrtbProcessor; }
/* harmony export */ });
/* unused harmony exports PROCESSOR_TYPES, PROCESSOR_DIALECTS, IMP, BID_RESPONSE, RESPONSE, DEFAULT, PBS, processorRegistry, getProcessors */
var PROCESSOR_TYPES = ['request', 'imp', 'bidResponse', 'response'];
var PROCESSOR_DIALECTS = ['default', 'pbs'];
var REQUEST = PROCESSOR_TYPES[0],
  IMP = PROCESSOR_TYPES[1],
  BID_RESPONSE = PROCESSOR_TYPES[2],
  RESPONSE = PROCESSOR_TYPES[3];

var DEFAULT = PROCESSOR_DIALECTS[0],
  PBS = PROCESSOR_DIALECTS[1];

var types = new Set(PROCESSOR_TYPES);
function processorRegistry() {
  var processors = {};
  return {
    registerOrtbProcessor: function registerOrtbProcessor(_ref) {
      var type = _ref.type,
        name = _ref.name,
        fn = _ref.fn,
        _ref$priority = _ref.priority,
        priority = _ref$priority === void 0 ? 0 : _ref$priority,
        _ref$dialects = _ref.dialects,
        dialects = _ref$dialects === void 0 ? [DEFAULT] : _ref$dialects;
      if (!types.has(type)) {
        throw new Error("ORTB processor type must be one of: ".concat(PROCESSOR_TYPES.join(', ')));
      }
      dialects.forEach(function (dialect) {
        if (!processors.hasOwnProperty(dialect)) {
          processors[dialect] = {};
        }
        if (!processors[dialect].hasOwnProperty(type)) {
          processors[dialect][type] = {};
        }
        processors[dialect][type][name] = {
          priority: priority,
          fn: fn
        };
      });
    },
    getProcessors: function getProcessors(dialect) {
      return processors[dialect] || {};
    }
  };
}
var _processorRegistry = processorRegistry(),
  registerOrtbProcessor = _processorRegistry.registerOrtbProcessor,
  getProcessors = _processorRegistry.getProcessors;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/consentManagement.js"));
/******/ }
]);
//# sourceMappingURL=consentManagement.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["criteoBidAdapter"],{

/***/ "./modules/criteoBidAdapter.js":
/*!*************************************!*\
  !*** ./modules/criteoBidAdapter.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports ADAPTER_VERSION, PROFILE_ID_PUBLISHERTAG, storage, FAST_BID_VERSION_CURRENT, spec, canFastBid, getFastBidUrl, tryGetCriteoFastBid */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_adloader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/adloader.js */ "./src/adloader.js");
/* harmony import */ var _src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../src/adapters/bidderFactory.js */ "./src/adapters/bidderFactory.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/mediaTypes.js */ "./src/mediaTypes.js");
/* harmony import */ var _src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/polyfill.js */ "./src/polyfill.js");
/* harmony import */ var criteo_direct_rsa_validate_build_verify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! criteo-direct-rsa-validate/build/verify.js */ "./node_modules/criteo-direct-rsa-validate/build/verify.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_refererDetection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/refererDetection.js */ "./src/refererDetection.js");
/* harmony import */ var _src_utils_gpdr_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/utils/gpdr.js */ "./src/utils/gpdr.js");
/* harmony import */ var _src_Renderer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/Renderer.js */ "./src/Renderer.js");
/* harmony import */ var _src_video_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/video.js */ "./src/video.js");








 // ref#2





var GVLID = 91;
var ADAPTER_VERSION = 36;
var BIDDER_CODE = 'criteo';
var CDB_ENDPOINT = 'https://bidder.criteo.com/cdb';
var PROFILE_ID_INLINE = 207;
var PROFILE_ID_PUBLISHERTAG = 185;
var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_1__.getStorageManager)({
  bidderCode: BIDDER_CODE
});
var LOG_PREFIX = 'Criteo: ';

/*
  If you don't want to use the FastBid adapter feature, you can lighten criteoBidAdapter size by :
  1. commenting the tryGetCriteoFastBid function inner content (see ref#1)
  2. removing the line 'verify' function import line (see ref#2)

  Unminified source code can be found in the privately shared repo: https://github.com/Prebid-org/prebid-js-external-js-criteo/blob/master/dist/prod.js
*/
var FAST_BID_VERSION_PLACEHOLDER = '%FAST_BID_VERSION%';
var FAST_BID_VERSION_CURRENT = 136;
var FAST_BID_VERSION_LATEST = 'latest';
var FAST_BID_VERSION_NONE = 'none';
var PUBLISHER_TAG_URL_TEMPLATE = 'https://static.criteo.net/js/ld/publishertag.prebid' + FAST_BID_VERSION_PLACEHOLDER + '.js';
var PUBLISHER_TAG_OUTSTREAM_SRC = 'https://static.criteo.net/js/ld/publishertag.renderer.js';
var FAST_BID_PUBKEY_E = 65537;
var FAST_BID_PUBKEY_N = 'ztQYwCE5BU7T9CDM5he6rKoabstXRmkzx54zFPZkWbK530dwtLBDeaWBMxHBUT55CYyboR/EZ4efghPi3CoNGfGWezpjko9P6p2EwGArtHEeS4slhu/SpSIFMjG6fdrpRoNuIAMhq1Z+Pr/+HOd1pThFKeGFr2/NhtAg+TXAzaU=';
var OPTOUT_COOKIE_NAME = 'cto_optout';
var BUNDLE_COOKIE_NAME = 'cto_bundle';
var GUID_RETENTION_TIME_HOUR = 24 * 30 * 13; // 13 months
var OPTOUT_RETENTION_TIME_HOUR = 5 * 12 * 30 * 24; // 5 years

/** @type {BidderSpec} */
var spec = {
  code: BIDDER_CODE,
  gvlid: GVLID,
  supportedMediaTypes: [_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.BANNER, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.VIDEO, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.NATIVE],
  getUserSyncs: function getUserSyncs(syncOptions, _, gdprConsent, uspConsent) {
    var fastBidVersion = _src_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('criteo.fastBidVersion');
    if (canFastBid(fastBidVersion)) {
      return [];
    }
    var refererInfo = (0,_src_refererDetection_js__WEBPACK_IMPORTED_MODULE_4__.getRefererInfo)();
    var origin = 'criteoPrebidAdapter';
    if (syncOptions.iframeEnabled && (0,_src_utils_gpdr_js__WEBPACK_IMPORTED_MODULE_5__.hasPurpose1Consent)(gdprConsent)) {
      var queryParams = [];
      queryParams.push("origin=".concat(origin));
      queryParams.push("topUrl=".concat(refererInfo.domain));
      if (gdprConsent) {
        if (gdprConsent.gdprApplies) {
          queryParams.push("gdpr=".concat(gdprConsent.gdprApplies == true ? 1 : 0));
        }
        if (gdprConsent.consentString) {
          queryParams.push("gdpr_consent=".concat(gdprConsent.consentString));
        }
      }
      if (uspConsent) {
        queryParams.push("us_privacy=".concat(uspConsent));
      }
      var requestId = Math.random().toString();
      var jsonHash = {
        bundle: readFromAllStorages(BUNDLE_COOKIE_NAME),
        cw: storage.cookiesAreEnabled(),
        lsw: storage.localStorageIsEnabled(),
        optoutCookie: readFromAllStorages(OPTOUT_COOKIE_NAME),
        origin: origin,
        requestId: requestId,
        tld: refererInfo.domain,
        topUrl: refererInfo.domain,
        version: "8.0.0".replace(/\./g, '_')
      };
      window.addEventListener('message', function handler(event) {
        if (!event.data || event.origin != 'https://gum.criteo.com') {
          return;
        }
        if (event.data.requestId !== requestId) {
          return;
        }
        this.removeEventListener('message', handler);
        event.stopImmediatePropagation();
        var response = event.data;
        if (response.optout) {
          deleteFromAllStorages(BUNDLE_COOKIE_NAME);
          saveOnAllStorages(OPTOUT_COOKIE_NAME, true, OPTOUT_RETENTION_TIME_HOUR);
        } else {
          if (response.bundle) {
            saveOnAllStorages(BUNDLE_COOKIE_NAME, response.bundle, GUID_RETENTION_TIME_HOUR);
          }
        }
      }, true);
      var jsonHashSerialized = JSON.stringify(jsonHash).replace(/"/g, '%22');
      return [{
        type: 'iframe',
        url: "https://gum.criteo.com/syncframe?".concat(queryParams.join('&'), "#").concat(jsonHashSerialized)
      }];
    }
    return [];
  },
  /** f
   * @param {object} bid
   * @return {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    // either one of zoneId or networkId should be set
    if (!(bid && bid.params && (bid.params.zoneId || bid.params.networkId))) {
      return false;
    }

    // video media types requires some mandatory params
    if (hasVideoMediaType(bid)) {
      if (!hasValidVideoMediaType(bid)) {
        return false;
      }
    }
    return true;
  },
  /**
   * @param {BidRequest[]} bidRequests
   * @param {*} bidderRequest
   * @return {ServerRequest}
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var _fpd$site, _fpd$user;
    var url;
    var data;
    var fpd = bidderRequest.ortb2 || {};
    Object.assign(bidderRequest, {
      publisherExt: (_fpd$site = fpd.site) === null || _fpd$site === void 0 ? void 0 : _fpd$site.ext,
      userExt: (_fpd$user = fpd.user) === null || _fpd$user === void 0 ? void 0 : _fpd$user.ext,
      ceh: _src_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('criteo.ceh'),
      coppa: _src_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('coppa')
    });

    // If publisher tag not already loaded try to get it from fast bid
    var fastBidVersion = _src_config_js__WEBPACK_IMPORTED_MODULE_3__.config.getConfig('criteo.fastBidVersion');
    var canLoadPublisherTag = canFastBid(fastBidVersion);
    if (!publisherTagAvailable() && canLoadPublisherTag) {
      window.Criteo = window.Criteo || {};
      window.Criteo.usePrebidEvents = false;
      tryGetCriteoFastBid();
      var fastBidUrl = getFastBidUrl(fastBidVersion);
      // Reload the PublisherTag after the timeout to ensure FastBid is up-to-date and tracking done properly
      setTimeout(function () {
        (0,_src_adloader_js__WEBPACK_IMPORTED_MODULE_6__.loadExternalScript)(fastBidUrl, BIDDER_CODE);
      }, bidderRequest.timeout);
    }
    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = new Criteo.PubTag.Adapters.Prebid(PROFILE_ID_PUBLISHERTAG, ADAPTER_VERSION, bidRequests, bidderRequest, "8.0.0", {
        createOutstreamVideoRenderer: createOutstreamVideoRenderer
      });
      url = adapter.buildCdbUrl();
      data = adapter.buildCdbRequest();
    } else {
      var context = buildContext(bidRequests, bidderRequest);
      url = buildCdbUrl(context);
      data = buildCdbRequest(context, bidRequests, bidderRequest);
    }
    if (data) {
      return {
        method: 'POST',
        url: url,
        data: data,
        bidRequests: bidRequests
      };
    }
  },
  /**
   * @param {*} response
   * @param {ServerRequest} request
   * @return {Bid[]}
   */
  interpretResponse: function interpretResponse(response, request) {
    var body = response.body || response;
    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(request);
      if (adapter) {
        return adapter.interpretResponse(body, request);
      }
    }
    var bids = [];
    if (body && body.slots && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.isArray)(body.slots)) {
      body.slots.forEach(function (slot) {
        var _body$ext, _body$ext$paf, _slot$ext, _slot$ext$paf, _slot$ext2, _slot$ext2$meta;
        var bidRequest = (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__.find)(request.bidRequests, function (b) {
          return b.adUnitCode === slot.impid && (!b.params.zoneId || parseInt(b.params.zoneId) === slot.zoneid);
        });
        var bidId = bidRequest.bidId;
        var bid = {
          requestId: bidId,
          cpm: slot.cpm,
          currency: slot.currency,
          netRevenue: true,
          ttl: slot.ttl || 60,
          creativeId: slot.creativecode,
          width: slot.width,
          height: slot.height,
          dealId: slot.deal
        };
        if ((_body$ext = body.ext) !== null && _body$ext !== void 0 && (_body$ext$paf = _body$ext.paf) !== null && _body$ext$paf !== void 0 && _body$ext$paf.transmission && (_slot$ext = slot.ext) !== null && _slot$ext !== void 0 && (_slot$ext$paf = _slot$ext.paf) !== null && _slot$ext$paf !== void 0 && _slot$ext$paf.content_id) {
          var pafResponseMeta = {
            content_id: slot.ext.paf.content_id,
            transmission: response.ext.paf.transmission
          };
          bid.meta = Object.assign({}, bid.meta, {
            paf: pafResponseMeta
          });
        }
        if (slot.adomain) {
          bid.meta = Object.assign({}, bid.meta, {
            advertiserDomains: [slot.adomain].flat()
          });
        }
        if ((_slot$ext2 = slot.ext) !== null && _slot$ext2 !== void 0 && (_slot$ext2$meta = _slot$ext2.meta) !== null && _slot$ext2$meta !== void 0 && _slot$ext2$meta.networkName) {
          bid.meta = Object.assign({}, bid.meta, {
            networkName: slot.ext.meta.networkName
          });
        }
        if (slot.native) {
          if (bidRequest.params.nativeCallback) {
            bid.ad = createNativeAd(bidId, slot.native, bidRequest.params.nativeCallback);
          } else {
            bid.native = createPrebidNativeAd(slot.native);
            bid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.NATIVE;
          }
        } else if (slot.video) {
          bid.vastUrl = slot.displayurl;
          bid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.VIDEO;
          var context = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.video.context');
          // if outstream video, add a default render for it.
          if (context === _src_video_js__WEBPACK_IMPORTED_MODULE_10__.OUTSTREAM) {
            bid.renderer = createOutstreamVideoRenderer(slot);
          }
        } else {
          bid.ad = slot.creative;
        }
        bids.push(bid);
      });
    }
    return bids;
  },
  /**
   * @param {TimedOutBid} timeoutData
   */
  onTimeout: function onTimeout(timeoutData) {
    if (publisherTagAvailable() && Array.isArray(timeoutData)) {
      var auctionsIds = [];
      timeoutData.forEach(function (bid) {
        if (auctionsIds.indexOf(bid.auctionId) === -1) {
          auctionsIds.push(bid.auctionId);
          // eslint-disable-next-line no-undef
          var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
          adapter.handleBidTimeout();
        }
      });
    }
  },
  /**
   * @param {Bid} bid
   */
  onBidWon: function onBidWon(bid) {
    if (publisherTagAvailable() && bid) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
      adapter.handleBidWon(bid);
    }
  },
  /**
   * @param {Bid} bid
   */
  onSetTargeting: function onSetTargeting(bid) {
    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
      adapter.handleSetTargeting(bid);
    }
  }
};
function readFromAllStorages(name) {
  var fromCookie = storage.getCookie(name);
  var fromLocalStorage = storage.getDataFromLocalStorage(name);
  return fromCookie || fromLocalStorage || undefined;
}
function saveOnAllStorages(name, value, expirationTimeHours) {
  var date = new Date();
  date.setTime(date.getTime() + expirationTimeHours * 60 * 60 * 1000);
  var expires = "expires=".concat(date.toUTCString());
  storage.setCookie(name, value, expires);
  storage.setDataInLocalStorage(name, value);
}
function deleteFromAllStorages(name) {
  storage.setCookie(name, '', 0);
  storage.removeDataFromLocalStorage(name);
}

/**
 * @return {boolean}
 */
function publisherTagAvailable() {
  // eslint-disable-next-line no-undef
  return typeof Criteo !== 'undefined' && Criteo.PubTag && Criteo.PubTag.Adapters && Criteo.PubTag.Adapters.Prebid;
}

/**
 * @param {BidRequest[]} bidRequests
 * @param bidderRequest
 */
function buildContext(bidRequests, bidderRequest) {
  var _bidderRequest$refere;
  var referrer = '';
  if (bidderRequest && bidderRequest.refererInfo) {
    referrer = bidderRequest.refererInfo.page;
  }
  var queryString = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.parseUrl)(bidderRequest === null || bidderRequest === void 0 ? void 0 : (_bidderRequest$refere = bidderRequest.refererInfo) === null || _bidderRequest$refere === void 0 ? void 0 : _bidderRequest$refere.topmostLocation).search;
  var context = {
    url: referrer,
    debug: queryString['pbt_debug'] === '1',
    noLog: queryString['pbt_nolog'] === '1',
    amp: false
  };
  bidRequests.forEach(function (bidRequest) {
    if (bidRequest.params.integrationMode === 'amp') {
      context.amp = true;
    }
  });
  return context;
}

/**
 * @param {CriteoContext} context
 * @return {string}
 */
function buildCdbUrl(context) {
  var url = CDB_ENDPOINT;
  url += '?profileId=' + PROFILE_ID_INLINE;
  url += '&av=' + String(ADAPTER_VERSION);
  url += '&wv=' + encodeURIComponent("8.0.0");
  url += '&cb=' + String(Math.floor(Math.random() * 99999999999));
  if (storage.localStorageIsEnabled()) {
    url += '&lsavail=1';
  } else {
    url += '&lsavail=0';
  }
  if (context.amp) {
    url += '&im=1';
  }
  if (context.debug) {
    url += '&debug=1';
  }
  if (context.noLog) {
    url += '&nolog=1';
  }
  var bundle = readFromAllStorages(BUNDLE_COOKIE_NAME);
  if (bundle) {
    url += "&bundle=".concat(bundle);
  }
  var optout = readFromAllStorages(OPTOUT_COOKIE_NAME);
  if (optout) {
    url += "&optout=1";
  }
  return url;
}
function checkNativeSendId(bidRequest) {
  return !(bidRequest.nativeParams && (bidRequest.nativeParams.image && (bidRequest.nativeParams.image.sendId !== true || bidRequest.nativeParams.image.sendTargetingKeys === true) || bidRequest.nativeParams.icon && (bidRequest.nativeParams.icon.sendId !== true || bidRequest.nativeParams.icon.sendTargetingKeys === true) || bidRequest.nativeParams.clickUrl && (bidRequest.nativeParams.clickUrl.sendId !== true || bidRequest.nativeParams.clickUrl.sendTargetingKeys === true) || bidRequest.nativeParams.displayUrl && (bidRequest.nativeParams.displayUrl.sendId !== true || bidRequest.nativeParams.displayUrl.sendTargetingKeys === true) || bidRequest.nativeParams.privacyLink && (bidRequest.nativeParams.privacyLink.sendId !== true || bidRequest.nativeParams.privacyLink.sendTargetingKeys === true) || bidRequest.nativeParams.privacyIcon && (bidRequest.nativeParams.privacyIcon.sendId !== true || bidRequest.nativeParams.privacyIcon.sendTargetingKeys === true)));
}

/**
 * @param {CriteoContext} context
 * @param {BidRequest[]} bidRequests
 * @param bidderRequest
 * @return {*}
 */
function buildCdbRequest(context, bidRequests, bidderRequest) {
  var _bidderRequest$ortb, _bidderRequest$ortb$r, _bidderRequest$ortb2, _bidderRequest$ortb2$, _bidderRequest$ortb3, _bidderRequest$ortb3$, _bidderRequest$ortb4, _bidderRequest$ortb5, _bidderRequest$ortb6, _bidderRequest$ortb6$, _bidderRequest$ortb8, _bidderRequest$ortb9, _bidderRequest$ortb10;
  var networkId;
  var schain;
  var userIdAsEids;
  var request = {
    id: (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.generateUUID)(),
    publisher: {
      url: context.url,
      ext: bidderRequest.publisherExt
    },
    regs: {
      coppa: bidderRequest.coppa === true ? 1 : bidderRequest.coppa === false ? 0 : undefined,
      gpp: (_bidderRequest$ortb = bidderRequest.ortb2) === null || _bidderRequest$ortb === void 0 ? void 0 : (_bidderRequest$ortb$r = _bidderRequest$ortb.regs) === null || _bidderRequest$ortb$r === void 0 ? void 0 : _bidderRequest$ortb$r.gpp,
      gpp_sid: (_bidderRequest$ortb2 = bidderRequest.ortb2) === null || _bidderRequest$ortb2 === void 0 ? void 0 : (_bidderRequest$ortb2$ = _bidderRequest$ortb2.regs) === null || _bidderRequest$ortb2$ === void 0 ? void 0 : _bidderRequest$ortb2$.gpp_sid
    },
    slots: bidRequests.map(function (bidRequest) {
      var _bidRequest$ortb2Imp, _bidRequest$ortb2Imp$, _bidRequest$nativeOrt;
      if (!userIdAsEids) {
        userIdAsEids = bidRequest.userIdAsEids;
      }
      networkId = bidRequest.params.networkId || networkId;
      schain = bidRequest.schain || schain;
      var slot = {
        impid: bidRequest.adUnitCode,
        transactionid: (_bidRequest$ortb2Imp = bidRequest.ortb2Imp) === null || _bidRequest$ortb2Imp === void 0 ? void 0 : (_bidRequest$ortb2Imp$ = _bidRequest$ortb2Imp.ext) === null || _bidRequest$ortb2Imp$ === void 0 ? void 0 : _bidRequest$ortb2Imp$.tid
      };
      if (bidRequest.params.zoneId) {
        slot.zoneid = bidRequest.params.zoneId;
      }
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'ortb2Imp.ext')) {
        slot.ext = bidRequest.ortb2Imp.ext;
      }
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'ortb2Imp.rwdd')) {
        slot.rwdd = bidRequest.ortb2Imp.rwdd;
      }
      if (bidRequest.params.ext) {
        slot.ext = Object.assign({}, slot.ext, bidRequest.params.ext);
      }
      if ((_bidRequest$nativeOrt = bidRequest.nativeOrtbRequest) !== null && _bidRequest$nativeOrt !== void 0 && _bidRequest$nativeOrt.assets) {
        slot.ext = Object.assign({}, slot.ext, {
          assets: bidRequest.nativeOrtbRequest.assets
        });
      }
      if (bidRequest.params.publisherSubId) {
        slot.publishersubid = bidRequest.params.publisherSubId;
      }
      if (bidRequest.params.nativeCallback || hasNativeMediaType(bidRequest)) {
        slot.native = true;
        if (!checkNativeSendId(bidRequest)) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logWarn)(LOG_PREFIX + 'all native assets containing URL should be sent as placeholders with sendId(icon, image, clickUrl, displayUrl, privacyLink, privacyIcon)');
        }
      }
      if (hasBannerMediaType(bidRequest)) {
        slot.sizes = parseSizes((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.banner.sizes'), parseSize);
      } else {
        slot.sizes = [];
      }
      if (hasVideoMediaType(bidRequest)) {
        var video = {
          playersizes: parseSizes((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.video.playerSize'), parseSize),
          mimes: bidRequest.mediaTypes.video.mimes,
          protocols: bidRequest.mediaTypes.video.protocols,
          maxduration: bidRequest.mediaTypes.video.maxduration,
          api: bidRequest.mediaTypes.video.api,
          skip: bidRequest.mediaTypes.video.skip,
          placement: bidRequest.mediaTypes.video.placement,
          minduration: bidRequest.mediaTypes.video.minduration,
          playbackmethod: bidRequest.mediaTypes.video.playbackmethod,
          startdelay: bidRequest.mediaTypes.video.startdelay,
          plcmt: bidRequest.mediaTypes.video.plcmt
        };
        var paramsVideo = bidRequest.params.video;
        if (paramsVideo !== undefined) {
          video.skip = video.skip || paramsVideo.skip || 0;
          video.placement = video.placement || paramsVideo.placement;
          video.minduration = video.minduration || paramsVideo.minduration;
          video.playbackmethod = video.playbackmethod || paramsVideo.playbackmethod;
          video.startdelay = video.startdelay || paramsVideo.startdelay || 0;
        }
        slot.video = video;
      }
      enrichSlotWithFloors(slot, bidRequest);
      return slot;
    })
  };
  if (networkId) {
    request.publisher.networkid = networkId;
  }
  request.source = {
    tid: (_bidderRequest$ortb3 = bidderRequest.ortb2) === null || _bidderRequest$ortb3 === void 0 ? void 0 : (_bidderRequest$ortb3$ = _bidderRequest$ortb3.source) === null || _bidderRequest$ortb3$ === void 0 ? void 0 : _bidderRequest$ortb3$.tid
  };
  if (schain) {
    request.source.ext = {
      schain: schain
    };
  }
  ;
  request.user = ((_bidderRequest$ortb4 = bidderRequest.ortb2) === null || _bidderRequest$ortb4 === void 0 ? void 0 : _bidderRequest$ortb4.user) || {};
  request.site = ((_bidderRequest$ortb5 = bidderRequest.ortb2) === null || _bidderRequest$ortb5 === void 0 ? void 0 : _bidderRequest$ortb5.site) || {};
  if (bidderRequest && bidderRequest.ceh) {
    request.user.ceh = bidderRequest.ceh;
  }
  if (bidderRequest && bidderRequest.gdprConsent) {
    request.gdprConsent = {};
    if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
      request.gdprConsent.gdprApplies = !!bidderRequest.gdprConsent.gdprApplies;
    }
    request.gdprConsent.version = bidderRequest.gdprConsent.apiVersion;
    if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
      request.gdprConsent.consentData = bidderRequest.gdprConsent.consentString;
    }
  }
  if (bidderRequest && bidderRequest.uspConsent) {
    request.user.uspIab = bidderRequest.uspConsent;
  }
  if (bidderRequest && (_bidderRequest$ortb6 = bidderRequest.ortb2) !== null && _bidderRequest$ortb6 !== void 0 && (_bidderRequest$ortb6$ = _bidderRequest$ortb6.device) !== null && _bidderRequest$ortb6$ !== void 0 && _bidderRequest$ortb6$.sua) {
    var _bidderRequest$ortb7, _bidderRequest$ortb7$;
    request.user.ext = request.user.ext || {};
    request.user.ext.sua = ((_bidderRequest$ortb7 = bidderRequest.ortb2) === null || _bidderRequest$ortb7 === void 0 ? void 0 : (_bidderRequest$ortb7$ = _bidderRequest$ortb7.device) === null || _bidderRequest$ortb7$ === void 0 ? void 0 : _bidderRequest$ortb7$.sua) || {};
  }
  if (userIdAsEids) {
    request.user.ext = request.user.ext || {};
    request.user.ext.eids = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_11__["default"])(userIdAsEids);
  }
  if (bidderRequest && (_bidderRequest$ortb8 = bidderRequest.ortb2) !== null && _bidderRequest$ortb8 !== void 0 && _bidderRequest$ortb8.bcat) {
    request.bcat = bidderRequest.ortb2.bcat;
  }
  if (bidderRequest && (_bidderRequest$ortb9 = bidderRequest.ortb2) !== null && _bidderRequest$ortb9 !== void 0 && _bidderRequest$ortb9.badv) {
    request.badv = bidderRequest.ortb2.badv;
  }
  if (bidderRequest && (_bidderRequest$ortb10 = bidderRequest.ortb2) !== null && _bidderRequest$ortb10 !== void 0 && _bidderRequest$ortb10.bapp) {
    request.bapp = bidderRequest.ortb2.bapp;
  }
  return request;
}
function parseSizes(sizes) {
  var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
    return s;
  };
  if (sizes == undefined) {
    return [];
  }
  if (Array.isArray(sizes[0])) {
    // is there several sizes ? (ie. [[728,90],[200,300]])
    return sizes.map(function (size) {
      return parser(size);
    });
  }
  return [parser(sizes)]; // or a single one ? (ie. [728,90])
}

function parseSize(size) {
  return size[0] + 'x' + size[1];
}
function hasVideoMediaType(bidRequest) {
  return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.video') !== undefined;
}
function hasBannerMediaType(bidRequest) {
  return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.banner') !== undefined;
}
function hasNativeMediaType(bidRequest) {
  return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.native') !== undefined;
}
function hasValidVideoMediaType(bidRequest) {
  var isValid = true;
  var requiredMediaTypesParams = ['mimes', 'playerSize', 'maxduration', 'protocols', 'api', 'skip', 'placement', 'playbackmethod'];
  requiredMediaTypesParams.forEach(function (param) {
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.video.' + param) === undefined && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'params.video.' + param) === undefined) {
      isValid = false;
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logError)('Criteo Bid Adapter: mediaTypes.video.' + param + ' is required');
    }
  });
  if (isValid) {
    var videoPlacement = bidRequest.mediaTypes.video.placement || bidRequest.params.video.placement;
    // We do not support long form for now, also we have to check that context & placement are consistent
    if (bidRequest.mediaTypes.video.context == 'instream' && videoPlacement === 1) {
      return true;
    } else if (bidRequest.mediaTypes.video.context == 'outstream' && videoPlacement !== 1) {
      return true;
    }
  }
  return false;
}

/**
 * Create prebid compatible native ad with native payload
 * @param {*} payload
 * @returns prebid native ad assets
 */
function createPrebidNativeAd(payload) {
  return {
    sendTargetingKeys: false,
    // no key is added to KV by default
    title: payload.products[0].title,
    body: payload.products[0].description,
    sponsoredBy: payload.advertiser.description,
    icon: payload.advertiser.logo,
    image: payload.products[0].image,
    clickUrl: payload.products[0].click_url,
    privacyLink: payload.privacy.optout_click_url,
    privacyIcon: payload.privacy.optout_image_url,
    cta: payload.products[0].call_to_action,
    price: payload.products[0].price,
    impressionTrackers: payload.impression_pixels.map(function (pix) {
      return pix.url;
    })
  };
}

/**
 * @param {string} id
 * @param {*} payload
 * @param {*} callback
 * @return {string}
 */
function createNativeAd(id, payload, callback) {
  // Store the callback and payload in a global object to be later accessed from the creative
  var slotsName = 'criteo_prebid_native_slots';
  window[slotsName] = window[slotsName] || {};
  window[slotsName][id] = {
    callback: callback,
    payload: payload
  };

  // The creative is in an iframe so we have to get the callback and payload
  // from the parent window (doesn't work with safeframes)
  return "\n<script type=\"text/javascript\">\nfor (var i = 0; i < 10; ++i) {\n var slots = window.parent.".concat(slotsName, ";\n  if(!slots){continue;}\n  var responseSlot = slots[\"").concat(id, "\"];\n  responseSlot.callback(responseSlot.payload);\n  break;\n}\n</script>");
}
function pickAvailableGetFloorFunc(bidRequest) {
  if (bidRequest.getFloor) {
    return bidRequest.getFloor;
  }
  if (bidRequest.params.bidFloor && bidRequest.params.bidFloorCur) {
    try {
      var floor = parseFloat(bidRequest.params.bidFloor);
      return function () {
        return {
          currency: bidRequest.params.bidFloorCur,
          floor: floor
        };
      };
    } catch (_unused) {}
  }
  return undefined;
}
function enrichSlotWithFloors(slot, bidRequest) {
  try {
    var slotFloors = {};
    var getFloor = pickAvailableGetFloorFunc(bidRequest);
    if (getFloor) {
      var _bidRequest$mediaType, _bidRequest$mediaType2, _bidRequest$mediaType3;
      if ((_bidRequest$mediaType = bidRequest.mediaTypes) !== null && _bidRequest$mediaType !== void 0 && _bidRequest$mediaType.banner) {
        slotFloors.banner = {};
        var bannerSizes = parseSizes((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.banner.sizes'));
        bannerSizes.forEach(function (bannerSize) {
          return slotFloors.banner[parseSize(bannerSize).toString()] = getFloor.call(bidRequest, {
            size: bannerSize,
            mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.BANNER
          });
        });
      }
      if ((_bidRequest$mediaType2 = bidRequest.mediaTypes) !== null && _bidRequest$mediaType2 !== void 0 && _bidRequest$mediaType2.video) {
        slotFloors.video = {};
        var videoSizes = parseSizes((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_9__["default"])(bidRequest, 'mediaTypes.video.playerSize'));
        videoSizes.forEach(function (videoSize) {
          return slotFloors.video[parseSize(videoSize).toString()] = getFloor.call(bidRequest, {
            size: videoSize,
            mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.VIDEO
          });
        });
      }
      if ((_bidRequest$mediaType3 = bidRequest.mediaTypes) !== null && _bidRequest$mediaType3 !== void 0 && _bidRequest$mediaType3.native) {
        slotFloors.native = {};
        slotFloors.native['*'] = getFloor.call(bidRequest, {
          size: '*',
          mediaType: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_2__.NATIVE
        });
      }
      if (Object.keys(slotFloors).length > 0) {
        if (!slot.ext) {
          slot.ext = {};
        }
        Object.assign(slot.ext, {
          floors: slotFloors
        });
      }
    }
  } catch (e) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logError)('Could not parse floors from Prebid: ' + e);
  }
}
function canFastBid(fastBidVersion) {
  return fastBidVersion !== FAST_BID_VERSION_NONE;
}
function getFastBidUrl(fastBidVersion) {
  var version;
  if (fastBidVersion === FAST_BID_VERSION_LATEST) {
    version = '';
  } else if (fastBidVersion) {
    var majorVersion = String(fastBidVersion).split('.')[0];
    if (majorVersion < 102) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logWarn)('Specifying a Fastbid version which is not supporting version selection.');
    }
    version = '.' + fastBidVersion;
  } else {
    version = '.' + FAST_BID_VERSION_CURRENT;
  }
  return PUBLISHER_TAG_URL_TEMPLATE.replace(FAST_BID_VERSION_PLACEHOLDER, version);
}
function createOutstreamVideoRenderer(slot) {
  if (slot.ext.videoPlayerConfig === undefined || slot.ext.videoPlayerType === undefined) {
    return undefined;
  }
  var config = {
    documentResolver: function documentResolver(bid, sourceDocument, renderDocument) {
      return renderDocument !== null && renderDocument !== void 0 ? renderDocument : sourceDocument;
    }
  };
  var render = function render(bid, renderDocument) {
    var payload = {
      slotid: slot.impid,
      vastUrl: slot.displayurl,
      vastXml: slot.creative,
      documentContext: renderDocument
    };
    var outstreamConfig = slot.ext.videoPlayerConfig;
    window.CriteoOutStream[slot.ext.videoPlayerType].play(payload, outstreamConfig);
  };
  var renderer = _src_Renderer_js__WEBPACK_IMPORTED_MODULE_12__.Renderer.install({
    url: PUBLISHER_TAG_OUTSTREAM_SRC,
    config: config
  });
  renderer.setRender(render);
  return renderer;
}
function tryGetCriteoFastBid() {
  // begin ref#1
  try {
    var fastBidStorageKey = 'criteo_fast_bid';
    var hashPrefix = '// Hash: ';
    var fastBidFromStorage = storage.getDataFromLocalStorage(fastBidStorageKey);
    if (fastBidFromStorage !== null) {
      // The value stored must contain the file's encrypted hash as first line
      var firstLineEndPosition = fastBidFromStorage.indexOf('\n');
      var firstLine = fastBidFromStorage.substr(0, firstLineEndPosition).trim();
      if (firstLine.substr(0, hashPrefix.length) !== hashPrefix) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logWarn)('No hash found in FastBid');
        storage.removeDataFromLocalStorage(fastBidStorageKey);
      } else {
        // Remove the hash part from the locally stored value
        var publisherTagHash = firstLine.substr(hashPrefix.length);
        var publisherTag = fastBidFromStorage.substr(firstLineEndPosition + 1);
        if ((0,criteo_direct_rsa_validate_build_verify_js__WEBPACK_IMPORTED_MODULE_0__.verify)(publisherTag, publisherTagHash, FAST_BID_PUBKEY_N, FAST_BID_PUBKEY_E)) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logInfo)('Using Criteo FastBid');
          eval(publisherTag); // eslint-disable-line no-eval
        } else {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.logWarn)('Invalid Criteo FastBid found');
          storage.removeDataFromLocalStorage(fastBidStorageKey);
        }
      }
    }
  } catch (e) {
    // Unable to get fast bid
  }
  // end ref#1
}

(0,_src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_13__.registerBidder)(spec);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_14__.registerModule)('criteoBidAdapter');

/***/ }),

/***/ "./src/utils/gpdr.js":
/*!***************************!*\
  !*** ./src/utils/gpdr.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasPurpose1Consent": function() { return /* binding */ hasPurpose1Consent; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/dlv/index.js");


/**
 * Check if GDPR purpose 1 consent was given.
 *
 * @param gdprConsent GDPR consent data
 * @returns {boolean} true if the gdprConsent is null-y; or GDPR does not apply; or if purpose 1 consent was given.
 */
function hasPurpose1Consent(gdprConsent) {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.logWarn)("Privacy - checking purpose1Consent - ".concat(gdprConsent));
  if (gdprConsent === null) {
    var _window$owpbjs, _window$owpbjs$getCon, _window$owpbjs$getCon2;
    // logWarn(`Privacy - gdprConsent is null, checking value of defaultGdprScope = ${owpbjs?.getConfig().consentManagement?.gdpr?.defaultGdprScope}`);
    return !(((_window$owpbjs = window.owpbjs) === null || _window$owpbjs === void 0 ? void 0 : (_window$owpbjs$getCon = _window$owpbjs.getConfig().consentManagement) === null || _window$owpbjs$getCon === void 0 ? void 0 : (_window$owpbjs$getCon2 = _window$owpbjs$getCon.gdpr) === null || _window$owpbjs$getCon2 === void 0 ? void 0 : _window$owpbjs$getCon2.defaultGdprScope) === true);
  }
  if (gdprConsent !== null && gdprConsent !== void 0 && gdprConsent.gdprApplies) {
    // logWarn(`Privacy - gdprConsent?.gdprApplies = ${gdprConsent?.gdprApplies} and purpose consent = ${gdprConsent.vendorData.purpose.consents}`);
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"])(gdprConsent, 'vendorData.purpose.consents.1') === true;
  }
  return true;
}

/***/ }),

/***/ "./node_modules/criteo-direct-rsa-validate/build/jsbnLite.js":
/*!*******************************************************************!*\
  !*** ./node_modules/criteo-direct-rsa-validate/build/jsbnLite.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
var BigInteger = /** @class */ (function () {
    function BigInteger(a) {
        if (a !== null) {
            this.fromHexString(a);
        }
    }
    BigInteger.prototype.toHexString = function () {
        if (this.s < 0) {
            return "-" + this.negate().toHexString();
        }
        var k = 4;
        var km = (1 << k) - 1;
        var d;
        var m = false;
        var r = "";
        var i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & ((1 << p) - 1)) << (k - p);
                    d |= this[--i] >> (p += this.DB - k);
                }
                else {
                    d = (this[i] >> (p -= k)) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if (d > 0) {
                    m = true;
                }
                if (m) {
                    r += int2char(d);
                }
            }
        }
        return m ? r : "0";
    };
    BigInteger.prototype.fromHexString = function (s) {
        if (s === null) {
            return;
        }
        var k = 4;
        this.t = 0;
        this.s = 0;
        var i = s.length;
        var mi = false;
        var sh = 0;
        while (--i >= 0) {
            var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-") {
                    mi = true;
                }
                continue;
            }
            mi = false;
            if (sh == 0) {
                this[this.t++] = x;
            }
            else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            }
            else {
                this[this.t - 1] |= x << sh;
            }
            sh += k;
            if (sh >= this.DB) {
                sh -= this.DB;
            }
        }
        if (k == 8 && ((+s[0]) & 0x80) != 0) {
            this.s = -1;
            if (sh > 0) {
                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
            }
        }
        this.clamp();
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    };
    BigInteger.prototype.negate = function () {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
    };
    BigInteger.prototype.abs = function () {
        return (this.s < 0) ? this.negate() : this;
    };
    BigInteger.prototype.mod = function (a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r);
        }
        return r;
    };
    BigInteger.prototype.copyTo = function (r) {
        for (var i = this.t - 1; i >= 0; --i) {
            r[i] = this[i];
        }
        r.t = this.t;
        r.s = this.s;
    };
    BigInteger.prototype.lShiftTo = function (n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB);
        var c = (this.s << bs) & this.DM;
        for (var i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = (this[i] >> cbs) | c;
            c = (this[i] & bm) << bs;
        }
        for (var i = ds - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    };
    BigInteger.prototype.invDigit = function () {
        if (this.t < 1) {
            return 0;
        }
        var x = this[0];
        if ((x & 1) == 0) {
            return 0;
        }
        var y = x & 3; // y == 1/x mod 2^2
        y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
        y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
        // last step - calculate inverse mod DV directly;
        // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
        y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
        // we really want the negative inverse, and -DV < y < DV
        return (y > 0) ? this.DV - y : -y;
    };
    BigInteger.prototype.dlShiftTo = function (n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + n] = this[i];
        }
        for (i = n - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r.t = this.t + n;
        r.s = this.s;
    };
    BigInteger.prototype.squareTo = function (r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0) {
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        }
        r.s = 0;
        r.clamp();
    };
    BigInteger.prototype.multiplyTo = function (a, r) {
        var x = this.abs();
        var y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < y.t; ++i) {
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        }
        r.s = 0;
        r.clamp();
        if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    BigInteger.prototype.divRemTo = function (m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) {
            return;
        }
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) {
                q.fromHexString("0");
            }
            if (r != null) {
                this.copyTo(r);
            }
            return;
        }
        if (r == null) {
            r = nbi();
        }
        var y = nbi();
        var ts = this.s;
        var ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        }
        else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) {
            return;
        }
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt;
        var d2 = (1 << this.F1) / yt;
        var e = 1 << this.F2;
        var i = r.t;
        var j = i - ys;
        var t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y); // "negative" y so we can replace sub with am later
        while (y.t < ys) {
            y[y.t++] = 0;
        }
        while (--j >= 0) {
            // Estimate quotient digit
            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd) {
                    r.subTo(t, r);
                }
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) {
                BigInteger.ZERO.subTo(q, q);
            }
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) {
            r.rShiftTo(nsh, r);
        } // Denormalize remainder
        if (ts < 0) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    BigInteger.prototype.rShiftTo = function (n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) {
            r[this.t - ds - 1] |= (this.s & bm) << cbs;
        }
        r.t = this.t - ds;
        r.clamp();
    };
    BigInteger.prototype.drShiftTo = function (n, r) {
        for (var i = n; i < this.t; ++i) {
            r[i - n] = this[i];
        }
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    };
    BigInteger.prototype.subTo = function (a, r) {
        var i = 0;
        var c = 0;
        var m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        }
        else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1) {
            r[i++] = this.DV + c;
        }
        else if (c > 0) {
            r[i++] = c;
        }
        r.t = i;
        r.clamp();
    };
    BigInteger.prototype.clamp = function () {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) {
            --this.t;
        }
    };
    BigInteger.prototype.modPowInt = function (e, m) {
        var z;
        if (e < 256 || m.isEven()) {
            z = new Classic(m);
        }
        else {
            z = new Montgomery(m);
        }
        return this.exp(e, z);
    };
    BigInteger.prototype.exp = function (e, z) {
        if (e > 0xffffffff || e < 1) {
            return BigInteger.ONE;
        }
        var r = nbi();
        var r2 = nbi();
        var g = z.convert(this);
        var i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & (1 << i)) > 0) {
                z.mulTo(r2, g, r);
            }
            else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    };
    BigInteger.prototype.isEven = function () {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
    };
    BigInteger.prototype.compareTo = function (a) {
        var r = this.s - a.s;
        if (r != 0) {
            return r;
        }
        var i = this.t;
        r = i - a.t;
        if (r != 0) {
            return (this.s < 0) ? -r : r;
        }
        while (--i >= 0) {
            if ((r = this[i] - a[i]) != 0) {
                return r;
            }
        }
        return 0;
    };
    BigInteger.prototype.am1 = function (i, x, w, j, c, n) {
        while (--n >= 0) {
            var v = x * this[i++] + w[j] + c;
            c = Math.floor(v / 0x4000000);
            w[j++] = v & 0x3ffffff;
        }
        return c;
    };
    // am2 avoids a big mult-and-extract completely.
    // Max digit bits should be <= 30 because we do bitwise ops
    // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
    BigInteger.prototype.am2 = function (i, x, w, j, c, n) {
        var xl = x & 0x7fff;
        var xh = x >> 15;
        while (--n >= 0) {
            var l = this[i] & 0x7fff;
            var h = this[i++] >> 15;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
            w[j++] = l & 0x3fffffff;
        }
        return c;
    };
    // Alternately, set max digit bits to 28 since some
    // browsers slow down when dealing with 32-bit numbers.
    BigInteger.prototype.am3 = function (i, x, w, j, c, n) {
        var xl = x & 0x3fff;
        var xh = x >> 14;
        while (--n >= 0) {
            var l = this[i] & 0x3fff;
            var h = this[i++] >> 14;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
            c = (l >> 28) + (m >> 14) + xh * h;
            w[j++] = l & 0xfffffff;
        }
        return c;
    };
    return BigInteger;
}());
exports.BigInteger = BigInteger;
function nbi() { return new BigInteger(null); }
exports.nbi = nbi;
function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}
exports.nbits = nbits;
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
}
exports.intAt = intAt;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
    return BI_RM.charAt(n);
}
exports.int2char = int2char;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function b64toHex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break;
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}
exports.b64toHex = b64toHex;
function removeExtraSymbols(s) {
    return s
        .replace(/^1f+00/, "")
        .replace("3031300d060960864801650304020105000420", "");
}
exports.removeExtraSymbols = removeExtraSymbols;
var Classic = /** @class */ (function () {
    function Classic(m) {
        this.m = m;
    }
    // Classic.prototype.convert = cConvert;
    Classic.prototype.convert = function (x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
        }
        else {
            return x;
        }
    };
    // Classic.prototype.revert = cRevert;
    Classic.prototype.revert = function (x) {
        return x;
    };
    // Classic.prototype.reduce = cReduce;
    Classic.prototype.reduce = function (x) {
        x.divRemTo(this.m, null, x);
    };
    // Classic.prototype.mulTo = cMulTo;
    Classic.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Classic.prototype.sqrTo = cSqrTo;
    Classic.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Classic;
}());
var Montgomery = /** @class */ (function () {
    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
    }
    // Montgomery.prototype.convert = montConvert;
    // xR mod m
    Montgomery.prototype.convert = function (x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r);
        }
        return r;
    };
    // Montgomery.prototype.revert = montRevert;
    // x/R mod m
    Montgomery.prototype.revert = function (x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    };
    // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)
    Montgomery.prototype.reduce = function (x) {
        while (x.t <= this.mt2) {
            // pad x so am has enough room later
            x[x.t++] = 0;
        }
        for (var i = 0; i < this.m.t; ++i) {
            // faster way of calculating u0 = x[i]*mp mod DV
            var j = x[i] & 0x7fff;
            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
            // use am to combine the multiply-shift-add into one call
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            // propagate carry
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    };
    // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r
    Montgomery.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r
    Montgomery.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Montgomery;
}());
function nbv(i) {
    var r = nbi();
    r.fromHexString(i.toString());
    return r;
}
exports.nbv = nbv;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = BigInteger.prototype.am2;
    dbits = 30;
}
else if (j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = BigInteger.prototype.am1;
    dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = BigInteger.prototype.am3;
    dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;


/***/ }),

/***/ "./node_modules/criteo-direct-rsa-validate/build/sha256.js":
/*!*****************************************************************!*\
  !*** ./node_modules/criteo-direct-rsa-validate/build/sha256.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Sha256 = /** @class */ (function () {
    function Sha256() {
    }
    Sha256.hash = function (msg) {
        msg = Sha256.utf8Encode(msg || "");
        var K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        var H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        msg += String.fromCharCode(0x80);
        var l = msg.length / 4 + 2;
        var N = Math.ceil(l / 16);
        var M = new Array(N);
        for (var i = 0; i < N; i++) {
            M[i] = new Array(16);
            for (var j = 0; j < 16; j++) {
                M[i][j] = (msg.charCodeAt(i * 64 + j * 4) << 24) | (msg.charCodeAt(i * 64 + j * 4 + 1) << 16)
                    | (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) | (msg.charCodeAt(i * 64 + j * 4 + 3) << 0);
            }
        }
        var lenHi = ((msg.length - 1) * 8) / Math.pow(2, 32);
        var lenLo = ((msg.length - 1) * 8) >>> 0;
        M[N - 1][14] = Math.floor(lenHi);
        M[N - 1][15] = lenLo;
        for (var i = 0; i < N; i++) {
            var W = new Array(64);
            for (var t = 0; t < 16; t++)
                W[t] = M[i][t];
            for (var t = 16; t < 64; t++) {
                W[t] = (Sha256.q1(W[t - 2]) + W[t - 7] + Sha256.q0(W[t - 15]) + W[t - 16]) >>> 0;
            }
            var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
            for (var t = 0; t < 64; t++) {
                var T1 = h + Sha256.z1(e) + Sha256.Ch(e, f, g) + K[t] + W[t];
                var T2 = Sha256.z0(a) + Sha256.Maj(a, b, c);
                h = g;
                g = f;
                f = e;
                e = (d + T1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (T1 + T2) >>> 0;
            }
            H[0] = (H[0] + a) >>> 0;
            H[1] = (H[1] + b) >>> 0;
            H[2] = (H[2] + c) >>> 0;
            H[3] = (H[3] + d) >>> 0;
            H[4] = (H[4] + e) >>> 0;
            H[5] = (H[5] + f) >>> 0;
            H[6] = (H[6] + g) >>> 0;
            H[7] = (H[7] + h) >>> 0;
        }
        var R = new Array(H.length);
        for (var h = 0; h < H.length; h++)
            R[h] = ('00000000' + H[h].toString(16)).slice(-8);
        return R.join('');
    };
    Sha256.utf8Encode = function (str) {
        try {
            return new TextEncoder().encode(str).reduce(function (prev, curr) { return prev + String.fromCharCode(curr); }, '');
        }
        catch (e) {
            return unescape(encodeURIComponent(str));
        }
    };
    Sha256.ROTR = function (n, x) {
        return (x >>> n) | (x << (32 - n));
    };
    Sha256.z0 = function (x) { return Sha256.ROTR(2, x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); };
    Sha256.z1 = function (x) { return Sha256.ROTR(6, x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); };
    Sha256.q0 = function (x) { return Sha256.ROTR(7, x) ^ Sha256.ROTR(18, x) ^ (x >>> 3); };
    Sha256.q1 = function (x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x >>> 10); };
    Sha256.Ch = function (x, y, z) { return (x & y) ^ (~x & z); };
    Sha256.Maj = function (x, y, z) { return (x & y) ^ (x & z) ^ (y & z); };
    return Sha256;
}());
exports.Sha256 = Sha256;


/***/ }),

/***/ "./node_modules/criteo-direct-rsa-validate/build/verify.js":
/*!*****************************************************************!*\
  !*** ./node_modules/criteo-direct-rsa-validate/build/verify.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var jsbnLite_1 = __webpack_require__(/*! ./jsbnLite */ "./node_modules/criteo-direct-rsa-validate/build/jsbnLite.js");
var sha256_1 = __webpack_require__(/*! ./sha256 */ "./node_modules/criteo-direct-rsa-validate/build/sha256.js");
function verify(code, hash, nStrPubKey, ePubKey) {
    var x = new jsbnLite_1.BigInteger(jsbnLite_1.b64toHex(hash));
    var m = new jsbnLite_1.BigInteger(jsbnLite_1.b64toHex(nStrPubKey));
    var r = x.modPowInt(ePubKey, m);
    return jsbnLite_1.removeExtraSymbols(r.toHexString()) === sha256_1.Sha256.hash(code);
}
exports.verify = verify;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/criteoBidAdapter.js"));
/******/ }
]);
//# sourceMappingURL=criteoBidAdapter.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["euidIdSystem"],{

/***/ "./modules/euidIdSystem.js":
/*!*********************************!*\
  !*** ./modules/euidIdSystem.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports storage, euidIdSubmodule */
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/hook.js */ "./src/hook.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _uid2IdSystem_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uid2IdSystem_shared.js */ "./modules/uid2IdSystem_shared.js");

/**
 * This module adds EUID ID support to the User ID module. It shares significant functionality with the UID2 module.
 * The {@link module:modules/userId} module is required.
 * @module modules/euidIdSystem
 * @requires module:modules/userId
 */






// RE below lint exception: UID2 and EUID are separate modules, but the protocol is the same and shared code makes sense here.
// eslint-disable-next-line prebid/validate-imports

var MODULE_NAME = 'euid';
var MODULE_REVISION = _uid2IdSystem_shared_js__WEBPACK_IMPORTED_MODULE_0__.Uid2CodeVersion;
var PREBID_VERSION = "8.0.0";
var EUID_CLIENT_ID = "PrebidJS-".concat(PREBID_VERSION, "-EUIDModule-").concat(MODULE_REVISION);
var GVLID_TTD = 21; // The Trade Desk
var LOG_PRE_FIX = 'EUID: ';
var ADVERTISING_COOKIE = '__euid_advertising_token';

// eslint-disable-next-line no-unused-vars
var EUID_TEST_URL = 'https://integ.euid.eu';
var EUID_PROD_URL = 'https://prod.euid.eu';
var EUID_BASE_URL = EUID_PROD_URL;
function createLogger(logger, prefix) {
  return function () {
    for (var _len = arguments.length, strings = new Array(_len), _key = 0; _key < _len; _key++) {
      strings[_key] = arguments[_key];
    }
    logger.apply(void 0, [prefix + ' '].concat(strings));
  };
}
var _logInfo = createLogger(_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo, LOG_PRE_FIX);
var _logWarn = createLogger(_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn, LOG_PRE_FIX);
var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_2__.getStorageManager)({
  moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_3__.MODULE_TYPE_UID,
  moduleName: MODULE_NAME
});
function hasWriteToDeviceConsent(consentData) {
  var gdprApplies = (consentData === null || consentData === void 0 ? void 0 : consentData.gdprApplies) === true;
  var localStorageConsent = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"])(consentData, "vendorData.purpose.consents.1");
  var prebidVendorConsent = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"])(consentData, "vendorData.vendor.consents.".concat(GVLID_TTD.toString()));
  localStorageConsent = true;
  prebidVendorConsent = true;
  if (gdprApplies && (!localStorageConsent || !prebidVendorConsent)) {
    return false;
  }
  return true;
}

/** @type {Submodule} */
var euidIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,
  /**
   * Vendor id of The Trade Desk
   * @type {Number}
   */
  gvlid: GVLID_TTD,
  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{euid:{ id: string } }} or undefined if value doesn't exists
   */
  decode: function decode(value) {
    var result = decodeImpl(value);
    _logInfo('EUID decode returned', result);
    return result;
  },
  /**
   * performs action to obtain id and return a value.
   * @function
   * @param {SubmoduleConfig} [configparams]
   * @param {ConsentData|undefined} consentData
   * @returns {euidId}
   */
  getId: function getId(config, consentData) {
    var _consentData, _config$params$euidAp, _config$params, _config$params2, _config$params3, _config$params$storag, _config$params4;
    consentData = {
      gdprApplies: true
    };
    if (((_consentData = consentData) === null || _consentData === void 0 ? void 0 : _consentData.gdprApplies) !== true) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)('EUID is intended for use within the EU. The module will not run when GDPR does not apply.');
      return;
    }
    if (!hasWriteToDeviceConsent(consentData)) {
      // The module cannot operate without this permission.
      _logWarn("Unable to use EUID module due to insufficient consent. The EUID module requires storage permission.");
      return;
    }
    var mappedConfig = {
      apiBaseUrl: (_config$params$euidAp = config === null || config === void 0 ? void 0 : (_config$params = config.params) === null || _config$params === void 0 ? void 0 : _config$params.euidApiBase) !== null && _config$params$euidAp !== void 0 ? _config$params$euidAp : EUID_BASE_URL,
      paramToken: config === null || config === void 0 ? void 0 : (_config$params2 = config.params) === null || _config$params2 === void 0 ? void 0 : _config$params2.euidToken,
      serverCookieName: config === null || config === void 0 ? void 0 : (_config$params3 = config.params) === null || _config$params3 === void 0 ? void 0 : _config$params3.euidCookie,
      storage: (_config$params$storag = config === null || config === void 0 ? void 0 : (_config$params4 = config.params) === null || _config$params4 === void 0 ? void 0 : _config$params4.storage) !== null && _config$params$storag !== void 0 ? _config$params$storag : 'localStorage',
      clientId: EUID_CLIENT_ID,
      internalStorage: ADVERTISING_COOKIE
    };
    var result = (0,_uid2IdSystem_shared_js__WEBPACK_IMPORTED_MODULE_0__.Uid2GetId)(mappedConfig, storage, _logInfo, _logWarn);
    _logInfo("EUID getId returned", result);
    return result;
  }
};
function decodeImpl(value) {
  if (typeof value === 'string') {
    _logInfo('Found server-only token. Refresh is unavailable for this token.');
    var result = {
      euid: {
        id: value
      }
    };
    return result;
  }
  if (Date.now() < value.latestToken.identity_expires) {
    return {
      euid: {
        id: value.latestToken.advertising_token
      }
    };
  }
  return null;
}

// Register submodule for userId
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_5__.submodule)('userId', euidIdSubmodule);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__.registerModule)('euidIdSystem');

/***/ }),

/***/ "./modules/uid2IdSystem_shared.js":
/*!****************************************!*\
  !*** ./modules/uid2IdSystem_shared.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uid2CodeVersion": function() { return /* binding */ Uid2CodeVersion; },
/* harmony export */   "Uid2GetId": function() { return /* binding */ Uid2GetId; }
/* harmony export */ });
/* unused harmony exports Uid2ApiClient, Uid2StorageManager */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");





/* eslint-disable no-console */
var Uid2CodeVersion = '1.1';
function isValidIdentity(identity) {
  return !!((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(identity) === 'object' && identity !== null && identity.advertising_token && identity.identity_expires && identity.refresh_from && identity.refresh_token && identity.refresh_expires);
}

// This is extracted from an in-progress API client. Once it's available via NPM, this class should be replaced with the NPM package.
var Uid2ApiClient = /*#__PURE__*/function () {
  function Uid2ApiClient(opts, clientId, logInfo, logWarn) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Uid2ApiClient);
    this._baseUrl = opts.baseUrl;
    this._clientVersion = clientId;
    this._logInfo = logInfo;
    this._logWarn = logWarn;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Uid2ApiClient, [{
    key: "createArrayBuffer",
    value: function createArrayBuffer(text) {
      var arrayBuffer = new Uint8Array(text.length);
      for (var i = 0; i < text.length; i++) {
        arrayBuffer[i] = text.charCodeAt(i);
      }
      return arrayBuffer;
    }
  }, {
    key: "hasStatusResponse",
    value: function hasStatusResponse(response) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(response) === 'object' && response && response.status;
    }
  }, {
    key: "isValidRefreshResponse",
    value: function isValidRefreshResponse(response) {
      return this.hasStatusResponse(response) && (response.status === 'optout' || response.status === 'expired_token' || response.status === 'success' && response.body && isValidIdentity(response.body));
    }
  }, {
    key: "ResponseToRefreshResult",
    value: function ResponseToRefreshResult(response) {
      if (this.isValidRefreshResponse(response)) {
        if (response.status === 'success') {
          return {
            status: response.status,
            identity: response.body
          };
        }
        return response;
      } else {
        return "Response didn't contain a valid status";
      }
    }
  }, {
    key: "callRefreshApi",
    value: function callRefreshApi(refreshDetails) {
      var _this = this;
      var url = this._baseUrl + '/v2/token/refresh';
      var req = new XMLHttpRequest();
      req.overrideMimeType('text/plain');
      req.open('POST', url, true);
      req.setRequestHeader('X-UID2-Client-Version', this._clientVersion);
      var resolvePromise;
      var rejectPromise;
      var promise = new Promise(function (resolve, reject) {
        resolvePromise = resolve;
        rejectPromise = reject;
      });
      req.onreadystatechange = function () {
        if (req.readyState !== req.DONE) {
          return;
        }
        try {
          if (!refreshDetails.refresh_response_key || req.status !== 200) {
            _this._logInfo('Error status OR no response decryption key available, assuming unencrypted JSON');
            var response = JSON.parse(req.responseText);
            var result = _this.ResponseToRefreshResult(response);
            if (typeof result === 'string') {
              rejectPromise(result);
            } else {
              resolvePromise(result);
            }
          } else {
            _this._logInfo('Decrypting refresh API response');
            var encodeResp = _this.createArrayBuffer(atob(req.responseText));
            window.crypto.subtle.importKey('raw', _this.createArrayBuffer(atob(refreshDetails.refresh_response_key)), {
              name: 'AES-GCM'
            }, false, ['decrypt']).then(function (key) {
              _this._logInfo('Imported decryption key');
              // returns the symmetric key
              window.crypto.subtle.decrypt({
                name: 'AES-GCM',
                iv: encodeResp.slice(0, 12),
                tagLength: 128 // The tagLength you used to encrypt (if any)
              }, key, encodeResp.slice(12)).then(function (decrypted) {
                var decryptedResponse = String.fromCharCode.apply(String, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(new Uint8Array(decrypted)));
                _this._logInfo('Decrypted to:', decryptedResponse);
                var response = JSON.parse(decryptedResponse);
                var result = _this.ResponseToRefreshResult(response);
                if (typeof result === 'string') {
                  rejectPromise(result);
                } else {
                  resolvePromise(result);
                }
              }, function (reason) {
                return _this._logWarn("Call to UID2 API failed", reason);
              });
            }, function (reason) {
              return _this._logWarn("Call to UID2 API failed", reason);
            });
          }
        } catch (err) {
          rejectPromise(err);
        }
      };
      this._logInfo('Sending refresh request', refreshDetails);
      req.send(refreshDetails.refresh_token);
      return promise;
    }
  }]);
  return Uid2ApiClient;
}();
var Uid2StorageManager = /*#__PURE__*/function () {
  function Uid2StorageManager(storage, preferLocalStorage, storageName, logInfo) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Uid2StorageManager);
    this._storage = storage;
    this._preferLocalStorage = preferLocalStorage;
    this._storageName = storageName;
    this._logInfo = logInfo;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Uid2StorageManager, [{
    key: "readCookie",
    value: function readCookie(cookieName) {
      return this._storage.cookiesAreEnabled() ? this._storage.getCookie(cookieName) : null;
    }
  }, {
    key: "readLocalStorage",
    value: function readLocalStorage(key) {
      return this._storage.localStorageIsEnabled() ? this._storage.getDataFromLocalStorage(key) : null;
    }
  }, {
    key: "readModuleCookie",
    value: function readModuleCookie() {
      return this.parseIfContainsBraces(this.readCookie(this._storageName));
    }
  }, {
    key: "writeModuleCookie",
    value: function writeModuleCookie(value) {
      this._storage.setCookie(this._storageName, JSON.stringify(value), Date.now() + 60 * 60 * 24 * 1000);
    }
  }, {
    key: "readModuleStorage",
    value: function readModuleStorage() {
      return this.parseIfContainsBraces(this.readLocalStorage(this._storageName));
    }
  }, {
    key: "writeModuleStorage",
    value: function writeModuleStorage(value) {
      this._storage.setDataInLocalStorage(this._storageName, JSON.stringify(value));
    }
  }, {
    key: "readProvidedCookie",
    value: function readProvidedCookie(cookieName) {
      return JSON.parse(this.readCookie(cookieName));
    }
  }, {
    key: "parseIfContainsBraces",
    value: function parseIfContainsBraces(value) {
      return value !== null && value !== void 0 && value.includes('{') ? JSON.parse(value) : value;
    }
  }, {
    key: "storeValue",
    value: function storeValue(value) {
      if (this._preferLocalStorage) {
        this.writeModuleStorage(value);
      } else {
        this.writeModuleCookie(value);
      }
    }
  }, {
    key: "getStoredValueWithFallback",
    value: function getStoredValueWithFallback() {
      var preferredStorageLabel = this._preferLocalStorage ? 'local storage' : 'cookie';
      var preferredStorageGet = (this._preferLocalStorage ? this.readModuleStorage : this.readModuleCookie).bind(this);
      var preferredStorageSet = (this._preferLocalStorage ? this.writeModuleStorage : this.writeModuleCookie).bind(this);
      var fallbackStorageGet = (this._preferLocalStorage ? this.readModuleCookie : this.readModuleStorage).bind(this);
      var storedValue = preferredStorageGet();
      if (!storedValue) {
        var fallbackValue = fallbackStorageGet();
        if (fallbackValue) {
          this._logInfo("".concat(preferredStorageLabel, " was empty, but found a fallback value."));
          if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(fallbackValue) === 'object') {
            this._logInfo("Copying the fallback value to ".concat(preferredStorageLabel, "."));
            preferredStorageSet(fallbackValue);
          }
          return fallbackValue;
        }
      } else if (typeof storedValue === 'string') {
        var _fallbackValue = fallbackStorageGet();
        if (_fallbackValue && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(_fallbackValue) === 'object') {
          this._logInfo("".concat(preferredStorageLabel, " contained a basic token, but found a refreshable token fallback. Copying the fallback value to ").concat(preferredStorageLabel, "."));
          preferredStorageSet(_fallbackValue);
          return _fallbackValue;
        }
      }
      return storedValue;
    }
  }]);
  return Uid2StorageManager;
}();
function refreshTokenAndStore(baseUrl, token, clientId, storageManager, _logInfo, _logWarn) {
  _logInfo('UID2 base url provided: ', baseUrl);
  var client = new Uid2ApiClient({
    baseUrl: baseUrl
  }, clientId, _logInfo, _logWarn);
  return client.callRefreshApi(token).then(function (response) {
    _logInfo('Refresh endpoint responded with:', response);
    var tokens = {
      originalToken: token,
      latestToken: response.identity
    };
    storageManager.storeValue(tokens);
    return tokens;
  });
}
function Uid2GetId(config, prebidStorageManager, _logInfo, _logWarn) {
  var _storedTokens, _suppliedToken, _storedTokens2;
  var suppliedToken = null;
  var preferLocalStorage = config.storage !== 'cookie';
  var storageManager = new Uid2StorageManager(prebidStorageManager, preferLocalStorage, config.internalStorage, _logInfo);
  _logInfo("Module is using ".concat(preferLocalStorage ? 'local storage' : 'cookies', " for internal storage."));
  if (config.paramToken) {
    suppliedToken = config.paramToken;
    _logInfo('Read token from params', suppliedToken);
  } else if (config.serverCookieName) {
    suppliedToken = storageManager.readProvidedCookie(config.serverCookieName);
    _logInfo('Read token from server-supplied cookie', suppliedToken);
  }
  var storedTokens = storageManager.getStoredValueWithFallback();
  _logInfo('Loaded module-stored tokens:', storedTokens);
  if (storedTokens && typeof storedTokens === 'string') {
    // Stored value is a plain token - if no token is supplied, just use the stored value.

    if (!suppliedToken) {
      _logInfo('Returning legacy cookie value.');
      return {
        id: storedTokens
      };
    }
    // Otherwise, ignore the legacy value - it should get over-written later anyway.
    _logInfo('Discarding superseded legacy cookie.');
    storedTokens = null;
  }
  if (suppliedToken && storedTokens) {
    var _storedTokens$origina;
    if (((_storedTokens$origina = storedTokens.originalToken) === null || _storedTokens$origina === void 0 ? void 0 : _storedTokens$origina.advertising_token) !== suppliedToken.advertising_token) {
      var _storedTokens$origina2;
      _logInfo('Server supplied new token - ignoring stored value.', (_storedTokens$origina2 = storedTokens.originalToken) === null || _storedTokens$origina2 === void 0 ? void 0 : _storedTokens$origina2.advertising_token, suppliedToken.advertising_token);
      // Stored token wasn't originally sourced from the provided token - ignore the stored value. A new user has logged in?
      storedTokens = null;
    }
  }
  // At this point, any legacy values or superseded stored tokens have been nulled out.
  var useSuppliedToken = !((_storedTokens = storedTokens) !== null && _storedTokens !== void 0 && _storedTokens.latestToken) || suppliedToken && suppliedToken.identity_expires > storedTokens.latestToken.identity_expires;
  var newestAvailableToken = useSuppliedToken ? suppliedToken : storedTokens.latestToken;
  _logInfo('UID2 module selected latest token', useSuppliedToken, newestAvailableToken);
  if (!newestAvailableToken || Date.now() > newestAvailableToken.refresh_expires) {
    _logInfo('Newest available token is expired and not refreshable.');
    return {
      id: null
    };
  }
  if (Date.now() > newestAvailableToken.identity_expires) {
    var promise = refreshTokenAndStore(config.apiBaseUrl, newestAvailableToken, config.clientId, storageManager, _logInfo, _logWarn);
    _logInfo('Token is expired but can be refreshed, attempting refresh.');
    return {
      callback: function callback(cb) {
        promise.then(function (result) {
          _logInfo('Refresh reponded, passing the updated token on.', result);
          cb(result);
        });
      }
    };
  }
  // If should refresh (but don't need to), refresh in the background.
  if (Date.now() > newestAvailableToken.refresh_from) {
    _logInfo("Refreshing token in background with low priority.");
    refreshTokenAndStore(config.apiBaseUrl, newestAvailableToken, config.clientId, storageManager, _logInfo, _logWarn);
  }
  var tokens = {
    originalToken: (_suppliedToken = suppliedToken) !== null && _suppliedToken !== void 0 ? _suppliedToken : (_storedTokens2 = storedTokens) === null || _storedTokens2 === void 0 ? void 0 : _storedTokens2.originalToken,
    latestToken: newestAvailableToken
  };
  storageManager.storeValue(tokens);
  return {
    id: tokens
  };
}
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_4__.registerModule)('uid2IdSystem_shared');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/euidIdSystem.js"));
/******/ }
]);
//# sourceMappingURL=euidIdSystem.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["gdprEnforcement"],{

/***/ "./modules/gdprEnforcement.js":
/*!************************************!*\
  !*** ./modules/gdprEnforcement.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports STRICT_STORAGE_ENFORCEMENT, purpose1Rule, purpose2Rule, purpose7Rule, enforcementRules, getGvlid, getGvlidFromAnalyticsAdapter, shouldEnforce, validateRules, accessDeviceRule, syncUserRule, enrichEidsRule, fetchBidsRule, reportAnalyticsRule, setEnforcementConfig, uninstall */
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_polyfill_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _src_events_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/events.js */ "./src/events.js");
/* harmony import */ var _src_constants_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/constants.json */ "./src/constants.json");
/* harmony import */ var _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/consentHandler.js */ "./src/consentHandler.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/activities/params.js */ "./src/activities/params.js");
/* harmony import */ var _src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../src/activities/activities.js */ "./src/activities/activities.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * This module gives publishers extra set of features to enforce individual purposes of TCF v2
 */












var STRICT_STORAGE_ENFORCEMENT = 'strictStorageEnforcement';
var TCF2 = {
  'purpose1': {
    id: 1,
    name: 'storage'
  },
  'purpose2': {
    id: 2,
    name: 'basicAds'
  },
  'purpose7': {
    id: 7,
    name: 'measurement'
  }
};

/*
  These rules would be used if `consentManagement.gdpr.rules` is undefined by the publisher.
*/
var DEFAULT_RULES = [{
  purpose: 'storage',
  enforcePurpose: true,
  enforceVendor: true,
  vendorExceptions: []
}, {
  purpose: 'basicAds',
  enforcePurpose: true,
  enforceVendor: true,
  vendorExceptions: []
}];
var purpose1Rule;
var purpose2Rule;
var purpose7Rule;
var enforcementRules;
var storageBlocked = new Set();
var biddersBlocked = new Set();
var analyticsBlocked = new Set();
var hooksAdded = false;
var strictStorageEnforcement = false;
var GVLID_LOOKUP_PRIORITY = [_src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_BIDDER, _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_UID, _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_ANALYTICS, _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_RTD];
var RULE_NAME = 'TCF2';
var RULE_HANDLES = [];

/**
 * Retrieve a module's GVL ID.
 */
function getGvlid(moduleType, moduleName, fallbackFn) {
  if (moduleName) {
    // Check user defined GVL Mapping in pbjs.setConfig()
    var gvlMapping = _src_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('gvlMapping');

    // Return GVL ID from user defined gvlMapping
    if (gvlMapping && gvlMapping[moduleName]) {
      return gvlMapping[moduleName];
    } else if (moduleType === _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_PREBID) {
      return _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_2__.VENDORLESS_GVLID;
    } else {
      var _GDPR_GVLIDS$get = _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_2__.GDPR_GVLIDS.get(moduleName),
        gvlid = _GDPR_GVLIDS$get.gvlid,
        modules = _GDPR_GVLIDS$get.modules;
      if (gvlid == null && Object.keys(modules).length > 0) {
        // this behavior is for backwards compatibility; if multiple modules with the same
        // name declare different GVL IDs, pick the bidder's first, then userId, then analytics
        var _iterator = _createForOfIteratorHelper(GVLID_LOOKUP_PRIORITY),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var type = _step.value;
            if (modules.hasOwnProperty(type)) {
              gvlid = modules[type];
              if (type !== moduleType) {
                (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__.logWarn)("Multiple GVL IDs found for module '".concat(moduleName, "'; using the ").concat(type, " module's ID (").concat(gvlid, ") instead of the ").concat(moduleType, "'s ID (").concat(modules[moduleType], ")"));
              }
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      if (gvlid == null && fallbackFn) {
        gvlid = fallbackFn();
      }
      return gvlid || null;
    }
  }
  return null;
}

/**
 * Retrieve GVL IDs that are dynamically set on analytics adapters.
 */
function getGvlidFromAnalyticsAdapter(code, config) {
  var _adapter$adapter;
  var adapter = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__["default"].getAnalyticsAdapter(code);
  return function (gvlid) {
    if (typeof gvlid !== 'function') return gvlid;
    try {
      return gvlid.call(adapter.adapter, config);
    } catch (e) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__.logError)("Error invoking ".concat(code, " adapter.gvlid()"), e);
    }
  }(adapter === null || adapter === void 0 ? void 0 : (_adapter$adapter = adapter.adapter) === null || _adapter$adapter === void 0 ? void 0 : _adapter$adapter.gvlid);
}
function shouldEnforce(consentData, purpose, name) {
  if (consentData == null && _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__.gdprDataHandler.enabled) {
    // there is no consent data, but the GDPR module has been installed and configured
    // NOTE: this check is not foolproof, as when Prebid first loads, enforcement hooks have not been attached yet
    // This piece of code would not run at all, and `gdprDataHandler.enabled` would be false, until the first
    // `setConfig({consentManagement})`
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__.logWarn)("Attempting operation that requires purpose ".concat(purpose, " consent while consent data is not available").concat(name ? " (module: ".concat(name, ")") : '', ". Assuming no consent was given."));
    return true;
  }
  return consentData && consentData.gdprApplies;
}

/**
 * This function takes in a rule and consentData and validates against the consentData provided. Depending on what it returns,
 * the caller may decide to suppress a TCF-sensitive activity.
 * @param {Object} rule - enforcement rules set in config
 * @param {Object} consentData - gdpr consent data
 * @param {string=} currentModule - Bidder code of the current module
 * @param {number=} gvlId - GVL ID for the module
 * @returns {boolean}
 */
function validateRules(rule, consentData, currentModule, gvlId) {
  var purposeId = TCF2[Object.keys(TCF2).filter(function (purposeName) {
    return TCF2[purposeName].name === rule.purpose;
  })[0]].id;

  // return 'true' if vendor present in 'vendorExceptions'
  if ((rule.vendorExceptions || []).includes(currentModule)) {
    return true;
  }
  var vendorConsentRequred = !(gvlId === _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_2__.VENDORLESS_GVLID || (rule.softVendorExceptions || []).includes(currentModule));

  // get data from the consent string
  var purposeConsent = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"])(consentData, "vendorData.purpose.consents.".concat(purposeId));
  var vendorConsent = vendorConsentRequred ? (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"])(consentData, "vendorData.vendor.consents.".concat(gvlId)) : true;
  var liTransparency = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"])(consentData, "vendorData.purpose.legitimateInterests.".concat(purposeId));

  /*
    Since vendor exceptions have already been handled, the purpose as a whole is allowed if it's not being enforced
    or the user has consented. Similar with vendors.
  */
  var purposeAllowed = rule.enforcePurpose === false || purposeConsent === true;
  var vendorAllowed = rule.enforceVendor === false || vendorConsent === true;

  /*
    Few if any vendors should be declaring Legitimate Interest for Device Access (Purpose 1), but some are claiming
    LI for Basic Ads (Purpose 2). Prebid.js can't check to see who's declaring what legal basis, so if LI has been
    established for Purpose 2, allow the auction to take place and let the server sort out the legal basis calculation.
  */
  if (purposeId === 2) {
    return purposeAllowed && vendorAllowed || liTransparency === true;
  }
  return purposeAllowed && vendorAllowed;
}

/**
 * all activity rules follow the same structure:
 * if GDPR is in scope, check configuration for a particular purpose, and if that enables enforcement,
 * check against consent data for that purpose and vendor
 *
 * @param purposeNo TCF purpose number to check for this activity
 * @param getEnforcementRule getter for gdprEnforcement rule definition to use
 * @param blocked optional set to use for collecting denied vendors
 * @param gvlidFallback optional factory function for a gvlid falllback function
 */
function gdprRule(purposeNo, getEnforcementRule) {
  var blocked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var gvlidFallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return null;
  };
  return function (params) {
    var consentData = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__.gdprDataHandler.getConsentData();
    var modName = params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_COMPONENT_NAME];
    if (shouldEnforce(consentData, purposeNo, modName)) {
      var gvlid = getGvlid(params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_COMPONENT_TYPE], modName, gvlidFallback(params));
      var allow = !!validateRules(getEnforcementRule(), consentData, modName, gvlid);
      if (!allow) {
        blocked && blocked.add(modName);
        return {
          allow: allow
        };
      }
    }
  };
}
var accessDeviceRule = function (rule) {
  return function (params) {
    // for vendorless (core) storage, do not enforce rules unless strictStorageEnforcement is set
    if (params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_COMPONENT_TYPE] === _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_PREBID && !strictStorageEnforcement) return;
    return rule(params);
  };
}(gdprRule(1, function () {
  return purpose1Rule;
}, storageBlocked));
var syncUserRule = gdprRule(1, function () {
  return purpose1Rule;
}, storageBlocked);
var enrichEidsRule = gdprRule(1, function () {
  return purpose1Rule;
}, storageBlocked);
var fetchBidsRule = function (rule) {
  return function (params) {
    if (params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_COMPONENT_TYPE] !== _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_0__.MODULE_TYPE_BIDDER) {
      // TODO: this special case is for the PBS adapter (componentType is 'prebid')
      // we should check for generic purpose 2 consent & vendor consent based on the PBS vendor's GVL ID;
      // that is, however, a breaking change and skipped for now
      return;
    }
    return rule(params);
  };
}(gdprRule(2, function () {
  return purpose2Rule;
}, biddersBlocked));
var reportAnalyticsRule = gdprRule(7, function () {
  return purpose7Rule;
}, analyticsBlocked, function (params) {
  return getGvlidFromAnalyticsAdapter(params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_COMPONENT_NAME], params[_src_activities_params_js__WEBPACK_IMPORTED_MODULE_6__.ACTIVITY_PARAM_ANL_CONFIG]);
});

/**
 * Compiles the TCF2.0 enforcement results into an object, which is emitted as an event payload to "tcf2Enforcement" event.
 */
function emitTCF2FinalResults() {
  // remove null and duplicate values
  var formatSet = function formatSet(st) {
    return Array.from(st.keys()).filter(function (el) {
      return el != null;
    });
  };
  var tcf2FinalResults = {
    storageBlocked: formatSet(storageBlocked),
    biddersBlocked: formatSet(biddersBlocked),
    analyticsBlocked: formatSet(analyticsBlocked)
  };
  _src_events_js__WEBPACK_IMPORTED_MODULE_7__.emit(_src_constants_json__WEBPACK_IMPORTED_MODULE_8__.EVENTS.TCF2_ENFORCEMENT, tcf2FinalResults);
  [storageBlocked, biddersBlocked, analyticsBlocked].forEach(function (el) {
    return el.clear();
  });
}
_src_events_js__WEBPACK_IMPORTED_MODULE_7__.on(_src_constants_json__WEBPACK_IMPORTED_MODULE_8__.EVENTS.AUCTION_END, emitTCF2FinalResults);

/*
  Set of callback functions used to detect presence of a TCF rule, passed as the second argument to find().
*/
var hasPurpose1 = function hasPurpose1(rule) {
  return rule.purpose === TCF2.purpose1.name;
};
var hasPurpose2 = function hasPurpose2(rule) {
  return rule.purpose === TCF2.purpose2.name;
};
var hasPurpose7 = function hasPurpose7(rule) {
  return rule.purpose === TCF2.purpose7.name;
};

/**
 * A configuration function that initializes some module variables, as well as adds hooks
 * @param {Object} config - GDPR enforcement config object
 */
function setEnforcementConfig(config) {
  var rules = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"])(config, 'gdpr.rules');
  if (!rules) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__.logWarn)('TCF2: enforcing P1 and P2 by default');
    enforcementRules = DEFAULT_RULES;
  } else {
    enforcementRules = rules;
  }
  strictStorageEnforcement = !!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"])(config, STRICT_STORAGE_ENFORCEMENT);
  purpose1Rule = (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_9__.find)(enforcementRules, hasPurpose1);
  purpose2Rule = (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_9__.find)(enforcementRules, hasPurpose2);
  purpose7Rule = (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_9__.find)(enforcementRules, hasPurpose7);
  if (!purpose1Rule) {
    purpose1Rule = DEFAULT_RULES[0];
  }
  if (!purpose2Rule) {
    purpose2Rule = DEFAULT_RULES[1];
  }
  if (!hooksAdded) {
    if (purpose1Rule) {
      hooksAdded = true;
      RULE_HANDLES.push((0,_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl)(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__.ACTIVITY_ACCESS_DEVICE, RULE_NAME, accessDeviceRule));
      RULE_HANDLES.push((0,_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl)(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__.ACTIVITY_SYNC_USER, RULE_NAME, syncUserRule));
      RULE_HANDLES.push((0,_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl)(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__.ACTIVITY_ENRICH_EIDS, RULE_NAME, enrichEidsRule));
    }
    if (purpose2Rule) {
      RULE_HANDLES.push((0,_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl)(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__.ACTIVITY_FETCH_BIDS, RULE_NAME, fetchBidsRule));
    }
    if (purpose7Rule) {
      RULE_HANDLES.push((0,_src_activities_rules_js__WEBPACK_IMPORTED_MODULE_10__.registerActivityControl)(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_11__.ACTIVITY_REPORT_ANALYTICS, RULE_NAME, reportAnalyticsRule));
    }
  }
}
function uninstall() {
  while (RULE_HANDLES.length) {
    RULE_HANDLES.pop()();
  }
  hooksAdded = false;
}
_src_config_js__WEBPACK_IMPORTED_MODULE_1__.config.getConfig('consentManagement', function (config) {
  return setEnforcementConfig(config.consentManagement);
});
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__.registerModule)('gdprEnforcement');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/gdprEnforcement.js"));
/******/ }
]);
//# sourceMappingURL=gdprEnforcement.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["hadronIdSystem"],{

/***/ "./modules/hadronIdSystem.js":
/*!***********************************!*\
  !*** ./modules/hadronIdSystem.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports storage, hadronIdSubmodule */
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_ajax_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/ajax.js */ "./src/ajax.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/hook.js */ "./src/hook.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");

/**
 * This module adds HadronID to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/hadronIdSystem
 * @requires module:modules/userId
 */






var HADRONID_LOCAL_NAME = 'auHadronId';
var MODULE_NAME = 'hadronId';
var AU_GVLID = 561;
var DEFAULT_HADRON_URL_ENDPOINT = 'https://id.hadron.ad.gt/api/v1/pbhid';
var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__.getStorageManager)({
  moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__.MODULE_TYPE_UID,
  moduleName: 'hadron'
});

/**
 * Param or default.
 * @param {String|function} param
 * @param {String} defaultVal
 * @param arg
 */
function paramOrDefault(param, defaultVal, arg) {
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isFn)(param)) {
    return param(arg);
  } else if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(param)) {
    return param;
  }
  return defaultVal;
}

/**
 * @param {string} url
 * @param {string} params
 * @returns {string}
 */
var urlAddParams = function urlAddParams(url, params) {
  return url + (url.indexOf('?') > -1 ? '&' : '?') + params;
};

/** @type {Submodule} */
var hadronIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,
  gvlid: AU_GVLID,
  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {Object}
   */
  decode: function decode(value) {
    var hadronId = storage.getDataFromLocalStorage(HADRONID_LOCAL_NAME);
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(hadronId)) {
      return {
        hadronId: hadronId
      };
    }
    return value && typeof value['hadronId'] === 'string' ? {
      'hadronId': value['hadronId']
    } : undefined;
  },
  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleConfig} [config]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(config) {
    if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(config.params)) {
      config.params = {};
    }
    var partnerId = config.params.partnerId | 0;
    var hadronId = storage.getDataFromLocalStorage(HADRONID_LOCAL_NAME);
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(hadronId)) {
      return {
        id: {
          hadronId: hadronId
        }
      };
    }
    var resp = function resp(callback) {
      var responseObj = {};
      var callbacks = {
        success: function success(response) {
          if (response) {
            try {
              responseObj = JSON.parse(response);
            } catch (error) {
              (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logError)(error);
            }
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)("Response from backend is ".concat(responseObj));
            hadronId = responseObj['hadronId'];
            storage.setDataInLocalStorage(HADRONID_LOCAL_NAME, hadronId);
            responseObj = {
              id: {
                hadronId: hadronId
              }
            };
          }
          callback(responseObj);
        },
        error: function error(_error) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logError)("".concat(MODULE_NAME, ": ID fetch encountered an error"), _error);
          callback();
        }
      };
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('HadronId not found in storage, calling backend...');
      var url = urlAddParams(
      // config.params.url and config.params.urlArg are not documented
      // since their use is for debugging purposes only
      paramOrDefault(config.params.url, DEFAULT_HADRON_URL_ENDPOINT, config.params.urlArg), "partner_id=".concat(partnerId, "&_it=prebid"));
      (0,_src_ajax_js__WEBPACK_IMPORTED_MODULE_3__.ajax)(url, callbacks, undefined, {
        method: 'GET'
      });
    };
    return {
      callback: resp
    };
  }
};
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_4__.submodule)('userId', hadronIdSubmodule);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_5__.registerModule)('hadronIdSystem');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/hadronIdSystem.js"));
/******/ }
]);
//# sourceMappingURL=hadronIdSystem.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["id5IdSystem"],{

/***/ "./modules/id5IdSystem.js":
/*!********************************!*\
  !*** ./modules/id5IdSystem.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports ID5_STORAGE_NAME, ID5_PRIVACY_STORAGE_NAME, storage, id5IdSubmodule, expDaysStr, nbCacheName, storeNbInCache, getNbFromCache, getFromLocalStorage, storeInLocalStorage */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var _src_ajax_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/ajax.js */ "./src/ajax.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../src/hook.js */ "./src/hook.js");
/* harmony import */ var _src_refererDetection_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src/refererDetection.js */ "./src/refererDetection.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

/**
 * This module adds ID5 to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/id5IdSystem
 * @requires module:modules/userId
 */








var MODULE_NAME = 'id5Id';
var GVLID = 131;
var NB_EXP_DAYS = 30;
var ID5_STORAGE_NAME = 'id5id';
var ID5_PRIVACY_STORAGE_NAME = "".concat(ID5_STORAGE_NAME, "_privacy");
var LOCAL_STORAGE = 'html5';
var LOG_PREFIX = 'User ID - ID5 submodule: ';
var ID5_API_CONFIG_URL = 'https://id5-sync.com/api/config/prebid';

// order the legacy cookie names in reverse priority order so the last
// cookie in the array is the most preferred to use
var LEGACY_COOKIE_NAMES = ['pbjs-id5id', 'id5id.1st', 'id5id'];
var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_1__.getStorageManager)({
  moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_2__.MODULE_TYPE_UID,
  moduleName: MODULE_NAME
});

/** @type {Submodule} */
var id5IdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'id5Id',
  /**
   * Vendor id of ID5
   * @type {Number}
   */
  gvlid: GVLID,
  /**
   * decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @param {SubmoduleConfig|undefined} config
   * @returns {(Object|undefined)}
   */
  decode: function decode(value, config) {
    var universalUid;
    var ext = {};
    if (value && typeof value.universal_uid === 'string') {
      universalUid = value.universal_uid;
      ext = value.ext || ext;
    } else {
      return undefined;
    }
    var responseObj = {
      id5id: {
        uid: universalUid,
        ext: ext
      }
    };
    var abTestingResult = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value, 'ab_testing.result');
    switch (abTestingResult) {
      case 'control':
        // A/B Testing is enabled and user is in the Control Group
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'A/B Testing - user is in the Control Group: ID5 ID is NOT exposed');
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__.dset)(responseObj, 'id5id.ext.abTestingControlGroup', true);
        break;
      case 'error':
        // A/B Testing is enabled, but configured improperly, so skip A/B testing
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(LOG_PREFIX + 'A/B Testing ERROR! controlGroupPct must be a number >= 0 and <= 1');
        break;
      case 'normal':
        // A/B Testing is enabled but user is not in the Control Group, so ID5 ID is shared
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'A/B Testing - user is NOT in the Control Group');
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_5__.dset)(responseObj, 'id5id.ext.abTestingControlGroup', false);
        break;
    }
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'Decoded ID', responseObj);
    return responseObj;
  },
  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function getId
   * @param {SubmoduleConfig} submoduleConfig
   * @param {ConsentData} consentData
   * @param {(Object|undefined)} cacheIdObj
   * @returns {IdResponse|undefined}
   */
  getId: function getId(submoduleConfig, consentData, cacheIdObj) {
    if (!hasRequiredConfig(submoduleConfig)) {
      return undefined;
    }
    if (!hasWriteConsentToLocalStorage(consentData)) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'Skipping ID5 local storage write because no consent given.');
      return undefined;
    }
    var resp = function resp(cbFunction) {
      new IdFetchFlow(submoduleConfig, consentData, cacheIdObj, _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_6__.uspDataHandler.getConsentData()).execute().then(function (response) {
        cbFunction(response);
      }).catch(function (error) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(LOG_PREFIX + 'getId fetch encountered an error', error);
        cbFunction();
      });
    };
    return {
      callback: resp
    };
  },
  /**
   * Similar to Submodule#getId, this optional method returns response to for id that exists already.
   *  If IdResponse#id is defined, then it will be written to the current active storage even if it exists already.
   *  If IdResponse#callback is defined, then it'll called at the end of auction.
   *  It's permissible to return neither, one, or both fields.
   * @function extendId
   * @param {SubmoduleConfig} config
   * @param {ConsentData|undefined} consentData
   * @param {Object} cacheIdObj - existing id, if any
   * @return {(IdResponse|function(callback:function))} A response object that contains id and/or callback.
   */
  extendId: function extendId(config, consentData, cacheIdObj) {
    hasRequiredConfig(config);
    if (!hasWriteConsentToLocalStorage(consentData)) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'No consent given for ID5 local storage writing, skipping nb increment.');
      return cacheIdObj;
    }
    var partnerId = config && config.params && config.params.partner || 0;
    incrementNb(partnerId);
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'using cached ID', cacheIdObj);
    return cacheIdObj;
  }
};
var _ajaxPromise = /*#__PURE__*/new WeakSet();
var _callForConfig = /*#__PURE__*/new WeakSet();
var _callForExtensions = /*#__PURE__*/new WeakSet();
var _callId5Fetch = /*#__PURE__*/new WeakSet();
var _createFetchRequestData = /*#__PURE__*/new WeakSet();
var IdFetchFlow = /*#__PURE__*/function () {
  function IdFetchFlow(_submoduleConfig, gdprConsentData, cacheIdObj, usPrivacyData) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__["default"])(this, IdFetchFlow);
    _classPrivateMethodInitSpec(this, _createFetchRequestData);
    _classPrivateMethodInitSpec(this, _callId5Fetch);
    _classPrivateMethodInitSpec(this, _callForExtensions);
    _classPrivateMethodInitSpec(this, _callForConfig);
    _classPrivateMethodInitSpec(this, _ajaxPromise);
    this.submoduleConfig = _submoduleConfig;
    this.gdprConsentData = gdprConsentData;
    this.cacheIdObj = cacheIdObj;
    this.usPrivacyData = usPrivacyData;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__["default"])(IdFetchFlow, [{
    key: "execute",
    value: function execute() {
      var _this = this;
      return _classPrivateMethodGet(this, _callForConfig, _callForConfig2).call(this, this.submoduleConfig).then(function (fetchFlowConfig) {
        return _classPrivateMethodGet(_this, _callForExtensions, _callForExtensions2).call(_this, fetchFlowConfig.extensionsCall).then(function (extensionsData) {
          return _classPrivateMethodGet(_this, _callId5Fetch, _callId5Fetch2).call(_this, fetchFlowConfig.fetchCall, extensionsData);
        });
      }).then(function (fetchCallResponse) {
        try {
          resetNb(_this.submoduleConfig.params.partner);
          if (fetchCallResponse.privacy) {
            storeInLocalStorage(ID5_PRIVACY_STORAGE_NAME, JSON.stringify(fetchCallResponse.privacy), NB_EXP_DAYS);
          }
        } catch (error) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(LOG_PREFIX + error);
        }
        return fetchCallResponse;
      });
    }
  }]);
  return IdFetchFlow;
}();
function _ajaxPromise2(url, data, options) {
  return new Promise(function (resolve, reject) {
    (0,_src_ajax_js__WEBPACK_IMPORTED_MODULE_9__.ajax)(url, {
      success: function success(res) {
        resolve(res);
      },
      error: function error(err) {
        reject(err);
      }
    }, data, options);
  });
}
function _callForConfig2(submoduleConfig) {
  var url = submoduleConfig.params.configUrl || ID5_API_CONFIG_URL; // override for debug/test purposes only
  return _classPrivateMethodGet(this, _ajaxPromise, _ajaxPromise2).call(this, url, JSON.stringify(submoduleConfig), {
    method: 'POST'
  }).then(function (response) {
    var responseObj = JSON.parse(response);
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'config response received from the server', responseObj);
    return responseObj;
  });
}
function _callForExtensions2(extensionsCallConfig) {
  if (extensionsCallConfig === undefined) {
    return Promise.resolve(undefined);
  }
  var extensionsUrl = extensionsCallConfig.url;
  var method = extensionsCallConfig.method || 'GET';
  var data = method === 'GET' ? undefined : JSON.stringify(extensionsCallConfig.body || {});
  return _classPrivateMethodGet(this, _ajaxPromise, _ajaxPromise2).call(this, extensionsUrl, data, {
    'method': method
  }).then(function (response) {
    var responseObj = JSON.parse(response);
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'extensions response received from the server', responseObj);
    return responseObj;
  });
}
function _callId5Fetch2(fetchCallConfig, extensionsData) {
  var url = fetchCallConfig.url;
  var additionalData = fetchCallConfig.overrides || {};
  var data = _objectSpread(_objectSpread(_objectSpread({}, _classPrivateMethodGet(this, _createFetchRequestData, _createFetchRequestData2).call(this)), additionalData), {}, {
    extensions: extensionsData
  });
  return _classPrivateMethodGet(this, _ajaxPromise, _ajaxPromise2).call(this, url, JSON.stringify(data), {
    method: 'POST',
    withCredentials: true
  }).then(function (response) {
    var responseObj = JSON.parse(response);
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logInfo)(LOG_PREFIX + 'fetch response received from the server', responseObj);
    return responseObj;
  });
}
function _createFetchRequestData2() {
  var params = this.submoduleConfig.params;
  var hasGdpr = this.gdprConsentData && typeof this.gdprConsentData.gdprApplies === 'boolean' && this.gdprConsentData.gdprApplies ? 1 : 0;
  var referer = (0,_src_refererDetection_js__WEBPACK_IMPORTED_MODULE_10__.getRefererInfo)();
  var signature = this.cacheIdObj && this.cacheIdObj.signature ? this.cacheIdObj.signature : getLegacyCookieSignature();
  var nbPage = incrementNb(params.partner);
  var data = {
    'partner': params.partner,
    'gdpr': hasGdpr,
    'nbPage': nbPage,
    'o': 'pbjs',
    'tml': referer.topmostLocation,
    'ref': referer.ref,
    'cu': referer.canonicalUrl,
    'top': referer.reachedTop ? 1 : 0,
    'u': referer.stack[0] || window.location.href,
    'v': "8.0.0",
    'storage': this.submoduleConfig.storage,
    'localStorage': storage.localStorageIsEnabled() ? 1 : 0
  };

  // pass in optional data, but only if populated
  if (hasGdpr && this.gdprConsentData.consentString !== undefined && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this.gdprConsentData.consentString) && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmptyStr)(this.gdprConsentData.consentString)) {
    data.gdpr_consent = this.gdprConsentData.consentString;
  }
  if (this.usPrivacyData !== undefined && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this.usPrivacyData) && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmptyStr)(this.usPrivacyData)) {
    data.us_privacy = this.usPrivacyData;
  }
  if (signature !== undefined && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmptyStr)(signature)) {
    data.s = signature;
  }
  if (params.pd !== undefined && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmptyStr)(params.pd)) {
    data.pd = params.pd;
  }
  if (params.provider !== undefined && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.isEmptyStr)(params.provider)) {
    data.provider = params.provider;
  }
  var abTestingConfig = params.abTesting || {
    enabled: false
  };
  if (abTestingConfig.enabled) {
    data.ab_testing = {
      enabled: true,
      control_group_pct: abTestingConfig.controlGroupPct // The server validates
    };
  }

  return data;
}
function hasRequiredConfig(config) {
  if (!config || !config.params || !config.params.partner || typeof config.params.partner !== 'number') {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(LOG_PREFIX + 'partner required to be defined as a number');
    return false;
  }
  if (!config.storage || !config.storage.type || !config.storage.name) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logError)(LOG_PREFIX + 'storage required to be set');
    return false;
  }

  // in a future release, we may return false if storage type or name are not set as required
  if (config.storage.type !== LOCAL_STORAGE) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)(LOG_PREFIX + "storage type recommended to be '".concat(LOCAL_STORAGE, "'. In a future release this may become a strict requirement"));
  }
  // in a future release, we may return false if storage type or name are not set as required
  if (config.storage.name !== ID5_STORAGE_NAME) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.logWarn)(LOG_PREFIX + "storage name recommended to be '".concat(ID5_STORAGE_NAME, "'. In a future release this may become a strict requirement"));
  }
  return true;
}
function expDaysStr(expDays) {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * expDays).toUTCString();
}
function nbCacheName(partnerId) {
  return "".concat(ID5_STORAGE_NAME, "_").concat(partnerId, "_nb");
}
function storeNbInCache(partnerId, nb) {
  storeInLocalStorage(nbCacheName(partnerId), nb, NB_EXP_DAYS);
}
function getNbFromCache(partnerId) {
  var cacheNb = getFromLocalStorage(nbCacheName(partnerId));
  return cacheNb ? parseInt(cacheNb) : 0;
}
function incrementNb(partnerId) {
  var nb = getNbFromCache(partnerId) + 1;
  storeNbInCache(partnerId, nb);
  return nb;
}
function resetNb(partnerId) {
  storeNbInCache(partnerId, 0);
}
function getLegacyCookieSignature() {
  var legacyStoredValue;
  LEGACY_COOKIE_NAMES.forEach(function (cookie) {
    if (storage.getCookie(cookie)) {
      legacyStoredValue = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_4__.safeJSONParse)(storage.getCookie(cookie)) || legacyStoredValue;
    }
  });
  return legacyStoredValue && legacyStoredValue.signature || '';
}

/**
 * This will make sure we check for expiration before accessing local storage
 * @param {string} key
 */
function getFromLocalStorage(key) {
  var storedValueExp = storage.getDataFromLocalStorage("".concat(key, "_exp"));
  // empty string means no expiration set
  if (storedValueExp === '') {
    return storage.getDataFromLocalStorage(key);
  } else if (storedValueExp) {
    if (new Date(storedValueExp).getTime() - Date.now() > 0) {
      return storage.getDataFromLocalStorage(key);
    }
  }
  // if we got here, then we have an expired item or we didn't set an
  // expiration initially somehow, so we need to remove the item from the
  // local storage
  storage.removeDataFromLocalStorage(key);
  return null;
}

/**
 * Ensure that we always set an expiration in local storage since
 * by default it's not required
 * @param {string} key
 * @param {any} value
 * @param {integer} expDays
 */
function storeInLocalStorage(key, value, expDays) {
  storage.setDataInLocalStorage("".concat(key, "_exp"), expDaysStr(expDays));
  storage.setDataInLocalStorage("".concat(key), value);
}

/**
 * Check to see if we can write to local storage based on purpose consent 1, and that we have vendor consent (ID5=131)
 * @param {ConsentData} consentData
 * @returns {boolean}
 */
function hasWriteConsentToLocalStorage(consentData) {
  var hasGdpr = consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies;
  var localstorageConsent = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"])(consentData, "vendorData.purpose.consents.1");
  var id5VendorConsent = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"])(consentData, "vendorData.vendor.consents.".concat(GVLID.toString()));
  if (hasGdpr && (!localstorageConsent || !id5VendorConsent)) {
    return false;
  }
  return true;
}
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_11__.submodule)('userId', id5IdSubmodule);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__.registerModule)('id5IdSystem');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/id5IdSystem.js"));
/******/ }
]);
//# sourceMappingURL=id5IdSystem.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["lotamePanoramaIdSystem"],{

/***/ "./modules/lotamePanoramaIdSystem.js":
/*!*******************************************!*\
  !*** ./modules/lotamePanoramaIdSystem.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports storage, lotamePanoramaIdSubmodule */
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_ajax_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/ajax.js */ "./src/ajax.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/hook.js */ "./src/hook.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");

/**
 * This module adds LotamePanoramaId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/lotamePanoramaId
 * @requires module:modules/userId
 */






var KEY_ID = 'panoramaId';
var KEY_EXPIRY = "".concat(KEY_ID, "_expiry");
var KEY_PROFILE = '_cc_id';
var MODULE_NAME = 'lotamePanoramaId';
var NINE_MONTHS_MS = 23328000 * 1000;
var DAYS_TO_CACHE = 7;
var DAY_MS = 60 * 60 * 24 * 1000;
var MISSING_CORE_CONSENT = 111;
var GVLID = 95;
var ID_HOST = 'id.crwdcntrl.net';
var ID_HOST_COOKIELESS = 'c.ltmsphrcl.net';
var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__.getStorageManager)({
  moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__.MODULE_TYPE_UID,
  moduleName: MODULE_NAME
});
var cookieDomain;

/**
 * Set the Lotame First Party Profile ID in the first party namespace
 * @param {String} profileId
 */
function setProfileId(profileId) {
  if (storage.cookiesAreEnabled()) {
    var expirationDate = new Date((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.timestamp)() + NINE_MONTHS_MS).toUTCString();
    storage.setCookie(KEY_PROFILE, profileId, expirationDate, 'Lax', cookieDomain, undefined);
  }
  if (storage.hasLocalStorage()) {
    storage.setDataInLocalStorage(KEY_PROFILE, profileId, undefined);
  }
}

/**
 * Get the Lotame profile id by checking cookies first and then local storage
 */
function getProfileId() {
  var profileId;
  if (storage.cookiesAreEnabled()) {
    profileId = storage.getCookie(KEY_PROFILE, undefined);
  }
  if (!profileId && storage.hasLocalStorage()) {
    profileId = storage.getDataFromLocalStorage(KEY_PROFILE, undefined);
  }
  return profileId;
}

/**
 * Get a value from browser storage by checking cookies first and then local storage
 * @param {String} key
 */
function getFromStorage(key) {
  var value = null;
  if (storage.cookiesAreEnabled()) {
    value = storage.getCookie(key, undefined);
  }
  if (storage.hasLocalStorage() && value === null) {
    var storedValueExp = storage.getDataFromLocalStorage("".concat(key, "_exp"), undefined);
    if (storedValueExp === '' || storedValueExp === null) {
      value = storage.getDataFromLocalStorage(key, undefined);
    } else if (storedValueExp) {
      if (new Date(parseInt(storedValueExp, 10)).getTime() - Date.now() > 0) {
        value = storage.getDataFromLocalStorage(key, undefined);
      }
    }
  }
  return value;
}

/**
 * Save a key/value pair to the browser cache (cookies and local storage)
 * @param {String} key
 * @param {String} value
 * @param {Number} expirationTimestamp
 */
function saveLotameCache(key, value) {
  var expirationTimestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.timestamp)() + DAYS_TO_CACHE * DAY_MS;
  if (key && value) {
    var expirationDate = new Date(expirationTimestamp).toUTCString();
    if (storage.cookiesAreEnabled()) {
      storage.setCookie(key, value, expirationDate, 'Lax', cookieDomain, undefined);
    }
    if (storage.hasLocalStorage()) {
      storage.setDataInLocalStorage("".concat(key, "_exp"), String(expirationTimestamp), undefined);
      storage.setDataInLocalStorage(key, value, undefined);
    }
  }
}

/**
 * Retrieve all the cached values from cookies and/or local storage
 * @param {Number} clientId
 */
function getLotameLocalCache() {
  var clientId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var cache = {
    data: getFromStorage(KEY_ID),
    expiryTimestampMs: 0,
    clientExpiryTimestampMs: 0
  };
  try {
    if (clientId) {
      var rawClientExpiry = getFromStorage("".concat(KEY_EXPIRY, "_").concat(clientId));
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(rawClientExpiry)) {
        cache.clientExpiryTimestampMs = parseInt(rawClientExpiry, 10);
      }
    }
    var rawExpiry = getFromStorage(KEY_EXPIRY);
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(rawExpiry)) {
      cache.expiryTimestampMs = parseInt(rawExpiry, 10);
    }
  } catch (error) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logError)(error);
  }
  return cache;
}

/**
 * Clear a cached value from cookies and local storage
 * @param {String} key
 */
function clearLotameCache(key) {
  if (key) {
    if (storage.cookiesAreEnabled()) {
      var expirationDate = new Date(0).toUTCString();
      storage.setCookie(key, '', expirationDate, 'Lax', cookieDomain, undefined);
    }
    if (storage.hasLocalStorage()) {
      storage.removeDataFromLocalStorage(key, undefined);
    }
  }
}
/** @type {Submodule} */
var lotamePanoramaIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,
  /**
   * Vendor id of Lotame
   * @type {Number}
   */
  gvlid: GVLID,
  /**
   * Decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @param {SubmoduleConfig|undefined} config
   * @returns {(Object|undefined)}
   */
  decode: function decode(value, config) {
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(value) ? {
      lotamePanoramaId: value
    } : undefined;
  },
  /**
   * Retrieve the Lotame Panorama Id
   * @function
   * @param {SubmoduleConfig} [config]
   * @param {ConsentData} [consentData]
   * @param {(Object|undefined)} cacheIdObj
   * @returns {IdResponse|undefined}
   */
  getId: function getId(config, consentData, cacheIdObj) {
    cookieDomain = lotamePanoramaIdSubmodule.findRootDomain();
    var configParams = config && config.params || {};
    var clientId = configParams.clientId;
    var hasCustomClientId = !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(clientId);
    var localCache = getLotameLocalCache(clientId);
    var hasExpiredPanoId = Date.now() > localCache.expiryTimestampMs;
    if (hasCustomClientId) {
      var hasFreshClientNoConsent = Date.now() < localCache.clientExpiryTimestampMs;
      if (hasFreshClientNoConsent) {
        // There is no consent
        return {
          id: undefined,
          reason: 'NO_CLIENT_CONSENT'
        };
      }
    }
    if (!hasExpiredPanoId) {
      return {
        id: localCache.data
      };
    }
    var storedUserId = getProfileId();

    // Add CCPA Consent data handling
    var usp = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_3__.uspDataHandler.getConsentData();
    var usPrivacy;
    if (typeof usp !== 'undefined' && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(usp) && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isEmptyStr)(usp)) {
      usPrivacy = usp;
    }
    if (!usPrivacy) {
      // fallback to 1st party cookie
      usPrivacy = getFromStorage('us_privacy');
    }
    var getRequestHost = function getRequestHost() {
      if (navigator.userAgent && navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        return ID_HOST_COOKIELESS;
      }
      return ID_HOST;
    };
    var resolveIdFunction = function resolveIdFunction(callback) {
      var queryParams = {};
      if (storedUserId) {
        queryParams.fp = storedUserId;
      }
      var consentString;
      if (consentData) {
        if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isBoolean)(consentData.gdprApplies)) {
          queryParams.gdpr_applies = consentData.gdprApplies;
        }
        consentString = consentData.consentString;
      }
      // If no consent string, try to read it from 1st party cookies
      if (!consentString) {
        consentString = getFromStorage('eupubconsent-v2');
      }
      if (!consentString) {
        consentString = getFromStorage('euconsent-v2');
      }
      if (consentString) {
        queryParams.gdpr_consent = consentString;
      }

      // Add usPrivacy to the url
      if (usPrivacy) {
        queryParams.us_privacy = usPrivacy;
      }

      // Add clientId to the url
      if (hasCustomClientId) {
        queryParams.c = clientId;
      }
      var url = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.buildUrl)({
        protocol: 'https',
        host: getRequestHost(),
        pathname: '/id',
        search: (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(queryParams) ? undefined : queryParams
      });
      (0,_src_ajax_js__WEBPACK_IMPORTED_MODULE_4__.ajax)(url, function (response) {
        var coreId;
        if (response) {
          try {
            var responseObj = JSON.parse(response);
            var hasNoConsentErrors = !((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(responseObj.errors) && responseObj.errors.indexOf(MISSING_CORE_CONSENT) !== -1);
            if (hasCustomClientId) {
              if (hasNoConsentErrors) {
                clearLotameCache("".concat(KEY_EXPIRY, "_").concat(clientId));
              } else if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(responseObj.no_consent) && responseObj.no_consent === 'CLIENT') {
                saveLotameCache("".concat(KEY_EXPIRY, "_").concat(clientId), responseObj.expiry_ts, responseObj.expiry_ts);

                // End Processing
                callback();
                return;
              }
            }
            saveLotameCache(KEY_EXPIRY, responseObj.expiry_ts, responseObj.expiry_ts);
            if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(responseObj.profile_id)) {
              if (hasNoConsentErrors) {
                setProfileId(responseObj.profile_id);
              }
              if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.isStr)(responseObj.core_id)) {
                saveLotameCache(KEY_ID, responseObj.core_id, responseObj.expiry_ts);
                coreId = responseObj.core_id;
              } else {
                clearLotameCache(KEY_ID);
              }
            } else {
              if (hasNoConsentErrors) {
                clearLotameCache(KEY_PROFILE);
              }
              clearLotameCache(KEY_ID);
            }
          } catch (error) {
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logError)(error);
          }
        }
        callback(coreId);
      }, undefined, {
        method: 'GET',
        withCredentials: true
      });
    };
    return {
      callback: resolveIdFunction
    };
  }
};
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_5__.submodule)('userId', lotamePanoramaIdSubmodule);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_6__.registerModule)('lotamePanoramaIdSystem');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/lotamePanoramaIdSystem.js"));
/******/ }
]);
//# sourceMappingURL=lotamePanoramaIdSystem.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["pubmaticBidAdapter"],{

/***/ "./modules/pubmaticBidAdapter.js":
/*!***************************************!*\
  !*** ./modules/pubmaticBidAdapter.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports _getDomainFromURL, toOrtbNativeRequest, checkVideoPlacement, assignDealTier, prepareMetaObject, spec */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var _src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../src/adapters/bidderFactory.js */ "./src/adapters/bidderFactory.js");
/* harmony import */ var _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/mediaTypes.js */ "./src/mediaTypes.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/config.js */ "./src/config.js");
/* harmony import */ var _src_Renderer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/Renderer.js */ "./src/Renderer.js");
/* harmony import */ var _src_bidderSettings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/bidderSettings.js */ "./src/bidderSettings.js");
/* harmony import */ var _src_constants_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/constants.json */ "./src/constants.json");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }








var BIDDER_CODE = 'pubmatic';
var LOG_WARN_PREFIX = 'PubMatic: ';
var ENDPOINT = 'https://hbopenbid.pubmatic.com/translator';
var USER_SYNC_URL_IFRAME = 'https://ads.pubmatic.com/AdServer/js/user_sync.html?kdntuid=1&p=';
var USER_SYNC_URL_IMAGE = 'https://image8.pubmatic.com/AdServer/ImgSync?p=';
var DEFAULT_CURRENCY = 'USD';
var AUCTION_TYPE = 1;
var PUBMATIC_ALIAS = 'pubmatic2';
var UNDEFINED = undefined;
var DEFAULT_WIDTH = 0;
var DEFAULT_HEIGHT = 0;
var PREBID_NATIVE_HELP_LINK = 'http://prebid.org/dev-docs/show-native-ads.html';
var PUBLICATION = 'pubmatic'; // Your publication on Blue Billywig, potentially with environment (e.g. publication.bbvms.com or publication.test.bbvms.com)
var RENDERER_URL = 'https://pubmatic.bbvms.com/r/'.concat('$RENDERER', '.js'); // URL of the renderer application
var MSG_VIDEO_PLACEMENT_MISSING = 'Video.Placement param missing';
var CUSTOM_PARAMS = {
  'kadpageurl': '',
  // Custom page url
  'gender': '',
  // User gender
  'yob': '',
  // User year of birth
  'lat': '',
  // User location - Latitude
  'lon': '',
  // User Location - Longitude
  'wiid': '',
  // OpenWrap Wrapper Impression ID
  'profId': '',
  // OpenWrap Legacy: Profile ID
  'verId': '' // OpenWrap Legacy: version ID
};

var DATA_TYPES = {
  'NUMBER': 'number',
  'STRING': 'string',
  'BOOLEAN': 'boolean',
  'ARRAY': 'array',
  'OBJECT': 'object'
};
var VIDEO_CUSTOM_PARAMS = {
  'mimes': DATA_TYPES.ARRAY,
  'minduration': DATA_TYPES.NUMBER,
  'maxduration': DATA_TYPES.NUMBER,
  'startdelay': DATA_TYPES.NUMBER,
  'playbackmethod': DATA_TYPES.ARRAY,
  'api': DATA_TYPES.ARRAY,
  'protocols': DATA_TYPES.ARRAY,
  'w': DATA_TYPES.NUMBER,
  'h': DATA_TYPES.NUMBER,
  'battr': DATA_TYPES.ARRAY,
  'linearity': DATA_TYPES.NUMBER,
  'placement': DATA_TYPES.NUMBER,
  'plcmt': DATA_TYPES.NUMBER,
  'minbitrate': DATA_TYPES.NUMBER,
  'maxbitrate': DATA_TYPES.NUMBER,
  'skip': DATA_TYPES.NUMBER
};
var NATIVE_ASSET_IMAGE_TYPE = {
  'ICON': 1,
  'IMAGE': 3
};
var NET_REVENUE = true;
var dealChannelValues = {
  1: 'PMP',
  5: 'PREF',
  6: 'PMPG'
};

// BB stands for Blue BillyWig
var BB_RENDERER = {
  bootstrapPlayer: function bootstrapPlayer(bid) {
    var config = {
      code: bid.adUnitCode
    };
    if (bid.vastXml) config.vastXml = bid.vastXml;else if (bid.vastUrl) config.vastUrl = bid.vastUrl;
    if (!bid.vastXml && !bid.vastUrl) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": No vastXml or vastUrl on bid, bailing..."));
      return;
    }
    var rendererId = BB_RENDERER.getRendererId(PUBLICATION, bid.rendererCode);
    var ele = document.getElementById(bid.adUnitCode); // NB convention

    var renderer;
    for (var rendererIndex = 0; rendererIndex < window.bluebillywig.renderers.length; rendererIndex++) {
      if (window.bluebillywig.renderers[rendererIndex]._id === rendererId) {
        renderer = window.bluebillywig.renderers[rendererIndex];
        break;
      }
    }
    if (renderer) renderer.bootstrap(config, ele);else (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Couldn't find a renderer with ").concat(rendererId));
  },
  newRenderer: function newRenderer(rendererCode, adUnitCode) {
    var rendererUrl = RENDERER_URL.replace('$RENDERER', rendererCode);
    var renderer = _src_Renderer_js__WEBPACK_IMPORTED_MODULE_2__.Renderer.install({
      url: rendererUrl,
      loaded: false,
      adUnitCode: adUnitCode
    });
    try {
      renderer.setRender(BB_RENDERER.outstreamRender);
    } catch (err) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Error tying to setRender on renderer"), err);
    }
    return renderer;
  },
  outstreamRender: function outstreamRender(bid) {
    bid.renderer.push(function () {
      BB_RENDERER.bootstrapPlayer(bid);
    });
  },
  getRendererId: function getRendererId(pub, renderer) {
    return "".concat(pub, "-").concat(renderer); // NB convention!
  }
};

var MEDIATYPE = [_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE];
var publisherId = 0;
var isInvalidNativeRequest = false;
var biddersList = ['pubmatic'];
var allBiddersList = ['all'];
var vsgDomain = window.location.hostname;
var getAndParseFromLocalStorage = function getAndParseFromLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
};
var vsgObj = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, vsgDomain, '');
var removeViewTimeForZeroValue = function removeViewTimeForZeroValue(obj) {
  // Deleteing this field as it is only required to calculate totalViewtime and no need to send it to translator.
  delete obj.lastViewStarted;
  // Deleteing totalTimeView incase value is less than 1 sec.
  if (obj.totalViewTime == 0) {
    delete obj.totalViewTime;
  }
};
function _getDomainFromURL(url) {
  var anchor = document.createElement('a');
  anchor.href = url;
  return anchor.hostname;
}
function _parseSlotParam(paramName, paramValue) {
  if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(paramValue)) {
    paramValue && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Ignoring param key: ' + paramName + ', expects string-value, found ' + (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(paramValue));
    return UNDEFINED;
  }
  switch (paramName) {
    case 'pmzoneid':
      return paramValue.split(',').slice(0, 50).map(function (id) {
        return id.trim();
      }).join();
    case 'kadfloor':
      return parseFloat(paramValue) || UNDEFINED;
    case 'lat':
      return parseFloat(paramValue) || UNDEFINED;
    case 'lon':
      return parseFloat(paramValue) || UNDEFINED;
    case 'yob':
      return parseInt(paramValue) || UNDEFINED;
    default:
      return paramValue;
  }
}
function _cleanSlot(slotName) {
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(slotName)) {
    return slotName.replace(/^\s+/g, '').replace(/\s+$/g, '');
  }
  if (slotName) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(BIDDER_CODE + ': adSlot must be a string. Ignoring adSlot');
  }
  return '';
}
function _parseAdSlot(bid) {
  bid.params.adUnit = '';
  bid.params.adUnitIndex = '0';
  bid.params.width = 0;
  bid.params.height = 0;
  bid.params.adSlot = _cleanSlot(bid.params.adSlot);
  var slot = bid.params.adSlot;
  var splits = slot.split(':');
  slot = splits[0];
  if (splits.length == 2) {
    bid.params.adUnitIndex = splits[1];
  }
  // check if size is mentioned in sizes array. in that case do not check for @ in adslot
  splits = slot.split('@');
  bid.params.adUnit = splits[0];
  if (splits.length > 1) {
    // i.e size is specified in adslot, so consider that and ignore sizes array
    splits = splits.length == 2 ? splits[1].split('x') : splits.length == 3 ? splits[2].split('x') : [];
    if (splits.length != 2) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'AdSlot Error: adSlot not in required format');
      return;
    }
    bid.params.width = parseInt(splits[0], 10);
    bid.params.height = parseInt(splits[1], 10);
  }
  // Case : if Size is present in ad slot as well as in mediaTypes then ???
  if (bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER) && bid.mediaTypes.banner.hasOwnProperty('sizes')) {
    var i = 0;
    var sizeArray = [];
    for (; i < bid.mediaTypes.banner.sizes.length; i++) {
      if (bid.mediaTypes.banner.sizes[i].length === 2) {
        // sizes[i].length will not be 2 in case where size is set as fluid, we want to skip that entry
        sizeArray.push(bid.mediaTypes.banner.sizes[i]);
      }
    }
    bid.mediaTypes.banner.sizes = sizeArray;
    if (bid.mediaTypes.banner.sizes.length >= 1) {
      // set the first size in sizes array in bid.params.width and bid.params.height. These will be sent as primary size.
      // The rest of the sizes will be sent in format array.
      if (!bid.params.width && !bid.params.height) {
        bid.params.width = bid.mediaTypes.banner.sizes[0][0];
        bid.params.height = bid.mediaTypes.banner.sizes[0][1];
        bid.mediaTypes.banner.sizes = bid.mediaTypes.banner.sizes.splice(1, bid.mediaTypes.banner.sizes.length - 1);
      } else if (bid.params.width == bid.mediaTypes.banner.sizes[0][0] && bid.params.height == bid.mediaTypes.banner.sizes[0][1]) {
        bid.mediaTypes.banner.sizes = bid.mediaTypes.banner.sizes.splice(1, bid.mediaTypes.banner.sizes.length - 1);
      }
    }
  }
}
function _initConf(refererInfo) {
  return {
    // TODO: do the fallbacks make sense here?
    pageURL: (refererInfo === null || refererInfo === void 0 ? void 0 : refererInfo.page) || window.location.href,
    refURL: (refererInfo === null || refererInfo === void 0 ? void 0 : refererInfo.ref) || window.document.referrer
  };
}
function _handleCustomParams(params, conf) {
  if (!conf.kadpageurl) {
    conf.kadpageurl = conf.pageURL;
  }
  var key, value, entry;
  for (key in CUSTOM_PARAMS) {
    if (CUSTOM_PARAMS.hasOwnProperty(key)) {
      value = params[key];
      if (value) {
        entry = CUSTOM_PARAMS[key];
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(entry) === 'object') {
          // will be used in future when we want to process a custom param before using
          // 'keyname': {f: function() {}}
          value = entry.f(value, conf);
        }
        if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(value)) {
          conf[key] = value;
        } else {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Ignoring param : ' + key + ' with value : ' + CUSTOM_PARAMS[key] + ', expects string-value, found ' + (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(value));
        }
      }
    }
  }
  return conf;
}
function _createOrtbTemplate(conf) {
  return {
    id: '' + new Date().getTime(),
    at: AUCTION_TYPE,
    cur: [DEFAULT_CURRENCY],
    imp: [],
    site: {
      page: conf.pageURL,
      ref: conf.refURL,
      publisher: {}
    },
    device: {
      ua: navigator.userAgent,
      js: 1,
      dnt: navigator.doNotTrack == 'yes' || navigator.doNotTrack == '1' || navigator.msDoNotTrack == '1' ? 1 : 0,
      h: screen.height,
      w: screen.width,
      language: navigator.language
    },
    user: {},
    ext: {}
  };
}
function _checkParamDataType(key, value, datatype) {
  var errMsg = 'Ignoring param key: ' + key + ', expects ' + datatype + ', found ' + (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(value);
  var functionToExecute;
  switch (datatype) {
    case DATA_TYPES.BOOLEAN:
      functionToExecute = _src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBoolean;
      break;
    case DATA_TYPES.NUMBER:
      functionToExecute = _src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber;
      break;
    case DATA_TYPES.STRING:
      functionToExecute = _src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr;
      break;
    case DATA_TYPES.ARRAY:
      functionToExecute = _src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray;
      break;
  }
  if (functionToExecute(value)) {
    return value;
  }
  (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + errMsg);
  return UNDEFINED;
}

// TODO delete this code when removing native 1.1 support
var PREBID_NATIVE_DATA_KEYS_TO_ORTB = {
  'desc': 'desc',
  'desc2': 'desc2',
  'body': 'desc',
  'body2': 'desc2',
  'sponsoredBy': 'sponsored',
  'cta': 'ctatext',
  'rating': 'rating',
  'address': 'address',
  'downloads': 'downloads',
  'likes': 'likes',
  'phone': 'phone',
  'price': 'price',
  'salePrice': 'saleprice',
  'displayUrl': 'displayurl',
  'saleprice': 'saleprice',
  'displayurl': 'displayurl'
};
var NATIVE_IMAGE_TYPES = _src_constants_json__WEBPACK_IMPORTED_MODULE_5__.NATIVE_IMAGE_TYPES,
  NATIVE_KEYS_THAT_ARE_NOT_ASSETS = _src_constants_json__WEBPACK_IMPORTED_MODULE_5__.NATIVE_KEYS_THAT_ARE_NOT_ASSETS,
  NATIVE_KEYS = _src_constants_json__WEBPACK_IMPORTED_MODULE_5__.NATIVE_KEYS,
  NATIVE_ASSET_TYPES = _src_constants_json__WEBPACK_IMPORTED_MODULE_5__.NATIVE_ASSET_TYPES;
var PREBID_NATIVE_DATA_KEY_VALUES = Object.values(PREBID_NATIVE_DATA_KEYS_TO_ORTB);

// TODO remove this function when the support for 1.1 is removed
/**
 * Copy of the function toOrtbNativeRequest from core native.js to handle the title len/length
 * and ext and mimes parameters from legacy assets.
 * @param {object} legacyNativeAssets
 * @returns an OpenRTB format of the same bid request
 */
function toOrtbNativeRequest(legacyNativeAssets) {
  if (!legacyNativeAssets && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(legacyNativeAssets)) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Native assets object is empty or not an object: ").concat(legacyNativeAssets));
    isInvalidNativeRequest = true;
    return;
  }
  var ortb = {
    ver: '1.2',
    assets: []
  };
  for (var key in legacyNativeAssets) {
    // skip conversion for non-asset keys
    if (NATIVE_KEYS_THAT_ARE_NOT_ASSETS.includes(key)) continue;
    if (!NATIVE_KEYS.hasOwnProperty(key) && !PREBID_NATIVE_DATA_KEY_VALUES.includes(key)) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Unrecognized native asset code: ").concat(key, ". Asset will be ignored."));
      continue;
    }
    var asset = legacyNativeAssets[key];
    var required = 0;
    if (asset.required && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(asset.required)) {
      required = Number(asset.required);
    }
    var ortbAsset = {
      id: ortb.assets.length,
      required: required
    };
    // data cases
    if (key in PREBID_NATIVE_DATA_KEYS_TO_ORTB) {
      ortbAsset.data = {
        type: NATIVE_ASSET_TYPES[PREBID_NATIVE_DATA_KEYS_TO_ORTB[key]]
      };
      if (asset.len || asset.length) {
        ortbAsset.data.len = asset.len || asset.length;
      }
      if (asset.ext) {
        ortbAsset.data.ext = asset.ext;
      }
      // icon or image case
    } else if (key === 'icon' || key === 'image') {
      ortbAsset.img = {
        type: key === 'icon' ? NATIVE_IMAGE_TYPES.ICON : NATIVE_IMAGE_TYPES.MAIN
      };
      // if min_width and min_height are defined in aspect_ratio, they are preferred
      if (asset.aspect_ratios) {
        if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(asset.aspect_ratios)) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": image.aspect_ratios was passed, but it's not a an array: ").concat(asset.aspect_ratios));
        } else if (!asset.aspect_ratios.length) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": image.aspect_ratios was passed, but it's empty: ").concat(asset.aspect_ratios));
        } else {
          var _asset$aspect_ratios$ = asset.aspect_ratios[0],
            minWidth = _asset$aspect_ratios$.min_width,
            minHeight = _asset$aspect_ratios$.min_height;
          if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isInteger)(minWidth) || !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isInteger)(minHeight)) {
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": image.aspect_ratios min_width or min_height are invalid: ").concat(minWidth, ", ").concat(minHeight));
          } else {
            ortbAsset.img.wmin = minWidth;
            ortbAsset.img.hmin = minHeight;
          }
          var aspectRatios = asset.aspect_ratios.filter(function (ar) {
            return ar.ratio_width && ar.ratio_height;
          }).map(function (ratio) {
            return "".concat(ratio.ratio_width, ":").concat(ratio.ratio_height);
          });
          if (aspectRatios.length > 0) {
            ortbAsset.img.ext = {
              aspectratios: aspectRatios
            };
          }
        }
      }
      ortbAsset.img.w = asset.w || asset.width;
      ortbAsset.img.h = asset.h || asset.height;
      ortbAsset.img.wmin = asset.wmin || asset.minimumWidth || (asset.minsizes ? asset.minsizes[0] : UNDEFINED);
      ortbAsset.img.hmin = asset.hmin || asset.minimumHeight || (asset.minsizes ? asset.minsizes[1] : UNDEFINED);

      // if asset.sizes exist, by OpenRTB spec we should remove wmin and hmin
      if (asset.sizes) {
        if (asset.sizes.length !== 2 || !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isInteger)(asset.sizes[0]) || !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isInteger)(asset.sizes[1])) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": image.sizes was passed, but its value is not an array of integers: ").concat(asset.sizes));
        } else {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)("".concat(LOG_WARN_PREFIX, ": if asset.sizes exist, by OpenRTB spec we should remove wmin and hmin"));
          ortbAsset.img.w = asset.sizes[0];
          ortbAsset.img.h = asset.sizes[1];
          delete ortbAsset.img.hmin;
          delete ortbAsset.img.wmin;
        }
      }
      asset.ext && (ortbAsset.img.ext = asset.ext);
      asset.mimes && (ortbAsset.img.mimes = asset.mimes);
      // title case
    } else if (key === 'title') {
      ortbAsset.title = {
        // in openRTB, len is required for titles, while in legacy prebid was not.
        // for this reason, if len is missing in legacy prebid, we're adding a default value of 140.
        len: asset.len || asset.length || 140
      };
      asset.ext && (ortbAsset.title.ext = asset.ext);
      // all extensions to the native bid request are passed as is
    } else if (key === 'ext') {
      ortbAsset.ext = asset;
      // in `ext` case, required field is not needed
      delete ortbAsset.required;
    }
    ortb.assets.push(ortbAsset);
  }
  if (ortb.assets.length < 1) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Could not find any valid asset"));
    isInvalidNativeRequest = true;
    return;
  }
  return ortb;
}
// TODO delete this code when removing native 1.1 support

function _createNativeRequest(params) {
  var nativeRequestObject;

  // TODO delete this code when removing native 1.1 support
  if (!params.ortb) {
    // legacy assets definition found
    nativeRequestObject = toOrtbNativeRequest(params);
  } else {
    // ortb assets definition found
    params = params.ortb;
    // TODO delete this code when removing native 1.1 support
    nativeRequestObject = _objectSpread(_objectSpread({
      ver: '1.2'
    }, params), {}, {
      assets: []
    });
    var _params = params,
      assets = _params.assets;
    var isValidAsset = function isValidAsset(asset) {
      return asset.title || asset.img || asset.data || asset.video;
    };
    if (assets.length < 1 || !assets.some(function (asset) {
      return isValidAsset(asset);
    })) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": Native assets object is empty or contains some invalid object"));
      isInvalidNativeRequest = true;
      return nativeRequestObject;
    }
    assets.forEach(function (asset) {
      var assetObj = asset;
      if (assetObj.img) {
        if (assetObj.img.type == NATIVE_ASSET_IMAGE_TYPE.IMAGE) {
          assetObj.w = assetObj.w || assetObj.width || (assetObj.sizes ? assetObj.sizes[0] : UNDEFINED);
          assetObj.h = assetObj.h || assetObj.height || (assetObj.sizes ? assetObj.sizes[1] : UNDEFINED);
          assetObj.wmin = assetObj.wmin || assetObj.minimumWidth || (assetObj.minsizes ? assetObj.minsizes[0] : UNDEFINED);
          assetObj.hmin = assetObj.hmin || assetObj.minimumHeight || (assetObj.minsizes ? assetObj.minsizes[1] : UNDEFINED);
        } else if (assetObj.img.type == NATIVE_ASSET_IMAGE_TYPE.ICON) {
          assetObj.w = assetObj.w || assetObj.width || (assetObj.sizes ? assetObj.sizes[0] : UNDEFINED);
          assetObj.h = assetObj.h || assetObj.height || (assetObj.sizes ? assetObj.sizes[1] : UNDEFINED);
        }
      }
      if (assetObj && assetObj.id !== undefined && isValidAsset(assetObj)) {
        nativeRequestObject.assets.push(assetObj);
      }
    });
  }
  return nativeRequestObject;
}
function _createBannerRequest(bid) {
  var sizes = bid.mediaTypes.banner.sizes;
  var format = [];
  var bannerObj;
  if (sizes !== UNDEFINED && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(sizes)) {
    bannerObj = {};
    if (!bid.params.width && !bid.params.height) {
      if (sizes.length === 0) {
        // i.e. since bid.params does not have width or height, and length of sizes is 0, need to ignore this banner imp
        bannerObj = UNDEFINED;
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: mediaTypes.banner.size missing for adunit: ' + bid.params.adUnit + '. Ignoring the banner impression in the adunit.');
        return bannerObj;
      } else {
        bannerObj.w = parseInt(sizes[0][0], 10);
        bannerObj.h = parseInt(sizes[0][1], 10);
        sizes = sizes.splice(1, sizes.length - 1);
      }
    } else {
      bannerObj.w = bid.params.width;
      bannerObj.h = bid.params.height;
    }
    if (sizes.length > 0) {
      format = [];
      sizes.forEach(function (size) {
        if (size.length > 1) {
          format.push({
            w: size[0],
            h: size[1]
          });
        }
      });
      if (format.length > 0) {
        bannerObj.format = format;
      }
    }
    bannerObj.pos = 0;
    bannerObj.topframe = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.inIframe)() ? 0 : 1;
  } else {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: mediaTypes.banner.size missing for adunit: ' + bid.params.adUnit + '. Ignoring the banner impression in the adunit.');
    bannerObj = UNDEFINED;
  }
  return bannerObj;
}
function checkVideoPlacement(videoData, adUnitCode) {
  // Check for video.placement property. If property is missing display log message.
  if ( true && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(videoData, 'placement')) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(MSG_VIDEO_PLACEMENT_MISSING + ' for ' + adUnitCode);
  }
  ;
}
function _createVideoRequest(bid) {
  var videoData = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(bid.mediaTypes, 'video'), bid.params.video);
  var videoObj;
  if ( true && videoData !== UNDEFINED) {
    videoObj = {};
    checkVideoPlacement(videoData, bid.adUnitCode);
    for (var key in VIDEO_CUSTOM_PARAMS) {
      if (videoData.hasOwnProperty(key)) {
        videoObj[key] = _checkParamDataType(key, videoData[key], VIDEO_CUSTOM_PARAMS[key]);
      }
    }
    // read playersize and assign to h and w.
    if (bid.mediaTypes.video.playerSize) {
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bid.mediaTypes.video.playerSize[0])) {
        videoObj.w = parseInt(bid.mediaTypes.video.playerSize[0][0], 10);
        videoObj.h = parseInt(bid.mediaTypes.video.playerSize[0][1], 10);
      } else if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(bid.mediaTypes.video.playerSize[0])) {
        videoObj.w = parseInt(bid.mediaTypes.video.playerSize[0], 10);
        videoObj.h = parseInt(bid.mediaTypes.video.playerSize[1], 10);
      }
    } else if (bid.mediaTypes.video.w && bid.mediaTypes.video.h) {
      videoObj.w = parseInt(bid.mediaTypes.video.w, 10);
      videoObj.h = parseInt(bid.mediaTypes.video.h, 10);
    } else {
      videoObj = UNDEFINED;
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: Video size params(playersize or w&h) missing for adunit: ' + bid.params.adUnit + ' with mediaType set as video. Ignoring video impression in the adunit.');
      return videoObj;
    }
  } else {
    videoObj = UNDEFINED;
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: Video config params missing for adunit: ' + bid.params.adUnit + ' with mediaType set as video. Ignoring video impression in the adunit.');
  }
  return videoObj;
}

// support for PMP deals
function _addPMPDealsInImpression(impObj, bid) {
  if (bid.params.deals) {
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bid.params.deals)) {
      bid.params.deals.forEach(function (dealId) {
        if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(dealId) && dealId.length > 3) {
          if (!impObj.pmp) {
            impObj.pmp = {
              private_auction: 0,
              deals: []
            };
          }
          impObj.pmp.deals.push({
            id: dealId
          });
        } else {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: deal-id present in array bid.params.deals should be a strings with more than 3 charaters length, deal-id ignored: ' + dealId);
        }
      });
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: bid.params.deals should be an array of strings.');
    }
  }
}
function _addBidViewabilityData(impObj, bid) {
  if (bid.bidViewability) {
    impObj.ext.bidViewability = bid.bidViewability;
  }
}
function _addDealCustomTargetings(imp, bid) {
  var dctr = '';
  var dctrLen;
  if (bid.params.dctr) {
    dctr = bid.params.dctr;
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(dctr) && dctr.length > 0) {
      var arr = dctr.split('|');
      dctr = '';
      arr.forEach(function (val) {
        dctr += val.length > 0 ? val.trim() + '|' : '';
      });
      dctrLen = dctr.length;
      if (dctr.substring(dctrLen, dctrLen - 1) === '|') {
        dctr = dctr.substring(0, dctrLen - 1);
      }
      imp.ext['key_val'] = dctr.trim();
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Ignoring param : dctr with value : ' + dctr + ', expects string-value, found empty or non-string value');
    }
  }
}
function _addJWPlayerSegmentData(imp, bid) {
  var jwSegData = bid.rtd && bid.rtd.jwplayer && bid.rtd.jwplayer.targeting || undefined;
  var jwPlayerData = '';
  var jwMark = 'jw-';
  if (jwSegData === undefined || jwSegData === '' || !jwSegData.hasOwnProperty('segments')) return;
  var maxLength = jwSegData.segments.length;
  jwPlayerData += jwMark + 'id=' + jwSegData.content.id; // add the content id first

  for (var i = 0; i < maxLength; i++) {
    jwPlayerData += '|' + jwMark + jwSegData.segments[i] + '=1';
  }
  var ext;
  ext = imp.ext;
  ext && ext.key_val === undefined ? ext.key_val = jwPlayerData : ext.key_val += '|' + jwPlayerData;
}
function _createImpressionObject(bid) {
  var impObj = {};
  var bannerObj;
  var videoObj;
  var nativeObj = {};
  var sizes = bid.hasOwnProperty('sizes') ? bid.sizes : [];
  var mediaTypes = '';
  var format = [];
  impObj = {
    id: bid.bidId,
    tagid: bid.params.hashedKey || bid.params.adUnit || undefined,
    bidfloor: _parseSlotParam('kadfloor', bid.params.kadfloor),
    secure: 1,
    ext: {
      pmZoneId: _parseSlotParam('pmzoneid', bid.params.pmzoneid)
    },
    bidfloorcur: bid.params.currency ? _parseSlotParam('currency', bid.params.currency) : DEFAULT_CURRENCY
  };
  _addPMPDealsInImpression(impObj, bid);
  _addDealCustomTargetings(impObj, bid);
  _addJWPlayerSegmentData(impObj, bid);
  _addBidViewabilityData(impObj, bid);
  if (bid.hasOwnProperty('mediaTypes')) {
    for (mediaTypes in bid.mediaTypes) {
      switch (mediaTypes) {
        case _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER:
          bannerObj = _createBannerRequest(bid);
          if (bannerObj !== UNDEFINED) {
            impObj.banner = bannerObj;
          }
          break;
        case _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE:
          // TODO uncomment below line when removing native 1.1 support
          // nativeObj['request'] = JSON.stringify(_createNativeRequest(bid.nativeOrtbRequest));
          // TODO delete below line when removing native 1.1 support
          nativeObj['request'] = JSON.stringify(_createNativeRequest(bid.nativeParams));
          if (!isInvalidNativeRequest) {
            impObj.native = nativeObj;
          } else {
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: Error in Native adunit ' + bid.params.adUnit + '. Ignoring the adunit. Refer to ' + PREBID_NATIVE_HELP_LINK + ' for more details.');
            isInvalidNativeRequest = false;
          }
          isInvalidNativeRequest = false;
          break;
        case  true && _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO:
          videoObj = _createVideoRequest(bid);
          if (videoObj !== UNDEFINED) {
            impObj.video = videoObj;
          }
          break;
      }
    }
  } else {
    // mediaTypes is not present, so this is a banner only impression
    // this part of code is required for older testcases with no 'mediaTypes' to run succesfully.
    bannerObj = {
      pos: 0,
      w: bid.params.width,
      h: bid.params.height,
      topframe: (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.inIframe)() ? 0 : 1
    };
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(sizes) && sizes.length > 1) {
      sizes = sizes.splice(1, sizes.length - 1);
      sizes.forEach(function (size) {
        if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(size) && size.length == 2) {
          format.push({
            w: size[0],
            h: size[1]
          });
        }
        ;
      });
      bannerObj.format = format;
    }
    impObj.banner = bannerObj;
  }
  _addImpressionFPD(impObj, bid);
  _addFloorFromFloorModule(impObj, bid);
  return impObj.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER) || impObj.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE) ||  true && impObj.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO) ? impObj : UNDEFINED;
}
function _addImpressionFPD(imp, bid) {
  var ortb2 = _objectSpread({}, (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(bid, 'ortb2Imp.ext.data'));
  Object.keys(ortb2).forEach(function (prop) {
    /**
      * Prebid AdSlot
      * @type {(string|undefined)}
    */
    if (prop === 'pbadslot') {
      if (typeof ortb2[prop] === 'string' && ortb2[prop]) (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(imp, 'ext.data.pbadslot', ortb2[prop]);
    } else if (prop === 'adserver') {
      /**
       * Copy GAM AdUnit and Name to imp
       */
      ['name', 'adslot'].forEach(function (name) {
        /** @type {(string|undefined)} */
        var value = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(ortb2, "adserver.".concat(name));
        if (typeof value === 'string' && value) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(imp, "ext.data.adserver.".concat(name.toLowerCase()), value);
          // copy GAM ad unit id as imp[].ext.dfp_ad_unit_code
          if (name === 'adslot') {
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(imp, "ext.dfp_ad_unit_code", value);
          }
        }
      });
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(imp, "ext.data.".concat(prop), ortb2[prop]);
    }
  });
}
function _addFloorFromFloorModule(impObj, bid) {
  var bidFloor = -1;
  // get lowest floor from floorModule
  if (typeof bid.getFloor === 'function' && !_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('pubmatic.disableFloors')) {
    [_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE].forEach(function (mediaType) {
      if (impObj.hasOwnProperty(mediaType)) {
        var sizesArray = [];
        if (mediaType === 'banner') {
          if (impObj[mediaType].w && impObj[mediaType].h) {
            sizesArray.push([impObj[mediaType].w, impObj[mediaType].h]);
          }
          if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(impObj[mediaType].format)) {
            impObj[mediaType].format.forEach(function (size) {
              return sizesArray.push([size.w, size.h]);
            });
          }
        }
        if (sizesArray.length === 0) {
          sizesArray.push('*');
        }
        sizesArray.forEach(function (size) {
          var floorInfo = bid.getFloor({
            currency: impObj.bidfloorcur,
            mediaType: mediaType,
            size: size
          });
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX, 'floor from floor module returned for mediatype:', mediaType, ' and size:', size, ' is: currency', floorInfo.currency, 'floor', floorInfo.floor);
          if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(floorInfo) === 'object' && floorInfo.currency === impObj.bidfloorcur && !isNaN(parseInt(floorInfo.floor))) {
            var mediaTypeFloor = parseFloat(floorInfo.floor);
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX, 'floor from floor module:', mediaTypeFloor, 'previous floor value', bidFloor, 'Min:', Math.min(mediaTypeFloor, bidFloor));
            if (bidFloor === -1) {
              bidFloor = mediaTypeFloor;
            } else {
              bidFloor = Math.min(mediaTypeFloor, bidFloor);
            }
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX, 'new floor value:', bidFloor);
          }
        });
      }
    });
  }
  // get highest from impObj.bidfllor and floor from floor module
  // as we are using Math.max, it is ok if we have not got any floor from floorModule, then value of bidFloor will be -1
  if (impObj.bidfloor) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX, 'floor from floor module:', bidFloor, 'impObj.bidfloor', impObj.bidfloor, 'Max:', Math.max(bidFloor, impObj.bidfloor));
    bidFloor = Math.max(bidFloor, impObj.bidfloor);
  }

  // assign value only if bidFloor is > 0
  impObj.bidfloor = !isNaN(bidFloor) && bidFloor > 0 ? bidFloor : UNDEFINED;
  (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX, 'new impObj.bidfloor value:', impObj.bidfloor);
}
function _handleEids(payload, validBidRequests) {
  var bidUserIdAsEids = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(validBidRequests, '0.userIdAsEids');
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bidUserIdAsEids) && bidUserIdAsEids.length > 0) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'user.eids', bidUserIdAsEids);
  }
}
function _checkMediaType(bid, newBid) {
  // Create a regex here to check the strings
  if (bid.ext && bid.ext['bidtype'] != undefined) {
    newBid.mediaType = MEDIATYPE[bid.ext.bidtype];
  } else {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logInfo)(LOG_WARN_PREFIX + 'bid.ext.bidtype does not exist, checking alternatively for mediaType');
    var adm = bid.adm;
    var admStr = '';
    var videoRegex = new RegExp(/VAST\s+version/);
    if (adm.indexOf('span class="PubAPIAd"') >= 0) {
      newBid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER;
    } else if ( true && videoRegex.test(adm)) {
      newBid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO;
    } else {
      try {
        admStr = JSON.parse(adm.replace(/\\/g, ''));
        if (admStr && admStr.native) {
          newBid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE;
        }
      } catch (e) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: Cannot parse native reponse for ad response: ' + adm);
      }
    }
  }
}
function _parseNativeResponse(bid, newBid) {
  if (bid.hasOwnProperty('adm')) {
    var adm = '';
    try {
      adm = JSON.parse(bid.adm.replace(/\\/g, ''));
    } catch (ex) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: Cannot parse native reponse for ad response: ' + newBid.adm);
      return;
    }
    newBid.native = {
      ortb: _objectSpread({}, adm.native)
    };
    newBid.mediaType = _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE;
    if (!newBid.width) {
      newBid.width = DEFAULT_WIDTH;
    }
    if (!newBid.height) {
      newBid.height = DEFAULT_HEIGHT;
    }
  }
}
function _blockedIabCategoriesValidation(payload, blockedIabCategories) {
  blockedIabCategories = blockedIabCategories.filter(function (category) {
    if (typeof category === 'string') {
      // only strings
      return true;
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'bcat: Each category should be a string, ignoring category: ' + category);
      return false;
    }
  }).map(function (category) {
    return category.trim();
  }) // trim all
  .filter(function (category, index, arr) {
    // more than 3 charaters length
    if (category.length > 3) {
      return arr.indexOf(category) === index; // unique value only
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'bcat: Each category should have a value of a length of more than 3 characters, ignoring category: ' + category);
    }
  });
  if (blockedIabCategories.length > 0) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'bcat: Selected: ', blockedIabCategories);
    payload.bcat = blockedIabCategories;
  }
}
function _allowedIabCategoriesValidation(payload, allowedIabCategories) {
  allowedIabCategories = allowedIabCategories.filter(function (category) {
    if (typeof category === 'string') {
      // returns only strings
      return true;
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'acat: Each category should be a string, ignoring category: ' + category);
      return false;
    }
  }).map(function (category) {
    return category.trim();
  }) // trim all categories
  .filter(function (category, index, arr) {
    return arr.indexOf(category) === index;
  }); // return unique values only

  if (allowedIabCategories.length > 0) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'acat: Selected: ', allowedIabCategories);
    payload.ext.acat = allowedIabCategories;
  }
}
function _assignRenderer(newBid, request) {
  var bidParams, context, adUnitCode;
  if (request.bidderRequest && request.bidderRequest.bids) {
    for (var bidderRequestBidsIndex = 0; bidderRequestBidsIndex < request.bidderRequest.bids.length; bidderRequestBidsIndex++) {
      if (request.bidderRequest.bids[bidderRequestBidsIndex].bidId === newBid.requestId) {
        bidParams = request.bidderRequest.bids[bidderRequestBidsIndex].params;
        if (true) {
          context = request.bidderRequest.bids[bidderRequestBidsIndex].mediaTypes[_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO].context;
        }
        adUnitCode = request.bidderRequest.bids[bidderRequestBidsIndex].adUnitCode;
      }
    }
    if (context && context === 'outstream' && bidParams && bidParams.outstreamAU && adUnitCode) {
      newBid.rendererCode = bidParams.outstreamAU;
      newBid.renderer = BB_RENDERER.newRenderer(newBid.rendererCode, adUnitCode);
    }
  }
}

/**
 * In case of adpod video context, assign prebiddealpriority to the dealtier property of adpod-video bid,
 * so that adpod module can set the hb_pb_cat_dur targetting key.
 * @param {*} newBid
 * @param {*} bid
 * @param {*} request
 * @returns
 */
function assignDealTier(newBid, bid, request) {
  var _bid$ext, _bid$ext2, _bid$ext2$video;
  if (!(bid !== null && bid !== void 0 && (_bid$ext = bid.ext) !== null && _bid$ext !== void 0 && _bid$ext.prebiddealpriority) || !true) return;
  var bidRequest = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.getBidRequest)(newBid.requestId, [request.bidderRequest]);
  var videoObj = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(bidRequest, 'mediaTypes.video');
  if ((videoObj === null || videoObj === void 0 ? void 0 : videoObj.context) != _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.ADPOD) return;
  var duration = (bid === null || bid === void 0 ? void 0 : (_bid$ext2 = bid.ext) === null || _bid$ext2 === void 0 ? void 0 : (_bid$ext2$video = _bid$ext2.video) === null || _bid$ext2$video === void 0 ? void 0 : _bid$ext2$video.duration) || (videoObj === null || videoObj === void 0 ? void 0 : videoObj.maxduration);
  // if (!duration) return;
  newBid.video = {
    context: _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.ADPOD,
    durationSeconds: duration,
    dealTier: bid.ext.prebiddealpriority
  };
}
function isNonEmptyArray(test) {
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(test) === true) {
    if (test.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Prepare meta object to pass as params
 * @param {*} br : bidResponse
 * @param {*} bid : bids
 */
function prepareMetaObject(br, bid, seat) {
  br.meta = {};
  if (bid.ext && bid.ext.dspid) {
    br.meta.networkId = bid.ext.dspid;
    br.meta.demandSource = bid.ext.dspid;
  }

  // NOTE: We will not recieve below fields from the translator response also not sure on what will be the key names for these in the response,
  // when we needed we can add it back.
  // New fields added, assignee fields name may change
  // if (bid.ext.networkName) br.meta.networkName = bid.ext.networkName;
  // if (bid.ext.advertiserName) br.meta.advertiserName = bid.ext.advertiserName;
  // if (bid.ext.agencyName) br.meta.agencyName = bid.ext.agencyName;
  // if (bid.ext.brandName) br.meta.brandName = bid.ext.brandName;
  if (bid.ext && bid.ext.dchain) {
    br.meta.dchain = bid.ext.dchain;
  }
  var advid = seat || bid.ext && bid.ext.advid;
  if (advid) {
    br.meta.advertiserId = advid;
    br.meta.agencyId = advid;
    br.meta.buyerId = advid;
  }
  if (bid.adomain && isNonEmptyArray(bid.adomain)) {
    br.meta.advertiserDomains = bid.adomain;
    br.meta.clickUrl = bid.adomain[0];
    br.meta.brandId = bid.adomain[0];
  }
  if (bid.cat && isNonEmptyArray(bid.cat)) {
    br.meta.secondaryCatIds = bid.cat;
    br.meta.primaryCatId = bid.cat[0];
  }
}

/**
 * returns, boolean value according to translator get request is enabled
 * and random value should be less than or equal to testGroupPercentage
 * @returns boolean
 */
function hasGetRequestEnabled() {
  if (!(_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('translatorGetRequest.enabled') === true)) return false;
  var randomValue100 = Math.ceil(Math.random() * 100);
  var testGroupPercentage = _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('translatorGetRequest.testGroupPercentage') || 0;
  return randomValue100 <= testGroupPercentage;
}
function getUniqueNumber(rangeEnd) {
  return Math.floor(Math.random() * rangeEnd) + 1;
}
var spec = {
  code: BIDDER_CODE,
  gvlid: 76,
  supportedMediaTypes: [_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO, _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE],
  aliases: [PUBMATIC_ALIAS],
  /**
  * Determines whether or not the given bid request is valid. Valid bid request must have placementId and hbid
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params) {
      if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(bid.params.publisherId)) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: publisherId is mandatory and cannot be numeric (wrap it in quotes in your config). Call to OpenBid will not be sent for ad unit: ' + JSON.stringify(bid));
        return false;
      }
      // video ad validation
      if ( true && bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO)) {
        // bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array
        var mediaTypesVideoMimes = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(bid.mediaTypes, 'video.mimes');
        var paramsVideoMimes = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"])(bid, 'params.video.mimes');
        if (isNonEmptyArray(mediaTypesVideoMimes) === false && isNonEmptyArray(paramsVideoMimes) === false) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Error: For video ads, bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array. Call to OpenBid will not be sent for ad unit:' + JSON.stringify(bid));
          return false;
        }
        if (!bid.mediaTypes[_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO].hasOwnProperty('context')) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("".concat(LOG_WARN_PREFIX, ": no context specified in bid. Rejecting bid: "), bid);
          return false;
        }
        if (bid.mediaTypes[_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO].context === 'outstream' && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(bid.params.outstreamAU) && !bid.hasOwnProperty('renderer') && !bid.mediaTypes[_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO].hasOwnProperty('renderer')) {
          // we are here since outstream ad-unit is provided without outstreamAU and renderer
          // so it is not a valid video ad-unit
          // but it may be valid banner or native ad-unit
          // so if mediaType banner or Native is present then  we will remove media-type video and return true

          if (bid.mediaTypes.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER) || bid.mediaTypes.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE)) {
            delete bid.mediaTypes[_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO];
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)("".concat(LOG_WARN_PREFIX, ": for \"outstream\" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting mediatype Video of bid: "), bid);
            return true;
          } else {
            (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)("".concat(LOG_WARN_PREFIX, ": for \"outstream\" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting bid: "), bid);
            return false;
          }
        }
      }
      return true;
    }
    return false;
  },
  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _bidderRequest, _bidderRequest$ortb, _bidderRequest$ortb$s, _commonFpd$device, _commonFpd$device3, _commonFpd$ext, _commonFpd$ext$prebid, _commonFpd$ext$prebid2, _commonFpd$ext$prebid3, _bidderRequest2;
    // convert Native ORTB definition to old-style prebid native definition
    // validBidRequests = convertOrtbRequestToProprietaryNative(validBidRequests);
    var refererInfo;
    if (bidderRequest && bidderRequest.refererInfo) {
      refererInfo = bidderRequest.refererInfo;
    }
    var conf = _initConf(refererInfo);
    var payload = _createOrtbTemplate(conf);
    var bidCurrency = '';
    var dctrArr = [];
    var bid;
    var blockedIabCategories = [];
    var allowedIabCategories = [];
    validBidRequests.forEach(function (originalBid) {
      var _bid$ortb2Imp, _bid$ortb2Imp$ext;
      bid = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.deepClone)(originalBid);
      bid.params.adSlot = bid.params.adSlot || '';
      _parseAdSlot(bid);
      if (bid.mediaTypes && bid.mediaTypes.hasOwnProperty('video') || bid.params.hasOwnProperty('video')) {
        // Nothing to do
      } else {
        // If we have a native mediaType configured alongside banner, its ok if the banner size is not set in width and height
        // The corresponding banner imp object will not be generated, but we still want the native object to be sent, hence the following check
        if (!(bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(_src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE)) && bid.params.width === 0 && bid.params.height === 0) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Skipping the non-standard adslot: ', bid.params.adSlot, JSON.stringify(bid));
          return;
        }
      }
      conf.pubId = conf.pubId || bid.params.publisherId;
      conf = _handleCustomParams(bid.params, conf);
      conf.transactionId = (_bid$ortb2Imp = bid.ortb2Imp) === null || _bid$ortb2Imp === void 0 ? void 0 : (_bid$ortb2Imp$ext = _bid$ortb2Imp.ext) === null || _bid$ortb2Imp$ext === void 0 ? void 0 : _bid$ortb2Imp$ext.tid;
      if (bidCurrency === '') {
        bidCurrency = bid.params.currency || UNDEFINED;
      } else if (bid.params.hasOwnProperty('currency') && bidCurrency !== bid.params.currency) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logWarn)(LOG_WARN_PREFIX + 'Currency specifier ignored. Only one currency permitted.');
      }
      bid.params.currency = bidCurrency;
      // check if dctr is added to more than 1 adunit
      if (bid.params.hasOwnProperty('dctr') && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isStr)(bid.params.dctr)) {
        dctrArr.push(bid.params.dctr);
      }
      if (bid.params.hasOwnProperty('bcat') && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bid.params.bcat)) {
        blockedIabCategories = blockedIabCategories.concat(bid.params.bcat);
      }
      if (bid.params.hasOwnProperty('acat') && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(bid.params.acat)) {
        allowedIabCategories = allowedIabCategories.concat(bid.params.acat);
      }
      var impObj = _createImpressionObject(bid);
      if (impObj) {
        payload.imp.push(impObj);
      }
    });
    if (payload.imp.length == 0) {
      return;
    }
    payload.site.publisher.id = conf.pubId.trim();
    publisherId = conf.pubId.trim();
    payload.ext.wrapper = {};
    payload.ext.wrapper.profile = parseInt(conf.profId) || UNDEFINED;
    payload.ext.wrapper.version = parseInt(conf.verId) || UNDEFINED;
    // TODO: fix auctionId leak: https://github.com/prebid/Prebid.js/issues/9781
    payload.ext.wrapper.wiid = conf.wiid || bidderRequest.auctionId;
    // eslint-disable-next-line no-undef
    payload.ext.wrapper.wv = "prebid_prebid_8.0.0";
    payload.ext.wrapper.transactionId = conf.transactionId;
    payload.ext.wrapper.wp = 'pbjs';
    var allowAlternateBidder = bidderRequest ? _src_bidderSettings_js__WEBPACK_IMPORTED_MODULE_9__.bidderSettings.get(bidderRequest.bidderCode, 'allowAlternateBidderCodes') : undefined;
    if (allowAlternateBidder !== undefined) {
      payload.ext.marketplace = {};
      if (bidderRequest && allowAlternateBidder == true) {
        var allowedBiddersList = _src_bidderSettings_js__WEBPACK_IMPORTED_MODULE_9__.bidderSettings.get(bidderRequest.bidderCode, 'allowedAlternateBidderCodes');
        if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(allowedBiddersList)) {
          allowedBiddersList = allowedBiddersList.map(function (val) {
            return val.trim().toLowerCase();
          }).filter(function (val) {
            return !!val;
          }).filter(_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques);
          biddersList = allowedBiddersList.includes('*') ? allBiddersList : [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_10__["default"])(biddersList), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_10__["default"])(allowedBiddersList));
        } else {
          biddersList = allBiddersList;
        }
      }
      payload.ext.marketplace.allowedbidders = biddersList.filter(_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.uniques);
    }
    if (bid.bidViewability) {
      vsgObj = getAndParseFromLocalStorage('viewability-data');
      removeViewTimeForZeroValue(vsgObj[vsgDomain]);
      payload.ext.bidViewability = {
        adDomain: vsgObj[vsgDomain]
      };
    }
    payload.user.gender = conf.gender ? conf.gender.trim() : UNDEFINED;
    payload.user.geo = {};
    // TODO: fix lat and long to only come from request object, not params
    payload.user.geo.lat = _parseSlotParam('lat', 0);
    payload.user.geo.lon = _parseSlotParam('lon', 0);
    payload.user.yob = _parseSlotParam('yob', conf.yob);
    payload.device.geo = payload.user.geo;
    payload.site.page = conf.kadpageurl.trim() || payload.site.page.trim();
    payload.site.domain = _getDomainFromURL(payload.site.page);

    // add the content object from config in request
    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('content')) === 'object') {
      payload.site.content = _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('content');
    }

    // merge the device from config.getConfig('device')
    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('device')) === 'object') {
      payload.device = Object.assign(payload.device, _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('device'));
    }

    // update device.language to ISO-639-1-alpha-2 (2 character language)
    payload.device.language = payload.device.language && payload.device.language.split('-')[0];

    // passing transactionId in source.tid
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'source.tid', (_bidderRequest = bidderRequest) === null || _bidderRequest === void 0 ? void 0 : (_bidderRequest$ortb = _bidderRequest.ortb2) === null || _bidderRequest$ortb === void 0 ? void 0 : (_bidderRequest$ortb$s = _bidderRequest$ortb.source) === null || _bidderRequest$ortb$s === void 0 ? void 0 : _bidderRequest$ortb$s.tid);

    // test bids
    if (window.location.href.indexOf('pubmaticTest=true') !== -1) {
      payload.test = 1;
    }

    // adding schain object
    if (validBidRequests[0].schain) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'source.ext.schain', validBidRequests[0].schain);
    }

    // Attaching GDPR Consent Params
    if (bidderRequest && bidderRequest.gdprConsent) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'regs.ext.gdpr', bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
    }

    // CCPA
    if (bidderRequest && bidderRequest.uspConsent) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'regs.ext.us_privacy', bidderRequest.uspConsent);
    }

    // coppa compliance
    if (_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('coppa') === true) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_7__.dset)(payload, 'regs.coppa', 1);
    }
    _handleEids(payload, validBidRequests);

    // First Party Data
    var commonFpd = bidderRequest && bidderRequest.ortb2 || {};
    if (commonFpd.site) {
      // Saving page, domain & ref property from payload before getting replaced by fpd modules.
      var _payload$site = payload.site,
        page = _payload$site.page,
        domain = _payload$site.domain,
        ref = _payload$site.ref;
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(payload, {
        site: commonFpd.site
      });
      // Replace original values for page, domain & ref
      payload.site.page = page;
      payload.site.domain = domain;
      payload.site.ref = ref;
    }
    if (commonFpd.user) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(payload, {
        user: commonFpd.user
      });
    }
    if (commonFpd.bcat) {
      blockedIabCategories = blockedIabCategories.concat(commonFpd.bcat);
    }
    // check if fpd ortb2 contains device property with sua object
    if ((_commonFpd$device = commonFpd.device) !== null && _commonFpd$device !== void 0 && _commonFpd$device.sua) {
      var _commonFpd$device2;
      payload.device.sua = (_commonFpd$device2 = commonFpd.device) === null || _commonFpd$device2 === void 0 ? void 0 : _commonFpd$device2.sua;
    }

    // check if fpd ortb2 contains device property with sua object
    if ((_commonFpd$device3 = commonFpd.device) !== null && _commonFpd$device3 !== void 0 && _commonFpd$device3.sua) {
      payload.device.sua = commonFpd.device.sua;
    }
    if ((_commonFpd$ext = commonFpd.ext) !== null && _commonFpd$ext !== void 0 && (_commonFpd$ext$prebid = _commonFpd$ext.prebid) !== null && _commonFpd$ext$prebid !== void 0 && (_commonFpd$ext$prebid2 = _commonFpd$ext$prebid.bidderparams) !== null && _commonFpd$ext$prebid2 !== void 0 && (_commonFpd$ext$prebid3 = _commonFpd$ext$prebid2[bidderRequest.bidderCode]) !== null && _commonFpd$ext$prebid3 !== void 0 && _commonFpd$ext$prebid3.acat) {
      var acatParams = commonFpd.ext.prebid.bidderparams[bidderRequest.bidderCode].acat;
      _allowedIabCategoriesValidation(payload, acatParams);
    } else if (allowedIabCategories.length) {
      _allowedIabCategoriesValidation(payload, allowedIabCategories);
    }
    _blockedIabCategoriesValidation(payload, blockedIabCategories);

    // Check if bidderRequest has timeout property if present send timeout as tmax value to translator request
    // bidderRequest has timeout property if publisher sets during calling requestBids function from page
    // if not bidderRequest contains global value set by Prebid
    if ((_bidderRequest2 = bidderRequest) !== null && _bidderRequest2 !== void 0 && _bidderRequest2.timeout) {
      payload.tmax = bidderRequest.timeout;
    } else {
      var _window, _window$PWT, _window$PWT$versionDe;
      payload.tmax = (_window = window) === null || _window === void 0 ? void 0 : (_window$PWT = _window.PWT) === null || _window$PWT === void 0 ? void 0 : (_window$PWT$versionDe = _window$PWT.versionDetails) === null || _window$PWT$versionDe === void 0 ? void 0 : _window$PWT$versionDe.timeout;
    }

    // Sending epoch timestamp in request.ext object
    payload.ext.epoch = new Date().getTime();

    // Note: Do not move this block up
    // if site object is set in Prebid config then we need to copy required fields from site into app and unset the site object
    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('app')) === 'object') {
      payload.app = _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('app');
      // not copying domain from site as it is a derived value from page
      payload.app.publisher = payload.site.publisher;
      payload.app.ext = payload.site.ext || UNDEFINED;
      // We will also need to pass content object in app.content if app object is also set into the config;
      // BUT do not use content object from config if content object is present in app as app.content
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(payload.app.content) !== 'object') {
        payload.app.content = payload.site.content || UNDEFINED;
      }
      delete payload.site;
    }
    var correlator = getUniqueNumber(1000);
    var url = ENDPOINT + '?source=ow-client&correlator=' + correlator;
    var serverRequest = {
      method: 'POST',
      url: url,
      data: JSON.stringify(payload),
      bidderRequest: bidderRequest
    };

    // Allow translator request to execute it as GET Methoid if flag is set.
    if (hasGetRequestEnabled()) {
      var _ref;
      // For Auction End Handler
      if (bidderRequest) {
        var _bidderRequest3, _bidderRequest3$bids, _bidderRequest4;
        bidderRequest = bidderRequest || {};
        bidderRequest.nwMonitor = {};
        bidderRequest.nwMonitor.reqMethod = 'POST';
        bidderRequest.nwMonitor.correlator = correlator;
        bidderRequest.nwMonitor.requestUrlPayloadLength = url.length + JSON.stringify(payload).length;
        // For Timeout handler
        if ((_bidderRequest3 = bidderRequest) !== null && _bidderRequest3 !== void 0 && (_bidderRequest3$bids = _bidderRequest3.bids) !== null && _bidderRequest3$bids !== void 0 && _bidderRequest3$bids.length && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)((_bidderRequest4 = bidderRequest) === null || _bidderRequest4 === void 0 ? void 0 : _bidderRequest4.bids)) {
          bidderRequest.bids.forEach(function (bid) {
            return bid.correlator = correlator;
          });
        }
      }
      var maxUrlLength = _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('translatorGetRequest.maxUrlLength') || 63000;
      var configuredEndPoint = _src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('translatorGetRequest.endPoint') || ENDPOINT;
      var urlEncodedPayloadStr = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.parseQueryStringParameters)({
        'source': 'ow-client',
        'payload': JSON.stringify(payload),
        'correlator': correlator
      });
      if (((_ref = configuredEndPoint + '?' + urlEncodedPayloadStr) === null || _ref === void 0 ? void 0 : _ref.length) <= maxUrlLength) {
        serverRequest = {
          method: 'GET',
          url: configuredEndPoint,
          data: urlEncodedPayloadStr,
          bidderRequest: bidderRequest,
          payloadStr: JSON.stringify(payload)
        };
        bidderRequest.nwMonitor.reqMethod = 'GET';
        bidderRequest.nwMonitor.requestUrlPayloadLength = configuredEndPoint.length + '?'.length + urlEncodedPayloadStr.length;
      }
    }
    return serverRequest;
  },
  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} response A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(response, request) {
    var bidResponses = [];
    var respCur = DEFAULT_CURRENCY;
    // In case of Translator GET request, will copy the actual json data from payloadStr to data.
    if (request !== null && request !== void 0 && request.payloadStr) request.data = request.payloadStr;
    var parsedRequest = JSON.parse(request.data);
    var parsedReferrer = parsedRequest.site && parsedRequest.site.ref ? parsedRequest.site.ref : '';
    try {
      var requestData = JSON.parse(request.data);
      if (response.body && response.body.seatbid && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(response.body.seatbid)) {
        bidResponses = [];
        // Supporting multiple bid responses for same adSize
        respCur = response.body.cur || respCur;
        response.body.seatbid.forEach(function (seatbidder) {
          seatbidder.bid && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(seatbidder.bid) && seatbidder.bid.forEach(function (bid) {
            var newBid = {
              requestId: bid.impid,
              cpm: parseFloat((bid.price || 0).toFixed(2)),
              width: bid.w,
              height: bid.h,
              sspID: bid.id || '',
              creativeId: bid.crid || bid.id,
              dealId: bid.dealid,
              currency: respCur,
              netRevenue: NET_REVENUE,
              ttl: 300,
              referrer: parsedReferrer,
              ad: bid.adm,
              pm_seat: seatbidder.seat || null,
              pm_dspid: bid.ext && bid.ext.dspid ? bid.ext.dspid : null,
              partnerImpId: bid.id || '' // partner impression Id
            };

            if (parsedRequest.imp && parsedRequest.imp.length > 0) {
              parsedRequest.imp.forEach(function (req) {
                if (bid.impid === req.id) {
                  _checkMediaType(bid, newBid);
                  switch (newBid.mediaType) {
                    case _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.BANNER:
                      break;
                    case  true && _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.VIDEO:
                      newBid.width = bid.hasOwnProperty('w') ? bid.w : req.video.w;
                      newBid.height = bid.hasOwnProperty('h') ? bid.h : req.video.h;
                      newBid.vastXml = bid.adm;
                      _assignRenderer(newBid, request);
                      assignDealTier(newBid, bid, request);
                      break;
                    case _src_mediaTypes_js__WEBPACK_IMPORTED_MODULE_3__.NATIVE:
                      _parseNativeResponse(bid, newBid);
                      break;
                  }
                }
              });
            }
            if (newBid['dealId']) {
              newBid['dealChannel'] = 'PMP';
            }
            if (newBid['dealId'] && bid.ext && bid.ext.deal_channel) {
              newBid['dealChannel'] = dealChannelValues[bid.ext.deal_channel] || null;
            }
            prepareMetaObject(newBid, bid, seatbidder.seat);

            // START of Experimental change
            if (response.body.ext) {
              newBid['ext'] = response.body.ext;
            }
            // END of Experimental change

            // adserverTargeting
            if (seatbidder.ext && seatbidder.ext.buyid) {
              newBid.adserverTargeting = {
                'hb_buyid_pubmatic': seatbidder.ext.buyid
              };
            }

            // if from the server-response the bid.ext.marketplace is set then
            //    submit the bid to Prebid as marketplace name
            if (bid.ext && !!bid.ext.marketplace) {
              newBid.bidderCode = bid.ext.marketplace;
            }
            bidResponses.push(newBid);
          });
        });
      }
      // adding zero bid for every no-bid
      if (requestData && requestData.imp && requestData.imp.length > 0) {
        var requestIds = requestData.imp.map(function (reqData) {
          return reqData.id;
        });
        var uniqueImpIds = bidResponses.map(function (bid) {
          return bid.requestId;
        }).filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });
        var nonBidIds = requestIds.filter(function (x) {
          return !uniqueImpIds.includes(x);
        });
        nonBidIds.forEach(function (nonBidId) {
          requestData.imp.forEach(function (impData) {
            if (impData.id === nonBidId) {
              bidResponses.push({
                requestId: impData.id,
                width: 0,
                height: 0,
                ttl: 300,
                ad: '',
                creativeId: 0,
                netRevenue: NET_REVENUE,
                cpm: 0,
                currency: respCur,
                referrer: parsedReferrer
              });
            }
          });
        });
      }
    } catch (error) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.logError)(error);
    }
    return bidResponses;
  },
  /**
   * Register User Sync.
   */
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, uspConsent) {
    var syncurl = '' + publisherId;

    // Attaching GDPR Consent Params in UserSync url
    if (gdprConsent) {
      syncurl += '&gdpr=' + (gdprConsent.gdprApplies ? 1 : 0);
      syncurl += '&gdpr_consent=' + encodeURIComponent(gdprConsent.consentString || '');
    }

    // CCPA
    if (uspConsent) {
      syncurl += '&us_privacy=' + encodeURIComponent(uspConsent);
    }

    // coppa compliance
    if (_src_config_js__WEBPACK_IMPORTED_MODULE_8__.config.getConfig('coppa') === true) {
      syncurl += '&coppa=1';
    }
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USER_SYNC_URL_IFRAME + syncurl
      }];
    } else {
      return [{
        type: 'image',
        url: USER_SYNC_URL_IMAGE + syncurl
      }];
    }
  },
  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */

  transformBidParams: function transformBidParams(params, isOpenRtb, adUnit, bidRequests) {
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.convertTypes)({
      'publisherId': 'string',
      'adSlot': 'string'
    }, params);
  }
};
(0,_src_adapters_bidderFactory_js__WEBPACK_IMPORTED_MODULE_11__.registerBidder)(spec);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_12__.registerModule)('pubmaticBidAdapter');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/pubmaticBidAdapter.js"));
/******/ }
]);
//# sourceMappingURL=pubmaticBidAdapter.js.map
"use strict";
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["sharedIdSystem"],{

/***/ "./modules/sharedIdSystem.js":
/*!***********************************!*\
  !*** ./modules/sharedIdSystem.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports storage, sharedIdSystemSubmodule */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/hook.js */ "./src/hook.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/consentHandler.js */ "./src/consentHandler.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _libraries_domainOverrideToRootDomain_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../libraries/domainOverrideToRootDomain/index.js */ "./libraries/domainOverrideToRootDomain/index.js");


/**
 * This module adds SharedId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/sharedIdSystem
 * @requires module:modules/userId
 */








var storage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_0__.getStorageManager)({
  moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_1__.MODULE_TYPE_UID,
  moduleName: 'pubCommonId'
});
var COOKIE = 'cookie';
var LOCAL_STORAGE = 'html5';
var OPTOUT_NAME = '_pubcid_optout';
var PUB_COMMON_ID = 'PublisherCommonId';

/**
 * Read a value either from cookie or local storage
 * @param {string} name Name of the item
 * @param {string} type storage type override
 * @returns {string|null} a string if item exists
 */
function readValue(name, type) {
  if (type === COOKIE) {
    return storage.getCookie(name);
  } else if (type === LOCAL_STORAGE) {
    if (storage.hasLocalStorage()) {
      var expValue = storage.getDataFromLocalStorage("".concat(name, "_exp"));
      if (!expValue) {
        return storage.getDataFromLocalStorage(name);
      } else if (new Date(expValue).getTime() - Date.now() > 0) {
        return storage.getDataFromLocalStorage(name);
      }
    }
  }
}
function getIdCallback(pubcid, pixelUrl) {
  return function (callback, getStoredId) {
    if (pixelUrl) {
      queuePixelCallback(pixelUrl, pubcid, function () {
        callback(getStoredId() || pubcid);
      })();
    } else {
      callback(pubcid);
    }
  };
}
function queuePixelCallback(pixelUrl) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  if (!pixelUrl) {
    return;
  }

  // Use pubcid as a cache buster
  var urlInfo = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseUrl)(pixelUrl);
  urlInfo.search.id = encodeURIComponent('pubcid:' + id);
  var targetUrl = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.buildUrl)(urlInfo);
  return function () {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.triggerPixel)(targetUrl, callback);
  };
}
function hasOptedOut() {
  return !!(storage.cookiesAreEnabled() && readValue(OPTOUT_NAME, COOKIE) || storage.hasLocalStorage() && readValue(OPTOUT_NAME, LOCAL_STORAGE));
}
var sharedIdSystemSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'sharedId',
  aliasName: 'pubCommonId',
  gvlid: _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_3__.VENDORLESS_GVLID,
  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @param {SubmoduleConfig} config
   * @returns {{pubcid:string}}
   */
  decode: function decode(value, config) {
    if (hasOptedOut()) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('PubCommonId decode: Has opted-out');
      return undefined;
    }
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)(' Decoded value PubCommonId ' + value);
    var idObj = {
      'pubcid': value
    };
    return idObj;
  },
  /**
   * performs action to obtain id
   * @function
   * @param {SubmoduleConfig} [config] Config object with params and storage properties
   * @param {Object} consentData
   * @param {string} storedId Existing pubcommon id
   * @returns {IdResponse}
   */
  getId: function getId() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var consentData = arguments.length > 1 ? arguments[1] : undefined;
    var storedId = arguments.length > 2 ? arguments[2] : undefined;
    if (hasOptedOut()) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('PubCommonId: Has opted-out');
      return;
    }
    var coppa = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__.coppaDataHandler.getCoppa();
    if (coppa) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
      return;
    }
    var _config$params = config.params;
    _config$params = _config$params === void 0 ? {} : _config$params;
    var _config$params$create = _config$params.create,
      create = _config$params$create === void 0 ? true : _config$params$create,
      pixelUrl = _config$params.pixelUrl;
    var newId = storedId;
    if (!newId) {
      try {
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__["default"])(window[PUB_COMMON_ID]) === 'object') {
          // If the page includes its own pubcid module, then save a copy of id.
          newId = window[PUB_COMMON_ID].getId();
        }
      } catch (e) {}
      if (!newId) newId = create && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasDeviceAccess)() ? (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.generateUUID)() : undefined;
    }
    return {
      id: newId,
      callback: getIdCallback(newId, pixelUrl)
    };
  },
  /**
   * performs action to extend an id.  There are generally two ways to extend the expiration time
   * of stored id: using pixelUrl or return the id and let main user id module write it again with
   * the new expiration time.
   *
   * PixelUrl, if defined, should point back to a first party domain endpoint.  On the server
   * side, there is either a plugin, or customized logic to read and write back the pubcid cookie.
   * The extendId function itself should return only the callback, and not the id itself to avoid
   * having the script-side overwriting server-side.  This applies to both pubcid and sharedid.
   *
   * On the other hand, if there is no pixelUrl, then the extendId should return storedId so that
   * its expiration time is updated.
   *
   * @function
   * @param {SubmoduleParams} [config]
   * @param {ConsentData|undefined} consentData
   * @param {Object} storedId existing id
   * @returns {IdResponse|undefined}
   */
  extendId: function extendId() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var consentData = arguments.length > 1 ? arguments[1] : undefined;
    var storedId = arguments.length > 2 ? arguments[2] : undefined;
    if (hasOptedOut()) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('PubCommonId: Has opted-out');
      return {
        id: undefined
      };
    }
    var coppa = _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_4__.coppaDataHandler.getCoppa();
    if (coppa) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
      return;
    }
    var _config$params2 = config.params;
    _config$params2 = _config$params2 === void 0 ? {} : _config$params2;
    var _config$params2$exten = _config$params2.extend,
      extend = _config$params2$exten === void 0 ? false : _config$params2$exten,
      pixelUrl = _config$params2.pixelUrl;
    if (extend) {
      if (pixelUrl) {
        var callback = queuePixelCallback(pixelUrl, storedId);
        return {
          callback: callback
        };
      } else {
        return {
          id: storedId
        };
      }
    }
  },
  domainOverride: (0,_libraries_domainOverrideToRootDomain_index_js__WEBPACK_IMPORTED_MODULE_6__.domainOverrideToRootDomain)(storage, 'sharedId')
};
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_7__.submodule)('userId', sharedIdSystemSubmodule);
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_8__.registerModule)('sharedIdSystem');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["domainOverrideToRootDomain"], function() { return __webpack_exec__("./modules/sharedIdSystem.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sharedIdSystem.js.map
(self["owpbjsChunk"] = self["owpbjsChunk"] || []).push([["userId"],{

/***/ "./modules/userId/eids.js":
/*!********************************!*\
  !*** ./modules/userId/eids.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "USER_IDS_CONFIG": function() { return /* binding */ USER_IDS_CONFIG; },
/* harmony export */   "buildEidPermissions": function() { return /* binding */ buildEidPermissions; },
/* harmony export */   "createEidsArray": function() { return /* binding */ createEidsArray; }
/* harmony export */ });
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/utils.js */ "./node_modules/dlv/index.js");


// Each user-id sub-module is expected to mention respective config here
var USER_IDS_CONFIG = {
  // key-name : {config}

  // GrowthCode
  'growthCodeId': {
    getValue: function getValue(data) {
      return data.gc_id;
    },
    source: 'growthcode.io',
    atype: 1,
    getUidExt: function getUidExt(data) {
      var extendedData = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.pick)(data, ['h1', 'h2', 'h3']);
      if (Object.keys(extendedData).length) {
        return extendedData;
      }
    }
  },
  // utiq
  'utiq': {
    source: 'utiq.com',
    atype: 1,
    getValue: function getValue(data) {
      return data;
    }
  },
  // intentIqId
  'intentIqId': {
    source: 'intentiq.com',
    atype: 1,
    getValue: function getValue(data) {
      return data.RESULT;
    }
  },
  // naveggId
  'naveggId': {
    source: 'navegg.com',
    atype: 1
  },
  // pairId
  'pairId': {
    source: 'google.com',
    atype: 571187
  },
  // justId
  'justId': {
    source: 'justtag.com',
    atype: 1
  },
  // pubCommonId
  'pubcid': {
    source: 'pubcid.org',
    atype: 1
  },
  // unifiedId
  'tdid': {
    source: 'adserver.org',
    atype: 1,
    getUidExt: function getUidExt() {
      return {
        rtiPartner: 'TDID'
      };
    }
  },
  // id5Id
  'id5id': {
    getValue: function getValue(data) {
      return data.uid;
    },
    source: 'id5-sync.com',
    atype: 1,
    getUidExt: function getUidExt(data) {
      if (data.ext) {
        return data.ext;
      }
    }
  },
  // ftrack
  'ftrackId': {
    source: 'flashtalking.com',
    atype: 1,
    getValue: function getValue(data) {
      var value = '';
      if (data && data.ext && data.ext.DeviceID) {
        value = data.ext.DeviceID;
      }
      return value;
    },
    getUidExt: function getUidExt(data) {
      return data && data.ext;
    }
  },
  // parrableId
  'parrableId': {
    source: 'parrable.com',
    atype: 1,
    getValue: function getValue(parrableId) {
      if (parrableId.eid) {
        return parrableId.eid;
      }
      if (parrableId.ccpaOptout) {
        // If the EID was suppressed due to a non consenting ccpa optout then
        // we still wish to provide this as a reason to the adapters
        return '';
      }
      return null;
    },
    getUidExt: function getUidExt(parrableId) {
      var extendedData = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.pick)(parrableId, ['ibaOptout', 'ccpaOptout']);
      if (Object.keys(extendedData).length) {
        return extendedData;
      }
    }
  },
  // identityLink
  'idl_env': {
    source: 'liveramp.com',
    atype: 3
  },
  // liveIntentId
  'lipb': {
    getValue: function getValue(data) {
      return data.lipbid;
    },
    source: 'liveintent.com',
    atype: 3,
    getEidExt: function getEidExt(data) {
      if (Array.isArray(data.segments) && data.segments.length) {
        return {
          segments: data.segments
        };
      }
    }
  },
  // bidswitchId
  'bidswitch': {
    source: 'bidswitch.net',
    atype: 3,
    getValue: function getValue(data) {
      return data.id;
    }
  },
  // medianetId
  'medianet': {
    source: 'media.net',
    atype: 3,
    getValue: function getValue(data) {
      return data.id;
    }
  },
  // britepoolId
  'britepoolid': {
    source: 'britepool.com',
    atype: 3
  },
  // dmdId
  'dmdId': {
    source: 'hcn.health',
    atype: 3
  },
  // lotamePanoramaId
  lotamePanoramaId: {
    source: 'crwdcntrl.net',
    atype: 1
  },
  // criteo
  'criteoId': {
    source: 'criteo.com',
    atype: 1
  },
  // merkleId
  'merkleId': {
    atype: 3,
    getSource: function getSource(data) {
      var _data$ext;
      if (data !== null && data !== void 0 && (_data$ext = data.ext) !== null && _data$ext !== void 0 && _data$ext.ssp) {
        return "".concat(data.ext.ssp, ".merkleinc.com");
      }
      return 'merkleinc.com';
    },
    getValue: function getValue(data) {
      return data.id;
    },
    getUidExt: function getUidExt(data) {
      if (data.keyID) {
        return {
          keyID: data.keyID
        };
      }
      if (data.ext) {
        return data.ext;
      }
    }
  },
  // NetId
  'netId': {
    source: 'netid.de',
    atype: 1
  },
  // zeotapIdPlus
  'IDP': {
    source: 'zeotap.com',
    atype: 1,
    getValue: function getValue(data) {
      return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(data) ? data.id : data;
    }
  },
  // hadronId
  'hadronId': {
    source: 'audigent.com',
    atype: 1
  },
  // quantcastId
  'quantcastId': {
    source: 'quantcast.com',
    atype: 1
  },
  // IDx
  'idx': {
    source: 'idx.lat',
    atype: 1
  },
  // Verizon Media ConnectID
  'connectid': {
    source: 'verizonmedia.com',
    atype: 3
  },
  // Neustar Fabrick
  'fabrickId': {
    source: 'neustar.biz',
    atype: 1
  },
  // MediaWallah OpenLink
  'mwOpenLinkId': {
    source: 'mediawallahscript.com',
    atype: 1
  },
  'tapadId': {
    source: 'tapad.com',
    atype: 1
  },
  // Novatiq Snowflake
  'novatiq': {
    getValue: function getValue(data) {
      if (data.snowflake.id === undefined) {
        return data.snowflake;
      }
      return data.snowflake.id;
    },
    source: 'novatiq.com'
  },
  'uid2': {
    source: 'uidapi.com',
    atype: 3,
    getValue: function getValue(data) {
      return data.id;
    }
  },
  'euid': {
    source: 'euid.eu',
    atype: 3,
    getValue: function getValue(data) {
      return data.id;
    }
  },
  'deepintentId': {
    source: 'deepintent.com',
    atype: 3
  },
  // Admixer Id
  'admixerId': {
    source: 'admixer.net',
    atype: 3
  },
  // Adtelligent Id
  'adtelligentId': {
    source: 'adtelligent.com',
    atype: 3
  },
  amxId: {
    source: 'amxdt.net',
    atype: 1
  },
  'publinkId': {
    source: 'epsilon.com',
    atype: 3
  },
  'kpuid': {
    source: 'kpuid.com',
    atype: 3
  },
  'imppid': {
    source: 'ppid.intimatemerger.com',
    atype: 1
  },
  'imuid': {
    source: 'intimatemerger.com',
    atype: 1
  },
  // Yahoo ConnectID
  'connectId': {
    source: 'yahoo.com',
    atype: 3
  },
  // Adquery ID
  'qid': {
    source: 'adquery.io',
    atype: 1
  },
  // DAC ID
  'dacId': {
    source: 'impact-ad.jp',
    atype: 1
  },
  // 33across ID
  '33acrossId': {
    source: '33across.com',
    atype: 1,
    getValue: function getValue(data) {
      return data.envelope;
    }
  },
  // tncId
  'tncid': {
    source: 'thenewco.it',
    atype: 3
  },
  // Gravito MP ID
  'gravitompId': {
    source: 'gravito.net',
    atype: 1
  },
  // czechAdId
  'czechAdId': {
    source: 'czechadid.cz',
    atype: 1
  },
  // OneKey Data
  'oneKeyData': {
    getValue: function getValue(data) {
      if (data && Array.isArray(data.identifiers) && data.identifiers[0]) {
        return data.identifiers[0].value;
      }
    },
    source: 'paf',
    atype: 1,
    getEidExt: function getEidExt(data) {
      if (data && data.preferences) {
        return {
          preferences: data.preferences
        };
      }
    },
    getUidExt: function getUidExt(data) {
      if (data && Array.isArray(data.identifiers) && data.identifiers[0]) {
        var id = data.identifiers[0];
        return {
          version: id.version,
          type: id.type,
          source: id.source
        };
      }
    }
  }
};

// this function will create an eid object for the given UserId sub-module
function createEidObject(userIdData, subModuleKey) {
  var conf = USER_IDS_CONFIG[subModuleKey];
  if (conf && userIdData) {
    var eid = {};
    eid.source = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isFn)(conf['getSource']) ? conf['getSource'](userIdData) : conf['source'];
    var value = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isFn)(conf['getValue']) ? conf['getValue'](userIdData) : userIdData;
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isStr)(value)) {
      var uid = {
        id: value,
        atype: conf['atype']
      };
      // getUidExt
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isFn)(conf['getUidExt'])) {
        var uidExt = conf['getUidExt'](userIdData);
        if (uidExt) {
          uid.ext = uidExt;
        }
      }
      eid.uids = [uid];
      // getEidExt
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isFn)(conf['getEidExt'])) {
        var eidExt = conf['getEidExt'](userIdData);
        if (eidExt) {
          eid.ext = eidExt;
        }
      }
      return eid;
    }
  }
  return null;
}

// this function will generate eids array for all available IDs in bidRequest.userId
// this function will be called by userId module
// if any adapter does not want any particular userId to be passed then adapter can use Array.filter(e => e.source != 'tdid')
function createEidsArray(bidRequestUserId) {
  var eids = [];
  var _loop = function _loop(subModuleKey) {
    if (bidRequestUserId.hasOwnProperty(subModuleKey)) {
      if (subModuleKey === 'pubProvidedId') {
        eids = eids.concat(bidRequestUserId['pubProvidedId']);
      } else if (Array.isArray(bidRequestUserId[subModuleKey])) {
        bidRequestUserId[subModuleKey].forEach(function (config, index, arr) {
          var eid = createEidObject(config, subModuleKey);
          if (eid) {
            eids.push(eid);
          }
        });
      } else {
        var eid = createEidObject(bidRequestUserId[subModuleKey], subModuleKey);
        if (eid) {
          eids.push(eid);
        }
      }
    }
  };
  for (var subModuleKey in bidRequestUserId) {
    _loop(subModuleKey);
  }
  return eids;
}

/**
 * @param {SubmoduleContainer[]} submodules
 */
function buildEidPermissions(submodules) {
  var eidPermissions = [];
  submodules.filter(function (i) {
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(i.idObj) && Object.keys(i.idObj).length;
  }).forEach(function (i) {
    Object.keys(i.idObj).forEach(function (key) {
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"])(i, 'config.bidders') && Array.isArray(i.config.bidders) && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"])(USER_IDS_CONFIG, key + '.source')) {
        eidPermissions.push({
          source: USER_IDS_CONFIG[key].source,
          bidders: i.config.bidders
        });
      }
    });
  });
  return eidPermissions;
}

/***/ }),

/***/ "./modules/userId/index.js":
/*!*********************************!*\
  !*** ./modules/userId/index.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony exports PBJS_USER_ID_OPTOUT_NAME, coreStorage, dep, syncDelay, auctionDelay, setSubmoduleRegistry, setStoredValue, deleteStoredValue, setStoredConsentData, requestBidsHook, getRawPDString, updateModuleParams, reTriggerPartnerCallsWithEmailHashes, reTriggerScriptBasedAPICalls, requestDataDeletion, attachIdSystem, init, setOrtbUserExtEids */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../src/prebidGlobal.js */ "./src/prebidGlobal.js");
/* harmony import */ var _src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/polyfill.js */ "./src/polyfill.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../src/config.js */ "./src/config.js");
/* harmony import */ var _src_events_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../src/events.js */ "./src/events.js");
/* harmony import */ var _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../src/adapterManager.js */ "./src/adapterManager.js");
/* harmony import */ var _src_constants_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../src/constants.json */ "./src/constants.json");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../src/hook.js */ "./src/hook.js");
/* harmony import */ var _eids_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./eids.js */ "./modules/userId/eids.js");
/* harmony import */ var _src_storageManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/storageManager.js */ "./src/storageManager.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/utils.js */ "./src/utils.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../src/utils.js */ "./node_modules/dlv/index.js");
/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../src/utils.js */ "./node_modules/dset/dist/index.mjs");
/* harmony import */ var crypto_js_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js/md5.js */ "./node_modules/crypto-js/md5.js");
/* harmony import */ var crypto_js_md5_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_md5_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js_sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-js/sha1.js */ "./node_modules/crypto-js/sha1.js");
/* harmony import */ var crypto_js_sha1_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha1_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js/sha256.js */ "./node_modules/crypto-js/sha256.js");
/* harmony import */ var crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_adserver_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../src/adserver.js */ "./src/adserver.js");
/* harmony import */ var _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/utils/promise.js */ "./src/utils/promise.js");
/* harmony import */ var _src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../src/pbjsORTB.js */ "./src/pbjsORTB.js");
/* harmony import */ var _src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/utils/perfMetrics.js */ "./src/utils/perfMetrics.js");
/* harmony import */ var _src_fpd_rootDomain_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../src/fpd/rootDomain.js */ "./src/fpd/rootDomain.js");
/* harmony import */ var _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../src/consentHandler.js */ "./src/consentHandler.js");
/* harmony import */ var _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../src/activities/modules.js */ "./src/activities/modules.js");
/* harmony import */ var _src_activities_rules_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/activities/rules.js */ "./src/activities/rules.js");
/* harmony import */ var _src_activities_activities_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../src/activities/activities.js */ "./src/activities/activities.js");
/* harmony import */ var _src_activities_activityParams_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../src/activities/activityParams.js */ "./src/activities/activityParams.js");


/**
 * This module adds User ID support to prebid.js
 * @module modules/userId
 */

/**
 * @interface Submodule
 */

/**
 * @function
 * @summary performs action to obtain id and return a value in the callback's response argument.
 *  If IdResponse#id is defined, then it will be written to the current active storage.
 *  If IdResponse#callback is defined, then it'll called at the end of auction.
 *  It's permissible to return neither, one, or both fields.
 * @name Submodule#getId
 * @param {SubmoduleConfig} config
 * @param {ConsentData|undefined} consentData
 * @param {(Object|undefined)} cacheIdObj
 * @return {(IdResponse|undefined)} A response object that contains id and/or callback.
 */

/**
 * @function
 * @summary Similar to Submodule#getId, this optional method returns response to for id that exists already.
 *  If IdResponse#id is defined, then it will be written to the current active storage even if it exists already.
 *  If IdResponse#callback is defined, then it'll called at the end of auction.
 *  It's permissible to return neither, one, or both fields.
 * @name Submodule#extendId
 * @param {SubmoduleConfig} config
 * @param {ConsentData|undefined} consentData
 * @param {Object} storedId - existing id, if any
 * @return {(IdResponse|function(callback:function))} A response object that contains id and/or callback.
 */

/**
 * @function
 * @summary decode a stored value for passing to bid requests
 * @name Submodule#decode
 * @param {Object|string} value
 * @param {SubmoduleConfig|undefined} config
 * @return {(Object|undefined)}
 */

/**
 * @property
 * @summary used to link submodule with config
 * @name Submodule#name
 * @type {string}
 */

/**
 * @property
 * @summary use a predefined domain override for cookies or provide your own
 * @name Submodule#domainOverride
 * @type {(undefined|function)}
 */

/**
 * @function
 * @summary Returns the root domain
 * @name Submodule#findRootDomain
 * @returns {string}
 */

/**
 * @typedef {Object} SubmoduleConfig
 * @property {string} name - the User ID submodule name (used to link submodule with config)
 * @property {(SubmoduleStorage|undefined)} storage - browser storage config
 * @property {(SubmoduleParams|undefined)} params - params config for use by the submodule.getId function
 * @property {(Object|undefined)} value - if not empty, this value is added to bid requests for access in adapters
 */

/**
 * @typedef {Object} SubmoduleStorage
 * @property {string} type - browser storage type (html5 or cookie)
 * @property {string} name - key name to use when saving/reading to local storage or cookies
 * @property {number} expires - time to live for browser storage in days
 * @property {(number|undefined)} refreshInSeconds - if not empty, this value defines the maximum time span in seconds before refreshing user ID stored in browser
 */

/**
 * @typedef {Object} LiveIntentCollectConfig
 * @property {(string|undefined)} fpiStorageStrategy - defines whether the first party identifiers that LiveConnect creates and updates are stored in a cookie jar, local storage, or not created at all
 * @property {(number|undefined)} fpiExpirationDays - the expiration time of an identifier created and updated by LiveConnect
 * @property {(string|undefined)} collectorUrl - defines where the LiveIntentId signal pixels are pointing to
 * @property {(string|undefined)} appId - the  unique identifier of the application in question
 */

/**
 * @typedef {Object} SubmoduleParams
 * @property {(string|undefined)} partner - partner url param value
 * @property {(string|undefined)} url - webservice request url used to load Id data
 * @property {(string|undefined)} pixelUrl - publisher pixel to extend/modify cookies
 * @property {(boolean|undefined)} create - create id if missing.  default is true.
 * @property {(boolean|undefined)} extend - extend expiration time on each access.  default is false.
 * @property {(string|undefined)} pid - placement id url param value
 * @property {(string|undefined)} publisherId - the unique identifier of the publisher in question
 * @property {(string|undefined)} ajaxTimeout - the number of milliseconds a resolution request can take before automatically being terminated
 * @property {(array|undefined)} identifiersToResolve - the identifiers from either ls|cookie to be attached to the getId query
 * @property {(LiveIntentCollectConfig|undefined)} liCollectConfig - the config for LiveIntent's collect requests
 * @property {(string|undefined)} pd - publisher provided data for reconciling ID5 IDs
 * @property {(string|undefined)} emailHash - if provided, the hashed email address of a user
 * @property {(string|undefined)} notUse3P - use to retrieve envelope from 3p endpoint
 */

/**
 * @typedef {Object} SubmoduleContainer
 * @property {Submodule} submodule
 * @property {SubmoduleConfig} config
 * @property {(Object|undefined)} idObj - cache decoded id value (this is copied to every adUnit bid)
 * @property {(function|undefined)} callback - holds reference to submodule.getId() result if it returned a function. Will be set to undefined after callback executes
 * @property {StorageManager} storageMgr
 */

/**
 * @typedef {Object} ConsentData
 * @property {(string|undefined)} consentString
 * @property {(Object|undefined)} vendorData
 * @property {(boolean|undefined)} gdprApplies
 */

/**
 * @typedef {Object} IdResponse
 * @property {(Object|undefined)} id - id data
 * @property {(function|undefined)} callback - function that will return an id
 */

/**
  * @typedef {Object} RefreshUserIdsOptions
  * @property {(string[]|undefined)} submoduleNames - submodules to refresh
  */
























var MODULE_NAME = 'User ID';
var COOKIE = _src_storageManager_js__WEBPACK_IMPORTED_MODULE_3__.STORAGE_TYPE_COOKIES;
var LOCAL_STORAGE = _src_storageManager_js__WEBPACK_IMPORTED_MODULE_3__.STORAGE_TYPE_LOCALSTORAGE;
var DEFAULT_SYNC_DELAY = 500;
var NO_AUCTION_DELAY = 0;
var CONSENT_DATA_COOKIE_STORAGE_CONFIG = {
  name: '_pbjs_userid_consent_data',
  expires: 30 // 30 days expiration, which should match how often consent is refreshed by CMPs
};

var PBJS_USER_ID_OPTOUT_NAME = '_pbjs_id_optout';
var coreStorage = (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_3__.getCoreStorageManager)('userId');
var dep = {
  isAllowed: _src_activities_rules_js__WEBPACK_IMPORTED_MODULE_4__.isActivityAllowed
};

/** @type {boolean} */
var addedUserIdHook = false;

/** @type {SubmoduleContainer[]} */
var submodules = [];

/** @type {SubmoduleContainer[]} */
var initializedSubmodules;

/** @type {boolean} */
var initializedSubmodulesUpdated = false;

/** @type {SubmoduleConfig[]} */
var configRegistry = [];

/** @type {Submodule[]} */
var submoduleRegistry = [];

/** @type {(number|undefined)} */
var timeoutID;

/** @type {(number|undefined)} */
var syncDelay;

/** @type {(number|undefined)} */
var auctionDelay;

/** @type {(Object|undefined)} */
var userIdentity = {};

/** @type {(string|undefined)} */
var ppidSource;
var configListener;
var uidMetrics = function () {
  var metrics;
  return function () {
    if (metrics == null) {
      metrics = (0,_src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_5__.newMetrics)();
    }
    return metrics;
  };
}();
function submoduleMetrics(moduleName) {
  return uidMetrics().fork().renameWith(function (n) {
    return ["userId.mod.".concat(n), "userId.mods.".concat(moduleName, ".").concat(n)];
  });
}
var modulesToRefresh = [];
var scriptBasedModulesToRefresh = [];

/** @param {Submodule[]} submodules */
function setSubmoduleRegistry(submodules) {
  submoduleRegistry = submodules;
}
function cookieSetter(submodule, storageMgr) {
  storageMgr = storageMgr || submodule.storageMgr;
  var domainOverride = typeof submodule.submodule.domainOverride === 'function' ? submodule.submodule.domainOverride() : null;
  var name = submodule.config.storage.name;
  return function setCookie(suffix, value, expiration) {
    storageMgr.setCookie(name + (suffix || ''), value, expiration, 'Lax', domainOverride);
  };
}

/**
 * @param {SubmoduleContainer} submodule
 * @param {(Object|string)} value
 */
function setStoredValue(submodule, value) {
  /**
   * @type {SubmoduleStorage}
   */
  var storage = submodule.config.storage;
  var mgr = submodule.storageMgr;
  try {
    var expiresStr = new Date(Date.now() + storage.expires * (60 * 60 * 24 * 1000)).toUTCString();
    var valueStr = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(value) ? JSON.stringify(value) : value;
    if (storage.type === COOKIE) {
      var setCookie = cookieSetter(submodule);
      setCookie(null, valueStr, expiresStr);
      if (typeof storage.refreshInSeconds === 'number') {
        setCookie('_last', new Date().toUTCString(), expiresStr);
      }
    } else if (storage.type === LOCAL_STORAGE) {
      mgr.setDataInLocalStorage("".concat(storage.name, "_exp"), expiresStr);
      mgr.setDataInLocalStorage(storage.name, encodeURIComponent(valueStr));
      if (typeof storage.refreshInSeconds === 'number') {
        mgr.setDataInLocalStorage("".concat(storage.name, "_last"), new Date().toUTCString());
      }
    }
  } catch (error) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)(error);
  }
}
function deleteStoredValue(submodule) {
  var _submodule$config, _submodule$config$sto;
  var deleter, suffixes;
  switch ((_submodule$config = submodule.config) === null || _submodule$config === void 0 ? void 0 : (_submodule$config$sto = _submodule$config.storage) === null || _submodule$config$sto === void 0 ? void 0 : _submodule$config$sto.type) {
    case COOKIE:
      var setCookie = cookieSetter(submodule, coreStorage);
      var expiry = new Date(Date.now() - 1000 * 60 * 60 * 24).toUTCString();
      deleter = function deleter(suffix) {
        return setCookie(suffix, '', expiry);
      };
      suffixes = ['', '_last'];
      break;
    case LOCAL_STORAGE:
      deleter = function deleter(suffix) {
        return coreStorage.removeDataFromLocalStorage(submodule.config.storage.name + suffix);
      };
      suffixes = ['', '_last', '_exp'];
      break;
  }
  if (deleter) {
    suffixes.forEach(function (suffix) {
      try {
        deleter(suffix);
      } catch (e) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)(e);
      }
    });
  }
}
function setPrebidServerEidPermissions(initializedSubmodules) {
  var setEidPermissions = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.getPrebidInternal)().setEidPermissions;
  if (typeof setEidPermissions === 'function' && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isArray)(initializedSubmodules)) {
    setEidPermissions((0,_eids_js__WEBPACK_IMPORTED_MODULE_7__.buildEidPermissions)(initializedSubmodules));
  }
}

/**
 * @param {SubmoduleContainer} submodule
 * @param {String|undefined} key optional key of the value
 * @returns {string}
 */
function getStoredValue(submodule) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var mgr = submodule.storageMgr;
  var storage = submodule.config.storage;
  var storedKey = key ? "".concat(storage.name, "_").concat(key) : storage.name;
  var storedValue;
  try {
    if (storage.type === COOKIE) {
      storedValue = mgr.getCookie(storedKey);
    } else if (storage.type === LOCAL_STORAGE) {
      var storedValueExp = mgr.getDataFromLocalStorage("".concat(storage.name, "_exp"));
      // empty string means no expiration set
      if (storedValueExp === '') {
        storedValue = mgr.getDataFromLocalStorage(storedKey);
      } else if (storedValueExp) {
        if (new Date(storedValueExp).getTime() - Date.now() > 0) {
          storedValue = decodeURIComponent(mgr.getDataFromLocalStorage(storedKey));
        }
      }
    }
    // support storing a string or a stringified object
    if (typeof storedValue === 'string' && storedValue.trim().charAt(0) === '{') {
      storedValue = JSON.parse(storedValue);
    }
  } catch (e) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)(e);
  }
  return storedValue;
}

/**
 * makes an object that can be stored with only the keys we need to check.
 * excluding the vendorConsents object since the consentString is enough to know
 * if consent has changed without needing to have all the details in an object
 * @param consentData
 * @returns {{apiVersion: number, gdprApplies: boolean, consentString: string}}
 */
function makeStoredConsentDataHash(consentData) {
  var storedConsentData = {
    consentString: '',
    gdprApplies: false,
    apiVersion: 0
  };
  if (consentData) {
    storedConsentData.consentString = consentData.consentString;
    storedConsentData.gdprApplies = consentData.gdprApplies;
    storedConsentData.apiVersion = consentData.apiVersion;
  }
  return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.cyrb53Hash)(JSON.stringify(storedConsentData));
}

/**
 * puts the current consent data into cookie storage
 * @param consentData
 */
function setStoredConsentData(consentData) {
  try {
    var expiresStr = new Date(Date.now() + CONSENT_DATA_COOKIE_STORAGE_CONFIG.expires * (60 * 60 * 24 * 1000)).toUTCString();
    coreStorage.setCookie(CONSENT_DATA_COOKIE_STORAGE_CONFIG.name, makeStoredConsentDataHash(consentData), expiresStr, 'Lax');
  } catch (error) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)(error);
  }
}

/**
 * get the stored consent data from local storage, if any
 * @returns {string}
 */
function getStoredConsentData() {
  try {
    return coreStorage.getCookie(CONSENT_DATA_COOKIE_STORAGE_CONFIG.name);
  } catch (e) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)(e);
  }
}

/**
 * test if the consent object stored locally matches the current consent data. if they
 * don't match or there is nothing stored locally, it means a refresh of the user id
 * submodule is needed
 * @param storedConsentData
 * @param consentData
 * @returns {boolean}
 */
function storedConsentDataMatchesConsentData(storedConsentData, consentData) {
  return typeof storedConsentData !== 'undefined' && storedConsentData !== null && storedConsentData === makeStoredConsentDataHash(consentData);
}

/**
 * @param {SubmoduleContainer[]} submodules
 * @param {function} cb - callback for after processing is done.
 */
function processSubmoduleCallbacks(submodules, cb) {
  cb = uidMetrics().fork().startTiming('userId.callbacks.total').stopBefore(cb);
  var done = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.delayExecution)(function () {
    clearTimeout(timeoutID);
    cb();
  }, submodules.length);
  submodules.forEach(function (submodule) {
    var moduleDone = submoduleMetrics(submodule.submodule.name).startTiming('callback').stopBefore(done);
    function callbackCompleted(idObj) {
      // if valid, id data should be saved to cookie/html storage
      if (idObj) {
        if (submodule.config.storage) {
          setStoredValue(submodule, idObj);
        }
        // cache decoded value (this is copied to every adUnit bid)
        submodule.idObj = submodule.submodule.decode(idObj, submodule.config);
        updatePPID(submodule.idObj);
      } else {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, ": ").concat(submodule.submodule.name, " - request id responded with an empty value"));
      }
      moduleDone();
    }
    try {
      submodule.callback(callbackCompleted, getStoredValue.bind(null, submodule));
    } catch (e) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)("Error in userID module '".concat(submodule.submodule.name, "':"), e);
      moduleDone();
    }
    // clear callback, this prop is used to test if all submodule callbacks are complete below
    submodule.callback = undefined;
  });
}

/**
 * This function will create a combined object for all subModule Ids
 * @param {SubmoduleContainer[]} submodules
 */
function getCombinedSubmoduleIds(submodules) {
  if (!Array.isArray(submodules) || !submodules.length) {
    return {};
  }
  var combinedSubmoduleIds = submodules.filter(function (i) {
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(i.idObj) && Object.keys(i.idObj).length;
  }).reduce(function (carry, i) {
    Object.keys(i.idObj).forEach(function (key) {
      carry[key] = i.idObj[key];
    });
    return carry;
  }, {});
  return combinedSubmoduleIds;
}

/**
 * This function will return a submodule ID object for particular source name
 * @param {SubmoduleContainer[]} submodules
 * @param {string} sourceName
 */
function getSubmoduleId(submodules, sourceName) {
  if (!Array.isArray(submodules) || !submodules.length) {
    return {};
  }
  var submodule = submodules.filter(function (sub) {
    var _USER_IDS_CONFIG$Obje;
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(sub.idObj) && Object.keys(sub.idObj).length && ((_USER_IDS_CONFIG$Obje = _eids_js__WEBPACK_IMPORTED_MODULE_7__.USER_IDS_CONFIG[Object.keys(sub.idObj)[0]]) === null || _USER_IDS_CONFIG$Obje === void 0 ? void 0 : _USER_IDS_CONFIG$Obje.source) === sourceName;
  });
  return !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(submodule) ? submodule[0].idObj : [];
}

/**
 * This function will create a combined object for bidder with allowed subModule Ids
 * @param {SubmoduleContainer[]} submodules
 * @param {string} bidder
 */
function getCombinedSubmoduleIdsForBidder(submodules, bidder) {
  if (!Array.isArray(submodules) || !submodules.length || !bidder) {
    return {};
  }
  return submodules.filter(function (i) {
    return !i.config.bidders || !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isArray)(i.config.bidders) || (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__.includes)(i.config.bidders, bidder);
  }).filter(function (i) {
    return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(i.idObj) && Object.keys(i.idObj).length;
  }).reduce(function (carry, i) {
    Object.keys(i.idObj).forEach(function (key) {
      carry[key] = i.idObj[key];
    });
    return carry;
  }, {});
}

/**
 * @param {AdUnit[]} adUnits
 * @param {SubmoduleContainer[]} submodules
 */
function addIdDataToAdUnitBids(adUnits, submodules) {
  if ([adUnits].some(function (i) {
    return !Array.isArray(i) || !i.length;
  })) {
    return;
  }
  adUnits.forEach(function (adUnit) {
    if (adUnit.bids && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isArray)(adUnit.bids)) {
      adUnit.bids.forEach(function (bid) {
        var combinedSubmoduleIds = getCombinedSubmoduleIdsForBidder(submodules, bid.bidder);
        if (Object.keys(combinedSubmoduleIds).length) {
          // create a User ID object on the bid,
          bid.userId = combinedSubmoduleIds;
          bid.userIdAsEids = (0,_eids_js__WEBPACK_IMPORTED_MODULE_7__.createEidsArray)(combinedSubmoduleIds);
        }
      });
    }
  });
}
var INIT_CANCELED = {};
function idSystemInitializer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.timeout : _ref$delay;
  var startInit = (0,_src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.defer)();
  var startCallbacks = (0,_src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.defer)();
  var cancel;
  var initialized = false;
  var initMetrics;
  function cancelAndTry(promise) {
    initMetrics = uidMetrics().fork();
    if (cancel != null) {
      cancel.reject(INIT_CANCELED);
    }
    cancel = (0,_src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.defer)();
    return _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.race([promise, cancel.promise]).finally(initMetrics.startTiming('userId.total'));
  }

  // grab a reference to global vars so that the promise chains remain isolated;
  // multiple calls to `init` (from tests) might otherwise cause them to interfere with each other
  var initModules = initializedSubmodules;
  var allModules = submodules;
  function checkRefs(fn) {
    // unfortunately tests have their own global state that needs to be guarded, so even if we keep ours tidy,
    // we cannot let things like submodule callbacks run (they pollute things like the global `server` XHR mock)
    return function () {
      if (initModules === initializedSubmodules && allModules === submodules) {
        return fn.apply(void 0, arguments);
      }
    };
  }
  function timeGdpr() {
    return _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_10__.gdprDataHandler.promise["finally"](initMetrics.startTiming('userId.init.gdpr'));
  }
  var done = cancelAndTry(_src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.all([_src_hook_js__WEBPACK_IMPORTED_MODULE_11__.ready, startInit.promise]).then(timeGdpr).then(checkRefs(function (consentData) {
    initSubmodules(initModules, allModules, consentData);
  })).then(function () {
    return startCallbacks.promise.finally(initMetrics.startTiming('userId.callbacks.pending'));
  }).then(checkRefs(function () {
    var modWithCb = initModules.filter(function (item) {
      return (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(item.callback);
    });
    if (modWithCb.length) {
      return new _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise(function (resolve) {
        return processSubmoduleCallbacks(modWithCb, resolve);
      });
    }
  })));

  /**
   * with `ready` = true, starts initialization; with `refresh` = true, reinitialize submodules (optionally
   * filtered by `submoduleNames`).
   */
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$refresh = _ref2.refresh,
      refresh = _ref2$refresh === void 0 ? false : _ref2$refresh,
      _ref2$submoduleNames = _ref2.submoduleNames,
      submoduleNames = _ref2$submoduleNames === void 0 ? null : _ref2$submoduleNames,
      _ref2$ready = _ref2.ready,
      ready = _ref2$ready === void 0 ? false : _ref2$ready;
    if (ready && !initialized) {
      initialized = true;
      startInit.resolve();
      // submodule callbacks should run immediately if `auctionDelay` > 0, or `syncDelay` ms after the
      // auction ends otherwise
      if (auctionDelay > 0) {
        startCallbacks.resolve();
      } else {
        _src_events_js__WEBPACK_IMPORTED_MODULE_12__.on(_src_constants_json__WEBPACK_IMPORTED_MODULE_13__.EVENTS.AUCTION_END, function auctionEndHandler() {
          _src_events_js__WEBPACK_IMPORTED_MODULE_12__.off(_src_constants_json__WEBPACK_IMPORTED_MODULE_13__.EVENTS.AUCTION_END, auctionEndHandler);
          delay(syncDelay).then(startCallbacks.resolve);
        });
      }
    }
    if (refresh && initialized) {
      done = cancelAndTry(done.catch(function () {
        return null;
      }).then(timeGdpr) // fetch again in case a refresh was forced before this was resolved
      .then(checkRefs(function (consentData) {
        var cbModules = initSubmodules(initModules, allModules.filter(function (sm) {
          return submoduleNames == null || submoduleNames.includes(sm.submodule.name);
        }), consentData, true).filter(function (sm) {
          return sm.callback != null;
        });
        if (cbModules.length) {
          return new _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise(function (resolve) {
            return processSubmoduleCallbacks(cbModules, resolve);
          });
        }
      })));
    }
    return done;
  };
}
var initIdSystem;
function getPPID() {
  var eids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserIdsAsEids() || [];
  // userSync.ppid should be one of the 'source' values in getUserIdsAsEids() eg pubcid.org or id5-sync.com
  var matchingUserId = ppidSource && eids.find(function (userID) {
    return userID.source === ppidSource;
  });
  if (matchingUserId && typeof (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(matchingUserId, 'uids.0.id') === 'string') {
    var ppidValue = matchingUserId.uids[0].id.replace(/[\W_]/g, '');
    if (ppidValue.length >= 32 && ppidValue.length <= 150) {
      return ppidValue;
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logWarn)("User ID - Googletag Publisher Provided ID for ".concat(ppidSource, " is not between 32 and 150 characters - ").concat(ppidValue));
    }
  }
}

/**
 * Hook is executed before adapters, but after consentManagement. Consent data is requied because
 * this module requires GDPR consent with Purpose #1 to save data locally.
 * The two main actions handled by the hook are:
 * 1. check gdpr consentData and handle submodule initialization.
 * 2. append user id data (loaded from cookied/html or from the getId method) to bids to be accessed in adapters.
 * @param {Object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */
var requestBidsHook = (0,_src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_5__.timedAuctionHook)('userId', function requestBidsHook(fn, reqBidsConfigObj) {
  var _this = this;
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref3$delay = _ref3.delay,
    delay = _ref3$delay === void 0 ? _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.timeout : _ref3$delay,
    _ref3$getIds = _ref3.getIds,
    getIds = _ref3$getIds === void 0 ? getUserIdsAsync : _ref3$getIds;
  _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.race([getIds().catch(function () {
    return null;
  }), delay(auctionDelay)]).then(function () {
    // initializedSubmodulesUpdated - flag to identify if any module has been added from the page post module initialization. This is specifically for OW use case
    if (initializedSubmodulesUpdated && initializedSubmodules !== undefined) {
      for (var index in initializedSubmodules) {
        submodules.push(initializedSubmodules[index]);
      }
    }
    // pass available user id data to bid adapters
    addIdDataToAdUnitBids(reqBidsConfigObj.adUnits || (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().adUnits, initializedSubmodules);
    uidMetrics().join((0,_src_utils_perfMetrics_js__WEBPACK_IMPORTED_MODULE_5__.useMetrics)(reqBidsConfigObj.metrics), {
      propagate: false,
      includeGroups: true
    });
    // calling fn allows prebid to continue processing
    fn.call(_this, reqBidsConfigObj);
  });
});

/**
 * This function will be exposed in global-name-space so that userIds stored by Prebid UserId module can be used by external codes as well.
 * Simple use case will be passing these UserIds to A9 wrapper solution
 */
function getUserIds() {
  return getCombinedSubmoduleIds(initializedSubmodules);
}

/**
 * This function will be exposed in global-name-space so that userIds stored by Prebid UserId module can be used by external codes as well.
 * Simple use case will be passing these UserIds to A9 wrapper solution
 */
function getUserIdsAsEids() {
  return (0,_eids_js__WEBPACK_IMPORTED_MODULE_7__.createEidsArray)(getUserIds());
}

/**
 * This function will be exposed in global-name-space so that userIds stored by Prebid UserId module can be used by external codes as well.
 * Simple use case will be passing these UserIds to A9 wrapper solution
 */

function getUserIdsAsEidBySource(sourceName) {
  return (0,_eids_js__WEBPACK_IMPORTED_MODULE_7__.createEidsArray)(getSubmoduleId(initializedSubmodules, sourceName))[0];
}

/**
 * This function will be exposed in global-name-space so that userIds for a source can be exposed
 * Sample use case is exposing this function to ESP
 */
function getEncryptedEidsForSource(source, encrypt, customFunction) {
  return initIdSystem().then(function () {
    var eidsSignals = {};
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(customFunction)) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - Getting encrypted signal from custom function : ").concat(customFunction.name, " & source : ").concat(source, " "));
      // Publishers are expected to define a common function which will be proxy for signal function.
      var customSignals = customFunction(source);
      eidsSignals[source] = customSignals ? encryptSignals(customSignals) : null; // by default encrypt using base64 to avoid JSON errors
    } else {
      // initialize signal with eids by default
      var eid = getUserIdsAsEidBySource(source);
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - Getting encrypted signal for eids :").concat(JSON.stringify(eid)));
      if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(eid)) {
        eidsSignals[eid.source] = encrypt === true ? encryptSignals(eid) : eid.uids[0].id; // If encryption is enabled append version (1||) and encrypt entire object
      }
    }

    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - Fetching encrypted eids: ").concat(eidsSignals[source]));
    return eidsSignals[source];
  });
}
function encryptSignals(signals) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var encryptedSig = '';
  switch (version) {
    case 1:
      // Base64 Encryption
      encryptedSig = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_16__["default"])(signals) === 'object' ? window.btoa(JSON.stringify(signals)) : window.btoa(signals); // Test encryption. To be replaced with better algo
      break;
    default:
      break;
  }
  return "".concat(version, "||").concat(encryptedSig);
}

/**
* This function will be exposed in the global-name-space so that publisher can register the signals-ESP.
*/
function registerSignalSources() {
  if (!(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isGptPubadsDefined)()) {
    return;
  }
  window.googletag.encryptedSignalProviders = window.googletag.encryptedSignalProviders || [];
  var encryptedSignalSources = _src_config_js__WEBPACK_IMPORTED_MODULE_17__.config.getConfig('userSync.encryptedSignalSources');
  if (encryptedSignalSources) {
    var registerDelay = encryptedSignalSources.registerDelay || 0;
    setTimeout(function () {
      encryptedSignalSources['sources'] && encryptedSignalSources['sources'].forEach(function (_ref4) {
        var source = _ref4.source,
          encrypt = _ref4.encrypt,
          customFunc = _ref4.customFunc;
        source.forEach(function (src) {
          window.googletag.encryptedSignalProviders.push({
            id: src,
            collectorFunction: function collectorFunction() {
              return getEncryptedEidsForSource(src, encrypt, customFunc);
            }
          });
        });
      });
    }, registerDelay);
  } else {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logWarn)("".concat(MODULE_NAME, " - ESP : encryptedSignalSources config not defined under userSync Object"));
  }
}

/**
 * Force (re)initialization of ID submodules.
 *
 * This will force a refresh of the specified ID submodules regardless of `auctionDelay` / `syncDelay` settings, and
 * return a promise that resolves to the same value as `getUserIds()` when the refresh is complete.
 * If a refresh is already in progress, it will be canceled (rejecting promises returned by previous calls to `refreshUserIds`).
 *
 * @param submoduleNames? submodules to refresh. If omitted, refresh all submodules.
 * @param callback? called when the refresh is complete
 */
function refreshUserIds() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    submoduleNames = _ref5.submoduleNames;
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var moduleUpdated = arguments.length > 2 ? arguments[2] : undefined;
  if (moduleUpdated !== undefined) {
    initializedSubmodulesUpdated = moduleUpdated;
  }
  return initIdSystem({
    refresh: true,
    submoduleNames: submoduleNames
  }).then(function () {
    if (callback && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(callback)) {
      callback();
    }
    return getUserIds();
  });
}

/**
 * @returns a promise that resolves to the same value as `getUserIds()`, but only once all ID submodules have completed
 * initialization. This can also be used to synchronize calls to other ID accessors, e.g.
 *
 * ```
 * pbjs.getUserIdsAsync().then(() => {
 *   const eids = pbjs.getUserIdsAsEids(); // guaranteed to be completely initialized at this point
 * });
 * ```
 */

function getUserIdsAsync() {
  return initIdSystem().then(function () {
    return getUserIds();
  }, function (e) {
    if (e === INIT_CANCELED) {
      // there's a pending refresh - because GreedyPromise runs this synchronously, we are now in the middle
      // of canceling the previous init, before the refresh logic has had a chance to run.
      // Use a "normal" Promise to clear the stack and let it complete (or this will just recurse infinitely)
      return Promise.resolve().then(getUserIdsAsync);
    } else {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)('Error initializing userId', e);
      return _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.reject(e);
    }
  });
}
function setUserIdentities(userIdentityData) {
  if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(userIdentityData)) {
    userIdentity = {};
    return;
  }
  var pubProvidedEmailHash = {};
  if (userIdentityData.pubProvidedEmail) {
    generateEmailHash(userIdentityData.pubProvidedEmail, pubProvidedEmailHash);
    userIdentityData.pubProvidedEmailHash = pubProvidedEmailHash;
    delete userIdentityData.pubProvidedEmail;
  }
  Object.assign(userIdentity, userIdentityData);
  if (window.IHPWT && window.IHPWT.loginEvent || window.PWT && window.PWT.loginEvent) {
    reTriggerPartnerCallsWithEmailHashes();
    if (window.IHPWT) {
      window.IHPWT.loginEvent = false;
    }
    if (window.PWT) {
      window.PWT.loginEvent = false;
    }
  }
}
;
function getRawPDString(emailHashes, userID) {
  var _navigator;
  var params = {
    1: emailHashes && emailHashes['SHA256'] || undefined,
    // Email
    5: userID ? btoa(userID) : undefined,
    // UserID
    12: (_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.userAgent
  };
  var pdString = Object.keys((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.skipUndefinedValues)(params)).map(function (key) {
    return params[key] && key + '=' + params[key];
  }).join('&');
  return btoa(pdString);
}
;
function updateModuleParams(moduleToUpdate) {
  var params = _src_constants_json__WEBPACK_IMPORTED_MODULE_13__.MODULE_PARAM_TO_UPDATE_FOR_SSO[moduleToUpdate.name];
  if (!params) return;
  var userIdentity = getUserIdentities() || {};
  var enableSSO = window.IHPWT && window.IHPWT.ssoEnabled || window.PWT && window.PWT.ssoEnabled || false;
  var emailHashes = enableSSO && userIdentity.emailHash ? userIdentity.emailHash : userIdentity.pubProvidedEmailHash ? userIdentity.pubProvidedEmailHash : undefined;
  params.forEach(function (param) {
    moduleToUpdate.params[param.key] = moduleToUpdate.name === 'id5Id' ? getRawPDString(emailHashes, userIdentity.userID) : emailHashes ? emailHashes[param.hashType] : undefined;
  });
}
function generateModuleLists() {
  var primaryModulesList = window.IHPWT && window.IHPWT.OVERRIDES_PRIMARY_MODULES || window.PWT && window.PWT.OVERRIDES_PRIMARY_MODULES || _src_constants_json__WEBPACK_IMPORTED_MODULE_13__.REFRESH_IDMODULES_LIST.PRIMARY_MODULES;
  var scriptBasedModulesList = window.IHPWT && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES || window.PWT && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES || _src_constants_json__WEBPACK_IMPORTED_MODULE_13__.REFRESH_IDMODULES_LIST.SCRIPT_BASED_MODULES;
  for (var index in configRegistry) {
    var moduleName = configRegistry[index].name;
    if (primaryModulesList.indexOf(moduleName) >= 0) {
      !modulesToRefresh.includes(moduleName) && modulesToRefresh.push(moduleName);
      updateModuleParams(configRegistry[index]);
    }
    if (scriptBasedModulesList.indexOf(moduleName) >= 0) {
      !scriptBasedModulesToRefresh.includes(moduleName) && scriptBasedModulesToRefresh.push(moduleName);
    }
  }
}
function reTriggerPartnerCallsWithEmailHashes() {
  generateModuleLists();
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().refreshUserIds({
    'submoduleNames': modulesToRefresh
  });
  reTriggerScriptBasedAPICalls(scriptBasedModulesToRefresh);
}
function reTriggerScriptBasedAPICalls(modulesToRefresh) {
  var i = 0;
  var userIdentity = getUserIdentities() || {};
  for (i in modulesToRefresh) {
    switch (modulesToRefresh[i]) {
      case 'zeotapIdPlus':
        if (window.zeotap && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(window.zeotap.callMethod)) {
          var userIdentityObject = {
            email: userIdentity.emailHash['SHA256']
          };
          window.zeotap.callMethod('setUserIdentities', userIdentityObject, true);
        }
        break;
      case 'identityLink':
        if (window.ats) {
          var atsObject = window.ats.outputCurrentConfiguration();
          atsObject.emailHashes = userIdentity.emailHash ? [userIdentity.emailHash['MD5'], userIdentity.emailHash['SHA1'], userIdentity.emailHash['SHA256']] : undefined;
          window.ats.start && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(window.ats.start) && window.ats.start(atsObject);
          window.ats.setAdditionalData && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(window.ats.setAdditionalData) && window.ats.setAdditionalData({
            'type': 'emailHashes',
            'id': atsObject.emailHashes
          });
        }
        break;
      case 'publinkId':
        if (window.conversant && (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isFn)(window.conversant.launch)) {
          var launchObject = window.conversant.getLauncherObject();
          launchObject.emailHashes = userIdentity.emailHash ? [userIdentity.emailHash['MD5'], userIdentity.emailHash['SHA256']] : undefined;
          window.conversant.launch('publink', 'start', launchObject);
        }
        break;
    }
  }
}
function getUserIdentities() {
  return userIdentity;
}
function processFBLoginData(refThis, response) {
  var emailHash = {};
  if (response.status === 'connected') {
    // window.IHPWT = window.IHPWT || {};
    window.FB && window.FB.api('/me?fields=email&access_token=' + response.authResponse.accessToken, function (response) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('SSO - Data received from FB API');
      if (response.error) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('SSO - User information could not be retrieved by facebook api [', response.error.message, ']');
        return;
      }
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('SSO - Information successfully retrieved by Facebook API.');
      generateEmailHash(response.email || undefined, emailHash);
      refThis.setUserIdentities({
        emailHash: emailHash
      });
    });
  } else {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('SSO - Error fetching login information from facebook');
  }
}

/**
 * This function is used to read sso information from facebook and google apis.
 * @param {String} provider SSO provider for which the api call is to be made
 * @param {Object} userObject Google's user object, passed from google's callback function
 */
function onSSOLogin(data) {
  var refThis = this;
  var email;
  var emailHash = {};
  if (window.IHPWT && !window.IHPWT.ssoEnabled || window.PWT && !window.PWT.ssoEnabled) return;
  switch (data.provider) {
    case undefined:
    case 'facebook':
      if (data.provider === 'facebook') {
        window.FB && window.FB.getLoginStatus(function (response) {
          processFBLoginData(refThis, response);
        }, true);
      } else {
        window.FB && window.FB.Event.subscribe('auth.statusChange', function (response) {
          processFBLoginData(refThis, response);
        });
      }
      break;
    case 'google':
      var profile = data.googleUserObject.getBasicProfile();
      email = profile.getEmail() || undefined;
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('SSO - Information successfully retrieved by Google API');
      generateEmailHash(email, emailHash);
      refThis.setUserIdentities({
        emailHash: emailHash
      });
      break;
  }
}

/**
 * This function is used to clear user login information once user logs out.
 */
function onSSOLogout() {
  this.setUserIdentities({});
}
function generateEmailHash(email, emailHash) {
  email = email !== undefined ? email.trim().toLowerCase() : '';
  var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (regex.test(email)) {
    emailHash.MD5 = crypto_js_md5_js__WEBPACK_IMPORTED_MODULE_0___default()(email).toString();
    emailHash.SHA1 = crypto_js_sha1_js__WEBPACK_IMPORTED_MODULE_1___default()(email).toString();
    emailHash.SHA256 = crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_2___default()(email).toString();
  }
}
function populateSubmoduleId(submodule, consentData, storedConsentData, forceRefresh) {
  // There are two submodule configuration types to handle: storage or value
  // 1. storage: retrieve user id data from cookie/html storage or with the submodule's getId method
  // 2. value: pass directly to bids
  if (submodule.config.storage) {
    var storedId = getStoredValue(submodule);
    var response;
    var refreshNeeded = false;
    if (typeof submodule.config.storage.refreshInSeconds === 'number') {
      var storedDate = new Date(getStoredValue(submodule, 'last'));
      refreshNeeded = storedDate && Date.now() - storedDate.getTime() > submodule.config.storage.refreshInSeconds * 1000;
    }
    if (!storedId || refreshNeeded || forceRefresh || !storedConsentDataMatchesConsentData(storedConsentData, consentData)) {
      // No id previously saved, or a refresh is needed, or consent has changed. Request a new id from the submodule.
      response = submodule.submodule.getId(submodule.config, consentData, storedId);
    } else if (typeof submodule.submodule.extendId === 'function') {
      // If the id exists already, give submodule a chance to decide additional actions that need to be taken
      response = submodule.submodule.extendId(submodule.config, consentData, storedId);
    }
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(response)) {
      if (response.id) {
        // A getId/extendId result assumed to be valid user id data, which should be saved to users local storage or cookies
        setStoredValue(submodule, response.id);
        storedId = response.id;
      }
      if (typeof response.callback === 'function') {
        // Save async callback to be invoked after auction
        submodule.callback = response.callback;
      }
    }
    if (storedId) {
      // cache decoded value (this is copied to every adUnit bid)
      submodule.idObj = submodule.submodule.decode(storedId, submodule.config);
    }
  } else if (submodule.config.value) {
    // cache decoded value (this is copied to every adUnit bid)
    submodule.idObj = submodule.config.value;
  } else {
    var _response = submodule.submodule.getId(submodule.config, consentData, undefined);
    if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(_response)) {
      if (typeof _response.callback === 'function') {
        submodule.callback = _response.callback;
      }
      if (_response.id) {
        submodule.idObj = submodule.submodule.decode(_response.id, submodule.config);
      }
    }
  }
  updatePPID(submodule.idObj);
}
function updatePPID() {
  var userIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getUserIds();
  if (userIds && ppidSource) {
    var ppid = getPPID((0,_eids_js__WEBPACK_IMPORTED_MODULE_7__.createEidsArray)(userIds));
    if (ppid) {
      if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isGptPubadsDefined)()) {
        window.googletag.pubads().setPublisherProvidedId(ppid);
      } else {
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
        window.googletag.cmd.push(function () {
          window.googletag.pubads().setPublisherProvidedId(ppid);
        });
      }
    }
  }
}
function initSubmodules(dest, submodules, consentData) {
  var forceRefresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return uidMetrics().fork().measureTime('userId.init.modules', function () {
    if (!submodules.length) return []; // to simplify log messages from here on

    /**
     * filter out submodules that:
     *
     *  - cannot use the storage they've been set up with (storage not available / not allowed / disabled)
     *  - are not allowed to perform the `enrichEids` activity
     */
    submodules = submodules.filter(function (submod) {
      return (!submod.config.storage || canUseStorage(submod)) && dep.isAllowed(_src_activities_activities_js__WEBPACK_IMPORTED_MODULE_18__.ACTIVITY_ENRICH_EIDS, (0,_src_activities_activityParams_js__WEBPACK_IMPORTED_MODULE_19__.activityParams)(_src_activities_modules_js__WEBPACK_IMPORTED_MODULE_20__.MODULE_TYPE_UID, submod.config.name));
    });
    if (!submodules.length) {
      (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logWarn)("".concat(MODULE_NAME, " - no ID module configured"));
      return [];
    }

    // we always want the latest consentData stored, even if we don't execute any submodules
    var storedConsentData = getStoredConsentData();
    setStoredConsentData(consentData);
    var initialized = submodules.reduce(function (carry, submodule) {
      return submoduleMetrics(submodule.submodule.name).measureTime('init', function () {
        try {
          populateSubmoduleId(submodule, consentData, storedConsentData, forceRefresh);
          carry.push(submodule);
        } catch (e) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)("Error in userID module '".concat(submodule.submodule.name, "':"), e);
        }
        return carry;
      });
    }, []);
    if (initialized.length) {
      setPrebidServerEidPermissions(initialized);
    }
    initialized.forEach(updateInitializedSubmodules.bind(null, dest));
    return initialized;
  });
}
function updateInitializedSubmodules(dest, submodule) {
  var updated = false;
  for (var i = 0; i < dest.length; i++) {
    if (submodule.config.name.toLowerCase() === dest[i].config.name.toLowerCase()) {
      updated = true;
      dest[i] = submodule;
      break;
    }
  }
  if (!updated) {
    dest.push(submodule);
  }
}

/**
 * list of submodule configurations with valid 'storage' or 'value' obj definitions
 * * storage config: contains values for storing/retrieving User ID data in browser storage
 * * value config: object properties that are copied to bids (without saving to storage)
 * @param {SubmoduleConfig[]} configRegistry
 * @param {Submodule[]} submoduleRegistry
 * @param {string[]} activeStorageTypes
 * @returns {SubmoduleConfig[]}
 */
function getValidSubmoduleConfigs(configRegistry, submoduleRegistry) {
  if (!Array.isArray(configRegistry)) {
    return [];
  }
  return configRegistry.reduce(function (carry, config) {
    // every submodule config obj must contain a valid 'name'
    if (!config || (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmptyStr)(config.name)) {
      return carry;
    }
    // Validate storage config contains 'type' and 'name' properties with non-empty string values
    // 'type' must be one of html5, cookies
    if (config.storage && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmptyStr)(config.storage.type) && !(0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isEmptyStr)(config.storage.name) && ALL_STORAGE_TYPES.has(config.storage.type)) {
      carry.push(config);
    } else if ((0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isPlainObject)(config.value)) {
      carry.push(config);
    } else if (!config.storage && !config.value) {
      carry.push(config);
    }
    return carry;
  }, []);
}
var ALL_STORAGE_TYPES = new Set([LOCAL_STORAGE, COOKIE]);
function canUseStorage(submodule) {
  var _submodule$config2, _submodule$config2$st;
  switch ((_submodule$config2 = submodule.config) === null || _submodule$config2 === void 0 ? void 0 : (_submodule$config2$st = _submodule$config2.storage) === null || _submodule$config2$st === void 0 ? void 0 : _submodule$config2$st.type) {
    case LOCAL_STORAGE:
      if (submodule.storageMgr.localStorageIsEnabled()) {
        if (coreStorage.getDataFromLocalStorage(PBJS_USER_ID_OPTOUT_NAME)) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - opt-out localStorage found, storage disabled"));
          return false;
        }
        return true;
      }
      break;
    case COOKIE:
      if (submodule.storageMgr.cookiesAreEnabled()) {
        if (coreStorage.getCookie(PBJS_USER_ID_OPTOUT_NAME)) {
          (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - opt-out cookie found, storage disabled"));
          return false;
        }
        return true;
      }
      break;
  }
  return false;
}

/**
 * update submodules by validating against existing configs and storage types
 */
function updateSubmodules() {
  var configs = getValidSubmoduleConfigs(configRegistry, submoduleRegistry);
  if (!configs.length) {
    return;
  }
  generateModuleLists(); // this is to generate the list of modules to be updated wit sso/publisher provided email data

  // do this to avoid reprocessing submodules
  // TODO: the logic does not match the comment - addedSubmodules is always a copy of submoduleRegistry
  // (if it did it would not be correct - it's not enough to find new modules, as others may have been removed or changed)
  var addedSubmodules = submoduleRegistry.filter(function (i) {
    return !(0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__.find)(submodules, function (j) {
      return j.name === i.name;
    });
  });
  submodules.splice(0, submodules.length);
  // find submodule and the matching configuration, if found create and append a SubmoduleContainer
  addedSubmodules.map(function (i) {
    var submoduleConfig = (0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__.find)(configs, function (j) {
      return j.name && (j.name.toLowerCase() === i.name.toLowerCase() || i.aliasName && j.name.toLowerCase() === i.aliasName.toLowerCase());
    });
    if (submoduleConfig && i.name !== submoduleConfig.name) submoduleConfig.name = i.name;
    i.findRootDomain = _src_fpd_rootDomain_js__WEBPACK_IMPORTED_MODULE_21__.findRootDomain;
    return submoduleConfig ? {
      submodule: i,
      config: submoduleConfig,
      callback: undefined,
      idObj: undefined,
      storageMgr: (0,_src_storageManager_js__WEBPACK_IMPORTED_MODULE_3__.getStorageManager)({
        moduleType: _src_activities_modules_js__WEBPACK_IMPORTED_MODULE_20__.MODULE_TYPE_UID,
        moduleName: submoduleConfig.name
      })
    } : null;
  }).filter(function (submodule) {
    return submodule !== null;
  }).forEach(function (sm) {
    return submodules.push(sm);
  });
  if (!addedUserIdHook && submodules.length) {
    // priority value 40 will load after consentManagement with a priority of 50
    (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().requestBids.before(requestBidsHook, 40);
    _src_adapterManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].callDataDeletionRequest.before(requestDataDeletion);
    _src_adserver_js__WEBPACK_IMPORTED_MODULE_22__.getPPID.after(function (next) {
      return next(getPPID());
    });
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)("".concat(MODULE_NAME, " - usersync config updated for ").concat(submodules.length, " submodules: "), submodules.map(function (a) {
      return a.submodule.name;
    }));
    addedUserIdHook = true;
  }
}
function requestDataDeletion(next) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logInfo)('UserID: received data deletion request; deleting all stored IDs...');
  submodules.forEach(function (submodule) {
    if (typeof submodule.submodule.onDataDeletionRequest === 'function') {
      try {
        var _submodule$submodule;
        (_submodule$submodule = submodule.submodule).onDataDeletionRequest.apply(_submodule$submodule, [submodule.config, submodule.idObj].concat(args));
      } catch (e) {
        (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.logError)("Error calling onDataDeletionRequest for ID submodule ".concat(submodule.submodule.name), e);
      }
    }
    deleteStoredValue(submodule);
  });
  next.apply(this, args);
}

/**
 * enable submodule in User ID
 * @param {Submodule} submodule
 */
function attachIdSystem(submodule) {
  if (!(0,_src_polyfill_js__WEBPACK_IMPORTED_MODULE_8__.find)(submoduleRegistry, function (i) {
    return i.name === submodule.name;
  })) {
    submoduleRegistry.push(submodule);
    _src_consentHandler_js__WEBPACK_IMPORTED_MODULE_23__.GDPR_GVLIDS.register(_src_activities_modules_js__WEBPACK_IMPORTED_MODULE_20__.MODULE_TYPE_UID, submodule.name, submodule.gvlid);
    updateSubmodules();
    // TODO: a test case wants this to work even if called after init (the setConfig({userId}))
    // so we trigger a refresh. But is that even possible outside of tests?
    initIdSystem({
      refresh: true,
      submoduleNames: [submodule.name]
    });
  }
}
function normalizePromise(fn) {
  // for public methods that return promises, make sure we return a "normal" one - to avoid
  // exposing confusing stack traces
  return function () {
    return Promise.resolve(fn.apply(this, arguments));
  };
}

/**
 * test browser support for storage config types (local storage or cookie), initializes submodules but consentManagement is required,
 * so a callback is added to fire after the consentManagement module.
 * @param {{getConfig:function}} config
 */
function init(config) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$delay = _ref6.delay,
    delay = _ref6$delay === void 0 ? _src_utils_promise_js__WEBPACK_IMPORTED_MODULE_9__.GreedyPromise.timeout : _ref6$delay;
  ppidSource = undefined;
  submodules = [];
  configRegistry = [];
  addedUserIdHook = false;
  initializedSubmodules = [];
  initIdSystem = idSystemInitializer({
    delay: delay
  });
  if (configListener != null) {
    configListener();
  }
  submoduleRegistry = [];

  // listen for config userSyncs to be set
  configListener = config.getConfig('userSync', function (conf) {
    // Note: support for 'usersync' was dropped as part of Prebid.js 4.0
    var userSync = conf.userSync;
    ppidSource = userSync.ppid;
    if (userSync && userSync.userIds) {
      configRegistry = userSync.userIds;
      syncDelay = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isNumber)(userSync.syncDelay) ? userSync.syncDelay : DEFAULT_SYNC_DELAY;
      auctionDelay = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_6__.isNumber)(userSync.auctionDelay) ? userSync.auctionDelay : NO_AUCTION_DELAY;
      updateSubmodules();
      initIdSystem({
        ready: true
      });
    }
  });

  // exposing getUserIds function in global-name-space so that userIds stored in Prebid can be used by external codes.
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getUserIds = getUserIds;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getUserIdsAsEids = getUserIdsAsEids;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getEncryptedEidsForSource = normalizePromise(getEncryptedEidsForSource);
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().registerSignalSources = registerSignalSources;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().refreshUserIds = normalizePromise(refreshUserIds);
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getUserIdsAsync = normalizePromise(getUserIdsAsync);
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getUserIdsAsEidBySource = getUserIdsAsEidBySource;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().setUserIdentities = setUserIdentities;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().getUserIdentities = getUserIdentities;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().onSSOLogin = onSSOLogin;
  (0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.getGlobal)().onSSOLogout = onSSOLogout;
}

// init config update listener to start the application
init(_src_config_js__WEBPACK_IMPORTED_MODULE_17__.config);
(0,_src_hook_js__WEBPACK_IMPORTED_MODULE_11__.module)('userId', attachIdSystem);
function setOrtbUserExtEids(ortbRequest, bidderRequest, context) {
  var eids = (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_14__["default"])(context, 'bidRequests.0.userIdAsEids');
  if (eids && Object.keys(eids).length > 0) {
    (0,_src_utils_js__WEBPACK_IMPORTED_MODULE_24__.dset)(ortbRequest, 'user.ext.eids', eids);
  }
}
(0,_src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_25__.registerOrtbProcessor)({
  type: _src_pbjsORTB_js__WEBPACK_IMPORTED_MODULE_25__.REQUEST,
  name: 'userExtEids',
  fn: setOrtbUserExtEids
});
(0,_src_prebidGlobal_js__WEBPACK_IMPORTED_MODULE_15__.registerModule)('userId');

/***/ }),

/***/ "./src/adserver.js":
/*!*************************!*\
  !*** ./src/adserver.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPPID": function() { return /* binding */ getPPID; }
/* harmony export */ });
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");


/**
 * return the GAM PPID, if available (eid for the userID configured with `userSync.ppidSource`)
 */
var getPPID = (0,_hook_js__WEBPACK_IMPORTED_MODULE_0__.hook)('sync', function () {
  return undefined;
});

/***/ }),

/***/ "./src/pbjsORTB.js":
/*!*************************!*\
  !*** ./src/pbjsORTB.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REQUEST": function() { return /* binding */ REQUEST; },
/* harmony export */   "registerOrtbProcessor": function() { return /* binding */ registerOrtbProcessor; }
/* harmony export */ });
/* unused harmony exports PROCESSOR_TYPES, PROCESSOR_DIALECTS, IMP, BID_RESPONSE, RESPONSE, DEFAULT, PBS, processorRegistry, getProcessors */
var PROCESSOR_TYPES = ['request', 'imp', 'bidResponse', 'response'];
var PROCESSOR_DIALECTS = ['default', 'pbs'];
var REQUEST = PROCESSOR_TYPES[0],
  IMP = PROCESSOR_TYPES[1],
  BID_RESPONSE = PROCESSOR_TYPES[2],
  RESPONSE = PROCESSOR_TYPES[3];

var DEFAULT = PROCESSOR_DIALECTS[0],
  PBS = PROCESSOR_DIALECTS[1];

var types = new Set(PROCESSOR_TYPES);
function processorRegistry() {
  var processors = {};
  return {
    registerOrtbProcessor: function registerOrtbProcessor(_ref) {
      var type = _ref.type,
        name = _ref.name,
        fn = _ref.fn,
        _ref$priority = _ref.priority,
        priority = _ref$priority === void 0 ? 0 : _ref$priority,
        _ref$dialects = _ref.dialects,
        dialects = _ref$dialects === void 0 ? [DEFAULT] : _ref$dialects;
      if (!types.has(type)) {
        throw new Error("ORTB processor type must be one of: ".concat(PROCESSOR_TYPES.join(', ')));
      }
      dialects.forEach(function (dialect) {
        if (!processors.hasOwnProperty(dialect)) {
          processors[dialect] = {};
        }
        if (!processors[dialect].hasOwnProperty(type)) {
          processors[dialect][type] = {};
        }
        processors[dialect][type][name] = {
          priority: priority,
          fn: fn
        };
      });
    },
    getProcessors: function getProcessors(dialect) {
      return processors[dialect] || {};
    }
  };
}
var _processorRegistry = processorRegistry(),
  registerOrtbProcessor = _processorRegistry.registerOrtbProcessor,
  getProcessors = _processorRegistry.getProcessors;


/***/ }),

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/***/ (function(module, exports) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/crypto-js/md5.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/md5.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha1.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/sha1.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./modules/userId/index.js"));
/******/ }
]);
//# sourceMappingURL=userId.js.map
owpbjs.processQueue();
!(function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(i,r,function(t){return e[t]}.bind(null,r));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s="./src_new/owt.js")})({"./node_modules/prebid-universal-creative/dist/creative.js":function(){!(function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)})([(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getEmptyIframe=function(e,t){var n=document.createElement("iframe");return n.setAttribute("frameborder",0),n.setAttribute("scrolling","no"),n.setAttribute("marginheight",0),n.setAttribute("marginwidth",0),n.setAttribute("TOPMARGIN",0),n.setAttribute("LEFTMARGIN",0),n.setAttribute("allowtransparency","true"),n.setAttribute("width",t),n.setAttribute("height",e),n},t.insertElement=function(e,t,n){var i;t=t||document,i=n?t.getElementsByTagName(n):t.getElementsByTagName("head");try{(i=i.length?i:t.getElementsByTagName("body")).length&&(i=i[0]).insertBefore(e,i.firstChild)}catch(e){}}}),(function(e,t,n){"use strict";var i=n(2),r=n(5);window.ucTag=window.ucTag||{};var o=r.newEnvironment(window),a=i.newRenderingManager(window,o);window.ucTag.renderAd=a.renderAd}),(function(e,t,n){"use strict";function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function r(e){if(e&&e.__esModule)return e;var t=i();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(n,o,a):n[o]=e[o]}}return n.default=e,t&&t.set(e,n),n}Object.defineProperty(t,"__esModule",{value:!0}),t.newRenderingManager=function(e,t){function n(n){if(n){var i=n.split("x").map(Number);!(function(n,i){if(t.isSafeFrame()){var r=e.innerWidth,o=e.innerHeight;r===n&&o===i||(e.$sf.ext.register(n,i,(function(){var t=n-r,a=i-o;e.$sf.ext.expand({r:t,b:a,push:!0})})),e.parent.postMessage({sentinel:"amp",type:"embed-size",width:n,height:i},"*"))}})(i[0],i[1])}else console.log("Targeting key hb_size not found to resize creative")}function i(t,i,a,c,u,l){var p=2<arguments.length&&void 0!==a?a:"",g=3<arguments.length?c:void 0,f=4<arguments.length?u:void 0,m=5<arguments.length?l:void 0,E="Prebid_";if(p.substr(0,E.length)===E)!(function(t){var n=e.localStorage.getItem(t);r(!0)(n)})(p),n(g);else{var I="".concat(function(e,t){var n=void 0===t||""===t?d:t;return"https://".concat(void 0===e||""===e?s:e).concat(n)}(t,i),"?uuid=").concat(p);n(g),o.sendRequest(I,r(m,f))}}function r(t,n){return function(i){var r=(function(e){var t;try{t=JSON.parse(e)}catch(e){console.log("Error parsing response from cache host: ".concat(e))}return t})(i),s=r.price||n,d=o.getCreativeCommentMarkup(r),u=r.width?r.width:r.w,l=r.height?r.height:r.h;if(r.wurl&&o.triggerPixel(decodeURIComponent(r.wurl)),r.adm){if(r.adm=s?r.adm.replace("${AUCTION_PRICE}",s):r.adm.replace("${AUCTION_PRICE}",""),d+=t?c(r.adm,u,l):r.adm,r.nurl&&(d+=o.createTrackPixelHtml(decodeURIComponent(r.nurl))),r.burl){var p=function(){o.triggerPixel(r.burl)};t?o.loadScript(e,"mraid.js",(function(){!(function(t){function n(e){e>0&&(mraid.removeEventListener("exposureChange",n),t())}function i(e){e&&(mraid.removeEventListener("viewableChange",i),t())}function r(){e.MRAID_ENV&&3<=parseFloat(e.MRAID_ENV.version)?mraid.addEventListener("exposureChange",n):e.MRAID_ENV&&parseFloat(e.MRAID_ENV.version)<3&&(mraid.isViewable()?t():mraid.addEventListener("viewableChange",i))}return!(!e.mraid||!e.MRAID_ENV||("loading"==mraid.getState()?mraid.addEventListener("ready",(function o(){mraid.removeEventListener("ready",o),r()})):r(),0))})(p)&&p()}),p):p()}o.writeAdHtml(d)}else if(r.nurl)if(t)d+=c(o.loadScript(e,r.nurl).outerHTML,u,l),o.writeAdHtml(d);else{var g=r.nurl,f=o.getCreativeComment(r);a.insertElement(f,document,"body"),o.writeAdUrl(g,u,l)}}}function c(e,t,n){var i=o.getUUID();return'<div id="'.concat(i,'" style="border-style: none; position: absolute; width:100%; height:100%;">\n      <div id="').concat(i,'_inner" style="margin: 0 auto; width:').concat(t,"px; height:").concat(n,'px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">').concat(e,"</div>\n      </div>")}return{renderAd:function(n,r){var s=o.transformAuctionTargetingData(r);t.isMobileApp(s.env)?i(s.cacheHost,s.cachePath,s.uuid,s.size,s.hbPb,!0):t.isAmp(s.uuid)?i(s.cacheHost,s.cachePath,s.uuid,s.size,s.hbPb):t.canLocatePrebid()?(function(t,n){for(var i=e,r=0;10>r;r++)if((i=i.parent).pbjs)try{i.pbjs.renderAd(t,n);break}catch(t){continue}})(n,s.adId):(function(t,n,i){function r(n){var i=n.message?"message":"data",r={};try{r=JSON.parse(n[i])}catch(n){return}var o=n.origin||n.originalEvent.origin;if(r.message&&"Prebid Response"===r.message&&p===o&&r.adId===t&&(r.ad||r.adUrl)){var s=e.document.body,d=r.ad,c=r.adUrl,u=r.width,l=r.height;if("video"===r.mediaType)console.log("Error trying to write ad.");else if(d){var g=a.getEmptyIframe(r.height,r.width);s.appendChild(g),g.contentDocument.open(),g.contentDocument.write(d),g.contentDocument.close()}else if(c){var f=a.getEmptyIframe(l,u);f.style.display="inline",f.style.overflow="hidden",f.src=c,a.insertElement(f,document,"body")}else console.log("Error trying to write ad. No ad for bid response id: ".concat(id))}}var s,d=1<arguments.length&&void 0!==n?n:"",c=2<arguments.length?i:void 0,u=e.location,l=o.parseUrl(c),p=l.protocol+"://"+l.host,g=d||e.location.hostname,f=u.protocol+"//"+g;e.addEventListener("message",r,!1),s=JSON.stringify({message:"Prebid Request",adId:t,adServerDomain:f}),e.parent.postMessage(s,p)})(s.adId,s.adServerDomain,s.pubUrl)}}};var o=r(n(3)),a=r(n(0)),s="prebid.adnxs.com",d="/pbc/v1/cache"}),(function(e,t,n){"use strict";function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function r(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function o(e){return r(e,"String")}Object.defineProperty(t,"__esModule",{value:!0}),t.triggerPixel=function(e,t){var n=new Image;t&&"function"==typeof t&&(n.addEventListener("load",t),n.addEventListener("error",t)),n.src=e},t.createTrackPixelHtml=function(e){if(!e)return"";var t=encodeURI(e);return'<div style="position:absolute;left:0px;top:0px;visibility:hidden;"><img src="'.concat(t,'"></div>')},t.writeAdUrl=function(e,t,n){var i=a.getEmptyIframe(n,t);i.src=e,document.body.appendChild(i)},t.writeAdHtml=function(e){s(document.body,e,{error:console.error})},t.sendRequest=function(e,t){var n=new XMLHttpRequest;n.addEventListener("load",(function(){t(n.responseText)})),n.open("GET",e),n.send()},t.getUUID=function(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)}))},t.loadScript=function(e,t,n,i){var r=e.document,o=r.createElement("script");o.type="text/javascript",n&&"function"==typeof n&&(o.readyState?o.onreadystatechange=function(){"loaded"!==o.readyState&&"complete"!==o.readyState||(o.onreadystatechange=null,n())}:o.onload=function(){n()}),i&&"function"==typeof i&&(o.onerror=function(){i()}),o.src=t;var a=r.getElementsByTagName("head");return(a=a.length?a:r.getElementsByTagName("body")).length&&(a=a[0]).insertBefore(o,a.firstChild),o},t.getCreativeComment=function(e){return document.createComment("Creative ".concat(e.crid," served by Prebid.js Header Bidding"))},t.getCreativeCommentMarkup=function(e){var n=t.getCreativeComment(e),i=document.createElement("div");return i.appendChild(n),i.innerHTML},t.transformAuctionTargetingData=function(e){function t(t){return!(!e[t]||!(function(e){return r(e,"Object")}(e[t])&&0<Object.keys(e[t]).length||o(e[t])&&""!==e[t]))}var n={hb_adid:"adId",hb_cache_host:"cacheHost",hb_cache_path:"cachePath",hb_cache_id:"uuid",hb_format:"mediaType",hb_env:"env",hb_size:"size",hb_pb:"hbPb"},i={},a={};return t("targetingMap")?a=(function(e){var t={};return Object.keys(e).forEach((function(n){Array.isArray(e[n])&&0<e[n].length&&(t[n]=e[n][0])})),t})(e.targetingMap):t("targetingKeywords")&&(a=(function(e){var t={},n=e.split(",");return 0<n.length&&n.forEach((function(e){var n=e.split(":");if(2===n.length){var i=n[0],r=n[1];t[i]=r}})),t})(e.targetingKeywords)),(function(e){Object.keys(e).forEach((function(t){i[n[t]||t]=e[t]}))})(a),Object.keys(e).forEach((function(t){"targetingMap"!==t&&"targetingKeywords"!==t&&o(e[t])&&""!==e[t]&&(i[t]=e[t])})),i},t.parseUrl=function(e){var t=document.createElement("a");return t.href=decodeURIComponent(e),{href:t.href,protocol:(t.protocol||"").replace(/:$/,""),hostname:t.hostname,port:+t.port,pathname:t.pathname.replace(/^(?!\/)/,"/"),hash:(t.hash||"").replace(/^#/,""),host:(t.host||window.location.host).replace(/:(443|80)$/,"")}};var a=(function(e){if(e&&e.__esModule)return e;var t=i();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(n,o,a):n[o]=e[o]}}return n.default=e,t&&t.set(e,n),n})(n(0)),s=n(4)}),(function(e){var t;t=function(){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}return n={},e.m=t=[function(e,t,n){"use strict";var i,r=n(1),o=(i=r)&&i.__esModule?i:{"default":i};e.exports=o.default},function(e,t,n){"use strict";function i(){}function r(){var e=g.shift();if(e){var t=u.last(e);t.afterDequeue(),e.stream=function(e,t,n){function s(e){e=n.beforeWrite(e),f.write(e),n.afterWrite(e)}(f=new c.default(e,n)).id=p++,f.name=n.name||f.id,o.streams[f.name]=f;var d=e.ownerDocument,u={close:d.close,open:d.open,write:d.write,writeln:d.writeln};a(d,{close:i,open:i,write:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return s(t.join(""))},writeln:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return s(t.join("")+"\n")}});var l=f.win.onerror||i;return f.win.onerror=function(e,t,i){n.error({msg:e+" - "+t+": "+i}),l.apply(f.win,[e,t,i])},f.write(t,(function(){a(d,u),f.win.onerror=l,n.done(),f=null,r()})),f}.apply(void 0,e),t.afterStreamStart()}}function o(e,t,n){if(u.isFunction(n))n={done:n};else if("clear"===n)return g=[],f=null,void(p=0);n=u.defaults(n,l);var o=[e=/^#/.test(e)?window.document.getElementById(e.substr(1)):e.jquery?e[0]:e,t,n];return e.postscribe={cancel:function(){o.stream?o.stream.abort():o[1]=i}},n.beforeEnqueue(o),g.push(o),f||r(),e.postscribe}t.__esModule=!0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};t.default=o;var s,d=n(2),c=(s=d)&&s.__esModule?s:{"default":s},u=(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t})(n(4)),l={afterAsync:i,afterDequeue:i,afterStreamStart:i,afterWrite:i,autoFix:!0,beforeEnqueue:i,beforeWriteToken:function(e){return e},beforeWrite:function(e){return e},done:i,error:function(e){throw new Error(e.msg)},releaseAsync:!1},p=0,g=[],f=null;a(o,{streams:{},queue:g,WriteStream:c.default})},function(e,t,n){"use strict";function i(e,t){var n=l+t,i=e.getAttribute(n);return u.existy(i)?String(i):i}function r(e,t,n){var i=2<arguments.length&&void 0!==n?n:null,r=l+t;u.existy(i)&&""!==i?e.setAttribute(r,i):e.removeAttribute(r)}function o(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,o),this.root=e,this.options=t,this.doc=e.ownerDocument,this.win=this.doc.defaultView||this.doc.parentWindow,this.parser=new c.default("",{autoFix:t.autoFix}),this.actuals=[e],this.proxyHistory="",this.proxyRoot=this.doc.createElement(e.nodeName),this.scriptStack=[],this.writeQueue=[],r(this.proxyRoot,"proxyof",0)}t.__esModule=!0;var a,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},d=n(3),c=(a=d)&&a.__esModule?a:{"default":a},u=(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t})(n(4)),l="data-ps-",p="ps-style",g="ps-script",f=(o.prototype.write=function(){var e;for((e=this.writeQueue).push.apply(e,arguments);!this.deferredRemote&&this.writeQueue.length;){var t=this.writeQueue.shift();u.isFunction(t)?this._callFunction(t):this._writeImpl(t)}},o.prototype._callFunction=function(e){var t={type:"function",value:e.name||e.toString()};this._onScriptStart(t),e.call(this.win,this.doc),this._onScriptDone(t)},o.prototype._writeImpl=function(e){this.parser.append(e);for(var t=void 0,n=void 0,i=void 0,r=[];(t=this.parser.readToken())&&!(n=u.isScript(t))&&!(i=u.isStyle(t));)(t=this.options.beforeWriteToken(t))&&r.push(t);0<r.length&&this._writeStaticTokens(r),n&&this._handleScriptToken(t),i&&this._handleStyleToken(t)},o.prototype._writeStaticTokens=function(e){var t=this._buildChunk(e);return t.actual?(t.html=this.proxyHistory+t.actual,this.proxyHistory+=t.proxy,this.proxyRoot.innerHTML=t.html,this._walkChunk(),t):null},o.prototype._buildChunk=function(e){for(var t=this.actuals.length,n=[],i=[],r=[],o=e.length,a=0;o>a;a++){var s=e[a],d=s.toString();if(n.push(d),s.attrs){if(!/^noscript$/i.test(s.tagName)){var c=t++;i.push(d.replace(/(\/?>)/," "+l+"id="+c+" $1")),s.attrs.id!==g&&s.attrs.id!==p&&r.push("atomicTag"===s.type?"":"<"+s.tagName+" "+l+"proxyof="+c+(s.unary?" />":">"))}}else i.push(d),r.push("endTag"===s.type?d:"")}return{tokens:e,raw:n.join(""),actual:i.join(""),proxy:r.join("")}},o.prototype._walkChunk=function(){for(var e=void 0,t=[this.proxyRoot];u.existy(e=t.shift());){var n=1===e.nodeType;if(!n||!i(e,"proxyof")){n&&r(this.actuals[i(e,"id")]=e,"id");var o=e.parentNode&&i(e.parentNode,"proxyof");o&&this.actuals[o].appendChild(e)}t.unshift.apply(t,u.toArray(e.childNodes))}},o.prototype._handleScriptToken=function(e){var t=this,n=this.parser.clear();n&&this.writeQueue.unshift(n),e.src=e.attrs.src||e.attrs.SRC,(e=this.options.beforeWriteToken(e))&&(e.src&&this.scriptStack.length?this.deferredRemote=e:this._onScriptStart(e),this._writeScriptToken(e,(function(){t._onScriptDone(e)})))},o.prototype._handleStyleToken=function(e){var t=this.parser.clear();t&&this.writeQueue.unshift(t),e.type=e.attrs.type||e.attrs.TYPE||"text/css",(e=this.options.beforeWriteToken(e))&&this._writeStyleToken(e),t&&this.write()},o.prototype._writeStyleToken=function(e){var t=this._buildStyle(e);this._insertCursor(t,p),e.content&&(t.styleSheet&&!t.sheet?t.styleSheet.cssText=e.content:t.appendChild(this.doc.createTextNode(e.content)))},o.prototype._buildStyle=function(e){var t=this.doc.createElement(e.tagName);return t.setAttribute("type",e.type),u.eachKey(e.attrs,(function(e,n){t.setAttribute(e,n)})),t},o.prototype._insertCursor=function(e,t){this._writeImpl('<span id="'+t+'"/>');var n=this.doc.getElementById(t);n&&n.parentNode.replaceChild(e,n)},o.prototype._onScriptStart=function(e){e.outerWrites=this.writeQueue,this.writeQueue=[],this.scriptStack.unshift(e)},o.prototype._onScriptDone=function(e){e===this.scriptStack[0]?(this.scriptStack.shift(),this.write.apply(this,e.outerWrites),!this.scriptStack.length&&this.deferredRemote&&(this._onScriptStart(this.deferredRemote),this.deferredRemote=null)):this.options.error({msg:"Bad script nesting or script finished twice"})},o.prototype._writeScriptToken=function(e,t){var n=this._buildScript(e),i=this._shouldRelease(n),r=this.options.afterAsync;e.src&&(n.src=e.src,this._scriptLoadHandler(n,i?r:function(){t(),r()}));try{this._insertCursor(n,g),n.src&&!i||t()}catch(e){this.options.error(e),t()}},o.prototype._buildScript=function(e){var t=this.doc.createElement(e.tagName);return u.eachKey(e.attrs,(function(e,n){t.setAttribute(e,n)})),e.content&&(t.text=e.content),t},o.prototype._scriptLoadHandler=function(e,t){function n(){e=e.onload=e.onreadystatechange=e.onerror=null}function i(){n(),null!=t&&t(),t=null}function r(e){n(),a(e),null!=t&&t(),t=null}function o(e,t){var n=e["on"+t];null!=n&&(e["_on"+t]=n)}var a=this.options.error;o(e,"load"),o(e,"error"),s(e,{onload:function(){if(e._onload)try{e._onload.apply(this,Array.prototype.slice.call(arguments,0))}catch(t){r({msg:"onload handler failed "+t+" @ "+e.src})}t()},onerror:function(){if(e._onerror)try{e._onerror.apply(this,Array.prototype.slice.call(arguments,0))}catch(t){return void r({msg:"onerror handler failed "+t+" @ "+e.src})}r({msg:"remote script failed "+e.src})},onreadystatechange:function(){/^(loaded|complete)$/.test(e.readyState)&&i()}})},o.prototype._shouldRelease=function(e){return!/^script$/i.test(e.nodeName)||!!(this.options.releaseAsync&&e.src&&e.hasAttribute("async"))},o);t.default=f},function(e){var t;t=function(){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}return n={},e.m=t=[function(e,t,n){"use strict";var i,r=n(1),o=(i=r)&&i.__esModule?i:{"default":i};e.exports=o.default},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,r),this.stream=t;var i=!1,o={};for(var s in a)a.hasOwnProperty(s)&&(n.autoFix&&(o[s+"Fix"]=!0),i=i||o[s+"Fix"]);i?(this._readToken=c.default(this,o,(function(){return e._readTokenImpl()})),this._peekToken=c.default(this,o,(function(){return e._peekTokenImpl()}))):(this._readToken=this._readTokenImpl,this._peekToken=this._peekTokenImpl)}t.__esModule=!0;var o,a=i(n(2)),s=i(n(3)),d=n(6),c=(o=d)&&o.__esModule?o:{"default":o},u=n(5),l={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p=(r.prototype.append=function(e){this.stream+=e},r.prototype.prepend=function(e){this.stream=e+this.stream},r.prototype._readTokenImpl=function(){var e=this._peekTokenImpl();return e?(this.stream=this.stream.slice(e.length),e):void 0},r.prototype._peekTokenImpl=function(){for(var e in l)if(l.hasOwnProperty(e)&&l[e].test(this.stream)){var t=s[e](this.stream);if(t)return"startTag"===t.type&&/script|style/i.test(t.tagName)?null:(t.text=this.stream.substr(0,t.length),t)}},r.prototype.peekToken=function(){return this._peekToken()},r.prototype.readToken=function(){return this._readToken()},r.prototype.readTokens=function(e){for(var t=void 0;t=this.readToken();)if(e[t.type]&&!1===e[t.type](t))return},r.prototype.clear=function(){var e=this.stream;return this.stream="",e},r.prototype.rest=function(){return this.stream},r);for(var g in(t.default=p).tokenToString=function(e){return e.toString()},p.escapeAttributes=function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=u.escapeQuotes(e[n],null));return t},p.supports=a)a.hasOwnProperty(g)&&(p.browserHasFlaw=p.browserHasFlaw||!a[g]&&g)},function(e,t){"use strict";var n=!(t.__esModule=!0),i=!1,r=window.document.createElement("div");try{var o="<P><I></P></I>";r.innerHTML=o,t.tagSoup=n=r.innerHTML!==o}catch(e){t.tagSoup=n=!1}try{r.innerHTML="<P><i><P></P></i></P>",t.selfClose=i=2===r.childNodes.length}catch(e){t.selfClose=i=!1}r=null,t.tagSoup=n,t.selfClose=i},function(e,t,n){"use strict";function i(e){var t,n,i;if(-1!==e.indexOf(">")){var s=e.match(a.startTag);if(s){var d=(t={},n={},i=s[2],s[2].replace(a.attr,(function(e,r){arguments[2]||arguments[3]||arguments[4]||arguments[5]?arguments[5]?(t[arguments[5]]="",n[arguments[5]]=!0):t[r]=arguments[2]||arguments[3]||arguments[4]||a.fillAttr.test(r)&&r||"":t[r]="",i=i.replace(e,"")})),{v:new o.StartTagToken(s[1],s[0].length,t,n,!!s[3],i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""))});if("object"===(void 0===d?"undefined":r(d)))return d.v}}}t.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.comment=function(e){var t=e.indexOf("-->");return t>=0?new o.CommentToken(e.substr(4,t-1),t+3):void 0},t.chars=function(e){var t=e.indexOf("<");return new o.CharsToken(t>=0?t:e.length)},t.startTag=i,t.atomicTag=function(e){var t=i(e);if(t){var n=e.slice(t.length);if(n.match(new RegExp("</\\s*"+t.tagName+"\\s*>","i"))){var r=n.match(new RegExp("([\\s\\S]*?)</\\s*"+t.tagName+"\\s*>","i"));if(r)return new o.AtomicTagToken(t.tagName,r[0].length+t.length,t.attrs,t.booleanAttrs,r[1])}}},t.endTag=function(e){var t=e.match(a.endTag);return t?new o.EndTagToken(t[1],t[0].length):void 0};var o=n(4),a={startTag:/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,endTag:/^<\/([\-A-Za-z0-9_]+)[^>]*>/,attr:/(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,fillAttr:/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){i(this,r),this.type="comment",this.length=t||(e?e.length:0),this.text="",this.content=e}function o(e){i(this,o),this.type="chars",this.length=e,this.text=""}function a(e,t,n,r,o){i(this,a),this.type=e,this.length=n,this.text="",this.tagName=t,this.attrs=r,this.booleanAttrs=o,this.unary=!1,this.html5Unary=!1}function s(e,t,n,r,o,a){i(this,s),this.type="startTag",this.length=t,this.text="",this.tagName=e,this.attrs=n,this.booleanAttrs=r,this.html5Unary=!1,this.unary=o,this.rest=a}function d(e,t,n,r,o){i(this,d),this.type="atomicTag",this.length=t,this.text="",this.tagName=e,this.attrs=n,this.booleanAttrs=r,this.unary=!1,this.html5Unary=!1,this.content=o}function c(e,t){i(this,c),this.type="endTag",this.length=t,this.text="",this.tagName=e}t.__esModule=!0,t.EndTagToken=t.AtomicTagToken=t.StartTagToken=t.TagToken=t.CharsToken=t.CommentToken=t.Token=void 0;var u=n(5);t.Token=function p(e,t){i(this,p),this.type=e,this.length=t,this.text=""},t.CommentToken=(r.prototype.toString=function(){return"<!--"+this.content},r),t.CharsToken=(o.prototype.toString=function(){return this.text},o);var l=t.TagToken=(a.formatTag=function(e,t){var n=1<arguments.length&&void 0!==t?t:null,i="<"+e.tagName;for(var r in e.attrs)if(e.attrs.hasOwnProperty(r)){i+=" "+r;var o=e.attrs[r];void 0!==e.booleanAttrs&&void 0!==e.booleanAttrs[r]||(i+='="'+u.escapeQuotes(o)+'"')}return e.rest&&(i+=" "+e.rest),i+=e.unary&&!e.html5Unary?"/>":">",null!=n&&(i+=n+"</"+e.tagName+">"),i},a);t.StartTagToken=(s.prototype.toString=function(){return l.formatTag(this)},s),t.AtomicTagToken=(d.prototype.toString=function(){return l.formatTag(this,this.content)},d),t.EndTagToken=(c.prototype.toString=function(){return"</"+this.tagName+">"},c)},function(e,t){"use strict";t.__esModule=!0,t.escapeQuotes=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return e?e.replace(/([^"]*)"/g,(function(e,t){return/\\/.test(t)?t+'"':t+'\\"'})):t}},function(e,t){"use strict";function n(e){return e&&"startTag"===e.type&&(e.unary=r.test(e.tagName)||e.unary,e.html5Unary=!/\/>$/.test(e.text)),e}function i(e,t){var n=t.pop();e.prepend("</"+n.tagName+">")}t.__esModule=!0,t.default=function(e,t,r){function a(){var t=(function(e,t){var i=e.stream,r=n(t());return e.stream=i,r})(e,r);t&&d[t.type]&&d[t.type](t)}var s=(function(){var e=[];return e.last=function(){return this[this.length-1]},e.lastTagNameEq=function(e){var t=this.last();return t&&t.tagName&&t.tagName.toUpperCase()===e.toUpperCase()},e.containsTagName=function(e){for(var t,n=0;t=this[n];n++)if(t.tagName===e)return!0;return!1},e})(),d={startTag:function(n){var r=n.tagName;"TR"===r.toUpperCase()&&s.lastTagNameEq("TABLE")?(e.prepend("<TBODY>"),a()):t.selfCloseFix&&o.test(r)&&s.containsTagName(r)?s.lastTagNameEq(r)?i(e,s):(e.prepend("</"+n.tagName+">"),a()):n.unary||s.push(n)},endTag:function(n){s.last()?t.tagSoupFix&&!s.lastTagNameEq(n.tagName)?i(e,s):s.pop():t.tagSoupFix&&(r(),a())}};return function(){return a(),n(r())}};var r=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,o=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i}],e.c=n,e.p="",e(0);var t,n},e.exports=t()},function(e,t){"use strict";function n(e){return null!=e}function i(e,t,n){var i=void 0,r=e&&e.length||0;for(i=0;r>i;i++)t.call(n,e[i],i)}function r(e,t,n){for(var i in e)e.hasOwnProperty(i)&&t.call(n,i,e[i])}function o(e,t){return!(!e||"startTag"!==e.type&&"atomicTag"!==e.type||!("tagName"in e)||!~e.tagName.toLowerCase().indexOf(t))}t.__esModule=!0;var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.existy=n,t.isFunction=function(e){return"function"==typeof e},t.each=i,t.eachKey=r,t.defaults=function(e,t){return e=e||{},r(t,(function(t,i){n(e[t])||(e[t]=i)})),e},t.toArray=function(e){try{return Array.prototype.slice.call(e)}catch(t){var n=(function(){var t=[];return i(e,(function(e){t.push(e)})),{v:t}})();if("object"===(void 0===n?"undefined":a(n)))return n.v}},t.last=function(e){return e[e.length-1]},t.isTag=o,t.isScript=function(e){return o(e,"script")},t.isStyle=function(e){return o(e,"style")}}],e.c=n,e.p="",e(0);var t,n},e.exports=t()}),(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.newEnvironment=function(e){function t(){return e.top!==e&&!(function(e){try{return e.top.location.toString(),!0}catch(e){return!1}})(e)}return{isMobileApp:function(e){return e&&"mobile-app"===e},isCrossDomain:t,isSafeFrame:function(){return!(!e.$sf||!e.$sf.ext)},isAmp:function(e){return"string"==typeof e&&""!==e&&t()},canLocatePrebid:function(){for(var t=!1,n=e;!t;){try{if(n.pbjs){t=!0;break}}catch(t){}if(n===window.top)break;n=n.parent}return t}}}})])},"./src_new/adapterEntry.js":function(e,t,n){function i(e){this.adapterID=e,this.callInitiatedTime=r.getCurrentTimestampInMs(),this.bids={},this.lastBidID=""}var r=n("./src_new/util.js");i.prototype.getCallInitiatedTime=function(){return this.callInitiatedTime},i.prototype.getLastBidID=function(){return this.lastBidID},i.prototype.getBid=function(e){return r.isOwnProperty(this.bids,e)?this.bids[e]:null},i.prototype.setNewBid=function(e){delete this.bids[this.lastBidID];var t=e.getBidID();this.bids[t]=e,this.lastBidID=t},e.exports.AdapterEntry=i},"./src_new/adapters/prebid.js":function(e,t,n){function i(e,t,n){var i=n||e.regexPattern||void 0,r=V.createBid(e.bidderCode,t),o=parseInt(e.pubmaticServerErrorCode);return j.getAdServerCurrency()&&(K.isOwnProperty(e,"originalCpm")||(e.originalCpm=e.cpm),K.isOwnProperty(e,"originalCurrency")||(e.originalCurrency=K.getCurrencyToDisplay())),e.status==H.BID_STATUS.BID_REJECTED?r.setGrossEcpm(e.originalCpm,e.originalCurrency,K.getCurrencyToDisplay(),e.status):r.setGrossEcpm(e.cpm),r.setDealID(e.dealId),r.setDealChannel(e.dealChannel),r.setAdHtml(e.ad||""),r.setAdUrl(e.adUrl||""),r.setWidth(e.width),r.setHeight(e.height),r.setMi(e.mi),e.videoCacheKey&&r.setVastCache(e.videoCacheKey),e.vastUrl&&r.setVastUrl(e.vastUrl),e.vastXml&&r.setVastUrl(e.vastUrl),e.renderer&&r.setRenderer(e.renderer),e.native&&r.setNative(e.native),i&&r.setRegexPattern(i),e.mediaType==H.FORMAT_VALUES.VIDEO&&(e.videoCacheKey&&r.setcacheUUID(e.videoCacheKey),r.updateBidId(e.adUnitCode)),e.mediaType&&(parseFloat(e.cpm)>0||e.status==H.BID_STATUS.BID_REJECTED)&&r.setAdFormat(e.adHtml,e.mediaType),e.sspID&&r.setsspID(e.sspID),r.setReceivedTime(e.responseTimestamp),r.setServerSideResponseTime(e.serverSideResponseTime),j.getAdServerCurrency()&&(r.setOriginalCpm(window.parseFloat(e.originalCpm)),r.setOriginalCurrency(e.originalCurrency),K.isFunction(e.getCpmInNewCurrency)?r.setAnalyticsCpm(window.parseFloat(e.getCpmInNewCurrency(H.COMMON.ANALYTICS_CURRENCY)),e.status):r.setAnalyticsCpm(r.getGrossEcpm(),e.status)),1===o||2===o||6===o||11===o||12===o?(r.setDefaultBidStatus(-1),r.setWidth(0),r.setHeight(0)):3===o||4===o||5===o?(r.setDefaultBidStatus(0),0===r.isServerSide&&r.setPostTimeoutStatus()):o&&r.setDefaultBidStatus(1),K.forEachOnObject(e.adserverTargeting,(function(e,t){"hb_format"!==e&&"hb_source"!==e&&r.setKeyValuePair(e,t)})),r.setPbBid(e),r}function r(e,t){var n={responseKGPV:"",responseRegex:""};t.kgpvs.length>0&&t.kgpvs.forEach((function(t){e.bidderCode==t.adapterID&&(n.responseKGPV=t.kgpv,n.responseRegex=t.regexPattern)}));var i=n.responseKGPV.split("@"),r=1,o=!1;if(i&&(2==i.length||3==i.length&&(r=2)&&(o=!0))&&"video"!=e.mediaType){var a=i[r],s=null;i[r].indexOf(":")>0&&(a=i[r].split(":")[0],s=i[r].split(":")[1]),e.getSize()&&e.getSize()!=a&&"0X0"!=e.getSize().toUpperCase()&&(i[0].toUpperCase()==a.toUpperCase()&&(i[0]=e.getSize().toLowerCase()),n.responseKGPV=o?i[0]+"@"+i[1]+"@"+e.getSize():i[0]+"@"+e.getSize(),s&&(n.responseKGPV=n.responseKGPV+":"+s))}return n}function o(e){var t=e.adUnitCode||"";if(K.isOwnProperty(Q.kgpvMap,t)){if(e.floorData&&(window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID].floorResponseData=e.floorData),"pubmaticServer"===e.bidderCode&&(e.bidderCode=e.originalBidder),Q.isSingleImpressionSettingEnabled){var n=Q.checkAndModifySizeOfKGPVIfRequired(e,Q.kgpvMap[t]);Q.kgpvMap[t].kgpv=n.responseKGPV,Q.kgpvMap[t].regexPattern=n.responseRegex}if(e.bidderCode&&j.isServerSideAdapter(e.bidderCode)){var i=Q.kgpvMap[t].divID;if(!Q.isSingleImpressionSettingEnabled){var r=Q.getPBCodeWithWidthAndHeight(i,e.bidderCode,e.width,e.height),o=Q.getPBCodeWithoutWidthAndHeight(i,e.bidderCode);if(K.isOwnProperty(Q.kgpvMap,r))t=r;else{if(!K.isOwnProperty(Q.kgpvMap,o))return K.logWarning("Failed to find kgpv details for S2S-adapter:"+e.bidderCode),void 0;t=o}}e.ss=j.isServerSideAdapter(e.bidderCode)?1:0}e.bidderCode&&(e.timeToRespond<j.getTimeout()-H.CONFIG.TIMEOUT_ADJUSTMENT&&K.handleHook(H.HOOKS.BID_RECEIVED,[Q.kgpvMap[t].divID,e]),Y.setBidFromBidder(Q.kgpvMap[t].divID,Q.transformPBBidToOWBid(e,Q.kgpvMap[t].kgpv,Q.kgpvMap[t].regexPattern)))}else K.logWarning("Failed to find pbBid.adUnitCode in kgpvMap, pbBid.adUnitCode:"+e.adUnitCode)}function a(e){e.bids.forEach((function(e){window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID]||(window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID]={}),window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID].floorRequestData=e.floorData
var s=t.createElement("script");s.type="text/javascript",s.crossorigin="anonymous",s.async=!0,s.src="https://content.zeotap.com/sdk/idp.min.js",s.onload=function(){},t=t.getElementsByTagName("script")[0];var d={partnerId:e.partnerId,allowIDP:!0,useConsent:a.getCCPA()||a.getGdpr(),checkForCMP:a.getCCPA()||a.getGdpr()};t.parentNode.insertBefore(s,t),t=n.zeotap||{_q:[],_qcmp:[]},!(function(e,t,n){for(var i=0;i<t.length;i++)!(function(t){e[t]=function(){e[n].push([t].concat(Array.prototype.slice.call(arguments,0)))}})(t[i])})(t,["callMethod"],"_q"),n.zeotap=t,n.zeotap.callMethod("init",d),n.zeotap.callMethod("setUserIdentities",o,!0)}"complete"==document.readyState?t():window.addEventListener("load",(function(){setTimeout(t,1e3)}))},t.initLauncherJs=function(e){function t(){var t=document.createElement("script"),n=w.getPublinkLauncherParams(e);t.onload=function(){window.conversant.getLauncherObject=function(){return n},window.conversant&&window.conversant.launch("publink","start",n)},t.src="https://secure.cdn.fastclick.net/js/cnvr-launcher/latest/launcher-stub.min.js",document.body.appendChild(t)}window.cnvr_launcher_options={lid:e.params.launcher_id},"complete"==document.readyState?t():window.addEventListener("load",(function(){setTimeout(t,1e3)}))},t.getRandomNumberBelow100=function(){return Math.floor(100*Math.random())},t.getUpdatedKGPVForVideo=function(e,t){if(t==s.FORMAT_VALUES.VIDEO){var n=["","0x0"],i=e.split("@");if(i.length>1){if(2==i.length){if(i[1].indexOf(":")>-1){var r=i[1].split(":");n[1]=n[1]+":"+r[1]}n[0]=i[0]}e=n.join("@")}}return e},t.applyDataTypeChangesIfApplicable=function(e){var t;if(e.name in s.SPECIAL_CASE_ID_PARTNERS)for(partnerName in s.SPECIAL_CASE_ID_PARTNERS)if(partnerName===e.name)for(key in s.SPECIAL_CASE_ID_PARTNERS[partnerName]){var n=e[key];switch(s.SPECIAL_CASE_ID_PARTNERS[partnerName][key]){case"number":n&&"number"!=typeof n&&(t=parseInt(n),isNaN(t)?w.logError(partnerName+": Invalid parameter value '"+n+"' for parameter "+key):e[key]=t);break;case"array":if(n)if("string"==typeof n){var i=n.split(",").map((function(e){return e.trim()}));i.length>0&&(e[key]=i)}else"number"==typeof n&&(e[key]=[n]);break;case"customObject":n&&"params.requestedAttributesOverrides"===key&&(e[key]={uid2:"true"===n||"1"===n});break;default:return}}},t.applyCustomParamValuesfApplicable=function(e){if(e.name in s.ID_PARTNERS_CUSTOM_VALUES)for(var t=s.ID_PARTNERS_CUSTOM_VALUES[e.name],n=0;n<t.length;n++)e[t[n].key]||(e[t[n].key]=t[n].value)},t.getBrowserDetails=function(){return u.getBrowser().toString()},t.getPltForFloor=function(){return w.getDevicePlatform().toString()}}});