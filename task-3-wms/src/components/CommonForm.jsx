
import React, { useEffect } from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField, resetForm, submitForm, setSelectedSection } from '@/redux/actions/formAction';
import { useSelector } from 'react-redux';
import { InputField } from './InputField';
import formJSON from '../data/formData.json'
import { useRouter } from 'next/router';




const CommonForm = ({ title, titleButton, JSONData, handleChange, selectedType, handleSelectedSection, buttons, onFormSubmit, initailValues, formData, errors }) => {


  const dispatch = useDispatch();
  // const formData = useSelector((state) => state.form.formData);
  const loading = useSelector((state) => state.form.loading);
  const error = useSelector((state) => state.form.error);
  const selectedSection = useSelector((state) => state.form.selectedSection);

  

  


  const router = useRouter();
  const isEditMode = !!router.query.product_id;
  console.log(isEditMode);

  // console.log(JSONData);

  // const selectedType = formData.product_type;
  // console.log(formData);
  // console.log(selectedType);

  const generalFields = JSONData.find(item => item.category === "general")?.fields || [];
  // console.log(generalFields);

  const selectedCategory = JSONData.find(item => item.category === selectedType)
  const categoryFields = selectedCategory?.fields || [];
  // console.log(categoryFields);

  const sectionNames = selectedCategory?.sections?.map(sec => ({
    NameToDisplay: sec.sectionName,
    value: sec.name,
    requirement: sec.required
  })) || [];
  // console.log(sectionNames);



  const selectedSectionData = selectedCategory?.sections?.find(sec => sec.name === selectedSection);
  // console.log(selectedSectionData);
  const sectionFields = selectedSectionData?.fields || [];
  // console.log(sectionFields);


  // const getNestedValue = (object, path) => {

  //   return path?.split('.').reduce((acc, key) => acc?.[key], object) ?? "";
  // };

  


  const getNestedValue = (object, path) => {
    // console.log("🔍 Debugging getNestedValue");
    // console.log("Object:", object);
    // console.log("Path:", path);

    if (!path) return "";

    const result = path.split('.').reduce((acc, key) => {
      // console.log(`Accessing key: ${key}, Current Value:`, acc?.[key]); 
      return acc?.[key];
    }, object);

    // console.log("Final Result:", result);
    return result ?? "";
  };




  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className='shadow-lg shadow-blue-100 mt-2'>
      <div className="flex flex-row items-center justify-between h-20 border-b border-gray-200 px-4 ">
        <h3 className='text-black text-2xl'>{title}</h3>
        <button className='text-black text-2xl' onClick={titleButton.onClick}>{titleButton.label}</button>
      </div>


      <div className="py-2 mt-2 ">
        <form action="" onSubmit={onFormSubmit}>

          <div className='mb-10'>



            {generalFields.map((field, index) => (
              <InputField
                key={`general-${index}`}
                label={field.label}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                optionLabel={field.optionLabel}
                // onChange={(e) => handleChange(field.name, e.target?.value ?? e)}
                onChange={(e) => handleChange(isEditMode ? field.initialValue : field.name, e.target?.value ?? e)}

                // value={formData[field.initialValue] ?? formData[field.name] ?? ""}
                // value={getNestedValue(formData, field.initialValue) || formData[field.name] || ""}
                value={
                  typeof getNestedValue(formData, field.initialValue) === "boolean"
                    ? getNestedValue(formData, field.initialValue)
                      ? "Yes"
                      : "No"
                    : getNestedValue(formData, field.initialValue) ?? formData[field.name] ?? ""
                }
                providedOptions={field.providedOptions}
                hasSearch={field?.hasSearch}
                isDisbaled={field?.disable}
                error={errors?.[field?.name] || ""}

              />
            ))}

            {categoryFields.map((field, index) => (
              <InputField
                key={`category-${index}`}
                label={field.label}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                optionLabel={field.optionLabel}
                // onChange={(e) => handleChange(field.name, e.target?.value ?? e)}
                onChange={(e) => handleChange(isEditMode ? field.initialValue : field.name, e.target?.value ?? e)}

                // value={formData[field.name] ?? ""}
                // value={formData[field.initialValue] ?? formData[field.name] ?? ""}
                // value={getNestedValue(formData, field.initialValue) || formData[field.name] || ""}
                value={
                  typeof getNestedValue(formData, field.initialValue) === "boolean"
                    ? getNestedValue(formData, field.initialValue)
                      ? "Yes"
                      : "No"
                    : getNestedValue(formData, field.initialValue) ?? formData[field.name] ?? ""
                }
                providedOptions={field.providedOptions}
                hasSearch={field?.hasSearch}
                isDisbaled={field?.disable}
                error={errors?.[field?.name] || ""}
              />
            ))}
          </div>

          <div className='border-b border-t border-gray-200 mb-4'>

            <ul className="flex border-b w-full pl-10">
              {sectionNames.map((section, index) => (
                <li
                  key={index}
                  className={`px-4 py-2  cursor-pointer mx-6 ${selectedSection === section.value ? "border-b-2 border-[#5556a6] text-[#5556a6]" : "text-gray-600"
                    }`}
                  onClick={() => handleSelectedSection(section.value)}
                >
                  {section.NameToDisplay}
                  {section.requirement && <span className="text-red-500">*</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-2 border-b border-gray-200'>

            {sectionFields.map((field, index) => (
              <InputField
                key={`section-${index}`}
                label={field.label}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                optionLabel={field.optionLabel}
                // onChange={(e) => handleChange(field.name, e.target?.value ?? e)}
                onChange={(e) => handleChange(isEditMode ? field.initialValue : field.name, e.target?.value ?? e)}

                // value={formData[field.initialValue] ?? formData[field.name] ?? ""}
                // value={getNestedValue(formData, field.initialValue) || formData[field.name] || ""}
                // value={
                //   getNestedValue(formData, field.initialValue) !== undefined
                //     ? typeof getNestedValue(formData, field.initialValue) === "boolean"
                //       ? getNestedValue(formData, field.initialValue) ? "Yes" : "No"
                //       : getNestedValue(formData, field.initialValue)
                //     : formData[field.name] ?? ""
                // }
                value={(() => {

                  if(!isEditMode){
                    return formData[field?.name]
                  }
                  const value = 
                    typeof getNestedValue(formData, field.initialValue) === "boolean"
                      ? getNestedValue(formData, field.initialValue) 
                        ? "Yes" 
                        : "No"
                      : getNestedValue(formData, field.initialValue) 
                        || formData?.[field.initialValue] 
                        || formData?.[field.name] 
                        || initailValues?.[field.name]
                        || "";
                        // {field.name === "manufacturers" && console.log("hitt brooo");}
              
                        // {field.hasSearch && console.log(`Field: ${field.name}, Has Search: ${field?.hasSearch}, Value:`, value); }
                        // console.log(`Field: ${field.name}, Value:`, value);   
                  return value;
                })()}

                providedOptions={field.providedOptions}
                hasSearch={field?.hasSearch}
                isDisbaled={field?.disable}
                error={errors?.[field?.name] || ""}
              />
            ))}

          </div>
        </form>
        <div className='py-2 w-full flex justify-end'>
          <div className='flex items-center border border-[#5556a6] rounded-md w-fit mr-4'>


            {buttons.map((but, index) => {
              return (
                <div key={index} className='px-2'>

                  <button className={but.className} onClick={but.onClick}>{but.name}</button>
                  <span className={but.labelClassName} >{but.label}</span>
                </div>
              )
            })}
          </div>
        </div> 
      </div>
    </div>
  )
}

export default CommonForm