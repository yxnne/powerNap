const DESC_MAY_LENGTH_MAX = 50;

// This method to get the article's description for card's body
export function getDescInfo(item){
  if (item.desc){
    return item.desc;
  }

  if (item.content.length < DESC_MAY_LENGTH_MAX){
    return item.content;
  } else {
    return item.content.slice(0, DESC_MAY_LENGTH_MAX) + ' ...';
  }
}


// This methods calculate the value of percent
// and using Math.round for getting an integer
export function getPercentValue(value, total){
  return Math.round( value / total * 100 );
}


// Date from int stamp to 'Month, Day, Year'
export function transferDateStamp(dateStamp){
  const year = dateStamp.getFullYear();
  const month = dateStamp.getMonth() + 1;
  const day = dateStamp.getDay();
  return month + ', ' + day + ', ' + year;
}
