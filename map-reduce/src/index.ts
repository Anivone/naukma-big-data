import { Matrix, generateMatrix, printMatrix } from "./matrix";

type MapperKey = `${number},${number}`;
type MapperValue = [string, number, number];
type MapperResult = Record<MapperKey, MapperValue[]>;

const map = (a: Matrix, b: Matrix): [MapperResult, MapperResult] => {
  if (a.length !== b[0].length)
    throw new Error("Matrix A and B are not compatible for multiplication");
  const [cRows, cCols] = [a.length, b[0].length];

  const mapperA: MapperResult = {};
  const mapperB: MapperResult = {};

  for (let k = 0; k < cCols; k++) {
    for (let i = 0; i < cRows; i++) {
      for (let j = 0; j < a[0].length; j++) {
        const key: MapperKey = `${i},${k}`;
        const value: MapperValue = ["A", j, a[i][j]];

        if (mapperA[key]) {
          mapperA[key].push(value);
        } else {
          mapperA[key] = [value];
        }
      }
    }
  }

  for (let i = 0; i < cRows; i++) {
    for (let j = 0; j < a[0].length; j++) {
      for (let k = 0; k < cCols; k++) {
        const key: MapperKey = `${i},${k}`;
        const value: MapperValue = ["B", j, b[j][k]];

        if (mapperB[key]) {
          mapperB[key].push(value);
        } else {
          mapperB[key] = [value];
        }
      }
    }
  }

  return [mapperA, mapperB];
};

const reduce = (mapping: [MapperResult, MapperResult]) => {
  const [mappingA, mappingB] = mapping;
  const keys = Object.keys(mappingA) as MapperKey[];
  const reduceResult: Record<MapperKey, number> = {};

  keys.forEach((key) => {
    const multiplied: number[] = [];
    mappingA[key].forEach(([_, aj, aValue]) => {
      mappingB[key].forEach(([_, bj, bValue]) => {
        if (aj === bj) {
          multiplied.push(aValue * bValue);
        }
      });
    });
    reduceResult[key] = multiplied.reduce((acc, cur) => acc + cur, 0);
  });

  return reduceResult;
};

const combine = (reduceResult: Record<MapperKey, number>) => {
  const result: Matrix = [];

  Object.keys(reduceResult).forEach((key) => {
    const [i, j] = key.split(",").map((n) => parseInt(n));
    if (!result[i]) {
      result[i] = [];
    }
    result[i][j] = reduceResult[key as MapperKey];
  });

  return result;
};

const multiply = (a: Matrix, b: Matrix): Matrix => {
  printMatrix(a, "A");
  console.log("\n\tx\n");
  printMatrix(b, "B");

  const [mappingA, mappingB] = map(a, b);
  const reduceResult = reduce([mappingA, mappingB]);
  const result = combine(reduceResult);

  console.log("\n\t=\n");
  printMatrix(result, "C");

  return result;
};

multiply(generateMatrix(3, 2), generateMatrix(2, 3));
