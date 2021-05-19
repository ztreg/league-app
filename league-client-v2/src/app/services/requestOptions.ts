import { HttpHeaders } from '@angular/common/http'

/**
 * This handles the type of request that is being made.
 * 'get' | 'post' etc
 * @param requestType What kind of request are you making?
 * @returns The options as a object.
 * Add more options if needed :)
 */

export function setHttpOptions(): object {
  const token = sessionStorage.getItem('token')
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${token}`
    })
  }

  return httpOptions
}
