"use client";
import "photoswipe/dist/photoswipe.css";
import React, { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "../app/new.css";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [after, setAfter] = useState("");

  const fetchData = () => {
    fetch(`https://www.reddit.com/r/memes.json?limit=1000&after=${after}`)
      .then((res) => res.json())
      .then((data) => {
        const postData = data.data.children.map((post) => ({
          title: post.data.title,
          thumbnail: post.data.thumbnail,
          url: post.data.url,
        }));
        setLoading(true);
        setPosts((prevPosts) => [...prevPosts, ...postData]);
        const newLoadData = data.data.after;

        if (newLoadData !== after) {
          setAfter(newLoadData);
        }
        console.log(newLoadData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelInfiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [handelInfiniteScroll]);

  if (isLoading) return <p>isLoading...</p>;
  if (!posts) return <p>No Data Found</p>;

  return (
    <>
      <div className="gallery-root">
        <div className="heading-bar">
          <h1> Gallery</h1>
        </div>

        <div className="gallery">
          <Gallery>
            {posts.map((post, index) => (
              <Item
                key={`${post.id}-${index}`}
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
                    alt="Img"
                  />
                )}
              </Item>
            ))}
          </Gallery>
        </div>
      </div>
    </>
  );
}
