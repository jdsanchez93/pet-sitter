import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PhotoService } from '../photo.service';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  fileToUpload: File | null = null;
  preview: any;
  s3ObjectName: string = '';

  constructor(private photoService: PhotoService) { }

  handleFileInput(event: Event) {
    let fileList: FileList | null = (event.currentTarget as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      this.fileToUpload = fileList[0];

      var reader: FileReader = new FileReader();

      reader.onloadend = (e) => {
        this.preview = reader.result as string;
      };

      reader.readAsDataURL(this.fileToUpload);
    }
  }

  uploadPhoto() {
    if (this.fileToUpload != null) {
      const itemType = 'note';
      const extension = '.' + this.fileToUpload.name.split('.').pop();
      this.photoService.callApiGateway({ itemType, extension })
        .pipe(
          tap(x => this.s3ObjectName = x.s3ObjectName),
          tap(x => console.log('api gateway response', x)),
          switchMap(x => this.photoService.uploadImage(x.uploadUrl, this.fileToUpload!)),
          tap(x => console.log('upload response', x))
        )
        .subscribe();
    }
    return of({});
  }
}
