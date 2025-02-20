/* import React, { useState, useEffect } from "react";
import { DisplayResultsProps } from "../types/types";

const DisplayResults: React.FC<DisplayResultsProps> = ({
  company,
  title,
  languages,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (languages) {
      setIsVisible(true);
    }
  }, [languages]);

  if (!isVisible) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid #ccc",
        padding: "10px",
        zIndex: 9999,
        borderRadius: "5px",
        fontSize: "12px",
        maxWidth: "300px",
        overflowWrap: "break-word",
      }}
    >
      <h1>Job Values</h1>
      <div>
        <span>Company Name:</span> {company}
      </div>
      <div>
        <span>Job Title:</span> {title}
      </div>
      <div>
        <span>Languages: </span>
        {languages && languages.length > 0 ? (
          <ul>
            {languages.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        ) : (
          <span>No language specifications detected</span>
        )}
      </div>
    </div>
  );
};

export default DisplayResults;
 */ 
