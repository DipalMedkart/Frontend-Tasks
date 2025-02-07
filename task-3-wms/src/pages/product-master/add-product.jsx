import React, { useEffect } from 'react';
import { InputField } from '../../components/InputField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField, resetForm, submitForm, setSelectedSection } from '@/redux/actions/formAction';
import { useSelector } from 'react-redux';
import formField from '../../data/formField.json'
import conditionalFields from '../../data/conditionalFields.json'
import formJSON from '../../data/formData.json'
import CommonForm from '@/components/CommonForm';
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';





const AddProduct = () => {


  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const loading = useSelector((state) => state.form.loading);
  const error = useSelector((state) => state.form.error);
  const selectedSection = useSelector((state) => state.form.selectedSection);

  const selectedType = formData.product_type; 
  console.log(formData);
  console.log(selectedType);


  // const generalFields = form


  // useEffect(() => {
  //   console.log(selectedType);
  // }, [selectedType])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(updateField(name, value));
  // };
  const handleChange = (name,value) => {
    
    dispatch(updateField(name, value));  
  };

  const handleSelectedSection = (sectionName) => {
    dispatch(setSelectedSection(sectionName))
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    // dispatch(submitForm());
    
    console.log("Submiting the form");
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  // let loading = true;

  const buttons = [
    { name: "SAVE", label: "F9", onClick: () => handleSubmit() , className : "text-[#5556a6] p-2", labelClassName : "p-1.5 bg-[#5556a6] text-white"},
    
  ];

  const titleButton = {label : "Close" , onClick : () => console.log("Close clicked") }
  

  if(loading){
    return (
    
    <div className='flex items-center justify-center h-screen w-full '>
      <CircularProgress color='secondary'/>
    </div>  
    
    );
  }

  return (
    <div className='w-10/12 mx-auto'>
      {/* <div className="flex flex-row items-center justify-between h-20 border-b border-gray-300 px-4 shadow-lg">
        <h3 className='text-black text-2xl'>Add Product</h3>
        <button className='text-black'>Close</button>
      </div> */}

      <div className="py-2 mt-2">

        {/* <InputField label="Product Name" type='text' placeholder='Product Name' required={true} />
        <InputField label="Product Type" type='select'  required={true} optionLabel='product_type' />
        <InputField label="Wondersoft Code" type='number' placeholder='Wondersoft Code' required={true} />
        <InputField label="Product Code" type='number' placeholder='Product Code' required={true} />
        <InputField label="Dosage Form" type='select' placeholder='' optionLabel='dosage_form'  required={true} />
        <InputField label="ManuFecturer" type='select' placeholder='Ex. Emeritus Pharma' required={true} />
        <InputField label="MRP" type='number' placeholder='MRP *' required={true} /> */}

        {/* {formField.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            type={field.type}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            optionLabel={field.optionLabel}
            onChange={(e) => handleChange(field.name, e.target?.value ?? e)}
            value={formData[field.name] ?? ""}
          />
        ))}

        {selectedType === "Goods" &&
          conditionalFields.map((field, index) => (
            <InputField
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target?.value ?? e)}
              value={formData[field.name] ?? ""}
            />
          ))
        } */}
        <CommonForm title="Add Product" titleButton={titleButton} JSONData={formJSON} handleChange={handleChange} handleSelectedSection={handleSelectedSection} selectedType={selectedType} buttons={buttons} onFormSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default AddProduct;  
