import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){

    var config = {
      apiKey: "AIzaSyA9RZ75gk7yJVukcClbilJnzwda7z9JbSY",
      authDomain: "instagram-clone-7df98.firebaseapp.com",
      databaseURL: "https://instagram-clone-7df98.firebaseio.com",
      projectId: "instagram-clone-7df98",
      storageBucket: "instagram-clone-7df98.appspot.com",
      messagingSenderId: "926783819037"
    };
    firebase.initializeApp(config);
    
  }
}
