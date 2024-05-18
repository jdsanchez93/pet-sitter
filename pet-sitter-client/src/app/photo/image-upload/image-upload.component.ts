import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PhotoService } from '../photo.service';
import { Observable, map, of, switchMap, zip } from 'rxjs';

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

  constructor(private photoService: PhotoService) { }

  handleFileInput(event: Event) {
    let fileList: FileList | null = (event.currentTarget as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      this.fileToUpload = fileList[0];

      let reader: FileReader = new FileReader();

      reader.onloadend = (e) => {
        this.preview = reader.result as string;
      };

      reader.readAsDataURL(this.fileToUpload);
    }
  }

  uploadPhoto(): Observable<{ s3ObjectName: string | undefined }> {
    if (this.fileToUpload == null) {
      return of({ s3ObjectName: undefined })
    }

    const itemType = 'note';
    const extension = '.' + this.fileToUpload.name.split('.').pop();
    const apiGatewayResponse$ = this.photoService.callApiGateway({ itemType, extension });

    return apiGatewayResponse$.pipe(
      switchMap(({ s3ObjectName, uploadUrl }) => zip([s3ObjectName], this.photoService.uploadImage(uploadUrl, this.fileToUpload!))),
      map(([s3ObjectName]) => ({ s3ObjectName }))
    )
  }
}
