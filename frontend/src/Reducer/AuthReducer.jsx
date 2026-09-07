// This reducer handles how your authentication state (like login/logout token) should change in response to certain actions.
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return {
                ...state,
                token: action.payload, // Sets the token received from login
            };
        }
        case "REMOVE_TOKEN": {
            // No need to remove token from localStorage here—already done in AuthContext
            return {
                ...state,
                token: "", // Clears the token from state (user is logged out)
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
