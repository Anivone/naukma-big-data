export type Matrix = number[][];

export const generateMatrix = (
  width: number = 2,
  height: number = 2
): Matrix => {
  const matrix: Matrix = [];
  for (let i = 0; i < height; i++) {
    matrix.push([]);
    for (let j = 0; j < width; j++) {
      matrix[i].push(Math.floor(Math.random() * 20) + 1);
    }
  }
  return matrix;
};

export const printMatrix = (matrix: Matrix, matrixName?: string) => {
  const output: string[] = [];

  if (matrixName) {
    output.push(`Matrix ${matrixName}:`);
  }
  matrix.forEach((row) => {
    output.push(row.join("\t"));
  });

  console.log(output.join("\n"));
};
