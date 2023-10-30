import { useState } from "react";
import "./App.css";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals].sort(randomize).map((value) => ({
      value,
      state: "DEFAULT",
    }))
  );

  const [selected, setSelected] = useState<Option>();
  const isGameOver = options.length === 0;

  if (isGameOver) {
    return <div>Congratulations</div>;
  }

  return (
    <div className="optionsTable">
      {options.map((option) => (
        <button
          className={
            option.state === "SELECTED"
              ? "selected"
              : option.state === "WRONG"
              ? "wrong"
              : ""
          }
          key={option.value}
          onClick={() => {
            if (!selected) {
              setSelected(option);
              setOptions(
                options.map((opt) => {
                  return opt === option
                    ? {
                        ...opt,
                        state: "SELECTED",
                      }
                    : { ...opt, state: "DEFAULT" };
                })
              );
            } else {
              if (
                selected.value === data[option.value] ||
                data[selected.value] === option.value
              ) {
                setOptions(
                  options.filter((opt) => {
                    return !(
                      opt.value === selected.value || opt.value === option.value
                    );
                  })
                );
              } else {
                setOptions(
                  options.map((opt) => {
                    return opt.value === selected.value ||
                      opt.value === option.value
                      ? { ...opt, state: "WRONG" }
                      : opt;
                  })
                );
              }
              setSelected(undefined);
            }
          }}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <CountryCapitalGame
        data={{
          Germany: "Berlin",
          Azerbaijan: "Baku",
          Japan: "Tokyo",
          Bangladesh: "Dhaka",
          Romania: "Bucharest",
          Austria: "Vienna",
          Afghanistan: "Kabul",
          Brazil: "Brasilia",
          Denmark: "Copenhagen",
          Hungary: "Budapest",
          Mali: "Bamako",
          Nigeria: "Abuja",
          Russia: "Moscow",
          Switzerland: "Bern",
        }}
      />
    </>
  );
}

export default App;
