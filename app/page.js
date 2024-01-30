"use client";
import "photoswipe/dist/photoswipe.css";
import React, { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
// import InfiniteScroll from "react-infinite-scroll-component";
import "../app/new.css";

export default function page() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hashMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://www.reddit.com/r/memes.json?limit=1000")
    // fetch("https://www.reddit.com/r/memes.json?limit=1000&after=t3_1abxcek")
    // fetch(`https://www.reddit.com/r/memes.json?limit=100&after=t3_${page}`)
      .then((res) => res.json())
      .then((data) => {
        const postData = data.data.children.map((post) => ({
          title: post.data.title,
          thumbnail: post.data.thumbnail,
          url: post.data.url,
        }));
        setPosts(postData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) return <p>isLoading...</p>;
  if (!posts) return <p>No Data Found</p>;

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center",backgroundColor:"black", color:"whitesmoke" }}>Gallery</h1>
      <div className="gallery">
        <Gallery>
          {posts.map((post, index) => (
            <Item
              
              id={index}
              thumbnail={post.thumbnail}
              original={post.url}
              title={post.title}
              width="800"
              height="750"
            >
              {({ ref, open }) => (
             
                <img
                  style={{ width: "100%" }}
                  ref={ref}
                  onClick={open}
                  thumbnail={post.thumbnail}
                  src={post.url}
                  key={index}
                />
              )}
            </Item>
          ))}
        </Gallery>
      </div>
    </>
  );
}
