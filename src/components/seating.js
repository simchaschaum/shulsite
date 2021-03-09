import React  from "react";
// import {db, seats} from "../utils/firebase";
// import {firebaseArrMaker} from "../utils/fbtools";
import Seat from "./seat";

class Seating extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rows:[],     // the rows, made up of seats (based on the numebr of rows and seats in the state below)
            seatingInfo:{
                rowsNum: 5,
                seatsPerRowNum: 10
            },
            selectedSeats:[]
        }
    }
    
    componentDidMount(){
        // db.collection("seats")
        //     .get()
        //     .then(snapshot => {
        //         const seats = firebaseArrMaker(snapshot);
        //         this.setState({seats: seats}, ()=>console.log(this.state.seats));

        //     })
        this.makeSeatChart();
    }
    
    makeSeatChart = () => {
        let rows = [];
        for(var r = 0; r < this.state.seatingInfo.rowsNum; r++){
            let seats = [];
            for (var s = 0; s < this.state.seatingInfo.seatsPerRowNum; s++){
                seats.push({
                    r: r + 1,
                    s: s + 1,
                    selected: false
                })
            }
            rows.push(seats);

        }
        this.setState({rows: rows});
    }

    selectSeat = (r,s) => {
        let editedArr = this.state.rows;
        // check if seat is selected=true in state.selectedseats.
        //if true, mark false; if false, mark true --> variable
        let bool = this.state.rows[r-1][s-1].selected ? false : true;
        //put variable in new object
        let obj = {
            r:r,
            s:s,
            selected:bool
        }
        // replace old object in array with new object
        editedArr[r-1].splice(s-1,1,obj);
        // replace the array with changed array in the state
        this.setState({rows: editedArr});
    }

    render(){
        // Mapping the rows and seats per row to create the chart.  Number or rows and seats per row is controlled by state.
        const row = this.state.rows.map((row,i) => (<div className="row" key={i+1}>{
            row.map((seat,i) => (<div className="seat" key={i+1}>{
                <Seat 
                    row={seat.r}
                    seat={seat.s}
                    selectSeat={(r,s)=>this.selectSeat(r,s)}
                    />
                }</div>))
        }</div>));  

        return(
        <div className="seatingContainer">
            <h1>Seats</h1>
            <p>Rows: {this.state.seatingInfo.rowsNum}; Seats Per Row: {this.state.seatingInfo.seatsPerRowNum}</p>
            <div className="seatingChart">
             {row}
            </div>
        </div>
        )
    }
};

export default Seating;