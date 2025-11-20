import { ref, update, push, child, query, orderByChild, startAt, limitToFirst, get, orderByValue, startAfter } from "firebase/database";
import { database } from "./firebase.js"; // Adjust this import based on your setup

export async function updatePost(post, Id) {

  if (!Id) Id = push(child(ref(database), 'posts')).key;
  const postRef = ref(database, `posts/${Id}`);
  await update(ref(database, 'users/' + post.author + '/posts/'), {
    [Id]: new Date().getTime() * -1
  });
  let time = new Date().getTime() * -1;
  await update(postRef, {
    title: post.title,
    body: post.body,
    author: post.author,
    timestamp: post.timestamp || time,
    likes: post.likes || 0,
    comments: post.comments || 0
  })
    .then(() => {
      
    })
    .catch((error) => {
     
    });

}
export async function getPaginatedPosts(lastTimestamp,offset) {
  const postsRef = ref(database, 'posts');

  // Query to get posts after the last retrieved post, ordered by timestamp
 let postsQuery;
 if(lastTimestamp===null)
 {
  postsQuery = query(
      postsRef,
      orderByChild('timestamp'),
      limitToFirst(offset)
    );
 }
 else  postsQuery = query(
      postsRef,
      orderByChild('timestamp'),
      startAfter(lastTimestamp),
      limitToFirst(offset)
    );

  try {
    const snapshot = await get(postsQuery);
    if (snapshot.exists()) {
      const posts = snapshot.val();
      const postsArray = Object.keys(posts).map(key => ({
        id: key, ...posts[key]
      }));

      return postsArray;
    } else {
      
      return [];
    }
  } catch (error) {
   console.log(error.message);
  }
}
export async function getPost(postId) {
  try {

    const snapshot = await get(child(ref(database), `posts/${postId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {

      return null;
    }
  } catch (error) {
    
    return null;
  }
}
export async function getPostsOfUser(userId) {
  const postsRef = ref(database, 'users/' + userId + '/posts');

  const postsQuery = query(
    postsRef,
    orderByValue(),
    limitToFirst(20)
  );

  try {
    const snapshot = await get(postsQuery);
    if (snapshot.exists()) {
      let arr = Object.keys(snapshot.val());
      let temp = [];
      for (let i = 0; i < arr.length; i++) {
        const post = await getPost(arr[i]);
        temp.push(post);
      }
    
      temp.reverse();
      return temp;
    } else {
      return [];
    }
  } catch (error) {
    
    return [];
  }
}
