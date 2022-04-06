import { Link } from "react-router-dom";
import { useDBdata } from "../../context/db-data-context";
import { Loader } from "../../loader/Loader"
import { CategoryCard } from "./CategoryCard"
import "./homePage.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../utilities/server-request/server-request";
import { ErrorPage } from "../errorPage/ErrorPage";

export function HomePage() {
  const { dataState, dataDispatch } = useDBdata();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataState.categories.length) {
      (async () => {
        try{
          setLoading(true)
          const categoriesData = await getCategories();
          dataDispatch({ type: "CATEGORIES", payload: categoriesData.data.categories });
          setLoading(false);
        }
        catch(err){
          setLoading(false);
          setError(true)
        }
      
      })()
    }
  },[])
  return (
    <main>
      <div className="hero-section">
        <div className="hero-text heading h2">
          <em className="my-1">TAKE YOUR BAKING SKILLS TO THE NEXT LEVEL</em>
          <Link to="/explore" className="btn-basic btn-primary btn-md">
            Explore Now
          </Link>
        </div>
        <img
          className="img-hero"
          src="assets/hero-image.jpg"
          alt="celebrations"
        ></img>
      </div>

      {/* category list */}

      <div className="category-cards my-2">
        {dataState.categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      {loading && <Loader />}
      {error && <ErrorPage/>}
    </main>
  );
}
