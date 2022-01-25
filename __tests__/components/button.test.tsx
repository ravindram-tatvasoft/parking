// __tests__
import { render } from "@testing-library/react-native";
import * as React from "react";
import { Button, ButtonProps } from "../../components";


describe('Component: Button ', ()=> {
    test(`renders correctly`, () => {
        const props: ButtonProps = {
            name: "Button",
            testId: "btnId",
            onPressButton: jest.fn()
        }
        const tree = render(<Button {...props} />);
        expect(tree).toMatchSnapshot();
    });
})
