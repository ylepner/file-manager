export function parse2Paths(str) {
  const regexes = [
    /^([^"\s]+)\s+([^"\s]+)$/,
    /^"([^"]+)"\s+([^"\s]+)$/,
    /^([^"\s]+)\s+"([^"]+)"$/,
    /^"([^"]+)"\s+"([^"]+)"$/
  ]

  const res = regexes.map(regex => str.match(regex)).filter(x => x?.length === 3).map(x => [x[1], x[2]]);
  console.log(res)
  return res
}