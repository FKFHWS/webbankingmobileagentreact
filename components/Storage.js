//Dieses Skript beinhaltet alle Funktionen, die den Speicher des Handys benutzen.

import {SecureStore} from 'expo';


/*export default class Storage
{
    constructor() //Konstruktor für die Storage-Klasse
    {

    }
}*/

export async function storeUserAndKey(privateKey, userID) //Speichert den Session Key und die UserID im Verschlüsselten Speicher der App ab. Gleichzeitig wird sichergestellt, dass der alte Schlüssel gelöscht wird.
{
    SecureStore.setItemAsync("privateSessionKey", privateKey);
    SecureStore.setItemAsync("userID", privateKey);
}

export function getAppSessionKey() {
    return SecureStore.getItemAsync("privateSessionKey")
        .then((privateSessionKey) => {
            return privateSessionKey == null ? "" : privateSessionKey
        });
}

export function getUserID() {
    return SecureStore.getItemAsync("userID")
        .then((userID) => {
            return userID == null ? "" : userID
        });
}

