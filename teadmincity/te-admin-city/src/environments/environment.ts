// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoints:
  {
    contact: "http://localhost:1000/api/contact",
    about: "http://localhost:1000//api/about",
    login: "http://localhost:1000/api/login",
    map: "http://localhost:1000/api/map",
    search: "http://localhost:1000/api/search",
    home: "http://localhost:1000/api/home"
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
