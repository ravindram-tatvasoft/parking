import { SlotListType } from "./slot-list-tyle";

export interface SlotContainerType {
    item: SlotListType,
    index: number
    onRemoveCar: (index:number, item: SlotListType) => void
}