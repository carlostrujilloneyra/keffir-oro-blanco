'use client';

import { useEffect } from 'react';

export default function HomePage() {
  class Computer {
    constructor(
      public cpu: string = 'cpu - not defined',
      public ram: string = 'ram - not defined',
      public storage: string = 'storage - not defined',
      public gpu?: string,
    ) {}

    displayConfiguration() {
      console.log(`Configuración de la computadora
        CPU: ${this.cpu}
        RAM: ${this.ram}
        Almacenamiento: ${this.storage}
        GPU: ${this.gpu}
        `);
    }
  }

  class ComputerBuilder {
    private computer: Computer;

    constructor() {
      this.computer = new Computer();
    }

    setCPU(cpu: string): ComputerBuilder {
      this.computer.cpu = cpu;
      return this;
    }

    setRAM(ram: string): ComputerBuilder {
      this.computer.ram = ram;
      return this;
    }

    setStorage(storage: string): ComputerBuilder {
      this.computer.storage = storage;
      return this;
    }

    setGPU(gpu: string): ComputerBuilder {
      this.computer.gpu = gpu;
      return this;
    }

    build() {
      return this.computer;
    }
  }

  function main() {
    const basicComputer = new ComputerBuilder()
      .setCPU('Intel Core 1')
      .setRAM('4GB')
      .setStorage('512GB')
      .setGPU('Gráficas bajas')
      .build();

    basicComputer.displayConfiguration();
  }

  const url = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    const fetchPosts = () => {
      fetch(url)
        .then((rsp) => {
          return rsp.json();
        })

        .then((data) => {
          return data;
        })

        .catch((error) => console.log(error));
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Aua!!</h1>
    </>
  );
}
