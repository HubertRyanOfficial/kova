import { TextStyleTypes } from "./types";

const stylesStart = {
  bold: "<b>",
  italic: "<i>",
  underline: "<u>",
};
const stylesEnd = {
  bold: "</b>",
  italic: "</i>",
  underline: "</u>",
};

export function formatContent(
  full_value: string,
  selected_value: string,
  style: TextStyleTypes,
  range: Range
) {
  if (style != "") {
    let result = selected_value;
    const startTagStyleSelected = stylesStart[style];
    const endTagStyleSelected = stylesEnd[style];

    const halfContentLeft = full_value.substring(0, range.startOffset);
    const halfContentRight = full_value.substring(
      range.endOffset,
      full_value.length
    );

    return (
      halfContentLeft +
      `${startTagStyleSelected}${result}${endTagStyleSelected}` +
      halfContentRight
    );
  }

  return full_value;
}
