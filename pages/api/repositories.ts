// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiUrl } from '../../constants/Common'
import { IRepositoryList } from '../../interfaces/repository'
import { getFormattedLastWeekDate } from '../../helpers/common'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRepositoryList[]>
) {
  const { sort='stars', order = 'desc', page = 0, lang } = req.query
  const lastWeekDate = getFormattedLastWeekDate();

  let query = `created:>${lastWeekDate}&sort=${sort}&order=${order}&page=${page}`
  if(lang !== 'all' && lang !== 'undefined') {
    query = `language:${lang}&${query}`
  }

  console.log('REQUEST URL: ', `${apiUrl}/search/repositories?q=${query}`)
  const result = await fetch(`${apiUrl}/search/repositories?q=${query}`)
  const data: IRepositoryList[] = await result.json()
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1000, stale-while-revalidate=1999'
  )

  res.status(200).json(data)
}
