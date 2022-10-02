import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cenzor',
  templateUrl: './cenzor.component.html',
  styleUrls: ['./cenzor.component.scss']
})
export class CenzorComponent implements OnInit {
  public word!: string;
  public bad = '';
  public check = 0;
  public borderColor = true;
  public classes = '';
  public classest = '';
  public placeHolder = 'word here...';
  public placeHolderArea = 'text here...';
  public text!: string;
  public prohibited: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  changeColor(color: boolean): void {
    color ? this.classes = 'redBorder' : this.classes = '';
  }
  changeColort(color: boolean): void {
    color ? this.classest = 'redBorder' : this.classest = '';
  }
  addWord(event: Event): void {
    event.preventDefault();
    if (this.word) {
      let newWord = this.word;
      this.check === 0 ? this.bad += newWord : this.bad += ',' + newWord;
      this.check = 1;
      console.log(this.word);
      this.prohibited.push(this.word);

      this.word = '';
      this.changeColor(false);
      this.placeHolder = 'word here...';
    }
    else {
      this.changeColor(true);
      this.placeHolder = 'Please write a word!';
    }

  }
  resetBtn(): void {
    this.word = '';
    this.changeColor(false);
    this.placeHolder = 'word here...';
    this.check = 0;
    this.prohibited.length=0;
    this.text='';
    this.bad='';
  }
  cenzor(e: Event): void {
    e.preventDefault();
    if (!this.text) {
      this.changeColort(true);
      this.placeHolderArea = 'Please write a text!';
    }
    else {
      console.log(this.text);
      let index: number;
      let firstHalf: string = '';
      let secondHalf: string = '';
      let val: string = this.text;
      console.log(val.length);
      let cenzors: string = '';
      console.log(this.prohibited);
      let k:number;
      for (let i = 0; i < this.prohibited.length; i++) {
        for (k = 0; k < val.length; ) {
          index = val.indexOf(this.prohibited[i]);
          console.log(index);

          if (index > -1) {
              console.log('yes2 '+val[(index + this.prohibited[i].length)]);

              firstHalf = val.slice(0, index);
              secondHalf = val.slice(index + this.prohibited[i].length);
              for (let j = 0; j < this.prohibited[i].length; j++) {
                cenzors += '*';
              }
              val = firstHalf + cenzors + secondHalf;
              this.text = val;
              cenzors = '';
              k = index + this.prohibited[i].length;

          }
          else {
            break;
          }
        }
      }
    }
  }
}
