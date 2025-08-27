import { FaqItem } from '../types/question.type';

export const questionsData: FaqItem[] = [
  {
    value: 'q1',
    question: 'Qué es el kéfir y por qué es bueno para mí',
    answer: (
      <>
        El Kéfir es una bebida probiótica milenaria, fermentada de forma natural. Está lleno de{' '}
        <strong>millones de microorganismos vivos</strong> que ayudan a equilibrar tu flora intestinal, mejorar la
        digestión y fortalecer tu sistema inmunológico. ¡Es como un superalimento para tu intestino!
      </>
    ),
  },

  {
    value: 'q2',
    question: '¿Es 100% kéfir o yogurt sabor a kéfir?',
    answer: (
      <>
        Nuestro kéfir de Oro Blanco - SN, se diferencia de otras marcas al usar 30-40 próbioticos y prebióticos en su
        preparación. Es por ello que la duración no es tan extensa porque no usamos conservantes ni preservantes para
        mantener nuestro <strong>producto artesanal.</strong>
      </>
    ),
  },

  {
    value: 'q3',
    question: '¿Sus productos son orgánicos?',
    answer: (
      <p>
        Nos enorgullece usar ingredientes <strong>100% naturales y puros</strong>. Siempre que es posible, como en
        nuestro Vinagre de Manzana, utilizamos ingredientes orgánicos certificados. Nuestra prioridad es ofrecerte un
        producto libre de aditivos y conservantes artificiales.
      </p>
    ),
  },
];
