const initialStateList = {
    LoginDetails: []
}

function ReduxCommands(state = initialStateList, action: any) {
    switch (action.type) {
        case "LoginDetailsSave":
            return {
                LoginDetails: [{ id: action.payload.id, email: action.payload.email, Username: action.payload.Username }]
            }
        case "LogoutUser":
            return {
                LoginDetails: [],
            }
        default: return state
    }
}

export default ReduxCommands;
