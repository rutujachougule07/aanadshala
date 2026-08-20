import React from "react";

interface HighlightTextProps {
  text?: string;
  className?: string;
  pinkClass?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  className = "",
  pinkClass = "text-[#db2777] font-black drop-shadow-xs",
}) => {
  if (!text) return null;

  const pattern =
    "(आनंद\\s*शाळ[\\u0900-\\u097F]*|आनंदशाळ[\\u0900-\\u097F]*|आनंद\\s*निवास[\\u0900-\\u097F]*|आनंदनिवास[\\u0900-\\u097F]*|Anandshala[a-zA-Z]*|Aanandshala[a-zA-Z]*|AnandShala[a-zA-Z]*|AanandShala[a-zA-Z]*)";
  const splitRegex = new RegExp(pattern, "gi");
  const matchRegex = new RegExp(`^${pattern}$`, "i");

  const parts = text.split(splitRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (matchRegex.test(part)) {
          return (
            <span key={index} className={pinkClass}>
              {part}
            </span>
          );
        }
        if (part.includes("\n")) {
          const lines = part.split("\n");
          return lines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ));
        }
        return part;
      })}
    </span>
  );
};

export default HighlightText;
