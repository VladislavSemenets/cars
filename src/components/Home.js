import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DynamicFields from './DynamicFields';

const materialStyles = (theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    form: {
        marginBottom: 25,
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        minWidth: 200
    },
});

class Home extends Component {
    static propTypes = {
        formFields: PropTypes.array,
        categories: PropTypes.array,
        selectedSubCategories: PropTypes.array,
        categoryId: PropTypes.string,
        subCategoryIds: PropTypes.string,
        handleChangeSubCategory: PropTypes.func,
        handleChangeCategory: PropTypes.func,
        handleChangeAdditionalField: PropTypes.func,
        handleSend: PropTypes.func
    };

    onSubmit = (event) => {
        event.preventDefault();

        const { categoryId, selectedSubCategories } = this.props;

        if (categoryId.length && selectedSubCategories.length) {
            this.props.handleSend();
        }
    };

    componentDidMount() {
        this.props.loadCategories();
    }

    render() {
        const {
            classes,
            categories,
            subCategories,
            categoryId,
            selectedSubCategories
        } = this.props;

        const {
            handleChangeCategory,
            handleChangeSubCategory,
            handleChangeAdditionalField
        } = this.props;

        return (
            <React.Fragment>
                <form className={classes.form}
                      noValidate={true}
                      onSubmit={this.onSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryId}
                            onChange={handleChangeCategory}>
                            {categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Sub Category</InputLabel>
                        <Select
                            multiple
                            renderValue={selected => selected.map(item => item.name).join(', ')}
                            value={selectedSubCategories}
                            onChange={handleChangeSubCategory}>
                            {subCategories.map(category => (
                                <MenuItem key={category._id} value={category}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {selectedSubCategories.map(subCategory => (
                        <React.Fragment key={subCategory.name}>
                            <Typography variant="h5">Additional Fields ({subCategory.name}): </Typography>
                            <DynamicFields
                                subCategoryId={subCategory._id}
                                fields={subCategory.fields}
                                handleChange={handleChangeAdditionalField} />
                        </React.Fragment>
                    ))}

                    <Button variant="contained" type="submit" className={classes.button}>
                        Send
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(materialStyles)(Home);
