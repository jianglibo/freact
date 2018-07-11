export default class QuartzExpression {
  public explain: string;
  public errors: string[] = [];
  constructor(public expression: string) {
    this.parseExpression();
  }

  private parseExpression(): void {
    const v = this.expression.trim();
    const segs = v.split(/\s+/);

    if (segs.length === 7) {
        this.expression = v;
    }
    if (segs.length !== 7) {
      this.errors.push("表达式由7个空格分隔的字段租成！");
    } else {
        if ((segs[3] === '?' && segs[5] === '?') || (segs[3] !== '?' && segs[5] !== '?')) {
            this.errors.push("第几日和星期几必须而且只能有一个是?，意味着忽略这个字段值。");
        }
      segs.forEach((fv, idx) => {
          switch (idx) {
              case 0:
                  this.checkRange(fv, '秒', idx, 0, 59);
                  break;
              case 1:
                  this.checkRange(fv, '分', idx, 0, 59);
                  break;
              case 2:
                  this.checkRange(fv, '时', idx, 0, 23);
                  break;
              case 3:
                  this.checkRange(fv, '日', idx, 1, 31);
                  break;
              case 4:
                  this.checkRange(fv, '月', idx, 1, 12); // JAN-DEC
                  break
              case 5:
                  this.checkRange(fv, '星期', idx, 1, 7); // SUN-SAT
                  break;
              case 6:
                  this.checkRange(fv, '年', idx, 1970, 2099);
                  break;
              default:
                  break;
          }
      });
    }
  }

  private allDigits(fv: string): boolean {
    return /^\d+$/.test(fv);
  }

  private isRange(fv: string): boolean {
      return /^\d+-\d+/.test(fv);
  }

  private isCommaList(fv: string): boolean {
      return /^\d+(,\d+)*$/.test(fv);
  }

  private isIncreasement(fv: string): boolean {
      return /^\d+\/\d+/.test(fv);
  }

  private isDigitValid(fv: string, fn: string, start: number, end: number): void {
        const d = parseInt(fv, 10);
        if (d < start) {
            this.errors.push(`${fn}的值不能小于${start}`);
        } else if (d > end) {
            this.errors.push(`${fn}的值不能大于${end}`);
        }
  }

  private isRangeValid(v1: string, v2: string, fn: string) {
      const d1 = parseInt(v1, 10);
      const d2 = parseInt(v2, 10);
      if (d1 >= d2) {
          this.errors.push(`${fn}字段的范围不能${d1}大于${d2}。`);
      }
  }

  private checkRange(fv: string, fn: string, fidx: number, start: number, end: number): void {
    fv = fv.toUpperCase();
    if (this.allDigits(fv)) {
        this.isDigitValid(fv, fn, start, end);
    } else if (this.isRange(fv)) {
        const v2 = fv.split('-');
        this.isDigitValid(v2[0], fn, start, end);
        this.isDigitValid(v2[1], fn, start, end);
        this.isRangeValid(v2[0], v2[1], fn);
    } else if (this.isCommaList(fv)) {
        fv.split(",").forEach(v => {
            this.isDigitValid(v, fn, start, end);
        });
    } else if (this.isIncreasement(fv)) {
        const v2 = fv.split('/');
        this.isDigitValid(v2[0], fn, start, end);
        this.isDigitValid(v2[1], fn, start, end);
        this.isRangeValid(v2[0], v2[1], fn);
    } else {
        if (fv === "L") {
            console.log("L");
        }
    }
  }
}
