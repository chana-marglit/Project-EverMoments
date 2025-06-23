import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Album } from '../../shared/models/album.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private apiService: ApiService) {}

  getAlbums(page = 1, limit = 10, userId?: number): Observable<{ albums: Album[]; total: number; totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (userId) {
      params = params.set('userId', userId.toString());
    }

    return this.apiService.get<{ albums: Album[]; total: number; totalPages: number }>('/admin/albums', params);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.apiService.get<Album>(`/admin/albums/${id}`);
  }

  createAlbum(album: any): Observable<Album> {
    return this.apiService.post<Album>('/admin/albums', album);
  }

  updateAlbum(album: any): Observable<Album> {
    return this.apiService.put<Album>(`/admin/albums/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.apiService.delete<void>(`/admin/albums/${id}`);
  }
}