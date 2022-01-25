import { useNavigation, useRoute } from '@react-navigation/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import { setParkingSlotList } from '../../redux/reducer/parking-slot-slice';
import { SlotListType } from '../../types/slot-list-tyle';
import { commonStyles, getDifferenceDate, getDifferenceDateString, msToTime } from '../../utils';
import { styles } from './payment.style'


export default function PaymentScreen() {
    const totalHourPrice = 10;
    const routes = useRoute()
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const parkingSlot = useSelector(state => state.parkingSlot);
    const [slotDetail, setSlotDetails] = useState(routes.params.slotDetail || {})
    const [totalPrice, setTotalPrice] = useState("calculating..")

    useEffect(() => {
        calculateCharge()
    }, [])

    const doPayment = () => {
        const tempList = JSON.parse(JSON.stringify(parkingSlot.slotList));
        const index = tempList.findIndex((item: SlotListType) => item.id === slotDetail.id)
        let updateCar: SlotListType = { ...parkingSlot.slotList[index] };
        updateCar.isEmpty = true
        tempList.splice(index, 1, updateCar)
        dispatch(setParkingSlotList(tempList))
        navigation.reset({
            index: 0,
            routes: [{ name: "CreateLotScreen" }]
        })
        alert("Payment done.")
    }

    const calculateCharge = () => {
        const { hour, minutes } = getDifferenceDate(slotDetail?.time, slotDetail?.exitTime)
        let totalAmount = 0;
        if (hour <= 0) {
            totalAmount = totalHourPrice
        } else {
            totalAmount = hour * totalAmount
        }
        setTotalPrice(`$${totalAmount}`)
    }
    return (
        <View style={[commonStyles.container, styles.root]}>
            <View style={styles.lableRoot}>
                <Text style={styles.txtLable}>In time: </Text>
                <Text>{msToTime(slotDetail?.time)}</Text>
            </View>

            <View style={[styles.lableRoot]}>
                <Text style={styles.txtLable}>Out time: </Text>
                <Text>{msToTime(slotDetail?.exitTime)}</Text>
            </View>

            <View style={[styles.lableRoot]}>
                <Text style={styles.txtLable}>Difference </Text>
                <Text>{getDifferenceDateString(slotDetail.time, slotDetail.exitTime)}</Text>
            </View>

            <View style={[styles.chargeNote]}>
                <Text style={styles.txtLable}>Charge Notes </Text>
                <Text>1. First 2 hour $10</Text>
                <Text>2. $10 will be charged for every consecutive hour then after</Text>
            </View>

            <View style={[styles.lableRoot]}>
                <Text style={styles.txtLable}>Total Amount </Text>
                <Text>{totalPrice}</Text>
            </View>

            <Button testId="idBtnPay" name="Pay" onPressButton={doPayment} />
        </View>
    );
}
