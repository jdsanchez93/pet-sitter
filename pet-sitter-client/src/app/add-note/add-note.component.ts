import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoteService } from '../note.service';
import { Note } from '../../models';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {
  noteForm = this.fb.nonNullable.group({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  // noteForm = this.fb.nonNullable.group({
  //   title: '',
  //   description: '',
  // }, { validators: [Validators.required] });

  constructor(private noteService: NoteService, private fb: FormBuilder) { }

  onSubmit() {
    this.noteService.createNote(this.noteForm.value)
      .subscribe();
  }
}
