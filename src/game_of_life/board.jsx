import './board.css'

import React from 'react'

export default class Board extends React.Component {
    render() {
        const width = (this.props.cols * 14);
        var rowsArray = [];

        var boxClass = "";

        for (var i = 0; i < this.props.rows; i++){
            for (var j = 0; j < this.props.cols; j++){
                let boxId = i+'_'+j;
                boxClass = this.props.grid[i][j] ? 'box on ': 'box off';
                rowsArray.push(<Box 
                                boxClass={boxClass}
                                key={boxId}
                                boxId={boxId}
                                row={i}
                                col={j}
                                selectBox={this.props.selectBox}
                                />);
            }
        }

        return (
            <div className='grid' style = {{width: width}}>
                {rowsArray}
            </div>
        )

    }
}

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }
    render() {
        return (
            <div className={this.props.boxClass}
                 id = {this.props.id}
                 onClick={this.props.selectBox}
            />
        )
    }
}