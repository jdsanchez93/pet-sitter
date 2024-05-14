import { Component, Input, OnInit, input } from '@angular/core';
import { Note } from '../../models';
import { NoteService } from '../note.service';
import { tap } from 'rxjs';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss'
})
export class SingleNoteComponent implements OnInit {
  @Input({ required: true }) noteId!: number;

  note?: Note;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNote(this.noteId)
      .pipe(
        tap(x => this.note = x)
      )
      .subscribe();
  }
}
