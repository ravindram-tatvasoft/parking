// __tests__
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react-native";
import * as React from "react";
import { Button, ButtonProps } from "../../components";
import MockedNavigator from "../../navigation/MockedNavigator";
import CreateLot from "../../screens/createlot/create-lot";
import { Provider } from 'react-redux';
import { store } from "../../redux/configureStore"
import * as Utils from '../../utils/utils'
import { setParkingSlotList, setTotalParking } from "../../redux/reducer/parking-slot-slice";


jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ goBack: jest.fn() }),
    useRoute: () => ({
        params: {}
    }),
}));

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useFocusEffect: () => jest.fn(),
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});
let wrapper;

describe('Screen: CreateLot ', () => {

    beforeEach(() => {
        // wrapper = render(<MockedNavigator component={CreateLot}/>)
    })

    afterEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test(`renders correctly`, () => {
        // const tree =  render(<MockedNavigator component={CreateLot} />)
        const navigation = { navigate: jest.fn() };
        const tree = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        )
        expect(tree).toMatchSnapshot();
    });

    test("Enter lot should not be 0", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        )
        const totalPlot = "4";
        const createLotInput = getByTestId("CreateLot.inputPlot")
        await waitFor(() => {
            fireEvent.changeText(createLotInput, "4");
            expect(createLotInput.props.value).toBe(totalPlot);
        })
    })

    test("slotNumber should be > 0", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        )
        const totalPlot = "4";
        const createLotInput = getByTestId("CreateLot.inputPlot")
        await waitFor(() => {
            fireEvent.changeText(createLotInput, totalPlot);
            expect(createLotInput.props.value).toBe(totalPlot);
        })
    })

    test("should reset slot ", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        )
        const btnReset = getByTestId("idBtnResetSlot")
        const createLotInput = getByTestId("CreateLot.inputPlot")
        const createNoInput = getByTestId("CreateLot.inputCarNo")


        fireEvent.press(btnReset)
        await waitFor(() => {
            fireEvent.changeText(createLotInput, "");
            fireEvent.changeText(createNoInput, "");
        })
        expect(createLotInput.props.value).toBe("");
        expect(createNoInput.props.value).toBe("")
    })

    test("should open slot ", () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        )
        const btnOpenSlot = getByTestId("idBtnViewSlot")
        fireEvent.press(btnOpenSlot)
    })

    test("Car number must be there ", () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );
        jest.spyOn(Utils, "validateCarNo").mockReturnValue(true)
        const mockCarNo = "GJ01XXXXXX"
        const inputCarNo = getByTestId("CreateLot.inputCarNo")
        fireEvent.changeText(inputCarNo, mockCarNo)
        expect(inputCarNo.props.value).toBe(mockCarNo)

    })


    test("Create slot: if 0 show error ", () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );
        store.dispatch(setTotalParking(0))
        const btnCreateSlot = getByTestId("idBtnCreateSlot")
        fireEvent.press(btnCreateSlot)
    })

    test("Create slot: total slot > 0 ", async() => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );
        store.dispatch(setTotalParking(2))

        const createLotInput = getByTestId("CreateLot.inputPlot")
        await waitFor(() => {
            fireEvent.changeText(createLotInput, "4");
            expect(createLotInput.props.value).toBe("4");
        })

        const btnCreateSlot = getByTestId("idBtnCreateSlot")
        fireEvent.press(btnCreateSlot)
    })

    test("Add new car : valid number", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );

        const inputCarNo = getByTestId("CreateLot.inputCarNo")
        const mockCarNo = "GJ 01 XX XXXX"
        await waitFor(() => {
            fireEvent.changeText(inputCarNo, mockCarNo)
        })
        expect(inputCarNo.props.value).toBe(mockCarNo)
        jest.spyOn(Utils, "validateCarNo").mockReturnValue(true)
        const btnAdd = getByTestId("idBtnEnterCar")
        fireEvent.press(btnAdd)
    })

    test("Add new car : Not valid number - show error", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );

        const inputCarNo = getByTestId("CreateLot.inputCarNo")
        const mockCarNo = "GJ 01 XX XXX"
        await waitFor(() => {
            fireEvent.changeText(inputCarNo, mockCarNo)
        })
        expect(inputCarNo.props.value).toBe(mockCarNo)
        jest.spyOn(Utils, "validateCarNo").mockReturnValue(false)
        const btnAdd = getByTestId("idBtnEnterCar")
        fireEvent.press(btnAdd)
    })

    test("Add new car:: Slot not available show error", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );

        const inputCarNo = getByTestId("CreateLot.inputCarNo")
        const mockCarNo = "GJ 01 XX XXXX"
        await waitFor(() => {
            fireEvent.changeText(inputCarNo, mockCarNo)
        })
        store.dispatch(setTotalParking(4))
        store.dispatch(setParkingSlotList([{
            isEmpty: false
        }]))
        expect(inputCarNo.props.value).toBe(mockCarNo)
        jest.spyOn(Utils, "validateCarNo").mockReturnValue(true)
        const btnAdd = getByTestId("idBtnEnterCar")
        fireEvent.press(btnAdd)
    })

    test("Add new car:: Slot must be available", async () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId, getByText, queryAllByText } = render(
            <Provider store={store}>
                <CreateLot navigation={navigation} />
            </Provider>
        );

        const inputCarNo = getByTestId("CreateLot.inputCarNo")
        const mockCarNo = "GJ 01 XX XXXX"
        await waitFor(() => {
            fireEvent.changeText(inputCarNo, mockCarNo)
        })
        store.dispatch(setTotalParking(4))
        store.dispatch(setParkingSlotList([{
            id: 1,
            isEmpty: true
        },
        {
            id: 2,
            isEmpty: false
        }]))
        expect(inputCarNo.props.value).toBe(mockCarNo)
        jest.spyOn(Utils, "validateCarNo").mockReturnValue(true)
        const btnAdd = getByTestId("idBtnEnterCar")
        fireEvent.press(btnAdd)


    })

})
