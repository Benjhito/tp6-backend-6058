import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspectadoresService {
  private apiUrl = 'http://localhost:5000/api/espectadores';

  constructor(private http: HttpClient) {}

  getEspectadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
