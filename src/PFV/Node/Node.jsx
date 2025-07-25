import React, {Component} from 'react';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
        {isStart && <FaLocationCrosshairs className="node-icon start-icon" />}
        {isFinish && <FaLocationDot className="node-icon finish-icon" />}
      </div>
    );
  }
}