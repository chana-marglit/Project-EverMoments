
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Image } from '../../shared/models/image.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private apiService: ApiService) {}

  getImages(page = 1, limit = 10, albumId?: number): Observable<{ images: Image[]; total: number; totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (albumId) {
      params = params.set('albumId', albumId.toString());
    }

    return this.apiService.get<{ images: Image[]; total: number; totalPages: number }>('/admin/images', params);
  }

  getImageById(id: number): Observable<Image> {
    return this.apiService.get<Image>(`/admin/images/${id}`);
  }

  deleteImage(id: number): Observable<void> {
    return this.apiService.delete<void>(`/admin/images/${id}`);
  }

  updateImageTags(id: number, tags: string): Observable<Image> {
    return this.apiService.put<Image>(`/admin/images/${id}/tags`, { tags });
  }
}