# NestJS Boilerplate with Clean Architecture and TDD

## Motivation
The aim of this project is too provide a NestJS boilerplate project with clean architecture and TDD.
Different projects already exist but I wanted to propose a different vision which is largely inspired by Anthony Cyril (Ancyracademy).

### Clean Architecture
Clean architecture was introduced by Robert C. Martin (Uncle Bob) in 2008. It is inspired by other architectural styles such as hexagonal architecture or onion architecture. Clean architecture is a way to structure your code in a way that makes it easier to understand, test and maintain. The business logic is separated from the technical implementation, and the technical implementation is separated from the data access layer.

![Clean Architecture](./docs/assets/clean-archi.jpeg)

On the above picture, each circle represents different zones of the software. The outermost layer is the lowest level of the software and we move towards the center, the level is higher. In general, as we go deeper, less the layer is subject to change.

### TDD
Why TDD ? Test Driven Development (TDD) is a software development process that relies on the repetition of a very short development cycle.
The developer writes an initial failing test case, then writes the minimum amount of code to make the test pass, and then refactors the code to improve its design.

### NestJS
NestJS is a framework for building efficient, reliable and scalable server-side applications. It is built with TypeScript and uses modern JavaScript which makes it a great fit for building modern web applications.


## Testing
### Type of tests
- Unit tests
Units test are the tests that test the smallest possible unit of code.

- Integration tests
Integration tests are the tests that test the interaction between different components of the system, typically between the application and the database.

- End-to-end tests
End-to-end tests are the tests that test the entire system, typically by simulating user interactions with the application.

## Principles
### SOLID
This project respects the SOLID principles. SOLID is an acronym for five design principles intended to make software designs more understandable, flexible and maintainable.

- Single Responsibility Principle (SRP)
This principle states that “A class should have only one reason to change” which means every class should have a single responsibility or single job or single purpose. In other words, a class should have only one job or purpose within the software system.

- Open-Closed Principle (OCP)
This principle states that “Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification” which means you should be able to extend a class behavior, without modifying it.

- Liskov Substitution Principle (LSP)
The principle was introduced by Barbara Liskov in 1987 and according to this principle “Derived or child classes must be substitutable for their base or parent classes“. This principle ensures that any class that is the child of a parent class should be usable in place of its parent without any unexpected behavior.

- Interface Segregation Principle (ISP)
This principle is the first principle that applies to Interfaces instead of classes in SOLID and it is similar to the single responsibility principle. It states that “do not force any client to implement an interface which is irrelevant to them“. Here your main goal is to focus on avoiding fat interface and give preference to many small client-specific interfaces. You should prefer many client interfaces rather than one general interface and each interface should have a specific responsibility.

- Dependency Inversion Principle (DIP)
The Dependency Inversion Principle (DIP) is a principle in object-oriented design that states that “High-level modules should not depend on low-level modules. Both should depend on abstractions“. Additionally, abstractions should not depend on details. Details should depend on abstractions. In simpler terms, the DIP suggests that classes should rely on abstractions (e.g., interfaces or abstract classes) rather than concrete implementations.

## Evolution
This project will evolve over time. I will add new features and improve the existing ones.
