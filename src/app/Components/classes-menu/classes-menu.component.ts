import { Component, OnInit } from '@angular/core';
import { Classe } from "../../Models/Classe";
import { ClasseService } from "../../services/classe/classe.service";
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ListeattService } from 'src/app/services/Listeatt/listeatt.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Listeatt } from 'src/app/Models/Listeatt';
import { Listefinal } from 'src/app/Models/Listefinal';
import { Observable, interval, Subscription } from 'rxjs';
import { ListefinalService } from 'src/app/services/Listefinal/listefinal.service';


@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.css']
})
export class ClassesMenuComponent implements OnInit {

  classes: Classe[] = [];
  listeFinale: Listefinal[] = [];
  cl: Classe;

  me = JSON.parse(localStorage.getItem('Session'));

  modalRef: BsModalRef;

  constructor(private classeService: ClasseService, public ListeAttservice: ListeattService, public ListeFinaleservice: ListefinalService, public modalservice: BsModalService, public Classsservice: ClasseService, public router: Router) { }

  private updateSubscription: Subscription;

  public openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(template);

  }

  addClass(cll: string, d: string): void {

    if (cll.trim() != "" && d.trim() != "") {

      this.cl = { id: 0, name: cll.trim(), idProf: this.me.id, description: d, members: 0 };

      this.Classsservice.addClass(this.cl).subscribe(mea => {

        this.getClasses(), err => {
          alert("it's:::::::::::::::::::::::::: notk")
        }
      });
    }
  }

  ll: Listeatt;
  public addStudent(a: string) {
    this.ll = { id: 0, name: this.me.name, idc: Number.parseInt(a), ide: this.me.id };
    console.log(this.ll);
    this.ListeAttservice.addCListeatt(this.ll).subscribe(n => {
      console.log(n);
    });
  }

  getListFinale() {
    this.ListeFinaleservice.getLF().subscribe(liste => {
      this.listeFinale = liste;
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

  getClasses() {

    if (this.me.role == "Student") {
      this.classeService.getClasses().subscribe(classes => {
        this.classes = classes;
        this.filteClasse();
      });
    }
    else {

      this.classeService.getClasses().subscribe(classes => {
        this.filteredClasse = classes.filter(n => n.idProf == this.me.id);
      });
    }

    console.log(this.classes);
  }

  ngOnInit(): void {
    if (localStorage.getItem('Session') == null) {
      this.router.navigate(["/"]);
    }

    this.getListFinale();
    //this.getClasses();

    this.updateSubscription = interval(1000).subscribe(
      (val) => { this.getClasses() });
  }

}
