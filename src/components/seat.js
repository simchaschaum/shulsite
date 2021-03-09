import React from "react";

class Seat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selected: false
        }
    }

    toggleSelect = (e) => {
        e.preventDefault();
        this.setState({selected: this.state.selected ? false : true});
        this.props.selectSeat(this.props.row, this.props.seat);
    }

    render(){

        let bool = this.state.selected ? "selected" : "unselected"

        return(
            <div 
            style={{border: "1px solid black", height: "50px", width: "50px"}}
            onClick={(e)=>this.toggleSelect(e)}
            className={bool}
            >seat</div>
        )
    }
}

export default Seat;