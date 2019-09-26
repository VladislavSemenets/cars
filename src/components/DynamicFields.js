import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';

const materialStyles = (theme) => ({
    form: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        minWidth: 200
    },
});

class DynamicFields extends Component {
    static propTypes = {
        fields: PropTypes.array,
        subCategoryId: PropTypes.string
    };

    state = { };

    _handleChange = (event) => {
        const { subCategoryId } = this.props;
        const value = { [event.target.name]: event.target.value };

        this.setState(value);

        this.props.handleChange(subCategoryId, value);
    };

    render() {
        const { fields, classes } = this.props;

        return (
            <React.Fragment>
                {fields.map(rawField => {
                    let field = null;

                    if (rawField.type === 'select') {
                        field =
                            <FormControl className={classes.formControl}
                                         key={rawField.placeholder}>
                                <InputLabel shrink>{rawField.placeholder}</InputLabel>
                                <Select
                                    name={rawField.placeholder}
                                    value={this.state[rawField.placeholder] || ''}
                                    onChange={this._handleChange}
                                >
                                    {rawField.values.map((value, index) => (
                                        <MenuItem key={index} value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>;
                    }

                    if (rawField.type === 'input') {
                        field =
                            <FormControl className={classes.formControl}
                                         key={rawField.placeholder}>
                                <InputLabel shrink>{rawField.placeholder}</InputLabel>
                                <TextField
                                    name={rawField.placeholder}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={this._handleChange}
                                />
                            </FormControl>;
                    }

                    return field;
                })}
            </React.Fragment>
        );
    }
}

export default withStyles(materialStyles)(DynamicFields);
