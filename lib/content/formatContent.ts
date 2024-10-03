import { TextStyleTypes } from "./types";

const stylesStart = {
  bold: "<h2>",
  italic: "<i>",
  underline: "<u>",
};
const stylesEnd = {
  bold: "</h2>",
  italic: "</i>",
  underline: "</u>",
};

export function formatContent(
  full_value: string,
  selected_value: string,
  style: TextStyleTypes,
  range: Range
) {
  console.log("Entry: ", full_value);

  if (style != "") {
    let result = selected_value;
    const startTagStyleSelected = stylesStart[style];
    const endTagStyleSelected = stylesEnd[style];

    let startOffset = range.startOffset || 0;
    let endOffset = range.endOffset || 0;

    console.log("Start Offset: ", startOffset);
    console.log("End Offset: ", endOffset);
    console.log(range);

    // * Getting existent styles

    const previousStyle = full_value.substring(startOffset - 3, startOffset);
    const hasPreviousStyleMatches = previousStyle.match(
      `/${Object.values(stylesStart).join("|")}/`
    );

    console.log("Previous style: ", previousStyle);
    console.log("Previous length: ", previousStyle.length);
    console.log("Has previous style: ", hasPreviousStyleMatches);
    console.log();

    //

    if (range.startOffset == 0 && range.endOffset == selected_value.length) {
      return `${startTagStyleSelected}${result}${endTagStyleSelected}`;
    }

    const halfContentLeft = full_value.substring(0, startOffset);
    const halfContentRight = full_value.substring(endOffset, full_value.length);

    result = `${startTagStyleSelected}${result}${endTagStyleSelected}`;

    console.log("Left: ", halfContentLeft);
    console.log("Middle: ", full_value.substring(startOffset, endOffset));
    console.log("Right: ", halfContentRight);

    result = halfContentLeft + result + halfContentRight;
    return result;
  }

  return full_value;
}
