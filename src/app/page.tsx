export default function HomePage() {
  class Product {
    constructor(
      public name: string,
      public price: number,
    ) {}
  }

  const milk = new Product('Mantequilla A1', 24);

  console.log(milk);

  return (
    <>
      <h1>Aua!!</h1>
    </>
  );
}
