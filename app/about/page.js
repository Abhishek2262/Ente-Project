"use client";
import "photoswipe/dist/photoswipe.css";
import React, { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "./pge.css";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function page() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [after, setAfter] = useState("");

  const fetchData = () => {
    
    fetch(`https://www.reddit.com/r/memes.json?limit=1000&after=${after}`)
    // fetch("https://www.reddit.com/r/memes.json?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        const postData = data.data.children.map((post) => ({
          title: post.data.title,
          thumbnail: post.data.thumbnail,
          url: post.data.url,
        }));
        // setPosts((prevPosts) => [...prevPosts, ...postData]);
        // setPosts([...posts, ...postData]);
        // setPosts(postData);
        // setAfter(data.data.after);
        
       
        setPosts((prev)=>[...prev, ...postData]);
        setAfter(data.data.after); 
         console.log(data.data.after);
        //  resolve();
        setLoading(false);
       
        // if (postData.length < 100) {
        //   setHasMore(false);
        // } else {
        //   setPage((prevPage) => prevPage + 1);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelInfiniteScroll = async ()=>{
    try{ 
     if( window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      // setLoading(true);
      // setPage((prev) => prev +1); 
      // setAfter(after+1 );
      // setAfter(data.data.after);
      // fetchData();
      // setLoading(false);
      setLoading(true);
      await fetchData();
      setLoading(false);
     
     }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    // setLoading(false);
  }, []);
  useEffect(()=>{
    window.addEventListener('scroll',handelInfiniteScroll);
    return()=> window.removeEventListener('scroll', handelInfiniteScroll)
  },[]);

  if (isLoading) return <p>isLoading...</p>;
  if (!posts) return <p>No Data Found</p>;

  return (
    <>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "black",
          color: "whitesmoke",
        }}
      >
        Gallery
      </h1>
      {/* <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
      <div className="gallery">
        <Gallery>
          {posts.map((post, index) => (
            <Item
              id={post.id}
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
      {/* </InfiniteScroll> */}
    </>
  );
}
