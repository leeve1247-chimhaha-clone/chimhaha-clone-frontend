import React from "react";

interface GridProps {
  row: number;
  col: number;
  children: React.ReactNode;
}

export default function DropDownGrid({ row, col, children }: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${row}, 1fr)`,
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: "8px",
      }}
    >
      {children}
    </div>
  );
}
