import React from "react";

class Seat extends React.Component{
    constructor(props){
        super(props);
    }

    toggleSelect = (e) => {
        e.preventDefault();
        this.props.selectSeat(this.props.row, this.props.seat);
    }

    render(){
     
        let availSel = this.props.selected ? "selected" : 
            !this.props.available ? "unavailable" : 
                !this.props.reserved ? "available" : "reserved";
        
        // let reserved = this.props.reserved ? this.props.name : "Available"

        return(
            <div 
            style={{border: "1px solid black", height: "50px", width: "50px"}}
            onClick={(e)=>this.toggleSelect(e)}
            className={availSel}
            >
                <span>Seat</span>
                {/* <img src="https://img.icons8.com/ultraviolet/40/000000/theatre-seat.png"/> */}
                {/* {reserved} */}
            </div>
        )
    }
}

export default Seat;