export const SET_ADDITIONAL_FIELD = 'SET_ADDITIONAL_FIELD';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SUB_CATEGORIES = 'SET_SUB_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SELECTED_SUB_CATEGORIES = 'SET_SELECTED_SUB_CATEGORIES';
export const CLEAR_FORM = 'CLEAR_FORM';

export function clearForm() {
    return {
        type: CLEAR_FORM,
        payload: { }
    };
}

export function setCategory(categoryId) {
    return {
        type: SET_CATEGORY,
        payload: { categoryId }
    };
}

export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        payload: { categories }
    };
}

export function setSubCategories(subCategories) {
    return {
        type: SET_SUB_CATEGORIES,
        payload: { subCategories }
    };
}

export function loadCategories() {
    return async (dispatch) => {
        const response = await window
            .fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/categories`)
            .then(response => response.json());

        dispatch(setCategories(response));
    }
}

export function handleSend() {
    return async (dispatch, getState) => {
        const {
            home: {
                categoryId,
                selectedSubCategories,
                additionalFields
            }
        } = getState();

        const data = {
            categoryId,
            selectedSubCategories,
            additionalFields
        };

        await window.fetch(
            `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/save-form-data`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        ).then(() => dispatch(clearForm()))
    }
}

export function handleChangeSubCategory({ target: { value } }) {
    return {
        type: SET_SELECTED_SUB_CATEGORIES,
        payload: { selectedSubCategories: value }
    };
}

export function handleChangeAdditionalField(subCategoryId, item) {
    return {
        type: SET_ADDITIONAL_FIELD,
        payload: { subCategoryId, item }
    };
}

export function handleChangeCategory({ target: { value } }) {
    return async (dispatch) => {
        dispatch(setCategory(value));

        const response = await window
            .fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/sub-categories/${value}`)
            .then(response => response.json());

        dispatch(setSubCategories(response));
    }
}
