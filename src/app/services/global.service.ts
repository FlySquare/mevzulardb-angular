import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Party} from "../models/party";
import {Response} from "../models/response";
import {Speaker} from "../models/speaker";
import {Question} from "../models/question";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  createSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getParties(): Observable<Party[]> {
    return this.apiService.get('/getParties')
      .pipe(
        map((response: Response) => response.data.map((party: Party) => new Party().prepare(party)))
      );
  }

  getSpeakers(): Observable<Speaker[]> {
    return this.apiService.get('/getSpeakers')
      .pipe(
        map((response: Response) => response.data.map((speaker: Speaker) => new Speaker().prepare(speaker)))
      );
  }

  getQuestion(query = '', partyId: Party[] = [], speakerId: Speaker[] = []): Observable<Question[]> {
    return this.apiService.get('/getQuestions', {
      query,
      speakerIds: [speakerId.map(x => x.id)],
      partyIds: [partyId.map(y => y.id)]
    })
      .pipe(
        map((response: Response) => response.data.map((question: Question) => new Question().prepare(question)))
      );
  }

}
