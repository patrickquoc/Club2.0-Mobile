// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  address: 'localhost',
  port: 3030,
  connection: 'https://vm130.htl-leonding.ac.at:8443',
  wsConnection: 'https://vm130.htl-leonding.ac.at:8080'
  
  //For local connection uncomment
  // connection: 'http://localhost:8443',
  // wsConnection: 'ws://localhost:8888'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
