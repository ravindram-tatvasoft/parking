import moment from "moment";
import { SlotListType } from "../../types/slot-list-tyle";

export const mockDataSlots: SlotListType[] = [
    {
        id: 'id-1',
        exitTime: moment().format(),
        isEmpty: false,
        slotNumber: 1,
        time: 1,
        carNumber: "GJ 01 XX XXXX"
    },
    {
        id: 'id-2',
        exitTime: moment().format(),
        isEmpty: true,
        slotNumber: 2,
        time: 2,
        carNumber: "GJ 02 XX XXXX"
    }
]
