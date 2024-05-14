import { Component, Input } from '@angular/core';
import { Note } from '../../../models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {

  @Input({ required: true }) note!: Note

}
