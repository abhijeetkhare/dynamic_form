import React, { useState } from 'react';
import FieldRenderer from './FieldRenderer';

function FormSection({ section, onSectionValid }) {
  const [fieldValues, setFieldValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error on change
    setErrors((prev) => ({
      ...prev,
      [fieldId]: '',
    }));
  };

  const validateField = (field, value) => {
    if (field.required && !value) {
      return field.validation?.message || 'This field is required';
    }
    if (field.minLength && value.length < field.minLength) {
      return `Minimum length is ${field.minLength}`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `Maximum length is ${field.maxLength}`;
    }
    return '';
  };

  const validateSection = () => {
    const newErrors = {};
    let isValid = true;

    section.fields.forEach((field) => {
      const value = fieldValues[field.fieldId] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.fieldId] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateSection()) {
      onSectionValid(fieldValues);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '20px' }}>
      <h3>{section.title}</h3>
      <p>{section.description}</p>

      {section.fields.map((field) => (
        <div key={field.fieldId} style={{ marginBottom: '16px' }}>
          <FieldRenderer
            field={field}
            value={fieldValues[field.fieldId] || ''}
            onChange={(value) => handleChange(field.fieldId, value)}
          />
          {errors[field.fieldId] && (
            <div style={{ color: 'red', fontSize: '14px' }}>{errors[field.fieldId]}</div>
          )}
        </div>
      ))}

      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default FormSection;
