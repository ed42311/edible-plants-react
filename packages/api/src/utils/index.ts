const exitOne: (checkPresence: string | boolean | undefined) => void = (
  checkPresence
) => {
  const isPresent = Boolean(checkPresence)
  if (!isPresent) {
    process.exit(1)
  }
}

const stringToNumber: (str: string) => number = (str: string) =>
  parseInt(str, 10)

export { exitOne, stringToNumber }
