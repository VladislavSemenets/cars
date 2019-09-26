import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Game from '../components/Home';
import * as BuildActions from '../actions/home';


function mapStateToProps(state) {
    return {
        subCategories: state.home.subCategories,
        categories: state.home.categories,
        categoryId: state.home.categoryId,
        selectedSubCategories: state.home.selectedSubCategories
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(BuildActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
