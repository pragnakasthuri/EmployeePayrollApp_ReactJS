import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
      <Router>
        <div className="App">
              <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/payroll" component={PayrollForm}/>
              </Switch>
        </div>
      </Router>
  );
}

export default App;