import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PostProvider {
    //server: string = 'https://tis1.itbi.ac.id/api/';
    server: string = 'https://abijess.my.id/api/';

    constructor(public http: HttpClient) {}

    postData(body: any, file: string): Observable<any> {
        let type = 'aplication/json; charset=utf-8';
        let headers = new HttpHeaders({ 'Content-Type': type });

        return this.http.post(this.server + file, JSON.stringify(body), {
            headers: headers,
        }).pipe(
            map((res:any) => {
                return res;
            })
        );
    }

}
