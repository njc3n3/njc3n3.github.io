import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'
import { serverURL } from '../config'

export default function useQuery<T>(url: string, onSuccess?: (res: AxiosResponse<any>) => void) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleError = (error: any) => {
    setError(error.response?.data.err)
    setLoading(false)
  }

  const fullURL = `${serverURL}/${url}`
  const runQuery = useCallback(() => {
    const handleSuccess = (res: AxiosResponse<any>) => {
      setData(res.data)
      setLoading(false)
      onSuccess && onSuccess(res)
    }

    setLoading(true)
    axios.get(fullURL).then(handleSuccess).catch(handleError)
  }, [fullURL, onSuccess])

  useEffect(() => {
    runQuery()
  }, [runQuery])

  return { data, loading, error, refetch: runQuery }
}
