import React, { useState, useEffect } from 'react';
import '../../src/App.css';
const BasicTable = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.Produk);
                setPosts(data.products);
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
    const addPosts = async (title, description) => {
        let response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            body: JSON.stringify({
                id: Math.random().toString(36).slice(2),
                title: title,
                description: description ,
                images: images,
              
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let data = await response.json();
        setPosts((posts) => [data, ...posts]);
        setTitle('');
        setDescription('');
        setImages([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title, description);
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
                    <label>description</label>
                    <textarea name="" className="form-control" id="body" cols="10" rows="8"
                        value={description} onChange={(e) => setDescription(e.target.value)}
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
                                {post.description}
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

export default BasicTable;