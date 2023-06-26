export function parse2Paths(str) {
  const regexes = [
    /^([^"\s]+)\s+([^"\s]+)$/,
    /^"([^"]+)"\s+([^"\s]+)$/,
    /^([^"\s]+)\s+"([^"]+)"$/,
    /^"([^"]+)"\s+"([^"]+)"$/
  ]

  const result = regexes.map(regex => str.match(regex)).filter(x => x?.length === 3).map(x => [x[1], x[2]]);
  return result;
}