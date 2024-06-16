export const padLeft = (str: string, length: number, char = '0') => {
  return str.length >= length ? str : new Array(length - str.length + 1).join(char) + str
}

export const getTime = (date: Date = new Date()) => {
  return `${padLeft(`${date.getHours()}`, 2)}:${padLeft(
    `${date.getMinutes()}`,
    2
  )}:${padLeft(`${date.getSeconds()}`, 2)}`
}
