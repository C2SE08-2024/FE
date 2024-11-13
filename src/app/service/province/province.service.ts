import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private jsonUrl = 'assets/provinces.json';
  private citiesData: any[] = [];

  constructor(private http: HttpClient) { }

  loadCitiesData(): Observable<any[]> {
    if (this.citiesData.length > 0) {
      return of(this.citiesData);
    } else {
      return this.http.get<any[]>(this.jsonUrl).pipe(
        map(data => {
          this.citiesData = data;
          return data;
        })
      );
    }
  }

  getDistrictsByCity(cityCode: number): Observable<any[]> {
    return this.loadCitiesData().pipe(
      map(cities => {  
        const selectedCity = cities.find(city => city.code === cityCode);
        console.log('Selected City:', selectedCity); 
        return selectedCity ? selectedCity.districts : [];
      })
    );
  }
  

  // Lấy danh sách phường/xã theo mã quận/huyện (district code)
  getWardsByDistrict(districtCode: number): Observable<any[]> {
    return this.loadCitiesData().pipe(
      map(cities => {
        // Tìm tất cả các quận/huyện trong tất cả các thành phố và trả về quận/huyện tương ứng với districtCode
        for (const city of cities) {
          const selectedDistrict = city.districts.find(district => district.code === districtCode);
          if (selectedDistrict) {
            return selectedDistrict.wards; // Trả về danh sách phường/xã
          }
        }
        return []; // Trả về mảng rỗng nếu không tìm thấy
      })
    );
  }
}
