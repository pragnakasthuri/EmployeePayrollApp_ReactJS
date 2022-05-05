import React from "react";
import './dashboard.css';
import logo from '../assets/images/logo.png'
import editEmp from '../assets/icons/create-black-18dp.svg';
import deleteEmp from '../assets/icons/delete-black-18dp.svg';
import profile_pic_1 from '../assets/profile-images/Ellipse -1.png';
import profile_pic_2 from '../assets/profile-images/Ellipse -4.png';
import profile_pic_3 from '../assets/profile-images/Ellipse -9.png';
import { Link } from "react-router-dom";

const Dashboard = (props) => {

    console.log(props);

    const deleteEmployeeHandler = (id) => {
        props.getEmployeeId(id);
    };

    const renderEmployeeList = props.employees.map((employee) => {
        const {id, name, startDate, gender, departmentValue, salary, profileUrl} = employee;
        return (
          <tr>
            <td>{id}</td>
            <td><img className="profile" src={profile_pic_3} alt="profile_img-1"/></td>
            <td>{name}</td>
            <td>{gender}</td>
            <td>
                <div className="dept-label">{departmentValue}</div>
            </td>
            <td>{salary}</td>
            <td>{startDate}</td>
            <td>
            <Link to={{ pathname: `/edit`, state: { employee: employee } }}>
                <img src={editEmp} alt="edit"/>
            </Link>
                <img src={deleteEmp} alt="delete" onClick={() => deleteEmployeeHandler(id)}/>
            </td>
        </tr>
        );
    });

    return (
        <>
            <div className="header header-content">
                <div className="logo-content">
                    <img src={logo} className="logo-content-img" alt="logo" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br/>
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="header-content employee-header">
                    <div className="emp-detail-text">
                        Employee Details
                        <div className="emp-count">{props.employees.length}</div>
                    </div>
                    <Link to="/payroll" className="add-button">
                        <img className="add-button" src="../assets/plus_symbol.svg" alt=""/>Add Employee
                    </Link>
                </div>
                <div className="table-main">
                    <table id="table-display" className="table">
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                            {renderEmployeeList}
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard;


