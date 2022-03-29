import "./homePage.css";

export function CategoryCard({category}){
 
    return(
        <div className="link card card-basic">
        <img
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