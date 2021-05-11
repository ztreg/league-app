import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  queryToken = 'api_key=RGAPI-bd1e3d03-6de2-4178-bb51-cd72f56ca78b'
  matches = 'lol/match/v4/matches'

  allMatches = 'lol/match/v4/matchlists/by-account'

  itemsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/item.json'
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  championsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json'
  summonersURL = 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/summoner.json'

  userByNameURL = 'lol/summoner/v4/summoners/by-name'
  userByIdUrl = '/lol/summoner/v4/summoners/by-account'
  rankedInfoBySummonerIdURL = 'lol/league/v4/entries/by-summoner'

  constructor(private http: HttpClient) { }

  getAllMatches(accountId: string, startIndex: number, endIndex: number): Promise<HttpResponse<any>> {
    const indexQuery = `?endIndex=${endIndex}&beginIndex=${startIndex}`
    console.log('REQ: Matches')

    return this.http.get<HttpResponse<any>>(`/api/v1/${this.allMatches}/${accountId}${indexQuery}&${this.queryToken}`).toPromise()
  }

  getMatchDetails(matchId: string): Promise<HttpResponse<any>> {
    console.log('REQ: MatchDetails')
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.matches}/${matchId}?${this.queryToken}`).toPromise()
  }

  getItems(): Promise<HttpResponse<any>> {
    console.log('ITEMS')
    return this.http.get<HttpResponse<any>>(this.itemsURL).toPromise()
  }

  getItemImage(imageId: string): Promise<HttpResponse<any>> {
    console.log('ITEM IMAGE')
    return this.http.get<HttpResponse<any>>(`${this.itemImageUrl}${imageId}`).toPromise()
  }

  getAllChampions(): Promise<HttpResponse<any>> {
    console.log('CHAMPIONS')
    return this.http.get<HttpResponse<any>>(this.championsURL).toPromise()
  }

  getAllSummoners(): Promise<HttpResponse<any>> {
    console.log('SUMMONERS')
    return this.http.get<HttpResponse<any>>(this.summonersURL).toPromise()
  }

  getUserInfoByName(summonerName: string): Promise<HttpResponse<any>> {
    console.log('REQ: SUMS')
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.userByNameURL}/${summonerName}?${this.queryToken}`).toPromise()
  }

  getUserInfoByID(accountId: string): Promise<HttpResponse<any>> {
    console.log('REQ: USER INFO BY ID')
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.userByIdUrl}/${accountId}?${this.queryToken}`).toPromise()
  }

  getUserRankedInfo(summonerId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.rankedInfoBySummonerIdURL}/${summonerId}?${this.queryToken}`).toPromise()
  }

  signUp(userObject: any): Promise<any> {
    return this.http.post<HttpResponse<any>>(`${environment.backendURL}/users`, userObject).toPromise()
  }

  login(userObject: any): Promise<any> {
    return this.http.post<HttpResponse<any>>(`${environment.backendURL}/auth/login`, userObject).toPromise()
  }

  followUser(accountId: string, currentUserId: string): Promise<any> {
    return this.http.patch<HttpResponse<any>>(`${environment.backendURL}/users/${currentUserId}`, {accountId}).toPromise()
  }

}
