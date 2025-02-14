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
import { submitFormRequest } from '@/redux/actions/formAction';
import { useRouter } from 'next/router';
import auth from '@/hoc/auth';
import { validateForm } from '@/utils/validate';



const AddProduct = () => {


  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const loading = useSelector((state) => state.form.loading);
  const error = useSelector((state) => state.form.error);
  const selectedSection = useSelector((state) => state.form.selectedSection);
  const router = useRouter()
  const [errors, setErrors] = useState({});  

  

  const selectedType = formData.product_type;
  console.log(formData);
  console.log(selectedType);

  useEffect(() => {
    dispatch(resetForm())
  }, [])



  const handleChange = (name, value) => {

    dispatch(updateField(name, value));
  };

  const handleSelectedSection = (sectionName) => {
    dispatch(setSelectedSection(sectionName))
  }

  // const handleSubmit = () => {

  //   dispatch(submitFormRequest(formData))
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm(formData, formJSON, selectedType, selectedSection);
    setErrors(validationErrors); 
  
    if (Object.keys(validationErrors).length === 0) {
      dispatch(submitFormRequest(formData)); 
    } else {
      console.log("Validation failed:", validationErrors);
    }
  };
  

  const handleReset = () => {
    router.push('/product-master')
    dispatch(resetForm());
    setErrors({})
  };

  // let loading = true;

  const buttons = [
    { name: "SAVE", label: "F9", onClick: (e) => handleSubmit(e), className: "text-[#5556a6] p-2", labelClassName: "p-1.5 bg-[#5556a6] text-white" },

  ];

  const titleButton = { label: "✕", onClick: () => handleReset() }


  if (loading) {
    return (

      <div className='flex items-center justify-center h-screen w-full '>
        <CircularProgress color='secondary' />
      </div>

    );
  }

  return (
    <div className='w-10/12 mx-auto'>


      <div className="py-2 mt-2">


        <CommonForm title="Add Product" titleButton={titleButton} JSONData={formJSON} handleChange={handleChange} handleSelectedSection={handleSelectedSection} selectedType={selectedType} buttons={buttons} onFormSubmit={handleSubmit} formData={formData} errors={errors}/>
      </div>
    </div>
  );
}

export default auth(AddProduct);  
