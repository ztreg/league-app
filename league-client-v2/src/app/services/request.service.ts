import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  queryToken = '?api_key=RGAPI-e39e5f36-d525-43a8-ba24-f064f91d7059'
  accountId = 'UJhJTXVRisEi4S2ASXmhUmDEYhWJIBfPSmMbQdhAfbM'
  matches = 'lol/match/v4/matches'

  itemsURL = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/item.json'
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  constructor(private http: HttpClient) { }

  getMatchDetails(matchId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`/api/v1/${this.matches}/${matchId}${this.queryToken}`).toPromise()
  }

  getItems(): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.itemsURL).toPromise()
  }

  getItemImage(imageId: string): Promise<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`${this.itemImageUrl}${imageId}`).toPromise()
  }
}
