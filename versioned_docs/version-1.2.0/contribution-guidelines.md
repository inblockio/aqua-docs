---
title: "Contribution Guidelines"
linkTitle: "Contribution"
weight: 20
menu:
  main:
    weight: 20
---

### Contribution Guide for Rust and JavaScript/TypeScript Aqua Projects
<hr/>
This guide outlines the best practices and requirements for contributing to our project. By following these practices, you ensure that the codebase remains consistent, maintainable, and adheres to modern standards.

## General Guidelines
1. **Code Formatting**:
   - Always use a formatter for consistent code style:
     - **Rust**: <br/><br/>
        Use `rustfmt`. Install it via `rustup component add rustfmt` and run it with `cargo fmt`.<br/>

     - **JavaScript/TypeScript**: <br/><br/>
        Use `Prettier`.<br/> Ensure it's set up in your editor or run it manually before committing.
          ```bash
            npx prettier --write .
          ```
1. **Commit Messages**:
   - Write clear and descriptive commit messages.
   - Use present tense, e.g., *"Add error handling for API requests"*.

2. **Code Reviews**:
   - Always submit a pull request for review, even for small changes.
   - Be open to constructive feedback and incorporate suggested changes.
  
3.  **Tests Are Essential**:
    - Write unit tests and integration tests where applicable.
    - Ensure all tests pass before submitting a pull request.
  
4. **Consistency Matters:**
    - Follow the existing project style guides.
    - Make sure all code is formatted consistently (tools for this are discussed below).

---

## Rust Guidelines

1. **Avoid Pointer Manipulation**:
   - Do not use raw pointers (`*const` or `*mut`) unless absolutely necessary.
   - Stick to safe abstractions like references (`&`, `&mut`) or smart pointers (e.g., `Box`, `Rc`, `Arc`).  

2. **Follow Ownership and Borrowing Rules**:
   - Ensure proper ownership and lifetime management to prevent common issues like dangling references.

3. **Precise Functions**:
   - Keep functions short and focused. A function should ideally perform one task.
   - Use descriptive function names and avoid long functions (>50 lines is often a warning sign).

4. **Use Idiomatic Rust**:
   - Prefer idiomatic constructs over manual implementations. For example:
   - Use iterators and combinators (`map`, `filter`) over manual loops where appropriate.
   - Use pattern matching for handling `Option` or `Result` types.
   - Avoid cloning unnecessarily; prefer references when possible.

5. **Follow Rust Clippy Recommendations:**
    - Use clippy to identify potential improvements. Run `cargo clippy --all-targets --all-features -- -D warnings` to catch and fix lint issues.
    - Install `clippy` using `rustup component add clippy`
  
6. **Error Handling:**
    - Use `Result` and `Option` for error handling instead of panicking (`panic!`).
    - Provide meaningful error messages with thiserror or anyhow for library-level code.(or a string in result containing a reason why the code failed)

7. **Dependencies**
    - Minimize dependencies. Ensure they are actively maintained and necessary.
    - Use the latest stable versions of dependencies and avoid duplicates.
  
8.  **Documentation**
    - Document public items with `///` comments.
    - Include examples for complex functions or types.  
     

<hr/>

## JavaScript/TypeScript Contribution Guidelines

1. **Use a Code Formatter:**
    - Use Prettier for consistent formatting. Run npx prettier --write . before committing changes.
    - Add Prettier configuration if not already present in the project.

2. **Avoid Using any**
    - Do not use any unless it's absolutely necessary and temporary. Instead:<br/>
        &emsp;a. Use specific types or TypeScript's utility types (e.g., `Partial`, `Record`, `Pick`, etc.).<br/>
        &emsp;b. Use `union` types (`string | number`) or enums for clearly defined options.

3.  **Pure Functions**
    - Write pure, side-effect-free functions when possible
    - Use immutable data structures
    - Return new objects instead of mutating inputs

4. **Error Handling**
    - Use explicit error types
    - Leverage discriminated unions for error handling
    - Prefer `Result`-like patterns
      ```typescript
            type Result<T, E = Error> = 
              | { success: true; value: T }
              | { success: false; error: E };

            function divide(a: number, b: number): Result<number> {
              if (b === 0) {
                return { 
                  success: false, 
                  error: new Error('Division by zero') 
                };
              }
              return { 
                success: true, 
                value: a / b 
              };
            }
      ```
5. **Performance Considerations**
   - Use `const` by default or `let`
   - Use `Map` and `Set` for efficient key-value and unique collections
   - Avoid unnecessary object creation
  
6. Documentation
    - Use JSDoc or TypeDoc for documentation
    - Include type information in documentation
    - Provide examples in documentation comments
      ```typescript

          /**
            * Calculates the area of a rectangle
            * @param width - The width of the rectangle
            * @param height - The height of the rectangle
            * @returns The calculated area
            * @example
            * const area = calculateArea(5, 10);
            * console.log(area); // 50
          */
          function calculateArea(width: number, height: number): number {
            return width * height;
          }

      ```
  