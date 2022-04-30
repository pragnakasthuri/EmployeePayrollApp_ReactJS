import './payroll-form.scss';
import logo from '../assets/images/logo.png';
import { useState } from "react";
import profile_pic_1 from '../assets/profile-images/Ellipse -1.png';
import profile_pic_2 from '../assets/profile-images/Ellipse -3.png';
import profile_pic_3 from '../assets/profile-images/Ellipse -9.png';
import profile_pic_4 from '../assets/profile-images/Ellipse -7.png';
// import {useParams,Link,withRouter} from 'react-router-dom';

const PayrollForm = (props) => {

    const save = async (event) => {
        event.preventDefault();
        console.log(formValue);
        if (await validData()) {
            console.log('error', formValue);
            return;
        }

    }

    let initalValue = {
        name : '',
        profileArray: [
            {url: '../assets/profile-images/Ellipse -1.png'},
            {url: '../assets/profile-images/Ellipse -3.png'},
            {url: '../assets/profile-images/Ellipse -9.png'},
            {url: '../assets/profile-images/Ellipse -7.png'}
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''      
        }
    }

    const [formValue, setForm] = useState(initalValue);
    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }
    const onProfileSelected = (event) => {
        setForm({...formValue, profileUrl: event.target.value})
        console.log(formValue.profileUrl);
    }
    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue];
        if (index > -1) {
            checkArray.splice(index, 1)
        } else {
            checkArray.push(name);
        }
        setForm({ ...formValue, departmentValue: checkArray});
    }
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }
    const validData =  async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        };
        if (formValue.name.length < 1) {
            error.name = 'name is required field'
            isError = true
        }
        if (formValue.gender.length < 1) {
            error.gender = 'gender is required field'
            isError = true
        }
        if (formValue.salary.length < 1) {
            error.salary = 'salary is required field'
            isError = true
        }
        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'profileUrl is required field'
            isError = true
        }
        if (formValue.departmentValue.length < 1) {
            error.department = 'department is required field'
            isError = true
        }
        await setForm( {...formValue, error:error});
        return isError;
    }

    const reset = () => {
        setForm({ ...formValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    return (
       <div className="payroll-main">
           <header className='header row center'>
               <div className='logo'>
                   <img src={logo} alt = "" />
           <div>
               <span className="emp-text">EMPLOYEE</span><br/>
               <span className="emp-text emp-payroll">PAYROLL</span>
           </div>
       </div>
       </header>

       <div className="content">
           <form className="form" action="#" onSubmit={save} >
               <div className="form-head">Employee Payroll Form</div>
               <div className="row">
                   <label className="label text"htmlFor ="name" >Name</label>
                   <input type="text" name="name" id="name" className="input" value={formValue.name} onChange={changeValue} placeholder="Your Name .." required />
               </div>
               <div className="error" > {formValue.error.name}</div>

               <div className="row">
                   <label className="label text" htmlFor="profile">Profile image</label>
                   <div className="profile-radio-button">
                       <label>
                           <input type="radio" checked={formValue.profileUrl === '..\\assets\\profile-images\\Ellipse -1.png'}  
                           value="..\assets\profile-images\Ellipse -1.png" onChange={onProfileSelected} />
                           <img className="profile"  src={profile_pic_1} />
                       </label>
                       <label>
                           <input type="radio" checked = {formValue.profileUrl === '..\\assets\\profile-images\\Ellipse -3.png'}  
                           value="..\assets\profile-images\Ellipse -3.png" onChange={onProfileSelected} />
                           <img className="profile"  src={profile_pic_2} />
                       </label>
                       <label>
                           <input type="radio" checked = {formValue.profileUrl === '..\\assets\\profile-images\\Ellipse -9.png'}  
                           value="..\assets\profile-images\Ellipse -9.png" onChange={onProfileSelected} />
                           <img className="profile"  src={profile_pic_3} />
                       </label>
                       <label>
                           <input type="radio" checked = {formValue.profileUrl === '..\\assets\\profile-images\\Ellipse -7.png'}  
                           value="..\assets\profile-images\Ellipse -7.png" onChange={onProfileSelected} />
                           <img className="profile"  src={profile_pic_4} />
                           </label>
                   </div>
               </div>
               <div className="error"> {formValue.error.profileUrl}</div>

               <div className="row">
                   <label className="label text" htmlFor="gender">Gender</label>
                   <div>
                       <input type="radio" id="male" onChange={changeValue} name="gender" value="male" />
                       <label className="text" htmlFor="male">Male</label>
                       <input type="radio" id="female" onChange={changeValue} name="gender" value="female" />
                       <label className="text" htmlFor="female">Female</label>
                   </div>
               </div>
               <div className="error"> {formValue.error.gender}</div>

               <div className="row">
                   <label className="label text" htmlFor="department">Department</label>
                   <div>
                       {formValue.allDepartment.map(item => {
                           return (<span key={item}>
                            <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                defaultChecked={() => getChecked(item)} value={item}/>
                            <label className="text" htmlFor={item}>{item}</label>
                           </span>)
                       })}
                   </div>
               </div>
               <div className="error"> {formValue.error.department}</div>

               <div className="row-content">
                   <label className="label text" htmlFor="salary">Salary </label>
                   <input className="input" type="number" onChange={changeValue}  id="salary" value={formValue.salary} name="salary" placeholder="Salary" /> 
               </div>

               <div className="error"> {formValue.error.salary}</div>


               <div className="row-content">
                   <label className="label text" htmlFor="startDate">Start Date</label>
                   <div>
                       <select id="day" name="Day">
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                           <option value="5">5</option>
                           <option value="6">6</option>
                           <option value="7">7</option>
                           <option value="8">8</option>
                           <option value="9">9</option>
                           <option value="10">10</option>
                           <option value="11">11</option>
                           <option value="12">12</option>
                           <option value="13">13</option>
                           <option value="14">14</option>
                           <option value="15">15</option>
                           <option value="16">16</option>
                           <option value="17">17</option>
                           <option value="18">18</option>
                           <option value="19">19</option>
                           <option value="20">20</option>
                           <option value="21">21</option>
                           <option value="22">22</option>
                           <option value="23">23</option>
                           <option value="24">24</option>
                           <option value="25">25</option>
                           <option value="26">26</option>
                           <option value="27">27</option>
                           <option value="28">28</option>
                           <option value="29">29</option>
                           <option value="30">30</option>
                           <option value="31">31</option>
                       </select>
                       <select id="month" name="Month">
                           <option value="0">January</option>
                           <option value="1">February</option>
                           <option value="2">March</option>
                           <option value="3">April</option>
                           <option value="4">May</option>
                           <option value="5">June</option>
                           <option value="6">July</option>
                           <option value="7">August</option>
                           <option value="8">September</option>
                           <option value="9">October</option>
                           <option value="10">November</option>
                           <option value="11">December</option>
                       </select>
                       <select id="year" name="Year">
                           <option value="2021">2021</option>
                           <option value="2020">2020</option>
                           <option value="2019">2019</option>
                           <option value="2018">2018</option>
                           <option value="2017">2017</option>
                           <option value="2016">2016</option>
                       </select>
                   </div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="notes">Notes</label>
                   <textarea onChange={changeValue} id="notes" className="input" name="notes" placeholder="" value={formValue.notes}></textarea>
               </div>

               <div className="buttonParent">
                   <a href="EmployeePayroll.html" className="resetButton button cancelButton">Cancel</a>
                   <div className="submit-reset">
                       <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                       <button type="reset" className="resetButton button" onClick={reset}>Reset</button>
                   </div>
               </div>
           </form>
       </div>
       </div>
    )
}

export default PayrollForm;