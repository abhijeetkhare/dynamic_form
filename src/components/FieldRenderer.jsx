import React from 'react';

function FieldRenderer({ field, value, onChange }) {
  const {
    type,
    label,
    placeholder,
    dataTestId,
    options = [],
  } = field;

  const handleInputChange = (e) => {
    const inputValue = type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(inputValue);
  };

  switch (type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'date':
      return (
        <div>
          <label>{label}</label><br />
          <input
            type={type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder || ''}
            data-testid={dataTestId}
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label>{label}</label><br />
          <textarea
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder || ''}
            data-testid={dataTestId}
          />
        </div>
      );

    case 'dropdown':
      return (
        <div>
          <label>{label}</label><br />
          <select value={value} onChange={handleInputChange} data-testid={dataTestId}>
            <option value="">Select...</option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                data-testid={opt.dataTestId || undefined}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'radio':
      return (
        <div>
          <label>{label}</label><br />
          {options.map((opt) => (
            <label key={opt.value} style={{ marginRight: '12px' }}>
              <input
                type="radio"
                name={field.fieldId}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                data-testid={opt.dataTestId || undefined}
              />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div>
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={handleInputChange}
              data-testid={dataTestId}
            />
            {label}
          </label>
        </div>
      );

    default:
      return <div>Unsupported field type: {type}</div>;
  }
}

export default FieldRenderer;
