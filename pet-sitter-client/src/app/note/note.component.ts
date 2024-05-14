import { Component, Input, OnInit } from '@angular/core';
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
export class NoteComponent {

  @Input({ required: true }) note!: Note

}
