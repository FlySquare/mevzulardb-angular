import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Question} from "../../models/question";
import {Party} from "../../models/party";
import {Speaker} from "../../models/speaker";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchString: string;
  searchSpeakers: Speaker[] = [];
  searchParties: Party[] = [];
  questions: Question[] = [];
  parties: Party[] = [];
  speakers: Speaker[] = [];
  selectedQuestion: Question = new Question();
  selectedVideo: SafeUrl;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.clearSelected();
    this.fetchData();
  }

  fetchData() {
    this.globalService.getQuestion().subscribe((data) => {
      this.questions = data;
      this.selectedQuestion = this.questions[0];
    });
    this.globalService.getParties().subscribe((data) => {
      this.parties = data;
    });
    this.globalService.getSpeakers().subscribe((data) => {
      this.speakers = data;
    });
  }

  searchQuestion(event: any) {
    if (event.keyCode !== 13) {
      this.filterQuestions();
    }
  }

  openMobileFilter(){
    if ((document.querySelector('.mobile-other-filters') as HTMLElement).style.display == 'none' || (document.querySelector('.mobile-other-filters') as HTMLElement).style.display == '') {
      (document.querySelector('.mobile-other-filters') as HTMLElement).style.display = 'flex';
    }else{
      (document.querySelector('.mobile-other-filters') as HTMLElement).style.display = 'none';
    }
  }

  filterQuestions() {
    this.globalService.getQuestion(this.searchString, this.searchParties, this.searchSpeakers).subscribe((data) => {
      this.questions = data;
      this.selectedQuestion = this.questions[0];
    });
  }

  searchParty(party: Party) {
    let oldSelectedParties = this.searchParties ?? [];
    let item = oldSelectedParties.find(x => x.id == party.id);
    if (item) {
      this.searchParties = oldSelectedParties.filter(x => x.id != party.id);
    } else {
      this.searchParties.push(party);
    }
    this.filterQuestions();
  }

  searchSpeaker(speaker: Speaker) {
    let oldSelectedSpeakers = this.searchSpeakers ?? [];
    let item = oldSelectedSpeakers.find(x => x.id == speaker.id);
    if (item) {
      this.searchSpeakers = oldSelectedSpeakers.filter(x => x.id != speaker.id);
    } else {
      this.searchSpeakers.push(speaker);
    }
    this.filterQuestions();
  }

  clearFilter() {
    this.searchSpeakers = [];
    this.searchParties = [];
    this.searchString = '';
    this.fetchData();
  }

  playVideo(question: Question) {
    this.selectedQuestion = question;
    this.selectedVideo = this.globalService.createSafeUrl('https://www.youtube-nocookie.com/embed/' + this.selectedQuestion.answer_video + '?controls=0&amp;start=' + this.selectedQuestion.answer_second);
  }

  clearSelected() {
    this.selectedQuestion = null;
    this.selectedVideo = this.globalService.createSafeUrl('');
  }

}
