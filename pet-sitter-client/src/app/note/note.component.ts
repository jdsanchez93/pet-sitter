import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Observable, tap } from 'rxjs';
import { Note } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {

  note: Note = {
    noteId: 0,
    title: 'Shotzi',
    description: 'Ate 4 bowls of food',
    photos: []
  };

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNote(1)
      .pipe(
        tap(x => this.note = x)
      )
      .subscribe();
  }

}
