import React, {useState, useEffect} from 'react';
import axios from "axios";
import './styles/Table.css'; 

function Table(props) {
        const [info, setInfo] = useState([]);
        const userEmail = props.useremail;
        useEffect(() => {
          axios
            .get('http://localhost:3002/getInfo', {
              params: { email: userEmail },
            })
            .then((response) => {
                setInfo(response.data); 
            })
            .catch((error) => {
              console.error('Error fetching locations:', error);
            });
        }, [userEmail]);
       
    return (
      <div className="table-container">
        <table className="simple-bordered-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Amount<br /> (in Rs.)</th>
              <th>Date</th>
              <th>Place</th>
              <th>Description</th>
              
            </tr>
          </thead>
          <tbody>
            {info.map((user, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.amount}</td>
                <td>{user.date.slice(0, 10)}</td>
                <td>{user.area}, {user.location}</td>
                <td>{user.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Table;