import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DriversService } from '../../services/drivers.service';
import { driverModel } from '../../models/driver.model';
import { paginationModel } from '../../models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import Swal from 'sweetalert2';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ErrorsService } from '../../services/errors.service';
import { ObservablesService } from '../../services/observables.service';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/settings/services/rutas.service';
import { rutaModel } from 'src/app/settings/models/ruta.model';
import { AlertsService } from 'src/app/global/services/alerts.service';

interface querys {
  ruta?: string;
  status?: string;
  codigo?: string;
}

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})

export class DriversComponent implements OnInit,OnDestroy {

  rutasArray:rutaModel[]=[];
  authorizationError:boolean=false;
  serverError:boolean=false;

  authorizationSuscription?:Subscription;
  serverSuscription?:Subscription;

  arrayDriversExcel: driverModel[] = [];
  showSpinner: boolean = false;
  //-----Properties of pagination------//
  //pagina actual
  currentPage: number = 1;
  //elementos a mostrar por pagina
  itemsPerPage: number = 10;
  //ultima pagina
  lastPage = 0;
  //objeto que muestra los numeros en la paginacion
  visiblePageNumbers: number[] = [];
  //contiene las propiedades de la paginacion
  response: paginationModel = {} as paginationModel;
  paginatorHelper: any = [];
  //----------------------------------//

  //-----Properties of querys------//
  //verifica si hay parametros
  isThereParams: boolean = false;
  //objeto que almacena los querys y los envia a la url
  objectTest: querys = {} as querys;
  //verifica si hay querys y almacena sus valores
  checkQuerysObject: querys = {} as querys;
  //esta enlazado a los filtros
  filtersObject: querys = {} as querys;
  //buscar por nombre
  searchValue: string = '';
  //----------------------------------//

  //contiene el listado de choferes
  drivers: driverModel[] = [];
  //mostrar alerta de error
  getErro: boolean = false;

  constructor(
    private driverService: DriversService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileSaver: FileSaverService,
    public sesionService:SesionService,
    private errors:ErrorsService,
    private observables:ObservablesService,
    private rutasService:RutasService,
    private alerts:AlertsService
  ) {}

