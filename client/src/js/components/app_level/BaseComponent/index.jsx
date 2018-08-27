import { Component } from 'react';

export default class BaseComponent extends Component {
  bindMethod(...methods) {
    methods.forEach((method) => { this[method] = this[method].bind(this) });
  }
}
