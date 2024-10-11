import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
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
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      <div className="posts">
        {/* Mapping over the posts state variable and rendering a Post component for each post */}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-img">
              {/* Rendering the post image */}
              <img src={`../upload/${post.img}`} alt="post cover" />
            </div>
            <div className="content">
              {/* Rendering a link to the post page */}
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* Rendering the post description */}
              <p>{getText(post.desc)}</p>
              {/* Rendering a button to read more */}
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