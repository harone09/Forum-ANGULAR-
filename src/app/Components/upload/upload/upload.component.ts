import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from 'src/app/services/Upload/upload.service';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Classe } from 'src/app/Models/Classe';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { PublicationsService } from 'src/app/services/Publications/Publications.service';
import { Publication } from 'src/app/Models/Publication';
import { DatePipe } from '@angular/common';
import { Uploadedfile } from 'src/app/Models/Uploadedfile';
import { User } from 'src/app/Models/User';
import { ListefinalService } from 'src/app/services/Listefinal/listefinal.service';
import { Listefinal } from 'src/app/Models/Listefinal';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  classes: Classe[];
  //providers: [DatePipe];

  @Output() public onUploadFinished = new EventEmitter();
  ///////////////////

  constructor(private LFS: ListefinalService, public datepipe: DatePipe, private publicationsService: PublicationsService,
    private classeService: ClasseService, private http: HttpClient, private uploadService: UploadService) { }

  ///////////////////////


  listeFinale: Listefinal[] = [];
  getListFinale() {
    this.LFS.getLF().subscribe(liste => {
      this.listeFinale = liste;
      this.getClasses();
    });
  }
  filteredClasse: Classe[] = [];
  getClasses() {
    this.filteredClasse = [];

    if (this.me.role == "Professor") {
      this.classeService.getClasses().subscribe(classes => {
        this.classes = classes.filter(n => n.idProf == this.me.id);
        this.filteredClasse = this.classes;
      });



    } else {
      this.classeService.getClasses().subscribe(classes => {
        this.classes = classes;
        for (const lst of this.listeFinale) {
          for (const cls of this.classes) {

            if (lst.ide == this.me.id && lst.idc == cls.id && !this.filteredClasse.find(n => n.id == cls.id)) {
              this.filteredClasse.push(cls);
            }

          }

        }
      });


    }
  }
  ////////////////////////////

  ngOnInit(): void {
    this.me = JSON.parse(localStorage.getItem('Session'));
    this.getListFinale();
    //this.getClasses();


  }

  ///////////////////////////

  filesToUpload: File[] = [];
  fileToUpload: File[] = [];
  pub: Publication;
  me: User;
  fileNames: string[] = [];
  fileObject: Uploadedfile;

  /////////////////////////////////

  public Publish = (clsId, content) => {
    this.pub = {
      id: 0,
      contenus: content,
      date: new Date(),
      idClasse: Number.parseInt(clsId.trim()),
      idUser: this.me.id
    };
    console.log(this.pub);
    this.publicationsService.addPublication(this.pub).subscribe(
      n => {
        console.log("thisis before sending file");

        for (const i of this.fileNames) {
          this.fileObject = { id: 0, path: i, date: new Date(), idPublication: n.id, idUser: n.idUser };
          console.log(this.fileObject);
          this.uploadService.addfiles(this.fileObject).subscribe(m => {
            console.log("thisis file add error");
            console.log(m);
          });
        }
        console.log("thisis after sending file");

      }
    );
    this.filesToUpload = [];

  }
  ////////////////////
  public selectFile = (files) => {
    if (files.length === 0) {
      return;
    }
    for (const it of files) {
      this.filesToUpload.push(it);
    }
  }
  //////////////////////
  public removeFile = (file) => {
    if (file.length === 0) {
      return;
    }

    this.filesToUpload = this.filesToUpload.filter(i => i.name != file.name);

  }
  /////////////////////////

  public uploadFiles = () => {
    if (this.filesToUpload.length === 0) {
      return;
    }
    let nowd = new Date();
    let dtt = this.datepipe.transform(nowd, 'MM-dd-yyyyTHH-mm-ss');
    const formData = new FormData();

    Array.from(this.filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, dtt + "_" + file.name);
    });

    this.uploadService.upload(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        console.log(event.body);
        //this.fileNames = event.body;

        /*  this.onUploadFinished.forEach(m => {
            this.fileNames.push(m);
          });*/
        console.log(this.fileNames);
      }
    });
  }
  ////////////////////////////
  public uploadFile = (file) => {

    const formData = new FormData();
    this.fileToUpload.push(file);
    let nowd = new Date();
    let dtt = this.datepipe.transform(nowd, 'MM-dd-yyyyTHH-mm-ss');
    Array.from(this.fileToUpload).map((file, index) => {
      return formData.append('file' + index, file, dtt + "_" + file.name);
    });

    this.uploadService.upload(formData).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        //console.log(event.body);
        /*this.onUploadFinished.forEach(m => {
          this.fileNames.push(m);
        });*/
        this.fileNames = event.body;

        console.log(this.fileNames);

      }
    });
  }
  /////////////////////////////////////


}