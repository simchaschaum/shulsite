import React from "react";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            admin: true
        }
    }

    render(){
        return(
            <div>
                <h1>Welcome to Our Shul</h1>
            </div>
        )
    }
}


export default Home;