import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { serverURL } from '../config'

type Operation = 'post' | 'put' | 'delete'

export default function useMutation(url: string, operation: Operation, onSuccess?: (res: AxiosResponse<any>) => void) {
  const [data, setData] = useState()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSuccess = (res: AxiosResponse<any>) => {
    setData(res.data)
    setLoading(false)
    onSuccess && onSuccess(res)
  }

  const handleError = (error: any) => {
    setError(error.response.data.err)
    setLoading(false)
  }

  const fullURL = `${serverURL}/${url}`
  const runMutation = (input: any) => {
    setLoading(true)
    switch (operation) {
      case 'post':
        axios.post(fullURL, input).then(handleSuccess).catch(handleError)
        break
      case 'put':
        axios.put(fullURL, input).then(handleSuccess).catch(handleError)
        break
      case 'delete':
        axios.delete(fullURL, input).then(handleSuccess).catch(handleError)
        break
      default:
        setLoading(false)
        break
    }
  }

  return { data, loading, error, runMutation }
}
