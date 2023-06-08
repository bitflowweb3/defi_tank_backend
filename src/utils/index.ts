import sha256 from "sha256"

const Now = () => {
  return Math.round(new Date().getTime() / 1000)
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
  getHash,
  delay,
}
