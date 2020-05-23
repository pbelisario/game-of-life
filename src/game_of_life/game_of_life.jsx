import Board from './board'
import React from 'react'

export default class GameOfLife extends React.Component {
    constructor (props) {
        super(props)
        this.speed = 100;
        this.rows = 30;
        this.cols = 30;
        this.state = {
            generation: 0,
            grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))

        }
    }


    selectBox = (row, col) => {
        let copyGrid = cloneArr(this.state.grid)
        console.log(row, col, copyGrid)
        copyGrid[row][col] = !copyGrid[row][col]
        this.setState({
            grid: copyGrid
        })
    }

    randomize = () => {
        let copyGrid = cloneArr(this.state.grid);
        for (let i = 0; i < this.rows; i++){
            for (let j; j < this.cols; j ++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    copyGrid[i][j] = true
                }
            }
        }
        this.setState({
            grid: copyGrid
        })
        console.log('THACA')
    }

    componentDidMount() {
        this.randomize()
        console.log('oi', this.state.grid)
    }

    render() {
        return (<div>
                <Board 
                        grid={this.state.grid}
                        rows={this.rows}
                        cols={this.cols}
                        selectBox={this.selectBox}/>
                <h2>Generations: {this.state.generation}</h2>
                </div>
        );
    }
}




function cloneArr(arr) {
    return JSON.parse(JSON.stringify(arr));
}