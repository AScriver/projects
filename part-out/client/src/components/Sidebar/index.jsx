import React from 'react';
import { Input, DropDown } from '../Form';
import './index.css';

function Sidebar(props) {
  return (
    <div className='sidebar-container'>
      <p>Search Posts: {props.carMake}</p>
      <div className='field-wrap'>
        <Input
          value={props.carMake}
          onChange={props.handleInputChange}
          name='carMake'
          type='text'
          placeholder='Manufacturer'
        />
      </div>
      <div className='field-wrap'>
        <Input
          value={props.carModel}
          onChange={props.handleInputChange}
          disabled={!props.carMake}
          name='carModel'
          type='text'
          placeholder='Model'
        />
      </div>
      <div className='field-wrap'>
        <Input
          disabled={!props.carModel || !props.carMake}
          value={props.carYear}
          onChange={props.handleInputChange}
          name='carYear'
          type='text'
          placeholder='Year'
        />
      </div>
      <div className='field-wrap'>
        <DropDown
          disabled={!props.carModel || !props.carMake || !props.carYear}
          value={props.category}
          onChange={props.handleInputChange}
          name='category'
          type='text'
          id='category'
        >
          <option>Select a category...</option>
          <option>Brakes</option>
          <option>Drivetrain</option>
          <option>Engine</option>
          <option>Exhaust</option>
          <option>Exterior</option>
          <option>Intake</option>
          <option>Interior</option>
          <option>Lights</option>
          <option>Suspension</option>
          <option>Wheels & Tires</option>
        </DropDown>
      </div>
    </div>
  );
}

export default Sidebar;
