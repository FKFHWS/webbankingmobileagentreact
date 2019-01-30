import {Platform, StyleSheet} from "react-native";
import {Constants} from "expo";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,

        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    myOkButton: {
        //border:  ,
        //flex: 1,
        //justifyContent: 'center',
        //position: 'relative',
        //top: '50%',
        //left: '50%',
        backgroundColor: "purple",
        //marginHorizontal: 'auto',
        //width: '40%',
        //maxWidth: '50%',

    },
    myCloseButton: {
        backgroundColor: 'grey',
        marginTop: Platform.OS === 'android' ? '8%' : '5%',
    },
    mySlider: {
        marginTop: Platform.OS === 'android' ? '7%' : '0%',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});