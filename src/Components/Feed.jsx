import React, { useRef } from 'react'
import Feedcomponent from './Feedcomponent'
import { useState, useEffect } from 'react';
import { getPaginatedPosts } from '../Firebase/posts'
import { Loader2 } from 'lucide-react';
function Feed() {
  const [feed, setFeed] = useState([]);  // Initialize feed state as an empty array
  const [loading, setLoading] = useState(false);  // Track loading state
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const offset = 7;
  const scrollContainerRef = useRef(null);
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const init = () => {
    return;
    console.log("called init");
    const savedFeed = sessionStorage.getItem("feed");
    const savedLastTimestamp = sessionStorage.getItem("lastTimestamp");

    if (savedFeed) {
      setFeed(JSON.parse(savedFeed));
    }
    if (savedLastTimestamp) {
      setLastTimestamp(savedLastTimestamp);
    }
  };

  useEffect(() => {
    return;
    const el = scrollContainerRef.current;
    const savedScroll = sessionStorage.getItem("scrollY");

    if (el && savedScroll && feed.length > 0) {
      requestAnimationFrame(() => {
        el.scrollTop = parseInt(savedScroll, 10);
        console.log("✅ Restored scroll to:", savedScroll);
      });
    }
  }, [feed]);
  useEffect(() => {
    return;
  const el = scrollContainerRef.current;

  const handleScroll = () => {
    if (!el) return;
    sessionStorage.setItem("scrollY", el.scrollTop.toString());
    sessionStorage.setItem("lastTimestamp", lastTimestamp);
    sessionStorage.setItem("feed", JSON.stringify(feed));
  };

  if (el) el.addEventListener("scroll", handleScroll);

  return () => {
    if (el) el.removeEventListener("scroll", handleScroll);
  };
}, [feed, lastTimestamp]);


  useEffect(() => {
    //on mount
    init();
  }, []);
  const addPosts = async () => {
    setLoading(true);
    const fetchedPosts = await getPaginatedPosts(lastTimestamp, offset);
    fetchedPosts.reverse();
    if (fetchedPosts.length < offset) setHasMore(false);
    if (fetchedPosts.length > 0) {
      setLastTimestamp(fetchedPosts[fetchedPosts.length - 1].timestamp);

      setFeed(prev => [...prev, ...fetchedPosts]);
    } //stop loading

    setLoading(false);
  }
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          addPosts();

        }
      },
      { threshold: 1.0 }
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loading, hasMore]);
  // If data is still loading, show a loading spinner or message

  return (
    <div className='flex flex-col h-full overflow-y-auto mb-5' ref={scrollContainerRef}>
      {feed.map((res, index) => (
        <Feedcomponent key={index} Obj={res} />
      ))}
      {hasMore &&
        <div className='span ' ref={loaderRef}><Loader2 className='w-full animate-spin h-10' /></div>}
    </div>
  )
}

export default Feed