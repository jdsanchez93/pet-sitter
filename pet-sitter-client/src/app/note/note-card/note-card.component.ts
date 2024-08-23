import { Component, Input } from '@angular/core';
import { Note } from '../../../models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {

  @Input({ required: true }) note!: Note

  constructor(private router: Router) { }

  editNote() {
    this.router.navigate(['/edit-note', this.note.noteId])
  }

}
