import { database } from "./firebase.js";
import { getDatabase, ref, onValue, get, set, update, child } from "firebase/database";
import { updateProfile } from "firebase/auth";
export async function UserExists(userId) {
    try {

        const snapshot = await get(child(ref(database), `users/${userId}`));
        if (snapshot.exists()) {

            return true;
        } else {

            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
export async function CreateUser(UserId, Email) {
    Email = Email.replace(/[.#$[\]]/g, "_");
    await set(ref(database, 'users/' + UserId),
        {
            email: Email
        }).then((done) => { }).catch((err) => {

        });
    await set(ref(database, 'emailtouser/' + Email),
        {
            UserId: UserId
        });

}
export async function UpdateUser(UserId, Content) {
    try {
        const userRef = ref(database, `users/${UserId}`);
        await update(userRef, Content);

    } catch (error) {

    }
}

async function getUsername(Email) {
    try {
        Email = Email.replace(/[.#$[\]]/g, "_");

        const snapshot = await get(ref(database, `emailtouser/${Email}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const userId = data.USERID // assuming one-to-one mapping
            return userId;
        } else {

            return null;
        }
    } catch (err) {

        return null;
    }

}
export async function getUser(userId) {
    try {

        const snapshot = await get(child(ref(database), `users/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {

            return false;
        }
    } catch (error) {

        return null;
    }
}
export async function changeUsername(Email, prevUsername, newUsername, user) {
    try {
         Email = Email.replace(/[.#$[\]]/g, "_");
        if (await UserExists(newUsername)) {
            return false;
        }
       

        const oldRef = ref(database, 'users/' + prevUsername);
       // const newRef = ref(database, 'users/' + newUsername);
        const oldSnap = await get(oldRef);
        if (!oldSnap.exists()) return false;

        const updates = {
            [`emailtouser/${Email}`]: { UserId: newUsername },
            [`users/${newUsername}`]: oldSnap.val(),
            [`users/${prevUsername}`]: null
        };

        await update(ref(database), updates);
        await updateProfile(user, { displayName: newUsername });

        return true;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}