import { useVideoListData } from "../../context/video-list-management";
import "./homePage.css";

export function CategoryCard({category}){
  const { goToVideoListing } = useVideoListData();
 
    return(
        <div className="link card card-basic" onClick={() => goToVideoListing(category.categoryIdentity)}>
        <img loading="lazy" 
          className="card-content"
          src={category.image}
          alt={category.categoryName}
        />
        <div className="card-header">
          <div className="card-title">{category.categoryName}</div>
        </div>
      </div>
    )
}