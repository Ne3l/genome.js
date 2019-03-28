import { Population } from './core/Population';
import { Blueprint } from './core/Blueprint';
import { Gene } from './core/Gene';
import { Chromosome } from './core/Chromosome';
import { GenomeEventType, GenomeEvent } from './core/GenomeEvent';

const answer = 'helloworldhowareyoutoday';

const blueprint = new Blueprint();
blueprint.add(26, answer.length);

const population = new Population(500, blueprint);
population.setMutationRate(0.01);
population.setCutOff(0.5);
population.setStopAt(100);

population.setFitnessCalculation((genes: Gene[]) => {
  let sum = 1; // Avoid to have 0 on fitness

  for (let i = 0; i < genes.length; i += 1) {
    const charCode = answer.charCodeAt(i) - 96;
    const geneCharCode = Math.floor(genes[i].get());
    if (charCode === geneCharCode) {
      sum += 1;
    }
  }

  return (sum / (genes.length + 1)) * 100;
});

GenomeEvent.on(GenomeEventType.GENOME_EVENT_GENERATION_END, (chromosomes: Chromosome[]) => {
  const bestChromosome = chromosomes[0];
  console.log(`Generation ${population.getGenerationNumber()}: ${bestChromosome.getFitness()}`);
});

GenomeEvent.on(GenomeEventType.GENOME_EVENT_GENERATION_FINISH, (chromosomes: Chromosome[]) => {
  let finalString = '';
  const bestChromosome = chromosomes[0];
  bestChromosome.getGenes().map((gene: Gene) => {
    finalString += String.fromCharCode(gene.get() + 96);
  });
  console.log(`Result (fitness: ${bestChromosome.getFitness()}): ${finalString}`);
});

population.run(500);
