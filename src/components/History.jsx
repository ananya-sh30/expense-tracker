import React from "react";
import Table from "./Table";
import './styles/UserHome.css'; 


function History(props){
    return (
        <div className="history">
            <h2 className="historyHeading">Expense History</h2>
            <Table useremail={props.useremail}/ >
        </div>
        
    );
    
}
export default History;