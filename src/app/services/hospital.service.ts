import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  getHospital(): Observable<Hospital> {

    const hospital: Hospital = {
      id: 1,
      name: 'Central Hospital',
      buildings: [
        {
          id: 1,
          name: 'Main Building',
          floors: [
            {
              id: 1,
              name: 'Ground Floor',
              sectors: [
                {
                  id: 1,
                  name: 'Emergency',
                  assets: [
                    {
                      id: 1,
                      name: 'Stretcher 01',
                      type: 'Stretcher',
                      status: 'OPERATIONAL'
                    },
                    {
                      id: 2,
                      name: 'Heart Monitor',
                      type: 'Monitor',
                      status: 'MAINTENANCE'
                    }
                  ]
                },
                {
                  id: 2,
                  name: 'Radiology',
                  assets: [
                    {
                      id: 3,
                      name: 'X-Ray Machine',
                      type: 'X-Ray',
                      status: 'OPERATIONAL'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    return of(hospital).pipe(delay(1000));
  }
}
