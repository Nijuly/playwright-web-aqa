export const getRandomFromArray = <T>(array: Readonly<T[]>) => {
  return array[Math.floor(Math.random() * array.length)]
}
