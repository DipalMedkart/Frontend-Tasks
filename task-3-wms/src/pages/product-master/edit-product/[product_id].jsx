import React, { useState } from 'react'
import CommonForm from '@/components/CommonForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetailsRequest, updateField, setSelectedSection, resetForm, updateProductRequest } from '@/redux/actions/formAction';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import formJSON from '../../../data/formData'
import auth from '@/hoc/auth';
import { submitFormRequest } from '@/redux/actions/formAction';
import { produce } from "immer"
import { validateForm } from '@/utils/validate';



const EditProduct = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const [editFormData, setEditFormData] = useState({});
  const formData = useSelector((state) => state.form.formData);
  const loading = useSelector((state) => state.form.loading);
  const [errors, setErrors] = useState({});
  const selectedSection = useSelector((state) => state.form.selectedSection);
  const { product_id } = router.query;

  const handleClose = () => {
    dispatch(resetForm())
    router.push('/product-master')
  }


  const buttons = [
    { name: "SAVE", label: "F9", onClick: (e) => handleSubmit(e), className: "text-[#5556a6] p-2", labelClassName: "p-1.5 bg-[#5556a6] text-white" },


  ];

  const titleButton = { label: "✕", onClick: () => handleClose() }


  useEffect(() => {
    if (product_id) {
      console.log(product_id);
      dispatch(fetchProductDetailsRequest(product_id))
    }
  }, [product_id])
  // console.log(code);


  console.log(formData);

  // console.log(formData.manufacturer);
  // console.log(formData.taxes);

  useEffect(() => {
    if (formData) {
      setEditFormData(JSON.parse(JSON.stringify(formData)));
    }
  }, [formData]);


  const selectedType = formData.product_type;
  console.log(selectedType);


  const setNestedValue = (object, path, value) => {
    if (!path) return object;

    return produce(object, (draft) => {
      const keys = path.split(".");
      let temp = draft;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]] || typeof temp[keys[i]] !== "object") {
          temp[keys[i]] = {};
        }
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
    });
  };


  const handleChange = (initialValue, value) => {
    setEditFormData((prev) => setNestedValue(prev, initialValue, value));
    // dispatch(updateField(initialValue, value));
  }


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedData = JSON.parse(JSON.stringify(editFormData));

  //   dispatch(updateProductRequest({ product_id, data: updatedData }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateForm(editFormData, formJSON, selectedType, selectedSection);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedData = JSON.parse(JSON.stringify(editFormData));
      dispatch(updateProductRequest({ product_id, data: updatedData }));
    } else {
      console.log("Validation failed:", validationErrors);
    }
  }

  const handleSelectedSection = (sectionName) => {
    dispatch(setSelectedSection(sectionName))
  }

  useEffect(() => {
    console.log(editFormData);
  }, [editFormData])


  if (loading || !editFormData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-10/12 mx-auto'>


      <div className="py-2 mt-2">


        <CommonForm title="Edit Product" initailValues={editFormData} JSONData={formJSON} buttons={buttons} titleButton={titleButton} handleChange={handleChange} errors={errors} onFormSubmit={handleSubmit} selectedType={selectedType} handleSelectedSection={handleSelectedSection} formData={editFormData} />
      </div>
    </div>
  )
}

export default auth(EditProduct);