import React from "react";

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalState: "warn"
        }
    }

    chooseReset = (e) => {
        this.setState({modalState: "reset"})
    }

    cancel = (e) => {
        this.props.closeModal();
        this.setState({modalState: "warn"});
    }

    reset = (e) => {
        e.preventDefault();
        let rows = parseInt(document.getElementById("rows").value);
        let seats = parseInt(document.getElementById("seats").value);
        if(seats && rows){
            this.props.resetChart(rows, seats);
            this.setState({modalState: "warn"});
        } else {
            alert("Um... aren't you forgetting something?")
        }
    }
  
    render(){

        const modalDisplay = this.props.modalDisplay? "modalBox modalDisplayTrue" : "modalBox modalDisplayFalse";
        
        const warning = <div>
                <h2><strong>Wait!</strong></h2>
                <h3>Are you sure you want to adjust the number of rows and/or seats?</h3>
                    <br/>
                <h4>Adjusting the number of rows and/or seats will reset the chart, including all reservations and seat availabilities.</h4>
                <button onClick={(e)=>this.chooseReset(e)}>Reset the chart</button>
                <button onClick={(e)=>this.cancel(e)}>Cancel</button>
            </div>

        const resetChartButtons = 
            <form className="inputBox">
                <label for="rows">Rows:</label>
                <input type="number" id="rows" name="rows" min="1" required></input>
                <label for="seats">Seats:</label>
                <input type="number" id="seats" name="seats" min="1" required></input>
                <input type="submit" onClick={(e)=>this.reset(e)}></input>
                <button onClick={(e)=>this.cancel(e)}>Cancel</button>
            </form>

        return(
            <div className={modalDisplay}>
                {this.state.modalState === "warn" ? warning : resetChartButtons}
                
            </div>
        )
    }
}

export default Modal;