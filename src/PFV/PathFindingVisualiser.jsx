import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from './Algorithm/dijkstra';
import SplitText from '../blocks/TextAnimations/SplitText/SplitText';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';

import './PathFindingVisualiser.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathFindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      currentMode: 'wall', // 'wall', 'start', 'target'
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL,
      finishNodeRow: FINISH_NODE_ROW,
      finishNodeCol: FINISH_NODE_COL,
    };
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const { currentMode, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    
    // Prevent modifying start or finish nodes unless in respective modes
    if (row === startNodeRow && col === startNodeCol && currentMode !== 'start') return;
    if (row === finishNodeRow && col === finishNodeCol && currentMode !== 'target') return;
    
    let newGrid = this.state.grid.slice();
    
    if (currentMode === 'wall') {
      newGrid = getNewGridWithWallToggled(newGrid, row, col);
    } else if (currentMode === 'start') {
      // Clear previous start node
      const prevStartNode = newGrid[startNodeRow][startNodeCol];
      const newPrevStartNode = {
        ...prevStartNode,
        isStart: false,
      };
      newGrid[startNodeRow][startNodeCol] = newPrevStartNode;
      
      // Set new start node
      const newStartNode = newGrid[row][col];
      const updatedNewStartNode = {
        ...newStartNode,
        isStart: true,
        isWall: false,
        isFinish: false,
      };
      newGrid[row][col] = updatedNewStartNode;
      
      this.setState({
        startNodeRow: row,
        startNodeCol: col,
      });
    } else if (currentMode === 'target') {
      // Clear previous finish node
      const prevFinishNode = newGrid[finishNodeRow][finishNodeCol];
      const newPrevFinishNode = {
        ...prevFinishNode,
        isFinish: false,
      };
      newGrid[finishNodeRow][finishNodeCol] = newPrevFinishNode;
      
      // Set new finish node
      const newFinishNode = newGrid[row][col];
      const updatedNewFinishNode = {
        ...newFinishNode,
        isFinish: true,
        isWall: false,
        isStart: false,
      };
      newGrid[row][col] = updatedNewFinishNode;
      
      this.setState({
        finishNodeRow: row,
        finishNodeCol: col,
      });
    }
    
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const { currentMode, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    
    // Only allow drawing walls when dragging
    if (currentMode !== 'wall') return;
    
    // Prevent overwriting start or finish nodes
    if (row === startNodeRow && col === startNodeCol) return;
    if (row === finishNodeRow && col === finishNodeCol) return;
    
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const {startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = this.state;
    
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        
        // Preserve start and finish nodes
        if (node.row === startNodeRow && node.col === startNodeCol) {
          nodeElement.className = 'node node-visited node-start';
        } else if (node.row === finishNodeRow && node.col === finishNodeCol) {
          nodeElement.className = 'node node-visited node-finish';
        } else {
          nodeElement.className = 'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const {startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = this.state;
    
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        
        // Preserve start and finish nodes
        if (node.row === startNodeRow && node.col === startNodeCol) {
          nodeElement.className = 'node node-shortest-path node-start';
        } else if (node.row === finishNodeRow && node.col === finishNodeCol) {
          nodeElement.className = 'node node-shortest-path node-finish';
        } else {
          nodeElement.className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  setMode(mode) {
    this.setState({ currentMode: mode });
  }
  
  resetGrid() {
    const grid = getInitialGrid();
    this.setState({
      grid,
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL,
      finishNodeRow: FINISH_NODE_ROW,
      finishNodeCol: FINISH_NODE_COL,
      currentMode: 'wall',
      mouseIsPressed: false
    });
    
    // Clear all node classes
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = document.getElementById(`node-${row}-${col}`);
        if (node) {
          if (row === START_NODE_ROW && col === START_NODE_COL) {
            node.className = 'node node-start';
          } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            node.className = 'node node-finish';
          } else {
            node.className = 'node';
          }
        }
      }
    }
  }
  
  render() {
    const {grid, mouseIsPressed, currentMode} = this.state;

    return (
      <div className="pathfinding-visualizer">
        <div className="header">
          <SplitText 
            text="Pathfinding Visualizer" 
            className="header-title"
            splitType="chars"
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            ease="power4.out"
          />
        </div>
        
        <div className="controls">
          <button 
            className="button button-primary"
            onClick={() => this.visualizeDijkstra()}>
            ▶ Visualize Dijkstra's Algorithm
          </button>
          
          <button 
            className={`button ${currentMode === 'start' ? 'button-active' : ''}`}
            onClick={() => this.setMode('start')}>
            ◎ Set Start Point
          </button>
          
          <button 
            className={`button ${currentMode === 'target' ? 'button-active' : ''}`}
            onClick={() => this.setMode('target')}>
            ◉ Set Target Point
          </button>
          
          <button 
            className={`button ${currentMode === 'wall' ? 'button-active' : ''}`}
            onClick={() => this.setMode('wall')}>
            ≡ Draw Walls
          </button>
          
          <button 
            className="button button-danger"
            onClick={() => this.resetGrid()}>
            🗑 Reset Grid
          </button>
        </div>
        
        <div className="mode-indicator">
          Current Mode: {currentMode === 'wall' ? 'Drawing Walls' : 
                        currentMode === 'start' ? 'Setting Start Point' : 
                        'Setting Target Point'}
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color legend-start"></div>
            <span>Start Node</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-target"></div>
            <span>Target Node</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-wall"></div>
            <span>Wall</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-visited"></div>
            <span>Visited Node</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-path"></div>
            <span>Shortest Path</span>
          </div>
        </div>
        
        <div className="grid" ref={this.gridRef}>
          <ClickSpark 
            sparkColor="#rgb(249, 95, 135)" 
            sparkSize={12} 
            sparkRadius={20} 
            sparkCount={10} 
            duration={500} 
            extraScale={1.2}>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
          </ClickSpark>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};