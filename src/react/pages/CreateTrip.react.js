import React from "react";

import firebase from "../../firebase";
import Question from "../components/Question.react";

const { useCallback, useMemo, useState } = React;

function CreateTrip({ history, user }) {
  const [values, setValues] = useState({});

  const onChange = useCallback(
    (val, name) => {
      setValues({ ...values, [name]: val });
    },
    [values]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const trip = firebase
        .database()
        .ref(`users/${user.uid}/trips`)
        .push(values);
      history.push(`/trip/${trip.key}`);
    },
    [history, user.uid, values]
  );

  const duration = useMemo(
    () => {
      const from = values.dates && values.dates[0];
      const to = values.dates && values.dates[1];

      if (from == null || to == null) {
        return null;
      }

      const durationSecs = (new Date(to) - new Date(from)) / 1000;
      return Math.round(durationSecs / 60 / 60 / 24);
    },
    [values.dates]
  );

  return (
    <>
      <h1>Create trip</h1>
      <form onSubmit={onSubmit}>
        <Question
          name="dates"
          onChange={onChange}
          type="date-range"
          value={values.dates}
        />
        {duration > 6 && (
          <Question
            label="How long will you go between laundry trips?"
            min={3}
            name="laundry"
            onChange={onChange}
            type="number"
            unit="days"
            value={values.laundry}
          />
        )}
        <Question
          label="Business or pleasure?"
          name="type"
          onChange={onChange}
          options={["Business", "Pleasure", "Both"]}
          type="select"
          value={values.type}
        />
        <Question
          label="How many flights?"
          min={0}
          name="flights"
          onChange={onChange}
          type="number"
          value={values.flights}
        />
        {values.flights > 0 && (
          <Question
            label="How many flights are overnight?"
            max={values.flights}
            min={0}
            name="overnightFlights"
            onChange={onChange}
            type="number"
            value={values.overnightFlights}
          />
        )}
        <Question
          label="Activities"
          name="activities"
          onChange={onChange}
          options={["Drive", "Gym", "Swim", "Friends", "Recruiting"]}
          type="multiselect"
          value={values.activities}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateTrip;
