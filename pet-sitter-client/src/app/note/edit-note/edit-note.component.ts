import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { NoteService } from '../note.service';
import { Note } from '../../../models';
import { AddNoteComponent } from "../add-note/add-note.component";

@Component({
    selector: 'app-edit-note',
    standalone: true,
    templateUrl: './edit-note.component.html',
    styleUrl: './edit-note.component.scss',
    imports: [AddNoteComponent]
})
export class EditNoteComponent implements OnInit {

  note: Note | undefined;

  constructor(private route: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let noteId = Number(params.get('id'));
          return this.noteService.getNote(noteId);
        }),
        tap(x => console.log('tap', x)),
        tap(x => this.note = x)
      )
      .subscribe();
  }

}
