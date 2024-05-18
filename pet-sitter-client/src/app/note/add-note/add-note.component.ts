import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoteService } from '../note.service';
import { ImageUploadComponent } from '../../photo/image-upload/image-upload.component';
import { MatCardModule } from '@angular/material/card';
import { switchMap } from 'rxjs';
import { Note } from '../../../models';

@Component({
  selector: 'app-add-note',
  standalone: true,
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, ImageUploadComponent, MatCardModule]
})
export class AddNoteComponent {
  noteForm = this.fb.nonNullable.group({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  @ViewChild(ImageUploadComponent) imageUploadComponent!: ImageUploadComponent;

  constructor(private noteService: NoteService, private fb: FormBuilder) { }

  onSubmit() {
    let n: Partial<Note> = this.noteForm.value;
    this.imageUploadComponent.uploadPhoto().pipe(
      switchMap(({ s3ObjectName }) => {
        if (s3ObjectName) {
          n.photos = [{ photoId: 0, isDelete: false, s3Key: s3ObjectName }]
        }
        return this.noteService.createNote(n)
      })
    ).subscribe();
  }
}
