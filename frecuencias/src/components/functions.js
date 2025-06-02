import { mean, median, mode, variance, standardDeviation } from 'simple-statistics';

export function calcSturges(N) {
  return Math.ceil(1 + 3.322 * Math.log10(N));
}

export function buildIntervals(data, K) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Redondeamos K hacia arriba
  K = Math.ceil(K);
  
  // Calculamos y redondeamos la amplitud hacia arriba
  const amplitude = Math.ceil(range / K);

  const intervals = [];

  for (let i = 0; i < K; i++) {
    const Li = min + i * amplitude;
    const Ls = Li + amplitude;
    intervals.push({ Li, Ls, freq: 0 });
  }

  data.forEach(value => {
    for (let interval of intervals) {
      if ((value >= interval.Li && value < interval.Ls) || (value === max && interval === intervals[K - 1])) {
        interval.freq += 1;
        break;
      }
    }
  });

  return intervals;
}

export function enrichIntervals(intervals, data) {
  const N = data.length;
  const mu = mean(data);
  let cumFreq = 0;
  let cumRel = 0;
  let cumPct = 0;

  return intervals.map(interval => {
    const X = (interval.Li + interval.Ls) / 2;
    const f = interval.freq;
    cumFreq += f;
    const rel = f / N;
    cumRel += rel;
    const pct = rel * 100;
    cumPct += pct;
    const dev2 = Math.pow(X - mu, 2);

    return {
      Li: interval.Li,
      Ls: interval.Ls,
      X,
      f,
      cumFreq,
      rel,
      cumRel,
      pct,
      cumPct,
      xf: X * f,
      dev2,
      fDev2: f * dev2
    };
  });
}

export function summaryStats(data) {
  return {
    media: mean(data),
    mediana: median(data),
    moda: mode(data),
    varianza: variance(data),
    sd: standardDeviation(data)
  };
}