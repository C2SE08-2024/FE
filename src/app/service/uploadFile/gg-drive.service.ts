import { HostListener, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})

export class GgDriveService {


  private clientID = environment.googleDriveApi.googleClientId;
  private API_KEY = environment.googleDriveApi.googleApiKey;
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';

  constructor() { }

  initializeGoogleClient(): void {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.clientID,
        scope: this.SCOPES,
        discoveryDocs: this.DISCOVERY_DOCS
      }).then(() => {
        console.log('Google API Client Initialized');
      });
    });
  }

  // Xác thực người dùng và lấy token
  authenticate(): Promise<any> {
    return new Promise((resolve, reject) => {
      gapi.auth2.getAuthInstance().signIn().then((response: any) => {
        console.log('User signed in:', response);
        resolve(response);
      }, (error: any) => {
        reject('Error signing in: ' + error);
      });
    });
  }

  // Tải file lên Google Drive
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileMetadata = {
        name: file.name,
      };
      
      const media = {
        mimeType: file.type,
        body: file
      };

      const request = gapi.client.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });

      request.execute((file) => {
        if (file.id) {
          console.log('File uploaded successfully:', file);
          // Tạo URL cho file đã tải lên
          const fileUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
          resolve(fileUrl);
        } else {
          reject('Error uploading file');
        }
      });
    });
  }
}

