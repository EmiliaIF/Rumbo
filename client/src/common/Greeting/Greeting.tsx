import React, { useMemo } from "react";

const generateGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 17) return "God kväll";
  if (hour > 10) {
    var greetings = [
      "Hallå",
      "Hej",
      "Hejsan",
      "Morsning",
      "Morsning korsning",
      "Tja",
      "Tjabba",
      "Tjena",
      "Tjena mors",
      "Tjenare",
      "Tjenis",
      "Tjenixen",
      "Tjing tjing",
      "Tjo",
      "Tjoflöjt",
      "Tjosan",
    ];
    var greeting_id = Math.floor(Math.random() * greetings.length);
    return greetings[greeting_id];
  }
  if (hour > 6) {
    return "God morgon";
  }
  if (hour > 0) {
    return "God kväll";
  }

  return "Hej";
};

type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  const greeting = useMemo(() => generateGreeting(), []);

  return (
    <>
      {greeting} {name}
    </>
  );
};

export default Greeting;
