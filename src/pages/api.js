import React, { useState, useEffect } from 'react';
import '../../src/App.css';
const Api = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const deletePost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                setPosts(
                    posts.filter((post) => {
                        return post.id !== id;
                    })
                );
            } else {
                return;
            }
        });
    };
    // Post with fetchAPI
    const addPosts = async (title, body) => {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: Math.random().toString(36).slice(2),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let data = await response.json();
        setPosts((posts) => [data, ...posts]);
        setTitle('');
        setBody('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title, body);
    };


    return (
        <div>
            
            <div className="add-post-container">
                <form id="frmsubmit" onSubmit={handleSubmit}>
                    <label>title</label>
                    <input  id="title" type="text" className="form-control" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br/>
                    <label>body</label>
                    <textarea   name="" className="form-control" id="body" cols="10" rows="8"
                        value={body} onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <br/>
                    <button type="submit">Add Post</button>
                </form>
            </div>


            <div className="posts-container">
                {posts.map((post) => {
                    return (
                        <div className="post-card" key={post.id}>
                            <div className='title'>
                                {post.title}
                            </div>
                            <div className='body'>
                                {post.body}
                            </div>
                            <div className="button">
                                <button onClick={() => deletePost(post.id)}>
                                    delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );


};

export default Api;