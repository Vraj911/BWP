import { child, get, ref, set } from "firebase/database";
import { database } from "./firebase";
export async function hasSeenGeneralNotifications(Email)
{
    try {
        Email = Email.replace(/[.#$[\]]/g, "_");
        const snapshot = await get(child(ref(database), `general-notifications/users/${Email}`));
        if(snapshot.exists())
        {
            return true;
        }
        else return false;

    } catch (error) {
        return true;
    }
}
export async function sawGeneralNotifications(Email)
{
    try {
        Email = Email.replace(/[.#$[\]]/g, "_");
         await set(ref(database, 'general-notifications/users/' + Email),
                true);
    } catch (error) {
        console.log;
    }
}