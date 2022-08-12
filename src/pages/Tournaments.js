import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOURNAMENT_BY_ID, TOURNAMENT_REGISTRATION } from "../navigation/Routes";
import noImage from "../assets/images/no-image.svg";

const Tournament = ({ tournament }) => {
  const navigate = useNavigate();

  const handleClickView = (id) => {
    navigate(TOURNAMENT_BY_ID.replace(":id", id));
  };

  const handleClickRegister = (id) => {
    navigate(TOURNAMENT_REGISTRATION.replace(":id", id));
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component='img' image={"https://picsum.photos/300/300" || noImage} alt='random' />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {tournament.location}
        </Typography>
        <Typography>
          This is a media card. You can use this section to describe the content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => handleClickView(tournament._id)}>
          View
        </Button>
        <Button size='small' onClick={() => handleClickRegister(tournament._id)}>
          Register
        </Button>
      </CardActions>
    </Card>
  );
};
const Tournaments = () => {
  const { tournaments, isLoading } = useSelector((state) => state.tournaments);

  return (
    <Container sx={{ py: 8 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems='stretch' spacing={6}>
          {tournaments ? (
            <>
              {tournaments.map((t) => (
                <Grid key={t._id} item xs={12} sm={12} md={6} lg={4}>
                  <Tournament tournament={t} />
                </Grid>
              ))}
            </>
          ) : (
            "No tournaments"
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Tournaments;
