export class FileUploadResponseDto {
  filename: string;
  url: string;
  constructor(filename: string, url: string) {
    this.filename = filename;
    this.url = url;
  }
}
