//Dieses Skript beinhaltet alle Funktionen, die den Speicher des Handys benutzen.

import {SecureStore} from 'expo';


/*export default class Storage
{
    constructor() //Konstruktor für die Storage-Klasse
    {

    }
}*/

export async function storeUserAndKey(userID, privateKey) //Speichert den Session Key und die UserID im Verschlüsselten Speicher der App ab. Gleichzeitig wird sichergestellt, dass der alte Schlüssel gelöscht wird.
{
    SecureStore.setItemAsync("privateSessionKey", privateKey);
    SecureStore.setItemAsync("userID", userID);
}

export function getAppSessionKey() {
    return SecureStore.getItemAsync("privateSessionKey")
        .then((privateSessionKey) => {
            console.log("Aus dem Speicher als sessionKey abgerufen:" + privateSessionKey);
            return (privateSessionKey == null) ? ("") : (privateSessionKey);
        });
}

export function getUserID() {
    return SecureStore.getItemAsync("userID")
        .then((userID) => {
            console.log("Aus dem Speicher als userID abgerufen:" + userID);
            return (userID == null) ? ("") : (userID);
        });
}

