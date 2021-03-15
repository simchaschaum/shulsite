import React  from "react";
// import {db, seats} from "../utils/firebase";
// import {firebaseArrMaker} from "../utils/fbtools";
import Seat from "./seat";
import Modal from "./modal";

class Seating extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rows:[],     // the rows, made up of seats (based on the number of rows and seats in the state below)
            rowsNum: 8,     
            seatsPerRowNum: 8,
            selectedSeats:[],
            modalDisplay: false,
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

    // Modal popup to reset numbers of rows and seats:
    modalPopup = (e) => {
        e.preventDefault();
        this.setState({modalDisplay: true})
    }
    closeModal = () => {
        this.setState({modalDisplay: false})
    }
    // Reset numbers of rows and seats, accessible from the modal: 
    setRowsSeats = (rows, seats) => {
        this.setState({rowsNum:rows, seatsPerRowNum: seats, modalDisplay: false}, ()=>this.makeSeatChart());
    }

    selectSeat = (r,s) => {
        let editedArr = this.state.rows;
        let sel = this.state.rows[r-1][s-1].selected ? false : true;
        let avail = this.state.rows[r-1][s-1].available;
        let res = this.state.rows[r-1][s-1].reserved;
        let name = this.state.rows[r-1][s-1].name;
        this.editSeat(r-1,s-1,sel,avail,res,name);
        }

    toggleAvailable = (e) => {
        e.preventDefault();
        let editedArr = this.state.rows;
        let avail = (e.target.value=== "true");
        for(var r=0; r<editedArr.length; r++){
            for(var s=0; s<editedArr[r].length; s++){
                if(editedArr[r][s].selected && editedArr[r][s].available !== avail){
                    this.editSeat(r,s,editedArr[r+1][s+1].selected,avail,editedArr[r+1][s+1].reserved,editedArr[r+1][s+1].name)
                } 
            }
        }
        this.setState({rows: editedArr});
    }

 
    toggleReservation = (e) => {
        e.preventDefault();
        let editedArr = this.state.rows;
        let obj;
        for(var r=0; r<editedArr.length; r++){
            for(var s=0; s<editedArr[r].length; s++){
                if(editedArr[r][s].selected && editedArr[r][s].available){
                    if(editedArr[r][s].reserved){
                        this.editSeat(r,s,false,editedArr[r][s].available,"")
                        } else {
                        this.editSeat(r,s,false,editedArr[r][s].available,true,document.getElementById("name").value)
                        }
                } 
            }
        }
        this.setState({rows: editedArr});
        document.getElementById("name").value = "";
        console.log(this.state.rows[0]);
    }

    editSeat = (r,s,sel,avail,res,name) => {
        let editedArr = this.state.rows;
        let obj = {
            r:r+1,
            s:s+1,
            selected:sel,
            available: avail,
            reserved: res,
            name: name
        }
        editedArr[r].splice(s,1,obj);
        this.setState({rows: editedArr});
    }

    render(){
        // Mapping the rows and seats per row to create the chart.  Number or rows and seats per row is controlled by state.
        const row = this.state.rows.map((row,i) => (<div className="row" key={i+1}>{
            row.map((seat,i) => (<div className="seat" key={i+1}>
                    <div className="toolTip">

                    </div>
                    <Seat 
                        row={seat.r}
                        seat={seat.s}
                        selected={seat.selected}
                        available={seat.available}
                        selectSeat={(r,s)=>this.selectSeat(r,s)}
                        reserved={seat.reserved}
                        name={seat.name}
                        />
                </div>))
        }</div>));  

        return(
        <div className="seatingContainer">
            <Modal 
                resetChart={(rows,seats)=>this.setRowsSeats(rows,seats)}
                modalDisplay={this.state.modalDisplay}
                closeModal={this.closeModal}
            />
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
                <button name="resetChart" onClick={(e)=>this.modalPopup(e)}>Reset Chart</button>
            </div>
           
        </div>
        )
    }
};

export default Seating;