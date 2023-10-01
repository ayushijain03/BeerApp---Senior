import React, { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const handleFilterTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
  };

  const toggleFavorite = (beerId: string) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.indexOf(beerId);

    if (index === -1) {
      updatedFavorites.push(beerId);
    } else {
      updatedFavorites.splice(index, 1);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const reloadList = () => {
    fetchData(setBeerList);
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  value={filterText}
                  onChange={handleFilterTextChange}
                />
                <Button variant="contained" onClick={reloadList}>
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList
                  .filter((beer) =>
                    beer.name.toLowerCase().includes(filterText.toLowerCase())
                  )
                  .map((beer, index) => (
                    <li key={index.toString()}>
                      <Checkbox
                        checked={favorites.includes(beer.id)}
                        onChange={() => toggleFavorite(beer.id)}
                      />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favorites</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={removeFavorites}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList
                  .filter((beer) => favorites.includes(beer.id))
                  .map((beer, index) => (
                    <li key={index.toString()}>
                      <Checkbox
                        checked={favorites.includes(beer.id)}
                        onChange={() => toggleFavorite(beer.id)}
                      />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  ))}
                {!favorites.length && <p>No favorite items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
