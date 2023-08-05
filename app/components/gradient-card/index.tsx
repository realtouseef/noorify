import React from "react";

const GradientCard = ({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer rounded-full p-8"
      style={{ background: `${color}` }}
      onClick={onClick}
    />
  );
};

export default GradientCard;
