import React from 'react'
import CommonForm from '@/components/CommonForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetailsRequest, updateField, setSelectedSection, resetForm } from '@/redux/actions/formAction';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import formJSON from '../../../data/formData'
import auth from '@/hoc/auth';




const EditProduct = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const { product_id } = router.query;

  const handleClose = () => {
    dispatch(resetForm())
    router.push('/product-master')
  }


  const buttons = [
    { name: "SAVE", label: "F9", onClick: () => handleSubmit(), className: "text-[#5556a6] p-2", labelClassName: "p-1.5 bg-[#5556a6] text-white" },


  ];

  const titleButton = { label: "✕", onClick: () => handleClose() }


  useEffect(() => {
    if (product_id) {
      console.log(product_id);
      dispatch(fetchProductDetailsRequest(product_id))
    }
  }, [product_id])
  // console.log(code);
  const formData = useSelector((state) => state.form.formData);
  console.log(formData);

  console.log(formData.manufacturer);
  console.log(formData.taxes);



  const selectedType = formData.product_type;
  console.log(selectedType);


  const handleChange = (name, value) => {

    dispatch(updateField(name, value));
  };

  const handleSubmit = () => {

    dispatch(submitFormRequest(formData))
  };

  const handleSelectedSection = (sectionName) => {
    dispatch(setSelectedSection(sectionName))
  }




  return (
    <div className='w-10/12 mx-auto'>


      <div className="py-2 mt-2">


        <CommonForm title="Edit Product" initailValues={formData} JSONData={formJSON} buttons={buttons} titleButton={titleButton} handleChange={handleChange} onFormSubmit={handleSubmit} selectedType={selectedType} handleSelectedSection={handleSelectedSection} />
      </div>
    </div>
  )
}

export default auth(EditProduct);