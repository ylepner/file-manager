export function parse2Paths(str) {
  const regexes = [
    /^(\S+)\s+(\S+)$/,
    /^"([^"]+)"\s+(\S+)$/,
    /^(\S+)\s+"([^"]+)"$/,
    /^"([^"]+)"\s+"([^"]+)"$/
  ]

  return regexes.map(regex => str.match(regex)).filter(x => x?.length === 3).map(x => [x[1], x[2]]);
}

// console.log(parse2Paths('asdfa asdfasdf'))
// console.log(parse2Paths('"C:/folder asdf/asdfas asdf/text text.txt" asdf'))
// console.log(parse2Paths('asdf "C:/folder asdf/asdfas asdf/text text.txt"'))
// console.log(parse2Paths('"asdfasdf asdf asdf asdf" "C:/folder asdf/asdfas asdf/text text.txt"'))