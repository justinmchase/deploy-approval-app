export function normalize(value: string) {
  return value.replace(/[^\w\d]+/, " ").toLocaleLowerCase();
}
export function titleCase(value: string) {
  return normalize(value).split(" ").map(([first = "", ...rest]) =>
    [first.toUpperCase(), ...rest].join("")
  ).join(" ");
}
