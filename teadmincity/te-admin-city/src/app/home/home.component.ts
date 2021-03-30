import { Component, OnInit } from '@angular/core';
import { NewsService } from '../_services/news.service';
import { ReportService } from '../_services/report.service';
import { NewsModel } from '../_models/news-model';
import { ReportModel } from '../_models/report-model';
import { OrderModel } from '../_models/order-model';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news: NewsModel[];
  report: ReportModel;
  optionsChartOne: any;
  optionsChartTwo: any;
  optionsChartThree: any;
  initOpts : any;
  isLoading = true;

  constructor(private apiNews:NewsService, private apiReport:ReportService) { 
    this.news = [];
    this.report = new ReportModel();
    this.report.numberOcorrencyXday = new Map<string, number>();
    this.report.numberOcorrencyXtype = new Map<string, number>();
    this.report.numberOcorrencyXstatusXday = new Map<string,  Map<string, number>>();
    this.report.lastIncomes = [];
    this.report.lastUpdates = [];
  }

  ngOnInit(): void {
    this.getAllNews();
    this.getAllReport();
  }

  getAllNews(){
    this.apiNews.GetAll()
    .subscribe({
      next: (data:any) => {
        this.news = data.news;
      },
      error: error => {
          console.error(error);
      },
    });
  }

  getAllReport(){
    this.apiReport.GetAll()
    .subscribe({
      next: (data:any) => {
        this.report = data;
        this.createChartOne();
        this.createChartTwo();
        this.createChartThree();
      },
      error: error => {
          console.error(error);
      },
    });
  }

  createChartOne(){
    let dataAxis = Object.keys(this.report.numberOcorrencyXday);
    let data = Object.values(this.report.numberOcorrencyXday);
    let yMax = 5;
    const dataShadow = [];
    
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.optionsChartOne = {
      title: {
        text: 'Date x Ocorrency',
      },
      xAxis: {
        data: dataAxis,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          show: true,
        },
        z: 5,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            }
          },
          data,
        },
      ],
    };
  }

  createChartTwo(){
    this.initOpts = {
      renderer: 'svg',
      width: 400,
      height: 400
    };
  
    this.optionsChartTwo = {
      title: {
        text: 'Order x Ocorrency',
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(this.report.numberOcorrencyXtype),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: Object.values(this.report.numberOcorrencyXtype)
      }]
    };
  }
  
  createChartThree()
  {
    let values = Object.values(this.report.numberOcorrencyXstatusXday);
    let open = [];
    let inExecution = [];
    let inAnalisys = [];
    let done = [];
    let cancel = [];
    
    for (let index = 0; index < values.length; index++) {
      let element = values[index]; 

      if(Object.keys(element).find(c => c == "done") == null)
        done.push(0);
      if(Object.keys(element).find(c => c == "open") == null)
        open.push(0);
      if(Object.keys(element).find(c => c == "cancelled") == null)
        cancel.push(0);
      if(Object.keys(element).find(c => c == "in execution") == null)
        inExecution.push(0);
      if(Object.keys(element).find(c => c == "in analisys") == null)
        inAnalisys.push(0);
      
      for (let index2 = 0; index2 < Object.keys(element).length; index2++) {
        let element2 = Object.keys(element)
        let element3 = Object.values(element)
        if(element2[index2] == "done")
          done.push(element3[index2]);  
        if(element2[index2] == "open")
          open.push(element3[index2]);  
        if(element2[index2] == "cancelled")
          cancel.push(element3[index2]);  
        if(element2[index2] == "in execution")
          inExecution.push(element3[index2]);  
        if(element2[index2] == "in analisys")
          inAnalisys.push(element3[index2]);
      }       
    }
    
    this.isLoading = false;
    this.optionsChartThree = {
      title: {
        text: 'Date x Order x Ocorrency',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(this.report.numberOcorrencyXstatusXday)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Open',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: open
        },
        {
          name: 'In analisys',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: inAnalisys
        },
        {
          name: 'In execution',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: inExecution
        },
        {
          name: 'Done',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: done
        },
        {
          name: 'Canceled',
          type: 'line',
          stack: 'counts',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: cancel
        }
      ]
    };
  }
}
