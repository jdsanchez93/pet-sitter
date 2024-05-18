import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  public callApiGateway(uploadData: UploadData): Observable<ApiGatewayResponse> {
    return this.http.post<ApiGatewayResponse>('api/Upload', uploadData);
  }

  public uploadImage(uploadUrl: string, file: File): Observable<any> {
    return this.http.put(uploadUrl, file);
  }
}

interface UploadData {
  itemType: string;
  extension: string;
}

interface ApiGatewayResponse {
  s3ObjectName: string;
  uploadUrl: string;
}
