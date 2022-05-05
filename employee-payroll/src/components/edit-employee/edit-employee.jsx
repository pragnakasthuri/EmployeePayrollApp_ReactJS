import './payroll-form.scss';
import logo from '../assets/images/logo.png';
import React, { useState } from "react";
import profile_pic_1 from '../assets/profile-images/Ellipse -1.png';
import profile_pic_2 from '../assets/profile-images/Ellipse -3.png';
import profile_pic_3 from '../assets/profile-images/Ellipse -9.png';
import profile_pic_4 from '../assets/profile-images/Ellipse -7.png';


const EditEmployee = (props) => {

    const days = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const years = ["2016","2017","2018","2019","2020","2021","2022"];

    const save = async (event) => {
        event.preventDefault();
        console.log(formValue);
        if (await validData()) {
            console.log('error', formValue);
            return;
        }
        formValue.startDate = formValue.day + ' ' + formValue.month + ' ' + formValue.year;
        // this.state.formValue = formValue;
        props.updateEmployeeHandler(formValue);
        // this.setState({ name: "", email: "" });
        props.history.push("/");
    }

    const [formValue, setForm] = useState(props.location.state.employee);
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

    const cancel = () => {
        props.history.push("/");
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
                       <input type="radio" id="male" onChange={changeValue} name="gender" value="male" checked={formValue.gender == 'male'}/>
                       <label className="text" htmlFor="male">Male</label>
                       <input type="radio" id="female" onChange={changeValue} name="gender" value="female" checked={formValue.gender == 'female'}/>
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
                                defaultChecked={formValue.departmentValue.includes(item)} value={item}/>
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
                       <select id="day" name="day" onChange={changeValue}>
                        { 
                            days.map(i => {
                                return (<option value={i} selected={formValue.day === i}>{i}</option>);
                            })
                        }
                       </select>

                       <select id="month" name="month" onChange={changeValue}>
                           {
                                months.map(i => {
                                    return (<option value={i} selected={formValue.month === i}>{i}</option>);
                                })
                            }
                       </select>

                       <select id="year" name="year" onChange={changeValue}>
                           {
                                years.map(i => {
                                    return (<option value={i} selected={formValue.year === i}>{i}</option>);
                                })
                            }
                       </select>
                   </div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="notes">Notes</label>
                   <textarea onChange={changeValue} id="notes" className="input" name="notes" placeholder="" value={formValue.notes}></textarea>
               </div>

               <div className="buttonParent">
                   <div className="submit-reset">
                        <button type="cancel" className="resetButton button" onClick={cancel}>Cancel</button>
                        <button type="submit" className="button submitButton" id="submitButton">{'Update'}</button>
                   </div>
               </div>
           </form>
       </div>
       </div>
    )
}

export default EditEmployee;