import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models';
import { NoteService } from '../note.service';
import { switchMap, tap } from 'rxjs';
import { NoteCardComponent } from '../note-card/note-card.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [NoteCardComponent],
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
          let noteId = Number(params.get('id'));
          return this.noteService.getNote(noteId);
        }),
        tap(x => this.note = x)
      )
      .subscribe()

  }
}
