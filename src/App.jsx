import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import Loading from "./Loading";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const secret = import.meta.env.VITE_REACT_APP_ACCESS_KEY;
      console.log(secret);
      const data = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${secret}&per_page=9&page=${page}`
      );
      setPhotos((prev) => [...prev, ...data.data]);
      setLoading(false);
      console.log(photos);
    };
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="gallery">
        {photos.map((val) => {
          return <Card key={val.id} id={val.id} img={val.urls.regular} />;
        })}
      </div>
      <div className="spinner">{loading && <Loading />}</div>
    </div>
  );
}

export default App;