  rol = this.sesionService.verifyRol();


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isThereParams = Object.keys(params).length > 0;
    });

    if (this.isThereParams) {
      this.obtainDriversGetQuery();
    } else {
      this.obtainDriversGet();
    }
    
    this.filtersObject.status = 'todos';
    this.saveQuerys();
    this.errorsInit();
    this.obtainRoutes();
  }

  ngOnDestroy(): void {
  this.serverSuscription?.unsubscribe();
  this.authorizationSuscription?.unsubscribe();
  }
  

  errorsInit(){
  this.authorizationSuscription = this.observables.isAuthorizated$.subscribe(authorization => {
  this.authorizationError = authorization;
  }
  )
  
  this.serverSuscription = this.observables.serverError$.subscribe(error => {
  this.serverError = error;  
  })
  }

  exportExcel() {
    const suscription = this.driverService.obtainDriversExcel().subscribe(
      (res) => {
        const array: driverModel[] = res.docs;
        console.log(array)

        const newArray = array.map(
          ({
            nombre,
            paterno,
            materno,
            codigo,
            status,
            fecha_ingreso,
            licencia,
            tipo_licencia,
            edad,
            sexo,
            domicilio,
            telefono,
            fecha_baja,
            ruta,
            ruta_
          }) => {

            let nombreRuta='';

            if(ruta){
            nombreRuta=ruta.nombre;
            }else{
            nombreRuta=ruta_
            }

            return {
              nombre,
              paterno,
              materno,
              codigo,
              status,
              fecha_ingreso,
              licencia,
              tipo_licencia,
              edad,
              sexo,
              domicilio,
              telefono,
              fecha_baja,
              ruta:nombreRuta
            };
          }
        );

        const EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';

        const worksheet = XLSX.utils.json_to_sheet(newArray);
        const workbook = {
          Sheets: {
            ExcelTest: worksheet,
          },
          SheetNames: ['ExcelTest'],
        };

        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
        this.fileSaver.save(blobData, 'ExcelFile');
        suscription.unsubscribe();
      },
      (err) => {
        this.errors.checkError(err);
      }
    );
  }

  obtainRoutes(){
  this.rutasService.obtainRutas().subscribe( rutas => {
  rutas.unshift({
    _id:'no_id',
    nombre:'no aplicado',
    status:'activo'
  })    
  this.rutasArray = rutas;  
  this.filtersObject.ruta=this.rutasArray[0]._id;
  },err => {
    this.alerts.customizedError('No se pudieron obtener las rutas!!')
  })  
  }
  //-----Methods of pagination------//
  //cambiar el numero de elementos por pagina
  onOptionSelected(event: any) {
    this.currentPage = 1;

    if (this.isThereParams) {
      this.obtainDriversGetQuery();
    } else {
      this.obtainDriversGet();
    }
  }

  //extraer propiedades relacionadas a la paginacion
  extractResponseProperties(response: any) {
    this.response.totalDocs = response.totalDocs;
    this.response.limit = response.limit;
    this.response.totalPages = response.totalPages;
    this.response.page = response.page;
    this.response.pagingCounter = response.pagingCounter;
    this.response.hasPrevPage = response.hasPrevPage;
    this.response.hasNextPage = response.hasNextPage;
    this.response.prevPage = response.prevPage;
    this.response.nextPage = response.nextPage;
    //el arreglo que muestra los numeros debe ser creado en cuanto
    //se tengan las propiedades de la paginacion
    this.obtainPagesPaginator();
  }

  //obtiene las paginas visibles (visiblePageNumbers)
  obtainPagesPaginator() {
    const totalPages = this.response.totalPages;
    const currentPage = this.currentPage;

    //tamaño de los grupos de numeros que se mostraran
    const groupSize = 5;
    const groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize;
    const groupEnd = Math.min(groupStart + groupSize, totalPages);

    this.visiblePageNumbers = Array.from(
      { length: groupEnd - groupStart },
      (_, i) => groupStart + i + 1
    );
  }

  //navegar a una pagina, recibe el numero del arreglo
  navigateToPage(page: number) {
    this.currentPage = page;

    if (this.isThereParams) {
      this.obtainDriversGetQuery();
    } else {
      this.obtainDriversGet();
    }
  }
  //----------------------------------//

  //-----Methods of querys------------//
  //filter by state
  onlyState(event: any) {
    delete this.checkQuerysObject.codigo;
    delete this.checkQuerysObject.ruta;
    let state = event.target.value;
    this.itemsPerPage = 10;

    if (this.objectTest.codigo) {
      delete this.objectTest.codigo;
      this.searchValue = '';
    }

    if (this.objectTest.ruta) {
      delete this.objectTest.ruta;
      this.filtersObject.ruta = this.rutasArray[0]._id;
    }

    if (state !== 'todos') {
      this.objectTest.status = state;
      this.router.navigate(['/admin/choferes/all'], {
        queryParams: this.objectTest,
      });

      this.currentPage = 1;
      this.obtainDriversGetQuery();
    } else {
      if (this.checkQuerysObject.codigo) {
        delete this.checkQuerysObject.codigo;
      }

      if (this.checkQuerysObject.status) {
        delete this.checkQuerysObject.status;
      }

      if (this.checkQuerysObject.ruta) {
        delete this.checkQuerysObject.ruta;
      }

      this.currentPage = 1;
      this.router.navigate(['/admin/choferes/all']);
      this.obtainDriversGet();
    }
  }

  onlyRoute(event:any){
    delete this.checkQuerysObject.codigo;
    delete this.checkQuerysObject.status;
    this.searchValue = '';
    
    let route = event.target.value;
    this.itemsPerPage = 10;
    
    if (this.objectTest.codigo) {
      delete this.objectTest.codigo;
    }

    if (this.objectTest.status) {
      delete this.objectTest.status;
      this.filtersObject.status = 'todos';
      // this.searchValue='';
    }

    if(route !== 'no_id'){
      this.objectTest.ruta = route;
        this.router.navigate(['/admin/choferes/all'], {
          queryParams: this.objectTest,
        });
  
        this.currentPage = 1;
        this.obtainDriversGetQuery();
    }else{
      if (this.checkQuerysObject.codigo) {
        delete this.checkQuerysObject.codigo;
      }

      if (this.checkQuerysObject.status) {
        delete this.checkQuerysObject.status;
      }

      if (this.checkQuerysObject.ruta) {
        delete this.checkQuerysObject.ruta;
      }

      this.currentPage = 1;
      this.router.navigate(['/admin/choferes/all']);
      this.obtainDriversGet(); 
    }

  }

  //input de busqueda
  sendSearch() {
    delete this.checkQuerysObject.status;
    delete this.checkQuerysObject.ruta;
    this.itemsPerPage = 10;

    if (this.objectTest.status) {
      delete this.objectTest.status;
      this.filtersObject.status = 'todos';
      // this.searchValue='';
    }

    if (this.objectTest.ruta) {
      delete this.objectTest.ruta;
      this.filtersObject.ruta=this.rutasArray[0]._id;
      // this.searchValue='';
    }

    const nombre = `RS${this.searchValue}`;
    this.objectTest.codigo = nombre;

    this.router.navigate(['/admin/choferes/all'], {
      queryParams: this.objectTest,
    });

    this.currentPage = 1;
    this.obtainDriversGetQuery();
  }

  //limpiar filtros
  cleanFilters() {
    this.router.navigate(['/admin/choferes/all']);
    this.filtersObject.status = 'todos';
    this.filtersObject.ruta = this.rutasArray[0]._id;
    this.getErro = false;

    if (this.checkQuerysObject.codigo) {
      delete this.checkQuerysObject.codigo;
    }

    if (this.checkQuerysObject.status) {
      delete this.checkQuerysObject.status;
    }

    if (this.checkQuerysObject.ruta) {
      delete this.checkQuerysObject.ruta;
    }

    this.searchValue = '';
    this.itemsPerPage = 10;
    this.obtainDriversGet();
  }

  //check and save querys
  saveQuerys() {
    this.activatedRoute.queryParams.subscribe((querys) => {
      if (querys['codigo']) {
        this.checkQuerysObject.codigo = querys['codigo'];
        this.searchValue = querys['codigo'];
      }
      if (querys['status']) {
        this.checkQuerysObject.status = querys['status'];
        this.filtersObject.status = querys['status'];
      }

      if (querys['ruta']) {
        this.checkQuerysObject.ruta = querys['ruta'];
        this.filtersObject.ruta = querys['ruta'];
      }
    });
  }

  //----------------------------------//

  //-----Methods of "ObtainDrivers"------------/
  //obtener drivers without querys
  obtainDriversGet() {
    this.showSpinner = true;
    this.driverService
      .obtainDrivers(this.currentPage, this.itemsPerPage)
      .subscribe(
        (res) => {
          if (res.docs.length === 0) this.getErro = true;
          this.drivers = res.docs;
          this.extractResponseProperties(res);
          this.serverError=false;
          this.authorizationError=false;
          this.showSpinner = false;
        },
        (err) => {
          this.showSpinner=false;
          this.errors.checkError(err);
        }
      );
  }
  //obtain drivers with querys
  obtainDriversGetQuery() {
    this.showSpinner = true;
    this.driverService
      .obtainDriversQuerys(this.currentPage, this.itemsPerPage)
      .subscribe(
        (res) => {
          if (res.docs.length === 0) this.getErro = true;
          this.drivers = res.docs;
          this.extractResponseProperties(res);
          this.showSpinner = false;
        },
        (err) => {
        this.showSpinner=false;
        this.errors.checkError(err);
        }
      );
  }
  //----------------------------------//

  /* TEST*/

  nextPage() {
    if (!this.response.hasNextPage) return;
    this.currentPage++;
    this.obtainDriversGet();
  }

  previousPage() {
    if (!this.response.hasPrevPage) return;
    this.currentPage--;
    this.obtainDriversGet();
  }

  obtainrouteName(id:any){
    const routeObject = this.rutasArray.find(route => route._id === id);
    return routeObject ? routeObject.nombre : '';
    }


}
