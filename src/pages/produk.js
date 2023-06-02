
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import '../../src/App.css';
const Produk = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    
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
                thumbnail : thumbnail,
                brand : brand,
                price : price,
              
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let data = await response.json();
       
        setPosts((prevProducts) => [data, ...prevProducts]);
        setTitle('');
        setDescription('');
        setImages([]);
        setThumbnail('');
        setBrand('');
        setPrice('')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title,description,thumbnail,brand,price);
       

    };
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumbnail(reader.result);
          };
          reader.readAsDataURL(file);
        }
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
                    
                    <label>Thumbnail</label>
                    <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    />
                    {thumbnail && (
                    <div className="thumbnail-preview">
                        <img src={thumbnail} alt="Thumbnail Preview" />
                    </div>
                    )}



                    <button type="submit">Add Post</button>
                </form>
            </div>




            <div className="posts-container">
                <div className ="row gy-4">
                {posts.map((post) => {
                    return (
                        <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" width={'30px'} src={post.thumbnail} alt={post.title}  />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.description}
                                </Card.Text>
                                <p>brand : {post.brand}</p>
                                <p> price of this product : {post.price} </p>
                                <div className="button">
                                <button onClick={() => deletePost(post.id)}>
                                    delete
                                </button>
                            </div>
                        </Card.Body>

                    </Card>
                    );
                })}

                </div>
                
            </div> 

                
        </div>
    );


};


export default Produk;