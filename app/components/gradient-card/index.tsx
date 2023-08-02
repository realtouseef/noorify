import React from "react";

const GradientCard = ({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="h-14 w-14 cursor-pointer rounded-full"
        style={{ background: `${color}` }}
        onClick={onClick}
      />
      <p className="mt-2 text-[8px]">{label}</p>
    </div>
  );
};

export default GradientCard;