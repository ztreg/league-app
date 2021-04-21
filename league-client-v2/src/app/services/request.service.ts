import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  queryToken = 'api_key=RGAPI-adab3bc2-8561-4700-9b7f-4defd6285da0'
  matches = 'lol/match/v4/matches'
  
  allMatches = 'lol/match/v4/matchlists/by-account'
  
  itemsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/item.json'
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  championsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json'
  summonersURL = 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/summoner.json'
  
  userByNameURL = 'lol/summoner/v4/summoners/by-name'

  constructor(private http: HttpClient) { }

  getAllMatches(accountId: string, startIndex: number, endIndex: number): Promise<HttpResponse<any>> {
    const indexQuery = `?endIndex=${endIndex}&beginIndex=${startIndex}`
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.allMatches}/${accountId}${indexQuery}&${this.queryToken}`).toPromise()
  }

  getMatchDetails(matchId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.matches}/${matchId}?${this.queryToken}`).toPromise()
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
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.userByNameURL}/${summonerName}?${this.queryToken}`).toPromise()
  }

  signUp(userObject: any): any {
    return this.http.post<HttpResponse<any>>('http://localhost:3000/users', userObject).toPromise()
  }
}
