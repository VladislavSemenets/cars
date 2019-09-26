import {
    CLEAR_FORM,
    SET_ADDITIONAL_FIELD,
    SET_CATEGORIES,
    SET_SUB_CATEGORIES,
    SET_CATEGORY,
    SET_SELECTED_SUB_CATEGORIES
} from '../actions/home';

const initialState = {
    categoryId: '',
    categories: [],
    subCategories: [],
    additionalFields: {},
    selectedSubCategories: [],
};

export default function home(state = initialState, action) {
    switch (action.type) {
        case CLEAR_FORM: {
            return {
                ...state,
                selectedSubCategories: [],
                additionalFields: {}
            };
        }

        case SET_ADDITIONAL_FIELD:
            const { subCategoryId, item } = action.payload;

            return {
                ...state,
                additionalFields: {
                    ...state.additionalFields,
                    [subCategoryId]: {
                        ...state.additionalFields[subCategoryId],
                        ...item
                    }
                }
            };

        case SET_CATEGORIES:
            const { categories } = action.payload;

            return { ...state, categories };

        case SET_CATEGORY:
            const { categoryId } = action.payload;

            return { ...state, categoryId };

        case SET_SUB_CATEGORIES:
            const { subCategories } = action.payload;

            return { ...state, subCategories };

        case SET_SELECTED_SUB_CATEGORIES:
            const { selectedSubCategories } = action.payload;
            const prevAdditionalFields = state.additionalFields;

            let additionalFields = {};

            additionalFields = Object
                .keys(prevAdditionalFields)
                .reduce((fields, field) => {
                    if (selectedSubCategories.find(subCategory => subCategory._id === field)) {
                        fields[field] = prevAdditionalFields[field];
                    }

                    return fields;
                }, {});

            return {
                ...state,
                selectedSubCategories,
                additionalFields
            };

        default:
            return state;
    }
}
