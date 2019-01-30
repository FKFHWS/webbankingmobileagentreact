//In dieses Skript wurden alle Funktionen gepackt, die eine Kommunikation mit dem Server durchführen.
import {Notifications, Permissions} from 'expo';


export function checkCredentials(username, password) {
    // Vorgang mit Fetch funktioniert nicht wirklich gut, aber es kann eine über then eine gewisse Synchronitöt gewährleistet werden.
    return fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
        method: 'POST',
        headers: [
            ['Content-Type', 'application/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
            ['Accept', 'application/json']
        ],
        body: 'mode=1'  //Später mal aus dem Enum beziehen....
            + '&id=' + username   //&id=username
            + '&pw=' + password  //&pw=passwordbodystring,

    })
        .then((response) =>
            //response.formData() //Antwort als formData auslesen
            response.json()//Antwort als String auslesen
        )
        .then((responseJson) => {
            return responseJson;
            //responsebody.get("mode") // Einzelnen Schlüssel in der FormData auslesen
        })
        /**** Dies wird für formData benötigt, funktioniert jedoch nicht
         .then ((formEntry)                =>
         {
                console.log(formEntry);
                return formEntry; //Den entsprechenden String über .then() abrufen und als return ausgeben
                })
         ***********************************************************/
        .catch((error) => {

            alert(error);//DEBUG
            return 'FEHLER';//DEBUG
        });
    //console.log('Die Antwort des Servers hat den Wert: ' + successJson); //DEBUG
    //return successJson;
    //let url = 'https://fhwswebbankingapp.ddns.net/appdaemon.php';
}

export function checkSessionKey(userid, sessionKey) {
    return fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
        method: 'POST',
        headers: [
            ['Content-Type', 'application/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
            ['Accept', 'application/json']
        ],
        body: 'mode=2'  //Später mal aus dem Enum beziehen...., in diesem Fall soll der Modus LoginToken gewählt werden.
            + '&id=' + userid   //&id=username
            + '&sessionKey=' + sessionKey //&sessionKey=234235235afedfeafea235.....
    })
        .then((response) =>
            response.json()) //Antwort in Json parsen
        .then((responseJson) => {
            return (responseJson.mode == 0); //Den Eintrag mode aus dem Json abrufen. Ist der Mode auf '0' gesetzt, wurden die Credentials vom Server erfolgreich autorisiert.
        })
        .catch((error) => {
            console.log(error); //DEBUG
            return "Fehler"; //DEBUG
        });
}

export function getUserMasterData(userid, sessionKey) {
    return fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
        method: 'POST',
        headers: [
            ['Content-Type', 'application/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
            ['Accept', 'application/json']
        ],
        body: 'mode=3'  //Später mal aus dem Enum beziehen...., in diesem Fall soll der Modus GetMasterData gewählt werden.
            + '&id=' + userid   //&id=username
            + '&sessionKey=' + sessionKey //&sessionKey=234235235afedfeafea235.....
    })
        .then((response) =>
            response.json()) //Antwort in Json parsen
        .then((responseJson) => {
            return responseJson.masterData; //Den Eintrag masterData aus dem Json als Return zurückgeben
        })
        .catch((error) => {
            console.log(error); //DEBUG
            return "Fehler"; //DEBUG
        });
}

// async function checkCredentials(username, password)
// {
//     /* Dies ist der Login über die API (...../api.php/records/....)
//     let loginjson = fetch('https://194.95.221.67/api.php/records/kunde', {
//         method: 'GET',
//         body: {
//             filter: 'ID,eq,' + this.state.username,
//             filter: 'PASSWORD,eq,' + this.state.password,
//         }
//     });
//     **********************************************************************/
//     try {
//         let bodystring = 'mode=1'  //Später mal aus dem Enum beziehen....
//             + '&id=' + username   //&id=username
//             + '&pw=' + password ;  //&pw=password
//         console.log('Der Bodystring hat den Wert: ' + bodystring);
//         let response = await fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
//             method: 'POST',
//             body: bodystring,
//         });
//         //console.log("Fetch ausgeführt");//DEBUG
//         let loginstring = await response.text();
//         console.log("loginstring hat den wert: " + loginstring);
//         console.log('#########Die Header sind: ##########'+ await response.headers + '##########################');
//         return loginstring;
//     }
//     catch(error)
//     {
//         console.log(error);//DEBUG
//         return 'Fehler';
//     }
// }


const PUSH_ENDPOINT = 'https://fhwswebbankingapp.ddns.net/appdaemon.php';

export async function registerForPushNotificationsAsync(userid, sessionKey) {
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();


    // POST the token to your backend server from where you can retrieve it to send push notifications.
    console.log('mode=4' //Modus 4 Wählen: ActivatePush
        + '&token=' + token //Parameter token auf den Tokenwert setzen.
        + '&id=' + userid //ID mitsenden, um das Paket zuweisen zu können.
        + '&sessionKey=' + sessionKey); //DEBUG
    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: [
            ['Content-Type', 'application/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
            ['Accept', 'application/json']
        ],
        body:
            'mode=4' //Modus 4 Wählen: ActivatePush
            + '&token=' + token //Parameter token auf den Tokenwert setzen.
            + '&id=' + userid //ID mitsenden, um das Paket zuweisen zu können.
            + '&sessionKey=' + sessionKey,

    });
}

export function killSession(userid, sessionKey) {
    console.log('mode=100'  //Modus Kill Session
        + '&id=' + userid   //&id=username
        + '&sessionKey=' + sessionKey//&sessionKey=234235235afedfeafea235.....)
    );//DEBUG
    return fetch('https://fhwswebbankingapp.ddns.net/appdaemon.php', { //Serveradresse muss bei IOS Zertifikate beinhalten
        method: 'POST',
        headers: [
            ['Content-Type', 'application/x-www-form-urlencoded'],
            ['Access-Control-Allow-Origin', '*'],
            ['Accept', 'application/json']
        ],
        body: 'mode=100'  //Modus Kill Session
            + '&id=' + userid   //&id=username
            + '&sessionKey=' + sessionKey //&sessionKey=234235235afedfeafea235.....
    })
        .then((response) =>
            response.json()) //Antwort in Json parsen
        .then((responseJson) => {
            return (responseJson.mode == 0); //Den Eintrag mode aus dem Json abrufen. Ist der Mode auf '0' gesetzt, wurden die Credentials vom Server erfolgreich autorisiert.
        })
        .catch((error) => {
            console.log(error); //DEBUG
            return "Fehler"; //DEBUG
        });
}
