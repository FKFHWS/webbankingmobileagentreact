import {Platform, StyleSheet} from "react-native";
import {Constants} from "expo";

export const styles = StyleSheet.create({

    myOkButton: {
        //border:  ,
        //flex: 1,
        //justifyContent: 'center',
        //position: 'relative',
        //top: '50%',
        //left: '50%',
        backgroundColor: "purple",
        // marginTop: Platform.OS === 'android' ? '8%' : '5%',
        //marginHorizontal: 'auto',
        //width: '40%',
        //maxWidth: '50%',

    },
    myBackButton:
        {
            marginTop: '9%',
        },
    myCloseButton: {
        backgroundColor: 'grey',
        // marginTop: Platform.OS === 'android' ? '8%' : '5%',
    },
    myCameraView: {
        position: 'absolute', left: 0, right: 0, top: '25%', bottom: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,

        backgroundColor: '#ecf0f1',
        padding: 8,
    },

    myHeadline: {
        marginTop: '15%',
        fontSize: 27
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mySlider: {
        marginTop: Platform.OS === 'android' ? '7%' : '0%',
    },

});