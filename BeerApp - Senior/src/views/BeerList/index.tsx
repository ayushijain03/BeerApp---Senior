import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import BeerFilter from "../../components/Filter";
import { SORT } from "../../types/types";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [controller, setController] = useState<{
    page: number;
    per_page: number;
    sort?: SORT;
    by_dist?: string;
  }>({
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    fetchData(setBeerList, setTotalPages, controller);
  }, [controller]);

  const handleChangePage = (event: any, value: any) => {
    setController({ ...controller, page: value });
  };

  const handleFilterChange = (
    newFilter: string,
    prevFilter: string,
    newSearchTerm: string,
    sortOption: SORT
  ) => {
    if (prevFilter) {
      if (newFilter === "by_dist") {
        const { sort, ...newController } = controller;
        setController({...newController, [prevFilter]: undefined, [newFilter]: "38.8977,77.0365",});
      } else {
        setController({...controller, [prevFilter]: undefined, [newFilter]: newSearchTerm, sort: sortOption,});
      }
    } else {
      if (newFilter === "by_dist") {
        const { sort, ...newController } = controller;
        setController({ ...newController, [newFilter]: newSearchTerm });
      } else {
        setController({...controller, [newFilter]: newSearchTerm, sort: sortOption,});
      }
    }
  };
  console.log("controller", controller);
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <div>
      <BeerFilter onFilterChange={handleFilterChange} />

      <ImageList cols={5} rowHeight={450}>
        {beerList.map((beer) => (
          <ImageListItem
            key={beer.id}
            onClick={onBeerClick.bind(this, beer.id)}
            sx={{ cursor: "pointer" }}
          >
            <img
              srcSet={`https://source.unsplash.com/b0EBo7iwLTQ?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`https://source.unsplash.com/b0EBo7iwLTQ?w=248&fit=crop&auto=format`}
              alt={beer.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={beer.name}
              subtitle={beer.brewery_type}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${beer.name}`}
                >
                  <InfoIcon/>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box my={2} display="flex" justifyContent="center">
      <Pagination
        count={totalPages}
        page={controller.page}
        onChange={handleChangePage}
        size="large"
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      </Box>
      
    </div>
  );
};

export default BeerList;
