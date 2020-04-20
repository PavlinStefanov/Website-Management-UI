
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  public reportedError: boolean;
  public errorPercentage: number = 0;
  public timer;
 
  constructor() { }
 
  ngOnInit() {
  }
 
  public checkChanged = (event) => {
    this.reportedError = event.checked;
 
    this.reportedError ? this.startTimer() : this.stopTimer();
  }
 
  private startTimer = () => {
    this.timer = setInterval(() => {
      this.errorPercentage += 1;
 
      if (this.errorPercentage === 100) {
        clearInterval(this.timer);
      }
    }, 30);
  }
 
  private stopTimer = () => {
    clearInterval(this.timer);
    this.errorPercentage = 0;
  }
 
}