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

  const splitRegex = /(आनंद\s*शाळा|आनंदशाळा|आनंदशाळेत|आनंदशाळेची|आनंदशाळेचे|आनंदशाळेच्या|आनंदशाळेतील|आनंदशाळेस|आनंदशाळेकडून|आनंद\s*निवास|आनंदनिवास|Anandshala|Aanandshala|AnandShala|AanandShala)/gi;
  const matchRegex = /^(आनंद\s*शाळा|आनंदशाळा|आनंदशाळेत|आनंदशाळेची|आनंदशाळेचे|आनंदशाळेच्या|आनंदशाळेतील|आनंदशाळेस|आनंदशाळेकडून|आनंद\s*निवास|आनंदनिवास|Anandshala|Aanandshala|AnandShala|AanandShala)$/i;

  const parts = text.split(splitRegex);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        matchRegex.test(part) ? (
          <span key={index} className={pinkClass}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;
