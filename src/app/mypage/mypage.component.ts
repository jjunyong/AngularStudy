import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../app/user.service'
import { DataSource } from '@angular/cdk/collections';


class MyDataSource extends DataSource<any>{
  constructor(public userService: UserService, public id){
    super();
  }
  connect() : Observable<any[]>{
    return this.userService.getData(this.id);
  }
  disconnect(){}
}

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})

export class MypageComponent {

  user : any;
  id : any; //currentUser Id
  displayedColumns = ['hero','date'];
  dataSource;

  constructor(public auth : AuthService, public afs : AngularFirestore,
  public userService : UserService) { 
    this.id = this.auth.afAuth.auth.currentUser.uid;
    
    this.afs.collection('user').doc(""+this.id).valueChanges()
      .subscribe(user => this.user = user)

    this.dataSource = new MyDataSource(this.userService, this.id)
    
    console.log(this.dataSource);
  }
    
  ngOnInit() {

  }

  updateUserInfo(){
   this.afs.collection('user').doc(""+this.id).set({
      nickname : this.user.nickname,
      age : this.user.age
   })
  }

}
