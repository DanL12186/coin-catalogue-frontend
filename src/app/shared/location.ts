import { environment } from "src/environments/environment";

export const baseURL = environment.production ? "angular-app" : "http://localhost:4200";
export const apiURL = environment.production ? "backend-url" : "http://localhost:3002"