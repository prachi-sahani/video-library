import { useVideoListData } from "../../../context/video-list-management";
import "./videoListing.css";
export function CategoryTags({ categories }) {
  const { selectedCategory, setSelectedCategory } = useVideoListData();

  // returns className for styling on category selection
  function isCategorySelected(category) {
    return category.toLowerCase() === selectedCategory.toLowerCase()
      ? "category-selected"
      : "";
  }
  return (
    <div className="filter-tags">
      <button
        className={`filter-tag-item ${isCategorySelected("ALL")}`}
        onClick={() => setSelectedCategory("All")}
      >
        ALL
      </button>
      {categories.map((category) => (
        <div
          key={category._id}
          className={`filter-tag-item ${isCategorySelected(
            category.categoryIdentity
          )}`}
          onClick={() => setSelectedCategory(category.categoryIdentity)}
        >
          {category.categoryName.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
