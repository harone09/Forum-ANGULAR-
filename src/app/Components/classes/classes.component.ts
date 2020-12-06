import { Component, OnInit, ɵConsole } from '@angular/core';
import { Classe } from 'src/app/Models/Classe';
import { User } from 'src/app/Models/User';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { UserService } from 'src/app/services/User/user.service';
import { ListefinalService } from 'src/app/services/Listefinal/listefinal.service';
import { ClassesMenuComponent } from '../classes-menu/classes-menu.component';
import { Listeatt } from 'src/app/Models/Listeatt';
import { ListeattService } from 'src/app/services/Listeatt/listeatt.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { Listefinal } from 'src/app/Models/Listefinal';



import { map, timeout } from 'rxjs/operators';
import SetInterval from 'set-interval'

import { Observable, interval, Subscription } from 'rxjs';




@Component({
  providers: [ClassesMenuComponent],
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent implements OnInit {
  Users: User[];
  classes: Classe[];
  classe: Classe;
  list: Listeatt[];
  Listee: Listeatt[];
  comments: Comment[];
  cl: Classe;
  cf: Listefinal;
  listeFinale: Listefinal[] = [];
  me = JSON.parse(localStorage.getItem('Session'));

  balance: string;

  modalRef: BsModalRef;

  constructor(public Classsservice: ClasseService, private LFS: ListefinalService,
    public modalservice: BsModalService, public Listeattservice: ListeattService, public UserService: UserService, private cc: ClassesMenuComponent) {

  }

  private updateSubscription: Subscription;
  ngOnInit(): void {
    // this.getClassee(this.me.id);
    //this.getClasses();
    //this.getList();
    if (this.me.role == "Student") {
      this.getListFinale();
    }
    else {
      this.getList();
      this.getClasses();
    }




    this.updateSubscription = interval(1000).subscribe(
      (val) => { this.getClasses(); this.getList() })


  }

  getListatt(id: number) {

    this.Listeattservice.getListeatt(id).subscribe(liste => {
      this.Listee = liste;
    });;

  }

  getc(idcc: number) {
    if (this.Listee.find(n => n.idc == idcc)) return 'ok';
  }

  getList() {
    this.Listeattservice.getlist().subscribe(liste => {
      this.Listee = liste;
    });
  }

  public getColor(idcc: number) {

    if (this.Listee.find(n => n.idc == idcc))
      return 'pink';
    else return 'black';
  }

  public openModl(template: TemplateRef<any>, idcc: number) {

    if (this.getColor(idcc) === 'pink') {
      this.modalRef = this.modalservice.show(template);
    }
  }


  ccc: Classe;
  addLFS(id: number, a: string, b: number, c: number): void {

    this.cf = { id: 0, name: a, ide: b, idc: c };

    this.LFS.addlisteF(this.cf).subscribe(err => {
      alert("it's:::::::::::::::::::::::::: notk");
    }
    );

    this.deletelist(id);
    this.ccc = { id: c, name: "", description: "", idProf: 0, members: 0 };
    this.Classsservice.editClass(this.ccc);

  }

  public deletelist = (cmt) => {

    this.Listeattservice.deleteListatt(cmt).subscribe(na => { this.getList() }
    );
  }

  addClass(cll: string, d: string): void {

    this.cl = { id: 0, name: cll.trim(), idProf: this.me.id, description: d, members: 0 };

    this.Classsservice.addClass(this.cl).subscribe(mea => {

      this.getClasses(), err => {
        alert("it's:::::::::::::::::::::::::: notk")
      }
    });
  }


  public deleteClass = (cmt) => {

    this.Classsservice.deleteClass(cmt).subscribe(n => {
      this.getClasses();
    });
  }



  public editClass = (cmt) => {


    console.log('...............................................');
    this.Classsservice.editClass(cmt).subscribe(n => {
      this.getClasses();
    });
  }

  filteredClasse: Classe[] = [];
  filteClasse() {
    for (const it of this.listeFinale) {
      for (const it2 of this.classes) {
        if (it.ide == this.me.id && it.idc == it2.id && !this.filteredClasse.find(n => n.id == it2.id)) {
          this.filteredClasse.push(it2);
        }
      }
    }
    ////
  }
  getListFinale() {
    this.LFS.getLF().subscribe(liste => {
      this.listeFinale = liste;
      this.getClasses();
    });
  }


  getClasses() {
    if (this.me.role == "Student") {
      this.Classsservice.getClasses().subscribe(classes => {
        this.classes = classes;
        this.filteClasse();
      });
    }
    else {
      this.Classsservice.getClasses().subscribe(classes => {
        this.classes = classes.filter(n => n.idProf == this.me.id);
      });
    }


    console.log(this.classes);
  }

  getClassee(id: number) {

    this.Classsservice.getClassee(id).subscribe(classes => {
      this.classes = classes;
    });;

  }

}