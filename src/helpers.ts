import fetch from 'node-fetch';

export const get = async (url: string) => {
  const r = await fetch(url)
  return r.json()
}

export const getBuf = async (url: string) => {
  const r = await fetch(url)
  return r.buffer()
}
