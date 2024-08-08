import React, { useState, useEffect } from 'react';

export const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const savedTitle = localStorage.getItem('draftTitle');
    const savedBody = localStorage.getItem('draftBody');
    if (savedTitle) setTitle(savedTitle);
    if (savedBody) setBody(savedBody);
  }, []);

  useEffect(() => {
    localStorage.setItem('draftTitle', title);
    localStorage.setItem('draftBody', body);
  }, [title, body]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Title:', title);
    console.log('Body:', body);
    localStorage.removeItem('draftTitle');
    localStorage.removeItem('draftBody');
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};;