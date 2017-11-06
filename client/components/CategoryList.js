import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CategoryList component:
 *   renders Links of categories
 */
export default function CategoryList ({categories, current}) {
  let currentCategoryDescription;

  return (
    <div id="categoryListPage" className="categoryList">
      {
        categories.map((category, i) => {
          if (current && current === category.title) {
            currentCategoryDescription = category.description;
            return (
              <Link
                id="currentCategoryLink"
                className="categoryLink"
                key={i}
                to={`/buildbox/${category.title}`}>
                {category.title}
              </Link>
            )
          } else {
            return (
              <Link
                className="categoryLink"
                key={i}
                to={`/buildbox/${category.title}`}>
                {category.title}
              </Link>
            )
          }
        })

      }
      <h3 id="categoryDescription" >{currentCategoryDescription}</h3>
    </div>
  );
}
