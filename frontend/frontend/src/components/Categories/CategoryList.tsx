import { useState, useEffect } from "react";
import { Category } from "../Categories/Category";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoryUpdate";
import CategoryDelete from "./CategoryDelete";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = () => {
    fetch("http://localhost:5249/api/Categories", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="card">
        <h3 className="card-header d-flex justify-content-between align-items-center">
          Categories
          <CategoryCreate handleFetch={fetchCategories} />
        </h3>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-gear"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="settings">
                        <CategoryUpdate category={category} handleFetch={fetchCategories} />
                        <CategoryDelete category={category} handleFetch={fetchCategories} />
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
