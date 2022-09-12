export const LoginDetailsSave = (id: Number, email: String, Username: String) => {
    return {
        type: "LoginDetailsSave",
        payload: {
            id: id,
            email: email,
            Username: Username
        }
    }
}

export const LogoutUser = () => {
    return {
        type: "LogoutUser"
    }
}

