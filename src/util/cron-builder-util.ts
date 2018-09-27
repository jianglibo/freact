import CronFieldDescription from "../datashape/cron-builder/cron-field-description";
import { StrUtil } from "./str-util";

function getMaxMin(idx: number): { max: number; min: number } {
  let thisMax: number = 0;
  let thisMin: number = 0;
  switch (idx) {
    case 0:
      thisMax = 59;
      thisMin = 0;
      break;
    case 1:
      thisMax = 59;
      thisMin = 0;
      break;
    case 2:
      thisMax = 23;
      thisMin = 0;
      break;
    case 3:
      thisMax = 31;
      thisMin = 1;
      break;
    case 4:
      thisMax = 12;
      thisMin = 1;
      break;
    case 5:
      thisMax = 7;
      thisMin = 1;
      break;
    case 6:
      thisMax = 2099;
      thisMin = 1970;
  }
  return { max: thisMax, min: thisMin };
}

function parseCronRangeInternal(
  cfv: string,
  idx: number
): { valid: boolean; start?: number; end?: number; allValues?: number[] } {
  const re = /^(\d+)-(\d+)$/;
  const vs = cfv.match(re);
  const { max, min } = getMaxMin(idx);
  if (vs) {
    const thisStart = parseInt(vs[1], 10);
    const thisEnd = parseInt(vs[2], 10);
    const ay: number[] = [];
    if (thisStart > max || thisEnd > max) {
      return { valid: false };
    }
    if (thisStart === thisEnd) {
      ay.push(thisStart);
    } else if (thisStart < thisEnd) {
      for (let i = thisStart; i <= thisEnd; i++) {
        ay.push(i);
      }
    } else {
      for (let i = thisStart; i <= max; i++) {
        ay.push(i);
      }
      for (let i = min; i <= thisEnd; i++) {
        ay.push(i);
      }
    }
    return { valid: true, start: thisStart, end: thisEnd, allValues: ay };
  } else {
    return { valid: false };
  }
}

function parseStepInternal(
  cfv: string,
  idx: number
): { valid: boolean; start?: number; step?: number; allValues?: number[] } {
  if (cfv.startsWith('*/')) {
    cfv = cfv.replace('*/', '0/');
  }
  const re = /^(\d+)\/(\d+)$/;
  const vs = cfv.match(re);
  const { max, min } = getMaxMin(idx);
  if (vs) {
    const thisStart = parseInt(vs[1], 10);
    const thisStep = parseInt(vs[2], 10);
    const ay: number[] = [];
    if (thisStart > max || thisStart < min || thisStep > max) {
      return { valid: false };
    }

    for (let i = thisStart; i <= max; i += thisStep) {
      ay.push(i);
    }
    return { valid: true, start: thisStart, step: thisStep, allValues: ay };
  } else {
    return { valid: false };
  }
}

function getNewFieldStatesInternal(
  origin: boolean[],
  errorField: boolean,
  idx: number
): boolean[] {
  let a: boolean[];
  if (idx >= origin.length) {
    a = new Array(idx + 1 - origin.length);
    a.splice(0, 0, ...origin);
    a[idx] = errorField;
  } else {
    a = origin.slice(0);
    a[idx] = errorField;
  }
  return a;
}

function updateCronFieldInternal(
  idx: number,
  value: string,
  av: string[]
): string[] | undefined {
  if (!value) {
    if (idx === 5) {
      if (av[3] === "?") {
        av[idx] = "*";
      } else {
        av[idx] = "?";
      }
    } else if (idx === 3) {
      if (av[5] === "?") {
        av[idx] = "*";
      } else {
        av[idx] = "?";
      }
    } else {
      av[idx] = "*";
    }
    return av;
  } else if (value === "?") {
    if (idx === 5) {
      if (av[3] === "?") {
        av[idx] = "*";
        return av;
      }
    } else if (idx === 3) {
      if (av[5] === "?") {
        av[idx] = "*";
        return av;
      }
    }
  } else if (value === "*") {
    if (idx === 5) {
      if (av[3] !== "?") {
        av[idx] = "?";
        return av;
      }
    } else if (idx === 3) {
      if (av[5] !== "?") {
        av[idx] = "?";
        return av;
      }
    }
  }
  return undefined;
}

function limitValues(ary: number[] | null | undefined, maxValueNumber: number): string {
  const avs = ary || [];
  const mn = maxValueNumber || 30;
  let st: string;
  if (avs.length > mn) {
    st = avs.slice(0, mn).join(", ") + "......";
  } else {
    st = avs.join(", ");
  }
  return st;
}

/**
 * 在每一{uname}{separator}
 * 在第{values}{uname}{separator}
 */

function getExpandedValuesInternal(
  idx: number,
  fieldDescription: CronFieldDescription,
  currentCronValue: string[],
  maxValueNumber: number,
  allTemplate: string,
  specifiedTemplate: string
): { err: boolean; value: string } {
  const cfv = currentCronValue[idx];
  const iname = fieldDescription.iname;
  const comma = fieldDescription.name === "year" ? "." : ", ";
  if (cfv === "?") {
    return { err: false, value: "" };
  } else if (cfv === "*") {
    return {
      err: false,
      value: StrUtil.format(allTemplate, {
        separator: comma,
        uname: iname
      })
    };
  } else if (cfv.indexOf("-") !== -1) {
    const r = parseCronRangeInternal(cfv, idx);
    if (r.valid) {
      const st = limitValues(r.allValues, maxValueNumber);
      return {
        err: false,
        value: StrUtil.format(specifiedTemplate, {
          separator: comma,
          uname: iname,
          values: st
        })
      };
    } else {
      return { err: true, value: cfv + comma };
    }
  } else if (cfv.indexOf("/") !== -1) {
    const r = parseStepInternal(cfv, idx);
    if (r.valid) {
      const st = limitValues(r.allValues, maxValueNumber);
      return {
        err: false,
        value: StrUtil.format(specifiedTemplate, {
          separator: comma,
          uname: iname,
          values: st
        })
      };
    } else {
      return { err: true, value: cfv + comma };
    }
  } else {
    return {
      err: false,
      value: StrUtil.format(specifiedTemplate, {
        separator: comma,
        uname: iname,
        values: cfv
      })
    };
  }
}

export let CronBuilderUtil = {
  getExpandedValues: getExpandedValuesInternal,
  getNewFieldStates: getNewFieldStatesInternal,
  parseCronRange: parseCronRangeInternal,
  parseCronStep: parseStepInternal,
  updateCronFieldValue: updateCronFieldInternal
};
