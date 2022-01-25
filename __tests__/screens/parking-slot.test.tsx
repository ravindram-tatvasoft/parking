import { cleanup, render, fireEvent, waitFor, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import { Alert } from 'react-native'
import { Provider } from "react-redux"
import renderer from 'react-test-renderer'
import { store } from "../../redux/configureStore"
import { setParkingSlotList } from "../../redux/reducer/parking-slot-slice";
import { mockDataSlots } from "../../screens/parking-slots/mock-slot";
import ParkingSlot from "../../screens/parking-slots/parking-slot"
import { SlotContainer } from "../../screens/parking-slots/slot-container";
import { SlotContainerType } from "../../types/slot-container-type";
import { string } from "../../utils";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ goBack: jest.fn() }),
    useRoute: () => ({
        params: {}
    }),
}));



const spyAlert = jest.spyOn(Alert, 'alert');

const findElement = (tree, element) => {
    // console.log("Searched Tree: ", tree.children[0].children[1]);
    if (tree.props && tree.props.testID === element) {
    //   console.log("Searched Tree: ", tree);
      return tree;
    }
    if (tree.children && tree.children.length > 0) {
      let childs = tree.children;
      for (let i = 0; i < childs.length; i++) {
        let item = findElement(childs[i], element);
        if (typeof item !== "undefined") {
        //   console.log("Element: ", element);
          return item;
        }
      }
    }
  };

describe("Screen:: ParkingSlot ", () => {
    beforeEach(() => {
        store.dispatch(setParkingSlotList([]))
    })

    afterEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test("Match snapshot ", () => {
        const navigation = { navigate: jest.fn() };
        store.dispatch(setParkingSlotList(mockDataSlots))
        const tree = render(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>
        )
        expect(tree).toMatchSnapshot();
    })

    test("should render correctly ", async () => {
        const navigation = { navigate: jest.fn() };
        store.dispatch(setParkingSlotList(mockDataSlots))
        const { queryByTestId, getByTestId } = render(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>
        )
        await waitFor(() => {
            return queryByTestId('post-row-0');
        });

        expect(getByTestId('post-row-0'));
    })

    test("Render empty list ", () => {
        const navigation = { navigate: jest.fn() };
        store.dispatch(setParkingSlotList([]))
        const tree = render(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>
        )
        expect(tree).toMatchSnapshot();
    })

    test("Show empty message if no data ", async () => {
        const navigation = { navigate: jest.fn() };
        store.dispatch(setParkingSlotList([]))
        const { getByTestId } = render(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>
        );
        await waitFor(() => {
            return getByTestId('empty-slots');
        });
        expect(getByTestId('empty-slots').children[0]).toBe(string.emptySlot);
    })

    test("Click on slot", () => {
        const mockedOnRemoveCar = jest.fn();
        const props: SlotContainerType = {
            index: 0,
            item: mockDataSlots[0],
            onRemoveCar: mockedOnRemoveCar
        }
        const { getByTestId } = render(<SlotContainer {...props} />)
        const rootRowId = getByTestId("post-row-0")
        fireEvent(rootRowId, 'onLongPress')
        expect(mockedOnRemoveCar).toHaveBeenCalled()
    })

    test("Remove Car: show alert: cancel ", async () => {
        store.dispatch(setParkingSlotList(mockDataSlots))
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>).toJSON();
        expect(findElement(tree, "slot-flatlist")).toBeDefined();

        const FlatListRender = findElement(tree, "slot-flatlist").props.renderItem;
        console.log("props ",FlatListRender)

        const {getByTestId } = render(<FlatListRender index={0} item={mockDataSlots}/>)
        const toClick = getByTestId('post-row-0')
        fireEvent(toClick, 'onLongPress')
        // expect(a).toHaveBeenCalled()

        expect(Alert.alert).toHaveBeenCalled();
        // @ts-ignore
        spyAlert.mock.calls[0][2][0].onPress();     
    })

    test("Remove Car: show alert: ok ", async () => {
        store.dispatch(setParkingSlotList(mockDataSlots))
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(
            <Provider store={store}>
                <ParkingSlot navigation={navigation} />
            </Provider>).toJSON();
        expect(findElement(tree, "slot-flatlist")).toBeDefined();

        const FlatListRender = findElement(tree, "slot-flatlist").props.renderItem;
        console.log("props ",FlatListRender)

        const {getByTestId } = render(<FlatListRender index={0} item={mockDataSlots}/>)
        const toClick = getByTestId('post-row-0')
        fireEvent(toClick, 'onLongPress')
        // expect(a).toHaveBeenCalled()

        expect(Alert.alert).toHaveBeenCalled();
        // @ts-ignore
        spyAlert.mock.calls[0][2][1].onPress();     
    })

})

