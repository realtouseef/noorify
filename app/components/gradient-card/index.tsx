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
      className="h-16 w-16 cursor-pointer rounded-full"
      style={{ background: `${color}` }}
      onClick={onClick}
    />
  );
};

export default GradientCard;
