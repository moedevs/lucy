import fetch from 'node-fetch';

export const get = async (url) => {
  const r = await fetch(url)
  return r.json()
}
