import React, { useState } from 'react';
import { updatePost } from '../Firebase/posts';
import { auth } from '../Firebase/firebase';
function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let author = auth.currentUser.displayName;
    const postData = {
      title: title,
      body: body,
      author: author,
    

    };
    console.log('Submitted Post:', postData);
    // Optionally send this data to a backend here
    await updatePost(postData);
    window.location.href='/';
    // Clear form
    setTitle('');
    setBody('');
  };

  return (
    <div className="w-80% mx-2 px-2  bg-surface rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-text-primary">Create a Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 placeholder:text-text-secondary text-text-secondary py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="4"
          className="border font-secondary placeholder:text-text-secondary text-text-secondary px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-gray-500 font-primary text-white py-2 px-4 rounded hover:bg-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
