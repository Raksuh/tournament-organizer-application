import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

import {
  TournamentRegistrationProvider,
  useRegistrationContext,
} from "../providers/TournamentRegistrationProvider";
import { useDispatch, useSelector } from "react-redux";
import { getTournament, updateTournament } from "../redux/actions/tournaments";
import { CircularProgress, Stack } from "@mui/material";
import { useAuthenticationContext } from "../providers/AuthProvider";
import { TOURNAMENTS } from "../navigation/Routes";


const Identity = () => {
  const context = useRegistrationContext();
  const identity = context.values.identity;

  const types = [
    {
      value: "PLAYER",
      label: "Player",
    },
    {
      value: "ACCOMPANIST",
      label: "Accompanist",
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id='typeOfPerson'
            select
            label='Type of Person'
            value={identity.typeOfPerson}
            onChange={context.handleChangeIdentityValues("typeOfPerson")}
            helperText='Please your type'
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={identity.firstName}
            onChange={context.handleChangeIdentityValues("firstName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            value={identity.lastName}
            onChange={context.handleChangeIdentityValues("lastName")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='email'
            name='email'
            label='Email Address'
            fullWidth
            autoComplete='email'
            variant='standard'
            value={identity.email}
            onChange={context.handleChangeIdentityValues("email")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='phone'
            name='phone'
            label='Phone Number'
            fullWidth
            autoComplete='phone-number'
            variant='standard'
            value={identity.phone}
            onChange={context.handleChangeIdentityValues("phone")}
          />
        </Grid>
      </Grid>
    </>
  );
};

const Meals = () => {
  const context = useRegistrationContext();
  const meals = context.values.meals;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl component='fieldset' variant='standard'>
          <FormLabel component='legend'>Choose your meals</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={meals.needLunchPack}
                  onChange={context.handleChangeMealsValues("needLunchPack")}
                  name='needLunchPack'
                />
              }
              label='I need a lunch pack'
            />
            {meals.needLunchPack && (
              <FormControlLabel
                sx={{ ml: 1 }}
                control={
                  <Switch
                    checked={meals.isVegetarianLunchPack}
                    onChange={context.handleChangeMealsValues("isVegetarianLunchPack")}
                    name='isVegetarianLunchPack'
                  />
                }
                label='Vegetarian'
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={meals.needDinner}
                  onChange={context.handleChangeMealsValues("needDinner")}
                  name='needDinner'
                />
              }
              label='I need a dinner'
            />
            {meals.needDinner && (
              <FormControlLabel
                sx={{ ml: 1 }}
                control={
                  <Switch
                    checked={meals.isVegetarianDinner}
                    onChange={context.handleChangeMealsValues("isVegetarianDinner")}
                    name='isVegetarianDinner'
                  />
                }
                label='Vegetarian'
              />
            )}
          </FormGroup>
          <FormHelperText>Be careful about your meals</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const Transport = () => {
  const context = useRegistrationContext();
  const transport = context.values.transport;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={transport.personnalVehicle}
                onChange={context.handleChangeTransportValues("personnalVehicle")}
                name='personnalVehicle'
              />
            }
            label='Use my vehicule'
          />
          {transport.personnalVehicle && (
            <TextField
              required
              type='number'
              id='seats'
              name='seats'
              label='Seats'
              autoComplete='seats'
              variant='standard'
              value={transport.seats}
              onChange={context.handleChangeTransportValues("seats")}
              helperText={"Number of seats available with you (included)"}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography>Departure</Typography>
        <Divider />
        <Grid container spacing={2} sx={{ pt: 3, pb: 5 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type='datetime-local'
              name='departureTime'
              variant='outlined'
              label='Time to leave'
              value={transport.departureTime}
              onChange={context.handleChangeTransportValues("departureTime")}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={transport.isDepartureIndepedent}
                    onChange={context.handleChangeTransportValues("isDepartureIndepedent")}
                    name='isDepartureIndepedent'
                  />
                }
                label='Independent'
              />
              <FormHelperText>You will not be refunded</FormHelperText>
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Return</Typography>
        <Divider />
        <Grid container spacing={2} sx={{ pt: 3, pb: 5 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type='datetime-local'
              name='returnTime'
              variant='outlined'
              label='Time to leave'
              value={transport.returnTime}
              onChange={context.handleChangeTransportValues("returnTime")}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={transport.isReturnIndepedent}
                    onChange={context.handleChangeTransportValues("isReturnIndepedent")}
                    name='isReturnIndepedent'
                  />
                }
                label='Independent'
              />
              <FormHelperText>You will not be refunded</FormHelperText>
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Accomodations = () => {
  const context = useRegistrationContext();
  const accomodations = context.values.accomodations;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl component='fieldset' variant='standard'>
          <FormLabel component='legend'>Choose when you need a hotel room</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={accomodations.needHotelForFriday}
                  onChange={context.handleChangeAccomodationsValues("needHotelForFriday")}
                  name='needHotelForFriday'
                />
              }
              label='Friday'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={accomodations.needHotelForSaturday}
                  onChange={context.handleChangeAccomodationsValues("needHotelForSaturday")}
                  name='needHotelForSaturday'
                />
              }
              label='Saturday'
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const Remarks = () => {
  const context = useRegistrationContext();
  const remarks = context.values.remarks;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          multiline
          maxRows={4}
          id='remarks'
          name='remarks'
          label='Please indicate your remarks'
          fullWidth
          variant='standard'
          value={remarks}
          onChange={context.handleChangeRemarksValues()}
        />
      </Grid>
    </Grid>
  );
};

const Confirmation = () => {
  const context = useRegistrationContext();
  const registration = context.values;

  const types = {
    PLAYER: "Player",
    ACCOMPANIST: "Accompanist",
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
            Identity
          </Typography>
          <Divider />
          <Typography gutterBottom>{types[registration.identity.typeOfPerson]}</Typography>
          <Typography gutterBottom>
            {registration.identity.firstName} {registration.identity.lastName}
          </Typography>
          <Typography gutterBottom>{registration.identity.email}</Typography>
          <Typography gutterBottom>{registration.identity.phone}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
            Meals
          </Typography>
          <Divider />
          <Typography gutterBottom>
            {registration.meals.isVegetarianLunchPack == true
              ? "Vegetarian lunch pack"
              : registration.meals.needLunchPack == true
              ? "Lunch pack"
              : "No lunch pack"}
          </Typography>
          <Typography gutterBottom>
            {registration.meals.isVegetarianDinner == true
              ? "Vegetarian dinner"
              : registration.meals.needDinner == true
              ? "Dinner"
              : "No dinner"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
            Transport
          </Typography>
          <Divider />
          {registration.transport.personnalVehicle === true && (
            <Typography gutterBottom>
              Use your vehicule with {registration.transport.seats} seats avalaible
            </Typography>
          )}

          <Grid container>
            <Grid item xs={6}>
              <Typography variant='subtitle2' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
                Departure
              </Typography>
              <Typography gutterBottom>
                {registration.transport.departureTime &&
                  format(
                    parseISO(registration.transport.departureTime),
                    "'At 'MM/dd/yyyy - HH:mm",
                    {
                      locale: fr,
                    },
                  )}
              </Typography>
              <Typography gutterBottom>
                {registration.transport.isDepartureIndepedent === true
                  ? "You are independent"
                  : "You need carpooling"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle2' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
                Return
              </Typography>
              <Typography gutterBottom>
                {registration.transport.returnTime &&
                  format(parseISO(registration.transport.returnTime), "'At 'MM/dd/yyyy - HH:mm", {
                    locale: fr,
                  })}
              </Typography>
              <Typography gutterBottom>
                {registration.transport.isReturnIndepedent === true
                  ? "You are independent"
                  : "You need carpooling"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
            Accomodations
          </Typography>
          <Divider />
          {registration.accomodations.needHotelForFriday === true && (
            <Typography gutterBottom>Need hotel Friday</Typography>
          )}
          {registration.accomodations.needHotelForSaturday === true && (
            <Typography gutterBottom>Need hotel Saturday</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: "bolder" }}>
            Remarks
          </Typography>
          <Divider />
          <Typography gutterBottom>
            {registration.remarks ? registration.remarks : "No remarks"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Identity />;
    case 1:
      return <Meals />;
    case 2:
      return <Transport />;
    case 3:
      return <Accomodations />;
    case 4:
      return <Remarks />;
    case 5:
      return <Confirmation />;
    default:
      return "Unknown step";
  }
}

const RegistrationStepper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tournament, isLoading } = useSelector((state) => state.tournaments);
  const context = useRegistrationContext();
  const { connectedUser } = useAuthenticationContext();

  useEffect(() => {
    dispatch(getTournament(id));
  }, [id]);

  useEffect(() => {
    const { _id, firstName, lastName, email, phone } = connectedUser?.result || {};

    if (tournament) {
      const registration = tournament.registrations?.find(r => r.playerId === _id) || {};

      const contextRegistration = {
        // Identity
        identity: {
          playerId: registration.playerId || _id,
          typeOfPerson: registration.typeOfPerson || "PLAYER",
          firstName: registration.firstName || firstName,
          lastName: registration.lastName || lastName,
          email: registration.email || email,
          phone: registration.phone || phone,
        },
        // Meals
        meals: {
          needLunchPack: registration.needLunchPack || true,
          isVegetarianLunchPack: registration.isVegetarianLunchPack || false,
          needDinner: registration.needDinner || true,
          isVegetarianDinner: registration.isVegetarianDinner || false,
        },
        // Journey
        transport: {
          personnalVehicle: registration.personnalVehicle || false,
          seats: registration.seats || 0,
          isDepartureIndepedent: registration.isDepartureIndepedent || false,
          departureTime: registration.departureTime ? format(parseISO(registration.departureTime), 'yyyy-MM-dd HH:mm:ss') : "",
          isReturnIndepedent: registration.isReturnIndepedent || false,
          returnTime: registration.returnTime ? format(parseISO(registration.returnTime), 'yyyy-MM-ddThh:mm') : "",
        },
        accomodations: {
          needHotelForFriday: registration.needHotelForFriday || true,
          needHotelForSaturday: registration.needHotelForSaturday || true,
        },
          // Remarks
        remarks: registration.remarks || "",
      }
      context.setInitialValues(contextRegistration);
    }
  }, [connectedUser, tournament]);

  const handleClickGoBack = () => {
    navigate(-1);
  };

  const addOrUpdateRegistration = (registrations, registration) => {
    if (registrations) {
      let updated = false;
      const newRegistrations = registrations.map(r => {
        if(r.playerId === registration.playerId) {
          updated = true;
          return registration
        }
        
        return r
      })

      if (!updated) {
        newRegistrations.push(registration);
      }

      return newRegistrations;
    }

    return [registration];
  }

  const dispatchRegistration = () => {
    if(context.activeStep === context.steps.length -1){
      const registration = {
        // Identity
        playerId: context.values.identity.playerId,
        typeOfPerson: context.values.identity.typeOfPerson,
        firstName: context.values.identity.firstName,
        lastName: context.values.identity.lastName,
        email: context.values.identity.email,
        phone: context.values.identity.phone,
        // Meals
        needLunchPack: context.values.meals.needLunchPack,
        isVegetarianLunchPack: context.values.meals.isVegetarianLunchPack,
        needDinner: context.values.meals.needDinner,
        isVegetarianDinner: context.values.meals.isVegetarianDinner,
        // Journey
        personnalVehicle: context.values.transport.personnalVehicle,
        seats: context.values.transport.seats,
        isDepartureIndepedent: context.values.transport.isDepartureIndepedent,
        departureTime: context.values.transport.departureTime,
        isReturnIndepedent: context.values.transport.isReturnIndepedent,
        returnTime: context.values.transport.returnTime,
        needHotelForFriday: context.values.accomodations.needHotelForFriday,
        needHotelForSaturday: context.values.accomodations.needHotelForSaturday,
        // Remarks
        remarks: context.values.remarks,
      }

      const withRegistrations = {
        ...tournament,
        registrations: addOrUpdateRegistration(tournament.registrations || [], registration),
      }

      dispatch(updateTournament(id, withRegistrations));
    }
  }

  const handleBack = () => {
    context.handleBack();
  }

  const handleNext = () => {
    dispatchRegistration();
    context.handleNext();
  }

  const handleShowTournaments = () => {
    navigate(TOURNAMENTS);
  };

  if (!tournament) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
        <Button
          onClick={() => handleClickGoBack()}
          startIcon={<ArrowBack fontSize='large' />}
        ></Button>
        <Typography component='h1' variant='h4' align='center'>
          Tournament registration
        </Typography>
      </Grid>
      <Stepper activeStep={context.activeStep} sx={{ pt: 3, pb: 5 }}>
        {context.steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={`${label}-${index}`} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {context.activeStep === context.steps.length ? (
          <>
            <Typography variant='h5' gutterBottom>
              Thank you for your registration.
            </Typography>
            <Typography variant='subtitle1'>
              Your registration is terminated. We have emailed your registration confirmation, and
              will send you an update when tournament began.
            </Typography>
            <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
              <Button variant='contained' onClick={handleShowTournaments}>
                Show tournaments
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant='h6' gutterBottom sx={{ mb: 3 }}>
              {context.steps[context.activeStep]}
            </Typography>
            {getStepContent(context.activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {context.activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Previous
                </Button>
              )}

              <Button variant='contained' onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                {context.activeStep === context.steps.length - 1 ? "Finalize" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </>
    </Paper>
  );
};
const TournamentRegistration = () => {
  return (
    <TournamentRegistrationProvider>
      <RegistrationStepper />
    </TournamentRegistrationProvider>
  );
};

export default TournamentRegistration;
