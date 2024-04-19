import React from "react";

const getPieceSymbol = (value) => {
  switch (value) {
    case "1":
      return "🔴";
    case "2":
      return "⚫";
    case "1K":
      return "🟠";
    case "2K":
      return "🟤";
    default:
      return null;
  }
};

const Square = ({ value, onClick, className }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
      }}
    >
      {getPieceSymbol(value)}
    </div>
  );
};

export default Square;
