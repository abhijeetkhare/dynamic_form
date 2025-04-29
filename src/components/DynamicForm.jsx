import React, { useState, useEffect } from 'react';

function DynamicForm() {
  const [formData, setFormData] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const fetchForm = async () => {
      const rollNumber = localStorage.getItem('rollNumber');
      const response = await fetch(`https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`);
      const data = await response.json();
      setFormData(data.form.sections);
    };

    fetchForm();
  }, []);

  const handleNext = () => {
    if (currentSection < formData.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted');
    // You can log or process the form data here
  };

  return (
    <div>
      {formData.length > 0 && (
        <>
          <h2>{formData[currentSection].title}</h2>
          <p>{formData[currentSection].description}</p>

          <form>
            {formData[currentSection].fields.map((field) => (
              <div key={field.fieldId}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  // Add other attributes such as value, onChange, etc.
                />
              </div>
            ))}
          </form>

          <div>
            <button onClick={handlePrev} disabled={currentSection === 0}>
              Previous
            </button>
            {currentSection === formData.length - 1 ? (
              <button onClick={handleSubmit}>Submit</button>
            ) : (
              <button onClick={handleNext}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DynamicForm;
