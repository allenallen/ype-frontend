import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuditableEntity } from './auditable-entity';
import { HttpClient } from '@angular/common/http';
import { Response } from './response';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  create(dto: T): Observable<Response<T>> {
    return this.httpClient.put<Response<T>>(this.getBaseUrl(), dto);
  }

  update(dto: T): Observable<Response<T>> {
    return this.httpClient.post<Response<T>>(this.getBaseUrl(), dto);
  }

  getAll(): Observable<Response<T[]>> {
    return this.httpClient.get<Response<T[]>>(this.getBaseUrl());
  }

  abstract getBaseUrl(): string;
}
