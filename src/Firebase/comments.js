import { database } from "./firebase.js";
import { set, ref, push, child ,query,orderByChild,limitToFirst,get} from "firebase/database";
export async function addComment(PostId, obj) {
    try {
        const Id = push(child(ref(database), 'comments' + PostId)).key;
        await set(ref(database, 'comments/' + PostId + '/' + Id),
            {
                author: obj.author,
                body: obj.body,
                timestamp: new Date().getTime() * -1
            }).then(() => { console.log('success') })

    } catch (error) {
    }
}
export async function getPaginatedComments(PostId) {
    const commentsref = ref(database, 'comments/' + PostId);

    // Query to get posts after the last retrieved post, ordered by timestamp
    const commentsQuery = query(
        commentsref,
        orderByChild('timestamp'),
        //startAt(lastTimestamp),  // Start from the last retrieved post's timestamp
        limitToFirst(20)          // Limit to 20 posts per fetch
    );

    try {
        const snapshot = await get(commentsQuery);
        if (snapshot.exists()) {
            const comments = snapshot.val();
            const  commentsArray = Object.keys(comments).map(key => ({
                id: key, ...comments[key]
            }));

            return commentsArray;
        } else {
            console.log("No more posts.");
            return [];
        }
    } catch (error) {
       
    }
}