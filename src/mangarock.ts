import { get, getBuf } from "./helpers"
import { isUndefined } from "util";

const APIEndpoint = process.env.MR_API_ENDPOINT!
const baseUrl = process.env.BASEURL!

const decodeMRI = async (mriBuf: Buffer) => {
  const data = new Uint8Array(mriBuf.length + 15)
  const n = mriBuf.length + 7

  data[0] = 82 // R
  data[1] = 73 // I
  data[2] = 70 // F
  data[3] = 70 // F
  data[7] = n >> 24 & 255
  data[6] = n >> 16 & 255
  data[5] = n >> 8 & 255
  data[4] = 255 & n
  data[8] = 87 // W
  data[9] = 69 // E
  data[10] = 66 // B
  data[11] = 80 // P
  data[12] = 86 // V
  data[13] = 80 // P
  data[14] = 56 // 8

  for (var r = 0; r < mriBuf.length; r++) {
    data[r + 15] = 101 ^ mriBuf[r]
  }

  return Buffer.from(data.buffer)
}

const mangaInfoUrlBuilder = (mangaid: string) => {
  return `${APIEndpoint}info?oid=mrs-serie-${mangaid}&last=0&country=US`
}

const getPage = async (mangaid: string, chapterid: string, chapter: number, page?: number) => {
  const chapterurl = `${APIEndpoint}pagesv2?oid=${chapterid}&last=0&country=United%20States`
  const chapterinfo = await get(chapterurl).then(res => res.data)

  if (isUndefined(page)) {
    const pagecount = chapterinfo.length
    const link = `${baseUrl}/mr/series/${mangaid}/chapter/${chapter}/page/`
    return {
      "meta": {
        "pages": pagecount,

      },
      "pages": chapterinfo.map((iter: any, index: number) => {return {"link": link+index, "role": iter.role}})
    }
  }
  const pageUrl = chapterinfo[page].url
  const pageData = await getBuf(pageUrl).then(buf => decodeMRI(buf))
  return pageData
}

const getData = async (mangaid: string, chapter?: number, page?: number) => {
  const mangaurl = mangaInfoUrlBuilder(mangaid)
  const mangainfo = await get(mangaurl).then(res => res.data.chapters)
  const chapters = mangainfo.map((iter: any) => {return {"oid": iter.oid, "name": iter.name}})
  
  if (isUndefined(chapter)) {
    const link = `${baseUrl}/mr/series/${mangaid}/chapter/`
    return chapters.map((iter: any, index: number) => {return {"name": iter.name, "link": link+index}})
  }
  //if (chapter >= chapters.length) { chapter = chapters.length-1 }
  console.log(`getting chapter ${chapter} [${chapters[chapter].name}]`)
  return getPage(mangaid, chapters[chapter].oid, chapter, page)
}

export default async (mangaid: string, chapter?: number, page?: number) =>
  await getData(mangaid, chapter, page)