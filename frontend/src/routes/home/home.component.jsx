import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";
import SearchBox from "../../components/search-box/search-box.component";

const Home = () => {
  const [categories, setcategories] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(categories);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  useEffect(() => {
    const newfilteredThemes = categories.filter((theme) => {
      return theme.title.toLocaleLowerCase().includes(searchField);
    });

    setFilteredThemes(newfilteredThemes);
  }, [categories, searchField]);

  useEffect(() => {
    const getAllThemes = async () => {
      const data = await fetch("http://localhost:8000/themes")
        .then((res) => res.json())
        .then((themes) => {
          setcategories(themes);
        });
    };
    getAllThemes();
  }, []);

  return (
    <div>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search themes"
      />
      <Directory categories={filteredThemes} />
      <Outlet />
    </div>
  );
};

export default Home;

// useEffect(() => {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((users) => setMonsters(users));
// }, []);
