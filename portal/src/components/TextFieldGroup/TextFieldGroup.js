import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
                            name,
                            placeholder,
                            value,
                            label,
                            error,
                            errors,
                            info,
                            type,
                            onChange,
                            disabled,
                            required
                        }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': (error || errors),
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
            {errors && errors.map((e, key) => <div key={key} className="invalid-feedback">{e}</div>)}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    errors: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    required: PropTypes.string,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
