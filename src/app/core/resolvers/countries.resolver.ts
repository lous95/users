import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LocationsHttpService } from '../../features/locations/services/locations-http.service';
import { Country } from '../../features/locations/models/country';

export const countriesResolver: ResolveFn<Country[]> = (route, state) => {
  const locationsHttpService = inject(LocationsHttpService);

  return locationsHttpService.getCountries();
};
