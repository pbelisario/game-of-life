import './gameOfLife.css'

import Board from './board'
import React from 'react'

export default class GameOfLife extends React.Component {
    constructor (props) {
        super(props)
        this.speed = 100;
        this.rows = 20;
        this.cols = 36;
        this.state = {
            generation: 0,
            grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))

        }
    }


    selectBox = (row, col) => {
        let copyGrid = cloneArr(this.state.grid)
        copyGrid[row][col] = !copyGrid[row][col]
        this.setState({
            grid: copyGrid
        })
    }

    gliderCannon = () => {
        this.clear()
        let copyGrid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        // Left base
        copyGrid[10][0] = true
        copyGrid[10][1] = true
        copyGrid[9][0] = true
        copyGrid[9][1] = true

        // Left Beam
        copyGrid[9][10] = true
        copyGrid[10][10] = true
        copyGrid[11][10] = true
        
        copyGrid[8][11] = true
        copyGrid[12][11] = true
        
        copyGrid[7][12] = true
        copyGrid[7][13] = true
        copyGrid[13][12] = true
        copyGrid[13][13] = true
        
        copyGrid[10][14] = true
        copyGrid[8][15] = true
        copyGrid[12][15] = true
        copyGrid[9][16] = true
        copyGrid[10][16] = true
        copyGrid[11][16] = true
        copyGrid[10][17] = true

        // Right base
        copyGrid[8][34] = true
        copyGrid[8][35] = true
        copyGrid[7][34] = true
        copyGrid[7][35] = true

        //Right Beam
        copyGrid[9][20] = true
        copyGrid[9][21] = true
        copyGrid[8][20] = true
        copyGrid[8][21] = true
        copyGrid[7][20] = true
        copyGrid[7][21] = true
        
        copyGrid[6][22] = true
        copyGrid[10][22] = true
        
        copyGrid[5][24] = true
        copyGrid[6][24] = true
        copyGrid[10][24] = true
        copyGrid[11][24] = true

        this.setState({
            grid: copyGrid
        })
        this.start()
    }

    randomize = () => {
        this.clear()
        let copyGrid = cloneArr(this.state.grid);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j ++) {
                if (Math.random() > 0.78) {
                    copyGrid[i][j] = true
                }
            }
        }
        this.setState({
            grid: copyGrid
        })
        this.start()
    }

    clear = () => {
        this.pause()
        var new_grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			grid: new_grid,
			generation: 0
		});
    }

    pause = () => {
        clearInterval(this.intervalId)
    }

    play = () => {
        let o_grid = this.state.grid;
        let c_grid = cloneArr(this.state.grid);

        for (let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++){
                let beings = 0;
                if (row > 0) if (o_grid[row-1][col]) beings++;
                if (row > 0 && col > 0) if (o_grid[row-1][col-1]) beings++;
                if (row > 0 && col < this.cols - 1) if (o_grid[row-1][col+1]) beings++;
                if (col < this.cols -1) if (o_grid[row][col+1]) beings++;
                if (col > 0) if (o_grid[row][col-1]) beings++;
                if (row < this.rows - 1) if (o_grid[row+1][col]) beings++;
                if (row < this.rows - 1 && col > 0) if (o_grid[row+1][col-1]) beings++;
                if (row < this.rows - 1 && col < this.cols - 1) if (o_grid[row+1][col+1]) beings++;
                if (o_grid[row][col] && (beings < 2 || beings > 3)) c_grid[row][col] = false;
                if (!o_grid[row][col] && beings === 3) c_grid[row][col] = true;
            }
        }
        this.setState({
            grid: c_grid,
            generation: this.state.generation + 1
        });
    }

    start() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    

    componentDidMount() {
        this.randomize()
    }

    render() {
        return (<div className='canvas-ish'>
                    <div className='button-area'>
                        <ul className='buttons-list'>
                            <li><h1>Game of Life</h1></li>
                            <li><button onClick={() => this.randomize()}>Create an Random Board</button></li>
                            <li><button onClick={() => this.gliderCannon()}>Create a Glider Cannon</button></li>
                            <li><a href='http://pbelisario.github.io/portfolio' className='button'><button>Return</button></a></li>
                        </ul>
                    </div>
                    <div className='board'>
                        <Board 
                                grid={this.state.grid}
                                rows={this.rows}
                                cols={this.cols}
                                selectBox={this.selectBox}
                                className='board'/>
                    </div>
                    
                    <h2>Generations: {this.state.generation}</h2>
                </div>
        );
    }
}




function cloneArr(arr) {
    return JSON.parse(JSON.stringify(arr));
}