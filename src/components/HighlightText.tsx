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

  const splitRegex = /(आनंद\s*शाळा[अ-म्ह-्]*|आनंदशाळा[अ-म्ह-्]*|आनंद\s*निवास[अ-म्ह-्]*|आनंदनिवास[अ-म्ह-्]*|Anandshala|Aanandshala|AnandShala|AanandShala)/gi;
  const matchRegex = /^(आनंद\s*शाळा[अ-म्ह-्]*|आनंदशाळा[अ-म्ह-्]*|आनंद\s*निवास[अ-म्ह-्]*|आनंदनिवास[अ-म्ह-्]*|Anandshala|Aanandshala|AnandShala|AanandShala)$/i;

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
