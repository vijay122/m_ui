var ActionTypes = require('../actions/types');
var util = require('../util');
let DEFAULT_NAME = '';

const wayPoint = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WAY_POINT:
            return {
                id: util.guid(),
                name: DEFAULT_NAME
            };
        case ActionTypes.CHANGE_WAY_POINT_NAME:
            return Object.assign({}, state, {
                name: (action.newName.trim() || DEFAULT_NAME)
            });
        default:
            return state;
    }
};

module.exports = wayPoint;