import React  from "react";
// import {db, seats} from "../utils/firebase";
// import {firebaseArrMaker} from "../utils/fbtools";
import Seat from "./seat";

class Seating extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rows:[],     // the rows, made up of seats (based on the number of rows and seats in the state below)
            rowsNum: 8,
            seatsPerRowNum: 8,
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
        for(var r = 0; r < this.state.rowsNum; r++){
            let seats = [];
            for (var s = 0; s < this.state.seatsPerRowNum; s++){
                seats.push({
                    r: r + 1,
                    s: s + 1,
                    selected: false,
                    available: true,
                    reserved: false,
                    name: ""
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
        let sel = this.state.rows[r-1][s-1].selected ? false : true;
        //put variable in new object and reconstrct the new object
        let avail = this.state.rows[r-1][s-1].available;
        let res = this.state.rows[r-1][s-1].reserved;
        let name = this.state.rows[r-1][s-1].name;
        let obj = {
            r:r,
            s:s,
            selected:sel,
            available: avail,
            reserved: res,
            name: name
        }
        // replace old object in array with new object
        editedArr[r-1].splice(s-1,1,obj);
        // replace the array with changed array in the state
        this.setState({rows: editedArr});
    }

    toggleAvailable = (e) => {
        e.preventDefault();
        let avail = (e.target.value=== "true");
        let res = this.state.rows[r-1][s-1].reserved;
        let name = this.state.rows[r-1][s-1].name;
        let editedArr = this.state.rows;
    // loop through array of rows, then seats;
    // if each seat's availability does not match 'avail' (the desired availabiilty status), create a new seat object, replace the current seat object
        for(var r=0; r<editedArr.length; r++){
            for(var s=0; s<editedArr[r].length; s++){
                if(editedArr[r][s].selected && editedArr[r][s].available !== avail){
                    let obj = {
                        r:r+1,
                        s:s+1,
                        selected:false,
                        available: avail,
                        reserved: res,
                        name: name
                    }
                    editedArr[r].splice(s,1,obj);
                } 
            }
        }
        this.setState({rows: editedArr});
    }

    setRowsSeats = (e) => {
        e.preventDefault();
        let rows = parseInt(document.getElementById("rows").value);
        let seats = parseInt(document.getElementById("seats").value);
        this.setState({rowsNum:rows, seatsPerRowNum: seats}, ()=>this.makeSeatChart());
    }

    toggleReservation = (e) => {
        e.preventDefault();
        let editedArr = this.state.rows;
        let obj;
        for(var r=0; r<editedArr.length; r++){
            for(var s=0; s<editedArr[r].length; s++){
                if(editedArr[r][s].selected && editedArr[r][s].available){
                    if(editedArr[r][s].reserved){
                        obj = {
                            r:r+1,
                            s:s+1,
                            selected:false,
                            available: editedArr[r][s].available,
                            reserved: false,
                            name: ""
                        }
                    } else {
                        obj = {
                            r:r+1,
                            s:s+1,
                            selected:false,
                            available: editedArr[r][s].available,
                            reserved: true,
                            name: document.getElementById("name").value
                        }
                    }
                    editedArr[r].splice(s,1,obj);
                } 
            }
        }
        this.setState({rows: editedArr});
        document.getElementById("name").value = "";
        console.log(this.state.rows[0]);
    }

    render(){
        // Mapping the rows and seats per row to create the chart.  Number or rows and seats per row is controlled by state.
        const row = this.state.rows.map((row,i) => (<div className="row" key={i+1}>{
            row.map((seat,i) => (<div className="seat" key={i+1}>{
                <Seat 
                    row={seat.r}
                    seat={seat.s}
                    selected={seat.selected}
                    available={seat.available}
                    selectSeat={(r,s)=>this.selectSeat(r,s)}
                    reserved={seat.reserved}
                    name={seat.name}
                    />
                }</div>))
        }</div>));  

        return(
        <div className="seatingContainer">
            <h1>Seats</h1>
            <p>Rows: {this.state.rowsNum}; Seats Per Row: {this.state.seatsPerRowNum}</p>
            <div className="seatingChart">
             {row}
            </div>
            <div className="buttonBox">
                <button name="toggleReservation" value={true} onClick={(e)=>this.toggleReservation(e)}>Reserve</button>
                <button name="toggleReservation" value={false} onClick={(e)=>this.toggleReservation(e)}>Cancel Reservation</button>
                <input type="text" name="name" id="name" placeholder="Enter Name for Reservation"></input>
                <button name="toggleAvailable" value={true} onClick={(e)=>this.toggleAvailable(e)}>Make Available</button>
                <button name="toggleAvailable" value={false} onClick={(e)=>this.toggleAvailable(e)}>Make Unavailable</button>
            </div>
            <form className="inputBox">
                <label for="rows">Rows:</label>
                <input type="number" id="rows" name="rows" min="1" onChange={(e)=>this.inputRowsSeats(e)}></input>
                <label for="seats">Seats:</label>
                <input type="number" id="seats" name="seats" min="1" onChange={(e)=>this.inputRowsSeats(e)}></input>
                <input type="submit" onClick={(e)=>this.setRowsSeats(e)}></input>
            </form>
        </div>
        )
    }
};

export default Seating;