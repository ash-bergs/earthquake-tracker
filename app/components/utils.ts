// because I don't have a way to update the data itself, and this is a hobby project
// I noticed all the `place` names were in the format of "NUMBER KM OF CITY, COUNTRY"
// this function serves to cleanup how the cards present, without such a long name for no reason
// esp with the hover popup - which maybe I can programmatically trigger here, so clicking the card triggers the popup
// clicking the card should also zoom to the item on the map
/** Parse the name of a administrative area, and country, from the place property */
export const parsePlace = (place: string) => {
  const parts = place.split('of'); // should be reasonably safe, but need to consider edge cases
  return parts.length > 1 ? parts[1].trim() : place;
};
