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
     
        const availSel = this.props.selected ? "selected ttContainer" : 
            !this.props.available ? "unavailable ttContainer" : 
                !this.props.reserved ? "available ttContainer" : "reserved ttContainer";
        

        const ttUnavailable = `Row ${this.props.row}, Seat ${this.props.seat} 
            Unavailable`;
        const ttReserved = `Row ${this.props.row}, Seat ${this.props.seat} 
            Reserved for ${this.props.name}`;
        const ttAvailable = `Row ${this.props.row}, Seat ${this.props.seat} 
            Available`;
 
        const tooltip = !this.props.available ? ttUnavailable : 
            this.props.reserved ? ttReserved : ttAvailable;
    
        return(
            <div 
            style={{border: "1px solid black", height: "50px", width: "50px"}}
            onClick={(e)=>this.toggleSelect(e)}
            className={availSel}
            >
                <span>Seat</span>
                {this.props.available ? <img src="https://img.icons8.com/ultraviolet/40/000000/theatre-seat.png"/> : null}
                <div className="tooltip">
                    {tooltip}
                </div>
            </div>
        )
    }
}

export default Seat;