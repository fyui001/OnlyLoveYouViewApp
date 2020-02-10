import axios from 'axios'

export interface FetchOnlyLoveYouResponse {
  status: boolean
  resultData: {
    current_page: number
    data: { UserName: string; Content: string; Love: string; Guild: string; create_at: string }[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string
    path: string
    per_page: number
    prev_page_url?: string
    to: number
    total: number
  }
}

export interface FetchOnlyLoveYouResponseError {
  status: boolean
  msg: string
}

export async function fetchOnlyLoveYou({
  page
}: {
  page: number
}): Promise<FetchOnlyLoveYouResponse | FetchOnlyLoveYouResponseError> {
  const result = await axios({
    method: 'GET',
    url: 'https://app.mogamin.net/api/only_love_you/get',
    params: {
      page: page
    }
  })
  return result.data
}

export async function fetchOnlyLoveYouSearch({
  searchKeyword,
  page
}: {
  searchKeyword: string
  page: number
}): Promise<FetchOnlyLoveYouResponse | FetchOnlyLoveYouResponseError> {
  const result = await axios({
    method: 'GET',
    url: 'https://app.mogamin.net/api/only_love_you/search',
    params: {
      page,
      searchKeyword
    }
  })
  return result.data
}
