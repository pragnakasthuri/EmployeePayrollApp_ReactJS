import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import api from "./api/employees";
import React, { useState, useEffect } from "react";
import EditEmployee from './components/edit-employee/edit-employee';

function App() {

  const LOCAL_STORAGE_KEY = "employee";
  const [employees, setEmployees] = useState(
    [
    ]
  );

  const retrieveEmployees = async () => {
    const response = await api.get("/employee");
    return response.data;
  };

  const addEmployeeHandler = async (employee) => {
    console.log(employee);
    const request = {
      ...employee,
    };

    const response = await api.post("/employee", request);
    console.log(response);
    setEmployees([...employees, response.data]);
  };

  const updateEmployeeHandler = async (employee) => {
    const response = await api.put(`/employee/${employee.id}`, employee);
    console.log(response.data);
    const { id, name, email } = response.data;
    setEmployees(
      employees.map((employee) => {
        return employee.id === id ? { ...response.data } : employee;
      })
    );
  };

  const removeEmployeeHandler = async (id) => {
    await api.delete(`/employee/${id}`);
    const newEmployeeList = employees.filter((employee) => {
      return employee.id !== id;
    });

    setEmployees(newEmployeeList);
  };

  useEffect(() => {
    const getAllEmployees = async () => {
      const allEmployees = await retrieveEmployees();
      if (allEmployees) setEmployees(allEmployees);
    };

    getAllEmployees();
  }, []);

  useEffect(() => {
  }, [employees]);

  return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/" render={(props) => (
              <Dashboard
                {...props}
                employees={employees}
                getEmployeeId={removeEmployeeHandler}
                          />
                        )}
              ></Route>
              <Route exact path="/edit" render={(props) => (
              <EditEmployee
                {...props}
                updateEmployeeHandler={updateEmployeeHandler}
                          />
                        )}
              ></Route>
              <Route exact path="/payroll" render={(props) => (
              <PayrollForm {...props} addEmployeeHandler={addEmployeeHandler} />
                )}/>
              </Switch>
        </div>
      </Router>
  );
}

export default App;