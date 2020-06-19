export interface RootStateType {
  fetchedData: {
    current_page: number
    data: { user: string; content: string; love: string; guild: string; created_at: string }[]
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
  } | null
  isFetching: boolean
  isLoading: boolean
  errorMsg: string
}

const State: RootStateType = {
  fetchedData: null,
  isFetching: false,
  isLoading: false,
  errorMsg: ''
}

export default State
