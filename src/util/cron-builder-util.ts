import CronFieldDescription from "../datashape/cron-builder/cron-field-description";
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
  const re = /^(\d+)\/(\d+)$/;
  const vs = cfv.match(re);
  const { max } = getMaxMin(idx);
  if (vs) {
    const thisStart = parseInt(vs[1], 10);
    const thisStep = parseInt(vs[2], 10);
    const ay: number[] = [];
    if (thisStart > max || thisStep > max) {
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

/**
 * 在每一{uname}{separator}
 * 在第{values}{uname}{separator}
 */

function getExpandedValuesInternal(
  idx: number,
  fieldDescription: CronFieldDescription,
  currentCronValue: string[]
): { err: boolean; value: string } {
  const cfv = currentCronValue[idx];
  const iname = fieldDescription.iname;
  const comma = fieldDescription.name === "year" ? "." : ", ";
  if (cfv === "?") {
    return { err: false, value: "" };
  } else if (cfv === "*") {
    return { err: false, value: `在每${iname}${comma}` };
  } else if (cfv.indexOf("-") !== -1) {
    console.log(cfv);
    const be = cfv.split("-");
    console.log(be.length);
    if (be.length === 2) {
      const begin: number = parseInt(be[0], 10);
      const end: number = parseInt(be[1], 10);
      const ay: number[] = [];
      console.log(end);
      for (let i = begin; i <= end; i++) {
        ay.push(i);
      }
      const st = ay.join(", ");
      return { err: false, value: `在第${st}${iname}${comma}` };
    } else {
      console.log(cfv);
      return { err: true, value: cfv };
    }
  } else if (cfv.indexOf("/") !== -1) {
    const be = cfv.split("/");
    if (be.length === 2) {
      const begin: number = parseInt(be[0], 10);
      const step: number = parseInt(be[1], 10);
      const ay: number[] = [];
      switch (idx) {
        case 0:
          for (let i = begin; i < 60; i += step) {
            ay.push(i);
          }
          break;
        case 1:
          for (let i = begin; i < 60; i += step) {
            ay.push(i);
          }
          break;
        case 2:
          for (let i = begin; i < 24; i += step) {
            ay.push(i);
          }
          break;
        default:
          break;
      }
      const st = ay.join(", ");
      return { err: false, value: `在第${st}${iname}${comma}` };
    } else {
      return { err: true, value: cfv };
    }
  } else {
    return { err: false, value: `在第${cfv}${iname}${comma}` };
  }
}

export let CronBuilderUtil = {
  getExpandedValues: getExpandedValuesInternal,
  parseCronRange: parseCronRangeInternal,
  parseCronStep: parseStepInternal,
  updateCronFieldValue: updateCronFieldInternal
};
