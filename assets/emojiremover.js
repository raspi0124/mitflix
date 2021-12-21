export function emojiremove(obj) {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    // use val
    if (val) {
      console.log(val, key);
      var newval = val
        .toString()
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ""
        );
      obj[key] = newval;
    }
  }
  return obj;
}
