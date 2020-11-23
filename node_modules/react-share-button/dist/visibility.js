'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visibility = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutoBind = require('react-auto-bind');

var _reactAutoBind2 = _interopRequireDefault(_reactAutoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Visibility = exports.Visibility = function (_Component) {
  _inherits(Visibility, _Component);

  function Visibility(props) {
    _classCallCheck(this, Visibility);

    var _this = _possibleConstructorReturn(this, (Visibility.__proto__ || Object.getPrototypeOf(Visibility)).call(this, props));

    (0, _reactAutoBind2.default)(_this);
    _this.winOut = false;
    _this.timer = null;
    return _this;
  }

  _createClass(Visibility, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.visibilityChange = null;
      this.hiddenProp = null;
      this.addVisibility();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.visibilityChange) {
        document.removeEventListener(this.visibilityChange, this.onVisibilitychange, false);
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: 'onVisibilitychange',
    value: function onVisibilitychange() {
      switch (document[this.hiddenProp]) {
        case 'visible':
          this.onWinFocus();
          break;
        case 'hidden':
          this.onWinBlur();
          break;
      }
    }
  }, {
    key: 'onWinBlur',
    value: function onWinBlur() {
      this.winOut = true;
      this.props.onWinBlur();
    }
  }, {
    key: 'onWinFocus',
    value: function onWinFocus() {
      if (this.winOut) {
        this.winOut = false;
        this.props.onWinFocus();
      }
    }
  }, {
    key: 'isHidden',
    value: function isHidden() {
      return document[this.hiddenProp] === 'hidden';
    }
  }, {
    key: 'iOSFallback',
    value: function iOSFallback() {
      if (document.body.dataset.os === 'iOS') {
        this.onWinBlur();
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.timer = setInterval(this.onWinFocus, 3000);
      }
    }
  }, {
    key: 'addVisibility',
    value: function addVisibility() {
      if (this.visibilityChange) {
        document.removeEventListener(this.visibilityChange, this.onVisibilitychange, false);
      }

      var hidden = void 0,
          visibilityState = void 0,
          visibilityChange = void 0;

      if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
        visibilityState = 'visibilityState';
      } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
        visibilityState = 'mozVisibilityState';
      } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
        visibilityState = 'msVisibilityState';
      } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
        visibilityState = 'webkitVisibilityState';
      }

      if (typeof document.addEventListener === 'undefined' || typeof hidden === 'undefined') {
        return;
      }

      this.visibilityChange = visibilityChange;
      this.hiddenProp = visibilityState;

      document.addEventListener(visibilityChange, this.onVisibilitychange, false);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return Visibility;
}(_react.Component);

Visibility.propTypes = {
  onWinFocus: _react.PropTypes.func,
  onWinBlur: _react.PropTypes.func
};

Visibility.defaultProps = {
  onWinFocus: function onWinFocus() {},
  onWinBlur: function onWinBlur() {}
};

exports.default = Visibility;