// __tests__
import * as React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { mockDataSlots } from "../../screens/parking-slots/mock-slot";
import { SlotContainer } from "../../screens/parking-slots/slot-container";
import { SlotContainerType } from "../../types/slot-container-type";

describe("Component: SlotContainer", () => {
    afterEach(() => {
        jest.clearAllMocks();
        cleanup()
    })

    test("should render ", () => {
        const props: SlotContainerType = {
            index: 1,
            item: mockDataSlots[0],
            onRemoveCar: jest.fn()
        }
        const tree = render(<SlotContainer {...props} />)
        expect(tree).toMatchSnapshot()
    })
})