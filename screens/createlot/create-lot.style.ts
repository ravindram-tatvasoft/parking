import { StyleSheet } from "react-native";
import { colors } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: 'black',
    height: 1,
    marginVertical: 25
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  input: {
    height: 40,
    marginVertical :12,
    borderWidth: 1,
    padding: 10,
  },
  resetBtnStyle: {
    marginHorizontal : 10
  },
  btnRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center"
  }
});

export {
  styles
}