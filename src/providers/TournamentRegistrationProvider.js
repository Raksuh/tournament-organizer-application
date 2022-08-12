import { createContext, useContext, useState, useEffect } from "react";

export const TournamentRegistrationContext = createContext();

export function useRegistrationContext() {
  const context = useContext(TournamentRegistrationContext);
  if (!context) {
    throw new Error("Use inside context provider!");
  }
  return context;
}

export const TournamentRegistrationProvider = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Identity", "Meals", "Transport", "Accomodations", "Remarks", "Confirmation"];
  const [values, setValues] = useState({
    identity: {
      playerId: "",
      typeOfPerson: "PLAYER",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    meals: {
      needLunchPack: true,
      isVegetarianLunchPack: false,
      needDinner: true,
      isVegetarianDinner: false,
    },
    transport: {
      personnalVehicle: false,
      seats: 0,
      isDepartureIndepedent: false,
      departureTime: "",
      isReturnIndepedent: false,
      returnTime: "",
    },
    accomodations: {
      needHotelForFriday: true,
      needHotelForSaturday: true,
    },
    remarks: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const getEventValue = (event) => {
    if(event.target.type === "checkbox") {
      return event.target.checked;
    }

    return event.target.value;
  }

  const setInitialValues = (initialValues) => {
    setValues(initialValues);
  };
  const handleChangeIdentityValues = (prop) => (event) => {
    setValues({
      ...values,
      identity: { ...values.identity, [prop]: getEventValue(event) },
    });
  };
  const handleChangeMealsValues = (prop) => (event) => {
    setValues({
      ...values,
      meals: { ...values.meals, [prop]: event.target.checked },
    });
  };
  const handleChangeTransportValues = (prop) => (event) => {
    setValues({
      ...values,
      transport: { ...values.transport, [prop]: getEventValue(event) },
    });
  };
  const handleChangeAccomodationsValues = (prop) => (event) => {
    setValues({
      ...values,
      accomodations: { ...values.accomodations, [prop]: getEventValue(event) },
    });
  };
  const handleChangeRemarksValues = () => (event) => {
    setValues({
      ...values,
      remarks: getEventValue(event),
    });
  };

  return (
    <TournamentRegistrationContext.Provider
      value={{
        activeStep,
        steps,
        values,
        setInitialValues,
        handleNext,
        handleBack,
        handleChangeIdentityValues,
        handleChangeMealsValues,
        handleChangeTransportValues,
        handleChangeAccomodationsValues,
        handleChangeRemarksValues,
      }}
    >
      {props.children}
    </TournamentRegistrationContext.Provider>
  );
};
