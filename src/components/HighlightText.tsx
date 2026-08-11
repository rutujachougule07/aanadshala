import React from "react";

interface HighlightTextProps {
  text?: string;
  className?: string;
  pinkClass?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  className = "",
  pinkClass = "text-pink-500 font-bold",
}) => {
  if (!text) return null;

  const splitRegex = /(आनंदशाळा|आनंदशाळेत|आनंदशाळेची|आनंदशाळेचे|आनंदशाळेच्या|आनंदशाळेतील|आनंदआश्रम|आनंदधाम|Anandshala|Anandashram|Aandshala)/gi;
  const matchRegex = /^(आनंदशाळा|आनंदशाळेत|आनंदशाळेची|आनंदशाळेचे|आनंदशाळेच्या|आनंदशाळेतील|आनंदआश्रम|आनंदधाम|Anandshala|Anandashram|Aandshala)$/i;

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
