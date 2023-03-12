import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";



const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;


  const { currentUser, logout } = (AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              {/* {currentUser ? (
                <Link to={`/post/${post.id}`}>
                  <img src={`../upload/${post.img}`} alt="" />
                </Link>) : (
                <Link to="/login">
                  <img src={`../upload/${post.img}`} alt="" />
                </Link>)} */}

              <Link to={`/post/${post.id}`}>
              <img src={`../upload/${post.img}`} alt="" />
              </Link>
            </div>
            <div className="content">

              {/* {!logout ? (
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>) : (
                <Link className="link" to="/login">
                  <h1>{post.title}</h1>
                </Link>)} */}

              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>

              <p>{getText(post.desc)}</p>

              {/* { (currentUser && !logout) ? (
                <Link className="link" to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>) : (
                <Link className="link" to="/login">
                  <button>Read More</button>
                </Link>)} */}

              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;