import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import styles from "./Beer.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const details = {
  fontSize: "1.1rem",
  marginBottom: "0.5rem",
};
const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <>
      <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer" }} />

      <Grid container spacing={2} className={styles.containerStyle}>
        <Grid item xs={12} md={6}>
          <ButtonBase sx={{ width: "100%" }}>
            <img
              alt="complex"
              src="https://source.unsplash.com/OGTEP0LyYNk"
              className={styles.beerImage}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h4" component="div">
            {beer?.name}
          </Typography>
          <Typography variant="body2" gutterBottom sx={details}>
            <b>Type: </b> {beer?.brewery_type}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={details}>
            <b>City: </b> {beer?.city}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={details}>
            <b>State: </b> {beer?.state}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={details}>
            <b>Country: </b> {beer?.country}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={details}>
            <b>Postal Code: </b> {beer?.postal_code}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={details}>
            <b>Longitude, Latitude: </b> {beer?.longitude},{beer?.latitude}
          </Typography>
          <Typography sx={details}>
            <a href={beer?.website_url}>Click here to go to website</a>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Beer;
