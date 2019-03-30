import { Gene } from './Gene';
import { Blueprint } from './Blueprint';

export class Chromosome {
  private genes: Gene[];
  private constants: Gene[];
  private fitness: number;
  constructor(blueprint: Blueprint | null = null) {
    this.genes = [];
    this.constants = [];
    this.fitness = 0;

    if (blueprint) {
      this.initializeGenes(blueprint);
    }
  }

  initializeGenes(blueprint: Blueprint) {
    const properties = blueprint.getProperties();
    properties.map((property: number) => {
      const gene = new Gene(property);
      this.genes.push(gene);
    });

    const constants = blueprint.getConstants();
    constants.map((constant: number) => {
      const gene = new Gene(constant);
      this.constants.push(gene);
    });
  }

  computeFitness(fitnessCalculation: any) {
    this.fitness = fitnessCalculation(this.genes, this.constants);
  }

  static fromDNA(genes: Gene[], constants: Gene[]) {
    const chromosome = new Chromosome();
    chromosome.genes = [];
    chromosome.constants = [];
    genes.map((gene: Gene) => {
      const geneClone = Chromosome.copyGene(gene);
      chromosome.genes.push(geneClone);
    });
    constants.map((constant: Gene) => {
      const constantClone = Chromosome.copyGene(constant);
      chromosome.constants.push(constantClone);
    });
    return chromosome;
  }

  static copyGene(gene: Gene): Gene {
    // @ts-ignore
    return Object.assign(Object.create(Object.getPrototypeOf(gene)), gene);
  }

  mutate() {
    const pivot = Math.floor(Math.random() * this.genes.length);
    this.genes[pivot].mutate();
  }

  getFitness() {
    return this.fitness;
  }

  getLength() {
    return this.genes.length;
  }

  getGenes() {
    return this.genes;
  }

  getConstants() {
    return this.constants;
  }
}
