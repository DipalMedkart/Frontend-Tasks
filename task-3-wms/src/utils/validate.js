export const validateForm = (formData, JSONData, selectedType, selectedSection) => {
    let errors = {};
  
    
    const generalFields = JSONData.find(item => item.category === "general")?.fields || [];
    generalFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
  
    
    const selectedCategory = JSONData.find(item => item.category === selectedType);
    const categoryFields = selectedCategory?.fields || [];
    categoryFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
  
    
    const selectedSectionData = selectedCategory?.sections?.find(sec => sec.name === selectedSection);
    const sectionFields = selectedSectionData?.fields || [];
    sectionFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
  
    return errors;
  };
  