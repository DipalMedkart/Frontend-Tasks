// export const validateForm = (formData, JSONData, selectedType, selectedSection) => {
//     let errors = {};
  
    
//     const generalFields = JSONData.find(item => item.category === "general")?.fields || [];
//     generalFields.forEach(field => {
//       if (field.required && !formData[field.name]) {
//         errors[field.name] = `${field.label} is required`;
//       }
//     });
  
    
//     const selectedCategory = JSONData.find(item => item.category === selectedType);
//     const categoryFields = selectedCategory?.fields || [];
//     categoryFields.forEach(field => {
//       if (field.required && !formData[field.name]) {
//         errors[field.name] = `${field.label} is required`;
//       }
//     });
  
    
//     const selectedSectionData = selectedCategory?.sections?.find(sec => sec.name === selectedSection);
//     const sectionFields = selectedSectionData?.fields || [];
//     sectionFields.forEach(field => {
//       if (field.required && !formData[field.name]) {
//         errors[field.name] = `${field.label} is required`;
//       }
//     });
  
//     return errors;
//   };
  

// export const validateForm = (formData, JSONData, selectedType, selectedSection) => {
//   let errors = {};

//   const generalFields = JSONData.find(item => item.category === "general")?.fields || [];
//   const selectedCategory = JSONData.find(item => item.category === selectedType);
//   const categoryFields = selectedCategory?.fields || [];
//   const sectionFields = selectedCategory?.sections?.find(sec => sec.name === selectedSection)?.fields || [];

//   const allFields = [...generalFields, ...categoryFields, ...sectionFields];

//   allFields.forEach(field => {
//     if (field.required) {
//       // const fieldValue = formData[field.name] ?? formData[field.initialValue]; 
//       {field.initialValue && console.log(field.initialValue);}
//       const fieldValue = formData[field.initialValue] ?? formData[field.name]; 
      
//       if (!fieldValue || fieldValue === "") {
//         errors[field.name] = `${field.label} is required`;
//       }
//     }
//   });

//   return errors;
// };

export const validateForm = (formData, JSONData, selectedType, selectedSection, isEditMode) => {
  let errors = {};

  const getNestedValue = (obj, path) => {
    return path?.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
  };

  const generalFields = JSONData.find(item => item.category === "general")?.fields || [];
  const selectedCategory = JSONData.find(item => item.category === selectedType);
  const categoryFields = selectedCategory?.fields || [];
  const sectionFields = selectedCategory?.sections?.find(sec => sec.name === selectedSection)?.fields || [];

  const allFields = [...generalFields, ...categoryFields, ...sectionFields];

  allFields.forEach(field => {
    if (field.required) {
      let fieldValue;

      if (isEditMode) {
        // 🔹 In edit mode, check `initialValue` (nested structure)
        fieldValue = getNestedValue(formData, field.initialValue) ?? formData[field.name];
      } else {
        // 🔹 In add mode, check only `name`
        fieldValue = formData[field.name];
      }

      if (!fieldValue || fieldValue === "") {
        errors[field.name] = `${field.label} is required`;
      }
    }
  });

  return errors;
};

