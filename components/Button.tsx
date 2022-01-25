import {StyleSheet, TouchableOpacity, Text, TouchableOpacityProps, ViewStyle } from "react-native"
import { colors } from "../utils"

export interface ButtonProps extends TouchableOpacityProps {
    name: string,
    onPressButton: () => void,
    testId: string
    rootStyle?: ViewStyle | ViewStyle[]
}

export const Button = (props: ButtonProps) => {
    const { name, onPressButton, testId, rootStyle, ...rest} = props
    return(<TouchableOpacity testID={testId} onPress={onPressButton} style={[styles.root, rootStyle || []]}>
        <Text style={styles.txtName}>{name}</Text>
    </TouchableOpacity>)
}


const styles = StyleSheet.create({
    root: {
        backgroundColor:colors.primary,
        paddingHorizontal:20,
        paddingVertical: 10
    },
    txtName: {
        color: 'white',
        textAlign: "center"
    }
})