import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { TOURNAMENTS } from "../navigation/Routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTournaments } from "../redux/actions/tournaments";
import { useAuthenticationContext } from "../providers/AuthProvider";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connectedUser } = useAuthenticationContext();

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  const handleClick = () => {
    navigate(TOURNAMENTS);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm'>
          {connectedUser && (
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Hello {connectedUser.result.name} !
            </Typography>
          )}

          <Typography variant='h5' align='center' color='text.secondary' paragraph>
            Welcome to the Niort Gaelic Football Club tournaments organizer application.
          </Typography>
          <Typography variant='h5' align='center' color='text.secondary' paragraph>
            To view upcoming tournaments, click the button below.
          </Typography>

          {connectedUser && (
            <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
              <Button variant='contained' onClick={handleClick}>
                Show tournaments
              </Button>
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;