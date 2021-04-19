import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  queryToken = 'api_key=RGAPI-9ab34cbb-c287-4ebf-844c-68f013e02917'
  accountId = 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'
  matches = 'lol/match/v4/matches'

  allMatches = 'lol/match/v4/matchlists/by-account'
  itemsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/item.json'
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'

  championsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json'

  summonersURL = 'http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/summoner.json'

  constructor(private http: HttpClient) { }

  getAllMatches(accountId: string, startIndex: number, endIndex: number): Promise<HttpResponse<any>> {
    const indexQuery = `?endIndex=${endIndex}&beginIndex=${startIndex}`
    console.log('getting da matched LUL')

    return this.http.get<HttpResponse<any>>(`/api/v1/${this.allMatches}/${accountId}${indexQuery}&${this.queryToken}`).toPromise()
  }

  getMatchDetails(matchId: string): Promise<HttpResponse<any>> {
    console.log('REQ: getting da match details LUL')
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
}
