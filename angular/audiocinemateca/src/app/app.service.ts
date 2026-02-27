import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as pako from 'pako';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly AUTH_URL = '/api/system/files/catalogo/version.json.gz';
  private readonly CATALOG_URL = '/api/system/files/catalogo/catalogo.json.gz';
  private readonly BAN_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
  private readonly FAILED_ATTEMPTS_KEY = 'failedAttempts';
  private readonly BAN_END_TIME_KEY = 'banEndTime';
  private readonly APP_VERSION_KEY = 'appVersion';

  private readonly STORED_USERNAME_KEY = 'storedUsername';
  private readonly STORED_PASSWORD_KEY = 'storedPassword';

  private failedAttempts: number = 0;
  private banEndTime: number | null = null;

  catalogLoading = signal<boolean>(false);
  catalogProgress = signal<number>(0);

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {
    this.loadBanState();
    this.checkBanStatusOnLoad();
    // this.autoLogin(); // Deshabilitar autoLogin desde el constructor
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem(this.STORED_USERNAME_KEY);
  }

  private getStoredPassword(): string | null {
    return localStorage.getItem(this.STORED_PASSWORD_KEY);
  }

  autoLogin(): Observable<{ loggedIn: boolean; updateRequired: boolean }> {
    const username = this.getStoredUsername();
    const password = this.getStoredPassword();

    if (!username || !password) {
      return of({ loggedIn: false, updateRequired: false }); // No hay credenciales
    }

    return this.is_login(username, password).pipe(
      tap(result => {
        if (!result.loggedIn) {
          // Limpiar credenciales si el auto-login falla
          localStorage.removeItem(this.STORED_USERNAME_KEY);
          localStorage.removeItem(this.STORED_PASSWORD_KEY);
        }
      })
    );
  }

  private loadBanState(): void {
    const storedAttempts = localStorage.getItem(this.FAILED_ATTEMPTS_KEY);
    const storedBanTime = localStorage.getItem(this.BAN_END_TIME_KEY);

    if (storedAttempts) {
      this.failedAttempts = parseInt(storedAttempts, 10);
    }
    if (storedBanTime) {
      this.banEndTime = parseInt(storedBanTime, 10);
    }
  }

  private saveBanState(): void {
    localStorage.setItem(this.FAILED_ATTEMPTS_KEY, this.failedAttempts.toString());
    if (this.banEndTime) {
      localStorage.setItem(this.BAN_END_TIME_KEY, this.banEndTime.toString());
    } else {
      localStorage.removeItem(this.BAN_END_TIME_KEY);
    }
  }

  private checkBanStatusOnLoad(): void {
    if (this.banEndTime && Date.now() >= this.banEndTime) {
      this.resetBan();
    }
  }

  isBanned(): boolean {
    return this.banEndTime !== null && Date.now() < this.banEndTime;
  }

  getRemainingBanTime(): string {
    if (!this.banEndTime) {
      return '';
    }
    const remainingMs = this.banEndTime - Date.now();
    if (remainingMs <= 0) {
      this.resetBan();
      return '';
    }

    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    let timeString = '';
    if (hours > 0) {
      timeString += `${hours} hora${hours !== 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      timeString += `${minutes} minuto${minutes !== 1 ? 's' : ''} `;
    }
    timeString += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;

    return timeString.trim();
  }

  handleSuccessfulLogin(): void {
    this.resetBan();
  }

  handleFailedLogin(): void {
    this.failedAttempts++;
    if (this.failedAttempts >= 2 && !this.banEndTime) {
      this.banEndTime = Date.now() + this.BAN_DURATION_MS;
    }
    this.saveBanState();
  }

  resetBan(): void {
    this.failedAttempts = 0;
    this.banEndTime = null;
    this.saveBanState();
  }

  is_login(username: string, password: string): Observable<{ loggedIn: boolean; updateRequired: boolean }> {
    const encodedCredentials = btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });

    return this.http.get(this.AUTH_URL, { headers, observe: 'response', responseType: 'arraybuffer' }).pipe(
      map(response => {
        if (response.status === 200 && response.body) {
          const decompressed = pako.inflate(new Uint8Array(response.body), { to: 'string' });
          const newVersionData = JSON.parse(decompressed);
          const oldVersionData = JSON.parse(localStorage.getItem(this.APP_VERSION_KEY) || '{}');

          const updateRequired = JSON.stringify(newVersionData) !== JSON.stringify(oldVersionData);

          if (updateRequired) {
            localStorage.setItem(this.APP_VERSION_KEY, JSON.stringify(newVersionData));
          }
          
          localStorage.setItem(this.STORED_USERNAME_KEY, username); // Guardar usuario sin codificar
          localStorage.setItem(this.STORED_PASSWORD_KEY, password); // Guardar contraseña sin codificar
          return { loggedIn: true, updateRequired };
        }
        return { loggedIn: false, updateRequired: false };
      }),
      catchError(error => {
        return of({ loggedIn: false, updateRequired: false });
      })
    );
  }

  loadVersion(): Observable<Date | null> {
    const username = this.getStoredUsername();
    const password = this.getStoredPassword();
    if (!username || !password) {
      console.error('loadVersion: No credentials available.');
      return of(null);
    }
    const encodedCredentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });
    return this.http.get(this.AUTH_URL, { headers, observe: 'response', responseType: 'arraybuffer' }).pipe(
      map(response => {
        if (response.status === 200 && response.body) {
          const decompressed = pako.inflate(new Uint8Array(response.body), { to: 'string' });
          const versionData = JSON.parse(decompressed);
          // console.log('loadVersion: Received version data:', versionData);
          if (versionData && versionData.year && versionData.mon && versionData.mday &&
              versionData.hours !== undefined && versionData.minutes !== undefined && versionData.seconds !== undefined) {
            return new Date(versionData.year, versionData.mon - 1, versionData.mday,
                            versionData.hours, versionData.minutes, versionData.seconds);
          }
          // console.warn('loadVersion: Invalid version data format.', versionData);
          return null;
        }
        return null;
      }),
      catchError(error => {
        // console.error('Error loading version:', error.status, error.headers.get('WWW-Authenticate'), error);
        return of(null);
      })
    );
  }

  loadCatalog(): Observable<any[]> {
    this.catalogLoading.set(true);
    this.catalogProgress.set(0);

    return new Observable(observer => {
      this.loadVersion().subscribe(async serverCatalogDate => {
        if (!serverCatalogDate) {
          // console.error('Could not get server catalog version.');
          this.catalogLoading.set(false);
          observer.error('Could not get server catalog version.');
          return;
        }

        const localCatalog = await this.indexedDbService.getCatalog();
        let needsDownload = false;

        if (!localCatalog || !localCatalog.versionDate) {
          // console.log('No local catalog found. Downloading...');
          needsDownload = true;
        } else {
          const localDate = new Date(localCatalog.versionDate);
          if (localDate < serverCatalogDate) {
            // console.log('Server catalog is newer. Downloading...');
            needsDownload = true;
          } else {
            // console.log('Local catalog is up-to-date. Loading from IndexedDB.');
            this.catalogLoading.set(false);
            observer.next(localCatalog.data);
            observer.complete();
            return;
          }
        }

        if (needsDownload) {
          const username = this.getStoredUsername();
          const password = this.getStoredPassword();

          if (!username || !password) {
            // console.error('No credentials available for catalog download.');
            this.catalogLoading.set(false);
            observer.error('No credentials available for catalog download.');
            return;
          }

          const worker = new Worker(new URL('./catalog.worker', import.meta.url), { type: 'module' });

          worker.onmessage = async ({ data }) => {
            if (data.type === 'success') {
              // console.log('Catalog downloaded and decompressed by worker.');
              await this.indexedDbService.saveCatalog(data.catalog, serverCatalogDate.toISOString());
              this.catalogLoading.set(false);
              this.catalogProgress.set(100);
              observer.next(data.catalog);
              observer.complete();
              worker.terminate();
            } else if (data.type === 'progress') {
              this.catalogProgress.set(data.progress);
            } else if (data.type === 'error') {
              // console.error('Error from catalog worker:', data.message);
              this.catalogLoading.set(false);
              observer.error(data.message);
              worker.terminate();
            }
          };

          worker.onerror = (error) => {
            // console.error('Worker error:', error);
            this.catalogLoading.set(false);
            observer.error('Worker error during catalog download.');
            worker.terminate();
          };

          worker.postMessage({ url: this.CATALOG_URL, username, password });
        }
      }, error => {
        // console.error('Error getting server version for catalog:', error);
        this.catalogLoading.set(false);
        observer.error('Error getting server version for catalog.');
      });
    });
  }

  login(username: string, password: string): Observable<{ loggedIn: boolean; updateRequired: boolean }> {
    // console.log(`Attempting to log in with username: ${username} and password: ${password}`);
    return this.is_login(username, password);
  }
}


