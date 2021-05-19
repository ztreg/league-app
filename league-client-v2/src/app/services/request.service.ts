import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { MatchesMetaData } from '../types/Match'
import { setHttpOptions } from './requestOptions'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  itemsURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/item.json'
  itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/'
  championsURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/champion.json'
  summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/summoner.json'

  constructor(private http: HttpClient) { }

  getAllMatches(accountId: string, startIndex: number, endIndex: number): Promise<MatchesMetaData> {
    const indexQuery = `?endIndex=${endIndex}&beginIndex=${startIndex}`

    return this.http.get<MatchesMetaData>(
      `${environment.backendURL}/ritoURL/matches/user/${accountId}${indexQuery}`, setHttpOptions()).toPromise()
  }

  getMatchDetails(matchId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`
    ${environment.backendURL}/ritoURL/matches/${matchId}`, setHttpOptions()).toPromise()
  }

  getItems(): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.itemsURL).toPromise()
  }

  getItemImage(imageId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`${this.itemImageUrl}${imageId}`).toPromise()
  }

  getAllChampions(): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.championsURL).toPromise()
  }

  getAllSummoners(): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.summonersURL).toPromise()
  }

  getUserInfoByName(summonerName: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`
    ${environment.backendURL}/ritoURL/summoner/${summonerName}`).toPromise()
  }

  getUserInfoByID(accountId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`
    ${environment.backendURL}/ritoURL/summonerById/${accountId}`).toPromise()
  }

  getUserRankedInfo(summonerId: string): Promise<HttpResponse<any>> {

    return this.http.get<HttpResponse<any>>(`
    ${environment.backendURL}/ritoURL/summonerRanked/${summonerId}`, setHttpOptions()).toPromise()
  }

  signUp(userObject: any): Promise<any> {
    return this.http.post<HttpResponse<any>>(`
    ${environment.backendURL}/users`, userObject).toPromise()
  }

  login(userObject: any): Promise<any> {
    return this.http.post<HttpResponse<any>>(`
    ${environment.backendURL}/auth/login`, userObject).toPromise()
  }

  followUser(accountId: string, currentUserId: string): Promise<any> {
    return this.http.patch<HttpResponse<any>>(
      `${environment.backendURL}/users/${currentUserId}`, {accountId}).toPromise()
  }

}
