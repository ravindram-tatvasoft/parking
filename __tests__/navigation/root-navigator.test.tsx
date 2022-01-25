import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import { RootNavigator } from '../../navigation';
import MockedNavigator from '../../navigation/MockedNavigator';
import CreateLot from '../../screens/createlot/create-lot';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
// Use with React Native <= 0.63
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Use this instead with React Native >= 0.64
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing react navigation', () => {
    it("should render correctly", () => {
        const {toJSON} = render(
          <MockedNavigator 
            component={CreateLot}
            params={{data: "Fake data"}}
          />,
        );
        expect(toJSON()).toMatchSnapshot();
      });
   
});