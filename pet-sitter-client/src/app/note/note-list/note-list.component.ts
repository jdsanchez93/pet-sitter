import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NoteService } from '../note.service';
import { tap } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [MatListModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private ns: NoteService,
  ) { }
  ngOnInit(): void {
    this.ns.getNotes()
      .pipe(
        tap(x => this.notes = x)
      )
      .subscribe()
  }
}
