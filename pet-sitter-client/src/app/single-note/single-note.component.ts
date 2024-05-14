import { Component, Input, OnInit, input } from '@angular/core';
import { Note } from '../../models';
import { NoteService } from '../note.service';
import { of, switchMap, tap } from 'rxjs';
import { NoteComponent } from '../note/note.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss'
})
export class SingleNoteComponent implements OnInit {

  note?: Note;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          var noteId = Number(params.get('id'));
          console.log('noteid', noteId)
          return this.noteService.getNote(noteId);
        }),
        tap(x => this.note = x)
      )
      .subscribe()

  }
}
