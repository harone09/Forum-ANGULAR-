import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Publication } from "../../Models/Publication";
import { PublicationsService } from "../../services/Publications/Publications.service";
import { User } from "../../Models/User";
import { Comment } from "../../Models/Comment";
import { Publication_Users } from "../../Models/Publication_Users";
import { UserService } from "../../services/User/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from "../../Models/Classe";
import { ClasseService } from "../../services/classe/classe.service";
import { CommentsService } from 'src/app/services/Comments/comments.service';
import { Uploadedfile } from 'src/app/Models/Uploadedfile';
import { UploadService } from 'src/app/services/Upload/upload.service';
import { saveAs } from "file-saver";
import { ListefinalService } from 'src/app/services/Listefinal/listefinal.service';
import { Listefinal } from 'src/app/Models/Listefinal';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  public response: { dbPath: '' };
  publications: Publication[];
  Users: User[];
  classes: Classe[];
  comments: Comment[];
  listeFiles: Uploadedfile[];
  cmt: Comment;
  me: User;
  private updateSubscription: Subscription;


  /////////////////////////////////////////////////

  constructor(private router: Router, private route: ActivatedRoute, private LFS: ListefinalService,
    private publicationsService: PublicationsService, private UserService: UserService,
    private classeService: ClasseService, private commentsService: CommentsService, private uploadService: UploadService) { }

  //////////////////////////

  addComment(idP: number, cnt: string): void {
    /*let cmt: Comment = { id: 1, date: new Date(), idPublicaion: 1, idUser: 1, contenus: "first comment" };
  };*/
    if (!cnt) { return; }
    this.cmt = { id: 1, date: new Date(), idPublication: idP, idUser: this.me.id, contenus: cnt.trim() };

    this.commentsService.addComment(this.cmt).subscribe(cmnt => {
      this.getComments();
    });
  }

  /////////////////////////////////////

  getPublications(id: number) {

    this.publicationsService.getPublications(id).subscribe(publications =>
      this.publications = publications.sort((a, b) => (a.date < b.date) ? 1 : -1));
    this.UserService.getUsers().subscribe(Users => {
      this.Users = Users;

    });
    console.log("bli");
  }

  //////////////////////////////

  getComments() {

    this.commentsService.getComments().subscribe(comments => this.comments = comments);

  }

  //////////////////////////////////////////

  getClasses() {
    this.classeService.getClasses().subscribe(classes => {
      this.classes = classes;
      console.log(classes);
    });


  }

  /////////////////////////////////////////////////

  getFiles() {
    this.uploadService.getfiles().subscribe(listeFiles => {
      this.listeFiles = listeFiles;
      /*console.log("file split :");
      console.log(this.listeFiles.find(n => n.id == 1).path.split("_")[1]);*/
    });

  }

  /////////////////////////////////////////////


  ngOnInit(): void {
    if (localStorage.getItem('Session') == null) {
      this.router.navigate(["/"]);
    }

    this.route.params.subscribe(routeParams => {
      this.filteredPub = [];
      this.getPublications(routeParams.id);
      this.getListFinale();

      console.log(routeParams.id);
    });
    this.getClasses();
    this.getComments();
    this.getFiles();
    this.getListFinale();
    this.editAttr = true;

    console.log(this.router.url);

    console.log(window.location.href);
    this.me = JSON.parse(localStorage.getItem('Session'));

    this.updateSubscription = interval(1000).subscribe(
      (val) => {
        this.route.params.subscribe(routeParams => {
          this.getPublications(routeParams.id);
          this.getListFinale();
          this.getFiles();
          console.log(routeParams.id);
        });
      });

  }

  ////////////////////////////////////////////////

  public deletePublication = (pub) => {
    this.publicationsService.deletePublication(pub).subscribe(n => {
      this.route.params.subscribe(routeParams => {
        this.getPublications(routeParams.id);
        this.getListFinale();

        console.log(routeParams.id);
      });
    });

    this.route.params.subscribe(routeParams => {
      this.filteredPub = [];
      this.getPublications(routeParams.id);
      this.getListFinale();


      console.log(routeParams.id);
    });
  }

  ///////////////////////////////////////////////



  public deleteComment = (cmt) => {

    this.commentsService.deleteComment(cmt).subscribe(n => {
      this.getComments();
    });
  }
  ///////////////////////////////////////////////

  editAttr: boolean;

  public editComment = (cmt) => {
    if (this.editAttr == true) {
      this.editAttr = false;
    }
    else if (this.editAttr == false) {


      this.editAttr = true;
      this.commentsService.editComment(cmt).subscribe(n => {
        this.getComments();
      });
    }


  }

  ///////////////////////////////////////////////////////////////

  downLoadFiles = (file: Uploadedfile) => {

    this.uploadService.downloadFile(file)
      .subscribe(
        success => {
          saveAs(success, file.path.split("_")[1]);
        },
        err => {
          alert("Server error while downloading file.");
        }
      );
  }
  ///////////////////////////////////////////////////

  checkRole(idd: number): boolean {
    if (this.me.role == "Professor") {
      return true;
    }
    else {

      if (this.filteredPub.find(n => n.id == idd).idUser == this.me.id)
        return true;


    }




    return false;

  }

  /////////////////////////////////////////////////////////////////

  listeFinale: Listefinal[] = [];
  getListFinale() {

    this.LFS.getLF().subscribe(liste => {
      this.listeFinale = liste;
      this.filterPublications();
    });
  }

  filteredPub: Publication[] = [];
  filterPublications() {
    this.filteredPub = [];
    if (this.me.role == "Student") {
      for (const lst of this.listeFinale) {
        for (const cls of this.classes) {
          for (const pub of this.publications) {

            if (this.me.id == lst.ide && cls.id == lst.idc && cls.id == pub.idClasse && !this.filteredPub.find(n => n.id == pub.id)) {
              this.filteredPub.push(pub);
            }

          }
        }
      }
    }
    else {

      for (const cls of this.classes) {
        for (const pub of this.publications) {

          if (this.me.id == cls.idProf && cls.id == pub.idClasse) {
            this.filteredPub.push(pub);
          }

        }
      }
    }
    this.filteredPub.sort((a, b) => (a.date < b.date) ? 1 : -1);
  }

}
