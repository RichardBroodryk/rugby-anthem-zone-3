import React from "react";
import "./Flag.css";

type FlagProps = {
  country: string;
  size?: "small" | "medium" | "large" | "xlarge";
};

const Flag: React.FC<FlagProps> = ({ country, size = "medium" }) => {
  const fileName = country.toLowerCase().trim().replace(/\s+/g, "-");

  let imageSrc;

  try {
    imageSrc = require(`../../assets/images/flags/${fileName}.png`);
  } catch {
    try {
      imageSrc = require(`../../assets/images/flags/${fileName}.jpg`);
    } catch {
      return (
        <div className={`flag-fallback flag-${size}`}>
          {country.substring(0, 3).toUpperCase()}
        </div>
      );
    }
  }

  return (
    <img
      src={imageSrc}
      alt={`${country} flag`}
      className={`flag flag-${size}`}
    />
  );
};

export default Flag;