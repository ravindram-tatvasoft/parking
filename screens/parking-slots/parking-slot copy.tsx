import { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles, string } from '../../utils';
import { SlotContainer } from './slot-container';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { SlotListType } from '../../types/slot-list-tyle';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../createlot/create-lot.style';
import { setParkingSlotList } from '../../redux/reducer/parking-slot-slice';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment'


export default function ParkingSlot({ navigation }) {

  const parkingSlot = useSelector(state => state.parkingSlot);
  const dispatch = useDispatch()

  const removeCarAlert = (index: number, item: SlotListType) => {
    Alert.alert('', 'Are you sure you want to remove car from parking?', [
      { text: 'Cancel', onPress: () => null },
      { text: 'OK', onPress: () => removeCar(index, item) },
    ], { cancelable: false })
  }

  const removeCar = (index: number, item: SlotListType) => {
    let updateCar: SlotListType = { ...parkingSlot.slotList[index] };
    updateCar.exitTime = moment().format()
    const tempList = JSON.parse(JSON.stringify(parkingSlot.slotList));
    tempList.splice(index, 1, updateCar)
    dispatch(setParkingSlotList(tempList))
    navigation.navigate("PaymentScreen", { slotDetail: updateCar })
  }

  const renderItem = ({ item, index }) => (
    <SlotContainer item={item} index={index} onRemoveCar={removeCarAlert} />
  );

  return (
    <View style={commonStyles.container}>
      {parkingSlot.slotList.length > 0 ? <View>
        <Text>{string.noteRemoveCar}</Text>
        <FlatList
          data={parkingSlot.slotList}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View> : <View style={commonStyles.viewCenter}>
        <Text>{string.emptySlot}</Text>
      </View>}
    </View>
  );
}

