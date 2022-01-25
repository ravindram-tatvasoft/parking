import { Alert } from "react-native"

export const showAlert = (message: string): void => {
    Alert.alert(message)
}

