import sha256 from "sha256"

const Now = () => {
  return Math.round(new Date().getTime() / 1000)
}

const getUTCTime = () => {
  let d = new Date();
  let utcDay = d.getUTCDate()
  let utcMonth = d.getUTCMonth()
  let utcYear = d.getUTCFullYear()

  return Date.UTC(utcYear, utcMonth, utcDay)
}

const getHash = (param1: string, param2: string) => {
  return String(sha256.x2(param1 + param2))
}

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export {
  Now,
  getUTCTime,

  getHash,
  delay,
}
