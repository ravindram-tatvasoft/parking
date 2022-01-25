import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native';
import { styles } from "./create-lot.style"
import { Text, View } from '../../components/Themed';
import { commonStyles, string, validateCarNo } from '../../utils';
import { Button } from '../../components';
import { showAlert } from '../../utils/alerts'
import { useNavigation } from '@react-navigation/core';
import { setParkingSlotList, setTotalParking } from "../../redux/reducer/parking-slot-slice"
import { useDispatch, useSelector } from 'react-redux';
import { SlotListType } from '../../types/slot-list-tyle';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export default function CreateLot({ navigation }) {
    // const navigation = useNavigation();
    const dispatch = useDispatch();
    const parkingSlot = useSelector(state => state.parkingSlot);
    const [slotNumber, onChangeSlot] = useState<Number>(parkingSlot.totalParking);
    const [carNumber, setCarNumber] = useState<string>("")

    const validateSlot = async (): Promise<void> => {
        if (slotNumber <= 0) {
            showAlert(string.errNoSlot)
            return
        }
        console.log('.as')
        dispatch(setTotalParking(slotNumber))
        await prepareSlot()
        navigation.navigate("ParkingSlotScreen")
    }

    const prepareSlot = () => {
        return new Promise((resolve, reject) => {
            const tempSlot: SlotListType[] = [];
            for (let i = 0; i < slotNumber; i++) {
                tempSlot.push({
                    id: uuidv4(),
                    isEmpty: true,
                    time: null,
                    slotNumber: i + 1
                } as SlotListType)
            }
            dispatch(setParkingSlotList(tempSlot))
            resolve("")
        })
    }

    const resetSlot = (): void => {
        onChangeSlot(0)
        setCarNumber("")
        dispatch(setTotalParking(0))
        dispatch(setParkingSlotList([]))
    }

    const openSlot = () => {
        navigation.navigate("ParkingSlotScreen")
    }

    const addNewCar = (): void => {
        let errorMessage = ""
        const isValidNo = validateCarNo(carNumber);
        if(!isValidNo){
            errorMessage ="Please enter valid car number: XX XX XX XXXX"
        }
        console.log("fsa.")
        parkingSlot.slotList.length <= 0 && (errorMessage = string.emptySlot);
        (!carNumber || carNumber.trim().length <= 0) && (errorMessage = string.errorEnterCarNo);

        const isSlotAvailable = parkingSlot.slotList.findIndex((item: SlotListType) => {
            return item.isEmpty === true
        })
        isSlotAvailable < 0 && (errorMessage = string.parkingFull);
        if (errorMessage) {
            showAlert(errorMessage)
            return
        }
        console.log("as.")
        //get random value and assignt to car
        const emptySlotList: SlotListType[] = parkingSlot.slotList.filter((item: SlotListType) => item.isEmpty)
        const randomPosition = Math.floor((Math.random()) * emptySlotList.length)
        const updatedSlot = parkingSlot.slotList.map((item: SlotListType) => {
            console.log(item.id === emptySlotList[randomPosition].id)
            return item.id === emptySlotList[randomPosition].id ? {
                ...item,
                ...{
                    isEmpty: false,
                    carNumber: carNumber,
                    time: moment().format()
                }
            } : item
        })
        dispatch(setParkingSlotList(updatedSlot))
        setCarNumber("")
        navigation.navigate("ParkingSlotScreen")
    }

    return (
        <View style={commonStyles.container}>
            <TextInput
            testID={"CreateLot.inputPlot"}
                style={[styles.input, { marginHorizontal: 10 }]}
                onChangeText={(value) => onChangeSlot(parseInt(value))}
                value={`${slotNumber || ''}`}
                placeholder={string.holderEnterSlot}
                keyboardType='number-pad'
            />
            <View style={styles.btnRoot}>
                <Button disabled={true} testId="idBtnCreateSlot" name="Create" onPressButton={validateSlot} />
                <Button testId="idBtnResetSlot" name="Reset Slot" onPressButton={resetSlot} rootStyle={styles.resetBtnStyle} />
                <Button testId="idBtnViewSlot" name="View Slot" onPressButton={openSlot} />
            </View>
            <View style={styles.divider} />
            <View style={commonStyles.paddingHoriontal}>
                <TextInput
                    testID="CreateLot.inputCarNo"
                    style={styles.input}
                    onChangeText={(value) => setCarNumber(value)}
                    value={carNumber}
                    autoCapitalize='characters'
                    placeholder={string.holderCarNumber}
                    keyboardType='default'
                />
                <Button testId="idBtnEnterCar" name="Enter Car" onPressButton={addNewCar} />
            </View>
        </View>
    );
}

