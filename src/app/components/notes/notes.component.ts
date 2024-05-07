import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../dialog/sign-in/sign-in.component";
import {NotesApiService} from "../../service/notes-api.service";
import {NotesModel} from "../../model/notes.model";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  constructor(private notesApiService: NotesApiService) {
  }

  myNotes: NotesModel[] | null = [];

  text = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  baseUrl = "http://localhost:8080"
  notesUrl = "/api/v1/notes"

  sendRequest() {
    if (this.text.invalid) {
      return
    } else {
      const body = this.createBody();
      this.notesApiService.setBaseUrl(this.baseUrl);
      this.notesApiService.post(this.notesUrl, body).subscribe(data => {
        this.getAllNotes();
      })
    }
  }

  createBody() {
    const date = new Date();
    return {
      text: this.text.value,
      date: '' + date
    }
  }

  ngOnInit(): void {
    this.myNotes = [];
    this.getAllNotes();
  }

  getAllNotes() {
    this.notesApiService.setBaseUrl(this.baseUrl);
    this.notesApiService.get(this.notesUrl).subscribe(data => {
      this.myNotes = data;
    })
  }
}
