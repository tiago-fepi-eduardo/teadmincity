// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pagination: 10,
  defaultLocation:
  {
    latitude:-23.5120687,
    longitude: -46.9170876,
    zoom: 13
  },
  endpoints:
  {
    order: "http://localhost/api/order",
    contact: "http://localhost/api/contact",
    about: "http://localhost/api/about",
    login: "http://localhost/api/user/authenticate",
    news: "http://localhost/api/news",
    ocorrency: "http://localhost/api/ocorrency",
    ocorrencyDetail: "http://localhost/api/ocorrencyDetail",
    orderStatus: "http://localhost/api/orderStatus",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
